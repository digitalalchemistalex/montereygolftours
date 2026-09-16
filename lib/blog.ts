export type BlogPost = {
  slug: string;
  title: string;
  cardTitle: string;
  cardImage: string;
  category: "Trip Planning" | "Course Guides" | "Best Of";
  datePublished: string;
  dateModified: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  takeaways?: string[];
  internalLinks: { label: string; href: string }[];
  faqs?: { q: string; a: string }[];
};

export const BLOG_POSTS: Record<string, BlogPost> = {
  "best-time-to-play-golf-monterey-peninsula": {
    slug: "best-time-to-play-golf-monterey-peninsula",
    cardTitle: "Best Time to Play",
    cardImage: "/images/pacific-grove-golf-links/hero.jpg",
    title: "Best Time to Play Golf on the Monterey Peninsula",
    category: "Trip Planning",
    datePublished: "2026-06-30",
    dateModified: "2026-06-30",
    intro:
      "The best time to play golf on the Monterey Peninsula is March through May or September through November, when fog is lightest and conditions are most consistent. Summer brings reliable coastal fog in the mornings, and mid-August closes two courses entirely for Car Week.",
    sections: [
      {
        heading: "Why spring and fall are the sweet spot",
        paragraphs: [
          "March through May and September through November consistently bring the Monterey Peninsula's mildest weather and lightest marine layer. You'll still see some morning fog on the coast, but it tends to burn off earlier and more reliably than in peak summer.",
          "These shoulder-season windows also tend to be less crowded than summer, which can mean more flexible tee time availability for groups.",
        ],
      },
      {
        heading: "What summer mornings actually look like",
        paragraphs: [
          "From May through August, coastal courses — Bayonet, Black Horse, and Pacific Grove Golf Links — typically fog in until 9 to 10am. It clears by midday, so the practical move is booking tee times for 9:30am or later if you want clear skies from the first hole.",
          "Carmel Valley courses sit in a different microclimate. Carmel Valley Ranch and Quail Lodge run 15 to 18°F warmer than the coast and often clear earlier in the day, making them a smart choice for an early start any time of year.",
        ],
      },
      {
        heading: "The one week to plan around",
        paragraphs: [
          "Mid-August brings Car Week and the Concours d'Elegance to the peninsula. Bayonet and Black Horse close for several days during the event, and hotel rates spike well above normal across the area. Unless Car Week itself is the draw for your group, we'd steer a golf trip toward a different week.",
        ],
      },
    ],
    takeaways: [
      "March–May and September–November have the lightest fog and mildest conditions",
      "Coastal courses fog in until 9–10am from May through August — book 9:30am+ tee times",
      "Carmel Valley courses run 15–18°F warmer and clear earlier",
      "Avoid mid-August unless Car Week is part of the plan — Bayonet and Black Horse close",
    ],
    internalLinks: [
      { label: "Bayonet course page", href: "/golf-courses/bayonet/" },
      { label: "Carmel Valley destination guide", href: "/destinations/carmel-valley/" },
      { label: "4-day Classic Peninsula itinerary", href: "/itineraries/4-day-monterey-peninsula-golf-trip/" },
    ],
    faqs: [
      { q: "What is the best time of year to play golf in Monterey?", a: "March through May and September through November are the best months. Fog is lightest, mornings clear earlier, and tee time availability is better than peak summer. June through August brings consistent marine layer on coastal courses until 9–10am." },
      { q: "Does it rain a lot during Monterey golf season?", a: "Significant rain is rare from April through October. November through February sees the most rainfall, though many courses stay open. Spring and fall offer the best combination of dry conditions and comfortable temperatures in the low-to-mid 60s." },
      { q: "Is summer a good time to golf in Monterey?", a: "Summer works well if you book tee times for 9:30am or later on coastal courses. Carmel Valley courses — Carmel Valley Ranch and Quail Lodge — run 15–18°F warmer than the coast and clear earlier, making them ideal for early summer tee times." },
    ],
  },
  "how-to-plan-a-group-golf-trip-monterey": {
    slug: "how-to-plan-a-group-golf-trip-monterey",
    cardTitle: "Plan a Group Trip",
    cardImage: "/images/bayonet-golf-course/gallery-1.webp",
    title: "How to Plan a Group Golf Trip to the Monterey Peninsula",
    category: "Trip Planning",
    datePublished: "2026-06-30",
    dateModified: "2026-06-30",
    intro:
      "Planning a group golf trip to the Monterey Peninsula comes down to four decisions: group size, base location, course mix, and trip length. Here's how each one shapes the rest of your plan.",
    sections: [
      {
        heading: "Start with group size",
        paragraphs: [
          "We plan trips for groups of any size — a twosome up to 400 players, with no minimum beyond avoiding a solo trip of one. Smaller groups (4–8) have the most flexibility on tee times and lodging. Larger groups (16+) generally need to book further in advance and may be better suited to a property like the Portola Hotel, which is built for large-group logistics with its connected conference center.",
        ],
      },
      {
        heading: "Pick a base that matches your priorities",
        paragraphs: [
          "Monterey itself is the most central base, putting Del Monte Golf Course®, Laguna Seca, and The Club at Pasadera within easy reach, plus the largest hotel selection on the peninsula. Carmel Valley runs warmer and sunnier, with golf-anchor resorts like Carmel Valley Ranch and Quail Lodge offering on-site courses. Carmel-by-the-Sea works well if your group includes non-golfing partners who want a walkable village.",
        ],
      },
      {
        heading: "Build a course mix that fits your group's ability",
        paragraphs: [
          "Mixed-handicap groups generally do well with Bayonet, Carmel Valley Ranch, and Pacific Grove Golf Links — a range from genuinely challenging to relaxed. Groups chasing a bucket-list trip lean toward Bayonet, Poppy Hills, and the Pebble Beach Resorts® courses. Budget-focused groups get the most value from Pacific Grove, Laguna Seca, and Black Horse.",
          "If your group is mostly beginners or you're traveling with a non-golfing partner, Carmel Valley Ranch and Quail Lodge tend to play more forgiving than Bayonet's championship layout.",
        ],
      },
      {
        heading: "Decide on trip length",
        paragraphs: [
          "A 3-day weekend covers 3 rounds and works well as a quick escape. A 4-day trip is the most-booked option, fitting 4 rounds including a Carmel Valley wine-tasting afternoon. A 5 to 7-day trip lets a group play nearly every course on the peninsula, including a stay split between Monterey and Carmel Valley.",
        ],
      },
    ],
    internalLinks: [
      { label: "Browse all golf courses", href: "/golf-courses/" },
      { label: "Browse all sample itineraries", href: "/itineraries/" },
      { label: "Get a custom quote", href: "/quote/" },
    ],
    faqs: [
      { q: "How far in advance should I book a group golf trip to Monterey?", a: "For peak season (May–October) and Pebble Beach tee times, book 6–18 months in advance. Lodge guests at Pebble Beach can book up to 18 months out. Shoulder season (November–April, excluding holidays) can work with 2–4 months lead time for most courses." },
      { q: "What is the minimum group size for a Monterey golf trip?", a: "Monterey Golf Tours plans trips for groups of 2–400 players with no formal minimum. Groups of 4 get the best tee time efficiency. Groups of 16 or more benefit from dedicated coordination and properties like the Portola Hotel built for large-group logistics." },
      { q: "Do you need to stay at Pebble Beach to play Pebble Beach Golf Links?", a: "Yes. A minimum 3-night stay at a Pebble Beach Resorts® hotel — The Lodge, The Inn at Spanish Bay, or Casa Palmero — is required to book Pebble Beach Golf Links® tee times through an authorized operator like Monterey Golf Tours." },
    ],
  },
  "bayonet-golf-course-guide": {
    slug: "bayonet-golf-course-guide",
    cardTitle: "Bayonet Guide",
    cardImage: "/images/black-horse-golf-course/gallery-2.jpg",
    title: "Bayonet Golf Course: A Complete Guide",
    category: "Course Guides",
    datePublished: "2026-06-30",
    dateModified: "2026-06-30",
    intro:
      "Bayonet is one of the toughest public golf courses in the country — ranked No. 35 nationally on Golf Digest's list of America's toughest courses — built on the grounds of the former Fort Ord military base in Seaside, California.",
    sections: [
      {
        heading: "A military pedigree",
        paragraphs: [
          "Bayonet sits on the former Fort Ord, purchased by the US Army in 1917. General Robert B. McClure, the post's commanding officer, designed the course in 1954. The course's famous \"Combat Corner\" nickname belongs to hole 15, the centerpiece of a demanding stretch running holes 11 through 15. The course takes its name from the 7th Infantry, the \"Bayonet Division.\"",
          "Fort Ord was decommissioned in the 1990s, and Bayonet opened to public play on January 16, 1997. A 2007 redesign by Gene Bates refreshed the layout while preserving its demanding character.",
        ],
      },
      {
        heading: "What to expect on the course",
        paragraphs: [
          "At 7,024 yards from the back tees, with a course rating of 74.8 and a slope of 139, Bayonet is built for serious and scratch-to-mid-handicap players. High-handicap beginners may find it punishing — it's not the course for a relaxed first round on the peninsula.",
          "The course has hosted PGA Tour qualifiers and players including Billy Andrade, Arnold Palmer, Jack Nicklaus, and Tom Watson, and a Nationwide Tour event, the Monterey Peninsula Classic, ran here from 2000 to 2003.",
        ],
      },
      {
        heading: "Planning a round",
        paragraphs: [
          "Bayonet shares its facility with Black Horse, its sister course — a natural two-round pairing for a multi-day trip. Green fees vary seasonally — contact us for current rates. One scheduling note: Bayonet and Black Horse close for several days in mid-August during Car Week and the Concours d'Elegance.",
        ],
      },
    ],
    internalLinks: [
      { label: "Full Bayonet course page", href: "/golf-courses/bayonet/" },
      { label: "Black Horse course page", href: "/golf-courses/black-horse/" },
      { label: "Seaside destination guide", href: "/destinations/seaside/" },
    ],
    faqs: [
      { q: "How difficult is Bayonet Golf Course?", a: "Bayonet plays to a course rating of 75.1 and slope of 141 from the back tees, making it one of the toughest public courses in California. Its military-heritage design features tight tree-lined fairways, small bentgrass greens, and significant elevation changes. Most groups play the middle or forward tees." },
      { q: "How much does it cost to play Bayonet Golf Course?", a: "Green fees at Bayonet vary by season and time, typically ranging from $100 to $160 per round. Monterey Golf Tours can incorporate Bayonet into a multi-course package with coordinated tee times and transfers." },
      { q: "Is Bayonet Golf Course worth playing?", a: "Yes — Bayonet is consistently ranked among the best public courses in California and is a favorite among serious golfers visiting the Monterey Peninsula. Its military history, challenging layout, and Monterey Bay views make it a strong choice for any multi-course itinerary." },
    ],
  },
  "best-golf-courses-monterey-peninsula": {
    slug: "best-golf-courses-monterey-peninsula",
    cardTitle: "Best Courses",
    cardImage: "/images/courses/gallery/pebble-beach-hole-9.jpg",
    title: "Best Golf Courses on the Monterey Peninsula in 2026",
    category: "Best Of",
    datePublished: "2026-06-30",
    dateModified: "2026-06-30",
    intro:
      "The Monterey Peninsula offers 14 courses bookable through Monterey Golf Tours, from the world-renowned Pebble Beach Golf Links® to accessible municipal rounds. Here's how to think about choosing among them.",
    sections: [
      {
        heading: "For a bucket-list round",
        paragraphs: [
          "Pebble Beach Golf Links® needs no introduction — designed by Jack Neville and Douglas Grant in 1919, it remains the most recognized golf course in the country. Spyglass Hill Golf Course®, a Robert Trent Jones Sr. design, is widely regarded as the toughest of the Pebble Beach Resorts® courses, with a 75.4 rating and 145 slope from the championship tees. Bayonet, ranked No. 35 nationally by Golf Digest among toughest public courses, rounds out the list for groups chasing a genuine championship test.",
        ],
      },
      {
        heading: "For value without sacrificing quality",
        paragraphs: [
          "Poppy Hills Golf Course sits in the same Del Monte Forest as the Pebble Beach Resorts® courses, but is owned by the Northern California Golf Association and doesn't carry the resort's gate fee. Pacific Grove Golf Links offers genuine ocean-adjacent holes at municipal pricing — among the most accessible green fees on the peninsula. Laguna Seca Golf Ranch is a reliable, budget-friendly daily-fee round close to downtown Monterey.",
        ],
      },
      {
        heading: "For warm weather and resort amenities",
        paragraphs: [
          "Carmel Valley Ranch — the only Pete Dye design in Northern California — and Quail Lodge & Golf Club both sit inland in Carmel Valley's warmer microclimate, typically clearing of fog earlier than the coast. Both are golf-anchor resorts, meaning the course is on-site at the hotel.",
        ],
      },
      {
        heading: "For golf history",
        paragraphs: [
          "Pasatiempo Golf Course, in nearby Santa Cruz, was designed by Alister MacKenzie in 1929 — he considered it his finest work and lived alongside the 6th fairway until his death in 1934. A 2024 restoration returned the course closely to its original design.",
        ],
      },
    ],
    takeaways: [
      "Bucket-list: Pebble Beach Golf Links®, Spyglass Hill®, Bayonet",
      "Best value: Poppy Hills, Pacific Grove, Laguna Seca",
      "Warm-weather resort golf: Carmel Valley Ranch, Quail Lodge",
      "Golf history: Pasatiempo, Alister MacKenzie's home course",
    ],
    internalLinks: [
      { label: "Browse all 14 courses", href: "/golf-courses/" },
      { label: "Pebble Beach area destination guide", href: "/destinations/pebble-beach-area/" },
      { label: "7-day Ultimate Monterey itinerary", href: "/itineraries/7-day-ultimate-monterey-golf-trip/" },
    ],
    faqs: [
      { q: "What are the top golf courses on the Monterey Peninsula?", a: "The top courses are Pebble Beach Golf Links® (world-ranked), Spyglass Hill™ Golf Course (tree-lined and coastal mix), Bayonet (championship public), Pacific Grove Golf Links (coastal municipal), and Carmel Valley Ranch (fog-free inland). Monterey Golf Tours can book all 14 courses on the peninsula." },
      { q: "Which Monterey Peninsula golf course is best for a bucket-list round?", a: "Pebble Beach Golf Links® is the definitive bucket-list round — consistently ranked in the world's top 10 public courses, host to six US Opens, and featuring the iconic cliffside 7th and 18th holes. A 3-night stay at a Pebble Beach Resorts® hotel is required to book tee times." },
      { q: "Can you play Spyglass Hill without staying at Pebble Beach?", a: "Spyglass Hill™ Golf Course is a Pebble Beach Resorts® course, so tee times are booked through the resort. While a hotel stay requirement is less strict than Pebble Beach Golf Links®, booking through an IAGTO operator like Monterey Golf Tours provides access at IAGTO rates." },
    ],
  },
  "monterey-golf-trip-on-a-budget": {
    slug: "monterey-golf-trip-on-a-budget",
    cardTitle: "Budget Golf Trip",
    cardImage: "/images/laguna-seca-golf-ranch/gallery-1.jpg",
    title: "How to Plan an Affordable Monterey Golf Trip",
    category: "Trip Planning",
    datePublished: "2026-06-30",
    dateModified: "2026-06-30",
    intro:
      "A budget-conscious Monterey golf trip is genuinely possible — a 3-day, 3-round trip built around the peninsula's most accessible courses varies by hotel and course selection — contact us for a custom quote.",
    sections: [
      {
        heading: "Choosing value courses without sacrificing quality",
        paragraphs: [
          "Pacific Grove Golf Links offers real ocean-adjacent holes at municipal pricing — among the lowest green fees on the peninsula. Laguna Seca Golf Ranch is a reliable, accessible daily-fee round close to downtown Monterey. Black Horse, Bayonet's sister course at the former Fort Ord, plays more affordably than Bayonet while still offering a genuinely good test.",
        ],
      },
      {
        heading: "Choosing value lodging",
        paragraphs: [
          "Casa Munras Garden Hotel & Spa, Monterey's first hotel dating to 1824, and the Portola Hotel & Spa, which doesn't charge a resort fee on direct bookings, are both strong value options in downtown Monterey without giving up real character or quality.",
        ],
      },
      {
        heading: "Other ways to control cost",
        paragraphs: [
          "Avoiding peak summer and mid-August (Car Week) helps on both green fees and hotel rates, which spike during that event. Booking 3 rounds rather than 5 or more keeps the trip tighter, and choosing a hotel without a resort fee — like the Portola — avoids an extra line item that adds up across a multi-night stay.",
        ],
      },
    ],
    internalLinks: [
      { label: "Best Value itinerary", href: "/itineraries/monterey-golf-trip-best-value/" },
      { label: "Pacific Grove course page", href: "/golf-courses/pacific-grove-golf-links/" },
      { label: "Casa Munras hotel page", href: "/hotels/casa-munras/" },
    ],
    faqs: [
      { q: "What is the cheapest golf course on the Monterey Peninsula?", a: "Pacific Grove Golf Links is the most affordable option at $50–$75 per round, offering genuine coastal links golf at municipal pricing. Del Monte™ Golf Course is next at $90–$120 and is the oldest continuously operating golf course west of the Mississippi." },
      { q: "Can you do a Monterey golf trip without playing Pebble Beach?", a: "Absolutely. Bayonet, Black Horse, Pacific Grove Golf Links, Laguna Seca, and Poppy Hills are all world-class courses at a fraction of the Pebble Beach price. A 3-day trip playing these courses can be excellent value while still delivering a true Monterey Peninsula golf experience." },
      { q: "What is the best value Monterey golf itinerary?", a: "A 3-day best-value itinerary typically combines Bayonet or Black Horse (championship quality), Pacific Grove Golf Links (coastal links experience), and Poppy Hills or Laguna Seca (solid club golf). Total green fees run $250–$400 per person versus $1,000+ for a Pebble Beach package." },
    ],
  },
  "pacific-grove-golf-links-guide": {
    slug: "pacific-grove-golf-links-guide",
    cardTitle: "Pacific Grove Guide",
    cardImage: "/images/pacific-grove-golf-links/hero.jpg",
    title: "Pacific Grove Golf Links: The Monterey Peninsula\'s Hidden Municipal Gem",
    category: "Course Guides",
    datePublished: "2026-07-05",
    dateModified: "2026-07-05",
    intro:
      "Pacific Grove Golf Links sits at the edge of the Pacific on the Monterey Peninsula and plays among some of the most dramatic coastal scenery in California — at municipal course pricing. The back nine runs directly along Monterey Bay, making it a genuine bucket-list experience at a fraction of the resort rates nearby.",
    sections: [
      {
        heading: "What makes Pacific Grove different",
        paragraphs: [
          "Pacific Grove Golf Links is a municipally owned course, which means the City of Pacific Grove operates it and green fees stay far below what you\'d pay at the private resorts a few miles away. That accessibility is the course\'s defining characteristic: the same peninsula views, the same coastal wind, the same wildlife — but priced for a daily-fee round rather than a resort experience.",
          "The front nine plays through a residential area and is pleasant but unremarkable. The back nine is the reason to come. Holes 10 through 18 run directly along the coastline, with Monterey Bay on your right and the Del Monte Forest pines behind you. The sea otters, harbor seals, and shorebirds along the rocks are an unavoidable part of the round.",
        ],
      },
      {
        heading: "How the course plays",
        paragraphs: [
          "At 5,727 yards from the tips and par 70, Pacific Grove is not a long or difficult course by modern championship standards. The challenge comes from the wind, which picks up on the back nine and can make club selection genuinely difficult. What plays as a 7-iron in still air might need a 4-iron into a stiff headwind off the bay.",
          "The greens are generally straightforward but firm, particularly in summer when the coastal air dries them out. The course is walkable — flat enough throughout that a cart is entirely optional.",
        ],
      },
      {
        heading: "Best fit and when to go",
        paragraphs: [
          "Pacific Grove is a natural fit for a first round on a multi-day Monterey trip — accessible, affordable, and genuinely memorable without spending the biggest green fee of the trip on day one. It also pairs naturally with Poppy Hills, which is a short drive away and shares the same accessible-but-quality positioning.",
          "Morning tee times at Pacific Grove can bring heavy coastal fog in summer. The back nine in the afternoon, when fog has burned off and the light is on the water, is the ideal experience. Spring and fall tend to give the clearest morning rounds.",
        ],
      },
    ],
    takeaways: [
      "Back nine runs directly along Monterey Bay — among the best coastal golf in California",
      "Municipal pricing makes it the most accessible course on the peninsula",
      "5,727 yards, par 70 — manageable for all skill levels",
      "Wind is the main challenge, especially on the back nine",
      "Pairs naturally with Poppy Hills or Laguna Seca as a first round on a multi-day trip",
    ],
    internalLinks: [
      { label: "Pacific Grove course page", href: "/golf-courses/pacific-grove-golf-links/" },
      { label: "Poppy Hills course page", href: "/golf-courses/poppy-hills/" },
      { label: "Best Value itinerary", href: "/itineraries/monterey-golf-trip-best-value/" },
    ],
    faqs: [
      { q: "How much does Pacific Grove Golf Links cost to play?", a: "Pacific Grove Golf Links charges $50–$75 per round for non-residents, making it the most affordable coastal links experience on the Monterey Peninsula. Weekend rates are slightly higher. Twilight rates are available after 2pm." },
      { q: "Is Pacific Grove Golf Links worth playing?", a: "Yes — Pacific Grove is one of the best-value golf experiences in California. The back nine runs along the Pacific Ocean cliffs with views of Point Pinos Lighthouse and Lovers Point. Conditions are links-style with firm, fast turf and consistent wind." },
      { q: "Is Pacific Grove Golf Links a municipal course?", a: "Yes. Pacific Grove Golf Links is owned and operated by the City of Pacific Grove, which keeps green fees accessible to locals and visitors alike. It is managed professionally and maintains conditions comparable to private clubs at a fraction of the cost." },
    ],
  },

  "carmel-valley-ranch-golf-guide": {
    slug: "carmel-valley-ranch-golf-guide",
    cardTitle: "Carmel Valley Ranch Guide",
    cardImage: "/images/carmel-valley-ranch/golf-1.webp",
    title: "Carmel Valley Ranch Golf: The Fog-Free Alternative on the Monterey Peninsula",
    category: "Course Guides",
    datePublished: "2026-07-05",
    dateModified: "2026-07-05",
    intro:
      "Carmel Valley Ranch Golf Course sits 12 miles inland from the coast, which means it operates in a microclimate almost entirely different from the coastal courses. While Pacific Grove and Bayonet are still burning off morning fog, Carmel Valley is already warm and clear — making it the most reliable early-tee-time option on the peninsula.",
    sections: [
      {
        heading: "The inland advantage",
        paragraphs: [
          "The Monterey Peninsula\'s famous marine layer is a coastal phenomenon. It forms over the cold waters of Monterey Bay and moves inland overnight, sitting heaviest in the morning. At coastal courses like Pacific Grove Golf Links or Bayonet, a 7am tee time in summer may start in thick fog that doesn\'t burn off until 10 or 11am. Monterey Golf Tours builds budget-conscious Monterey golf packages using exactly this approach — scheduling coastal rounds after the fog clears and valley courses on the warmer days.",
          "Carmel Valley Ranch is east of the Santa Lucia range foothills and out of the marine layer\'s primary path. By the time the sun clears the hills, the valley is already warming. Groups that want to tee off early and play in sun from the first hole should put Carmel Valley first on their itinerary.",
        ],
      },
      {
        heading: "The course: Pete Dye design on hillside terrain",
        paragraphs: [
          "The original layout at Carmel Valley Ranch was designed by Pete Dye and opened in the 1980s. Gene Bates completed a significant redesign, and the current course plays to 6,117 yards at par 70. Dye\'s fingerprints are still visible — elevated tees, steep drop-offs on several holes, and the architectural use of the terrain to create distance anxiety even on shorter yardages.",
          "The course is hilly, which makes it a genuine physical workout if you walk. The fairways are generous by Dye standards, but the greens and their surroundings demand precise short game. Views of the valley and surrounding hills throughout the round are some of the best scenery on any course in the region.",
        ],
      },
      {
        heading: "Fitting Carmel Valley into a Monterey trip",
        paragraphs: [
          "Carmel Valley Ranch works best on day one of a multi-day Monterey trip, played in the morning when coastal courses are still fogged in. It then serves as a contrast round alongside coastal courses like Pacific Grove or Bayonet — the warmth, the inland terrain, and the quieter setting are meaningfully different from what you\'ll experience on the coast.",
          "The resort at Carmel Valley Ranch is also a strong lodging option for groups that want to stay outside the Monterey city center. The property has a valley setting that feels genuinely remote despite being 25 minutes from downtown Monterey.",
        ],
      },
    ],
    takeaways: [
      "Inland location means fog-free mornings when coastal courses are still socked in",
      "Pete Dye original design with Gene Bates redesign — 6,117 yards, par 70",
      "Hilly terrain: genuine workout if walking, with valley views throughout",
      "Strong pick for day 1 of a multi-day itinerary",
      "Resort lodging on-site for groups wanting to stay in the valley",
    ],
    internalLinks: [
      { label: "Carmel Valley Ranch course page", href: "/golf-courses/carmel-valley-ranch/" },
      { label: "Carmel Valley hotel page", href: "/hotels/carmel-valley-ranch/" },
      { label: "Carmel Valley Golf Getaway itinerary", href: "/itineraries/carmel-valley-golf-getaway/" },
    ],
    faqs: [
      { q: "Is Carmel Valley Ranch golf foggy in the mornings?", a: "No — Carmel Valley sits in an inland microclimate that runs 15–18°F warmer than the coast and is typically clear of fog by early morning. This makes Carmel Valley Ranch one of the best choices for early tee times any time of year, especially during summer when coastal courses are socked in until 9–10am." },
      { q: "Is Carmel Valley Ranch Golf Course open to the public?", a: "Carmel Valley Ranch Golf Course is a resort course primarily for hotel guests. Monterey Golf Tours can incorporate it into packages that include a stay at the Carmel Valley Ranch resort, which features 500-acre grounds, a spa, and a winery." },
      { q: "How does Carmel Valley Ranch compare to Pebble Beach?", a: "Carmel Valley Ranch is a Pete Dye design rated 71.2 with rolling terrain, valley views, and a resort atmosphere. Pebble Beach Golf Links® is a world-ranked oceanfront course with significantly higher green fees and a hotel stay requirement. Many groups pair both for a contrast of inland resort golf and coastal championship golf." },
    ],
  },

  "monterey-car-week-golf-guide": {
    slug: "monterey-car-week-golf-guide",
    cardTitle: "Golf During Car Week",
    cardImage: "/images/black-horse-golf-course/gallery-2.jpg",
    title: "Playing Golf During Monterey Car Week: What to Know Before You Book",
    category: "Trip Planning",
    datePublished: "2026-07-05",
    dateModified: "2026-07-05",
    intro:
      "Monterey Car Week takes place in mid-August and draws hundreds of thousands of visitors to the peninsula for the Concours d\'Elegance and related events. It\'s the busiest week of the year for hotels and restaurants — but it also closes Bayonet and Black Horse, two of the region\'s best courses, for several days. Here\'s what to plan around.",
    sections: [
      {
        heading: "What Car Week actually closes",
        paragraphs: [
          "Bayonet Golf Course and Black Horse Golf Course, both operated at the former Fort Ord site in Seaside, close for several days during Car Week each August for use as event parking and support infrastructure. The specific closure dates vary slightly by year, but the courses are typically unavailable for a portion of the week surrounding the Concours d\'Elegance weekend.",
          "No other Monterey Peninsula courses close during Car Week. Pacific Grove Golf Links, Poppy Hills, Laguna Seca Golf Ranch, Carmel Valley Ranch, Quail Lodge, and all Pebble Beach Resorts courses remain open. If Bayonet and Black Horse aren\'t in your itinerary, Car Week doesn\'t affect your golf schedule.",
        ],
      },
      {
        heading: "Hotel and restaurant pressure",
        paragraphs: [
          "The bigger impact of Car Week for golf groups is on accommodation. Hotels across the peninsula — particularly in Monterey, Carmel, and Pacific Grove — fill months in advance for Car Week, and rates spike significantly. If you\'re planning a golf trip that overlaps with Car Week, book lodging as early as possible or expect to pay a substantial premium.",
          "Restaurant reservations also become difficult during peak Car Week evenings, particularly on the Concours weekend (typically the third weekend of August). Groups that prefer flexible dining without reservations will find the experience more crowded and slower than a typical August weekend.",
        ],
      },
      {
        heading: "If you want to see the cars and play golf",
        paragraphs: [
          "Car Week is genuinely spectacular if classic cars and historic motorsport are part of your interests. The Concours d\'Elegance itself takes place on the 18th fairway of Pebble Beach Golf Links — so the course is closed that Sunday morning for setup and the event itself. The Quail: A Motorsports Gathering, held in Carmel Valley, is another major event worth planning around.",
          "The most efficient Car Week golf trip structure: book 3-4 days early in the week (Monday-Wednesday) when events are lighter, play your coastal rounds first, and then catch one or two events before the weekend peaks. Avoid planning rounds at Bayonet or Black Horse during this window.",
        ],
      },
    ],
    takeaways: [
      "Bayonet and Black Horse close for several days during mid-August Car Week  Monterey Golf Tours builds Carmel Valley golf packages around the ranch for groups who want a warm base with an on-site course and day trips to the peninsula.",
      "All other peninsula courses remain open during Car Week",
      "Hotel rates spike significantly — book as early as possible",
      "Pebble Beach Golf Links closes on Concours d\'Elegance Sunday",
      "Early-week (Mon-Wed) is the most manageable time to visit and play",
    ],
    internalLinks: [
      { label: "Bayonet course page", href: "/golf-courses/bayonet/" },
      { label: "Black Horse course page", href: "/golf-courses/black-horse/" },
      { label: "Best time to play guide", href: "/blog/best-time-to-play-golf-monterey-peninsula/" },
    ],
    faqs: [
      { q: "Can you still golf during Monterey Car Week?", a: "Yes, but with important caveats. The Hay™ and Poppy Hills close during Car Week (mid-August). Pebble Beach Golf Links® and Spyglass Hill™ remain open but tee times are limited and prices are elevated. Carmel Valley courses — Carmel Valley Ranch and Quail Lodge — are a smart Car Week alternative as they are less affected by the Pebble Beach Concours traffic." },
      { q: "When is Monterey Car Week 2026?", a: "Monterey Car Week 2026 runs August 8–17, with the Pebble Beach Concours d'Elegance on Sunday August 16. Tee times at Pebble Beach Resort courses sell out months in advance for this window." },
      { q: "What courses are closed during Monterey Car Week?", a: "The Hay™ and Poppy Hills Golf Course typically close during Car Week to accommodate the Concours and related events on the Pebble Beach Resorts® grounds. All other courses on the peninsula remain open, though Pebble Beach Golf Links® and Spyglass Hill™ tee times are very limited." },
    ],
  },

  "poppy-hills-golf-course-guide": {
    slug: "poppy-hills-golf-course-guide",
    cardTitle: "Poppy Hills Guide",
    cardImage: "/images/poppy-hills/gallery-1.webp",
    title: "Poppy Hills Golf Course Guide: Championship Bentgrass in the Del Monte Forest",
    category: "Course Guides",
    datePublished: "2026-07-05",
    dateModified: "2026-07-05",
    intro:
      "Poppy Hills Golf Course occupies the same Del Monte Forest zip code as Pebble Beach Golf Links and Spyglass Hill — but as an NCGA-owned daily-fee course, it carries none of the Pebble Beach Resorts gate fee. The result is championship bentgrass conditioning and genuine Pebble Beach area scenery at a daily-fee price.",
    sections: [
      {
        heading: "What NCGA ownership means for you",
        paragraphs: [
          "Poppy Hills is owned and operated by the Northern California Golf Association, not Pebble Beach Company. This distinction matters for pricing: the course isn\'t subject to Pebble Beach Resorts\'s fee structure, and green fees reflect daily-fee rather than resort rates. Conditioning at NCGA courses is consistently held to a high standard — bentgrass greens throughout, well-maintained fairways, and the same kind of championship-ready setup the association uses when hosting events.",
          "The course hosted the AT&T Pebble Beach National Pro-Am from 1991 through 2009 alongside Pebble Beach Golf Links and Spyglass Hill, which gives you a reference point for the caliber of golf it can deliver.",
        ],
      },
      {
        heading: "The course: Robert Trent Jones II through the pines",
        paragraphs: [
          "Robert Trent Jones II designed Poppy Hills, which opened in 1986. The layout moves through the Monterey pines and cypresses of Del Monte Forest, with relatively little coastal exposure — the feel is more forest golf than links golf, which distinguishes it from Pacific Grove or the Pebble Beach oceanside holes.",
          "At 7,091 yards from the tips at par 71, Poppy Hills plays long by any measure. The course has significant bunkering and elevation changes throughout. The bentgrass greens are consistently fast and firm — similar to what you\'d encounter at a top private club.",
        ],
      },
      {
        heading: "Where it fits in a Monterey golf trip",
        paragraphs: [
          "Poppy Hills is a natural pairing with Pacific Grove Golf Links — one inland/forested, one coastal — for a two-round day if you\'re in the Del Monte Forest area. It also anchors the 3-Day Monterey Golf Weekend itinerary as the primary course of the trip.",
          "For groups that want Pebble Beach-area prestige without Pebble Beach Resorts pricing, Poppy Hills delivers the setting, the conditioning, and the difficulty. It\'s not a consolation course; it\'s a destination course that happens to be priced as a daily fee.",
        ],
      },
    ],
    takeaways: [
      "NCGA-owned — championship conditioning without Pebble Beach Resorts fee",
      "Robert Trent Jones II design, 7,091 yards, par 71",
      "Del Monte Forest setting: pines and cypresses, not coastal exposure  Monterey Golf Tours can build a Car Week golf package that schedules Poppy Hills during the closure window.",
      "Former AT&T Pebble Beach Pro-Am host course (1991–2009)",
      "Natural pairing with Pacific Grove Golf Links for a two-round day",
    ],
    internalLinks: [
      { label: "Poppy Hills course page", href: "/golf-courses/poppy-hills/" },
      { label: "3-Day Weekend itinerary", href: "/itineraries/3-day-monterey-golf-weekend/" },
      { label: "Pacific Grove course guide", href: "/blog/pacific-grove-golf-links-guide/" },
    ],
    faqs: [
      { q: "Is Poppy Hills Golf Course good?", a: "Yes — Poppy Hills is an NCGA (Northern California Golf Association) facility with bentgrass fairways and greens, which is rare on the Monterey Peninsula. It plays through the Del Monte Forest with tight tree-lined holes and is notably well-maintained. It was a longtime AT&T Pebble Beach Pro-Am venue." },
      { q: "How much does Poppy Hills cost to play?", a: "Poppy Hills green fees typically run $100–$130 per round for non-NCGA members. NCGA members receive discounted rates. It offers strong value as one of the better-conditioned public courses on the peninsula at a mid-range price point." },
      { q: "Is Poppy Hills open to the public?", a: "Yes. Poppy Hills is open to the public, though NCGA members receive priority tee times and discounted rates. Non-members can book tee times directly or through Monterey Golf Tours as part of a multi-course peninsula package." },
    ],
  },

  "monterey-golf-first-time-guide": {
    slug: "monterey-golf-first-time-guide",
    cardTitle: "First-Timer\'s Guide",
    cardImage: "/images/pbc-portal/thehay_2021_aerial.jpg",
    title: "First-Time Monterey Golf Trip: How to Plan a Solid Three Days",
    category: "Trip Planning",
    datePublished: "2026-07-05",
    dateModified: "2026-07-05",
    intro:
      "A first Monterey Peninsula golf trip can become overwhelming quickly — 14 courses across a relatively compact area, with prices and access ranging from municipal to resort. This guide gives you a clear framework: which courses to prioritize, which to skip until your second trip, and how to structure three days so you see the peninsula properly without burning out.",
    sections: [
      {
        heading: "The honest course priority list",
        paragraphs: [
          "For a first trip, focus on three types of experiences: one coastal municipal round, one forested championship round, and one inland valley round. Pacific Grove Golf Links covers the coastal municipal slot — real ocean holes at accessible pricing. Poppy Hills covers the forested championship slot — Del Monte Forest, bentgrass greens, former Pro-Am host. Carmel Valley Ranch covers the inland valley slot — fog-free mornings, Pete Dye terrain, a genuinely different feel from the coast.",
          "These three courses give you the full breadth of what the peninsula offers without the resort gate fees. On a second trip, you add Bayonet for the championship public-access experience, and then start building toward the Pebble Beach Resorts courses when you\'re ready to commit the budget.",
        ],
      },
      {
        heading: "A working three-day structure",
        paragraphs: [
          "Day 1: Carmel Valley Ranch, morning tee time. The inland location means no fog, warm start, and a genuine introduction to the terrain. Check into your hotel afterward — downtown Monterey or Pacific Grove are good bases.",
          "Day 2: Pacific Grove Golf Links, mid-morning after fog clears. Walk it if you can — the back nine along Monterey Bay is the reason to come and is best experienced on foot. Afternoon is free for Cannery Row, the aquarium, or 17-Mile Drive.",
          "Day 3: Poppy Hills. This is the longest and most demanding of the three rounds — save it for when your legs are fresh after a lighter Day 2.",
        ],
      },
      {
        heading: "The two mistakes first-timers make",
        paragraphs: [
          "The first mistake is booking three back-to-back championship courses on consecutive days. Championship golf is physically demanding, and doing it three times in a row — especially walking — leads to fatigue on Day 3 that degrades both the experience and the scores. Mixing course difficulty and terrain type keeps energy levels up throughout.",
          "The second mistake is overloading the morning tee times at coastal courses in summer. Book coastal rounds for late morning (9-10am) to give the fog time to clear. Book inland rounds for early morning when coastal courses are still socked in. The fog schedule is free information — use it to your advantage.",
        ],
      },
    ],
    takeaways: [
      "Pacific Grove, Poppy Hills, Carmel Valley Ranch cover the full range of peninsula golf without resort pricing",
      "Inland-first on Day 1 lets you avoid coastal fog on your opening round",
      "Save Poppy Hills for Day 3 — it\'s the longest and most demanding",
      "Mid-morning tee times at coastal courses avoid the marine layer",
      "Bayonet and Pebble Beach Resorts courses are logical additions on a second trip . Monterey Golf Tours builds first-time Monterey golf packages around exactly this structure — contact us for a custom quote.",
    ],
    internalLinks: [
      { label: "3-Day Weekend itinerary", href: "/itineraries/3-day-monterey-golf-weekend/" },
      { label: "Best time to play", href: "/blog/best-time-to-play-golf-monterey-peninsula/" },
      { label: "Pacific Grove guide", href: "/blog/pacific-grove-golf-links-guide/" },
    ],
    faqs: [
      { q: "What should I play on my first Monterey golf trip?", a: "For a first visit, the 3-day combination most guides recommend is Pebble Beach Golf Links® (bucket list), Bayonet (best-value championship), and Pacific Grove Golf Links (coastal links at municipal pricing). This covers the full spectrum of what the peninsula offers. Monterey Golf Tours' 3-day Weekend itinerary is built around this logic." },
      { q: "Where should I stay for a Monterey golf trip?", a: "For a Pebble Beach Golf Links® round, a 3-night stay at The Lodge, The Inn at Spanish Bay, or Casa Palmero is required. For non-Pebble Beach trips, the Portola Hotel and Hyatt Regency Monterey are popular group bases in downtown Monterey with easy access to all peninsula courses." },
      { q: "How many rounds can you play in 3 days in Monterey?", a: "Most groups play 3 rounds in 3 days — one per day. Ambitious golfers sometimes play 36 holes in a day, but peninsula courses are walking-friendly and 18 holes typically takes 4–4.5 hours. Monterey Golf Tours coordinates tee times to avoid early fog on coastal courses." },
    ],
  },

  "links-at-spanish-bay-reopening-2027": {
    slug: "links-at-spanish-bay-reopening-2027",
    cardTitle: "Spanish Bay Reopens 2027",
    cardImage: "/images/pbc-portal/pb_spanishbay_clubhouse_entrance.jpg",
    title: "The Links at Spanish Bay® Reopening April 2027: What to Expect and How to Book",
    category: "Trip Planning",
    datePublished: "2026-09-16",
    dateModified: "2026-09-16",
    intro:
      "The Links at Spanish Bay® closed in late 2024 for a full Gil Hanse-led renovation and reopens April 17, 2027. Here is what the renovation involves, what the reopened course will play like, and how to secure a tee time through Monterey Golf Tours as an IAGTO-authorized Pebble Beach Resorts® operator.",
    sections: [
      {
        heading: "Why The Links at Spanish Bay® is closed",
        paragraphs: [
          "Pebble Beach Company engaged Gil Hanse — the architect behind the 2016 Olympic Golf Course in Rio and the restoration of Merion East — to undertake a full redesign of the course. The project began in late 2024 and is the most significant work done to Spanish Bay since it opened in 1987.",
          "The original course was designed by Robert Trent Jones Jr., Tom Watson, and Sandy Tatum in the Scottish links tradition, routing through the dunes and coastal scrub of the Del Monte Forest. The Hanse renovation is expected to sharpen that links character — firmer, faster, more exposed to the wind off Stillwater Cove.",
        ],
      },
      {
        heading: "What the reopened course is expected to play like",
        paragraphs: [
          "Gil Hanse’s approach favors restoring natural ground conditions over managed irrigation. Expect firmer fairways, more pronounced dune contours, and tighter rough edges than the pre-renovation layout. The course’s par and overall yardage have not been publicly confirmed for the new design.",
          "Spanish Bay has always been the most links-style of the Pebble Beach Resorts® courses — wind exposure is constant, bounce and roll matter, and the back nine toward the Pacific is genuinely exposed. The renovation appears to lean further into that character rather than softening it.",
          "As of September 2026 no official course photos or yardage cards for the redesigned layout have been released by Pebble Beach Company.",
        ],
      },
      {
        heading: "The reopening date and waitlist",
        paragraphs: [
          "Pebble Beach Resorts® has confirmed the reopening date as April 17, 2027. Monterey Golf Tours is collecting waitlist interest now for groups who want to be among the first to play the renovated course. Waitlist members will be contacted once tee time availability opens for post-April 17 dates.",
          "Demand for Spanish Bay tee times will be elevated in the months following reopening, particularly for groups that want to combine it with Pebble Beach Golf Links® and Spyglass Hill™ in the same trip. Booking as early as possible is advisable for peak-season dates — May through October 2027.",
        ],
      },
      {
        heading: "How to book Spanish Bay through Monterey Golf Tours",
        paragraphs: [
          "As an IAGTO-contracted Authorized Pebble Beach Resorts® Golf Travel Operator, Monterey Golf Tours books tee times at The Links at Spanish Bay® directly through official channels at IAGTO rates. We can combine Spanish Bay with The Inn at Spanish Bay™ lodging — where guests have complimentary daily access to the Spanish Bay Club™ — and coordinate all other courses and hotels on the peninsula in the same package.",
          "If your group wants a full Pebble Beach Resorts® rotation post-reopening — Pebble Beach Golf Links®, Spyglass Hill™, Spanish Bay, and Del Monte™ — that is a natural 4- to 5-day itinerary we can build around your dates and group size. Submit a quote request or join the waitlist and we will follow up as availability opens.",
        ],
      },
      {
        heading: "Planning around Spanish Bay in your Monterey trip",
        paragraphs: [
          "While Spanish Bay is closed, groups building Pebble Beach Resorts® rotations have been substituting Poppy Hills (same zip code as PBGL, no gate fee) or Pasatiempo in Santa Cruz as a fourth or fifth round. Both are strong options that remain available year-round.",
          "For groups staying at The Inn at Spanish Bay™ before April 17, 2027: the Inn is open and fully operational. Guests still have access to the Spanish Bay Club™, the nightly bagpiper at the fire pits, and all dining. Only the course itself is unavailable until reopening.",
        ],
      },
    ],
    takeaways: [
      "The Links at Spanish Bay® reopens April 17, 2027 after a Gil Hanse-led renovation",
      "Monterey Golf Tours is collecting waitlist interest now for post-April 17 tee times",
      "IAGTO-authorized booking available through Monterey Golf Tours as an official PBR operator",
      "The Inn at Spanish Bay™ remains open and fully operational during the renovation",
      "Book 2027 spring/summer dates early — demand will be elevated immediately after reopening",
    ],
    internalLinks: [
      { label: "The Links at Spanish Bay® course page", href: "/golf-courses/links-at-spanish-bay/" },
      { label: "The Inn at Spanish Bay™ hotel page", href: "/hotels/inn-at-spanish-bay/" },
      { label: "Pebble Beach golf packages", href: "/pebble-beach/" },
      { label: "The Pebble Pilgrimage — 4-day itinerary", href: "/itineraries/pebble-beach-golf-package/" },
    ],
    faqs: [
      { q: "When does The Links at Spanish Bay® reopen?", a: "The Links at Spanish Bay® is scheduled to reopen April 17, 2027, following a full renovation led by architect Gil Hanse. Monterey Golf Tours is collecting waitlist interest for groups who want early tee times after the reopening." },
      { q: "Who designed the Spanish Bay renovation?", a: "Gil Hanse, the architect behind the 2016 Olympic Golf Course in Rio and the restoration of Merion East, is leading the redesign. Pebble Beach Company has not released full details of the scope, but the renovation involves a comprehensive reworking of the layout." },
      { q: "Can I still stay at The Inn at Spanish Bay™ while the course is closed?", a: "Yes. The Inn at Spanish Bay™ is open and fully operational during the renovation. Guests retain access to the Spanish Bay Club™, all dining venues including STAVE Wine Cellar at Spanish Bay™ and Peppoli at Pebble Beach™, and the nightly bagpiper at the outdoor fire pits." },
      { q: "How do I book Spanish Bay tee times through Monterey Golf Tours?", a: "Monterey Golf Tours is an IAGTO-contracted Authorized Pebble Beach Resorts® Golf Travel Operator with direct booking access to Spanish Bay tee times. Submit a quote request or join the waitlist. We will contact waitlist members as tee time availability opens for post-April 17, 2027 dates." },
    ],
  },
  "2027-us-open-pebble-beach-golf-trip": {
    slug: "2027-us-open-pebble-beach-golf-trip",
    cardTitle: "2027 US Open at Pebble Beach",
    cardImage: "/images/pbc-portal/pbgl_18_2019_watson.jpg",
    title: "Playing Pebble Beach Around the 2027 US Open: What to Book and When",
    category: "Trip Planning",
    datePublished: "2026-09-16",
    dateModified: "2026-09-16",
    intro:
      "The 2027 US Open Championship returns to Pebble Beach Golf Links® from June 17 to 20, 2027 — the seventh time the course has hosted the event. If you want to play Pebble Beach in 2027, understanding how the tournament affects tee time access and hotel availability is the first step. Here is what to know and when to book.",
    sections: [
      {
        heading: "Which weeks are closed to public play",
        paragraphs: [
          "Pebble Beach Golf Links® closes to public play during both the AT&T Pebble Beach Pro-Am (February 1–7, 2027) and the US Open setup and tournament week. The course typically closes approximately 2 to 3 weeks before the US Open starts for practice rounds and course preparation, meaning public access ends around late May 2027 and does not resume until after the final round on June 20.",
          "Spyglass Hill™ Golf Course may also have restricted access in the weeks surrounding the tournament, as it hosted pro-am practice rounds in previous US Open years at Pebble Beach. Del Monte™ and The Hay™ are generally unaffected by the tournament closure.",
        ],
      },
      {
        heading: "The best windows to play Pebble Beach in 2027",
        paragraphs: [
          "The spring window before the US Open closure — roughly March 1 through late May 2027 — is the primary opportunity to play Pebble Beach Golf Links® in 2027 if you want to experience the course while the US Open setup is underway nearby. The course will be in peak condition heading into the major, and the coastal weather from April onward is among the best of the year.",
          "The post-US Open window from late June through October 2027 is the second option. The course reopens quickly after the final round, and demand from tournament spectators drops sharply once the week is over. Late June and July 2027 are likely to have strong tee time availability.",
          "The AT&T Pebble Beach Pro-Am window in early February closes PBGL and Spyglass Hill™ for the tournament week. Avoid that window for a playing trip.",
        ],
      },
      {
        heading: "Hotel availability around the tournament",
        paragraphs: [
          "The Lodge at Pebble Beach™ and The Inn at Spanish Bay™ will be fully committed to US Open hospitality for tournament week and likely the weeks immediately surrounding it. Lodge and Inn guests get priority tee time access up to 18 months in advance, so groups wanting pre-tournament spring tee times at Pebble Beach Golf Links® should be planning now.",
          "For tournament spectators who are not staying on-site, downtown Monterey hotels — the Portola Hotel, Monterey Plaza, and InterContinental Clement — are 15 to 20 minutes from Pebble Beach and will have more availability than the on-site properties, though rates will still be elevated during tournament week.",
        ],
      },
      {
        heading: "What Monterey Golf Tours can book for 2027",
        paragraphs: [
          "As an IAGTO-contracted Authorized Pebble Beach Resorts® Golf Travel Operator, Monterey Golf Tours can book Pebble Beach Golf Links® tee times and Pebble Beach Resorts® lodging for groups of 2 to 400 players in the pre- and post-tournament windows. We are actively taking bookings now for spring 2027 dates before the US Open closure.",
          "A natural 2027 itinerary pairs pre-tournament Pebble Beach play — staying at The Lodge or The Inn — with spectator tickets to one or more US Open rounds. We handle the golf and accommodation side; US Open tickets are managed separately through the USGA.",
          "The Links at Spanish Bay® reopens April 17, 2027, which means a spring 2027 trip can include the full Pebble Beach Resorts® rotation: Pebble Beach Golf Links®, Spyglass Hill™, the newly reopened Spanish Bay, and Del Monte™. This is the first time all four PBR courses will be playable simultaneously since Spanish Bay closed for renovation.",
        ],
      },
      {
        heading: "How far in advance to book",
        paragraphs: [
          "Lodge and Inn guests can book tee times up to 18 months in advance. For spring 2027 dates, that window is open now. Groups that want the best combination of pre-tournament tee times and on-site lodging should contact us as soon as possible — availability for May 2027 will tighten through the fall of 2026.",
          "Post-US Open summer dates (late June through September 2027) have more runway but should still be confirmed by early 2027 for groups of 8 or more.",
        ],
      },
    ],
    takeaways: [
      "2027 US Open at Pebble Beach: June 17–20, 2027",
      "PBGL closes to public play approximately late May 2027 through June 20",
      "Best playing windows: March–late May 2027 and late June–October 2027",
      "Spanish Bay reopens April 17, 2027 — first full PBR rotation since renovation started",
      "Lodge/Inn guests book up to 18 months out — spring 2027 window open now",
    ],
    internalLinks: [
      { label: "Pebble Beach Golf Links® course page", href: "/golf-courses/pebble-beach-golf-links/" },
      { label: "The Lodge at Pebble Beach™ hotel page", href: "/hotels/lodge-at-pebble-beach/" },
      { label: "Pebble Beach golf packages", href: "/pebble-beach/" },
      { label: "Spanish Bay reopening 2027", href: "/blog/links-at-spanish-bay-reopening-2027/" },
      { label: "The Pebble Pilgrimage itinerary", href: "/itineraries/pebble-beach-golf-package/" },
    ],
    faqs: [
      { q: "When is the 2027 US Open at Pebble Beach?", a: "The 2027 US Open Championship is scheduled for June 17–20, 2027 at Pebble Beach Golf Links® in Pebble Beach, California. This will be the seventh time Pebble Beach has hosted the US Open." },
      { q: "Can I play Pebble Beach Golf Links during the 2027 US Open week?", a: "No. Pebble Beach Golf Links® closes to public play during US Open setup and tournament week. The public playing window ends approximately late May 2027 and resumes after the final round on June 20. The best pre-tournament window is March through mid-May 2027." },
      { q: "How do I book Pebble Beach tee times for spring 2027?", a: "Monterey Golf Tours is an IAGTO-contracted Authorized Pebble Beach Resorts® Golf Travel Operator. We can book tee times at Pebble Beach Golf Links® for spring 2027 now. Lodge and Inn guests have access up to 18 months in advance. Contact us for a custom quote." },
      { q: "Will Spanish Bay be open for the 2027 US Open trip?", a: "Yes. The Links at Spanish Bay® is scheduled to reopen April 17, 2027, before the US Open closure window begins. This means a spring 2027 Monterey golf trip can include all four Pebble Beach Resorts® courses for the first time since Spanish Bay closed for its Gil Hanse renovation." },
    ],
  },
  "pebble-beach-golf-cost": {
    slug: "pebble-beach-golf-cost",
    cardTitle: "Pebble Beach Golf Cost",
    cardImage: "/images/pbc-portal/pbgl_7_2020_aerial.jpg",
    title: "How Much Does a Pebble Beach Golf Trip Cost? A Realistic 2026 Breakdown",
    category: "Trip Planning",
    datePublished: "2026-09-16",
    dateModified: "2026-09-16",
    intro:
      "A Pebble Beach golf trip costs significantly more than a typical golf vacation, and the pricing structure is more complex than most destinations. This page breaks down what you actually pay — green fees, lodging, and the stay requirement — so you can plan your budget before requesting a quote.",
    sections: [
      {
        heading: "The stay requirement",
        paragraphs: [
          "To book Pebble Beach Golf Links®, you must stay at a Pebble Beach Resorts® property — The Lodge at Pebble Beach™, The Inn at Spanish Bay™, or Casa Palmero™. The minimum stay is typically 3 nights. This is not a suggestion; tee times at PBGL are not available to non-resort guests through standard public channels.",
          "Pebble Beach Company reserves a portion of daily tee times for IAGTO-contracted operators like Monterey Golf Tours, which is how we can access PBGL tee times even for groups that are not staying on-site in some cases. But for most groups, the lodge stay is the path to a confirmed tee time.",
        ],
      },
      {
        heading: "Green fees at the Pebble Beach Resorts® courses",
        paragraphs: [
          "As of 2026, green fees at the four main Pebble Beach Resorts® courses are approximately: Pebble Beach Golf Links® — $595 to $695 per player plus a mandatory forecaddie fee of approximately $50–85 per player. Spyglass Hill™ Golf Course — approximately $445 per player. Del Monte™ Golf Course — approximately $135 per player. The Hay™ — approximately $95 per player for 9 holes.",
          "These are planning estimates — actual IAGTO rates available through Monterey Golf Tours may differ. Rates also vary by season and booking channel. The forecaddie fee at Pebble Beach Golf Links® is mandatory and not optional.",
          "Tip: the forecaddie fee at PBGL covers one forecaddie for the foursome — not an individual caddie per player. If you want a dedicated caddie per player, that cost is additional and arranged separately.",
        ],
      },
      {
        heading: "Lodge and Inn room rates",
        paragraphs: [
          "The Lodge at Pebble Beach™ room rates typically start at $1,000 to $1,500 per night for a standard room and can exceed $2,000 for rooms with direct 18th fairway or ocean views. The Inn at Spanish Bay™ runs somewhat lower — typically $700 to $1,200 per night — with all rooms featuring a gas fireplace and private balcony or patio.",
          "Casa Palmero™ is the most exclusive and also the most expensive of the three — 24 rooms and suites, rates on request. The entire property can be booked exclusively for one group.",
          "For groups on a tighter budget, staying at a downtown Monterey hotel and accessing PBGL through our IAGTO tee time allocation — without the mandatory lodge stay — is an option in some cases. Contact us to discuss availability.",
        ],
      },
      {
        heading: "What a typical 4-day Pebble Beach trip costs per person",
        paragraphs: [
          "For a group of 8 sharing rooms at The Inn at Spanish Bay™, playing Pebble Beach Golf Links®, Spyglass Hill™, Poppy Hills, and Bayonet over 4 days: a realistic budget is $3,000 to $5,000 per person all-in for golf and lodging, before flights. The spread is driven primarily by room type and whether you play PBGL once or twice.",
          "Green fees account for roughly $1,200 to $1,600 of that per-person cost across 4 rounds. Lodging at The Inn at $800–1,000 per room per night split between 2 covers $1,600 to $2,000 per person over 4 nights.",
          "Groups looking to reduce cost typically substitute one Pebble Beach Resorts® round for a round at Poppy Hills (same zip code, no gate fee required, Golf Digest Top 100) or Pacific Grove Golf Links (municipal, ocean-view holes, under $100 per round).",
        ],
      },
      {
        heading: "How Monterey Golf Tours prices Pebble Beach packages",
        paragraphs: [
          "We do not publish package prices on the site because every trip is custom — group size, course mix, lodging selection, travel dates, and room types all affect the final number. We provide a detailed itemized quote within 24 hours of your request.",
          "IAGTO rates available through Monterey Golf Tours for Pebble Beach Resorts® courses are confirmed to be competitive with direct booking. There is no markup added above IAGTO rates for the golf component.",
        ],
      },
    ],
    takeaways: [
      "PBGL requires a minimum 3-night stay at The Lodge, The Inn, or Casa Palmero to book standard tee times",
      "Green fees: PBGL ~$595–695 + mandatory forecaddie ($50–85), Spyglass ~$445, Del Monte ~$135, The Hay ~$95",
      "Inn at Spanish Bay™ rooms: approximately $700–1,200/night; Lodge rooms: $1,000–1,500+/night",
      "Realistic 4-day trip for group of 8 at The Inn: $3,000–5,000 per person all-in for golf and lodging",
      "IAGTO rates through Monterey Golf Tours are competitive with direct PBR booking",
    ],
    internalLinks: [
      { label: "Pebble Beach Golf Links® course page", href: "/golf-courses/pebble-beach-golf-links/" },
      { label: "The Lodge at Pebble Beach™", href: "/hotels/lodge-at-pebble-beach/" },
      { label: "The Inn at Spanish Bay™", href: "/hotels/inn-at-spanish-bay/" },
      { label: "The Pebble Pilgrimage — 4-day itinerary", href: "/itineraries/pebble-beach-golf-package/" },
      { label: "Get a custom quote", href: "/quote/" },
    ],
    faqs: [
      { q: "How much does it cost to play Pebble Beach Golf Links?", a: "Green fees at Pebble Beach Golf Links® are approximately $595–695 per player as of 2026, plus a mandatory forecaddie fee of approximately $50–85 per player. A stay at The Lodge at Pebble Beach™, The Inn at Spanish Bay™, or Casa Palmero™ (minimum 3 nights) is required to book tee times through standard channels. IAGTO-contracted operators like Monterey Golf Tours can access tee times directly." },
      { q: "Do you have to stay at Pebble Beach to play Pebble Beach Golf Links?", a: "For most groups, yes — a minimum 3-night stay at a Pebble Beach Resorts® property is required to book Pebble Beach Golf Links® tee times. Monterey Golf Tours holds IAGTO tee time allocations that can in some cases allow access without a lodge stay. Contact us to discuss your specific situation." },
      { q: "What is the cheapest way to play Pebble Beach?", a: "The most cost-effective approach is staying at The Inn at Spanish Bay™ (typically $200–400 per night less than The Lodge) and playing Del Monte™ and Spyglass Hill™ alongside one round at Pebble Beach Golf Links® rather than two. Substituting Poppy Hills (no Pebble Beach gate fee) or Pacific Grove Golf Links for a second Pebble Beach round saves $500–700 per player without sacrificing course quality." },
      { q: "How much does a Pebble Beach trip cost for a group of 8?", a: "A 4-day trip for 8 players at The Inn at Spanish Bay™, playing Pebble Beach Golf Links®, Spyglass Hill™, Poppy Hills, and Bayonet, realistically costs $3,000–5,000 per person for golf and lodging before flights. The range depends primarily on room type and how many rounds at PBGL are included. Contact Monterey Golf Tours for a custom itemized quote." },
    ],
  },

};
