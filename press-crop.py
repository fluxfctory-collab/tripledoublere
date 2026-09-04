"""Cut the presentation regions out of the validated full-page screenshots.

Every region is a CSS-pixel band taken from a 2x/3x capture and resampled DOWN
to its presentation width, so nothing in the deliverables is upscaled.
"""
import os
from PIL import Image

OUT = "screenshots/_press"
os.makedirs(OUT, exist_ok=True)

DESK = Image.open("screenshots/desktop-1440.png")     # 1440 CSS @2x
TAB = Image.open("screenshots/tablet-834.png")        # 834 CSS  @2x
MOB = Image.open("screenshots/mobile-390.png")        # 390 CSS  @3x


def cut(img, dsf, top, height, name, out_w):
    box = (0, int(top * dsf), img.width, int((top + height) * dsf))
    r = img.crop(box)
    h = round(r.height * out_w / r.width)
    r = r.resize((out_w, h), Image.LANCZOS)
    r.save(f"{OUT}/{name}.png")
    print(f"  {name:16} css {height}px tall  ->  {out_w}x{h}")


# --- 01 cover: the hero exactly as designed, cropped to 16:9 --------------
# Crop stops just above the hero's data rail (CSS y=748) so the cover's own
# label band sits under the design rather than on top of it.
hero = DESK.crop((0, 0, DESK.width, 748 * 2))
hero = hero.resize((1920, round(748 * 1920 / 1440)), Image.LANCZOS)
hero.save(f"{OUT}/cover.png")
print(f"  cover            {hero.width}x{hero.height}")

# --- 02 overview: hero -> intro -> statistics ----------------------------
cut(DESK, 2, 0, 1200, "overview", 1180)

# --- 03 expertise + featured portfolio -----------------------------------
cut(DESK, 2, 2120, 560, "b-expertise", 1180)
cut(DESK, 2, 3960, 560, "b-portfolio", 1180)

# --- 04 value creation + leadership --------------------------------------
cut(DESK, 2, 5330, 560, "b-approach", 1180)
cut(DESK, 2, 6366, 560, "b-about", 1180)

# --- 05 responsive: one common region at three widths --------------------
cut(DESK, 2, 0, 1370, "rd-desktop", 860)
cut(TAB, 2, 0, 1370, "rd-tablet", 498)
cut(MOB, 3, 0, 1370, "rd-mobile", 233)

# --- 06 the complete page, downsampled from the 2x capture ---------------
full = DESK.resize((1440, round(DESK.height / 2)), Image.LANCZOS)
full.save("screenshots/06-full-homepage.png", optimize=True)
print(f"  06-full-homepage {full.width}x{full.height}"
      f"  ({os.path.getsize('screenshots/06-full-homepage.png') // 1024} kB)")
