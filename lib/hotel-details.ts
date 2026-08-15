// Source: mgts-lodging-intelligence.md (verified June 2 2026)
// Corrections applied per Sean's Del Monte Golf Course confirmation and
// Raza's direct verification (Casa Munras, Quail Lodge room counts).
// Drive-time matrix, room features, and dining names pulled from the same
// verified source file. Fields genuinely unverified are omitted rather
// than guessed (e.g. Quail Lodge's "best playing conditions" marketing
// claim was checked and could not be independently verified — excluded).

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
  roomFeatures?: string[];
  diningNames?: { name: string; detail: string }[];
  uniqueDetails?: string[];
  onSiteGolf: string | null;
  airportDistance: string;
  driveTimeToCourses: { course: string; minutes: number }[];
  positioning: string;
  faqs: { q: string; a: string }[];
  gallery?: string[];
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
    gallery: [
      "/images/hotels/gallery/hyatt-regency-monterey-2.webp",
      "/images/hotels/gallery/hyatt-regency-monterey-3.webp",
      "/images/hotels/gallery/hyatt-regency-monterey-4.webp",
    ],
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
      "Hammock gardens",
      "24-hour fitness center",
      "Free airport shuttle",
      "EV charging",
      "Pet-friendly",
      "40,000 sq ft meeting/event space",
    ],
    diningNames: [
      { name: "Sea Root Restaurant & Bar", detail: "Coastal Mediterranean cuisine" },
      { name: "Central Coast Provisions", detail: "Casual all-day dining" },
      { name: "Beer Garden", detail: "Seasonal outdoor bar" },
    ],
    uniqueDetails: [
      "Verified stay-and-play packages with Poppy Hills, Bayonet, and Black Horse",
    ],
    onSiteGolf: "Del Monte Golf Course®",
    airportDistance: "~8 min from MRY",
    driveTimeToCourses: [
      { course: "Bayonet / Black Horse", minutes: 8 },
      { course: "Pacific Grove Golf Links", minutes: 10 },
      { course: "The Club at Pasadera", minutes: 10 },
      { course: "Laguna Seca Golf Ranch", minutes: 12 },
      { course: "Poppy Hills", minutes: 15 },
      { course: "Quail Lodge", minutes: 20 },
      { course: "Carmel Valley Ranch", minutes: 25 },
    ],
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
        a: "Verified stay-and-play packages are available with Poppy Hills, Bayonet, and Black Horse, all 8–15 minutes from the property.",
      },
      {
        q: "What dining options are on-site?",
        a: "Sea Root Restaurant & Bar (Coastal Mediterranean), Central Coast Provisions for casual all-day dining, and a seasonal outdoor Beer Garden.",
      },
      {
        q: "Is the Hyatt Regency Monterey good for large groups?",
        a: "Yes — with 560 rooms and 40,000 sq ft of meeting and event space, it's built to handle large group golf trips and corporate outings.",
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
    gallery: [
      "/images/hotels/gallery/carmel-valley-ranch-2.webp",
      "/images/hotels/gallery/carmel-valley-ranch-3.webp",
      "/images/hotels/gallery/carmel-valley-ranch-4.webp",
      "/images/hotels/gallery/carmel-valley-ranch-5.webp",
      "/images/hotels/gallery/carmel-valley-ranch-6.webp",
    ],
    description: [
      "Carmel Valley Ranch is an all-suite resort — every accommodation is a minimum 800 sq ft (starting with the Santa Lucia Studio); there are no standard hotel rooms. Pete Dye's only Northern California golf design is on-site, and the property sits inland in the sun-drenched Santa Lucia foothills, typically 15–18°F warmer than the Monterey coast and clear of marine fog earlier in the morning. — every accommodation, from studio suites to 2-bedroom suites with up to 4 interconnected bedrooms, averages 800 square feet, with no standard rooms on property. The resort sits on 500 acres in the Carmel Valley foothills, beside the 4,400-acre Garland Ranch Regional Park.",
      "The on-site golf course is a Pete Dye original (1980), renovated by Gene Bates in 2006 — the only Pete Dye design in Northern California. The wine-country microclimate here tends to stay sunny even when the coast is fogged in.",
    ],
    amenities: [
      "On-site 18-hole Pete Dye golf course",
      "Spa Aiyana (10,500 sq ft)",
      "3 outdoor pools",
      "Tennis courts",
      "Estate vineyard, organic gardens, olive grove",
      "On-site bike trails",
      "In-suite dining",
      "Complimentary shuttle between lodging clusters",
    ],
    diningNames: [{ name: "Valley Kitchen", detail: "Farm-to-table, using the resort's own gardens and beehives" }],
    roomFeatures: [
      "Studio, 1-bedroom, and 2-bedroom suites (up to 4 interconnected bedrooms)",
      "Gas fireplace",
      "Private deck or patio",
      "Valley, vineyard, or forest views",
      "Espresso maker and refrigerator",
      "Smart room technology",
    ],
    uniqueDetails: [
      "Miniature goats at The Corral",
      "Seasonal activities: beekeeping, stargazing, axe throwing, archery, cooking classes",
    ],
    onSiteGolf: "Carmel Valley Ranch Golf Course",
    airportDistance: "~20 min from MRY",
    driveTimeToCourses: [
      { course: "Quail Lodge", minutes: 10 },
      { course: "Bernardus Lodge (The Club at Pasadera access)", minutes: 7 },
      { course: "Laguna Seca Golf Ranch", minutes: 20 },
      { course: "Poppy Hills", minutes: 20 },
      { course: "Bayonet / Black Horse", minutes: 25 },
      { course: "Pacific Grove Golf Links", minutes: 25 },
    ],
    positioning:
      "Premier all-suite golf resort, best for groups wanting a luxury resort experience with golf on-site, in a warm, sunny microclimate when the coast is foggy.",
    faqs: [
      {
        q: "Does Carmel Valley Ranch have standard hotel rooms?",
        a: "No — every accommodation on property is a suite, averaging 800 square feet, ranging from studios to multi-bedroom configurations.",
      },
      {
        q: "Who designed the golf course at Carmel Valley Ranch?",
        a: "Pete Dye designed the original course in 1980 — the only Pete Dye design in Northern California — with a 2006 renovation by Gene Bates.",
      },
      {
        q: "Is Carmel Valley Ranch usually warmer than the coast?",
        a: "Yes — its inland Carmel Valley location sits in a wine-country microclimate that often stays sunny when the coastal areas are fogged in.",
      },
      {
        q: "What's included in the suites?",
        a: "A gas fireplace, private deck or patio, valley/vineyard/forest views, an espresso maker, and a refrigerator are standard across suite types.",
      },
      {
        q: "Are there non-golf activities for the group?",
        a: "Yes — seasonal offerings include beekeeping, stargazing, axe throwing, archery, and cooking classes, plus a resident herd of miniature goats at The Corral.",
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
    rooms: "77 guest rooms + 14 suites (91 total)",
    brand: "Independent",
    hook: "Best value golf-resort combo on the peninsula, with an on-site championship course and warm Carmel Valley weather.",
    gallery: [
      "/images/hotels/gallery/quail-lodge-2.webp",
      "/images/hotels/gallery/quail-lodge-3.webp",
      "/images/hotels/gallery/quail-lodge-4.webp",
    ],
    description: [
      "Quail Lodge & Golf Club sits in the sunny Carmel Valley, set among lush gardens and 10 man-made lakes that draw quail, hawks, deer, turtles, and fox. The on-site golf course is a Robert Muir Graves design (1964), refined by Todd Eckenrode / Origins Golf Design in 2015.",
      "With 77 guest rooms and 14 suites (91 total keys), it's a more intimate property than the larger Tier 1 resorts, generally positioned as the best value golf-and-stay combination on the peninsula.",
    ],
    amenities: [
      "On-site 18-hole championship golf course",
      "Outdoor heated pool",
      "Tennis courts",
      "Driving range and practice green",
      "Full golf shop",
      "Golf instruction available",
    ],
    diningNames: [{ name: "Covey Grill", detail: "On-site restaurant" }],
    uniqueDetails: [
      "Wildlife on property includes quail, hawks, deer, turtles, and fox around the 10 man-made lakes",
    ],
    onSiteGolf: "Quail Lodge & Golf Club",
    airportDistance: "~15 min from MRY",
    driveTimeToCourses: [
      { course: "Carmel Valley Ranch", minutes: 10 },
      { course: "Bernardus Lodge (The Club at Pasadera access)", minutes: 15 },
      { course: "Laguna Seca Golf Ranch", minutes: 18 },
      { course: "Poppy Hills", minutes: 18 },
      { course: "Bayonet / Black Horse", minutes: 20 },
      { course: "Pacific Grove Golf Links", minutes: 22 },
    ],
    positioning:
      "Best value golf-resort combination on the peninsula, with strong course conditions and warm Carmel Valley weather — ideal for groups wanting to be on-course rather than in town.",
    faqs: [
      {
        q: "How many rooms does Quail Lodge have?",
        a: "77 guest rooms and 14 suites — 91 total keys.",
      },
      {
        q: "Who designed the Quail Lodge golf course?",
        a: "Robert Muir Graves designed the original course in 1964, with a 2015 refinement by Todd Eckenrode / Origins Golf Design.",
      },
      {
        q: "What wildlife might I see at Quail Lodge?",
        a: "The property's 10 man-made lakes and gardens draw quail, hawks, deer, turtles, and fox.",
      },
      {
        q: "Are there golf practice facilities on-site?",
        a: "Yes — a driving range, practice green, full golf shop, and golf instruction are all available on property.",
      },
      {
        q: "What's the dining like at Quail Lodge?",
        a: "Covey Grill is the on-site restaurant, serving the property's golfers and guests.",
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
    gallery: [
      "/images/hotels/gallery/bernardus-lodge-2.webp",
      "/images/hotels/gallery/bernardus-lodge-3.webp",
      "/images/hotels/gallery/bernardus-lodge-4.webp",
    ],
    description: [
      "Bernardus Lodge & Spa is a wine-country retreat in Carmel Valley, with an estate vineyard visible from many rooms and Santa Lucia mountain views throughout the property. With 73 rooms, it's the most intimate of the Tier 1 golf-anchor properties.",
      "Guests of Bernardus Lodge have access to play The Club at Pasadera — a private course generally open to the public only on Mondays — outside of the standard Monday-only window. This access arrangement should be confirmed with the property before promoting in a specific package, as terms can change.",
    ],
    amenities: [
      "Guest access to The Club at Pasadera golf course",
      "Outdoor heated pool + poolside bar",
      "Full-service spa (massages, hydrotherapy, facials, manicure/pedicure)",
      "24-hour gym",
      "Outdoor tennis courts",
      "Bocce ball, croquet, lawn games",
      "Hair salon",
      "Estate vineyard and gardens",
      "5 meeting rooms / 4,000 sq ft event space",
      "Green Key Global sustainability certification",
    ],
    diningNames: [{ name: "Lucia Restaurant & Bar", detail: "On-site, acclaimed" }],
    roomFeatures: [
      "Stone fireplace",
      "Vaulted ceilings",
      "Private terrace or balcony",
      "Vineyard views",
      "Limestone flooring",
      "Mini-fridge bar and Nespresso",
    ],
    uniqueDetails: [
      "Premier Villas (Villa Sol & Villa Carmelo): 2-bedroom/2.5-bath, 12-person dining table, private terrace with fire pits, outdoor showers",
    ],
    onSiteGolf: null,
    airportDistance: "~21 min from MRY",
    driveTimeToCourses: [
      { course: "Carmel Valley Ranch", minutes: 7 },
      { course: "Quail Lodge", minutes: 15 },
      { course: "Poppy Hills", minutes: 25 },
      { course: "Pacific Grove Golf Links", minutes: 30 },
      { course: "Bayonet / Black Horse", minutes: 30 },
    ],
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
      {
        q: "What are the Premier Villas?",
        a: "Villa Sol and Villa Carmelo are 2-bedroom, 2.5-bath villas with a 12-person dining table, a private terrace with fire pits, and outdoor showers.",
      },
      {
        q: "What's in a standard room at Bernardus Lodge?",
        a: "A stone fireplace, vaulted ceilings, a private terrace or balcony, vineyard views, and a mini-fridge bar with Nespresso.",
      },
      {
        q: "How far is Bernardus Lodge from Carmel Valley Ranch?",
        a: "About 7 minutes — the two properties are the closest golf-anchor hotels to each other in Carmel Valley.",
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
    gallery: [
      "/images/hotels/gallery/monterey-plaza-2.webp",
      "/images/hotels/gallery/monterey-plaza-3.webp",
      "/images/hotels/gallery/monterey-plaza-4.webp",
      "/images/hotels/gallery/monterey-plaza-5.webp",
      "/images/hotels/gallery/monterey-plaza-6.webp",
      "/images/hotels/gallery/monterey-plaza-7.webp",
    ],
    description: [
      "Monterey Plaza Hotel & Spa is an oceanfront property perched directly over Monterey Bay on historic Cannery Row — the only Forbes Four-Star hotel in Monterey, with European-influenced architecture often described as the \"grand dame of the bay.\" With 285 units, it's a strong fit for groups wanting to be in the heart of the action, walking distance to Cannery Row and Fisherman's Wharf.",
      "There's no traditional outdoor pool here, given the waterfront setting and open bay access, but the property compensates with a rooftop-level spa and direct ocean views throughout much of the hotel. Parking is valet only.",
    ],
    amenities: [
      "Vista Blue Spa (rooftop level)",
      "Ocean-view meeting rooms",
      "Waterfront ballrooms with outdoor terraces",
      "Complimentary bicycles",
      "Valet parking only",
    ],
    uniqueDetails: [
      "Forbes Four-Star rated — one of the most decorated hotels on the peninsula.",
      "Sits directly on Cannery Row waterfront with Monterey Bay views from the majority of rooms.",
      "Walking distance to the Monterey Bay Aquarium and the main Cannery Row strip.",
    ],
    diningNames: [
      { name: "Schooners Monterey", detail: "Oceanfront dining" },
      { name: "Coastal Kitchen", detail: "Newer dining addition" },
      { name: "Tidal Coffee", detail: "Cafe" },
      { name: "Lobby Lounge", detail: "Artisan spirits and small plates" },
    ],
    onSiteGolf: null,
    airportDistance: "~10 min from MRY",
    driveTimeToCourses: [
      { course: "Pacific Grove Golf Links", minutes: 8 },
      { course: "The Club at Pasadera", minutes: 8 },
      { course: "Bayonet / Black Horse", minutes: 8 },
      { course: "Laguna Seca Golf Ranch", minutes: 12 },
      { course: "Poppy Hills", minutes: 12 },
      { course: "Quail Lodge", minutes: 20 },
      { course: "Carmel Valley Ranch", minutes: 25 },
    ],
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
      {
        q: "What dining options are on-site?",
        a: "Schooners Monterey for oceanfront dining, Coastal Kitchen, Tidal Coffee cafe, and the Lobby Lounge for spirits and small plates.",
      },
      {
        q: "Is parking available at Monterey Plaza?",
        a: "Valet parking only.",
      },
      {
        q: "How close is Monterey Plaza to the golf courses?",
        a: "8 minutes to Pacific Grove Golf Links, The Club at Pasadera, and Bayonet/Black Horse — among the shortest drive times of any hotel on this site.",
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
    gallery: [
      "/images/hotels/gallery/intercontinental-the-clement-2.avif",
    ],
    description: [
      "InterContinental The Clement Monterey sits bayfront on Cannery Row, directly next to the Monterey Bay Aquarium, with 208 guest rooms and suites offering panoramic coastal views. Opened in 2008, it was the newest waterfront property built in Monterey in over 20 years at the time.",
      "Rooms feature Frette linens, marble bathrooms, and a mix of king or two-double configurations, with some rooms offering stone fireplaces and balconies with partial ocean views.",
    ],
    amenities: [
      "Outdoor heated pool + spa tub",
      "24-hour fitness center",
      "12 versatile meeting/event venues overlooking Monterey Bay",
      "IHG One Rewards loyalty program",
      "In-room shopping",
    ],
    diningNames: [{ name: "C Restaurant", detail: "Waterfront dining, American cuisine — whale watching from seats" }],
    roomFeatures: [
      "425–450 sq ft standard rooms",
      "King bed or two doubles",
      "Frette linens",
      "Marble bathrooms with soaking tub and separate shower",
      "Nespresso",
      "Some rooms: stone fireplace and balcony with partial ocean view",
    ],
    onSiteGolf: null,
    airportDistance: "~8 min from MRY",
    driveTimeToCourses: [
      { course: "Pacific Grove Golf Links", minutes: 8 },
      { course: "The Club at Pasadera", minutes: 8 },
      { course: "Bayonet / Black Horse", minutes: 8 },
      { course: "Laguna Seca Golf Ranch", minutes: 12 },
      { course: "Poppy Hills", minutes: 12 },
      { course: "Quail Lodge", minutes: 20 },
      { course: "Carmel Valley Ranch", minutes: 25 },
    ],
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
      {
        q: "What can I expect from the on-site restaurant?",
        a: "C Restaurant offers waterfront American dining with panoramic views — some seats even allow whale watching.",
      },
      {
        q: "Does IHG loyalty apply here?",
        a: "Yes, the property participates in the IHG One Rewards loyalty program.",
      },
      {
        q: "What are the rooms like at InterContinental The Clement Monterey?",
        a: "425–450 sq ft standard rooms with Frette linens, marble bathrooms with a soaking tub and separate shower, and a king bed or two doubles.",
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
    gallery: [
      "/images/hotels/gallery/portola-hotel-2.jpg",
      "/images/hotels/gallery/portola-hotel-3.jpg",
      "/images/hotels/gallery/portola-hotel-4.jpg",
    ],
    description: [
      "Portola Hotel & Spa sits in downtown Monterey, directly adjacent to and connected with the Monterey Conference Center, one mile from Cannery Row. With 379 rooms and suites, it's the best-suited property on this list for large groups, conventions, or groups paired with a conference.",
      "The hotel was the Central Coast's first LEED-certified property, and includes a 6,000 square-foot spa — the largest day spa in Monterey County — along with an on-site craft brewery.",
    ],
    amenities: [
      "Spa on the Plaza (6,000 sq ft, 11 private treatment rooms — largest day spa in Monterey County)",
      "Craft brewery on-site",
      "60,000 sq ft meeting/event space",
      "Connected to Monterey Conference Center",
      "Outdoor heated pool",
      "Fitness center",
      "Valet + self-parking",
      "Pet-friendly",
      "Children's loyalty program",
      "No resort fee on direct bookings",
      "EV charging",
    ],
    uniqueDetails: [
      "The Central Coast's first LEED-certified hotel — a meaningful sustainability credential for environmentally conscious groups.",
      "Largest hotel in Monterey at 379 rooms, connected directly to the Monterey Conference Center — best choice for larger corporate golf groups.",
      "No resort fee on direct bookings — a real differentiator at this price point on the peninsula.",
    ],
    diningNames: [{ name: "Jacks Monterey", detail: "Breakfast and dinner, American cuisine" }],
    roomFeatures: [
      "Spanish missionary-inspired aesthetic with Monterey Bay tones",
      "Double-pane windows, ceiling fans, USB outlets",
      "King or two Queen beds",
      "Some suites with a Queen sofa sleeper",
    ],
    onSiteGolf: null,
    airportDistance: "~8 min from MRY",
    driveTimeToCourses: [
      { course: "Pacific Grove Golf Links", minutes: 10 },
      { course: "The Club at Pasadera", minutes: 10 },
      { course: "Bayonet / Black Horse", minutes: 10 },
      { course: "Laguna Seca Golf Ranch", minutes: 12 },
      { course: "Poppy Hills", minutes: 14 },
      { course: "Quail Lodge", minutes: 20 },
      { course: "Carmel Valley Ranch", minutes: 25 },
    ],
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
      {
        q: "Does Portola Hotel charge a resort fee?",
        a: "No resort fee on direct bookings, per the hotel's official policy.",
      },
      {
        q: "What's the spa like at Portola Hotel?",
        a: "Spa on the Plaza is 6,000 sq ft with 11 private treatment rooms — the largest day spa in Monterey County.",
      },
      {
        q: "What's the dining like at Portola Hotel?",
        a: "Jacks Monterey serves breakfast and dinner with an American menu, on-site at the hotel.",
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
    gallery: [
      "/images/hotels/gallery/casa-munras-2.webp",
      "/images/hotels/gallery/casa-munras-3.webp",
      "/images/hotels/gallery/casa-munras-4.avif",
    ],
    description: [
      "Casa Munras Garden Hotel & Spa traces back to 1824 — Monterey's first hotel, and one of the oldest hotel properties on the Central Coast. The hacienda-style architecture and Spanish Colonial heritage are reflected throughout the downtown Monterey property, set amid picturesque courtyard gardens. It was named Best Hotel in Monterey County in 2023.",
      "With 163 rooms, it's positioned as a strong value boutique option for groups wanting authentic Monterey character without full resort pricing.",
    ],
    amenities: [
      "On-site spa",
      "Outdoor heated pool",
      "Complimentary bikes",
      "Lush courtyard gardens",
    ],
    diningNames: [{ name: "Esteban Restaurant & Bar", detail: "Spanish-California cuisine, house-made sangria" }],
    uniqueDetails: ["Named Best Hotel in Monterey County, 2023"],
    onSiteGolf: null,
    airportDistance: "~8 min from MRY",
    driveTimeToCourses: [
      { course: "Pacific Grove Golf Links", minutes: 10 },
      { course: "The Club at Pasadera", minutes: 10 },
      { course: "Bayonet / Black Horse", minutes: 8 },
      { course: "Laguna Seca Golf Ranch", minutes: 12 },
      { course: "Poppy Hills", minutes: 14 },
      { course: "Quail Lodge", minutes: 20 },
      { course: "Carmel Valley Ranch", minutes: 25 },
    ],
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
      {
        q: "Has Casa Munras won any recent awards?",
        a: "Yes — it was named Best Hotel in Monterey County in 2023.",
      },
      {
        q: "Are bikes available to guests?",
        a: "Yes, complimentary bikes are available for getting around downtown Monterey.",
      },
      {
        q: "What's the dining like at Casa Munras?",
        a: "Esteban Restaurant & Bar serves Spanish-California cuisine, including house-made sangria.",
      },
    ],
  },
  "hotel-abrego": {
    slug: "hotel-abrego",
    name: "Hotel Abrego",
    city: "Monterey, CA",
    tier: 3,
    address: "755 Abrego Street, Monterey, CA 93940",
    phone: "+1 (831) 372-7551",
    website: "hotelabrego.com",
    rooms: "93 rooms across four buildings",
    brand: "Independent boutique — AAA Three Diamond",
    hook: "Downtown Monterey boutique property, walkable to Cannery Row and the Monterey Bay Aquarium.",
    gallery: [
      "/images/hotels/gallery/hotel-abrego-2.avif",
      "/images/hotels/gallery/hotel-abrego-3.avif",
      "/images/hotels/gallery/hotel-abrego-4.avif",
      "/images/hotels/gallery/hotel-abrego-5.avif",
      "/images/hotels/gallery/hotel-abrego-6.avif",
    ],
    description: [
      "Hotel Abrego is an independent boutique property in downtown Monterey, spread across four buildings with 93 individually furnished rooms. It carries an AAA Three Diamond rating.",
      "Its downtown location puts guests within walking distance of Cannery Row (1.4 mi), the Monterey Bay Aquarium (1.6 mi), and the Path of History, making it a strong choice for groups who want to pair golf with time exploring the city rather than staying resort-bound.",
      "The property also offers private and group tour arrangements and special-interest tours, along with a full-service business center on-site for groups mixing golf with meetings.",
    ],
    amenities: [
      "Heated outdoor pool + hot tub",
      "Bistro Abrego (on-site dining, breakfast + evening dining, bar/lounge with happy hour)",
      "Fitness facilities",
      "Full-service business center on-site",
      "Banquet room for group events",
      "Group rates + private/group tours available",
      "Whale watching arrangements",
      "Aquarium ticket packages",
      "On-site parking + WiFi (bundled under a mandatory $20/night amenity fee)",
    ],
    diningNames: [
      { name: "Bistro Abrego", detail: "Daily breakfast buffet; California coastal dishes and drinks in the evening; on-site bar/lounge with happy hour" },
    ],
    uniqueDetails: [
      "AAA Three Diamond rated.",
      "Aquarium Package: 15% off standard room rates plus breakfast and a welcome drink at the bistro.",
      "Bistro Abrego Dinner Package: accommodations paired with a three-course dinner for two.",
      "Nearby attractions: Cannery Row (1.4 mi), Monterey Bay Aquarium (1.6 mi), Path of History, Monterey Sports Center, Wine Trolley Tours, Monterey County Youth Museum, California Views scenic overlook.",
    ],
    onSiteGolf: null,
    airportDistance: "~8 min from MRY (est.)",
    driveTimeToCourses: [
      { course: "Bayonet / Black Horse", minutes: 15 },
      { course: "Poppy Hills", minutes: 13 },
      { course: "Laguna Seca Golf Ranch", minutes: 12 },
      { course: "Pacific Grove Golf Links", minutes: 15 },
    ],
    positioning:
      "Best for groups who want a walkable downtown Monterey base and are planning to spend some trip time off the course — note the mandatory $20/night amenity fee when comparing total cost to other properties.",
    faqs: [
      {
        q: "Is Hotel Abrego close to the Monterey Bay Aquarium?",
        a: "Yes — it's about 1.6 miles away, an easy walk or short drive.",
      },
      {
        q: "How many rooms does Hotel Abrego have?",
        a: "93 rooms, spread across four buildings on the property.",
      },
      {
        q: "Does Hotel Abrego have a resort fee?",
        a: "Yes — a mandatory $20/night amenity fee covers parking and WiFi. Factor this into your total cost comparison.",
      },
      {
        q: "Is Hotel Abrego good for golf groups?",
        a: "It's not on a golf course, but it's centrally located with drive times of roughly 12–15 minutes to several Monterey Peninsula courses, and offers group rates.",
      },
      {
        q: "What dining is on-site at Hotel Abrego?",
        a: "Bistro Abrego serves a daily breakfast buffet and California coastal dishes in the evening, plus a bar/lounge with happy hour.",
      },
      {
        q: "What else is within walking distance of Hotel Abrego?",
        a: "Path of History, Monterey Sports Center, Wine Trolley Tours, and the Monterey County Youth Museum are all a short walk away, along with a scenic overlook known as California Views.",
      },
    ],
  },
  "embassy-suites-monterey-bay-seaside": {
    slug: "embassy-suites-monterey-bay-seaside",
    name: "Embassy Suites by Hilton Monterey Bay Seaside",
    city: "Seaside, CA",
    tier: 2,
    address: "1441 Canyon Del Rey Boulevard, Seaside, CA 93955",
    phone: "+1 (831) 393-1115",
    website: "hilton.com",
    rooms: "225 rooms, all-suite",
    brand: "Embassy Suites by Hilton — AAA Three Diamond",
    hook: "All-suite property in Seaside with a separate living room and bedroom in every unit.",
    gallery: [
      "/images/hotels/gallery/embassy-suites-2.avif",
      "/images/hotels/gallery/embassy-suites-3.jpg",
      "/images/hotels/gallery/embassy-suites-4.avif",
    ],
    description: [
      "Embassy Suites by Hilton Monterey Bay Seaside is a 225-room all-suite property, carrying an AAA Three Diamond rating, with every unit featuring a separate living room and bedroom, a microwave, mini-refrigerator, wet bar, and two televisions. Select rooms offer ocean views.",
      "It's a strong choice for groups wanting extra room to spread out, with brand-standard amenities, on-site dining through lunch, dinner, and Sunday brunch, and a central Seaside location convenient to several Monterey Peninsula courses.",
      "Check-in is 4:00 PM and check-out is 11:00 AM.",
    ],
    amenities: [
      "Complimentary full cooked-to-order breakfast",
      "Indoor pool",
      "Fitness center + sauna/steam",
      "Bike trails nearby",
      "Full bar/lounge with outdoor seating and live music",
      "Sunday brunch",
      "Concierge service",
      "Gift shop",
      "Group rates + group dining available",
      "Ocean view rooms available",
      "Pet-friendly",
    ],
    roomFeatures: [
      "Separate living room and bedroom in every suite",
      "Microwave, mini-refrigerator, wet bar",
      "Two televisions",
      "Ocean view available in select rooms",
    ],
    onSiteGolf: null,
    airportDistance: "~5 min from MRY (est.)",
    driveTimeToCourses: [
      { course: "Bayonet / Black Horse", minutes: 8 },
    ],
    positioning:
      "Best for groups who want extra suite space and brand-standard reliability, centrally located in Seaside near Bayonet/Black Horse.",
    faqs: [
      {
        q: "Is Embassy Suites Monterey Bay Seaside an all-suite hotel?",
        a: "Yes — all 225 units are suites with a separate living room and bedroom.",
      },
      {
        q: "Is breakfast included at Embassy Suites Monterey Bay Seaside?",
        a: "Yes, a complimentary full cooked-to-order breakfast is included, standard for the Embassy Suites brand.",
      },
      {
        q: "How far is Embassy Suites Monterey Bay Seaside from Bayonet and Black Horse?",
        a: "About 8 minutes by car.",
      },
      {
        q: "Does Embassy Suites Monterey Bay Seaside have a pool?",
        a: "Yes, an indoor pool, along with a fitness center and sauna/steam room.",
      },
      {
        q: "Is Embassy Suites Monterey Bay Seaside pet-friendly?",
        a: "Yes.",
      },
      {
        q: "Are ocean view rooms available at Embassy Suites Monterey Bay Seaside?",
        a: "Yes, select rooms offer ocean views — request one when booking if that's a priority.",
      },
    ],
  },
  "monterey-beach-hotel": {
    slug: "monterey-beach-hotel",
    name: "Monterey Beach Hotel, A Tribute Portfolio Hotel",
    city: "Monterey, CA",
    tier: 2,
    address: "2600 Sand Dunes Drive, Monterey, CA 93940",
    phone: "+1 (831) 394-3321",
    website: "montereybeach.com",
    rooms: "188 guest rooms + 4 suites (192 total)",
    brand: "Tribute Portfolio (Marriott International) — AAA Three Diamond",
    hook: "The only Monterey Golf Tours hotel located directly on the beach.",
    gallery: [
      "/images/hotels/gallery/monterey-beach-hotel-2.webp",
      "/images/hotels/gallery/monterey-beach-hotel-3.webp",
    ],
    description: [
      "Monterey Beach Hotel, a Tribute Portfolio Hotel, is the only property in this collection located directly on a beach, with 188 guest rooms and 4 suites. Originally built in 1967, the property reopened under Marriott's Tribute Portfolio brand on August 21, 2024 following a complete renovation. It carries an AAA Three Diamond rating.",
      "It's a strong fit for groups who want a beachfront base with full-service amenities and meeting space, a short drive from Bayonet and Black Horse.",
      "Beyond golf, guests have easy access to whale watching, fishing, hiking and biking trails, horseback riding, sailing, scuba diving, and winery tours, making it a good fit for mixed groups where not everyone is golfing every day.",
    ],
    amenities: [
      "3 restaurants (The Lantern Room, Tidewater, Lobby Lounge) + 3 bars/lounges",
      "Outdoor pool + hot tub",
      "24-hour fitness center",
      "Beachfront, with direct beach access",
      "13 meeting rooms, 56,171 sq ft conference space",
      "Concierge services + multilingual staff (English, Spanish)",
      "Bike hire on-site",
      "Romance packages available",
      "Garden + picnic area, fireplace at reception",
      "Pet-friendly",
      "EV charging",
      "Wedding services",
    ],
    diningNames: [
      { name: "The Lantern Room", detail: "On-site restaurant" },
      { name: "Tidewater", detail: "On-site restaurant" },
      { name: "Lobby Lounge", detail: "On-site bar" },
    ],
    uniqueDetails: [
      "Built in 1967; reopened under the Tribute Portfolio brand on August 21, 2024 following a complete renovation.",
      "AAA Three Diamond rated.",
      "4.2 miles (6.7 km) from Bayonet & Black Horse Golf Course.",
      "Cooked-to-order breakfast available for a surcharge, 7–11 AM weekdays and 7 AM–1 PM weekends.",
      "Nearby activities beyond golf: whale watching, fishing, hiking/biking trails, horseback riding, sailing, scuba diving, surfing, winery tours.",
    ],
    onSiteGolf: null,
    airportDistance: "~6 min from MRY (est.)",
    driveTimeToCourses: [],
    positioning:
      "Best for groups who want a beachfront hotel with full-service amenities and meeting space, about 4.2 miles from Bayonet and Black Horse.",
    faqs: [
      {
        q: "Is Monterey Beach Hotel actually on the beach?",
        a: "Yes — it's the only Monterey Golf Tours hotel located directly on a beach, with direct beach access.",
      },
      {
        q: "How many rooms does Monterey Beach Hotel have?",
        a: "188 guest rooms plus 4 suites, for 192 total.",
      },
      {
        q: "What brand is Monterey Beach Hotel affiliated with?",
        a: "It's part of Marriott International's Tribute Portfolio, reopened August 21, 2024 following a complete renovation. It carries an AAA Three Diamond rating.",
      },
      {
        q: "How far is Monterey Beach Hotel from Bayonet and Black Horse?",
        a: "4.2 miles (6.7 km).",
      },
      {
        q: "Does Monterey Beach Hotel have meeting space for groups?",
        a: "Yes — 13 meeting rooms and 56,171 sq ft of conference space, in addition to 3 on-site restaurants and 3 bars/lounges.",
      },
      {
        q: "What can non-golfers do at Monterey Beach Hotel?",
        a: "Plenty — whale watching, fishing, hiking and biking trails, horseback riding, sailing, scuba diving, surfing, and winery tours are all accessible nearby, making it a solid pick for mixed groups.",
      },
    ],
  },
};
