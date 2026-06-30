// Source: mgts-course-intelligence.md + MGTS_Fact_Verification_Tracker.xlsx
// (corrected against direct verification by Raza, June 30 2026)

export type Course = {
  slug: string;
  name: string;
  city: string;
  par: number;
  yards: string;
  type: string;
  hook: string;
};

export const COURSES: Course[] = [
  {
    slug: "bayonet",
    name: "Bayonet",
    city: "Seaside, CA",
    par: 72,
    yards: "7,024 yds",
    type: "Semi-private",
    hook: "The military-heritage championship at former Fort Ord — ranked among the toughest public courses in the country.",
  },
  {
    slug: "black-horse",
    name: "Black Horse",
    city: "Seaside, CA",
    par: 72,
    yards: "7,024 yds",
    type: "Semi-private",
    hook: "Sweeping vistas of Monterey Bay throughout the round, with fescue-framed fairways.",
  },
  {
    slug: "carmel-valley-ranch",
    name: "Carmel Valley Ranch",
    city: "Carmel Valley, CA",
    par: 70,
    yards: "6,117 yds",
    type: "Resort",
    hook: "Inland warmth and an early clear from the fog — a Pete Dye original with a Gene Bates redesign.",
  },
  {
    slug: "quail-lodge",
    name: "Quail Lodge & Golf Club",
    city: "Carmel Valley, CA",
    par: 71,
    yards: "6,500 yds",
    type: "Resort / semi-private",
    hook: "A resort round in the Carmel Valley sun, away from the coastal marine layer.",
  },
  {
    slug: "laguna-seca-golf-ranch",
    name: "Laguna Seca Golf Ranch",
    city: "Monterey, CA",
    par: 71,
    yards: "6,226 yds",
    type: "Daily-fee",
    hook: "An accessible daily-fee round close to downtown Monterey.",
  },
  {
    slug: "pacific-grove-golf-links",
    name: "Pacific Grove Golf Links",
    city: "Pacific Grove, CA",
    par: 70,
    yards: "5,727 yds",
    type: "Municipal",
    hook: "Ocean holes on a municipal budget — a coastal links round without the private-club price tag.",
  },
  {
    slug: "poppy-hills",
    name: "Poppy Hills Golf Course",
    city: "Pebble Beach, CA (Del Monte Forest)",
    par: 71,
    yards: "7,091 yds",
    type: "Daily-fee (NCGA)",
    hook: "Golf's most famous zip code, bentgrass greens, and no Pebble Beach Company gate fee.",
  },
  {
    slug: "club-at-pasadera",
    name: "The Club at Pasadera",
    city: "Monterey, CA",
    par: 71,
    yards: "6,673–6,733 yds",
    type: "Private (limited access)",
    hook: "A Jack Nicklaus Signature course on the Monterey Peninsula — Monday public access.",
  },
];
