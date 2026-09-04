# Design rationale

## Submission statement

Triple Double is an unusual firm in that it buys, improves and then actually runs its
own buildings — so the homepage is designed to look like the balance sheet of an
operator rather than the brochure of a broker: a disciplined hairline grid, a warm stone
ground against the brand's own navy, and tightly tracked Instrument Sans headlines
carried by monospaced section indices, coordinates and data labels. Every photograph, statistic and property
fact on the page is the company's own, put through a single colour grade so a mixed
archive reads as one institutional voice, with the figures that belong to an
individual's career kept out of the firm's numbers and footnoted where the distinction
matters. The result is quiet, confident and specific to Triple Double — a page that
earns credibility from what it can prove rather than from decoration.

---

## The direction, and why

**"Editorial institutional / quiet confidence."** The two visual references —
Crescent Heights and Related Group — are both *developer* brands, and both lead with
scale and spectacle. Triple Double is not that firm. It is a value-add operator working
on medical office, urban assets, workforce housing and adaptive re-use; its
distinguishing claim is competence in complexity. So the page borrows the *quality
level* of those references — the photographic confidence, the generous measure, the
restraint — and rejects their structure entirely.

The specific decisions that follow from that:

**Hairlines instead of cards.** Almost every section is built from 1px rules and
columns: the statistics band, the expertise list, the featured-asset fact table, the
five-step approach diagram, the divisions list. It reads as a document — a schedule of
assets — which is exactly the register an investment firm should occupy. There is not a
single rounded card, shadow or gradient panel in the design.

**Monospace as the institutional signal.** IBM Plex Mono carries the section
indices, coordinates and data labels — and only those. It is what makes `26°19′N 80°06′W — DEERFIELD BEACH, FL` under
the hero and `TOWER / 26 STOREYS / 164,312 SF` in the featured plate feel like a data
sheet rather than marketing. It is a narrow, deliberate inventory: everything that is really
interface — navigation, buttons, tags, roles — sits in Manrope instead, so the
monospace reads as data rather than decoration.

**A palette taken from the logo, not chosen.** Sampling the existing wordmark returns
`#00274C` and `#FFCB05` and nothing else. Rather than invent a scheme, the system uses
that navy as the institutional ground, adds a warm stone paper (`#F4F2ED`) for the light
half of the page, and rations the yellow to about a dozen small marks. The cliché the
brief warns about — black and gold everywhere — is avoided precisely by treating the
yellow as an index colour rather than a luxury colour.

**One grade over an honest archive.** The company's photography is genuine but uneven:
professional drone work next to phone snapshots, and none of it larger than 1400px.
Rather than replace it with polished stock (which would be less credible, not more),
every image is put through the same conservative 2× resample and the same grade — desaturated to 0.72, contrast lifted, shadows cooled toward the brand navy — so
the archive reads as one system. Two images on the current site were rejected outright:
a stock family-with-moving-boxes photo and a low-resolution motel snapshot.

**Asymmetry with a reason.** The featured asset is a 4:5 portrait against a fact table,
because that photograph — looking up the glass curtain wall at 44 W Flagler — is the one
genuinely dramatic vertical in the archive and deserves the format. The middle portfolio
card drops below its neighbours to break the row without breaking the grid. The
leadership portraits sit on a staggered baseline. None of it is decorative
displacement; each offset serves a piece of content.

**Honesty as a design feature.** The statistics band prints its own footnote:
*"Figures reflect Triple Double Real Estate's own published platform scope, not
individual career totals."* The 4,000 units and 6 million square feet that appear on the
current site belong to the CEO's career, not the firm's balance sheet, so they appear
only as unquantified prose in the About section. For an institutional audience, the
restraint reads as credibility.

## Relationship to the existing website

The current tripledoublere.com was read once, for facts, and then closed. Nothing about
this page derives from it: not the section order, not the grid, not the colour
application, not the type, not a single sentence. The page was drawn from a blank
canvas against the brief.

Two things do come from the company rather than from the design, and both are assets
rather than styling:

- **The wordmark and the two colours inside it.** The brief asked for the existing
  branding to be used and for the palette to be derived from it where appropriate.
  Sampling the logo artwork gives `#00274C` and `#FFCB05`; the rest of the system is
  built outward from those. The current website applies neither colour the way this
  page does.
- **The company's own property photography and executive portraits.** These are Triple
  Double's assets — their buildings, photographed for them — not the website's visual
  style, and the brief was explicit about prioritising authentic company imagery over
  stock. They are re-cropped and put through a new grade here. If the intent is that
  even these should be replaced, that is a straightforward swap: `build-images.py`
  regenerates every derivative from whatever sits in `srcimg/`.

## What was deliberately not done

- No hero video, parallax or scroll-jacking — motion is limited to a fade-up, a header
  transition and two hover states.
- No "Welcome to Triple Double" copy; no long paragraphs carried over from the current
  site; no lorem ipsum.
- No invented awards, clients, testimonials or financial figures.
- No listing search, filters or map — this is an investment firm, not a marketplace.
- No icon set. Where a visual cue is needed, a rule, a numeral or a photograph does the
  work.
