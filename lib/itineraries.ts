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
  image: string;
  days: ItineraryDay[];
  courseSlugs: string[];
  hotelSlugs: string[];
  mostBooked?: boolean;
  faqs: { q: string; a: string }[];
};

export const ITINERARIES: Record<string, ItineraryTemplate> = {
  "3-day-monterey-golf-weekend": {
    slug: "3-day-monterey-golf-weekend",
    image: "https://images.unsplash.com/photo-1605147861225-7bcd55f8e513",
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
    faqs: [
      { q: "How many people is this trip built for?", a: "This 3-day weekend is designed for a casual golfer group of 4–8 players." },
      { q: "Which courses are included?", a: "Pacific Grove Golf Links, Bayonet, and Laguna Seca Golf Ranch — one round each over the 3 days." },
      { q: "Where do we stay?", a: "Hyatt Regency Monterey or Portola Hotel, both central to all three courses." },
      { q: "What's the price range for this trip?", a: "Verified at $564–$1,740 per person, depending on room and course selections." },
      { q: "Is this a good fit for a first golf trip to Monterey?", a: "Yes — it's built as an accessible weekend introduction, pairing an easy shakeout round with one serious challenge day at Bayonet." },
      { q: "Can this itinerary be extended?", a: "Yes — get a custom quote and we can extend it toward the 4-day or 5-day version if you want more rounds." },
    ],
  },
  "4-day-monterey-peninsula-golf-trip": {
    slug: "4-day-monterey-peninsula-golf-trip",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=800&q=80",
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
    faqs: [
      { q: "Why is this the most booked itinerary?", a: "It balances 4 rounds across difficulty levels — Poppy Hills, Bayonet, a Carmel Valley round, and Black Horse — without the longer commitment of the 5- or 7-day trips." },
      { q: "How many rounds are included?", a: "4 rounds over 4 days." },
      { q: "Where do we stay?", a: "Hyatt Regency Monterey or Monterey Plaza Hotel & Spa." },
      { q: "What's the price range?", a: "Verified at $949–$2,340 per person, depending on room and course selections." },
      { q: "Does this include a Carmel Valley round?", a: "Yes — day 3 is dedicated to Carmel Valley golf, giving the group a warmer, more relaxed round between the two Fort Ord challenge days." },
      { q: "Is Bayonet the hardest round on this trip?", a: "Yes — it's positioned as the trip's challenge day, with an early tee time to make the most of it." },
    ],
  },
  "5-day-complete-monterey-golf-vacation": {
    slug: "5-day-complete-monterey-golf-vacation",
    image: "https://images.unsplash.com/photo-1592919505780-303950717480",
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
    faqs: [
      { q: "How many rounds and nights does this trip include?", a: "5 rounds over 5 days, with 3 nights at Hyatt Regency Monterey and 2 nights at Carmel Valley Ranch." },
      { q: "Why split the stay between two hotels?", a: "It pairs the central Monterey location for the coastal rounds with a Carmel Valley base for the warmer, inland golf days." },
      { q: "What's the price range?", a: "Verified at $1,264–$2,915 per person, depending on room and course selections." },
      { q: "Which courses are included?", a: "Pacific Grove, Poppy Hills, Bayonet, Carmel Valley Ranch, and Quail Lodge." },
      { q: "Is this trip good for mixed-skill groups?", a: "Yes — it mixes an accessible opener, a serious Del Monte Forest round, the Bayonet challenge day, and two more relaxed Carmel Valley rounds." },
      { q: "Can we customize the hotel split?", a: "Yes — get a custom quote if you'd prefer to stay at one property the whole trip instead of splitting the stay." },
    ],
  },
  "7-day-ultimate-monterey-golf-trip": {
    slug: "7-day-ultimate-monterey-golf-trip",
    image: "https://images.unsplash.com/photo-1632406209836-2d7e3c32d2e9?auto=format&fit=crop&w=800&q=80",
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
    faqs: [
      { q: "How many rounds does the 7-day trip include?", a: "6–7 rounds across the full week, covering nearly every course featured on this site." },
      { q: "Where do we stay?", a: "3 nights at Carmel Valley Ranch and 4 nights at Monterey Plaza Hotel & Spa." },
      { q: "Is the pricing verified for this trip?", a: "No — this is a longer, more customized itinerary, so the $2,500–$4,000 per-person range shown is an estimate. Get a custom quote for accurate pricing." },
      { q: "Does this trip include The Club at Pasadera?", a: "Yes, alongside wine tasting on the same day, given the Carmel Valley base for the first stretch of the trip." },
      { q: "Is this trip only for serious golfers?", a: "It's built around a full week of golf, so it suits groups who want to play nearly every day — Pacific Grove and Black Horse are included as more relaxed rounds alongside the tougher days." },
      { q: "Can we shorten this trip?", a: "Yes — the 4-day or 5-day itineraries cover a similar course mix in less time if a full week isn't practical." },
    ],
  },
  "carmel-valley-golf-getaway": {
    slug: "carmel-valley-golf-getaway",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80",
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
    faqs: [
      { q: "Who is this itinerary built for?", a: "Golfers traveling with a non-golfing partner, or anyone wanting a wine-country-meets-golf trip rather than a golf-only schedule." },
      { q: "How much golf is included?", a: "2–3 rounds over 3 days, with wine tasting built into the schedule rather than a full daily round." },
      { q: "Where do we stay?", a: "Carmel Valley Ranch or Bernardus Lodge, both wine-country properties." },
      { q: "Is the pricing verified?", a: "No — the $900–$1,500 per-person range is a template estimate. Get a custom quote for accurate pricing." },
      { q: "Is Carmel-by-the-Sea included?", a: "Yes — day 1 includes dinner in Carmel-by-the-Sea, a 20-minute drive from Carmel Valley." },
      { q: "Can we add more golf to this itinerary?", a: "Yes — get a custom quote and we can add rounds or extend the trip." },
    ],
  },
  "pebble-beach-golf-package": {
    slug: "pebble-beach-golf-package",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=800&q=80",
    title: "The Pebble Pilgrimage",
    shortTitle: "Pebble Pilgrimage",
    durationDays: 4,
    rounds: "4 rounds",
    target: "Serious golfers making their Pebble Beach bucket-list trip, 2–12 players",
    baseHotel: "Monterey Plaza Hotel & Spa or Hyatt Regency Monterey",
    priceFrom: 0,
    priceVerified: false,
    priceTo: 0,
    courseSlugs: ["pebble-beach-golf-links", "spyglass-hill", "poppy-hills", "bayonet"],
    hotelSlugs: ["monterey-plaza", "hyatt-regency-monterey"],
    days: [
      {
        day: 1,
        title: "Arrival + Poppy Hills",
        items: [
          "Arrive at Monterey Regional Airport (MRY) or self-drive",
          "Check in at Monterey Plaza Hotel & Spa or Hyatt Regency Monterey",
          "Afternoon: Poppy Hills Golf Course — championship conditions in the Del Monte Forest at a fraction of the resort price, a perfect warm-up for what follows",
          "Evening: dinner at Schooners or downtown Monterey",
        ],
      },
      {
        day: 2,
        title: "Pebble Beach Golf Links®",
        items: [
          "The main event — early tee time at Pebble Beach Golf Links®",
          "18 holes on the most famous clifftop course in American golf — slope 145, designed by Jack Neville in 1919",
          "After the round: drive the 17-Mile Drive through the Del Monte Forest back to Monterey",
          "Evening: group dinner — this one deserves a celebration",
        ],
      },
      {
        day: 3,
        title: "Spyglass Hill®",
        items: [
          "Morning: Spyglass Hill Golf Course® — Robert Trent Jones Sr.'s demanding forest-to-coast layout, slope 148 and widely regarded as the toughest of the Pebble Beach Resorts® courses",
          "Afternoon: rest, explore Carmel-by-the-Sea, or an optional visit to the Monterey Bay Aquarium",
          "Evening: dinner in Carmel village",
        ],
      },
      {
        day: 4,
        title: "Bayonet + departure",
        items: [
          "Morning: Bayonet — the military-heritage championship course at former Fort Ord. Slope 141, Combat Corner on the back nine. A proper send-off.",
          "Afternoon: depart MRY",
        ],
      },
    ],
    faqs: [
      { q: "Is this trip really worth it for a group?", a: "Pebble Beach Golf Links® is the most recognised golf course in America and one of the top five in the world. For serious golfers, playing it once is non-negotiable. This trip pairs it with Spyglass — regarded as the tougher round — and Bayonet as a serious send-off." },
      { q: "How far in advance do we need to book Pebble Beach?", a: "We strongly recommend at least 30 days for groups. Peak season (September–November) books fastest. Submit a quote request and we'll confirm what's available for your dates." },
      { q: "Do we need to be good golfers to play Pebble Beach?", a: "Pebble Beach Golf Links® has no handicap restriction for resort guests. That said, the slope of 145 means higher handicap golfers should expect a high score — the views and the experience are what the round is about, not the card." },
      { q: "Does this trip include the 17-Mile Drive?", a: "Yes — after the Pebble Beach round, the route back to Monterey takes you through the Del Monte Forest via the 17-Mile Drive past Cypress Point and Seal Rock." },
      { q: "Can we swap Bayonet for a different course on day 4?", a: "Yes — we can substitute Carmel Valley Ranch, Quail Lodge, or another course depending on group preference. Get a custom quote and tell us what you're after." },
      { q: "Is Del Monte Golf Course® or The Hay™ available to add?", a: "Yes — Del Monte is the oldest course in continuous play west of the Mississippi and can be added as a fifth round. The Hay is a short-course experience, good for an afternoon warm-up session." },
    ],
  },
  "monterey-corporate-golf-outing": {
    slug: "monterey-corporate-golf-outing",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    title: "Monterey Corporate Golf Outing",
    shortTitle: "Corporate Outing",
    durationDays: 2,
    rounds: "1–2 rounds",
    target: "Corporate groups, client events, team building, incentive trips — 20 to 200 players",
    baseHotel: "Portola Hotel & Spa or Hyatt Regency Monterey",
    priceFrom: 0,
    priceVerified: false,
    priceTo: 0,
    courseSlugs: ["bayonet", "black-horse", "carmel-valley-ranch", "poppy-hills", "laguna-seca-golf-ranch"],
    hotelSlugs: ["portola-hotel", "hyatt-regency-monterey", "monterey-plaza"],
    days: [
      {
        day: 1,
        title: "Arrival + welcome event",
        items: [
          "Group arrival at Monterey Regional Airport (MRY) — airport transfers arranged",
          "Hotel check-in and room block confirmation",
          "Welcome reception and group dinner — restaurant buyout, branded materials, AV setup if required",
          "Optional: evening harbour cruise or Cannery Row dinner",
        ],
      },
      {
        day: 2,
        title: "Tournament day",
        items: [
          "Breakfast at the hotel — shotgun start briefing and format introduction",
          "Shotgun start tournament: Bayonet & Black Horse offer a true 36-hole facility for large groups — the only venue on the peninsula that can handle 100+ players in a single shotgun",
          "On-course hospitality: hole-in-one prizes, closest-to-the-pin, longest drive — we handle all setup",
          "Post-round awards dinner: trophy presentation, branded prizes, F&B and AV coordinated through the venue",
          "Optional second day: Carmel Valley Ranch or Poppy Hills for a more relaxed follow-up round",
        ],
      },
    ],
    faqs: [
      { q: "How large a group can you handle?", a: "We handle corporate groups from 20 to 200 players. Bayonet & Black Horse is the only 36-hole facility on the peninsula — it's the right venue for large shotgun events. Smaller groups (20–40) have more flexibility across all courses." },
      { q: "Can you manage the full event — not just the golf?", a: "Yes. We coordinate tee times, on-course hospitality, branded materials, prizes, airport transfers, hotel room blocks, F&B, and AV. You focus on your guests, we handle the logistics." },
      { q: "Which courses work best for corporate events?", a: "Bayonet & Black Horse for large shotgun events (both courses simultaneously). Carmel Valley Ranch for a more relaxed, scenic group round. Poppy Hills for championship conditions without a resort price tag. We'll recommend based on your group size and goals." },
      { q: "How far in advance do we need to plan?", a: "For groups of 50+, we recommend a minimum of 60 days. Large shotgun events at Bayonet & Black Horse can book up fast in peak season (September–November). Get a quote as early as possible and we'll hold dates." },
      { q: "Can you arrange team building activities alongside the golf?", a: "Yes — we can integrate wine tasting in Carmel Valley, the Monterey Bay Aquarium, sailing trips, or a private beach event at Asilomar alongside the golf schedule." },
      { q: "Can non-golfers be included in the trip?", a: "Absolutely. We build non-golfer programs in parallel — spa days at Carmel Valley Ranch or Bernardus Lodge, Carmel-by-the-Sea tours, coastal drives, and Aquarium visits are all options." },
    ],
  },
  "monterey-golf-trip-best-value": {
    slug: "monterey-golf-trip-best-value",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
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
    faqs: [
      { q: "How is this trip more affordable than the others?", a: "It uses Pacific Grove, Laguna Seca, and Black Horse — the peninsula's most accessible green fees — instead of premium or Pebble Beach Resorts® courses." },
      { q: "Where do we stay?", a: "Casa Munras Garden Hotel & Spa or Portola Hotel, both value-focused downtown Monterey properties." },
      { q: "Is the pricing verified?", a: "No — the $350–$600 per-person range is a template estimate based on typical budget course and lodging costs. Get a custom quote for accurate pricing." },
      { q: "Is Black Horse a downgrade from Bayonet?", a: "Not really — it's the same 1954 Fort Ord facility, generally considered a slightly more approachable companion round to Bayonet at a similar price point." },
      { q: "Can we add a Pebble Beach Resorts® round to this trip?", a: "Yes — get a custom quote and we can build one in, though it will raise the per-person cost significantly above this trip's budget range." },
      { q: "Is this a good trip for a first-time visit?", a: "Yes — it's a low-cost way to sample three real Monterey Peninsula courses before committing to a premium trip on a future visit." },
    ],
  },
};
