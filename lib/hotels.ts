// Source: mgts-lodging-intelligence.md (verified June 2 2026) + Sean's
// confirmed Del Monte Golf Course correction (June 30 2026).
// Casa Munras room count + address confirmed by Raza (see Master Tracker).
// Quail Lodge room count confirmed by Raza: 93.

export type Hotel = {
  slug: string;
  name: string;
  city: string;
  tier: 1 | 2 | 3;
  description: string;
  onSiteGolf: string | null;
};

export const HOTELS: Hotel[] = [
  {
    slug: "hyatt-regency-monterey",
    name: "Hyatt Regency Monterey Hotel & Spa",
    city: "Monterey, CA",
    tier: 1,
    description:
      "22 secluded acres of Monterey pines, sitting directly on Del Monte Golf Course™, 2 miles from downtown.",
    onSiteGolf: "Del Monte Golf Course™",
  },
  {
    slug: "carmel-valley-ranch",
    name: "Carmel Valley Ranch",
    city: "Carmel Valley, CA",
    tier: 1,
    description:
      "All-suite resort on 500 acres, on-site Pete Dye golf course — the only Pete Dye design in Northern California.",
    onSiteGolf: "Carmel Valley Ranch Golf Course",
  },
  {
    slug: "quail-lodge",
    name: "Quail Lodge & Golf Club",
    city: "Carmel Valley, CA",
    tier: 1,
    description:
      "Best value golf-resort combo on the peninsula, with an on-site championship course and warm Carmel Valley weather.",
    onSiteGolf: "Quail Lodge & Golf Club",
  },
  {
    slug: "bernardus-lodge",
    name: "Bernardus Lodge & Spa",
    city: "Carmel Valley, CA",
    tier: 1,
    description:
      "A wine-country retreat with estate vineyard views, and guest access to The Club at Pasadera outside of Monday.",
    onSiteGolf: null,
  },
  {
    slug: "monterey-plaza",
    name: "Monterey Plaza Hotel & Spa",
    city: "Monterey, CA",
    tier: 2,
    description:
      "The only Forbes Four-Star hotel in Monterey, perched over the bay on historic Cannery Row.",
    onSiteGolf: null,
  },
  {
    slug: "intercontinental-the-clement",
    name: "InterContinental The Clement Monterey",
    city: "Monterey, CA",
    tier: 2,
    description:
      "Bayfront on Cannery Row, next door to the Monterey Bay Aquarium, with panoramic coastal views.",
    onSiteGolf: null,
  },
  {
    slug: "portola-hotel",
    name: "Portola Hotel & Spa",
    city: "Monterey, CA",
    tier: 2,
    description:
      "The Central Coast's first LEED-certified hotel, downtown adjacent to the Monterey Conference Center — best fit for large groups.",
    onSiteGolf: null,
  },
  {
    slug: "lauberge-carmel",
    name: "L'Auberge Carmel",
    city: "Carmel-by-the-Sea, CA",
    tier: 3,
    description:
      "A 20-room Relais & Châteaux property in the heart of Carmel village, a block from the beach.",
    onSiteGolf: null,
  },
  {
    slug: "casa-munras",
    name: "Casa Munras Garden Hotel & Spa",
    city: "Monterey, CA",
    tier: 3,
    description:
      "Monterey's first hotel, dating to 1824, with hacienda-style architecture and lush courtyard gardens.",
    onSiteGolf: null,
  },
];
