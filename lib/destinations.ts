// Source: mgts-page-specs.md (destination spec) + course/hotel data already
// verified in lib/courses.ts and lib/hotels.ts. Course/hotel proximity is
// based on the city field already verified in those files, not re-researched.

export type Destination = {
  slug: string;
  name: string;
  heroTitle: string;
  speakable: string;
  trustBar: string[];
  whyPlay: string;
  features: { label: string; detail: string }[];
  pointers?: string[];
  courseSlugs: string[];
  hotelSlugs: string[];
  itinerarySlugs: string[];
  faqs: { q: string; a: string }[];
  image: string;
};

export const DESTINATIONS: Record<string, Destination> = {
  monterey: {
    slug: "monterey",
    image: "/images/pbc-portal/17md_2016_coastline.jpg",
    name: "Monterey",
    heroTitle: "Golf in Monterey",
    speakable:
      "Monterey is the central base for golf on the peninsula, home to Del Monte Golf Course®, Laguna Seca Golf Ranch, and The Club at Pasadera, with the largest concentration of group-friendly hotels.",
    trustBar: ["4 courses nearby", "8 min from MRY", "Largest hotel selection on the peninsula"],
    whyPlay:
      "Monterey sits at the center of the peninsula's golf geography, putting Del Monte Golf Course®, Laguna Seca, and The Club at Pasadera all within a short drive, alongside the largest concentration of group-friendly hotels on the peninsula — from the golf-anchor Hyatt Regency to downtown boutiques. Monterey Golf Tours builds Monterey golf packages around downtown Monterey stays for groups who want central access to all peninsula courses without paying Pebble Beach resort rates.",
    features: [
      {
        label: "Central location",
        detail: "A short drive to nearly every course on the peninsula.",
      },
      {
        label: "Most hotel options",
        detail: "From golf-anchor resorts to boutique downtown stays.",
      },
      {
        label: "Cannery Row and the Aquarium",
        detail: "Strong for groups with non-golfing partners.",
      },
      { label: "MRY airport access", detail: "Most courses are 8–20 minutes from the airport." },
    ],
    pointers: [
      "Del Monte Golf Course® dates to 1897 \u2014 the oldest golf course in continuous operation west of the Mississippi.",
      "Monterey Regional Airport (MRY) has year-round nonstop service from LAX, SFO, PHX, DEN, DFW, SAN, and SEA.",
      "Cannery Row and the Monterey Bay Aquarium sit a short walk or drive from most downtown hotels.",
      "Fisherman's Wharf offers a walkable dining option for group dinners after a round.",
    ],
    courseSlugs: ["del-monte-golf-course", "laguna-seca-golf-ranch", "club-at-pasadera"],
    hotelSlugs: ["hyatt-regency-monterey", "monterey-plaza", "casa-munras"],
    itinerarySlugs: ["3-day-monterey-golf-weekend", "4-day-monterey-peninsula-golf-trip"],
    faqs: [
      {
        q: "Does Monterey fog in the morning?",
        a: "Yes, coastal Monterey courses typically fog in until 9–10am from May through August. It clears by midday — plan tee times for 9:30am or later if you want clear skies from the start.",
      },
      {
        q: "How far is Monterey from the airport?",
        a: "Most Monterey-area courses and hotels are 8–20 minutes from Monterey Regional Airport (MRY).",
      },
      {
        q: "What's the best time to play golf in Monterey?",
        a: "March through May and September through November tend to have the lightest fog and mildest conditions.",
      },
      {
        q: "What's nearby besides golf?",
        a: "Cannery Row and the Monterey Bay Aquarium are both in Monterey, making it a strong base for groups traveling with non-golfing partners.",
      },
      {
        q: "Which airlines fly nonstop to Monterey?",
        a: "Monterey Regional Airport (MRY) has year-round nonstop service from LAX, SFO, PHX, DEN, DFW, SAN, and SEA, plus seasonal routes from LAS, BUR, ORD, and SNA.",
      },
      {
        q: "Is Del Monte Golf Course® walkable from downtown Monterey?",
        a: "It's a short drive rather than a walk, but it's one of the closest courses to downtown, sitting directly on the Hyatt Regency Monterey property.",
      },
    
      { q: "Can I book a Monterey golf package based in downtown Monterey?", a: "Yes. Monterey Golf Tours builds Monterey golf packages around downtown hotels — the Portola Hotel, Hyatt Regency, and Casa Munras all put you within 8–20 minutes of every course on the peninsula. A 3- to 5-day itinerary based in Monterey gives you access to Del Monte, Laguna Seca, Bayonet, Black Horse, and Pacific Grove without the Pebble Beach resort rate." },],
  },
  carmel: {
    slug: "carmel",
    image: "/images/pbc-portal/thehay_2021_aerial.jpg",
    name: "Carmel-by-the-Sea",
    heroTitle: "Golf near Carmel-by-the-Sea",
    speakable:
      "Carmel-by-the-Sea is a walkable village base for golf trips, with Carmel Valley's courses a short 5-10 minute drive inland.",
    trustBar: ["Carmel Valley courses 5–10 min away", "Village walkability", "Steps from Carmel Beach"],
    whyPlay:
      "Carmel-by-the-Sea itself has no golf course within the village, but Carmel Valley's courses — Carmel Valley Ranch and Quail Lodge — are a short 5 to 10 minute drive inland. Carmel works best as a village base for groups who want walkable galleries, shops, and dining alongside their golf. Groups basing a Monterey golf trip in Carmel are typically focused on the Pebble Beach courses and Quail Lodge, with the town’s restaurant scene as the evening anchor.",
    features: [
      {
        label: "Village walkability",
        detail: "Galleries, shops, and dining within a few blocks, no car needed in town.",
      },
      {
        label: "Close to Carmel Valley golf",
        detail: "Carmel Valley Ranch and Quail Lodge are both a short drive inland.",
      },
      {
        label: "Carmel Beach",
        detail: "A short walk from the village center.",
      },
      {
        label: "Dining & galleries",
        detail: "Dozens of restaurants and art galleries within a short walk of Ocean Avenue.",
      },
    ],
    pointers: [
      "Ocean Avenue is the main gallery and shopping street, running straight down to Carmel Beach.",
      "Carmel-by-the-Sea has no street addresses on homes \u2014 mail is collected at the post office, a quirk of the village's history.",
    ],
    courseSlugs: ["carmel-valley-ranch", "quail-lodge"],
    hotelSlugs: [],
    itinerarySlugs: ["carmel-valley-golf-getaway", "4-day-monterey-peninsula-golf-trip"],
    faqs: [
      {
        q: "Is there a golf course in Carmel-by-the-Sea itself?",
        a: "Not directly in the village — the closest courses, Carmel Valley Ranch and Quail Lodge, are a short 5 to 10 minute drive inland in Carmel Valley.",
      },
      {
        q: "Is Carmel-by-the-Sea good for non-golfers?",
        a: "Yes — it's a walkable village with galleries, shops, and dining, making it a strong base for groups that include non-golfing partners.",
      },
      {
        q: "How far is Carmel from the airport?",
        a: "About 15 minutes from Monterey Regional Airport (MRY).",
      },
      {
        q: "Does Carmel-by-the-Sea have street addresses?",
        a: "No — homes in the village don't have street numbers; mail is collected at the post office, a well-known local quirk.",
      },
      {
        q: "What's the best restaurant in Carmel for a group dinner?",
        a: "Carmel village has dozens of restaurants within walking distance of Ocean Avenue — ask us for a current recommendation matched to your group size and taste, since the best fit changes with availability.",
      },
    
      { q: "Is Carmel a good base for a Pebble Beach golf trip?", a: "Yes. Carmel puts you minutes from Pebble Beach Golf Links®, Spyglass Hill®, Quail Lodge, and Carmel Valley Ranch. Monterey Golf Tours can build an itinerary based in Carmel for groups who want walkable dining and close proximity to the Pebble Beach courses." },],
  },
  "carmel-valley": {
    slug: "carmel-valley",
    image: "/images/carmel-valley-ranch/golf-1.webp",
    name: "Carmel Valley",
    heroTitle: "Golf in Carmel Valley",
    speakable:
      "Carmel Valley is the warm, inland golf base on the peninsula, home to Carmel Valley Ranch, Quail Lodge, and Bernardus Lodge, typically 15–18°F warmer and clearer than the coast.",
    trustBar: ["3 courses on-site at lodging", "15–18°F warmer than the coast", "Wine country setting"],
    whyPlay:
      "Carmel Valley sits inland from the coastal fog belt, in a wine-country microclimate that runs 15 to 18°F warmer and typically clears earlier than coastal Monterey courses. It's home to three golf-anchor resorts — Carmel Valley Ranch, Quail Lodge, and Bernardus Lodge — making it the best base for groups wanting golf and lodging in one place. Carmel Valley is the default base for Monterey golf trips that want warmth, privacy, and a stay-and-play resort setup — Carmel Valley Ranch and Quail Lodge both offer accommodation and courses on the same property.",
    features: [
      {
        label: "Warmer, sunnier weather",
        detail: "Clears of fog earlier than the coast, even in summer.",
      },
      {
        label: "On-site golf resorts",
        detail: "Carmel Valley Ranch and Quail Lodge both have golf on property.",
      },
      {
        label: "Wine country",
        detail: "Bernardus Winery, Folktale, and others are all nearby.",
      },
      {
        label: "Pete Dye design",
        detail: "Carmel Valley Ranch is the only Pete Dye course in Northern California.",
      },
    ],
    pointers: [
      "Bernardus Winery and Folktale Winery are both a short drive from the valley's golf resorts.",
      "Carmel Valley Ranch's course is a Pete Dye original from 1980, renovated by Gene Bates in 2006.",
      "Guests of Bernardus Lodge can arrange access to The Club at Pasadera outside its usual Monday-only public window \u2014 confirm current terms with the property.",
    ],
    courseSlugs: ["carmel-valley-ranch", "quail-lodge"],
    hotelSlugs: ["carmel-valley-ranch", "quail-lodge", "bernardus-lodge"],
    itinerarySlugs: ["carmel-valley-golf-getaway", "5-day-complete-monterey-golf-vacation"],
    faqs: [
      {
        q: "Why is Carmel Valley warmer than the coast?",
        a: "It sits inland in a wine-country microclimate, typically running 15–18°F warmer and clearing of fog earlier than coastal Monterey courses.",
      },
      {
        q: "Which courses are in Carmel Valley?",
        a: "Carmel Valley Ranch (the only Pete Dye design in Northern California) and Quail Lodge & Golf Club both have golf on-site, with Bernardus Lodge offering guest access to The Club at Pasadera.",
      },
      {
        q: "Is Carmel Valley good for early tee times?",
        a: "Yes — its inland microclimate often clears earlier than the coast, making early morning rounds more reliable here.",
      },
      {
        q: "Is there wine tasting near the golf courses?",
        a: "Yes — Bernardus Winery and Folktale Winery are both a short drive from Carmel Valley Ranch and Quail Lodge.",
      },
      {
        q: "How far is Carmel Valley from the airport?",
        a: "About 20 minutes from Monterey Regional Airport (MRY), a bit further than the coastal courses given its inland location.",
      },
    
      { q: "Is Carmel Valley a good choice for a golf trip base?", a: "Yes. Carmel Valley runs 15–18°F warmer than the coast and has two stay-and-play resorts — Carmel Valley Ranch and Quail Lodge — where you can walk from your room to the first tee. Monterey Golf Tours builds Carmel Valley golf packages for groups who want warmth and an inland resort setting alongside day trips to the Pebble Beach courses." },],
  },
  "pacific-grove": {
    slug: "pacific-grove",
    image: "/images/pacific-grove-golf-links/hero.jpg",
    name: "Pacific Grove",
    heroTitle: "Golf in Pacific Grove",
    speakable:
      "Pacific Grove is home to Pacific Grove Golf Links, a municipal course with genuine ocean-adjacent holes at the most accessible green fees on the peninsula.",
    trustBar: ["Municipal pricing", "Ocean-adjacent holes", "10 min from downtown Monterey"],
    whyPlay:
      "Pacific Grove offers the most budget-friendly golf on the Monterey Peninsula — a city-owned municipal course with genuine ocean-adjacent holes, at a fraction of the cost of the peninsula's resort and private courses. Pacific Grove Golf Links is one of the best-value rounds on any Monterey Peninsula golf trip and is often included in itineraries as the arrival or departure day round.",
    features: [
      {
        label: "Municipal pricing",
        detail: "Among the lowest green fees on the peninsula.",
      },
      {
        label: "Ocean views",
        detail: "Genuine coastal holes without resort-level cost.",
      },
      {
        label: "Walkable layout",
        detail: "Shorter yardage suited to a relaxed pace.",
      },
      {
        label: "Close to Monterey",
        detail: "A short drive from downtown Monterey and Cannery Row.",
      },
    ],
    pointers: [
      "Pacific Grove Golf Links plays 5,727 yards at par 70, with split weekday/weekend rates.",
      "Asilomar State Beach borders the town, offering a scenic walk for non-golfing members of the group.",
      "Downtown Pacific Grove is a short drive from Cannery Row and downtown Monterey.",
    ],
    courseSlugs: ["pacific-grove-golf-links"],
    hotelSlugs: [],
    itinerarySlugs: ["monterey-golf-trip-best-value", "3-day-monterey-golf-weekend"],
    faqs: [
      {
        q: "Is Pacific Grove Golf Links on the ocean?",
        a: "Yes, it includes genuine ocean-adjacent holes, offered at municipal course pricing rather than resort rates.",
      },
      {
        q: "Is Pacific Grove good for budget-conscious groups?",
        a: "Yes — it has the most accessible green fees on the peninsula, making it a strong fit for value-focused trips.",
      },
      {
        q: "Are there hotels directly in Pacific Grove?",
        a: "We don't currently feature a hotel directly in Pacific Grove — groups typically base in nearby Monterey, a short drive away.",
      },
      {
        q: "How long is the course at Pacific Grove Golf Links?",
        a: "5,727 yards at par 70, shorter than most peninsula courses, which suits a relaxed pace and mixed-handicap groups.",
      },
      {
        q: "Is Asilomar State Beach nearby?",
        a: "Yes, it borders Pacific Grove, offering a scenic walk for non-golfing members of the group.",
      },
    
      { q: "Can I include Pacific Grove in a Monterey golf trip?", a: "Yes. Pacific Grove Golf Links is a regular inclusion in Monterey golf packages — a full links-style coastal round at municipal pricing, and one of the few courses on the peninsula where you can walk to the ocean from the green. Monterey Golf Tours includes it in multi-day itineraries as the arrival or departure day round." },],
  },
  seaside: {
    slug: "seaside",
    image: "/images/black-horse-golf-course/gallery-2.jpg",
    name: "Seaside",
    heroTitle: "Golf in Seaside",
    speakable:
      "Seaside is home to Bayonet and Black Horse, two championship courses built on the former Fort Ord military base, including one of the toughest public courses in the country.",
    trustBar: ["2 championship courses", "Fort Ord heritage", "5 min from Monterey"],
    whyPlay:
      "Seaside is built on the grounds of the former Fort Ord military base, home to Bayonet and Black Horse — a genuine two-course championship pairing under one facility. Bayonet in particular is ranked among the toughest public courses in the country, while Black Horse offers a slightly more approachable companion round.",
    features: [
      {
        label: "Two-course pairing",
        detail: "Bayonet and Black Horse share one facility, ideal for a multi-round day.",
      },
      {
        label: "Nationally ranked difficulty",
        detail: "Bayonet ranks No. 35 nationally by Golf Digest among toughest public courses.",
      },
      {
        label: "Fort Ord military heritage",
        detail: "Both courses were built on the former Fort Ord base, designed in 1954.",
      },
      {
        label: "Close to Monterey",
        detail: "A short 5-minute drive from downtown Monterey.",
      },
    ],
    pointers: [
      "Bayonet plays 7,024 yards at a 74.8 rating and 139 slope from the back tees \u2014 built for serious and low-handicap players.",
      "Bayonet's \u201cCombat Corner\u201d nickname refers to hole 15 specifically, part of the tough closing stretch from 11 through 15.",
      "Both courses were designed in 1954 as part of the Fort Ord Army base's original recreational facilities.",
    ],
    courseSlugs: ["bayonet", "black-horse"],
    hotelSlugs: [],
    itinerarySlugs: ["3-day-monterey-golf-weekend", "monterey-golf-trip-best-value"],
    faqs: [
      {
        q: "What golf courses are in Seaside?",
        a: "Bayonet and Black Horse, two championship courses sharing one facility, both built on the former Fort Ord military base.",
      },
      {
        q: "Is Bayonet the hardest course on the peninsula?",
        a: "It's ranked among the toughest public courses in the country — No. 35 nationally on Golf Digest's list of the 50 Toughest Golf Courses in the United States.",
      },
      {
        q: "Are there hotels in Seaside?",
        a: "We don't currently feature a hotel directly in Seaside — most groups base in nearby Monterey, a 5-minute drive away.",
      },
      {
        q: "What's the yardage at Bayonet and Black Horse?",
        a: "Bayonet plays 7,024 yards at a 74.8 rating and 139 slope; Black Horse plays the same 7,024 yards at par 72, slope 141, rating 73.7.",
      },
      {
        q: "Were Bayonet and Black Horse always public courses?",
        a: "No — both were built in 1954 as part of the Fort Ord Army base's recreational facilities, and opened to the public after the base was decommissioned in the 1990s.",
      },
    
      { q: "Can I book Bayonet and Black Horse as part of a Monterey golf package?", a: "Yes. Bayonet and Black Horse at former Fort Ord in Seaside are two of the most booked courses in Monterey Golf Tours itineraries. We include them in Monterey golf packages for groups of all sizes — as a two-day Fort Ord combination, or mixed into a broader peninsula itinerary." },],
  },
  "pebble-beach-area": {
    slug: "pebble-beach-area",
    image: "/images/pbc-portal/pbgl_9_2020_aerial.jpg",
    name: "Pebble Beach Area",
    heroTitle: "Golf in the Pebble Beach Area",
    speakable:
      "The Pebble Beach Area refers to the Del Monte Forest area of the Monterey Peninsula, home to Pebble Beach Golf Links®, Spyglass Hill Golf Course®, The Links at Spanish Bay®, and Poppy Hills, among others.",
    trustBar: ["4+ courses in the Del Monte Forest", "IAGTO-authorized booking partner", "World-renowned golf address"],
    whyPlay:
      "\"Pebble Beach Area\" here refers to the Del Monte Forest area of the Monterey Peninsula — the geography, not the Pebble Beach Company brand specifically. As an IAGTO-contracted travel partner with Pebble Beach Resorts®, we can book and name Pebble Beach Golf Links®, Spyglass Hill Golf Course®, and The Links at Spanish Bay® directly, alongside Poppy Hills, an NCGA-owned course in the same forest that doesn't carry the resort's gate fee. Monterey Golf Tours books Pebble Beach Resorts® courses through our IAGTO agreement and can build full Pebble Beach golf packages for groups of any size, from a single Pebble Beach day trip to a multi-day stay across The Lodge, The Inn, and Casa Palmero.",
    features: [
      {
        label: "World-renowned address",
        detail: "Home to some of the most recognized golf courses in the country.",
      },
      {
        label: "IAGTO-authorized access",
        detail: "Monterey Golf Tours can coordinate tee times as a contracted Pebble Beach Resorts® partner.",
      },
      {
        label: "A range of access points",
        detail: "From the marquee Pebble Beach Golf Links® to the more accessible, NCGA-owned Poppy Hills.",
      },
      {
        label: "Del Monte Forest setting",
        detail: "Coastal cliffs giving way to forested inland holes.",
      },
    ],
    pointers: [
      "The scenic coastal drive through the Del Monte Forest connects several of these courses, running along the shoreline past Stillwater Cove.",
      "Spyglass Hill Golf Course® can be booked 3 months out without a resort stay; The Links at Spanish Bay®, Del Monte Golf Course®, and The Hay\u2122 can be booked 6 months out.",
      "Pebble Beach Golf Links® generally requires a 2\u20133 night resort stay to book in advance \u2014 otherwise it's a 24-hour booking window.",
    ],
    courseSlugs: ["pebble-beach-golf-links", "spyglass-hill", "links-at-spanish-bay", "poppy-hills"],
    hotelSlugs: [],
    itinerarySlugs: ["7-day-ultimate-monterey-golf-trip", "4-day-monterey-peninsula-golf-trip"],
    faqs: [
      {
        q: "What does \"Pebble Beach Area\" mean on this site?",
        a: "It refers to the Del Monte Forest area of the Monterey Peninsula — the geography. Pebble Beach Golf Links®, Spyglass Hill Golf Course®, and The Links at Spanish Bay® are trademarks of Pebble Beach Company, used here with authorization as an IAGTO-contracted travel partner.",
      },
      {
        q: "Can I book a round at Pebble Beach Golf Links® through Monterey Golf Tours?",
        a: "Yes — as an IAGTO-contracted travel partner with Pebble Beach Resorts®, we coordinate tee times at Pebble Beach Golf Links®, Spyglass Hill Golf Course®, and The Links at Spanish Bay® as part of a planned trip.",
      },
      {
        q: "Is there a more affordable course in the same area?",
        a: "Yes — Poppy Hills Golf Course sits in the same Del Monte Forest, owned by the Northern California Golf Association (NCGA), without the Pebble Beach Resorts® gate fee.",
      },
      {
        q: "How far in advance can I book a Pebble Beach round?",
        a: "It depends on the course and whether you're staying on-property. Without a resort stay, Spyglass Hill can be booked 3 months out, and The Links at Spanish Bay®, Del Monte Golf Course®, and The Hay™ can be booked 6 months out. Pebble Beach Golf Links® generally requires a 2–3 night resort stay to book in advance, otherwise it's a 24-hour booking window.",
      },
      {
        q: "What's the oldest course in the Del Monte Forest?",
        a: "Del Monte Golf Course®, dating to 1897 — the oldest golf course in continuous operation west of the Mississippi.",
      },
    
      { q: "Can Monterey Golf Tours book a group Pebble Beach golf trip?", a: "Yes. Monterey Golf Tours is an IAGTO member with access to Pebble Beach Golf Links®, Spyglass Hill®, and Del Monte™ Golf Course. We build Pebble Beach golf packages for groups of 2 to 400, including accommodation at The Lodge, The Inn, and Casa Palmero. Contact us for a custom quote." },],
  },
};
