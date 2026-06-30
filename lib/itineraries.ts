// Source: mgts-itinerary-templates.md (verified June 2 2026)
// Naming corrections applied per Sean's confirmed Pebble Beach authorization
// and the Club at Pasadera naming correction (June 30 2026).
// Pricing ranges from MGTS_Action_Tracker_Raza.xlsx (confirmed cost recalculations).

export type ItineraryDay = {
  day: number;
  title: string;
  items: string[];
};

export type ItineraryTemplate = {
  slug: string;
  title: string;
  shortTitle: string;
  durationDays: number;
  rounds: string;
  target: string;
  baseHotel: string;
  priceFrom: number;
  priceTo: number;
  priceVerified: boolean;
  days: ItineraryDay[];
  courseSlugs: string[];
  hotelSlugs: string[];
  mostBooked?: boolean;
};

export const ITINERARIES: Record<string, ItineraryTemplate> = {
  "3-day-monterey-golf-weekend": {
    slug: "3-day-monterey-golf-weekend",
    title: "3-Day Monterey Golf Weekend",
    shortTitle: "Weekend",
    durationDays: 3,
    rounds: "3 rounds",
    target: "Casual golfer group, weekend escape, 4–8 players",
    baseHotel: "Hyatt Regency Monterey or Portola Hotel",
    priceFrom: 564,
    priceVerified: true,
    priceTo: 1740,
    courseSlugs: ["pacific-grove-golf-links", "bayonet", "laguna-seca-golf-ranch"],
    hotelSlugs: ["hyatt-regency-monterey", "portola-hotel"],
    days: [
      {
        day: 1,
        title: "Arrival + Pacific Grove",
        items: [
          "Arrive at Monterey Regional Airport (MRY) or self-drive",
          "Check in at Hyatt Regency Monterey or Portola Hotel",
          "Afternoon: Pacific Grove Golf Links — an easy shakeout round on travel day, with ocean views on the back nine",
          "Evening: dinner at Cannery Row",
        ],
      },
      {
        day: 2,
        title: "Main event: Bayonet",
        items: [
          "Morning: Bayonet — 8–9am tee time for the full-day challenge",
          "Afternoon: free time — Carmel-by-the-Sea, the Monterey Bay Aquarium, or an optional 9 at Black Horse",
          "Evening: dinner near Monterey Plaza",
        ],
      },
      {
        day: 3,
        title: "Laguna Seca + departure",
        items: [
          "Morning: Laguna Seca Golf Ranch — a faster-playing, accessible final round",
          "Afternoon: depart after the round",
        ],
      },
    ],
  },
  "4-day-monterey-peninsula-golf-trip": {
    slug: "4-day-monterey-peninsula-golf-trip",
    title: "4-Day Classic Peninsula",
    shortTitle: "Classic Peninsula",
    durationDays: 4,
    rounds: "4 rounds",
    target: "Serious golfer group, bucket-list trip, 4–12 players",
    baseHotel: "Hyatt Regency Monterey or Monterey Plaza Hotel & Spa",
    priceFrom: 949,
    priceVerified: true,
    priceTo: 2340,
    mostBooked: true,
    courseSlugs: ["poppy-hills", "bayonet", "carmel-valley-ranch", "black-horse"],
    hotelSlugs: ["hyatt-regency-monterey", "monterey-plaza"],
    days: [
      {
        day: 1,
        title: "Arrival + Poppy Hills",
        items: [
          "Arrive at MRY, check in at Hyatt Regency Monterey",
          "Afternoon: Poppy Hills Golf Course — a trophy NCGA-owned course in the Del Monte Forest, without the resort price tag",
          "Evening: dinner at the resort or downtown Monterey",
        ],
      },
      {
        day: 2,
        title: "Bayonet (challenge day)",
        items: [
          "Full day: Bayonet — 8am tee time",
          "Post-round: rest at the hotel, explore Cannery Row",
          "Evening: group dinner at Schooners, Monterey Plaza",
        ],
      },
      {
        day: 3,
        title: "Carmel Valley day",
        items: [
          "Morning: 25-minute drive to Carmel Valley",
          "Round: Carmel Valley Ranch (recommended for the Pete Dye design) or Quail Lodge",
          "Afternoon: Carmel Valley wine tasting — Bernardus Winery, Folktale, and others",
          "Return to the hotel by evening",
        ],
      },
      {
        day: 4,
        title: "Black Horse + departure",
        items: ["Morning: Black Horse — 7:30am tee time", "Afternoon: depart after the round"],
      },
    ],
  },
  "5-day-complete-monterey-golf-vacation": {
    slug: "5-day-complete-monterey-golf-vacation",
    title: "5-Day Full Peninsula",
    shortTitle: "Full Peninsula",
    durationDays: 5,
    rounds: "5 rounds",
    target: "Avid golfer group wanting to play every key course, 4–12 players",
    baseHotel: "3 nights Hyatt Regency Monterey + 2 nights Carmel Valley Ranch",
    priceFrom: 1264,
    priceVerified: true,
    priceTo: 2915,
    courseSlugs: [
      "pacific-grove-golf-links",
      "poppy-hills",
      "bayonet",
      "carmel-valley-ranch",
      "quail-lodge",
    ],
    hotelSlugs: ["hyatt-regency-monterey", "carmel-valley-ranch"],
    days: [
      {
        day: 1,
        title: "Arrival + Pacific Grove",
        items: [
          "Arrive at MRY, check in at Hyatt Regency Monterey",
          "Afternoon: Pacific Grove Golf Links (shakeout round)",
          "Evening: dinner downtown Monterey",
        ],
      },
      {
        day: 2,
        title: "Poppy Hills",
        items: [
          "Morning: Poppy Hills Golf Course — championship NCGA conditions in the Del Monte Forest",
          "Afternoon: rest or explore",
          "Evening: dinner on Cannery Row",
        ],
      },
      {
        day: 3,
        title: "Bayonet (challenge day)",
        items: [
          "Full day: Bayonet",
          "Check out of the Hyatt, drive to Carmel Valley Ranch (25 min)",
          "Evening: dinner at Valley Kitchen, Carmel Valley Ranch",
        ],
      },
      {
        day: 4,
        title: "Carmel Valley Ranch",
        items: [
          "Morning: Carmel Valley Ranch on-site course (Pete Dye design)",
          "Afternoon: optional round at The Club at Pasadera if available",
          "Evening: sunset at the Carmel Valley Ranch vineyard",
        ],
      },
      {
        day: 5,
        title: "Quail Lodge + departure",
        items: [
          "Morning: Quail Lodge Golf Club (10 minutes from Carmel Valley Ranch)",
          "Post-round: visit Carmel-by-the-Sea",
          "Afternoon: depart",
        ],
      },
    ],
  },
  "7-day-ultimate-monterey-golf-trip": {
    slug: "7-day-ultimate-monterey-golf-trip",
    title: "7-Day Ultimate Monterey",
    shortTitle: "Ultimate Monterey",
    durationDays: 7,
    rounds: "6–7 rounds",
    target: "Golf enthusiast wanting everything, 2–8 players",
    baseHotel: "3 nights Carmel Valley Ranch + 4 nights Monterey Plaza Hotel & Spa",
    priceFrom: 2500,
    priceVerified: false,
    priceTo: 4000,
    courseSlugs: [
      "carmel-valley-ranch",
      "club-at-pasadera",
      "quail-lodge",
      "poppy-hills",
      "bayonet",
      "pacific-grove-golf-links",
      "black-horse",
      "laguna-seca-golf-ranch",
    ],
    hotelSlugs: ["carmel-valley-ranch", "monterey-plaza"],
    days: [
      {
        day: 1,
        title: "Arrival + Carmel Valley Ranch",
        items: [
          "Arrive at MRY, suite check-in at Carmel Valley Ranch",
          "Afternoon: Carmel Valley Ranch on-site course (Pete Dye design)",
          "Evening: dinner at Valley Kitchen",
        ],
      },
      {
        day: 2,
        title: "The Club at Pasadera + wine",
        items: [
          "Morning: The Club at Pasadera (limited access — confirm availability in advance)",
          "Afternoon: Carmel Valley wine country — Bernardus Winery, Folktale",
          "Evening: dinner at Bernardus Lodge (Lucia Restaurant) or Carmel Valley Ranch",
        ],
      },
      {
        day: 3,
        title: "Quail Lodge",
        items: [
          "Morning: Quail Lodge Golf Club (10 minutes from Carmel Valley Ranch)",
          "Afternoon: drive to Carmel-by-the-Sea, check in at Monterey Plaza",
          "Evening: dinner in Carmel village",
        ],
      },
      {
        day: 4,
        title: "Poppy Hills",
        items: [
          "Morning: Poppy Hills Golf Course",
          "Afternoon: explore Carmel Village or Carmel Beach",
          "Evening: dinner at Monterey Plaza",
        ],
      },
      {
        day: 5,
        title: "Bayonet (challenge day)",
        items: ["Full day: Bayonet", "Evening: rest, spa time"],
      },
      {
        day: 6,
        title: "Pacific Grove + Black Horse",
        items: [
          "Morning: Pacific Grove Golf Links (a quick, shorter round)",
          "Afternoon: Black Horse",
          "Evening: farewell dinner at Monterey Plaza",
        ],
      },
      {
        day: 7,
        title: "Laguna Seca + departure",
        items: ["Morning: Laguna Seca Golf Ranch (final round)", "Afternoon: depart MRY"],
      },
    ],
  },
  "carmel-valley-golf-getaway": {
    slug: "carmel-valley-golf-getaway",
    title: "Carmel Valley Golf Getaway",
    shortTitle: "Carmel Valley Getaway",
    durationDays: 3,
    rounds: "2–3 rounds",
    target: "Golfer plus non-golfing partner, wine-country-meets-golf",
    baseHotel: "Carmel Valley Ranch or Bernardus Lodge",
    priceFrom: 900,
    priceVerified: false,
    priceTo: 1500,
    courseSlugs: ["carmel-valley-ranch", "quail-lodge"],
    hotelSlugs: ["carmel-valley-ranch", "bernardus-lodge"],
    days: [
      {
        day: 1,
        title: "Arrival + Carmel Valley Ranch",
        items: [
          "Check in at Carmel Valley Ranch",
          "Afternoon round: Carmel Valley Ranch course",
          "Evening: dinner at Valley Kitchen",
        ],
      },
      {
        day: 2,
        title: "Wine + optional golf",
        items: [
          "Morning: wine country exploration — Bernardus Winery, Folktale, Cima Collina",
          "Afternoon: optional round at Quail Lodge, or spa/resort time at Carmel Valley Ranch",
          "Evening: dinner in Carmel-by-the-Sea (20 min drive)",
        ],
      },
      {
        day: 3,
        title: "Departure",
        items: ["Optional: Carmel Beach walk, Carmel shopping", "Depart"],
      },
    ],
  },
  "monterey-golf-trip-best-value": {
    slug: "monterey-golf-trip-best-value",
    title: "Best Value Peninsula Trip",
    shortTitle: "Best Value",
    durationDays: 3,
    rounds: "3 rounds",
    target: "Budget-conscious golfer group, 4–8 players",
    baseHotel: "Casa Munras Garden Hotel & Spa or Portola Hotel",
    priceFrom: 350,
    priceVerified: false,
    priceTo: 600,
    courseSlugs: ["pacific-grove-golf-links", "laguna-seca-golf-ranch", "black-horse"],
    hotelSlugs: ["casa-munras", "portola-hotel"],
    days: [
      {
        day: 1,
        title: "Pacific Grove Golf Links",
        items: [
          "Arrive, check in",
          "Afternoon: Pacific Grove Golf Links — among the lowest green fees on the peninsula, with genuine ocean views",
        ],
      },
      {
        day: 2,
        title: "Laguna Seca",
        items: [
          "Morning: Laguna Seca Golf Ranch — best-value championship-style golf at public-course pricing",
          "Afternoon: Monterey town exploration",
        ],
      },
      {
        day: 3,
        title: "Black Horse + departure",
        items: ["Morning: Black Horse — more affordable than Bayonet, still an excellent round", "Depart after the round"],
      },
    ],
  },
};
