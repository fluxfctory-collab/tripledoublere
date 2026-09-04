/**
 * Content for the Triple Double Real Estate homepage concept.
 *
 * Every figure below is taken from the company's own published material at
 * tripledoublere.com. Nothing here is invented or extrapolated. Where a figure
 * describes an individual's career rather than the firm, it is attributed to
 * that individual explicitly (see `leadership`).
 */

export const nav = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Expertise", href: "#expertise" },
  { label: "Approach", href: "#approach" },
  { label: "About", href: "#about" },
];

export const contact = {
  addressLines: ["431 Fairway Drive, Suite 200", "Deerfield Beach, FL 33441"],
  phone: "561-444-0024",
  phoneHref: "tel:+15614440024",
  email: "info@tripledoublere.com",
  emailHref: "mailto:info@tripledoublere.com",
};

/** Verified from the firm's own site copy. */
export const stats = [
  {
    figure: "20",
    suffix: "+",
    label: "Years of real estate experience",
    note: "Investment, operations and management",
  },
  {
    figure: "1M",
    suffix: "+",
    label: "Square feet under management",
    note: "Commercial, retail and medical office",
  },
  {
    figure: "4",
    suffix: "",
    label: "States in the current portfolio",
    note: "Florida · Georgia · Alabama · Texas",
  },
  {
    figure: "2",
    suffix: "",
    label: "In-house management companies",
    note: "Triple Double PM · Med Prop Management",
  },
];

export const expertise = [
  {
    id: "investment",
    index: "01",
    title: "Investment",
    summary:
      "Location first, condition second. We buy where the address already works and the building does not yet.",
    detail:
      "Two decades of underwriting across medical office, multifamily, hospitality, office, parking, industrial and mixed-use.",
    tags: ["Medical office", "Urban assets", "Mixed-use", "Industrial"],
    image: "exp-investment",
    alt: "Aerial view of the Towers of Coral Springs office property in Coral Springs, Florida.",
  },
  {
    id: "operations",
    index: "02",
    title: "Operations & Value Creation",
    summary:
      "Closing is where the work starts. Empty floors get leased, tired buildings get capital, and some get a different purpose entirely.",
    detail:
      "Four specialist teams — including hotel conversions to residential and tax-credit-supported downtown redevelopment.",
    tags: ["Repositioning", "Lease-up", "Workforce housing", "Adaptive re-use"],
    image: "exp-operations",
    alt: "The 6190 Powers Ferry office building in Sandy Springs, Georgia, seen through mature trees.",
  },
  {
    id: "management",
    index: "03",
    title: "Management & Leasing",
    summary:
      "The buildings are run by the firm that owns them — two management companies on the ground, and a leasing desk built for medical tenants.",
    detail:
      "Maintenance, construction and brokerage are staff, not vendors, so decisions reach the building in days.",
    tags: ["Property management", "Tenant representation", "In-house construction"],
    image: "exp-management",
    alt: "Medical office building at 4700 North Congress Avenue, West Palm Beach, Florida.",
  },
];

export const featured = {
  name: "44 W Flagler Street",
  location: "Downtown Miami, Florida",
  type: "Urban office",
  year: "Acquired 2022",
  blurb:
    "Two towers on the same block of Miami's civic core — a 26-storey building anchored by a bank, and a 12-storey neighbour with retail at street level.",
  facts: [
    { k: "Tower", v: "26 storeys / 164,312 SF" },
    { k: "Companion building", v: "12 storeys / 142,233 SF" },
    { k: "Acquisition", v: "May 2022 · $57,000,000" },
  ],
  image: "flagler",
  alt: "Looking up the glass curtain wall of the 44 West Flagler Street office tower in downtown Miami.",
};

export const projects = [
  {
    name: "Towers of Coral Springs",
    location: "Coral Springs, Florida",
    type: "Commercial office",
    fact: "Two buildings, 75,340 SF, half-let at acquisition and facing the district Coral Springs is rebuilding.",
    image: "coralsprings",
    alt: "Two mid-rise office buildings surrounded by palms at 2855 and 2825 North University Drive, Coral Springs, Florida.",
  },
  {
    name: "6190 Powers Ferry",
    location: "Sandy Springs, Georgia",
    type: "Boutique office",
    fact: "149,516 SF acquired in December 2022, in one of Atlanta's most established office addresses.",
    image: "powersferry",
    alt: "The 6190 Powers Ferry office building in Sandy Springs, Georgia, with a yellow soffit at its entrance.",
  },
  {
    name: "7710 NW 71st Court",
    location: "Tamarac, Florida",
    type: "Medical office",
    fact: "39,640 SF that went from a quarter full to three-quarters let inside the first year of ownership.",
    image: "tamarac",
    alt: "Three-storey medical office building framed by palm trees in Tamarac, Florida.",
  },
];

export const approach = [
  {
    step: "01",
    title: "Identify",
    body: "Well-located buildings held back by occupancy, capital neglect or ownership fatigue.",
  },
  {
    step: "02",
    title: "Acquire",
    body: "Priced against current performance, underwritten against what the asset can support.",
  },
  {
    step: "03",
    title: "Reposition",
    body: "Renovation, re-tenanting and, where the building calls for it, a change of use entirely.",
  },
  {
    step: "04",
    title: "Operate",
    body: "In-house management, maintenance and construction keep costs and response times down.",
  },
  {
    step: "05",
    title: "Grow",
    body: "Stabilised income, a maintained building and a tenant base with reasons to renew.",
  },
];

export const leadership = [
  {
    name: "Andrew “Avi” Greenbaum",
    role: "Chief Executive Officer",
    image: "ldr-greenbaum",
    bio: "As Triple Double RE’s CEO, Andrew leads a team that uses strategies honed over nearly two decades of real estate development and management. Specializing in the medical and commercial office sectors, as well as hotel-to-residential conversion projects, Andrew and his team add value to projects through avenues including adaptive re-use, lease-up and renovation.",
  },
  {
    name: "Heath Wruble",
    role: "Chief Operating Officer",
    image: "ldr-wruble",
    bio: "Heath Wruble is an accomplished business executive and entrepreneur currently serving as the Chief Operating Officer and the Chief Compliance Officer of Triple Double Real Estate. Working closely with Andrew Greenbaum, Heath oversees the firm’s management, administration, and operational procedures. With a wealth of experience earned over more than 25 years on Wall Street, Heath brings a unique perspective to the real estate sector.",
  },
  {
    name: "Kadion Preston",
    role: "Chief Growth & Strategy Officer",
    image: "ldr-preston",
    bio: "Kadion Preston is Chief Growth & Strategy Officer of Triple Double Holdings, a company operating across affordable housing, modular construction, manufacturing, and regional commerce infrastructure. He leads growth strategy and commercial execution across the portfolio, helping scale ventures designed to solve critical infrastructure challenges.",
  },
  {
    name: "Karen Ives",
    role: "VP of Operations",
    image: "ldr-ives",
    bio: "Karen Ives is a seasoned real estate and operations executive whose career began in residential real estate in 2015 and quickly expanded into commercial acquisitions, investment strategy, and multi-market execution across Florida, Chicago, and South Carolina. She oversees key operational functions across the company’s properties, helps evaluate new ventures, and ensures priorities, decisions, and follow-through remain aligned across the business.",
  },
  {
    name: "Shiv Newaldass",
    role: "Real Estate Executive & Development Strategist",
    image: "ldr-newaldass",
    bio: "Shiv Newaldass is a seasoned real estate executive, urban redevelopment strategist, and public-sector leader with more than two decades of experience across development, government, infrastructure, and community transformation. He is recognized for his expertise in entitlements, acquisitions, asset management, zoning, and complex urban redevelopment.",
  },
  {
    name: "Sammy Rhein",
    role: "Director of Brokerage and Leasing of Medical Office Brokers",
    image: "ldr-rhein",
    bio: "Sammy Rhein is the Director of Brokerage and Leasing of Medical Office Brokers (MOB). He manages Triple Double’s leasing portfolio, overseeing lease-up strategies and leasing terms for the company. Sammy has helped fill millions of square feet of office and retail space since joining Triple Double in 2019.",
  },
];
