# Design system

Everything below is implemented as CSS custom properties in
`src/styles/tokens.css`. Nothing in the page hard-codes a colour, size or duration.

---

## Colour

The palette is derived from the existing wordmark, not invented. Sampling the logo
artwork gives exactly two brand colours — a deep navy and a yellow — and the system is
built outward from those.

| Token | Value | Role |
|---|---|---|
| `--c-navy` | `#00274C` | Brand navy. Headings on light, dark section grounds, primary button. |
| `--c-navy-deep` | `#001A34` | Deeper ground: hero base, approach band, footer. |
| `--c-navy-700` | `#123A63` | Primary button hover. |
| `--c-stone` | `#F4F2ED` | Warm paper. Default page ground. |
| `--c-stone-2` | `#EAE6DE` | Alternating band (portfolio). |
| `--c-stone-3` | `#DED8CD` | Image placeholder ground. |
| `--c-accent` | `#FFCB05` | Brand yellow. Restrained: hairline lead-ins, index numerals, one badge, focus ring, hover underline. |
| `--c-accent-ink` | `#7D5C05` | Darkened accent for small text on light grounds (5.5:1). |
| `--c-text` | `#17222F` | Body copy on light. |
| `--c-text-soft` | `#4A5867` | Secondary copy. |
| `--c-text-faint` | `#5C6773` | Micro-labels on light. |
| `--c-on-dark` | `#F3F1EC` | Copy on navy. |
| `--c-on-dark-soft` | `#B3C2D1` | Secondary copy on navy. |
| `--c-on-dark-faint` | `#8BA0B5` | Micro-labels on navy. |

Rules are expressed as alpha over the ground, not as flat greys:
`--c-rule` `rgba(0,39,76,.14)`, `--c-rule-strong` `.26`, `--c-rule-dark`
`rgba(243,241,236,.16)`, `--c-rule-dark-soft` `.09`.

### Measured contrast (WCAG 2.1, sRGB)

| Pair | Ratio |
|---|---|
| Body `#17222F` on stone | **14.4 : 1** |
| Micro-label `#5C6773` on stone-2 | **4.6 : 1** |
| Secondary copy `#4A5867` on stone | **6.6 : 1** |
| Navy heading on stone | **13.5 : 1** |
| `--c-on-dark` on navy | **13.3 : 1** |
| `--c-on-dark-soft` on navy | **8.5 : 1** |
| `--c-on-dark-faint` on navy | **5.6 : 1** |
| Accent yellow on navy | **9.9 : 1** |
| `--c-accent-ink` on stone-2 | **5.5 : 1** |

All body and label text clears 4.5:1. Hero copy sits on a fixed multi-stop scrim rather
than on raw photography.

### The yellow rule

The brand yellow is used at small scale only, and never as a fill behind body text
except the single `Featured asset` badge (navy text on yellow, 9.9:1). It marks:
the hairline before every section index, the index numerals in the expertise list,
the step ticks in the approach diagram, the mobile-menu numerals, the bullet in the
divisions list, the hover underline on text links, and the focus ring. That is the
whole inventory — the discipline is what keeps it from reading as "luxury gold".

---

## Typography

Three families, each with one job. All open-source (SIL Open Font License) and
commercially safe.

| Family | Role | Weights |
|---|---|---|
| **Instrument Sans** | Display: h1, section h2, statistics, project names, step titles, leadership names, mobile-menu items. A contemporary grotesque with narrow, architectural forms; set very tightly tracked so it reads as designed rather than default. | 600, 700 |
| **Manrope** | Interface and body: leads, paragraphs, navigation, buttons, tags, roles, footer. | 400, 500, 600 |
| **IBM Plex Mono** | Metadata only: section indices, statistic indices, hero rail keys, coordinates, expertise indices, step numbers, fact-table labels, locations. | 400, 500 |

Monospace use is deliberately narrow — indices, coordinates and data labels.
Everything that used to be mono and is really UI (buttons, navigation, tags,
roles, captions, legal) is Manrope 600 uppercase with `0.075em` tracking.

### Scale

Fluid, `clamp()`-based across 320 → 1440px. No fixed pixel type anywhere.

| Token | Range | Used for |
|---|---|---|
| `--t-hero` | 41.6 → 88 px | Hero headline (700) |
| `--t-display` | 32.8 → 59.2 px | Intro, featured asset, closing (700) |
| `--t-h2` | 28.8 → 45.6 px | Section headings (700) |
| `--t-h3` | 19.2 → 24.8 px | Card and expertise titles (600) |
| `--t-stat` | 44.8 → 76 px | Statistic numerals (700, tabular) |
| `--t-lead` | 17 → 20.8 px | Leads and expertise summaries |
| `--t-body` | 15.5 → 17 px | Body copy |
| `--t-small` | 15 px | Secondary copy, card facts |
| `--t-micro` | 13 px | Buttons, nav, eyebrows, labels |
| `--t-nano` | 12 px | Indices, tags, roles, legal |

Tracking: `-0.035em` on hero and display, `-0.028em` on h2 and step titles,
`-0.045em` on the statistic numerals, `+0.14em` on mono, `+0.075em` on
uppercase UI labels. Nothing on the page sits below 12px.

## Space and layout

An 8px-derived scale (`--s-1` … `--s-10`), plus two responsive values that do most of
the work:

- `--section-y` — `clamp(4.5rem, 2.4rem + 6.6vw, 8.75rem)` vertical section rhythm
- `--gutter` — `clamp(1.25rem, 0.35rem + 2.9vw, 4.5rem)` container inset

`--container: 1320px`, `--container-narrow: 940px`, `--header-h: 88px` (70px below
900px).

Structure is expressed with **hairlines and columns**, not cards. Sections are divided
by 1px rules; the statistics band, expertise list, approach sequence and featured fact
table are all rule-based grids. `--radius: 2px` exists but is used nowhere on a content
surface — there are no rounded cards in the design.

**Purposeful asymmetry:** the featured asset is a 0.66 : 1 split with a portrait image;
the middle portfolio card drops 3.25rem below its neighbours above 1100px; the intro is
1.05 : 1; leadership portraits sit on a staggered baseline.

---

## Components

### Buttons

Shared `--btn-h: 58px` (46px for `--sm`), 1px border, Manrope 600 uppercase at
13px/0.075em, no radius. Four variants — `--primary` (solid navy), `--outline`, `--light` (stone on
dark), `--ghost-light` (outlined on dark), `--accent` (brand yellow). Every variant animates only
background/border/colour, and the arrow glyph translates 5px on hover.

### Text link (`.link-arrow`)

Manrope 600 uppercase label + arrow. The underline is a background gradient that grows from 0 to 100%
width on hover — no layout shift, and it inherits the accent colour.

### Section eyebrow

`01 — The firm`: a 38px 2px yellow rule, then a mono label. Used on all six sections
and it is the main device tying the page together.

### Focus

A single global rule: `2px solid #FFCB05`, `outline-offset: 3px`, on
`:focus-visible` only. Verified visible on the burger, the skip link, and both
light and dark grounds.

---

## Motion

| Token | Value |
|---|---|
| `--d-fast` | 180ms — colour and border states |
| `--d-mid` | 380ms — arrows, underlines, header transition |
| `--d-slow` | 900ms — section reveal |
| `--e-out` | `cubic-bezier(.22,.61,.36,1)` |

Motion inventory is deliberately short: a 22px fade-up on section entry
(IntersectionObserver, fires once), a header that swaps from transparent to stone on
scroll, a 3.5% image scale on portfolio card hover, a cross-fading photograph in the
expertise column, and a staggered mobile-menu entry.

`prefers-reduced-motion: reduce` neutralises all of it — the reveal component
initialises to its finished state so nothing is hidden, transitions and animations are
clamped to 0.001ms, and smooth scrolling is turned off.
