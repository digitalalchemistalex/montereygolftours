// Experience pages for Pebble Beach Resorts® — non-golf activities bookable
// as part of a Monterey Golf Tours trip.
// All images licensed via Pebble Beach Company Leisure Travel Sales Collection.

export type ExperienceImage = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  photographer: string;
  category: string;
  tag?: string;
};

export type Experience = {
  slug: string;
  name: string;
  headline: string;
  hook: string;
  description: string[];
  images: ExperienceImage[];
  faqs: { q: string; a: string }[];
  schema: {
    type: string; // TouristAttraction sub-type label
    address: string;
  };
};

export const EXPERIENCES: Record<string, Experience> = {

  "dining-at-pebble-beach": {
    slug: "dining-at-pebble-beach",
    name: "Dining at Pebble Beach Resorts\u00ae",
    headline: "Ten restaurants. One coastline.",
    hook: "From Stillwater Bar & Grill overlooking the 18th fairway to the evening fire pits at Peppoli, dining at Pebble Beach Resorts\u00ae is part of the trip — not an afterthought.",
    description: [
      "Pebble Beach Resorts\u00ae operates ten dining venues across The Lodge at Pebble Beach\u2122 and The Inn at Spanish Bay\u2122. The range runs from Stillwater Bar & Grill — one of the most photographed dining rooms in American golf, with floor-to-ceiling windows on the Pacific and the 18th fairway — to the casual Hay\'s Place beside The Hay\u2122 short course.",
      "Peppoli at The Inn at Spanish Bay\u2122 serves Italian coastal cuisine with Pacific views from the Peppoli Lawn, one of the most dramatic outdoor dining settings in California. Terrace Lounge at The Lodge offers lighter fare and cocktails with direct views over the 18th green. The Gallery Cafe and Sticks (with its terrace fire pits) round out the daytime options at The Lodge.",
      "For groups, the private dining and event spaces at both properties can accommodate from intimate dinners to full buyouts. Tasting menus, wine cellar dinners at Stave, and private beach bonfires can all be arranged through Monterey Golf Tours as part of a planned trip.",
    ],
    images: [
      { src: "/images/pbc-portal/stillwater--january-2026.jpg", alt: "Stillwater Bar & Grill, The Lodge at Pebble Beach\u2122, Pebble Beach, CA \u2014 dining room with Pacific Ocean views", caption: "Stillwater Bar & Grill at The Lodge at Pebble Beach\u2122 \u2014 panoramic Pacific Ocean views from the dining room, steps from the 18th green.", credit: "Photo by Taylor Mahon", photographer: "Taylor Mahon", category: "The Lodge", tag: "Stillwater Bar & Grill" },
      { src: "/images/pbc-portal/peppoli_2026_interior_decor.jpg", alt: "Peppoli restaurant interior, The Inn at Spanish Bay\u2122, Pebble Beach, CA", caption: "Peppoli at The Inn at Spanish Bay\u2122 \u2014 Italian coastal cuisine with views across the Peppoli Lawn to the Pacific.", credit: "Photo by Sherman Chu", photographer: "Sherman Chu", category: "The Inn", tag: "Peppoli" },
      { src: "/images/pbc-portal/terrace-lounge.jpg", alt: "Terrace Lounge at The Inn at Spanish Bay™, Pebble Beach, CA — oceanfront bar with Pacific views", caption: "The Terrace Lounge at The Inn at Spanish Bay™ — cocktails with direct Pacific Ocean views overlooking the Links at Spanish Bay.", credit: "Photo by Sherman Chu", photographer: "Sherman Chu", category: "The Lodge", tag: "Terrace Lounge" },
      { src: "/images/pbc-portal/gallerycafe_2021_exterior_food.jpg", alt: "Gallery Cafe exterior food service, The Lodge at Pebble Beach\u2122, Pebble Beach, CA", caption: "Gallery Cafe at The Lodge at Pebble Beach\u2122 \u2014 casual daytime dining at the heart of the resort.", credit: "Photo by Sherman Chu", photographer: "Sherman Chu", category: "The Lodge", tag: "Gallery Cafe" },
      { src: "/images/pbc-portal/sticks_2023_interior_decor.jpg", alt: "Sticks restaurant interior at The Lodge at Pebble Beach™ — dining room with Pacific Ocean and Links at Spanish Bay views", caption: "Sticks at The Lodge at Pebble Beach\u2122 \u2014 casual dining with terrace fire pits overlooking the Pacific.", credit: "Photo by Sherman Chu", photographer: "Sherman Chu", category: "The Lodge", tag: "Sticks" },
      { src: "/images/pbc-portal/sticks_2023_exterior_firepits.jpg", alt: "Sticks restaurant exterior fire pits, The Lodge at Pebble Beach\u2122, Pebble Beach, CA", caption: "The fire pits at Sticks, The Lodge at Pebble Beach\u2122 \u2014 one of the best sunset spots at Pebble Beach Resorts\u00ae.", credit: "Photo by Sherman Chu", photographer: "Sherman Chu", category: "The Lodge", tag: "Sticks · Fire Pits" },
      { src: "/images/pbc-portal/stave_2014_interior_decor.jpg", alt: "Stave Wine Cellar, The Inn at Spanish Bay\u2122, Pebble Beach, CA", caption: "Stave Wine Cellar at The Inn at Spanish Bay\u2122 \u2014 curated wine selection in an intimate cellar setting.", credit: "Photo by Randy Tunnell", photographer: "Randy Tunnell", category: "The Inn", tag: "Stave Wine Cellar" },
      { src: "/images/pbc-portal/traps_2023_interior_decor.jpg", alt: "Traps restaurant interior, The Lodge at Pebble Beach\u2122, Pebble Beach, CA", caption: "Traps at The Lodge at Pebble Beach\u2122 \u2014 the casual 19th-hole bar beside the first tee.", credit: "Photo by Sherman Chu", photographer: "Sherman Chu", category: "The Lodge", tag: "Traps" },
      { src: "/images/pbc-portal/haysplace_2021_exterior_firepits.jpg", alt: "Hay\'s Place restaurant exterior fire pits, The Hay\u2122, Pebble Beach, CA", caption: "Hay\'s Place beside The Hay\u2122 short course \u2014 the most casual dining spot at Pebble Beach Resorts\u00ae, with fire pits and Pacific views.", credit: "Photo by Sherman Chu", photographer: "Sherman Chu", category: "The Hay", tag: "Hay\'s Place" },
      { src: "/images/pbc-portal/juicebar_2024_exterior.jpg", alt: "The Spa Juice Bar exterior at Pebble Beach Resorts®, Pebble Beach, CA", caption: "The Spa Juice Bar at Pebble Beach Resorts® — healthy dining available to spa guests and resort visitors.", credit: "Photo by Sherman Chu", photographer: "Sherman Chu", category: "The Lodge", tag: "Juice Bar" },
    ],
    faqs: [
      { q: "Do I need a reservation for Stillwater Bar & Grill?", a: "Stillwater Bar & Grill is one of the most sought-after tables at Pebble Beach Resorts\u00ae, particularly at sunset. Reservations are strongly recommended. Monterey Golf Tours can assist with dining reservations for groups as part of a planned trip." },
      { q: "Can Pebble Beach Resorts\u00ae accommodate private group dinners?", a: "Yes. Both The Lodge at Pebble Beach\u2122 and The Inn at Spanish Bay\u2122 have private dining rooms and event spaces that can accommodate intimate group dinners, wine cellar experiences at Stave, and larger banquets. Contact us for group dining coordination." },
      { q: "Is breakfast included with hotel stays at Pebble Beach Resorts\u00ae?", a: "Breakfast is not automatically included in standard room rates at Pebble Beach Resorts\u00ae. However, stay-and-play packages arranged through Monterey Golf Tours can include dining credits and breakfast options." },
    ],
    schema: { type: "FoodEstablishment", address: "1700 17-Mile Drive, Pebble Beach, CA 93953" },
  },

  "the-spa-at-pebble-beach": {
    slug: "the-spa-at-pebble-beach",
    name: "The Spa at Pebble Beach\u2122",
    headline: "22,000 sq ft. Forbes Five-Star.",
    hook: "The Spa at Pebble Beach\u2122 is the full-service recovery facility that turns a golf trip into something your body remembers for different reasons.",
    description: [
      "The Spa at Pebble Beach\u2122 spans 22,000 square feet and holds a Forbes Travel Guide Five-Star rating \u2014 one of fewer than 100 spas in the world to hold this designation. It operates from The Lodge at Pebble Beach\u2122 but is accessible to guests of all three Pebble Beach Resorts\u00ae properties via a complimentary shuttle.",
      "The facility includes 15 massage rooms, 5 facial rooms, a full salon, a barber, a co-ed relaxation lounge, a whirlpool, cold plunge tubs, a steam room, and a dry sauna. Sports massage and recovery treatments are designed specifically for golfers \u2014 targeting the back, shoulder, and hip rotation areas that take the most stress over a multi-round trip.",
      "Day-spa access can be arranged as a standalone booking or as part of a Monterey Golf Tours package. Non-golfers in the group often spend their on-course days here. Private spa buyouts for corporate groups can also be arranged.",
    ],
    images: [
      { src: "/images/pbc-portal/spa_2024_interior_lockerroom.jpg", alt: "The Spa at Pebble Beach\u2122 locker room, Pebble Beach, CA \u2014 Forbes Five-Star", caption: "The locker room at The Spa at Pebble Beach\u2122 \u2014 22,000 sq ft, Forbes Five-Star rated.", credit: "Photo by Sherman Chu", photographer: "Sherman Chu", category: "Locker Rooms", tag: "Locker Room" },
      { src: "/images/pbc-portal/spa_2024_interior_lockerroom-1.jpg", alt: "The Spa at Pebble Beach™ vanity and grooming area, Pebble Beach, CA", caption: "The vanity and grooming area at The Spa at Pebble Beach™ — full salon services including hair, nail, and skin treatments.", credit: "Photo by Sherman Chu", photographer: "Sherman Chu", category: "Locker Rooms", tag: "Locker Room" },
      { src: "/images/pbc-portal/spa_2024_interior_whirlpool.jpg", alt: "The Spa at Pebble Beach\u2122 whirlpool, Pebble Beach, CA", caption: "The whirlpool at The Spa at Pebble Beach\u2122 \u2014 part of the hydrotherapy circuit.", credit: "Photo by Sherman Chu", photographer: "Sherman Chu", category: "Hydrotherapy", tag: "Whirlpool" },
      { src: "/images/pbc-portal/spa_2024_interior_coldplungetubs.jpg", alt: "Cold plunge tubs at The Spa at Pebble Beach\u2122, Pebble Beach, CA", caption: "Cold plunge tubs at The Spa at Pebble Beach\u2122 \u2014 recovery circuit for golfers.", credit: "Photo by Sherman Chu", photographer: "Sherman Chu", category: "Hydrotherapy", tag: "Cold Plunge" },
      { src: "/images/pbc-portal/spa_2024_interior_coldplungetubs_whirlpool.jpg", alt: "Cold plunge tubs and whirlpool at The Spa at Pebble Beach\u2122, Pebble Beach, CA", caption: "The hydrotherapy circuit at The Spa at Pebble Beach\u2122 \u2014 cold plunge and whirlpool.", credit: "Photo by Sherman Chu", photographer: "Sherman Chu", category: "Hydrotherapy", tag: "Hydrotherapy" },
    ],
    faqs: [
      { q: "Do I need to be a hotel guest to use The Spa at Pebble Beach\u2122?", a: "Day-spa access is available to non-hotel guests by appointment. Guests of The Lodge at Pebble Beach\u2122, The Inn at Spanish Bay\u2122, and Casa Palmero\u00ae can all access the spa via complimentary shuttle. Monterey Golf Tours can arrange spa bookings as part of a trip." },
      { q: "What spa treatments are best for golfers?", a: "The Spa offers golf-specific sports massage targeting the back, shoulders, and hips. Many groups schedule a treatment on their travel day or their rest day mid-trip. Ask us about recovery day planning when building your itinerary." },
      { q: "Can the spa accommodate a full corporate group?", a: "Private spa buyouts for corporate groups can be arranged directly through Pebble Beach Resorts\u00ae event services. Monterey Golf Tours can coordinate this alongside your golf and accommodation booking." },
    ],
    schema: { type: "HealthAndBeautyBusiness", address: "1700 17-Mile Drive, Pebble Beach, CA 93953" },
  },

  "17-mile-drive": {
    slug: "17-mile-drive",
    name: "17-Mile Drive\u00ae",
    headline: "The most famous private road in American golf.",
    hook: "17-Mile Drive\u00ae connects the Pebble Beach gate to every course, every hotel, and every iconic view on the peninsula. Most golfers drive it twice a day without stopping. Stop.",
    description: [
      "17-Mile Drive\u00ae is the scenic private road that runs through the Del Monte Forest, past the Pacific coastline, and connects all five golf courses and three hotels at Pebble Beach Resorts\u00ae. The drive is accessible to hotel guests and day visitors (a fee applies for non-guests not playing golf).",
      "The named stops along the route are worth the time: Bird Rock, where harbor seals and cormorants gather on the offshore rocks; Fanshell Beach, a secluded cove; the Ghost Tree, a weathered Monterey cypress above a surge channel on the cliffs; Ford Meadow, where deer graze in the open; and the Lone Cypress\u2122, the most photographed tree in North America, perched on a granite outcrop above the sea.",
      "Wildlife is everywhere along the route \u2014 deer are a daily sighting, sea otters float in the kelp beds off Stillwater Cove, and the occasional whale passes the headlands during migration season. For groups, a guided 17-Mile Drive\u00ae tour can be arranged as part of a Monterey Golf Tours itinerary.",
    ],
    images: [
      { src: "/images/pbc-portal/17md_2016_coastline.jpg", alt: "Pacific coastline along 17-Mile Drive\u00ae, Pebble Beach, CA", caption: "The Pacific coastline along 17-Mile Drive\u00ae \u2014 the road runs directly along the clifftops for several miles.", credit: "Photo by Kevin Merfeld - PBC", photographer: "Kevin Merfeld", category: "Coastline", tag: "Pacific Coast" },
      { src: "/images/pbc-portal/17md_2016_birdrock.jpg", alt: "Bird Rock on 17-Mile Drive\u00ae, Pebble Beach, CA \u2014 harbor seals and cormorants", caption: "Bird Rock on 17-Mile Drive\u00ae \u2014 harbor seals, sea lions, and cormorants gather on the offshore rocks.", credit: "Photo by Kevin Merfeld - PBC", photographer: "Kevin Merfeld", category: "Stops", tag: "Bird Rock" },
      { src: "/images/pbc-portal/17md_2016_fanshellbeach.jpg", alt: "17-Mile Drive® road along Fanshell Beach, Pebble Beach, CA — ice plant and sandy shore at dawn", caption: "The road along Fanshell Beach on 17-Mile Drive® — one of the most scenic stretches of the drive, with ice plant and beach at dawn.", credit: "Photo by Kevin Merfeld - PBC", photographer: "Kevin Merfeld", category: "Stops", tag: "Fanshell Beach" },
      { src: "/images/pbc-portal/17md_2016_fordmeadow.jpg", alt: "Tree-lined 17-Mile Drive® through Del Monte Forest, Pebble Beach, CA — Monterey cypress canopy", caption: "The tree-lined section of 17-Mile Drive® through Del Monte Forest — Monterey cypress canopy shades this iconic stretch of road near Ford Meadow.", credit: "Photo by Kevin Merfeld - PBC", photographer: "Kevin Merfeld", category: "Stops", tag: "Ford Meadow" },
      { src: "/images/pbc-portal/17-mile-drive---ghost-tree-stop.jpg", alt: "Ghost Tree stop on 17-Mile Drive\u00ae, Pebble Beach, CA \u2014 Monterey cypress", caption: "The Ghost Tree \u2014 a weathered Monterey cypress above a surge channel on the 17-Mile Drive\u00ae clifftops.", credit: "Photo by Joann Dost", photographer: "Joann Dost", category: "Stops", tag: "Ghost Tree" },
      { src: "/images/pbc-portal/17-mile-drive-wildlife---deer.jpg", alt: "Deer along 17-Mile Drive\u00ae, Pebble Beach, CA \u2014 Monterey Peninsula wildlife", caption: "Deer along 17-Mile Drive\u00ae \u2014 wildlife encounters are a daily occurrence on the Pebble Beach Resorts\u00ae property.", credit: "Photo by Christine Bush", photographer: "Christine Bush", category: "Wildlife", tag: "Wildlife" },
    ],
    faqs: [
      { q: "Is 17-Mile Drive\u00ae included with a hotel stay at Pebble Beach Resorts\u00ae?", a: "Yes \u2014 hotel guests at The Lodge at Pebble Beach\u2122, The Inn at Spanish Bay\u2122, and Casa Palmero\u00ae have complimentary access to 17-Mile Drive\u00ae. Day visitors and non-golfing guests pay a gate fee, which is credited against any restaurant purchase of $35 or more." },
      { q: "How long does it take to drive 17-Mile Drive\u00ae properly?", a: "The full drive with stops takes 1.5 to 2 hours. The named stops \u2014 Bird Rock, Fanshell Beach, Ghost Tree, Ford Meadow, and the Lone Cypress\u2122 \u2014 each deserve 10 to 15 minutes. Early morning is best for wildlife and lighting." },
      { q: "Can Monterey Golf Tours arrange a guided 17-Mile Drive\u00ae tour?", a: "Yes. A guided tour can be arranged as part of a Monterey Golf Tours itinerary, particularly useful for corporate groups or non-golfers in the party. Ask us when building your custom quote." },
    ],
    schema: { type: "TouristAttraction", address: "17-Mile Drive, Pebble Beach, CA 93953" },
  },

  "pebble-beach-golf-academy": {
    slug: "pebble-beach-golf-academy",
    name: "Pebble Beach Golf Academy\u2122",
    headline: "Instruction at one of the most recognized ranges in American golf.",
    hook: "The Pebble Beach Golf Academy\u2122 offers instruction programs and practice facilities for every level \u2014 from the first-time visitor who wants a lesson before playing The Hay\u2122, to the competitive player working on specific swing mechanics.",
    description: [
      "The Pebble Beach Golf Academy\u2122 occupies the practice complex adjacent to The Lodge at Pebble Beach\u2122, with a full driving range, short game area, and putting greens. The Academy offers private lessons, group clinics, and multi-day instruction programs with PGA-certified instructors.",
      "The facility features a robotic swing trainer \u2014 one of the most advanced instruction tools at any resort golf academy \u2014 alongside video analysis, TrackMan launch monitor bays, and on-course playing lessons at The Hay\u2122 and Pebble Beach Golf Links\u00ae.",
      "For group trips, a group clinic at the Academy is an effective warm-up for a first day\u2019s golf \u2014 particularly for corporate groups with a mix of skill levels. Monterey Golf Tours can incorporate Academy sessions into any itinerary.",
    ],
    images: [
      { src: "/images/pbc-portal/pebble-beach-golf-academy--driving-range-photo-credit----tgo.jpg", alt: "Pebble Beach Golf Academy\u2122 driving range, Pebble Beach, CA", caption: "The driving range at Pebble Beach Golf Academy\u2122 \u2014 TrackMan bays, PGA instruction, and practice facilities for all levels.", credit: "© TGO", photographer: "TGO", category: "Facilities", tag: "Driving Range" },
      { src: "/images/pbc-portal/pebble-beach-golf-academy--robotic-swing-trainer-photo-credit----tgo.jpg", alt: "Robotic swing trainer at Pebble Beach Golf Academy\u2122, Pebble Beach, CA", caption: "The robotic swing trainer at Pebble Beach Golf Academy\u2122 \u2014 cutting-edge instruction technology at Pebble Beach Resorts\u00ae.", credit: "© TGO", photographer: "TGO", category: "Facilities", tag: "Robotic Trainer" },
    ],
    faqs: [
      { q: "Do I need to be a hotel guest to use the Pebble Beach Golf Academy\u2122?", a: "No. The Pebble Beach Golf Academy\u2122 is open to all resort guests and the public. Lesson bookings are available directly through the Academy or through Monterey Golf Tours as part of a trip itinerary." },
      { q: "What instruction options are available?", a: "The Academy offers 30-minute and 60-minute private lessons, group clinics, half-day and full-day schools, and on-course playing lessons at The Hay\u2122. TrackMan launch monitor analysis and video swing analysis are available." },
      { q: "Is the Academy suitable for corporate groups with mixed skill levels?", a: "Yes \u2014 group clinics at the Academy are one of the most effective team activities for corporate golf trips at Pebble Beach. The clinic format accommodates beginners through single-figure handicaps in the same session." },
    ],
    schema: { type: "SportsActivityLocation", address: "1700 17-Mile Drive, Pebble Beach, CA 93953" },
  },

  "beach-and-tennis-club": {
    slug: "beach-and-tennis-club",
    name: "The Beach & Tennis Club",
    headline: "Pool, tennis, and the Pacific.",
    hook: "The Beach & Tennis Club gives non-golfers \u2014 and golfers on their off days \u2014 a full day\u2019s worth of activity. Pool, tennis, fitness, and direct beach access on 17-Mile Drive\u00ae.",
    description: [
      "The Beach & Tennis Club at Pebble Beach Resorts\u00ae sits directly on 17-Mile Drive\u00ae, with an outdoor heated pool, multiple tennis courts, a fitness center, and access to the private beach and coastal trail. Lodge guests have complimentary access; Inn and Casa Palmero guests can access it via shuttle.",
      "The Club is a natural anchor for the non-golfers in any group \u2014 a full day of pool, tennis, fitness, and coastal walks while the golfers are on course. The outdoor pool area is one of the most scenic in California, with views across the Pacific.",
      "Tennis programs, private instruction, and court reservations can all be arranged. For corporate groups, the Club\u2019s facilities \u2014 including the outdoor pool deck \u2014 can be reserved for private events as part of a Pebble Beach Resorts\u00ae group buyout.",
    ],
    images: [
      { src: "/images/pbc-portal/btc_2024_exterior_pool.jpg", alt: "The Beach & Tennis Club outdoor pool, Pebble Beach, CA \u2014 heated pool on 17-Mile Drive", caption: "The outdoor heated pool at The Beach & Tennis Club, Pebble Beach Resorts\u00ae.", credit: "Photo by Jamie Alcala", photographer: "Jamie Alcala", category: "Pool", tag: "Pool" },
      { src: "/images/pbc-portal/btc_2024_exterior_pool_deck.jpg", alt: "The Beach & Tennis Club pool deck, Pebble Beach, CA", caption: "The pool deck at The Beach & Tennis Club \u2014 Pacific Ocean views, available for private events.", credit: "Photo by Jamie Alcala", photographer: "Jamie Alcala", category: "Pool", tag: "Pool Deck" },
      { src: "/images/pbc-portal/btc_2024_exterior_pool-1.jpg", alt: "The Beach & Tennis Club pool, Pebble Beach, CA", caption: "The Beach & Tennis Club \u2014 heated outdoor pool directly on 17-Mile Drive\u00ae.", credit: "Photo by Jamie Alcala", photographer: "Jamie Alcala", category: "Pool", tag: "Pool" },
      { src: "/images/pbc-portal/btc_2024_exterior_pool-2.jpg", alt: "The Beach & Tennis Club pool area, Pebble Beach, CA", caption: "The pool area at The Beach & Tennis Club, Pebble Beach Resorts\u00ae.", credit: "Photo by Jamie Alcala", photographer: "Jamie Alcala", category: "Pool", tag: "Pool" },
      { src: "/images/pbc-portal/btc_2024_exterior.jpg", alt: "The Beach & Tennis Club exterior, Pebble Beach, CA", caption: "The exterior of The Beach & Tennis Club at Pebble Beach Resorts\u00ae.", credit: "Photo by Jamie Alcala", photographer: "Jamie Alcala", category: "Exterior", tag: "Exterior" },
      { src: "/images/pbc-portal/btc_2024_interior_studio.jpg", alt: "The Beach & Tennis Club barre and fitness studio, Pebble Beach, CA — TRX suspension training with pool deck views", caption: "The fitness studio at The Beach & Tennis Club — barre rails, TRX suspension trainers, and mirrored walls with pool deck views.", credit: "Photo by Jamie Alcala", photographer: "Jamie Alcala", category: "Facilities", tag: "Fitness Studio" },
      { src: "/images/pbc-portal/btc_2024_exterior_pool-3.jpg", alt: "The Beach & Tennis Club pool with Pacific views, Pebble Beach, CA", caption: "The Beach & Tennis Club \u2014 pool, tennis, beach access, and Pacific views.", credit: "Photo by Jamie Alcala", photographer: "Jamie Alcala", category: "Pool", tag: "Pacific Views" },
    ],
    faqs: [
      { q: "Is The Beach & Tennis Club included with a Lodge stay?", a: "Yes \u2014 Lodge at Pebble Beach\u2122 guests have complimentary access to The Beach & Tennis Club. Inn at Spanish Bay\u2122 and Casa Palmero\u00ae guests can access it via a complimentary shuttle." },
      { q: "Can non-golfers in our group use The Beach & Tennis Club?", a: "Absolutely \u2014 this is one of the most popular activities for non-golfers on a Monterey Golf Tours trip. Pool, tennis, fitness, and coastal walking trails are available all day. Monterey Golf Tours can build a non-golfer itinerary around the Club." },
      { q: "Can the pool area be reserved for a private group event?", a: "Yes. The pool deck and Club facilities can be reserved for private events as part of a Pebble Beach Resorts\u00ae group buyout. Contact Monterey Golf Tours for group event coordination." },
    ],
    schema: { type: "SportsActivityLocation", address: "3350 17-Mile Drive, Pebble Beach, CA 93953" },
  },

};

export const EXPERIENCE_SLUGS = Object.keys(EXPERIENCES);
