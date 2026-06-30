// Source: all facts trace back to mgts-course-intelligence.md,
// mgts-lodging-intelligence.md, mgts-itinerary-templates.md,
// mgts-ui-intelligence.md, and the verified trackers. No invented facts.

export type BlogPost = {
  slug: string;
  title: string;
  category: "Trip Planning" | "Course Guides" | "Best Of";
  datePublished: string;
  dateModified: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  takeaways?: string[];
  internalLinks: { label: string; href: string }[];
};

export const BLOG_POSTS: Record<string, BlogPost> = {
  "best-time-to-play-golf-monterey-peninsula": {
    slug: "best-time-to-play-golf-monterey-peninsula",
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
  },
  "how-to-plan-a-group-golf-trip-monterey": {
    slug: "how-to-plan-a-group-golf-trip-monterey",
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
          "We plan trips for groups of any size — a twosome up to 300 players, with no minimum beyond avoiding a solo trip of one. Smaller groups (4–8) have the most flexibility on tee times and lodging. Larger groups (16+) generally need to book further in advance and may be better suited to a property like the Portola Hotel, which is built for large-group logistics with its connected conference center.",
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
  },
  "bayonet-golf-course-guide": {
    slug: "bayonet-golf-course-guide",
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
          "Bayonet shares its facility with Black Horse, its sister course — a natural two-round pairing for a multi-day trip. Green fees run around $195 with cart, though rates vary seasonally. One scheduling note: Bayonet and Black Horse close for several days in mid-August during Car Week and the Concours d'Elegance.",
        ],
      },
    ],
    internalLinks: [
      { label: "Full Bayonet course page", href: "/golf-courses/bayonet/" },
      { label: "Black Horse course page", href: "/golf-courses/black-horse/" },
      { label: "Seaside destination guide", href: "/destinations/seaside/" },
    ],
  },
  "best-golf-courses-monterey-peninsula": {
    slug: "best-golf-courses-monterey-peninsula",
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
  },
  "monterey-golf-trip-on-a-budget": {
    slug: "monterey-golf-trip-on-a-budget",
    title: "How to Plan an Affordable Monterey Golf Trip",
    category: "Trip Planning",
    datePublished: "2026-06-30",
    dateModified: "2026-06-30",
    intro:
      "A budget-conscious Monterey golf trip is genuinely possible — a 3-day, 3-round trip built around the peninsula's most accessible courses runs from roughly $564 to $1,740 per person, depending on hotel choice.",
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
  },
};
