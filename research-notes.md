# Research notes — Triple Double Real Estate

Source of every fact below: the company's own website, **tripledoublere.com**, captured
4 September 2026. Pages read in full: Home, Portfolio, Past Investments, Related
Companies, Contact Us. Raw captures and a flattened text extraction are kept in
`_research/` for verification.

The current site was treated **strictly as background** — a way to understand what the
company does, which buildings it owns and which figures it stands behind. Its layout,
section order, structure, styling, colours, typography and wording are not reproduced
anywhere in this concept, and the quotations below exist only so the facts on the page
can be checked against their source.

**Copy boundary.** Every sentence on the homepage was written from scratch for this
concept. Only three categories of language carry over, because they are facts rather
than prose: proper nouns (property names, addresses, company and division names, job
titles), numbers, and unavoidable industry terms. A dedicated pass late in the build
rewrote every line that still echoed the source's phrasing — including the hero eyebrow,
which had reused the existing "Investment • Operation • Management" tagline and is now
"We buy it. We fix it. We run it."

---

## 1. What the company is

> "A multifaceted real estate investment firm, Triple Double Real Estate invests in,
> operates and manages commercial and residential real estate throughout the country.
> Our headquarters is in South Florida."

Positioning line used on the current site: **Investment • Operation • Management**.

## 2. Verified services

| Service | What the company says |
|---|---|
| **Investment** | "more than 20 years of professional investment experience"; asset classes named as medical office, multifamily, hospitality, office, parking garages, industrial and mixed-use. |
| **Leasing** | Tenant and landlord representation; "specialists in tenant and landlord representation for medical office space". Run through Medical Office Brokers (MOB). |
| **Management** | Two companies: **Triple Double Property Management** (commercial office and retail) and **Med Prop Management** (medical office). "Managing over 1 million square feet of commercial space." |

### Operating teams / divisions (named on the current site)
- **Urban Asset** — iconic properties below replacement cost; aggressive leasing, repositioning, renovation; ground-up mixed-use in urban settings.
- **Medical Office** — value-add medical properties in good locations with occupancy or business flaws.
- **Workforce Housing** — alternative properties (often hotels) addressing the affordable-housing shortage, including affordable senior housing; works with cities, states and corporate partners.
- **Historic Adaptive Re-Use** — redevelopment of generational downtown buildings using tax credits and public finance.

## 3. Figures — what is safe to use

**Usable, and attributable to the firm:**

| Figure | Wording on source | Use |
|---|---|---|
| 20+ years | "more than 20 years of real estate experience" / "over 20 years in real estate investment" | ✅ Used as "20+ years of real estate experience" |
| 1M+ SF under management | "Managing over 1 million square feet of commercial space" | ✅ Used as "square feet under management" |
| 4 states | Portfolio page is organised as Florida / Georgia / Alabama / Texas | ✅ Derived by counting the firm's own portfolio headings |
| 2 management companies | Triple Double Property Management + Med Prop Management | ✅ Used |

**Deliberately NOT used as company totals** (they describe an individual's career, or a
prior company, and the brief specifically warns about them):

- *"more than 4,000 residential units and more than 6 million square feet of commercial space"* — the source attributes this to **Andrew "Avi" Greenbaum's own career** ("Andrew has bought, built and managed…"). On the concept homepage it survives only as unquantified prose in the About section — "careers spent buying, building and running thousands of residential units and millions of square feet of commercial space" — with no number attached to the firm.
- *"$1 billion of commercial property developed"* — attributed to **Hudson Capital**, a prior company. Not used.
- Individual deal returns from the Past Investments page (e.g. "120% return on equity in 18 months") — verifiable but reads as a track-record page, not a homepage claim. Not used.

A footnote is printed directly under the statistics band on the page making the
distinction explicit.

## 4. Portfolio — properties selected for the homepage

Chosen for image quality, asset scale and geographic spread. All figures verbatim from
the Portfolio page.

**Featured asset**
- **44 W Flagler Street, Downtown Miami, FL** — purchased May 2022 for $57,000,000.
  26-storey, 164,312 SF bank-anchored office tower across from the Miami-Dade
  courthouse; plus a 12-storey, 142,233 SF office tower with ground-floor retail at the
  corner of 200 SW 1st Street.

**Supporting projects**
- **Towers of Coral Springs — 2855 & 2825 N. University Dr, Coral Springs, FL** —
  purchased November 2021 for $10,500,000. 2855: 40,534 SF; 2825: 34,806 SF
  (**75,340 SF combined**). Occupancy at purchase 51%. Opposite the city's downtown
  redevelopment district.
- **6190 Powers Ferry, Sandy Springs, GA** — purchased December 2022 for $16MM.
  149,516 SF boutique asset in the 30327 zip code. Occupancy at purchase 70%.
- **7710 NW 71st Court, Tamarac, FL** — purchased February 2020 for $2,800,000.
  39,640 SF medical building; occupancy taken **from 25% to 74% in one year**.

Other verified holdings not used on the homepage: 2151 W Hillsboro Rd (Deerfield Beach,
40,841 SF — its photograph is the hero); 155 E Blue Heron (Riviera Beach, 43,879 SF);
4700 N Congress Ave (West Palm Beach, 43,797 SF); 1455 Old Alabama Rd / Kings Landing
(Roswell GA, 77,967 SF); 3850 Holcomb Bridge Rd (Norcross GA, 75,134 SF); 100 / 300
Medical Center Dr and the Goodyear Building (Gadsden AL); 2635 NE Loop 410 and 4621
Rittiman Rd (San Antonio TX, workforce-housing conversions); 17115 Red Oak Dr
(Houston TX, 53,066 SF).

## 5. Leadership (names and titles as published)

- Andrew "Avi" Greenbaum — CEO
- Heath Wruble — Chief Operating Officer
- Kadion Preston — Chief Growth & Strategy Officer
- Karen Ives — VP of Operations
- Shiv Newaldass — Real Estate Executive & Development Strategist
- Sammy Rhein — Director of Brokerage and Leasing, Medical Office Brokers

The homepage previews the first four; no biographies are reproduced.

## 6. Contact and identity

- 431 Fairway Drive, Suite 200, Deerfield Beach, FL 33441
- 561-444-0024 · info@tripledoublere.com
- Existing legal pages: `/terms/`, `/privacy-policy/` (linked from the footer)
- No social profile is linked from the current site, so no social link is invented.

## 7. Brand assets

The wordmark is `TRIPLE-DOUBLE-Real-Estate-PNG-File-1.png`. Sampled colours from the
artwork itself:

- **#00274C** — deep navy (11,579 opaque pixels; the dominant brand colour)
- **#FFCB05** — yellow accent (1,094 pixels; used on the "E" of DOUBLE)

These two values seed the entire palette (see `DESIGN-SYSTEM.md`). The site's supplied
white logo file is a blank/near-blank asset, so the white knockout used in the header
and footer is regenerated from the navy artwork's own alpha channel.

## 8. Imagery assessment

Company photography is authentic but inconsistent — a mix of professional drone shots,
phone photos and low-resolution crops. Three assets are strong enough to lead
(`image35`, `image37`, `image41-1-1`), several are usable at card size, and a few are
too soft to enlarge. Two images on the current site were rejected outright: a generic
stock family-with-moving-boxes photo, and a low-quality motel pool snapshot. A single
consistent colour grade is applied to everything used so the mixed sources read as one
system — see `IMAGE-SOURCES.md`.
