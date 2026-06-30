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
    designer: "Gen. Robert B. McClure (1954), redesigned by Gene Bates (2007)",
    type: "Semi-private / public",
    address: "1 McClure Way, Seaside, CA 93955",
    phone: "(831) 899-7271",
    website: "bayonetblackhorse.com",
    hook:
      "The military-heritage championship at former Fort Ord — one of the toughest public courses in the country.",
    description: [
      "Bayonet sits on the grounds of the former Fort Ord military base, purchased by the US Army in 1917. General Robert B. McClure, the post's commanding officer, designed the course in 1954 — reportedly to suit his own left-handed game. Hole 15, part of a demanding stretch that runs holes 11 through 15, carries the course's famous \"Combat Corner\" nickname. The course is named for the 7th Infantry, the \"Bayonet Division.\"",
      "Fort Ord was decommissioned in the 1990s, and Bayonet opened to public play on January 16, 1997. A Gene Bates redesign completed in 2007 refreshed the layout while keeping the demanding, military-pedigree character intact.",
      "At 7,024 yards from the back tees (rating 74.8, slope 139), Bayonet is ranked among the toughest public courses in the country — Golf Digest placed it No. 35 nationwide on its list of the 50 Toughest Golf Courses in the United States. It's hosted PGA Tour qualifiers and players including Billy Andrade, Arnold Palmer, Jack Nicklaus, and Tom Watson, and a Nationwide Tour event (the Monterey Peninsula Classic) was held here from 2000 to 2003. Note: independent sources differ on Bayonet's exact yardage — Golf Digest, TeeOff, and other third-party sites list it at 7,104 yards rather than 7,024; the figure here follows direct verification against the official facility, but this is worth re-confirming against the current scorecard.",
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
    greenFeeEst: "~$195 with cart",
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
        a: "Estimated around $195 with cart, though rates vary seasonally — always verify current pricing before booking.",
      },
      {
        q: "Can groups book Bayonet?",
        a: "Yes, Bayonet accommodates group events. Contact the facility directly or work with Monterey Golf Tours to coordinate tee times as part of a planned trip.",
      },
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
    description: [
      "Black Horse shares its origin with Bayonet on the grounds of the former Fort Ord military base. Designed alongside Bayonet by General Robert B. McClure in 1954 and refreshed in a 2007 Gene Bates redesign, Black Horse offers fescue-framed fairways and sweeping views of Monterey Bay throughout the round.",
      "Where Bayonet has built its reputation as one of the toughest public tests in the country, Black Horse plays as the more approachable of the two Fort Ord courses — still a genuine championship-caliber layout, but with a bit more forgiveness for a wider range of handicaps.",
      "Both courses operate under the same Bayonet & Black Horse facility, 5 miles from downtown Monterey, and are a natural multi-round pairing for groups spending a few days on the peninsula.",
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
    ],
    bestFor: [
      "Groups wanting a genuine test without Bayonet's full difficulty",
      "Mid-handicap players",
      "Pairing with a Bayonet round for a two-course Fort Ord day",
    ],
    lessIdealIf: [
      "You specifically want the hardest test on the peninsula (that's Bayonet)",
    ],
    greenFeeEst: "~$165 with cart",
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
        a: "Estimated around $165 with cart, though rates vary seasonally — always verify current pricing before booking.",
      },
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
    greenFeeEst: "~$195 (rates vary by season — verify before booking)",
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
        a: "Around $195, though rates vary by season and tee time — always verify current pricing before booking.",
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
    designer: "Robert Muir Graves",
    type: "Resort / semi-private",
    address: "8205 Valley Greens Dr, Carmel, CA 93923",
    phone: "(831) 624-2888",
    website: "quaillodge.com/golf",
    hook:
      "A resort round in the Carmel Valley sun, threaded around 10 man-made lakes, away from the coastal marine layer.",
    description: [
      "Quail Lodge & Golf Club plays through Carmel Valley's warmer inland climate, with 10 man-made lakes woven through the layout — a defining feature of the course. At par 71 and 6,500 yards, it's a resort-style round that rewards accuracy around the water hazards.",
      "Green fees here are dynamic rather than fixed, generally averaging in the $100–$150 range on weekends depending on season and tee time — worth confirming current pricing directly before booking a group round.",
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
    ],
    bestFor: [
      "Groups wanting a warm-weather resort round",
      "Players who enjoy water-feature strategic golf",
      "Stay-and-play groups based at Quail Lodge",
    ],
    lessIdealIf: ["You're looking for a links-style or coastal-fog round"],
    greenFeeEst: "Dynamic pricing, ~$100–$150 on weekends (verify current rates)",
    nearbySlugs: ["carmel-valley-ranch"],
    faqs: [
      {
        q: "What's distinctive about Quail Lodge's layout?",
        a: "The course is threaded around 10 man-made lakes, a defining feature that rewards accurate shot-making.",
      },
      {
        q: "What's the green fee at Quail Lodge?",
        a: "Pricing is dynamic rather than a fixed rate, generally averaging $100–$150 on weekends — confirm current pricing directly before booking.",
      },
      {
        q: "Is Quail Lodge open to non-resort guests?",
        a: "Yes, it operates as a semi-private resort course with availability for outside play alongside resort guests.",
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
    holes: 18,
    designer: "—",
    type: "Daily-fee",
    address: "10520 York Rd, Monterey, CA 93940",
    phone: "(831) 373-3701",
    website: "lagunasecagolf.com",
    hook: "An accessible daily-fee round close to downtown Monterey, with rates that won't strain a group budget.",
    description: [
      "Laguna Seca Golf Ranch offers a straightforward, accessible daily-fee round close to downtown Monterey. At par 71 and 6,226 yards, it's well suited to groups wanting a relaxed pace and approachable green fees without sacrificing a genuine 18-hole round.",
      "Weekday rates run $58, with weekend rates at $78 — among the more budget-friendly options on the peninsula, making it a natural fit for the early or closing round of a multi-day group trip.",
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
    ],
    bestFor: [
      "Groups watching their overall trip budget",
      "A relaxed-pace round to open or close a multi-day trip",
      "Beginners and mixed-skill groups",
    ],
    lessIdealIf: ["You want a marquee, bucket-list championship test"],
    greenFeeEst: "$58 weekday / $78 weekend",
    nearbySlugs: ["pacific-grove-golf-links"],
    faqs: [
      {
        q: "What's the green fee at Laguna Seca?",
        a: "$58 Monday through Thursday, $78 on weekends.",
      },
      {
        q: "How far is Laguna Seca from downtown Monterey?",
        a: "It's close to downtown Monterey, making it convenient for groups based in the city.",
      },
    ],
  },
  "pacific-grove-golf-links": {
    slug: "pacific-grove-golf-links",
    name: "Pacific Grove Golf Links",
    city: "Pacific Grove, CA",
    facility: "Pacific Grove Golf Links",
    par: 70,
    yards: "5,727 yards",
    holes: 18,
    designer: "—",
    type: "Municipal",
    address: "77 Asilomar Ave, Pacific Grove, CA 93950",
    phone: "(831) 648-5775",
    website: "playpacificgrove.com",
    hook: "Ocean holes on a municipal budget — a coastal links round without the private-club price tag.",
    description: [
      "Pacific Grove Golf Links is a city-owned municipal course offering genuine ocean-adjacent holes at a fraction of the cost of the peninsula's private and resort courses. At par 70 and 5,727 yards, it's a shorter, walkable layout well suited to groups of mixed ability.",
      "Rates run $66 Monday through Thursday and $89 Friday through Sunday — making it one of the better value-for-experience rounds on the Monterey Peninsula.",
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
    ],
    bestFor: [
      "Budget-conscious groups",
      "Mixed-handicap groups wanting a relaxed pace",
      "Anyone wanting ocean views without the premium price tag",
    ],
    lessIdealIf: ["You want a long, championship-length test"],
    greenFeeEst: "$66 Mon–Thu / $89 Fri–Sun",
    nearbySlugs: ["laguna-seca-golf-ranch"],
    faqs: [
      {
        q: "Is Pacific Grove Golf Links on the ocean?",
        a: "Yes, the course includes ocean-adjacent holes, offering coastal views at municipal course pricing.",
      },
      {
        q: "What's the green fee at Pacific Grove?",
        a: "$66 Monday through Thursday, $89 Friday through Sunday.",
      },
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
    description: [
      "Poppy Hills Golf Course sits inside the Del Monte Forest — the same storied Pebble Beach zip code as the resort's marquee courses — but is owned and operated by the Northern California Golf Association (NCGA), not Pebble Beach Company, and doesn't carry the resort's gate fee or pricing.",
      "At 7,091 yards from the Jones tees and par 71, the Robert Trent Jones II design plays through forested terrain with bentgrass greens. Rates run $95 Monday through Thursday and $125 Friday through Sunday.",
    ],
    highlights: [
      {
        label: "Del Monte Forest setting",
        detail: "Same legendary zip code as Pebble Beach Resorts' courses.",
      },
      {
        label: "NCGA-owned",
        detail: "Owned by the Northern California Golf Association, not Pebble Beach Company — no resort gate fee.",
      },
      {
        label: "Bentgrass greens",
        detail: "Quality conditioning at daily-fee pricing.",
      },
    ],
    bestFor: [
      "Groups wanting the Pebble Beach area experience at daily-fee pricing",
      "Mid to low-handicap players",
    ],
    lessIdealIf: ["You specifically want a Pebble Beach Company-branded course"],
    greenFeeEst: "$95 Mon–Thu / $125 Fri–Sun",
    nearbySlugs: [],
    faqs: [
      {
        q: "Is Poppy Hills owned by Pebble Beach Company?",
        a: "No. Poppy Hills is owned and operated by the Northern California Golf Association (NCGA), separate from Pebble Beach Company, despite sitting in the same Del Monte Forest area.",
      },
      {
        q: "What's the green fee at Poppy Hills?",
        a: "$95 Monday through Thursday, $125 Friday through Sunday.",
      },
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
    description: [
      "Pebble Beach Golf Links® was designed by two amateur golfers, Jack Neville and Douglas Grant, opening on February 22, 1919. It remains the most recognized golf course in the country, with a string of holes running directly along the Pacific coastline.",
      "Tee options range from the 6,802-yard blue tees (rating 74.9, slope 144) down to shorter sets for a range of player abilities. Green fees are a flat $695 for both resort and non-resort players, with a mandatory $60 per-person cart fee for non-resort guests, plus optional caddie services.",
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
    greenFeeEst: "$695 flat rate (+ $60/person cart fee for non-resort guests)",
    nearbySlugs: ["spyglass-hill", "links-at-spanish-bay"],
    faqs: [
      {
        q: "What's the green fee at Pebble Beach Golf Links®?",
        a: "A flat $695, applying to both resort and non-resort players, seven days a week. Non-resort guests pay an additional mandatory $60 per-person cart fee.",
      },
      {
        q: "Who designed Pebble Beach Golf Links®?",
        a: "Two amateur golfers, Jack Neville and Douglas Grant, designed the course, which opened on February 22, 1919.",
      },
      {
        q: "How do I book a round at Pebble Beach Golf Links®?",
        a: "Monterey Golf Tours, as an IAGTO-contracted partner with Pebble Beach Resorts®, can coordinate tee times as part of a planned group trip.",
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
    description: [
      "Spyglass Hill Golf Course® was designed by Robert Trent Jones Sr., playing up to 6,960 yards from the championship tees with a rating of 75.4 and slope of 145 — figures that back up its reputation as the most demanding course among the Pebble Beach Resorts® properties.",
      "The front nine moves through coastal dunes before the back nine turns inland through Del Monte Forest pines, giving the round two distinct characters. Green fees run a flat $550 per round, seven days a week.",
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
    greenFeeEst: "$550 flat rate",
    nearbySlugs: ["pebble-beach-golf-links", "links-at-spanish-bay"],
    faqs: [
      {
        q: "Is Spyglass Hill harder than Pebble Beach Golf Links®?",
        a: "Spyglass Hill carries a higher rating (75.4) and slope (145) than Pebble Beach Golf Links®, and is widely regarded as the toughest course in the Pebble Beach Resorts® portfolio.",
      },
      {
        q: "What's the green fee at Spyglass Hill Golf Course®?",
        a: "A flat $550 per round, seven days a week.",
      },
    ],
  },
  "links-at-spanish-bay": {
    slug: "links-at-spanish-bay",
    name: "The Links at Spanish Bay™",
    city: "Pebble Beach, CA",
    facility: "Pebble Beach Resorts®",
    par: 72,
    yards: "6,726 yards",
    rating: "73.7",
    slope: "143",
    holes: 18,
    designer: "Original design team; recent transformation led by Gil Hanse",
    type: "Resort (Pebble Beach Resorts®)",
    address: "2700 17-Mile Drive, Pebble Beach, CA 93953",
    phone: "(800) 877-0597",
    website: "pebblebeach.com",
    hook: "A true links-style course on the Monterey Peninsula, recently transformed by architect Gil Hanse.",
    description: [
      "The Links at Spanish Bay™ plays as genuine links-style golf — firm, fast turf and coastal dunes character that's rare on the California coast. The course recently underwent a multi-million dollar transformation led by architect Gil Hanse.",
      "At par 72 and 6,726 yards (rating 73.7, slope 143), the course is priced at $350 per player for 18 holes.",
    ],
    highlights: [
      {
        label: "True links-style golf",
        detail: "Firm, fast, dune-bordered turf, rare on the California coast.",
      },
      {
        label: "Gil Hanse transformation",
        detail: "A recent multi-million dollar redesign led by the acclaimed modern architect.",
      },
    ],
    bestFor: ["Links-golf enthusiasts", "Groups wanting variety alongside the parkland/cliff-top Pebble Beach courses"],
    lessIdealIf: ["You're not familiar with or don't enjoy firm, fast links-style conditions"],
    greenFeeEst: "$350 per player",
    nearbySlugs: ["pebble-beach-golf-links", "spyglass-hill"],
    faqs: [
      {
        q: "What's the green fee at The Links at Spanish Bay™?",
        a: "$350 per player for 18 holes.",
      },
      {
        q: "What makes The Links at Spanish Bay™ different from the other Pebble Beach Resorts® courses?",
        a: "It plays as true links-style golf — firm, fast turf and dune-bordered holes — distinct from the cliff-top and forest character of the resort's other courses. It was recently transformed by architect Gil Hanse.",
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
    description: [
      "Del Monte Golf Course® traces back to 1897, when Charles E. Maud designed the original 9 holes — making it the oldest golf course in continuous use west of the Mississippi. The course sits directly adjacent to the Hyatt Regency Monterey Hotel & Spa, which sits on the grounds.",
      "At par 72 and 6,356 yards (rating 71.8, slope 129), it plays as a gentler, more walkable round than the cliff-top Pebble Beach Resorts® courses, with green fees of $150 weekday and $175 weekend.",
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
    greenFeeEst: "$150 weekday / $175 weekend",
    nearbySlugs: [],
    faqs: [
      {
        q: "Why is Del Monte Golf Course® historically significant?",
        a: "It's the oldest golf course in continuous use west of the Mississippi, originally laid out in 1897 by Charles E. Maud.",
      },
      {
        q: "What's the green fee at Del Monte Golf Course®?",
        a: "$150 on weekdays, $175 on weekends.",
      },
      {
        q: "Which hotel is on Del Monte Golf Course®?",
        a: "The Hyatt Regency Monterey Hotel & Spa sits directly on the course grounds.",
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
      "At 670 yards and rating 70/slope 110, it's a fast, approachable round suited to a relaxed afternoon, a warm-up before a championship round, or a lower-pressure addition to a group itinerary. Green fees run $75 weekday and $80 weekend.",
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
    greenFeeEst: "$75 weekday / $80 weekend",
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
        a: "$75 on weekdays, $80 on weekends.",
      },
    ],
  },
};
