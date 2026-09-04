"""
Asset pipeline for the Triple Double Real Estate homepage concept.

Sources in  srcimg/   are the largest authentic originals available from the
company's own WordPress media library (verified against the /wp-json/wp/v2/media
endpoint on 4 September 2026 — no larger version or `-scaled` variant exists for
any of them). They are never modified in place.

Derivatives in public/img/ are produced here: crop -> optional conservative 2x
super-resolution -> shared colour grade -> responsive JPEG + WebP.

The upscaler is deliberately classical: chroma denoise, luma noise soft-
thresholding, Lanczos, then an edge-masked unsharp. It resamples and sharpens
what is already in the frame. It does not synthesise detail, so building
geometry, signage, windows and faces are preserved exactly.
"""

import os

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

SRC = "srcimg"
OUT = "public/img"
os.makedirs(OUT, exist_ok=True)


# ---------------------------------------------------------------- helpers ---

def _blur(arr, sigma):
    """Gaussian blur on a float32 single-channel array."""
    im = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    return np.asarray(im.filter(ImageFilter.GaussianBlur(sigma)), dtype=np.float32)


def denoise(im, chroma_sigma=1.1, luma_sigma=0.8, keep=0.4, thresh=3.0):
    """Remove JPEG chroma mottling and low-amplitude luma noise.

    Luma detail above `thresh` is kept in full, so edges and texture survive;
    only sub-threshold noise is attenuated toward `keep`.
    """
    y, cb, cr = im.convert("YCbCr").split()
    cb = cb.filter(ImageFilter.GaussianBlur(chroma_sigma))
    cr = cr.filter(ImageFilter.GaussianBlur(chroma_sigma))

    ya = np.asarray(y, dtype=np.float32)
    base = _blur(ya, luma_sigma)
    detail = ya - base
    soft = np.clip(np.abs(detail) / thresh, 0.0, 1.0)
    factor = keep + (1.0 - keep) * soft
    ya = base + detail * factor

    y = Image.fromarray(np.clip(ya, 0, 255).astype(np.uint8))
    return Image.merge("YCbCr", (y, cb, cr)).convert("RGB")


def edge_unsharp(im, amount=0.85, radius=1.15, edge_sigma=2.2, floor=0.18):
    """Unsharp mask weighted by a local edge mask.

    Flat regions (sky, render, shadow) get `floor` of the sharpening, so noise
    and compression blocks are not amplified; architectural edges get all of it.
    """
    arr = np.asarray(im, dtype=np.float32)
    luma = arr @ np.array([0.299, 0.587, 0.114], dtype=np.float32)

    grad = np.abs(luma - _blur(luma, edge_sigma))
    mask = np.clip(grad / 14.0, 0.0, 1.0)
    mask = floor + (1.0 - floor) * (mask * mask * (3.0 - 2.0 * mask))  # smoothstep
    mask = mask[..., None]

    blurred = np.stack([_blur(arr[..., c], radius) for c in range(3)], axis=-1)
    out = arr + amount * mask * (arr - blurred)
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


def super_res_2x(im, amount=0.85):
    """Conservative 2x upscale. Used only where no larger original exists."""
    im = denoise(im)
    im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
    return edge_unsharp(im, amount=amount)


def grade(im, sat=0.72, contrast=1.08, bright=0.99, cool=0.045):
    """Shared look: gently desaturated, cooled toward the brand navy."""
    im = im.convert("RGB")
    im = ImageEnhance.Color(im).enhance(sat)
    im = ImageEnhance.Contrast(im).enhance(contrast)
    im = ImageEnhance.Brightness(im).enhance(bright)
    r, g, b = im.split()
    r = r.point(lambda v: max(0, int(v - cool * 255 * (1 - v / 255) * 1.2)))
    b = b.point(lambda v: min(255, int(v + cool * 255 * (1 - v / 255) * 1.6)))
    return Image.merge("RGB", (r, g, b))


def crop_ratio(im, ratio, anchor=(0.5, 0.5)):
    w, h = im.size
    tw, th = w, int(round(w / ratio))
    if th > h:
        th, tw = h, int(round(h * ratio))
    x, y = int((w - tw) * anchor[0]), int((h - th) * anchor[1])
    return im.crop((x, y, x + tw, y + th))


def emit(im, name, widths, quality=84, post_sharpen=0.35):
    """Write JPEG + WebP at each width, never above the source width."""
    made = []
    for wpx in sorted({min(w, im.width) for w in widths}, reverse=True):
        h = max(1, int(round(im.height * wpx / im.width)))
        r = im.resize((wpx, h), Image.LANCZOS) if wpx != im.width else im.copy()
        if post_sharpen and wpx != im.width:
            r = edge_unsharp(r, amount=post_sharpen, radius=0.8, floor=0.25)
        jp = f"{OUT}/{name}-{wpx}.jpg"
        r.save(jp, "JPEG", quality=quality, optimize=True, progressive=True)
        r.save(f"{OUT}/{name}-{wpx}.webp", "WEBP", quality=quality - 4, method=6)
        made.append((wpx, os.path.getsize(jp) // 1024))
    print(f"  {name:18} base {im.width}x{im.height}  ->  " +
          "  ".join(f"{w}px/{kb}kB" for w, kb in sorted(made)))
    return made


def load(f):
    return Image.open(os.path.join(SRC, f))


# ------------------------------------------------------------------ build ---

print("HERO  (2151 W Hillsboro Blvd, Deerfield Beach FL — original 1400x700)")
# Full frame is upscaled first so both crops are taken from real 2x pixels.
hero_base = grade(super_res_2x(load("image35.jpg"), amount=1.05),
                  sat=0.60, contrast=1.26, bright=0.93, cool=0.07)
emit(crop_ratio(hero_base, 16 / 9, (0.58, 0.30)), "hero", [1920, 1440, 1024], 82)
emit(crop_ratio(hero_base, 3 / 4, (0.60, 0.42)), "hero-portrait", [1050, 760, 560], 82)

print("FEATURED  (44 W Flagler St, Miami — right half of a stitched 1400x700)")
fl = load("image41-1-1.jpg").crop((700, 0, 1400, 700))          # 700x700 native
fl = grade(super_res_2x(fl, amount=1.0), sat=0.66, contrast=1.10)
emit(crop_ratio(fl, 4 / 5, (0.52, 0.35)), "flagler", [1120, 800, 560], 86)

print("PORTFOLIO CARDS  (native resolution is already sufficient — sharpen only)")
for name, f, anchor in [
    ("coralsprings", "image37.jpg", (0.50, 0.45)),
    ("powersferry", "Powers-Ferry.jpg", (0.42, 0.55)),
    ("tamarac", "image39.jpg", (0.50, 0.50)),
]:
    im = load(f)
    if name == "powersferry":
        im = im.crop((0, 0, int(im.width * 0.86), im.height))   # drop baked-in caption
    im = grade(edge_unsharp(denoise(im), amount=0.5))
    emit(crop_ratio(im, 3 / 2, anchor), name, [1050, 800, 560], 85)

print("EXPERTISE THUMBNAILS")
for name, f, anchor in [
    ("exp-investment", "image37.jpg", (0.62, 0.42)),
    ("exp-operations", "Powers-Ferry.jpg", (0.35, 0.50)),
    ("exp-management", "image41-1.jpg", (0.45, 0.50)),
]:
    im = crop_ratio(load(f), 4 / 5, anchor)
    im = grade(super_res_2x(im), sat=0.55, contrast=1.10, bright=0.94)
    emit(im, name, [800, 560, 380], 84)

print("LEADERSHIP PORTRAITS  (originals are 1000x1250 — downscale only)")
for name, f in [
    ("ldr-greenbaum", "Andrew-Greenbaum-1000x1250-2.jpg"),
    ("ldr-wruble", "Heath-Wruble-1000x1250-2.jpg"),
    ("ldr-preston", "Kadion-Preston-1000x1250-2.jpg"),
    ("ldr-ives", "Karen-Ives-1000x1250-Corrected.jpg"),
]:
    im = grade(load(f), sat=0.58, contrast=1.06, bright=0.98, cool=0.03)
    emit(crop_ratio(im, 4 / 5, (0.5, 0.30)), name, [760, 520, 360], 85)

print("APPROACH BAND TEXTURE  (held at ~4% behind a navy gradient)")
ap = grade(load("image35.jpg"), sat=0.18, contrast=1.05, bright=0.70, cool=0.08)
emit(crop_ratio(ap, 32 / 9, (0.5, 0.5)), "band", [1600, 1100], 78, post_sharpen=0)

print("LOGOS")
logo = Image.open(os.path.join(SRC, "TRIPLE-DOUBLE-Real-Estate-PNG-File-1.png")).convert("RGBA")
logo = logo.resize((logo.width * 3, logo.height * 3), Image.LANCZOS)   # 900x450
logo = logo.resize((520, 260), Image.LANCZOS)   # 2-3x of every rendered size
logo.save(f"{OUT}/logo-navy.png", optimize=True)
px = logo.load()
for y in range(logo.height):
    for x in range(logo.width):
        r, g, b, a = px[x, y]
        if a > 0:
            px[x, y] = (255, 255, 255, a)
logo.save(f"{OUT}/logo-white.png", optimize=True)
print(f"  logo-navy / logo-white  {logo.width}x{logo.height}")

total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
print(f"\npublic/img total: {total // 1024} kB across {len(os.listdir(OUT))} files")
