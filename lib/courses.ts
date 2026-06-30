// Source: mgts-course-intelligence.md + MGTS_Fact_Verification_Tracker.xlsx
// (corrected against direct verification by Raza, June 30 2026)
// Pebble Beach Resorts courses added per Sean's confirmed approval + IAGTO
// Program Info PDF (dated 7/23/24) — TM/R symbols mandatory on every use,
// per IAGTO agreement. Final symbol-per-name table should still be
// cross-checked against the actual signed online agreement when available.

export type Course = {
  slug: string;
  name: string;
  city: string;
  par: number;
  yards: string;
  type: string;
  hook: string;
  image?: string;
};

export const COURSES: Course[] = [
  {
    slug: "bayonet",
    image: "https://images.unsplash.com/photo-1538648759472-7251f7cb2c2f",
    name: "Bayonet",
    city: "Seaside, CA",
    par: 72,
    yards: "7,024 yds",
    type: "Semi-private",
    hook: "The military-heritage championship at former Fort Ord — ranked among the toughest public courses in the country.",
  },
  {
    slug: "black-horse",
    image: "https://images.unsplash.com/photo-1592937238247-cd0090e02f65",
    name: "Black Horse",
    city: "Seaside, CA",
    par: 72,
    yards: "7,024 yds",
    type: "Semi-private",
    hook: "Sweeping vistas of Monterey Bay throughout the round, with fescue-framed fairways.",
  },
  {
    slug: "carmel-valley-ranch",
    image: "https://images.unsplash.com/photo-1500932334442-8761ee4810a7",
    name: "Carmel Valley Ranch",
    city: "Carmel Valley, CA",
    par: 70,
    yards: "6,117 yds",
    type: "Resort",
    hook: "Inland warmth and an early clear from the fog — a Pete Dye original with a Gene Bates redesign.",
  },
  {
    slug: "quail-lodge",
    image: "https://images.unsplash.com/photo-1632946269126-0f8edbe8b068",
    name: "Quail Lodge & Golf Club",
    city: "Carmel Valley, CA",
    par: 71,
    yards: "6,500 yds",
    type: "Resort / semi-private",
    hook: "A resort round in the Carmel Valley sun, away from the coastal marine layer.",
  },
  {
    slug: "laguna-seca-golf-ranch",
    image: "https://images.unsplash.com/photo-1623567341691-1f47b5cf949e",
    name: "Laguna Seca Golf Ranch",
    city: "Monterey, CA",
    par: 71,
    yards: "6,226 yds",
    type: "Daily-fee",
    hook: "An accessible daily-fee round close to downtown Monterey.",
  },
  {
    slug: "pacific-grove-golf-links",
    image: "https://images.unsplash.com/photo-1587205476864-4a5a195167b4",
    name: "Pacific Grove Golf Links",
    city: "Pacific Grove, CA",
    par: 70,
    yards: "5,727 yds",
    type: "Municipal",
    hook: "Ocean holes on a municipal budget — a coastal links round without the private-club price tag.",
  },
  {
    slug: "poppy-hills",
    image: "https://images.unsplash.com/photo-1605144884374-ecbb643615f6",
    name: "Poppy Hills Golf Course",
    city: "Pebble Beach, CA (Del Monte Forest)",
    par: 71,
    yards: "7,091 yds",
    type: "Daily-fee (NCGA)",
    hook: "Golf's most famous zip code, bentgrass greens, and no Pebble Beach Company gate fee.",
  },
  {
    slug: "club-at-pasadera",
    image: "https://images.unsplash.com/photo-1606443192517-919653213206",
    name: "The Club at Pasadera",
    city: "Monterey, CA",
    par: 71,
    yards: "6,673–6,733 yds",
    type: "Private (limited access)",
    hook: "A Jack Nicklaus Signature course on the Monterey Peninsula — Monday public access.",
  },
  {
    slug: "pebble-beach-golf-links",
    name: "Pebble Beach Golf Links®",
    city: "Pebble Beach, CA",
    par: 72,
    yards: "6,802 yds",
    type: "Resort (Pebble Beach Resorts)",
    hook: "Designed by Jack Neville and Douglas Grant, opened 1919 — the most famous cliff-top course in American golf.",
  },
  {
    slug: "spyglass-hill",
    name: "Spyglass Hill Golf Course®",
    city: "Pebble Beach, CA",
    par: 72,
    yards: "6,960 yds",
    type: "Resort (Pebble Beach Resorts)",
    hook: "A Robert Trent Jones Sr. design moving from dunes to forest — widely regarded as the toughest of the Pebble Beach Resorts courses.",
  },
  {
    slug: "links-at-spanish-bay",
    name: "The Links at Spanish Bay™",
    city: "Pebble Beach, CA",
    par: 72,
    yards: "6,726 yds",
    type: "Resort (Pebble Beach Resorts)",
    hook: "A true links-style course on the Monterey Peninsula, recently transformed by architect Gil Hanse.",
  },
  {
    slug: "del-monte-golf-course",
    name: "Del Monte Golf Course®",
    city: "Monterey, CA",
    par: 72,
    yards: "6,356 yds",
    type: "Resort (Pebble Beach Resorts)",
    hook: "Originally laid out in 1897 — the oldest golf course in continuous use west of the Mississippi.",
  },
  {
    slug: "the-hay",
    name: "The Hay™",
    city: "Pebble Beach, CA",
    par: 27,
    yards: "670 yds",
    type: "Resort short course (Pebble Beach Resorts)",
    hook: "A reimagined short course experience at Pebble Beach, originally opened 1957 and redesigned by Tiger Woods and TGR Design in 2021.",
  },
  {
    slug: "pasatiempo",
    image: "https://images.unsplash.com/photo-1709525616662-8d9f9a995ceb",
    name: "Pasatiempo Golf Course",
    city: "Santa Cruz, CA",
    par: 70,
    yards: "6,473 yds",
    type: "Semi-private",
    hook: "Alister MacKenzie's home course, where he lived alongside the 6th green — a top-100 design in its own right.",
  },
];
