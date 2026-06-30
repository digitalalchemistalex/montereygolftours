// Source: mgts-lodging-intelligence.md (verified June 2 2026)
// Corrections applied per Sean's Del Monte Golf Course confirmation and
// Raza's direct verification (Casa Munras, Quail Lodge room counts).
// Fields genuinely unverified are omitted rather than guessed.

export type HotelDetail = {
  slug: string;
  name: string;
  city: string;
  tier: 1 | 2 | 3;
  address: string;
  phone: string;
  website: string;
  rooms: string;
  brand: string;
  hook: string;
  description: string[];
  amenities: string[];
  onSiteGolf: string | null;
  airportDistance: string;
  positioning: string;
  faqs: { q: string; a: string }[];
};

export const HOTEL_DETAILS: Record<string, HotelDetail> = {
  "hyatt-regency-monterey": {
    slug: "hyatt-regency-monterey",
    name: "Hyatt Regency Monterey Hotel & Spa",
    city: "Monterey, CA",
    tier: 1,
    address: "1 Old Golf Course Rd, Monterey, CA 93940",
    phone: "Contact hotel directly",
    website: "hyatt.com",
    rooms: "560 guestrooms and suites",
    brand: "Hyatt Regency",
    hook: "22 secluded acres of Monterey pines, sitting directly on Del Monte Golf Course®.",
    description: [
      "The Hyatt Regency Monterey sits on 22 secluded acres of Monterey pines, 2 miles from downtown Monterey, directly adjacent to Del Monte Golf Course® — the oldest golf course in continuous operation west of the Mississippi, dating to 1897.",
      "With 560 guestrooms and suites, it's the largest property on this list and a natural base for group trips, offering verified stay-and-play packages with Poppy Hills, Bayonet, and Black Horse, in addition to the on-site Del Monte course.",
    ],
    amenities: [
      "2 outdoor pools + hot tubs",
      "Full-service spa (Spa Adeline)",
      "6 outdoor tennis courts",
      "Pickleball facility",
      "Bocce courts",
      "24-hour fitness center",
      "3 dining outlets including Sea Root Restaurant & Bar",
      "Free airport shuttle",
      "EV charging",
      "Pet-friendly",
      "40,000 sq ft meeting/event space",
    ],
    onSiteGolf: "Del Monte Golf Course®",
    airportDistance: "~8 min from MRY",
    positioning:
      "Best base for groups wanting a central Monterey location with on-site golf and strong group rates, plus easy access to Poppy Hills, Bayonet, and Black Horse.",
    faqs: [
      {
        q: "Is the Hyatt Regency Monterey on a golf course?",
        a: "Yes. It sits directly on Del Monte Golf Course®, the oldest golf course in continuous operation west of the Mississippi.",
      },
      {
        q: "How many rooms does the Hyatt Regency Monterey have?",
        a: "560 guestrooms and suites, making it the largest group-friendly property on the Monterey Peninsula covered here.",
      },
      {
        q: "Which other courses can I reach easily from the Hyatt Regency Monterey?",
        a: "Stay-and-play packages are available with Poppy Hills, Bayonet, and Black Horse, all a short drive from the property.",
      },
    ],
  },
  "carmel-valley-ranch": {
    slug: "carmel-valley-ranch",
    name: "Carmel Valley Ranch",
    city: "Carmel Valley, CA",
    tier: 1,
    address: "One Old Ranch Rd, Carmel, CA 93923",
    phone: "Contact hotel directly",
    website: "carmelvalleyranch.com",
    rooms: "179 all-suites (no standard rooms)",
    brand: "The Unbound Collection by Hyatt",
    hook: "All-suite resort on 500 acres, with the only Pete Dye golf course in Northern California on-site.",
    description: [
      "Carmel Valley Ranch is an all-suite resort — every accommodation, from studio suites to 2-bedroom suites, averages 800 square feet, with no standard rooms on property. The resort sits on 500 acres in the Carmel Valley foothills, beside the 4,400-acre Garland Ranch Regional Park.",
      "The on-site golf course is a Pete Dye original (1980), renovated by Gene Bates in 2006 — the only Pete Dye design in Northern California. The wine-country microclimate here tends to stay sunny even when the coast is fogged in.",
    ],
    amenities: [
      "On-site 18-hole Pete Dye golf course",
      "Spa Aiyana (10,500 sq ft)",
      "3 outdoor pools",
      "Tennis courts",
      "Estate vineyard, organic gardens, olive grove",
      "Valley Kitchen restaurant (farm-to-table)",
      "Complimentary shuttle between lodging clusters",
      "On-site bike trails",
    ],
    onSiteGolf: "Carmel Valley Ranch Golf Course",
    airportDistance: "~20 min from MRY",
    positioning:
      "Premier all-suite golf resort, best for groups wanting a luxury resort experience with golf on-site, in a warm, sunny microclimate when the coast is foggy.",
    faqs: [
      {
        q: "Does Carmel Valley Ranch have standard hotel rooms?",
        a: "No — every accommodation on property is a suite, averaging 800 square feet, ranging from studios to multi-bedroom configurations.",
      },
      {
        q: "Who designed the golf course at Carmel Valley Ranch?",
        a: "Pete Dye designed the original course in 1980, with a 2006 renovation by Gene Bates. It's the only Pete Dye design in Northern California.",
      },
      {
        q: "Is Carmel Valley Ranch usually warmer than the coast?",
        a: "Yes — its inland Carmel Valley location sits in a wine-country microclimate that often stays sunny when the coastal areas are fogged in.",
      },
    ],
  },
  "quail-lodge": {
    slug: "quail-lodge",
    name: "Quail Lodge & Golf Club",
    city: "Carmel Valley, CA",
    tier: 1,
    address: "8205 Valley Greens Dr, Carmel, CA 93923",
    phone: "(888) 828-8787",
    website: "quaillodge.com",
    rooms: "93 rooms and suites",
    brand: "Independent",
    hook: "Best value golf-resort combo on the peninsula, with an on-site championship course and warm Carmel Valley weather.",
    description: [
      "Quail Lodge & Golf Club sits in the sunny Carmel Valley, set among lush gardens and 10 man-made lakes that draw quail, hawks, deer, and turtles. The on-site golf course is a Robert Muir Graves design (1964), refined by Todd Eckenrode / Origins Golf Design in 2015.",
      "With 93 rooms and suites, it's a more intimate property than the larger Tier 1 resorts, generally positioned as the best value golf-and-stay combination on the peninsula.",
    ],
    amenities: [
      "On-site 18-hole championship golf course",
      "Covey Grill restaurant",
      "Outdoor heated pool",
      "Tennis courts",
      "Driving range and practice green",
      "Full golf shop",
      "Golf instruction available",
    ],
    onSiteGolf: "Quail Lodge & Golf Club",
    airportDistance: "~15 min from MRY",
    positioning:
      "Best value golf-resort combination on the peninsula, with strong course conditions and warm Carmel Valley weather — ideal for groups wanting to be on-course rather than in town.",
    faqs: [
      {
        q: "How many rooms does Quail Lodge have?",
        a: "93 rooms and suites.",
      },
      {
        q: "Who designed the Quail Lodge golf course?",
        a: "Robert Muir Graves designed the original course in 1964, with a 2015 refinement by Todd Eckenrode / Origins Golf Design.",
      },
    ],
  },
  "bernardus-lodge": {
    slug: "bernardus-lodge",
    name: "Bernardus Lodge & Spa",
    city: "Carmel Valley, CA",
    tier: 1,
    address: "415 W Carmel Valley Rd, Carmel Valley, CA 93924",
    phone: "(831) 298-5389",
    website: "bernarduslodge.com",
    rooms: "73 rooms",
    brand: "Independent luxury boutique",
    hook: "A wine-country retreat with estate vineyard views and guest access to The Club at Pasadera outside of Monday.",
    description: [
      "Bernardus Lodge & Spa is a wine-country retreat in Carmel Valley, with an estate vineyard visible from many rooms and Santa Lucia mountain views throughout the property. With 73 rooms, it's the most intimate of the Tier 1 golf-anchor properties.",
      "Guests of Bernardus Lodge have access to play The Club at Pasadera — a private course generally open to the public only on Mondays — outside of the standard Monday-only window. This access arrangement should be confirmed with the property before promoting in a specific package, as terms can change.",
    ],
    amenities: [
      "Guest access to The Club at Pasadera golf course",
      "Lucia Restaurant & Bar",
      "Outdoor heated pool + poolside bar",
      "Full-service spa",
      "24-hour gym",
      "Outdoor tennis courts",
      "Estate vineyard",
      "Green Key Global sustainability certification",
    ],
    onSiteGolf: null,
    airportDistance: "~21 min from MRY",
    positioning:
      "Best choice for golfers wanting access to The Club at Pasadera outside of Monday, paired with a wine-country setting that's strong for groups combining golf and Carmel Valley wine tasting.",
    faqs: [
      {
        q: "Does Bernardus Lodge have an on-site golf course?",
        a: "No, but guests have access to play The Club at Pasadera, including outside its standard Monday-only public access window — confirm current terms with the property before booking.",
      },
      {
        q: "How many rooms does Bernardus Lodge have?",
        a: "73 rooms, making it the most intimate of the Tier 1 golf-anchor properties on this list.",
      },
    ],
  },
  "monterey-plaza": {
    slug: "monterey-plaza",
    name: "Monterey Plaza Hotel & Spa",
    city: "Monterey, CA",
    tier: 2,
    address: "400 Cannery Row, Monterey, CA 93940",
    phone: "(831) 646-1700",
    website: "montereyplazahotel.com",
    rooms: "285 units",
    brand: "Independent (AAA Four Diamond)",
    hook: "The only Forbes Four-Star hotel in Monterey, perched over the bay on historic Cannery Row.",
    description: [
      "Monterey Plaza Hotel & Spa is an oceanfront property perched directly over Monterey Bay on historic Cannery Row — the only Forbes Four-Star hotel in Monterey. With 285 units, it's a strong fit for groups wanting to be in the heart of the action, walking distance to Cannery Row and Fisherman's Wharf.",
      "There's no traditional outdoor pool here, given the waterfront setting and open bay access, but the property compensates with a rooftop-level spa and direct ocean views throughout much of the hotel.",
    ],
    amenities: [
      "Vista Blue Spa (rooftop level)",
      "2 restaurants including Schooners Monterey (oceanfront)",
      "Tidal Coffee cafe",
      "Ocean-view meeting rooms and waterfront ballrooms",
      "Complimentary bicycles",
      "Valet parking",
    ],
    onSiteGolf: null,
    airportDistance: "~10 min from MRY",
    positioning:
      "The prestige address in Monterey for golfers wanting to be in the heart of the action — walking distance to Cannery Row, with easy drives to all peninsula courses. Strong for corporate golf groups.",
    faqs: [
      {
        q: "Is Monterey Plaza Hotel directly on the water?",
        a: "Yes, it's perched over Monterey Bay on Cannery Row — the only Forbes Four-Star hotel in Monterey.",
      },
      {
        q: "Does Monterey Plaza have a pool?",
        a: "No traditional outdoor pool — it's a waterfront property with direct bay access instead.",
      },
    ],
  },
  "intercontinental-the-clement": {
    slug: "intercontinental-the-clement",
    name: "InterContinental The Clement Monterey",
    city: "Monterey, CA",
    tier: 2,
    address: "750 Cannery Row, Monterey, CA 93940",
    phone: "(831) 375-4500",
    website: "ihg.com",
    rooms: "208 guest rooms and suites",
    brand: "InterContinental (IHG)",
    hook: "Bayfront on Cannery Row, next door to the Monterey Bay Aquarium, with panoramic coastal views.",
    description: [
      "InterContinental The Clement Monterey sits bayfront on Cannery Row, directly next to the Monterey Bay Aquarium, with 208 guest rooms and suites offering panoramic coastal views. Opened in 2008, it was the newest waterfront property built in Monterey in over 20 years at the time.",
      "Rooms feature Frette linens, marble bathrooms, and a mix of king or two-double configurations, with some rooms offering stone fireplaces and balconies with partial ocean views.",
    ],
    amenities: [
      "C Restaurant (waterfront dining)",
      "The Spa",
      "Outdoor heated pool + spa tub",
      "24-hour fitness center",
      "12 versatile meeting/event venues overlooking Monterey Bay",
      "IHG One Rewards loyalty program",
    ],
    onSiteGolf: null,
    airportDistance: "~8 min from MRY",
    positioning:
      "A strong alternative to Monterey Plaza for corporate or group golf, with IHG loyalty points attractive for business travelers, and a location next to the Aquarium that's ideal for groups with non-golfer partners.",
    faqs: [
      {
        q: "Is InterContinental The Clement Monterey near the Aquarium?",
        a: "Yes, it's located directly next to the Monterey Bay Aquarium on Cannery Row.",
      },
      {
        q: "How many rooms does InterContinental The Clement Monterey have?",
        a: "208 guest rooms and suites.",
      },
    ],
  },
  "portola-hotel": {
    slug: "portola-hotel",
    name: "Portola Hotel & Spa",
    city: "Monterey, CA",
    tier: 2,
    address: "Two Portola Plaza, Monterey, CA 93940",
    phone: "(888) 222-5851",
    website: "portolahotel.com",
    rooms: "379 rooms and suites",
    brand: "Independent (AAA Four Diamond)",
    hook: "The Central Coast's first LEED-certified hotel, downtown adjacent to the Monterey Conference Center.",
    description: [
      "Portola Hotel & Spa sits in downtown Monterey, directly adjacent to and connected with the Monterey Conference Center, one mile from Cannery Row. With 379 rooms and suites, it's the best-suited property on this list for large groups, conventions, or groups paired with a conference.",
      "The hotel was the Central Coast's first LEED-certified property, and includes a 6,000 square-foot spa — the largest day spa in Monterey County — along with an on-site craft brewery.",
    ],
    amenities: [
      "Spa on the Plaza (6,000 sq ft)",
      "2 restaurants including Jacks Monterey",
      "Craft brewery on-site",
      "60,000 sq ft meeting/event space",
      "Connected to Monterey Conference Center",
      "Outdoor heated pool",
      "Pet-friendly",
      "No resort fee on direct bookings",
    ],
    onSiteGolf: null,
    airportDistance: "~8 min from MRY",
    positioning:
      "Best choice for large groups (20+ golfers), corporate outings, or groups paired with a conference, with LEED credentials appealing to sustainability-minded groups.",
    faqs: [
      {
        q: "Is Portola Hotel good for large groups?",
        a: "Yes — with 379 rooms and direct connection to the Monterey Conference Center, it's the best-suited property here for large groups, conventions, or corporate outings.",
      },
      {
        q: "Is Portola Hotel LEED-certified?",
        a: "Yes, it was the Central Coast's first LEED-certified hotel.",
      },
    ],
  },
  "lauberge-carmel": {
    slug: "lauberge-carmel",
    name: "L'Auberge Carmel",
    city: "Carmel-by-the-Sea, CA",
    tier: 3,
    address: "Monte Verde Street & 7th Avenue, Carmel-by-the-Sea, CA 93921",
    phone: "(831) 624-8578",
    website: "laubergecarmel.com",
    rooms: "20 luxury rooms",
    brand: "Relais & Châteaux",
    hook: "A 20-room Relais & Châteaux property in the heart of Carmel village, a block from the beach.",
    description: [
      "L'Auberge Carmel is a 20-room Relais & Châteaux property built in 1929, in the heart of Carmel-by-the-Sea village, one block from Carmel Beach and walking distance to galleries, shops, and restaurants. The atmosphere leans adults-oriented and intimate.",
      "Every room is individually designed, naturally ventilated with no air conditioning, and features radiant floor heating in the bathrooms. The on-site Aubergine restaurant is a 9-table fine-dining destination with an acclaimed chef and a 2,500-bottle wine cellar.",
    ],
    amenities: [
      "Aubergine restaurant (9-table fine dining)",
      "Concierge service",
      "Complimentary valet parking",
      "Spa treatments (in-room or arranged)",
      "Walking distance to Carmel Beach",
      "Signature continental breakfast included",
    ],
    onSiteGolf: null,
    airportDistance: "~15 min from MRY",
    positioning:
      "Best choice for a golfer traveling with a non-golfing partner, with unmatched village intimacy and one of the finest restaurants on the Central Coast. No pool on-site — better suited to groups who prefer village exploration over resort amenities.",
    faqs: [
      {
        q: "How many rooms does L'Auberge Carmel have?",
        a: "20 luxury rooms — it's a small, intimate property, so booking early matters for group golf trips.",
      },
      {
        q: "Does L'Auberge Carmel have a pool?",
        a: "No pool on-site. It's better suited to groups who want to explore Carmel village rather than rely on resort amenities.",
      },
    ],
  },
  "casa-munras": {
    slug: "casa-munras",
    name: "Casa Munras Garden Hotel & Spa",
    city: "Monterey, CA",
    tier: 3,
    address: "700 Munras Ave, Monterey, CA 93940",
    phone: "(831) 375-2411",
    website: "hotelcasamunras.com",
    rooms: "163 rooms",
    brand: "Independent boutique",
    hook: "Monterey's first hotel, dating to 1824, with hacienda-style architecture and lush courtyard gardens.",
    description: [
      "Casa Munras Garden Hotel & Spa traces back to 1824 — Monterey's first hotel, and one of the oldest hotel properties on the Central Coast. The hacienda-style architecture and Spanish Colonial heritage are reflected throughout the downtown Monterey property, set amid picturesque courtyard gardens.",
      "With 163 rooms, it's positioned as a strong value boutique option for groups wanting authentic Monterey character without full resort pricing.",
    ],
    amenities: [
      "Esteban Restaurant & Bar (Spanish-California cuisine)",
      "On-site spa",
      "Outdoor heated pool",
      "Complimentary bikes",
      "Lush courtyard gardens",
    ],
    onSiteGolf: null,
    airportDistance: "~8 min from MRY",
    positioning:
      "Best value boutique option in downtown Monterey, with historic character unique on the peninsula — strong for groups wanting authentic atmosphere without full resort pricing.",
    faqs: [
      {
        q: "How old is Casa Munras?",
        a: "It dates to 1824, making it Monterey's first hotel.",
      },
      {
        q: "How many rooms does Casa Munras have?",
        a: "163 rooms.",
      },
    ],
  },
};
