# Image sources

**Every image on this page is the company's own.** No stock photography, no third-party
architectural imagery, and no AI-generated buildings are used. Nothing was taken from
crescentheights.com or relatedgroup.com.

These are Triple Double's assets — their buildings and their people — rather than
anything belonging to the current website's design. Nothing about how they are cropped,
graded, framed or composed follows that site. If the brief later calls for the
photography to be replaced entirely, `build-images.py` regenerates the whole derivative
set from whatever originals sit in `srcimg/`, and no layout change is required.

All originals were downloaded from `https://tripledoublere.com/wp-content/uploads/…` on
4 September 2026 and are kept unmodified in `srcimg/`. Derivatives in `public/img/` are
produced by `build-images.py`, which crops, applies one shared colour grade and emits
JPEG + WebP at several widths.

## Resolution audit

Every original was checked against the company's own WordPress media library via
`/wp-json/wp/v2/media` on 4 September 2026, and each candidate was probed for a
`-scaled` variant. **No larger original exists for any image used** — the
dimensions below are the true full-size uploads, not resized derivatives.

| Image | Original | Max rendered (CSS) | Treatment | Delivered widths |
|---|---|---|---|---|
| Hero | `image35.jpg` **1400x700** | 1440 full-bleed | 2x super-resolution, then 16:9 and 3:4 crops | 1024 / 1440 / 1920 - 560 / 760 / 1050 |
| Featured asset | `image41-1-1.jpg` **1400x700**, right half **700x700** | **461** (reduced from 556) | 2x super-resolution, then 4:5 crop | 560 / 800 / **1120** |
| Towers of Coral Springs | `image37.jpg` **1400x700** | 376 | denoise + edge sharpen only (no upscale) | 560 / 800 / 1050 |
| 6190 Powers Ferry | `Powers-Ferry.jpg` **1280x720** | 376 | denoise + edge sharpen only | 560 / 800 / 1050 |
| 7710 NW 71st Court | `image39.jpg` **1400x700** | 376 | denoise + edge sharpen only | 560 / 800 / 1050 |
| Expertise thumbnails | 1400x700 / 1280x720 | 400 | 2x super-resolution, 4:5 crop | 380 / 560 / **800** |
| Leadership portraits | **1000x1250** each | 290 | downscale only - originals already exceed 2x | 360 / 520 / 760 |
| Logos | 300x150 mark | 88 | upscaled to 520px, ~3x of every rendered size | single PNG |

**What changed in this pass.** The featured asset was the one visibly soft image:
it was being served at 900px into a 1111-device-pixel slot from a 1.5x stretch.
It is now served at 1120px into a 922-device-pixel slot from a properly
resampled 2x base, and its rendered width was reduced from 556 to 461 CSS px so
the available detail covers it. Expertise thumbnails moved from 520px files in
800px slots to 800px files. The portfolio cards had a broken `srcset` entry
(1100px) that no file matched, so every card image 404'd at desktop width; the
srcset now matches the emitted widths exactly.

**Honest limitation.** The hero cannot be made retina-sharp. Its original is
1400x700 and it renders full-bleed at 1440 CSS px, so roughly 1244 native pixels
cover 1440 CSS px (0.86 native/CSS) before any upscale. The 2x resample and
edge-masked sharpening make it hold well behind the scrim and at normal viewing
distance, but a genuinely high-resolution replacement is the only real fix, and
that has to come from the client.

## The upscaler

`build-images.py` implements a conservative, entirely classical 2x pipeline:

1. **Chroma denoise** - Cb/Cr blurred to remove JPEG mottling, luma untouched.
2. **Luma noise soft-threshold** - detail above 3/255 is kept in full, below it
   is attenuated to 40%, so edges and texture survive and noise does not.
3. **Lanczos 2x resample.**
4. **Edge-masked unsharp** - a smoothstepped local-gradient mask means flat sky
   and shadow get 18% of the sharpening and architectural edges get all of it,
   so nothing haloes or blocks.

It resamples and sharpens what is already in the frame. It synthesises nothing,
so building geometry, signage, window mullions and faces are unaltered. Results
were reviewed at 100% against a plain-Lanczos control before being accepted.

## The shared grade

Applied to every photograph so a mixed-quality archive reads as one system:
saturation ×0.72, contrast ×1.08, brightness ×0.99, and a small channel shift that cools
the shadows toward the brand navy. The hero and expertise thumbnails are pushed further
(saturation 0.62 / 0.55) because they sit under type. Leadership portraits carry the
same grade and are additionally rendered greyscale in CSS, returning to colour on hover.

---

## Photography

| On the page | Source file (tripledoublere.com) | Property | Treatment |
|---|---|---|---|
| Hero (desktop 16:9 and mobile 3:4) | `2022/11/image35.jpg` | 2151 W Hillsboro Blvd, Deerfield Beach, FL | Lanczos upscale ×1.45, deeper grade, two crops |
| Featured asset | `2022/11/image41-1-1.jpg` | 44 W Flagler Street, Downtown Miami, FL | Right half of a stitched two-photo source, cropped 4:5 |
| Portfolio card 1 | `2022/11/image37.jpg` | Towers of Coral Springs, 2855 & 2825 N University Dr, FL | 3:2 crop |
| Portfolio card 2 | `2023/02/Powers-Ferry.jpg` | 6190 Powers Ferry, Sandy Springs, GA | Right 14% trimmed to remove a baked-in "ATLANTA, GA" caption plate, then 3:2 |
| Portfolio card 3 | `2022/11/image39.jpg` | 7710 NW 71st Court, Tamarac, FL | 3:2 crop |
| Expertise — Investment | `2022/11/image37.jpg` | Towers of Coral Springs | 4:5 crop, deeper grade |
| Expertise — Operations | `2023/02/Powers-Ferry.jpg` | 6190 Powers Ferry | 4:5 crop, deeper grade |
| Expertise — Management | `2022/11/image41-1.jpg` | 4700 N Congress Ave, West Palm Beach, FL | 4:5 crop, deeper grade |
| Approach band texture | `2022/11/image35.jpg` | 2151 W Hillsboro Blvd | 32:9 crop at saturation 0.18, held at ~4% behind a navy gradient |

The expertise thumbnails are `alt=""` and `aria-hidden` — they are decorative and the
same properties are already described elsewhere on the page. Every other image carries
a descriptive alt naming the building and its city.

## Portraits

| On the page | Source file | Person |
|---|---|---|
| Leadership 1 | `2022/11/Andrew-Greenbaum-1000x1250-2.jpg` | Andrew "Avi" Greenbaum, CEO |
| Leadership 2 | `2022/11/Heath-Wruble-1000x1250-2.jpg` | Heath Wruble, COO |
| Leadership 3 | `2023/09/Kadion-Preston-1000x1250-2.jpg` | Kadion Preston, Chief Growth & Strategy Officer |
| Leadership 4 | `2023/09/Karen-Ives-1000x1250-Corrected.jpg` | Karen Ives, VP of Operations |

## Brand marks

| On the page | Source | Notes |
|---|---|---|
| Header (scrolled), favicon reference | `2022/10/TRIPLE-DOUBLE-Real-Estate-PNG-File-1.png` | Upscaled ×3 with Lanczos to `logo-navy.png` |
| Header (over hero), mobile menu, footer, board | derived | The site's own `TD-White-1.png1_-1.png` is effectively blank, so the white knockout is regenerated from the navy artwork's alpha channel |
| `public/favicon.svg` | drawn for this concept | Two rectangles in `#F3F1EC` and `#FFCB05` on `#00274C` — an abstraction of the logo's building block, not a reproduction |

## Rejected

- `2022/11/New-Project.jpg` — stock "family under a cardboard roof" photograph. Exactly
  the generic imagery the brief excludes.
- `2022/11/90.jpg` — low-resolution snapshot of a Qubed workforce-housing pool area.
  Authentic, but not of publishable quality at any size used here.

## Fonts

Instrument Sans, Manrope and IBM Plex Mono, all under the SIL Open Font License,
served from Google Fonts. No licensed commercial typeface is used.
