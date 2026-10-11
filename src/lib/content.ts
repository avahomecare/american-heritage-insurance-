export const lines = [
  {
    id: "auto",
    group: "Personal",
    index: "01",
    title: "Personal auto",
    summary: "Liability, collision, comprehensive, and uninsured motorist for the cars you drive.",
    detail:
      "We look at who drives, how the car is used, and what Colorado minimums actually leave uncovered. A quote compares deductibles and liability limits side by side, not just the monthly number.",
  },
  {
    id: "home",
    group: "Personal",
    index: "02",
    title: "Home & renters",
    summary: "Dwelling or belongings, plus liability if someone is hurt at the property.",
    detail:
      "Home, condo, and renters policies protect different things, and the forms aren't interchangeable. We help you pick the right one for what you own and flag the gaps that matter in Colorado — water backup, scheduled jewelry, landlord liability, and hail or wind damage that standard policies may not fully cover. Bundling your home with auto usually adds a multi-policy discount, and we compare quotes from multiple major carriers so you see the differences before you choose.",
  },
  {
    id: "umbrella",
    group: "Personal",
    index: "03",
    title: "Umbrella",
    summary: "Extra liability that sits above auto and home when a claim is larger than those policies.",
    detail:
      "Umbrella coverage adds a layer above your auto and home limits — useful when you have assets, a rental, or a side business. We check that your underlying policies line up before recommending an amount.",
  },
  {
    id: "life",
    group: "Personal",
    index: "04",
    title: "Life",
    summary: "Term and permanent options for income replacement and final expenses.",
    detail:
      "Life insurance starts with what the money needs to do — replace income, pay off a mortgage, or leave something specific. Then we compare term lengths and permanent options side by side. No policy is issued through this site.",
  },
  {
    id: "gl",
    group: "Commercial",
    index: "05",
    title: "General liability",
    summary: "For businesses whose main risk is injury or property damage to someone else.",
    detail:
      "Shops, contractors, cleaners, and service companies usually need this before a landlord or a general contractor will let them start. We describe the job the way you do it, not with a one-size-fits-all category.",
  },
  {
    id: "package",
    group: "Commercial",
    index: "06",
    title: "Commercial package",
    summary: "Property and liability together for a location and the work done there.",
    detail:
      "A package can cover the building or tenant improvements, business property, and liability in one contract. We separate what the landlord insures from what you still have to buy.",
  },
  {
    id: "cauto",
    group: "Commercial",
    index: "07",
    title: "Commercial auto",
    summary: "Vehicles titled to the business, including hired and non-owned use.",
    detail:
      "Personal auto policies often exclude business use. If employees drive, or the company owns the truck, the vehicle belongs on a commercial form with the right radius and driver list.",
  },
  {
    id: "trucking",
    group: "Commercial",
    index: "08",
    title: "Transportation",
    summary: "Auto liability and cargo for haulers, including package placements.",
    detail:
      "For-hire and private haulers need liability limits, cargo, and filings that match the freight and the radius. We collect the vehicles, drivers, and commodities before we go to market.",
  },
] as const;

export type LineId = (typeof lines)[number]["id"];

export const steps = [
  {
    n: "01",
    title: "Tell us the risk",
    body: "What you drive, own, or operate. A current policy helps, but you do not need one to start.",
  },
  {
    n: "02",
    title: "We compare carriers",
    body: "We compare quotes from multiple major carriers so you don't have to.",
  },
  {
    n: "03",
    title: "You choose",
    body: "Nothing is bound from this website. Coverage starts only after you accept a proposal and the carrier agrees.",
  },
] as const;

export const office = {
  phoneDisplay: "(720) 748-3893",
  phoneHref: "tel:+17207483893",
  email: "info@ahibinsurance.com",
  emailHref: "mailto:info@ahibinsurance.com",
  address: "2600 S Parker Rd, Building 3, Suite 237, Aurora, CO 80014",
  hours: "Monday–Friday, 9:00 a.m.–5:00 p.m.",
  founded: 2007,
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=2600+S+Parker+Rd,+Building+3,+Suite+237,+Aurora,+CO+80014",
  reviewHref:
    "https://www.google.com/maps/search/?api=1&query=American+Heritage+Insurance+Brokers,+Inc.,+2600+S+Parker+Rd,+Building+3,+Suite+237,+Aurora,+CO+80014",
};

export const licenses = {
  agencyName: "American Heritage Insurance Brokers, Inc.",
  agencyNumber: "302197",
  agencyNpn: "9785840",
  agencySince: "October 24, 2007",
};

export const cities = [
  "Aurora",
  "Denver",
  "Centennial",
  "Parker",
  "Englewood",
  "Greenwood Village",
  "Highlands Ranch",
  "Littleton",
];
