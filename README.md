# Triple Double Real Estate — homepage concept

An original, high-fidelity homepage concept for **Triple Double Real Estate**, an
integrated real estate investment, operations and management firm headquartered in
Deerfield Beach, Florida.

Art direction: **institutional editorial / quiet confidence** - Instrument Sans display over Manrope, on the brand's own navy and a warm stone paper. Built as a working,
responsive React prototype — not a static mockup.

> **Original work.** The existing tripledoublere.com was used strictly as background —
> to learn what the firm does, which buildings it owns and which figures it stands
> behind. No layout, section order, structure, styling, colour application, typography
> or wording is carried across; every sentence on the page was written for this concept.
>
> **Verified content.** Every statistic and property fact is the company's own published
> information, and no figure is invented. The photography, portraits and wordmark are
> the company's own assets, re-cropped and re-graded. See `research-notes.md` and
> `IMAGE-SOURCES.md`.

---

## Run it

```bash
npm install
npm run dev        # dev server
npm run build      # tsc -b && vite build
npm run preview    # serve dist/ on :4173
npm run lint       # oxlint
```

## Regenerate the deliverables

```bash
python build-images.py          # crop + grade srcimg/ → public/img/ (needs Pillow)
node shoot.mjs                  # full-page captures at all 8 target widths
node shoot.mjs --frames         # only 1440 / 834 / 390
python press-crop.py            # cut presentation regions from those captures
node press.mjs                  # compose the six numbered presentation images
node board.mjs                  # compose the tall reference board
node audit-images.mjs           # report natural vs rendered size for every image
node qa.mjs                     # mobile menu, focus, anchors, reduced motion
```

`shoot.mjs` also reports document `scrollWidth` vs viewport at every width, so
horizontal overflow is checked rather than assumed. Both scripts expect
`npm run preview` to be serving on `http://localhost:4173` (override with `BASE=`).

## Deliverables

### Freelancer presentation set

| File | Size | What it is |
|---|---|---|
| `screenshots/01-cover-hero.png` | 1920x1080 | Contest cover - the hero at its designed scale over a labelled band |
| `screenshots/02-desktop-overview.png` | 1920x1200 | Hero, firm introduction and track record |
| `screenshots/03-expertise-portfolio.png` | 1920x1200 | Expertise list and the featured Miami asset |
| `screenshots/04-approach-leadership.png` | 1920x1200 | Value-creation sequence and leadership |
| `screenshots/05-responsive-design.png` | 1920x1200 | Desktop, tablet and mobile side by side |
| `screenshots/06-full-homepage.png` | 1440x8177 | The complete desktop page |

Flat presentation throughout - no device mockups, no perspective, no decoration.
All six are built from the validated full-page captures and only ever downsample.

### Verification captures

| File | What it is |
|---|---|
| `screenshots/desktop-1440.png` | Full page, 1440px viewport, 2x |
| `screenshots/tablet-834.png` | Full page, 834px viewport, 2× |
| `screenshots/mobile-390.png` | Full page, 390px viewport, 3× |
| `screenshots/submission-board.png` | Tall reference board - masthead, palette, type specimens, all three frames at 1:1 CSS scale. Kept as an extra; the numbered set above is the entry |
| `screenshots/wide-1024.png`, `tablet-768.png`, `mobile-430.png`, `mobile-375.png`, `mobile-320.png` | Additional verification captures |
| `research-notes.md` | Source research, verified figures, what was deliberately excluded |
| `DESIGN-SYSTEM.md` | Tokens, type scale, components, measured contrast |
| `DESIGN-RATIONALE.md` | The submission statement and the reasoning behind the direction |
| `IMAGE-SOURCES.md` | Provenance of every image and font |

## Page structure

1. **Header** — transparent over the hero, transitions to stone on scroll; logo swaps
   knockout ↔ navy. Full-screen mobile panel with focus trap and Escape-to-close.
2. **Hero** — full-bleed company photography (2151 W Hillsboro Blvd), positioning
   headline, two CTAs, and a data rail carrying three verified figures plus the
   headquarters coordinates.
3. **The firm (01)** — the integrated-platform argument, the four operating divisions,
   and the track-record band: `20+ years`, `1M+ SF`, `4 states`, `2 management
   companies`, with a footnote separating firm figures from career figures.
4. **Expertise (02)** — Investment / Operations & Value Creation / Management & Leasing
   as a ruled editorial list; the sticky left column's photograph cross-fades to follow
   the row being read.
5. **Portfolio (03)** — 44 W Flagler Street as the featured asset with a fact table,
   then Coral Springs, Powers Ferry and Tamarac as supporting projects on an asymmetric
   row.
6. **Value creation (04)** — Identify → Acquire → Reposition → Operate → Grow, drawn as
   a five-column ruled sequence with tick marks.
7. **About (05)** — the operator-first argument plus a leadership preview.
8. **Contact (06)** — closing statement, headquarters plate, direct email and phone.
9. **Footer** — logo, navigation, contact, address, legal links.

## Technical notes

- **React 19 + Vite 8 + TypeScript**, custom CSS only — no UI library, no CSS
  framework, no template.
- Design tokens in `src/styles/tokens.css`; nothing hard-codes a colour or size.
- Responsive images: every photograph ships as WebP + JPEG at three widths with real
  `sizes` attributes, generated by `build-images.py`. The hero uses an art-directed
  `<picture>` - a 3:4 crop below 700px, 16:9 above. The LCP image is preloaded and
  `fetchpriority="high"`. Resolution was audited against actual rendered sizes; see
  `IMAGE-SOURCES.md`.
- Semantic landmarks (`header` / `main` / `footer` / `section` with
  `aria-labelledby`), a skip link, descriptive alt text, visible `:focus-visible`
  rings, and a keyboard-operable mobile menu.
- `prefers-reduced-motion` is honoured throughout — the reveal component initialises to
  its finished state so no content is hidden from reduced-motion users.
- Verified at 1440 / 1024 / 834 / 768 / 430 / 390 / 375 / 320 px with zero horizontal
  overflow.

## Scope and known limitations

- **Homepage only.** Internal pages and backend functionality are out of scope. In-page
  anchors all resolve; two "see more" links (`Explore full portfolio`,
  `Meet our leadership`) point at the corresponding pages on the live site, since those
  pages are not part of this concept.
- **No editable Figma file was produced.** Figma work was explicitly excluded from this
  brief; the coded prototype and the screenshots are the deliverable. An editable Figma
  file would still need to be created separately.
- **The hero cannot be made retina-sharp.** Its original is 1400x700 - confirmed via
  the company's own media API as the largest that exists - and it renders full-bleed at
  1440 CSS px. A conservative 2x resample plus edge-masked sharpening makes it hold
  well behind the scrim, but only a higher-resolution photograph from the client fixes
  it properly. Every other image now meets or exceeds its rendered size.
- The favicon is drawn for this concept rather than supplied by the company.
- No social link appears in the footer because the current site publishes none.
