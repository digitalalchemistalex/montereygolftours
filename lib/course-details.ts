// Source: mgts-course-intelligence.md + MGTS_Fact_Verification_Tracker.xlsx
// (verified directly against bayonetblackhorse.com by Raza, June 2026)

export type CourseDetail = {
  slug: string;
  name: string;
  city: string;
  facility: string;
  par: number;
  yards: string;
  rating?: string;
  slope?: string;
  holes: number;
  designer: string;
  type: string;
  address: string;
  phone: string;
  website: string;
  hook: string;
  description: string[];
  highlights: { label: string; detail: string }[];
  bestFor: string[];
  lessIdealIf: string[];
  greenFeeEst: string;
  nearbySlugs: string[];
  faqs: { q: string; a: string }[];
  pointers?: string[];
  priceEstimate?: number;
  gallery?: { src: string; caption: string; tag?: string }[];
};

export const COURSE_DETAILS: Record<string, CourseDetail> = {
  bayonet: {
    slug: "bayonet",
    name: "Bayonet",
    city: "Seaside, CA",
    facility: "Bayonet & Black Horse",
    par: 72,
    yards: "7,024 yards",
    rating: "74.8",
    slope: "139",
    holes: 18,
    designer: "Gen. Robert B. McClure (1954) + Gene Bates redesign (2007)",
    type: "Semi-private / public",
    address: "1 McClure Way, Seaside, CA 93955",
    phone: "(831) 899-7271",
    website: "bayonetblackhorse.com",
    hook:
      "The military-heritage championship at former Fort Ord — one of the toughest public courses in the country.",
    gallery: [
      { src: "/images/courses/gallery/bayonet-2.webp", caption: "The Combat Corner — Bayonet's notorious back-nine stretch that turns directly into the prevailing wind.", tag: "Holes 14–16" },
      { src: "/images/courses/gallery/bayonet-3.webp", caption: "Fairways carved from former Fort Ord military land — the history is in the terrain.", tag: "Fairway" },
      { src: "/images/courses/gallery/bayonet-4.webp", caption: "Bayonet's championship layout plays to a slope of 141 from the tips — among the toughest on the peninsula.", tag: "Championship tees" },
      { src: "/images/courses/gallery/bayonet-5.webp", caption: "Elevated approach shots with distant Monterey Bay views on the back nine.", tag: "Back nine" },
      { src: "/images/courses/gallery/bayonet-6.webp", caption: "The green complexes at Bayonet demand precision — undulating and fast.", tag: "Putting surface" },
    ],
    description: [
      "Bayonet sits on the grounds of the former Fort Ord military base, purchased by the US Army in 1917. General Robert B. McClure, the post's commanding officer, designed the course in 1954 — reportedly to suit his own left-handed game. Hole 15, part of a demanding stretch that runs holes 11 through 15, carries the course's famous \"Combat Corner\" nickname. The course is named for the 7th Infantry, the \"Bayonet Division.\"",
      "Fort Ord was decommissioned in the 1990s, and Bayonet opened to public play on January 16, 1997. A Gene Bates redesign completed in 2007 refreshed the layout while keeping the demanding, military-pedigree character intact.",
      "At 7,024 yards from the back tees (rating 74.8, slope 139), Bayonet is ranked among the toughest public courses in the country — Golf Digest placed it No. 35 nationwide on its list of the 50 Toughest Golf Courses in the United States, and Destinations Magazine ranks it the 13th most challenging course in California. It has hosted PGA Tour qualifiers and players including Billy Andrade, Arnold Palmer, Jack Nicklaus, and Tom Watson, and the Nationwide Tour's Monterey Peninsula Classic was held here from 2000 to 2003.",
      "Managed by Troon, with Patrick R. Jones, PGA serving as General Manager. The practice facility includes an all-grass driving range with 6 practice tees, two short-game areas, and a putting green overlooking Monterey Bay.",
    ],
    highlights: [
      {
        label: "Combat Corner",
        detail: "Hole 15, the signature hole in a demanding stretch running holes 11 through 15.",
      },
      {
        label: "Nationally ranked",
        detail: "Golf Digest No. 35 on the 50 Toughest Golf Courses in the United States.",
      },
      {
        label: "Military heritage",
        detail: "Built on former Fort Ord land, designed by the post's commanding officer in 1954.",
      },
      {
        label: "14 minutes from the Hyatt Regency",
        detail: "A short drive from Monterey via General Jim Moore Blvd.",
      },
    ],
    bestFor: [
      "Serious golfers and bucket-list players",
      "Scratch to mid-handicap groups",
      "Anyone wanting a genuine championship test",
    ],
    lessIdealIf: [
      "Your group is mostly high-handicap beginners",
      "You want a relaxed, low-pressure round",
    ],
    greenFeeEst: "Contact us for current rates",
    priceEstimate: 195,
    nearbySlugs: ["black-horse"],
    faqs: [
      {
        q: "Is Bayonet open to the public?",
        a: "Yes. Bayonet is semi-private and open to public play, with group bookings accommodated through the facility.",
      },
      {
        q: "How difficult is Bayonet?",
        a: "It's ranked among the toughest public courses in the country — No. 35 nationally on Golf Digest's list of the 50 Toughest Golf Courses in the United States. Built for serious and scratch-to-mid-handicap players; high-handicap beginners may find it punishing.",
      },
      {
        q: "Who designed Bayonet?",
        a: "Gen. Robert B. McClure designed the original course in 1954. Gene Bates completed a redesign in 2007.",
      },
      {
        q: "What's the green fee at Bayonet?",
        a: "Rates vary by season and tee time — contact us for current green fees before booking.",
      },
      {
        q: "Can groups book Bayonet?",
        a: "Yes, Bayonet accommodates group events. Contact the facility directly or work with Monterey Golf Tours to coordinate tee times as part of a planned trip.",
      },
    ],
    pointers: [
      "Ranked #16 nationally on GolfPass's Top 25 Courses for Layout in the US (2017).",
      "Has hosted several U.S. Presidents and foreign dignitaries during the course's Fort Ord military era.",
      "Local lore holds that designer Gen. Robert McClure, a left-hander, laid out the course to favor his own slice.",
      "The practice facility includes an all-grass driving range, two short-game areas, and a putting green overlooking Monterey Bay.",
    ],
  },
  pasatiempo: {
    slug: "pasatiempo",
    name: "Pasatiempo Golf Course",
    city: "Santa Cruz, CA",
    facility: "Pasatiempo Golf Club",
    par: 70,
    yards: "6,473 yards",
    rating: "72.7",
    slope: "143",
    holes: 18,
    designer: "Alister MacKenzie (1929)",
    type: "Semi-private / daily-fee",
    address: "20 Clubhouse Rd, Santa Cruz, CA 95060",
    phone: "(831) 459-9155",
    website: "pasatiempo.com",
    hook:
      "Alister MacKenzie's self-declared favorite design — he lived and died alongside the 6th fairway.",
    gallery: [
      { src: "/images/courses/gallery/pasatiempo-2.jpg", caption: "Alister MacKenzie's home course — he lived on the property next to the 6th green. The design reflects his obsession with strategic angles.", tag: "MacKenzie design" },
      { src: "/images/courses/gallery/pasatiempo-3.jpg", caption: "The famed 16th hole — a short par 4 that punishes the aggressive tee shot with a ravine short of the green.", tag: "Hole 16 · Par 4" },
      { src: "/images/courses/gallery/pasatiempo-4.jpg", caption: "Deep MacKenzie-style bunkers with steep faces — visually intimidating, strategically exact.", tag: "Bunkering" },
      { src: "/images/courses/gallery/pasatiempo-5.jpg", caption: "The 18th hole plays uphill to a green guarded by the same ravine that defines much of the back nine.", tag: "Hole 18 · Par 4" },
      { src: "/images/courses/gallery/pasatiempo-6.webp", caption: "Views across the Santa Cruz Mountains from the upper holes — rare inland elevation for a MacKenzie layout.", tag: "Santa Cruz Mountains" },
      { src: "/images/courses/gallery/pasatiempo-7.webp", caption: "The course plays through a mix of native oak woodland and open, wind-exposed ridgelines.", tag: "Course character" },
      { src: "/images/courses/gallery/pasatiempo-8.webp", caption: "Pasatiempo's par 70 layout — short by modern standards, but MacKenzie made every yard count.", tag: "Par 70 · 6,434 yds" },
    ],
    description: [
      "Pasatiempo opened on September 8, 1929, designed by Alister MacKenzie for Marion Hollins, the 1921 U.S. Women's Amateur champion. MacKenzie — the architect behind Augusta National, Cypress Point, and Royal Melbourne — considered Pasatiempo one of his finest pieces of work, and felt strongly enough about the course that he bought a home next to the 6th fairway, where he lived until his death in 1934.",
      "The course sits in the hills above Santa Cruz, with the front nine descending through tree-lined corridors toward a Pacific Ocean view before climbing back to the clubhouse, and the back nine winding through a canyon defined by barranca ravines. A multi-decade restoration — led by Tom Doak and Jim Urbina starting in 1996, with a full green and bunker rebuild completed in 2024 — has returned the course closely to MacKenzie's original 1929 design.",
      "Pasatiempo operates as a semi-private club, setting aside daily-fee tee times for public play. It's a perennial entry on national top-100 course lists.",
    ],
    highlights: [
      {
        label: "MacKenzie's home course",
        detail: "He lived alongside the 6th fairway and died there in 1934 — his only American course with that level of direct, ongoing oversight.",
      },
      {
        label: "Recently restored",
        detail: "Every green and bunker rebuilt to the 1929 specification, completed December 2024.",
      },
      {
        label: "Top-100 ranked",
        detail: "A perennial entry on national top-100 golf course lists.",
      },
      {
        label: "Public access",
        detail: "Semi-private, with daily-fee tee times set aside for non-members.",
      },
    ],
    bestFor: [
      "Golf architecture enthusiasts and MacKenzie fans",
      "Groups wanting a genuine Golden Age design experience",
      "Players who enjoy strategic, contoured greens over pure length",
    ],
    lessIdealIf: [
      "Your group wants a flat, easy walk — the terrain has real elevation change",
      "You're looking for a modern, wide-open layout",
    ],
    greenFeeEst: "Contact club directly for current daily-fee rates",
    nearbySlugs: [],
    faqs: [
      {
        q: "Is Pasatiempo open to the public?",
        a: "Yes. Pasatiempo is semi-private and sets aside daily-fee tee times each day for public play.",
      },
      {
        q: "Who designed Pasatiempo?",
        a: "Alister MacKenzie designed the course, which opened in 1929. MacKenzie considered it one of his finest designs and lived alongside the 6th fairway until his death in 1934.",
      },
      {
        q: "Has Pasatiempo been restored?",
        a: "Yes. A restoration led by Tom Doak and Jim Urbina began in 1996, with a full rebuild of every green and bunker to the original 1929 design completed in December 2024.",
      },
      {
        q: "What's the green fee at Pasatiempo?",
        a: "Rates are not published as a flat figure and vary by season and tee time — contact the club directly for current daily-fee pricing.",
      },
      {
        q: "What other courses did Alister MacKenzie design?",
        a: "MacKenzie is also the architect behind Augusta National, Cypress Point, and Royal Melbourne — Pasatiempo is considered one of his finest works among that list.",
      },
    ],
  },
  "black-horse": {
    slug: "black-horse",
    name: "Black Horse",
    city: "Seaside, CA",
    facility: "Bayonet & Black Horse",
    par: 72,
    yards: "7,024 yards",
    rating: "73.7",
    slope: "141",
    holes: 18,
    designer: "Gen. Robert B. McClure (1954), redesigned by Gene Bates (2007)",
    type: "Semi-private / public",
    address: "1 McClure Way, Seaside, CA 93955",
    phone: "(831) 899-7271",
    website: "bayonetblackhorse.com",
    hook:
      "Black Horse's twin at the former Fort Ord — sweeping Monterey Bay views with a gentler test than its sister course.",
    gallery: [
      { src: "/images/courses/gallery/black-horse-2.jpg", caption: "Panoramic Monterey Bay views open up on the back nine — on a clear day you can see across to Santa Cruz.", tag: "Monterey Bay views" },
      { src: "/images/courses/gallery/black-horse-3.webp", caption: "Black Horse's fescue-framed fairways give it a links character that Bayonet, its sister course, doesn't have.", tag: "Fescue fairways" },
      { src: "/images/courses/gallery/black-horse-4.webp", caption: "Slope 132 from the tips — more forgiving than Bayonet, but the Bay wind makes every score honest.", tag: "Slope 132" },
    ],
    description: [
      "Black Horse shares its origin with Bayonet on the grounds of the former Fort Ord military base. Designed alongside Bayonet by General Robert B. McClure in 1954 and refreshed in a 2007 Gene Bates redesign, Black Horse offers fescue-framed fairways and sweeping views of Monterey Bay throughout the round.",
      "Where Bayonet has built its reputation as one of the toughest public tests in the country, Black Horse plays as the more approachable of the two Fort Ord courses — still a genuine championship-caliber layout, but with a bit more forgiveness for a wider range of handicaps.",
      "Both courses operate under the same Bayonet & Black Horse facility, 5 miles from downtown Monterey, and are a natural multi-round pairing for groups spending a few days on the peninsula.",
      "⚠️ Car Week note: The annual Concorso Italiano (Monterey Car Week, August) is held on these grounds — both courses may be unavailable during that event week. Confirm dates before booking any August round.",
    ],
    highlights: [
      {
        label: "Monterey Bay views",
        detail: "Sweeping coastal views carry through much of the round.",
      },
      {
        label: "Fort Ord heritage",
        detail: "Designed in 1954 by Gen. Robert B. McClure alongside Bayonet, on the former military base.",
      },
      {
        label: "Pairs naturally with Bayonet",
        detail: "Same facility, same clubhouse — an easy two-round day or back-to-back booking.",
      },
      {
        label: "Gene Bates redesign",
        detail: "Refreshed in 2007 alongside Bayonet's redesign.",
      },
      {
        label: "Fescue fairways + serrated bunkers",
        detail: "Fescue-framed fairways and bunkers with distinctive serrated edges — a hallmark of the redesign.",
      },
    ],
    bestFor: [
      "Groups wanting a genuine test without Bayonet's full difficulty",
      "Mid-handicap players",
      "Pairing with a Bayonet round for a two-course Fort Ord day",
    ],
    lessIdealIf: [
      "You specifically want the hardest test on the peninsula (that's Bayonet)",
    ],
    greenFeeEst: "Contact us for current rates",
    priceEstimate: 165,
    nearbySlugs: ["bayonet"],
    faqs: [
      {
        q: "Is Black Horse harder or easier than Bayonet?",
        a: "Black Horse is generally considered the more approachable of the two Fort Ord courses, though it's still a genuine championship-caliber test.",
      },
      {
        q: "Can I play both Bayonet and Black Horse in one trip?",
        a: "Yes — both courses share the same facility and clubhouse, making a two-round day or back-to-back booking straightforward.",
      },
      {
        q: "Who designed Black Horse?",
        a: "Gen. Robert B. McClure designed the original course in 1954, the same year as Bayonet. Gene Bates completed a redesign in 2007.",
      },
      {
        q: "What's the green fee at Black Horse?",
        a: "Rates vary by season and tee time — contact us for current green fees before booking.",
      },
      {
        q: "How far is Black Horse from downtown Monterey?",
        a: "Both Bayonet and Black Horse sit about 5 miles from downtown Monterey, within the same facility.",
      },
    ],
    pointers: [
      "Named for the 11th Cavalry Regiment 'Black Horse,' stationed at the Presidio of Monterey from 1919 to 1940.",
      "The sweeping Monterey Bay views from Black Horse's fairways are among the best on the peninsula.",
      "Savvy groups play both Bayonet and Black Horse in the same two-day stretch — same facility, distinct challenges.",
    ],
  },
  "carmel-valley-ranch": {
    slug: "carmel-valley-ranch",
    name: "Carmel Valley Ranch",
    city: "Carmel Valley, CA",
    facility: "Carmel Valley Ranch",
    par: 70,
    yards: "6,117 yards",
    holes: 18,
    designer: "Pete Dye (original), redesigned by Gene Bates",
    type: "Resort",
    address: "1 Old Ranch Rd, Carmel, CA 93923",
    phone: "(831) 625-9500",
    website: "carmelvalleyranch.com/golf",
    hook:
      "Inland warmth and an early clear from the fog — the only Pete Dye design in Northern California.",
    gallery: [
      { src: "/images/courses/gallery/carmel-valley-ranch-golf-2.webp", caption: "Pete Dye's only Northern California design — the only Pete Dye course in the entire region. Redesigned by Gene Bates in 2006.", tag: "Pete Dye design" },
    ],
    description: [
      "Carmel Valley Ranch sits inland from the coastal fog belt, in the warmer Carmel Valley microclimate that tends to clear earlier in the day than the peninsula proper. The course carries a Pete Dye pedigree — the only Pete Dye design in Northern California — with a subsequent Gene Bates redesign.",
      "At 6,117 yards and par 70, the course favors strategy and shot placement over pure length, characteristic of Dye's design philosophy. It anchors the Carmel Valley Ranch resort property, making it a natural stay-and-play pairing for groups based there.",
    ],
    highlights: [
      {
        label: "Only Pete Dye design in Northern California",
        detail: "A distinctive design pedigree not found elsewhere in the region.",
      },
      {
        label: "Inland microclimate",
        detail: "Clears earlier than the coastal fog — a reliable warm-weather round.",
      },
      {
        label: "On-site resort course",
        detail: "Anchors the Carmel Valley Ranch resort for stay-and-play groups.",
      },
    ],
    bestFor: [
      "Groups wanting a warmer, fog-free round",
      "Players who enjoy strategic, Pete Dye-style course architecture",
      "Stay-and-play groups based at Carmel Valley Ranch",
    ],
    lessIdealIf: ["You want maximum yardage and a pure power test"],
    greenFeeEst: "Resort rates — enquire",
    priceEstimate: 195,
    nearbySlugs: ["quail-lodge"],
    faqs: [
      {
        q: "Who designed Carmel Valley Ranch?",
        a: "Pete Dye designed the original course — the only Pete Dye design in Northern California — with a later redesign by Gene Bates.",
      },
      {
        q: "Is Carmel Valley Ranch usually less foggy than the coast?",
        a: "Yes. Its inland location in Carmel Valley sits outside the coastal marine layer, so it tends to clear earlier in the day than peninsula courses.",
      },
      {
        q: "What's the green fee at Carmel Valley Ranch?",
        a: "Rates vary by season and tee time — contact us for current green fees before booking.",
      },
      {
        q: "How long is the course at Carmel Valley Ranch?",
        a: "6,117 yards at par 70 — shorter than many peninsula courses, favoring strategy and shot placement over pure length, characteristic of Pete Dye's design style.",
      },
      {
        q: "Can non-resort guests play Carmel Valley Ranch?",
        a: "It primarily serves resort guests as an on-site course, so availability for outside play should be confirmed directly with the resort or arranged as part of a planned trip." ,
      },
    ],
  },
  "quail-lodge": {
    slug: "quail-lodge",
    name: "Quail Lodge & Golf Club",
    city: "Carmel Valley, CA",
    facility: "Quail Lodge & Golf Club",
    par: 71,
    yards: "6,500 yards",
    slope: "129",
    holes: 18,
    designer: "Robert Muir Graves (1964) + Todd Eckenrode, Origins Golf Design (2015)",
    type: "Resort / semi-private",
    address: "8205 Valley Greens Dr, Carmel, CA 93923",
    phone: "(831) 624-2888",
    website: "quaillodge.com/golf",
    hook:
      "A resort round in the Carmel Valley sun, threaded around 10 man-made lakes, away from the coastal marine layer.",
    gallery: [
      { src: "/images/courses/gallery/quail-lodge-2.webp", caption: "Ten man-made lakes weave through Quail Lodge's layout — water comes into play on 9 of the 18 holes.", tag: "Water features" },
      { src: "/images/courses/gallery/quail-lodge-3.webp", caption: "The Robert Muir Graves original from 1964, refined by Todd Eckenrode in 2015 — consistently rated best playing conditions in Central California.", tag: "Best conditions" },
      { src: "/images/courses/gallery/quail-lodge-4.webp", caption: "Warm Carmel Valley sunshine even when the coast is fogged in — one of the practical reasons to base here.", tag: "Carmel Valley" },
      { src: "/images/courses/gallery/quail-lodge-5.webp", caption: "Wildlife is a constant presence — quail, deer, hawks, and herons are regulars on the fairways.", tag: "Wildlife" },
    ],
    description: [
      "Quail Lodge & Golf Club was designed by Robert Muir Graves in 1964 and refined in 2015 by Principal Designer Todd Eckenrode of Origins Golf Design. The course plays through Carmel Valley's warmer inland climate with 10 man-made lakes strategically woven through the layout — accuracy matters more than distance here.",
      "The front nine runs along the Carmel River through open terrain; the back nine transitions into forested corridors. Wildlife is abundant throughout — quail, hawks, deer, turtles, and fox are regular companions on the round. The course is flat enough to walk comfortably, with Poa annua greens that Quail Lodge maintains to the standard that has earned it the 'Best Playing Conditions in Central California' award from GreensKeeper.org every year since 2016.",
      "At par 71 and 6,500 yards (slope 128), it's a resort-style round suited to a wide range of handicaps, with the resort's heated pool, Covey Grill restaurant, and tennis courts rounding out the stay-and-play experience.",
    ],
    highlights: [
      {
        label: "10 man-made lakes",
        detail: "A defining feature of the layout, demanding accuracy off the tee and into greens.",
      },
      {
        label: "Carmel Valley warmth",
        detail: "Inland location clears of fog earlier than coastal peninsula courses.",
      },
      {
        label: "Resort-anchored",
        detail: "On-site course for guests staying at Quail Lodge & Golf Club.",
      },
      {
        label: "'Best Playing Conditions' — Central California",
        detail: "GreensKeeper.org award winner every year since 2016.",
      },
      {
        label: "Wildlife throughout",
        detail: "Quail, hawks, deer, turtles, and fox are regular companions on the round.",
      },
    ],
    bestFor: [
      "Groups wanting a warm-weather resort round",
      "Players who enjoy water-feature strategic golf",
      "Stay-and-play groups based at Quail Lodge",
    ],
    lessIdealIf: ["You're looking for a links-style or coastal-fog round"],
    greenFeeEst: "Daily-fee — enquire for rates",
    priceEstimate: 125,
    nearbySlugs: ["carmel-valley-ranch"],
    faqs: [
      {
        q: "What's distinctive about Quail Lodge's layout?",
        a: "The course is threaded around 10 man-made lakes, a defining feature that rewards accurate shot-making.",
      },
      {
        q: "What's the green fee at Quail Lodge?",
        a: "Pricing varies by season and tee time — confirm current rates before booking.",
      },
      {
        q: "Is Quail Lodge open to non-resort guests?",
        a: "Yes, it operates as a semi-private resort course with availability for outside play alongside resort guests.",
      },
      {
        q: "Who designed Quail Lodge?",
        a: "Robert Muir Graves designed the course, which plays 6,500 yards at par 71 with a slope of 129.",
      },
      {
        q: "Is Quail Lodge good for early tee times?",
        a: "Yes — its inland Carmel Valley location tends to clear of fog earlier than coastal peninsula courses, making early rounds more reliable.",
      },
    ],
  },
  "laguna-seca-golf-ranch": {
    slug: "laguna-seca-golf-ranch",
    name: "Laguna Seca Golf Ranch",
    city: "Monterey, CA",
    facility: "Laguna Seca Golf Ranch",
    par: 71,
    yards: "6,226 yards",
    rating: "70.7",
    slope: "129",
    holes: 18,
    designer: "Robert Trent Jones Sr. & Robert Trent Jones Jr. (1970)",
    type: "Daily-fee",
    address: "10520 York Rd, Monterey, CA 93940",
    phone: "(831) 373-3701",
    website: "lagunasecagolf.com",
    hook: "An accessible daily-fee round close to downtown Monterey, with rates that won't strain a group budget.",
    gallery: [
      { src: "/images/courses/gallery/laguna-seca-2.jpg", caption: "Designed by Robert Trent Jones Sr. and Jr. — the only father-son collaboration in Monterey Peninsula golf.", tag: "RTJ Father-Son design" },
    ],
    description: [
      "Laguna Seca Golf Ranch was designed by the legendary Robert Trent Jones Sr. and Robert Trent Jones Jr. father-son duo in 1970 — remarkable design pedigree at a daily-fee price point. The course is carved through oak-studded coastal hills between Monterey and Salinas, with narrow uneven fairways, elevated tees, and strategically placed bunkers guarding every green.",
      "SeeMontereY describes it as the 'best golf value on the Monterey Peninsula.' The signature hole is the par-5 15th — 548 yards, shaped like a snake, requiring carries over water on both the tee shot and approach. Hilly terrain makes a cart recommended, though the course is technically walkable. Managed by CourseCo, Inc., with Matt Pennington as General Manager.",
    ],
    highlights: [
      {
        label: "Budget-friendly",
        detail: "Among the most accessible green fees on the peninsula.",
      },
      {
        label: "Close to downtown Monterey",
        detail: "A short drive from the city center and Cannery Row.",
      },
      {
        label: "RTJ Father-Son design",
        detail: "Designed by Robert Trent Jones Sr. & Jr. in 1970 — remarkable pedigree at a daily-fee price.",
      },
      {
        label: "Snake hole — #15",
        detail: "Par-5 548 yards shaped like a serpent, with water carries on both tee and approach shots.",
      },
    ],
    bestFor: [
      "Groups watching their overall trip budget",
      "A relaxed-pace round to open or close a multi-day trip",
      "Beginners and mixed-skill groups",
    ],
    lessIdealIf: ["You want a marquee, bucket-list championship test"],
    greenFeeEst: "Municipal rates — enquire",
    priceEstimate: 58,
    nearbySlugs: ["pacific-grove-golf-links"],
    faqs: [
      {
        q: "What's the green fee at Laguna Seca?",
        a: "Rates vary — contact us or the club directly for current green fees.",
      },
      {
        q: "How far is Laguna Seca from downtown Monterey?",
        a: "It's close to downtown Monterey, making it convenient for groups based in the city.",
      },
      {
        q: "How long is the course at Laguna Seca?",
        a: "6,226 yards at par 71 — a straightforward, accessible 18-hole layout." ,
      },
      {
        q: "Is Laguna Seca good for a mixed-skill group?",
        a: "Yes — it's positioned as a relaxed-pace round suited to beginners and mixed-handicap groups, and a natural choice to open or close a multi-day trip.",
      },
      {
        q: "Is Laguna Seca associated with the nearby raceway of the same name?",
        a: "The golf course and WeatherTech Raceway Laguna Seca share the same regional name but are separate facilities.",
      },
    ],
    pointers: [
      "The par-5 15th is nicknamed the 'snake hole' — it's shaped like a serpent and requires carries over water twice.",
      "Designed by Robert Trent Jones Sr. and Jr. in 1970 — notable design pedigree at a daily-fee price point.",
      "The best-value full-length course on the peninsula, ideal as an accessible opening or closing round.",
    ],
  },
  "pacific-grove-golf-links": {
    slug: "pacific-grove-golf-links",
    name: "Pacific Grove Golf Links",
    city: "Pacific Grove, CA",
    facility: "Pacific Grove Golf Links",
    par: 70,
    yards: "5,732 yards",
    holes: 18,
    designer: "H. Chandler Egan (front nine, 1932) + Jack Neville (back nine)",
    type: "Municipal",
    address: "77 Asilomar Ave, Pacific Grove, CA 93950",
    phone: "(831) 648-5775",
    website: "playpacificgrove.com",
    hook: "Ocean holes on a municipal budget — a coastal links round without the private-club price tag.",
    gallery: [
      
      { src: "/images/courses/gallery/pacific-grove-golf-links-3.webp", caption: "Point Pinos Lighthouse overlooks holes 12 through 16 — built in 1855, the oldest continuously operating lighthouse on the West Coast.", tag: "Point Pinos Lighthouse" },
      { src: "/images/courses/gallery/pacific-grove-golf-links-4.webp", caption: "The same Monterey coastline as Pebble Beach — at a fraction of the green fee. The locals' open secret.", tag: "Coastal links" },
      { src: "/images/courses/gallery/pacific-grove-golf-links-5.webp", caption: "Windswept dunes remind you that Jack Neville understood links golf. The ocean spray is part of the experience.", tag: "Links terrain" },
    ],
    description: [
      "Pacific Grove Golf Links opened on May 9, 1932, with H. Chandler Egan designing the front nine. The back nine was laid out by Jack Neville — the same architect who designed the famous clifftop links right next door — and plays along the Pacific coast with crashing waves, tide pools, and views of Point Pinos Lighthouse.",
      "Widely known as the 'Poor Man's Pebble Beach' — same ocean, same coastline, fraction of the cost. The front nine winds through forested Pacific Grove, giving the round two completely different personalities: wooded and sheltered on the front, fully exposed to the Pacific on the back.",
      "City-owned and managed by CourseCo, Inc. (General Manager: Neil Sauer), with municipal pricing that makes it one of the best value rounds on the peninsula. The course is adjacent to Asilomar State Beach at 77 Asilomar Avenue.",
    ],
    highlights: [
      {
        label: "Ocean-adjacent holes",
        detail: "Genuine coastal views on a municipal budget.",
      },
      {
        label: "Municipal pricing",
        detail: "City-owned course with rates well below the peninsula's resort/private options.",
      },
      {
        label: "Walkable layout",
        detail: "Shorter yardage suits a relaxed, walkable round.",
      },
      {
        label: "Jack Neville back nine",
        detail: "The same architect who designed the famous clifftop links laid out the back nine — same Pacific, fraction of the price.",
      },
      {
        label: "'Poor Man's Pebble Beach'",
        detail: "Same ocean, same coastline, fraction of the resort price.",
      },
    ],
    bestFor: [
      "Budget-conscious groups",
      "Mixed-handicap groups wanting a relaxed pace",
      "Anyone wanting ocean views without the premium price tag",
    ],
    lessIdealIf: ["You want a long, championship-length test"],
    greenFeeEst: "Daily-fee — enquire for rates",
    priceEstimate: 66,
    nearbySlugs: ["laguna-seca-golf-ranch"],
    faqs: [
      {
        q: "Is Pacific Grove Golf Links on the ocean?",
        a: "Yes, the course includes ocean-adjacent holes, offering coastal views at municipal course pricing.",
      },
      {
        q: "What's the green fee at Pacific Grove?",
        a: "Rates vary — contact us or the club directly for current green fees.",
      },
      {
        q: "How long is Pacific Grove Golf Links?",
        a: "5,727 yards at par 70 — shorter than most peninsula courses, suited to a relaxed, walkable round.",
      },
      {
        q: "Is Pacific Grove Golf Links good for beginners?",
        a: "Yes — its shorter yardage and municipal pace make it one of the more approachable rounds on the peninsula for mixed-ability groups.",
      },
      {
        q: "Is Pacific Grove Golf Links owned by a resort?",
        a: "No — it's a city-owned municipal course, which is why its rates run well below the peninsula's resort and private options.",
      },
    ],
    pointers: [
      "The back nine was laid out by the same architect who designed the famous clifftop links next door — same Pacific Ocean, same crashing waves, a fraction of the price.",
      "The front nine plays through forested Pacific Grove, giving the round two completely different characters.",
      "Address: 77 Asilomar Avenue, Pacific Grove — adjacent to Asilomar State Beach.",
    ],
  },
  "poppy-hills": {
    slug: "poppy-hills",
    name: "Poppy Hills Golf Course",
    city: "Pebble Beach, CA (Del Monte Forest)",
    facility: "Poppy Hills Golf Course",
    par: 71,
    yards: "7,091 yards (Jones tees)",
    holes: 18,
    designer: "Robert Trent Jones II",
    type: "Daily-fee (NCGA)",
    address: "3200 Lopez Rd, Pebble Beach, CA 93953",
    phone: "(831) 250-1499",
    website: "poppyhillsgolf.com",
    hook: "Golf's most famous zip code, bentgrass greens, and no Pebble Beach Company gate fee.",
    gallery: [
      { src: "/images/courses/gallery/poppy-hills-2.webp", caption: "Poppy Hills sits in the Del Monte Forest — the same zip code as Pebble Beach, at a public access green fee.", tag: "Del Monte Forest" },
    ],
    description: [
      "Poppy Hills Golf Course sits inside the Del Monte Forest — the same 93953 zip code as the resort's marquee courses — but is owned and operated by the Northern California Golf Association (NCGA), entirely separate from Pebble Beach Company. Day visitors do not pay the Pebble Beach gate fee; the NCGA entrance is completely separate.",
      "At par 71 and 7,002 yards (rating 73.5, slope 135), the Robert Trent Jones Jr. design opened in 1986 and underwent a 13-month renovation completed in April 2014, which introduced native sandy waste areas, removed rough, and opened up the forest floor. Post-renovation, Golf.com called it 'Pinehurst-like, with a hint of near-neighbor Cypress Point.'",
      "Colin Montgomerie said it 'reminds me of Pinehurst and Pine Valley.' Tom Watson: 'I like that a lot — would love a three-round event at Poppy Hills.' RTJ Jr. himself describes it as 'the closest you can get to playing golf in a National Park.' The course record is 62, set by Matt Gogel in the 2001 AT&T Pebble Beach Pro-Am. It co-hosted the AT&T from 1991 to 2009.",
      "Groups of 16+ receive an advance booking window beyond the standard 90-day window — contact Group Ambassador Cassidy Young at cyoung@ncga.org or (831) 622-8239.",
    ],
    highlights: [
      {
        label: "Del Monte Forest setting",
        detail: "Same legendary zip code as Pebble Beach Resorts®' courses.",
      },
      {
        label: "NCGA-owned",
        detail: "Owned by the Northern California Golf Association, not Pebble Beach Company — no resort gate fee.",
      },
      {
        label: "Bentgrass greens",
        detail: "NCGA official site describes them as 'among the purest on the peninsula.'",
      },
      {
        label: "Course record: Matt Gogel 62",
        detail: "Set during the 2001 AT&T Pebble Beach Pro-Am when Poppy Hills co-hosted the event (1991–2009).",
      },
      {
        label: "Golf Digest Top 100",
        detail: "Confirmed on the NCGA official site — Top 100 Courses You Can Play.",
      },
    ],
    bestFor: [
      "Groups wanting the Pebble Beach area experience at daily-fee pricing",
      "Mid to low-handicap players",
    ],
    lessIdealIf: ["You specifically want a Pebble Beach Company-branded course"],
    greenFeeEst: "Daily-fee — enquire for rates",
    priceEstimate: 95,
    nearbySlugs: [],
    faqs: [
      {
        q: "Is Poppy Hills owned by Pebble Beach Company?",
        a: "No. Poppy Hills is owned and operated by the Northern California Golf Association (NCGA), separate from Pebble Beach Company, despite sitting in the same Del Monte Forest area.",
      },
      {
        q: "What's the green fee at Poppy Hills?",
        a: "Rates vary — contact us or the club directly for current green fees.",
      },
      {
        q: "Who designed Poppy Hills?",
        a: "Robert Trent Jones II designed the course, which plays 7,091 yards from the Jones tees at par 71.",
      },
      {
        q: "What kind of greens does Poppy Hills have?",
        a: "Bentgrass greens, offering quality conditioning at daily-fee pricing.",
      },
      {
        q: "Is Poppy Hills in the same area as Pebble Beach Golf Links®?",
        a: "Yes — it sits in the same Del Monte Forest, though it's independently owned by the NCGA and doesn't carry the resort's gate fee.",
      },
    ],
    pointers: [
      "Colin Montgomerie compared it to Pine Valley. Tom Watson said: 'I like that a lot. Would love a three-round event at Poppy Hills.'",
      "All 18 holes play through towering Monterey Pines of the Del Monte Forest — unique atmosphere at a public price.",
      "Day visitors do NOT pay the Pebble Beach gate fee to access Poppy Hills — the NCGA entrance is entirely separate from the resort.",
    ],
  },
  "club-at-pasadera": {
    slug: "club-at-pasadera",
    name: "The Club at Pasadera",
    city: "Monterey, CA",
    facility: "The Club at Pasadera",
    par: 71,
    yards: "6,673–6,733 yards",
    rating: "73.7",
    holes: 18,
    designer: "Jack Nicklaus (Jack Nicklaus Signature Design)",
    type: "Private (limited public access)",
    address: "1 Pasadera Drive, Monterey, CA 93940",
    phone: "Contact club directly",
    website: "theclubatpasadera.com",
    hook: "A Jack Nicklaus Signature course on the Monterey Peninsula — limited public access available.",
    description: [
      "The only Jack Nicklaus Signature course on the Monterey Peninsula. The Club at Pasadera rewards groups who plan around its Monday public access window — the canyon par-3 14th ('The Moment', 205 yards over a canyon with views to Monterey and Pacific Grove) rivals any signature hole on the peninsula, with conditions that match private clubs in California.",
      "The Club at Pasadera is a Jack Nicklaus Signature Design that opened in 2000, privately operated with limited public access. The course is owned by Concert Golf Partners and has been associated with the TPC Network since 2025, though current public-facing branding uses the name \"The Club at Pasadera\" rather than any TPC-prefixed name.",
      "At par 71 and roughly 6,673–6,733 yards depending on the source, the course offers a premium Nicklaus design experience on the Monterey Peninsula, typically with limited access windows for non-members.",
    ],
    highlights: [
      {
        label: "Jack Nicklaus Signature Design",
        detail: "A premium designer course on the Monterey Peninsula.",
      },
      {
        label: "Limited public access",
        detail: "Private club with select windows for outside play — contact directly for current access terms.",
      },
      {
        label: "'The Moment' — Hole 14",
        detail: "Par-3, 205 yards over a canyon with views stretching to Monterey and Pacific Grove.",
      },
      {
        label: "Hole 15 — former longest par 4 in North America",
        detail: "At 562 yards, once the longest par 4 on the continent.",
      },
      {
        label: "Nicklaus's own words",
        detail: "Jack Nicklaus is on record calling it one of the best courses he ever designed.",
      },
    ],
    bestFor: [
      "Groups seeking a premium designer-course experience",
      "Trips planned well in advance to secure access",
    ],
    lessIdealIf: ["You need guaranteed same-week public access — confirm availability before planning"],
    greenFeeEst: "Contact club directly for current rates and access terms",
    nearbySlugs: [],
    faqs: [
      {
        q: "Can the public play The Club at Pasadera?",
        a: "Access is limited — the club is primarily private. Contact the club directly to confirm current public access terms before planning a round.",
      },
      {
        q: "Who designed The Club at Pasadera?",
        a: "Jack Nicklaus designed the course as a Jack Nicklaus Signature Design, which opened in 2000.",
      },
      {
        q: "How long is the course at The Club at Pasadera?",
        a: "Roughly 6,673–6,733 yards depending on the source, at par 71 with a 73.7 rating.",
      },
      {
        q: "Who owns The Club at Pasadera?",
        a: "It's owned by Concert Golf Partners and has been associated with the TPC Network since 2025, though current public-facing branding uses the name The Club at Pasadera.",
      },
      {
        q: "Is The Club at Pasadera a good fit for a group trip?",
        a: "It suits groups planning well in advance to secure access, given its limited public availability as a primarily private club.",
      },
    ],
    pointers: [
      "Signature hole: par-3 14th — 'The Moment' — 205 yards over a canyon with views stretching to Monterey and Pacific Grove.",
      "Guests of Bernardus Lodge can access the course outside the standard Monday public window — verify current terms with the property.",
      "Joined the TPC Network in 2025; previously operated as TPC Monterey at Pasadera.",
    ],
  },
  "pebble-beach-golf-links": {
    slug: "pebble-beach-golf-links",
    name: "Pebble Beach Golf Links®",
    city: "Pebble Beach, CA",
    facility: "Pebble Beach Resorts®",
    par: 72,
    yards: "6,802 yards (blue tees)",
    rating: "74.9",
    slope: "144",
    holes: 18,
    designer: "Jack Neville and Douglas Grant (1919)",
    type: "Resort (Pebble Beach Resorts®)",
    address: "1700 17-Mile Drive, Pebble Beach, CA 93953",
    phone: "(800) 877-0597",
    website: "pebblebeach.com",
    hook: "The most famous cliff-top course in American golf, opened in 1919 and unchanged in legend ever since.",
    gallery: [
      { src: "/images/courses/gallery/pebble-beach-3.webp", caption: "The par-3 7th hole — one of the shortest and most iconic holes in golf, playing directly to the Pacific.", tag: "Hole 7 · Par 3" },
      { src: "/images/courses/gallery/pebble-beach-hole-6.webp", caption: "The par-5 6th hole at Pebble Beach Golf Links® — a dramatic downhill tee shot toward Stillwater Cove.", tag: "Hole 6 · Par 5" },
      { src: "/images/courses/gallery/pebble-beach-2.webp", caption: "Holes 8, 9, and 10 running along the Pacific cliffs — the most photographed stretch in American golf.", tag: "Holes 8–10" },
      { src: "/images/courses/gallery/pebble-beach-4.webp", caption: "Looking back from the fairway — the Pacific stretches to the horizon on Pebble Beach's famous coastal stretch.", tag: "Coastal holes" },
      { src: "/images/courses/gallery/pebble-beach-5.webp", caption: "The 18th hole framed by the Lodge — golf's most famous closing hole, hugging the Stillwater Cove shoreline.", tag: "Hole 18" },
    ],
    description: [
      "Pebble Beach Golf Links® was designed by two amateur golfers, Jack Neville and Douglas Grant, opening on February 22, 1919. It remains the most recognized golf course in the country, with a string of holes running directly along the Pacific coastline.",
      "Tee options range from the 6,802-yard blue tees (rating 74.9, slope 144) down to shorter sets for a range of player abilities. Green fees vary annually for both resort and non-resort players, with optional caddie services. Enquire through us for current rates.",
      "Booking through Monterey Golf Tours, as an IAGTO-contracted travel partner with Pebble Beach Resorts®, gives groups access to coordinated tee times and stay-and-play packages as part of a planned trip.",
    ],
    highlights: [
      {
        label: "America's most famous course",
        detail: "Opened 1919, designed by Jack Neville and Douglas Grant.",
      },
      {
        label: "Cliff-top Pacific holes",
        detail: "A run of holes directly along the Pacific coastline.",
      },
      {
        label: "IAGTO-contracted access",
        detail: "Monterey Golf Tours coordinates tee times as an authorized Pebble Beach Resorts® travel partner.",
      },
    ],
    bestFor: ["Bucket-list trips", "Groups planning well in advance", "Serious golfers wanting the marquee round"],
    lessIdealIf: ["Budget is the primary constraint — this is the most expensive round on the peninsula"],
    greenFeeEst: "Enquire for current resort rates",
    priceEstimate: 695,
    nearbySlugs: ["spyglass-hill", "links-at-spanish-bay"],
    faqs: [
      {
        q: "What's the green fee at Pebble Beach Golf Links®?",
        a: "Rates vary annually — enquire through us or contact the Pebble Beach travel desk for current green fees.",
      },
      {
        q: "Who designed Pebble Beach Golf Links®?",
        a: "Two amateur golfers, Jack Neville and Douglas Grant, designed the course, which opened on February 22, 1919.",
      },
      {
        q: "How do I book a round at Pebble Beach Golf Links®?",
        a: "Monterey Golf Tours, as an IAGTO-contracted partner with Pebble Beach Resorts®, can coordinate tee times as part of a planned group trip.",
      },
      {
        q: "How far in advance can I book Pebble Beach Golf Links®?",
        a: "It generally requires a 2–3 night resort stay to book in advance — otherwise it's a 24-hour booking window.",
      },
      {
        q: "How long is the course at Pebble Beach Golf Links®?",
        a: "6,802 yards from the blue tees, rating 74.9, slope 144, with shorter tee options available for a range of player abilities.",
      },
    ],
  },
  "spyglass-hill": {
    slug: "spyglass-hill",
    name: "Spyglass Hill Golf Course®",
    city: "Pebble Beach, CA",
    facility: "Pebble Beach Resorts®",
    par: 72,
    yards: "6,960 yards",
    rating: "75.4",
    slope: "145",
    holes: 18,
    designer: "Robert Trent Jones Sr.",
    type: "Resort (Pebble Beach Resorts®)",
    address: "Stevenson Drive, Pebble Beach, CA 93953",
    phone: "(800) 877-0597",
    website: "pebblebeach.com",
    hook: "A Robert Trent Jones Sr. design moving from coastal dunes into Del Monte Forest pines — widely regarded as the toughest of the Pebble Beach Resorts® courses.",
    gallery: [
      { src: "/images/courses/gallery/spyglass-2.webp", caption: "Spyglass Hill Golf Course® opening holes — the front nine moves through coastal dunes before turning inland through Del Monte Forest.", tag: "Coastal dunes" },
      { src: "/images/courses/gallery/spyglass-3.webp", caption: "The forest pines of the back nine at Spyglass Hill® — a complete contrast to the coastal opening holes, demanding precision on every approach.", tag: "Del Monte Forest" },
      { src: "/images/courses/gallery/spyglass-4.webp", caption: "Rating 75.4, slope 145 — the numbers confirm what players already know: Spyglass Hill® is the hardest test among the Pebble Beach Resorts® properties.", tag: "Most demanding" },
    ],
    description: [
      "Spyglass Hill Golf Course® was designed by Robert Trent Jones Sr., playing up to 6,960 yards from the championship tees with a rating of 75.4 and slope of 145 — figures that back up its reputation as the most demanding course among the Pebble Beach Resorts® properties.",
      "The front nine moves through coastal dunes before the back nine turns inland through Del Monte Forest pines, giving the round two distinct characters. Green fees vary annually — enquire for current rates.",
    ],
    highlights: [
      {
        label: "Toughest of the Pebble Beach Resorts® courses",
        detail: "Rating 75.4, slope 145 — the most demanding test among the resort's properties.",
      },
      {
        label: "Dunes to forest",
        detail: "Front nine in coastal dunes, back nine through Del Monte Forest pines.",
      },
      {
        label: "Robert Trent Jones Sr. design",
        detail: "One of golf's most influential architects.",
      },
    ],
    bestFor: ["Low-handicap and scratch players", "Groups wanting a genuine championship test"],
    lessIdealIf: ["Your group is mostly high-handicap or beginner players"],
    greenFeeEst: "Enquire for current resort rates",
    priceEstimate: 550,
    nearbySlugs: ["pebble-beach-golf-links", "links-at-spanish-bay"],
    faqs: [
      {
        q: "Is Spyglass Hill harder than Pebble Beach Golf Links®?",
        a: "Spyglass Hill carries a higher rating (75.4) and slope (145) than Pebble Beach Golf Links®, and is widely regarded as the toughest course in the Pebble Beach Resorts® portfolio.",
      },
      {
        q: "What's the green fee at Spyglass Hill Golf Course®?",
        a: "Rates vary annually — enquire through us for current green fees.",
      },
      {
        q: "Who designed Spyglass Hill Golf Course®?",
        a: "Robert Trent Jones Sr. designed the course, which plays up to 6,960 yards with a 75.4 rating and 145 slope.",
      },
      {
        q: "How far in advance can I book Spyglass Hill Golf Course®?",
        a: "Without a resort stay, it can be booked 3 months out — a shorter window than the other Pebble Beach Resorts® courses aside from Pebble Beach Golf Links® itself.",
      },
      {
        q: "What's distinctive about the layout at Spyglass Hill?",
        a: "The front nine moves through coastal dunes before the back nine turns inland through Del Monte Forest pines, giving the round two distinct characters.",
      },
    ],
    pointers: [
      "Co-hosted the AT&T Pebble Beach Pro-Am from 1991 to 2009 alongside Pebble Beach Golf Links®.",
      "A 2014 renovation introduced native sandy waste areas and opened up the forest floor, widely praised by golf media afterward.",
      "Groups of 16 or more can book beyond the standard advance-booking window through the resort's Group Ambassador program.",
    ],
  },
  "links-at-spanish-bay": {
    slug: "links-at-spanish-bay",
    name: "The Links at Spanish Bay®",
    city: "Pebble Beach, CA",
    facility: "Pebble Beach Resorts®",
    par: 72,
    yards: "6,726 yards",
    rating: "73.7",
    slope: "143",
    holes: 18,
    designer: "Original design team; under a Gil Hanse-led transformation",
    type: "Resort (Pebble Beach Resorts®) — currently closed for renovation",
    address: "2700 17-Mile Drive, Pebble Beach, CA 93953",
    phone: "(800) 877-0597",
    website: "pebblebeach.com",
    hook: "Closed for a full Gil Hanse-led transformation — reopening April 17, 2027.",
    description: [
      "The Links at Spanish Bay® is currently closed for a comprehensive renovation led by architect Gil Hanse, Jim Wagner, and Hanse Golf Course Design. Construction began March 18, 2026, and Pebble Beach Company has confirmed a reopening date of April 17, 2027, a few months ahead of the U.S. Open's return to Pebble Beach Golf Links®.",
      "The transformation is intended to elevate the roughly 40-year-old course — historically a true links-style layout with firm, fast turf and coastal dunes character — to match the pedigree of the resort's other championship courses, while updating aging infrastructure including drainage and irrigation.",
      "The course is not currently bookable and does not appear in trip planning until it reopens. Check back after April 17, 2027, or contact us for the latest status.",
    ],
    highlights: [
      {
        label: "Currently closed",
        detail: "Under renovation since March 18, 2026, with a confirmed reopening date of April 17, 2027.",
      },
      {
        label: "Gil Hanse-led transformation",
        detail: "A full redesign by Gil Hanse, Jim Wagner, and Hanse Golf Course Design.",
      },
    ],
    bestFor: [],
    lessIdealIf: ["You want to book this course before it reopens — it is not currently available"],
    greenFeeEst: "Not applicable — course closed until April 17, 2027",
    nearbySlugs: ["pebble-beach-golf-links", "spyglass-hill"],
    gallery: [
      { src: "/images/courses/gallery/spanish-bay-2.webp", caption: "Hole 6 at The Links at Spanish Bay® — coastal dunes and Pacific exposure define this true links-style layout.", tag: "Hole 6" },
      { src: "/images/courses/gallery/spanish-bay-3.webp", caption: "The Links at Spanish Bay® before its Gil Hanse-led transformation — firm, fast links turf along the 17-Mile Drive.", tag: "Links character" },
      { src: "/images/courses/gallery/spanish-bay-4.webp", caption: "Hole 6 from the tee — The Links at Spanish Bay® plays directly along the Pacific, with ocean wind on every shot.", tag: "Hole 6 · Tee" },
      { src: "/images/courses/gallery/spanish-bay-bagpiper.webp", caption: "Each evening at dusk, a bagpiper plays on the 18th hole as the sun sets over the Pacific — a Pebble Beach Resorts® tradition unique to Spanish Bay.", tag: "Sunset tradition" },
    ],
    pointers: [
      "Each evening at dusk, a bagpiper walks the 18th hole as the sun sets over the Pacific — dine at The Inn at Spanish Bay, sit by the fire pits on the terrace, and watch the day end with the pipes playing. One of the most memorable non-golf moments on the peninsula.",
    ],
    faqs: [
      {
        q: "Is The Links at Spanish Bay® open right now?",
        a: "No. The course is closed for a full Gil Hanse-led renovation that began March 18, 2026. Pebble Beach Company has confirmed a reopening date of April 17, 2027.",
      },
      {
        q: "Can I book a round at The Links at Spanish Bay® for a trip before April 2027?",
        a: "No — the course is not currently bookable and doesn't appear as an option in our quote form until it reopens.",
      },
      {
        q: "What's changing in the renovation?",
        a: "Gil Hanse's team is transforming the course from its 1980s-era Scottish-inspired links layout into what Pebble Beach Company describes as a modern California coastal design, alongside infrastructure upgrades to drainage and irrigation.",
      },
      {
        q: "Should I plan a trip around the reopening?",
        a: "If your trip falls after April 17, 2027, get in touch and we can look at including it once it's confirmed open and bookable.",
      },
      {
        q: "What other Pebble Beach Resorts® courses are available in the meantime?",
        a: "Pebble Beach Golf Links®, Spyglass Hill Golf Course®, Del Monte Golf Course®, and The Hay™ remain open and bookable.",
      },
    ],
  },
  "del-monte-golf-course": {
    slug: "del-monte-golf-course",
    name: "Del Monte Golf Course®",
    city: "Monterey, CA",
    facility: "Pebble Beach Resorts®",
    par: 72,
    yards: "6,356 yards",
    rating: "71.8",
    slope: "129",
    holes: 18,
    designer: "Charles E. Maud (1897, original 9 holes)",
    type: "Resort (Pebble Beach Resorts®)",
    address: "2700 17-Mile Drive, Pebble Beach, CA 93953",
    phone: "(800) 877-0597",
    website: "pebblebeach.com",
    hook: "Originally laid out in 1897 — the oldest golf course in continuous use west of the Mississippi.",
    gallery: [
      { src: "/images/courses/gallery/del-monte-2.webp", caption: "Hole 10 at Del Monte Golf Course® — mature trees and classic parkland character on the peninsula's most historic layout.", tag: "Hole 10" },
      { src: "/images/courses/gallery/del-monte-3.webp", caption: "Del Monte Golf Course® in continuous operation since 1897 — the oldest golf course west of the Mississippi.", tag: "Historic layout" },
      { src: "/images/courses/gallery/del-monte-4.webp", caption: "The parkland fairways of Del Monte — a gentler, tree-lined test compared to the cliff-top resort courses nearby.", tag: "Parkland character" },
    ],
    description: [
      "Del Monte Golf Course® traces back to 1897, when Charles E. Maud designed the original 9 holes — making it the oldest golf course in continuous use west of the Mississippi. The course sits directly adjacent to the Hyatt Regency Monterey Hotel & Spa, which sits on the grounds.",
      "At par 72 and 6,356 yards (rating 71.8, slope 129), it plays as a gentler, more walkable round than the cliff-top Pebble Beach Resorts® courses — enquire for current green fees.",
    ],
    highlights: [
      {
        label: "Oldest course west of the Mississippi",
        detail: "Continuous play since 1897.",
      },
      {
        label: "Hyatt Regency Monterey on-site",
        detail: "The hotel sits directly on the course grounds.",
      },
      {
        label: "More accessible pricing",
        detail: "Among the more affordable Pebble Beach Resorts® courses.",
      },
    ],
    bestFor: ["Groups staying at the Hyatt Regency Monterey", "Mixed-handicap groups wanting a gentler historic round"],
    lessIdealIf: ["You specifically want a cliff-top coastal test"],
    greenFeeEst: "Enquire for current resort rates",
    priceEstimate: 150,
    nearbySlugs: [],
    faqs: [
      {
        q: "Why is Del Monte Golf Course® historically significant?",
        a: "It's the oldest golf course in continuous use west of the Mississippi, originally laid out in 1897 by Charles E. Maud.",
      },
      {
        q: "What's the green fee at Del Monte Golf Course®?",
        a: "Rates vary annually — enquire through us for current green fees.",
      },
      {
        q: "Which hotel is on Del Monte Golf Course®?",
        a: "The Hyatt Regency Monterey Hotel & Spa sits directly on the course grounds.",
      },
      {
        q: "How long is Del Monte Golf Course®?",
        a: "6,356 yards at par 72, with a 71.8 rating and 129 slope — a gentler, more walkable round than the cliff-top Pebble Beach Resorts® courses.",
      },
      {
        q: "How far in advance can I book Del Monte Golf Course®?",
        a: "Without a resort stay, it can be booked 6 months out.",
      },
    ],
  },
  "the-hay": {
    slug: "the-hay",
    name: "The Hay™",
    city: "Pebble Beach, CA",
    facility: "Pebble Beach Resorts®",
    par: 27,
    yards: "670 yards",
    rating: "70",
    slope: "110",
    holes: 9,
    designer: "Peter Hay (1957), redesigned by Tiger Woods and TGR Design (2021)",
    type: "Resort short course (Pebble Beach Resorts®)",
    address: "1700 17-Mile Drive, Pebble Beach, CA 93953",
    phone: "(800) 877-0597",
    website: "pebblebeach.com",
    hook: "A reimagined short course experience at Pebble Beach, redesigned by Tiger Woods and TGR Design in 2021.",
    description: [
      "The Hay™ originally opened in 1957 as Peter Hay Golf Course, and was completely overhauled and redesigned by Tiger Woods and TGR Design in 2021, reopening as The Hay™ — a 9-hole, par-27 short course experience.",
      "At 670 yards and rating 70/slope 110, it's a fast, approachable round suited to a relaxed afternoon, a warm-up before a championship round, or a lower-pressure addition to a group itinerary. Enquire for current green fees.",
    ],
    highlights: [
      {
        label: "Tiger Woods / TGR Design redesign",
        detail: "Completely reimagined in 2021 by Tiger Woods and TGR Design.",
      },
      {
        label: "Fast, relaxed round",
        detail: "9 holes, par 27 — a quick, approachable experience at Pebble Beach.",
      },
    ],
    bestFor: [
      "A relaxed warm-up or wind-down round",
      "Groups wanting a taste of Pebble Beach without a full 18-hole commitment",
      "Mixed-skill groups including beginners",
    ],
    lessIdealIf: ["You want a full 18-hole championship round — see Pebble Beach Golf Links® or Spyglass Hill®"],
    greenFeeEst: "Semi-private rates — enquire",
    priceEstimate: 75,
    nearbySlugs: ["pebble-beach-golf-links"],
    faqs: [
      {
        q: "Is The Hay™ a full 18-hole course?",
        a: "No. The Hay™ is a 9-hole, par-27 short course — a reimagined experience at Pebble Beach, not a primary championship round.",
      },
      {
        q: "Who redesigned The Hay™?",
        a: "Tiger Woods and TGR Design completely redesigned the course in 2021. It originally opened in 1957 as Peter Hay Golf Course.",
      },
      {
        q: "What's the green fee at The Hay™?",
        a: "Rates vary — contact us or Pasatiempo directly for current green fees.",
      },
      {
        q: "How far in advance can I book The Hay™?",
        a: "Without a resort stay, it can be booked 6 months out, the same window as the other non-Pebble-Beach-Golf-Links resort courses.",
      },
      {
        q: "Is The Hay™ good for a group with mixed experience levels?",
        a: "Yes — its short, 9-hole par-27 format makes it approachable for beginners while still giving experienced golfers a fun, fast round at Pebble Beach.",
      },
    ],
  },
};

