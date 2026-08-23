// Source: mgts-lodging-intelligence.md (verified June 2 2026) + Sean's
// confirmed Del Monte Golf Course correction (June 30 2026).
// Casa Munras room count + address confirmed by Raza (see Master Tracker).
// Quail Lodge room count confirmed by Raza: 93.
// 2026-08-21: Portola Hotel moved to position #1 per Sean (S1 — best fit for large groups).

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
    slug: "portola-hotel",
    image: "/images/hotels/portola-hotel-hero.jpg",
    name: "Portola Hotel & Spa",
    city: "Monterey, CA",
    tier: 2,
    description:
      "The Central Coast's first LEED-certified hotel, downtown adjacent to the Monterey Conference Center — best fit for large groups.",
    onSiteGolf: null,
  },
  {
    slug: "hyatt-regency-monterey",
    image: "/images/hotels/hyatt-regency-hero.webp",
    name: "Hyatt Regency Monterey Hotel & Spa",
    city: "Monterey, CA",
    tier: 1,
    description:
      "22 secluded acres of Monterey pines, sitting directly on Del Monte Golf Course®, 2 miles from downtown.",
    onSiteGolf: "Del Monte Golf Course®",
  },
  {
    slug: "carmel-valley-ranch",
    image: "/images/hotels/carmel-valley-ranch-hotel-hero.webp",
    name: "Carmel Valley Ranch",
    city: "Carmel Valley, CA",
    tier: 1,
    description:
      "All-suite resort on 500 acres, on-site Pete Dye golf course — the only Pete Dye design in Northern California.",
    onSiteGolf: "Carmel Valley Ranch Golf Course",
  },
  {
    slug: "quail-lodge",
    image: "/images/hotels/quail-lodge-hotel-hero.webp",
    name: "Quail Lodge & Golf Club",
    city: "Carmel Valley, CA",
    tier: 1,
    description:
      "Best value golf-resort combo on the peninsula, with an on-site championship course and warm Carmel Valley weather.",
    onSiteGolf: "Quail Lodge & Golf Club",
  },
  {
    slug: "bernardus-lodge",
    image: "/images/hotels/bernardus-lodge-hero.webp",
    name: "Bernardus Lodge & Spa",
    city: "Carmel Valley, CA",
    tier: 1,
    description:
      "A wine-country retreat with estate vineyard views, and guest access to The Club at Pasadera outside of Monday.",
    onSiteGolf: null,
  },
  {
    slug: "monterey-plaza",
    image: "/images/hotels/monterey-plaza-hero.webp",
    name: "Monterey Plaza Hotel & Spa",
    city: "Monterey, CA",
    tier: 2,
    description:
      "The only Forbes Four-Star hotel in Monterey, perched over the bay on historic Cannery Row.",
    onSiteGolf: null,
  },
  {
    slug: "intercontinental-the-clement",
    image: "/images/hotels/intercontinental-hero.avif",
    name: "InterContinental The Clement Monterey",
    city: "Monterey, CA",
    tier: 2,
    description:
      "Bayfront on Cannery Row, next door to the Monterey Bay Aquarium, with panoramic coastal views.",
    onSiteGolf: null,
  },
  {
    slug: "casa-munras",
    image: "/images/hotels/casa-munras-hero.avif",
    name: "Casa Munras Garden Hotel & Spa",
    city: "Monterey, CA",
    tier: 3,
    description:
      "Monterey's first hotel, dating to 1824, with hacienda-style architecture and lush courtyard gardens.",
    onSiteGolf: null,
  },
  {
    slug: "hotel-abrego",
    image: "/images/hotels/hotel-abrego-hero.avif",
    name: "Hotel Abrego",
    city: "Monterey, CA",
    tier: 3,
    description:
      "Downtown Monterey boutique property, walkable to Cannery Row and the Monterey Bay Aquarium.",
    onSiteGolf: null,
  },
  {
    slug: "embassy-suites-monterey-bay-seaside",
    image: "/images/hotels/embassy-suites-hero.avif",
    name: "Embassy Suites by Hilton Monterey Bay Seaside",
    city: "Seaside, CA",
    tier: 2,
    description:
      "All-suite property in Seaside with a separate living room and bedroom in every unit.",
    onSiteGolf: null,
  },
  {
    slug: "monterey-beach-hotel",
    image: "/images/hotels/monterey-beach-hotel-hero.webp",
    name: "Monterey Beach Hotel, A Tribute Portfolio Hotel",
    city: "Monterey, CA",
    tier: 2,
    description:
      "The only Monterey Golf Tours hotel located directly on the beach.",
    onSiteGolf: null,
  },
  {
    slug: "lodge-at-pebble-beach",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    name: "The Lodge at Pebble Beach™",
    city: "Pebble Beach, CA",
    tier: 1,
    description:
      "Open since 1919, framing the 18th green of Pebble Beach Golf Links® — the original and most storied property at Pebble Beach Resorts®. Hotel guests can book tee times up to 18 months in advance.",
    onSiteGolf: "Pebble Beach Golf Links®",
  },
  {
    slug: "inn-at-spanish-bay",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=800&q=80",
    name: "The Inn at Spanish Bay™",
    city: "Pebble Beach, CA",
    tier: 1,
    description:
      "Nestled between Del Monte Forest and the Pacific Ocean, overlooking The Links at Spanish Bay®. All rooms feature a gas fireplace, private patio or balcony, and views of the forest, fairways, or ocean.",
    onSiteGolf: "The Links at Spanish Bay® (closed — reopens April 17, 2027)",
  },
  {
    slug: "casa-palmero",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    name: "Casa Palmero™",
    city: "Pebble Beach, CA",
    tier: 1,
    description:
      "An intimate Mediterranean-style hideaway with just 24 rooms and suites, situated on the 1st and 2nd fairways of Pebble Beach Golf Links®. The entire property can be reserved exclusively by one group.",
    onSiteGolf: "Pebble Beach Golf Links®",
  },
];
