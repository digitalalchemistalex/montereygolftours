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
  image: string;
};

export const HOTELS: Hotel[] = [
  {
    slug: "hyatt-regency-monterey",
    image: "https://images.unsplash.com/photo-1549294413-26f195200c16",
    name: "Hyatt Regency Monterey Hotel & Spa",
    city: "Monterey, CA",
    tier: 1,
    description:
      "22 secluded acres of Monterey pines, sitting directly on Del Monte Golf Course®, 2 miles from downtown.",
    onSiteGolf: "Del Monte Golf Course®",
  },
  {
    slug: "carmel-valley-ranch",
    image: "https://images.unsplash.com/photo-1623718649591-311775a30c43",
    name: "Carmel Valley Ranch",
    city: "Carmel Valley, CA",
    tier: 1,
    description:
      "All-suite resort on 500 acres, on-site Pete Dye golf course — the only Pete Dye design in Northern California.",
    onSiteGolf: "Carmel Valley Ranch Golf Course",
  },
  {
    slug: "quail-lodge",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    name: "Quail Lodge & Golf Club",
    city: "Carmel Valley, CA",
    tier: 1,
    description:
      "Best value golf-resort combo on the peninsula, with an on-site championship course and warm Carmel Valley weather.",
    onSiteGolf: "Quail Lodge & Golf Club",
  },
  {
    slug: "bernardus-lodge",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6",
    name: "Bernardus Lodge & Spa",
    city: "Carmel Valley, CA",
    tier: 1,
    description:
      "A wine-country retreat with estate vineyard views, and guest access to The Club at Pasadera outside of Monday.",
    onSiteGolf: null,
  },
  {
    slug: "monterey-plaza",
    image: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd",
    name: "Monterey Plaza Hotel & Spa",
    city: "Monterey, CA",
    tier: 2,
    description:
      "The only Forbes Four-Star hotel in Monterey, perched over the bay on historic Cannery Row.",
    onSiteGolf: null,
  },
  {
    slug: "intercontinental-the-clement",
    image: "https://images.unsplash.com/photo-1584132869994-873f9363a562",
    name: "InterContinental The Clement Monterey",
    city: "Monterey, CA",
    tier: 2,
    description:
      "Bayfront on Cannery Row, next door to the Monterey Bay Aquarium, with panoramic coastal views.",
    onSiteGolf: null,
  },
  {
    slug: "portola-hotel",
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864",
    name: "Portola Hotel & Spa",
    city: "Monterey, CA",
    tier: 2,
    description:
      "The Central Coast's first LEED-certified hotel, downtown adjacent to the Monterey Conference Center — best fit for large groups.",
    onSiteGolf: null,
  },
  {
    slug: "lauberge-carmel",
    image: "https://images.unsplash.com/photo-1582533568805-78a15dcb01b5",
    name: "L'Auberge Carmel",
    city: "Carmel-by-the-Sea, CA",
    tier: 3,
    description:
      "A 20-room Relais & Châteaux property in the heart of Carmel village, a block from the beach.",
    onSiteGolf: null,
  },
  {
    slug: "casa-munras",
    image: "https://images.unsplash.com/photo-1570213489059-0aac6626cade",
    name: "Casa Munras Garden Hotel & Spa",
    city: "Monterey, CA",
    tier: 3,
    description:
      "Monterey's first hotel, dating to 1824, with hacienda-style architecture and lush courtyard gardens.",
    onSiteGolf: null,
  },
];
