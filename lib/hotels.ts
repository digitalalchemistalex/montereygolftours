// Source: mgts-lodging-intelligence.md (verified June 2 2026)
// Homepage shows Tier 1 (golf-anchor) properties only. Unverified fields omitted.

export type Hotel = {
  slug: string;
  name: string;
  city: string;
  description: string;
  onSiteGolf: string | null;
};

export const HOTELS: Hotel[] = [
  {
    slug: "hyatt-regency-monterey",
    name: "Hyatt Regency Monterey Hotel & Spa",
    city: "Monterey, CA",
    description:
      "22 secluded acres of Monterey pines, 2 miles from downtown. Stay & play packages with Poppy Hills, Bayonet, and Black Horse.",
    onSiteGolf: null,
  },
  {
    slug: "carmel-valley-ranch",
    name: "Carmel Valley Ranch",
    city: "Carmel Valley, CA",
    description:
      "All-suite resort on 500 acres, on-site Pete Dye golf course — the only Pete Dye design in Northern California.",
    onSiteGolf: "Carmel Valley Ranch Golf Course",
  },
  {
    slug: "quail-lodge",
    name: "Quail Lodge & Golf Club",
    city: "Carmel, CA",
    description:
      "Best value golf-resort combo on the peninsula, with an on-site championship course and warm Carmel Valley weather.",
    onSiteGolf: "Quail Lodge & Golf Club",
  },
];
