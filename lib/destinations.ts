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
  courseSlugs: string[];
  hotelSlugs: string[];
  itinerarySlugs: string[];
  faqs: { q: string; a: string }[];
};

export const DESTINATIONS: Record<string, Destination> = {
  monterey: {
    slug: "monterey",
    name: "Monterey",
    heroTitle: "Golf in Monterey",
    speakable:
      "Monterey is the central base for golf on the peninsula, home to Del Monte Golf Course™, Laguna Seca Golf Ranch, and The Club at Pasadera, with the largest concentration of group-friendly hotels.",
    trustBar: ["4 courses nearby", "8 min from MRY", "Largest hotel selection on the peninsula"],
    whyPlay:
      "Monterey sits at the center of the peninsula's golf geography, putting Del Monte Golf Course™, Laguna Seca, and The Club at Pasadera all within a short drive, alongside the largest concentration of group-friendly hotels on the peninsula — from the golf-anchor Hyatt Regency to downtown boutiques.",
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
    ],
  },
  carmel: {
    slug: "carmel",
    name: "Carmel-by-the-Sea",
    heroTitle: "Golf near Carmel-by-the-Sea",
    speakable:
      "Carmel-by-the-Sea is a village base for golf trips, with Carmel Valley's courses a short 5-10 minute drive inland and L'Auberge Carmel offering an intimate in-village stay.",
    trustBar: ["Carmel Valley courses 5–10 min away", "Village walkability", "L'Auberge Carmel on-site dining"],
    whyPlay:
      "Carmel-by-the-Sea itself has no golf course within the village, but Carmel Valley's courses — Carmel Valley Ranch and Quail Lodge — are a short 5 to 10 minute drive inland. Carmel works best as a village base for groups who want walkable galleries, shops, and dining alongside their golf, with L'Auberge Carmel offering an intimate, adults-oriented stay.",
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
        label: "Fine dining",
        detail: "Aubergine at L'Auberge Carmel is one of the Central Coast's most acclaimed restaurants.",
      },
    ],
    courseSlugs: ["carmel-valley-ranch", "quail-lodge"],
    hotelSlugs: ["lauberge-carmel"],
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
    ],
  },
  "carmel-valley": {
    slug: "carmel-valley",
    name: "Carmel Valley",
    heroTitle: "Golf in Carmel Valley",
    speakable:
      "Carmel Valley is the warm, inland golf base on the peninsula, home to Carmel Valley Ranch, Quail Lodge, and Bernardus Lodge, typically 15–18°F warmer and clearer than the coast.",
    trustBar: ["3 courses on-site at lodging", "15–18°F warmer than the coast", "Wine country setting"],
    whyPlay:
      "Carmel Valley sits inland from the coastal fog belt, in a wine-country microclimate that runs 15 to 18°F warmer and typically clears earlier than coastal Monterey courses. It's home to three golf-anchor resorts — Carmel Valley Ranch, Quail Lodge, and Bernardus Lodge — making it the best base for groups wanting golf and lodging in one place.",
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
    ],
  },
  "pacific-grove": {
    slug: "pacific-grove",
    name: "Pacific Grove",
    heroTitle: "Golf in Pacific Grove",
    speakable:
      "Pacific Grove is home to Pacific Grove Golf Links, a municipal course with genuine ocean-adjacent holes at the most accessible green fees on the peninsula.",
    trustBar: ["Municipal pricing", "Ocean-adjacent holes", "10 min from downtown Monterey"],
    whyPlay:
      "Pacific Grove offers the most budget-friendly golf on the Monterey Peninsula — a city-owned municipal course with genuine ocean-adjacent holes, at a fraction of the cost of the peninsula's resort and private courses.",
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
    ],
  },
  seaside: {
    slug: "seaside",
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
    ],
  },
  "pebble-beach-area": {
    slug: "pebble-beach-area",
    name: "Pebble Beach Area",
    heroTitle: "Golf in the Pebble Beach Area",
    speakable:
      "The Pebble Beach Area refers to the Del Monte Forest area of the Monterey Peninsula, home to Pebble Beach Golf Links®, Spyglass Hill Golf Course®, The Links at Spanish Bay®, and Poppy Hills, among others.",
    trustBar: ["4+ courses in the Del Monte Forest", "IAGTO-authorized booking partner", "World-renowned golf address"],
    whyPlay:
      "\"Pebble Beach Area\" here refers to the Del Monte Forest area of the Monterey Peninsula — the geography, not the Pebble Beach Company brand specifically. As an IAGTO-contracted travel partner with Pebble Beach Resorts®, we can book and name Pebble Beach Golf Links®, Spyglass Hill Golf Course®, and The Links at Spanish Bay® directly, alongside Poppy Hills, an NCGA-owned course in the same forest that doesn't carry the resort's gate fee.",
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
    ],
  },
};
