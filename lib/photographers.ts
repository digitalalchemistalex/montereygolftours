// Licensed photography credits for all Pebble Beach Company images on Monterey Golf Tours.
// Source: Pebble Beach Company Leisure Travel Sales Collection (Bynder DAM)
// All images cleared for Third Party use per PBC licensing terms.
// Photo/Video Credit field verified per image on portal Sep 3 2026.

export type PhotographerImage = {
  src: string;
  alt: string;
  caption: string;
  subject: string; // what property/location
};

export type Photographer = {
  slug: string;
  name: string;
  creditLine: string; // exact credit as displayed on site
  bio: string;
  worksFor?: string;
  images: PhotographerImage[];
};

export const PHOTOGRAPHERS: Record<string, Photographer> = {

  "kevin-merfeld": {
    slug: "kevin-merfeld",
    name: "Kevin Merfeld",
    creditLine: "Photo by Kevin Merfeld - PBC",
    worksFor: "Pebble Beach Company",
    bio: "Kevin Merfeld has photographed Pebble Beach Resorts® golf courses extensively for Pebble Beach Company, capturing the coastal dunes, Del Monte Forest fairways, and iconic links-style landscapes of the Monterey Peninsula. His 2016 course series covers Spyglass Hill® Golf Course, Del Monte™ Golf Course, The Links at Spanish Bay®, and 17-Mile Drive®.",
    images: [
      { src: "/images/pbc-portal/spyglass_4_2016_ground_green.jpg", alt: "Hole 4 at Spyglass Hill® Golf Course, Pebble Beach, CA — coastal dunes of the front nine meeting Del Monte Forest", caption: "Hole 4 at Spyglass Hill® Golf Course — where the coastal dunes of the front nine begin giving way to Del Monte Forest.", subject: "Spyglass Hill® Golf Course" },
      { src: "/images/pbc-portal/spyglass_7_2016_ground_green.jpg", alt: "Hole 7 green complex at Spyglass Hill® Golf Course, Pebble Beach, CA", caption: "The green complex on Hole 7 at Spyglass Hill® Golf Course — precision approach required on a course rated 75.4, slope 145.", subject: "Spyglass Hill® Golf Course" },
      { src: "/images/pbc-portal/spyglass_11_2016_ground.jpg", alt: "Hole 11 at Spyglass Hill® Golf Course, Pebble Beach, CA — deep in Del Monte Forest pines", caption: "Hole 11 at Spyglass Hill® Golf Course — deep into Del Monte Forest pines, the back nine demands accuracy on every shot.", subject: "Spyglass Hill® Golf Course" },
      { src: "/images/pbc-portal/delmonte_16_2016_ground_green.jpg", alt: "Hole 16 at Del Monte™ Golf Course, Monterey, CA — parkland fairway in continuous play since 1897", caption: "Hole 16 at Del Monte™ Golf Course — the parkland character that defines the peninsula’s oldest layout, in continuous play since 1897.", subject: "Del Monte™ Golf Course" },
      { src: "/images/pbc-portal/17md_2016_coastline.jpg", alt: "17-Mile Drive® coastline, Pebble Beach, CA", caption: "The Pacific coastline along 17-Mile Drive®, Pebble Beach Resorts®.", subject: "17-Mile Drive®" },
      { src: "/images/pbc-portal/17md_2016_birdrock.jpg", alt: "Bird Rock stop on 17-Mile Drive®, Pebble Beach, CA", caption: "Bird Rock, one of the iconic stops along 17-Mile Drive®.", subject: "17-Mile Drive®" },
      { src: "/images/pbc-portal/17md_2016_fanshellbeach.jpg", alt: "Fanshell Beach on 17-Mile Drive®, Pebble Beach, CA", caption: "Fanshell Beach, a secluded cove along 17-Mile Drive®, Pebble Beach.", subject: "17-Mile Drive®" },
      { src: "/images/pbc-portal/17md_2016_fordmeadow.jpg", alt: "Ford Meadow on 17-Mile Drive®, Pebble Beach, CA", caption: "Ford Meadow, one of the scenic stops along 17-Mile Drive®.", subject: "17-Mile Drive®" },
      { src: "/images/pbc-portal/lasb_15_2016_ground_green.jpg", alt: "Hole 15 at The Links at Spanish Bay®, Pebble Beach, CA", caption: "Hole 15 at The Links at Spanish Bay® — currently closed for a Gil Hanse redesign, reopening April 17, 2027.", subject: "The Links at Spanish Bay®" },
      { src: "/images/pbc-portal/lasb_17_2016_ground_green.jpg", alt: "Hole 17 at The Links at Spanish Bay®, Pebble Beach, CA", caption: "Hole 17 at The Links at Spanish Bay® — the course reopens April 17, 2027 after a complete Gil Hanse redesign.", subject: "The Links at Spanish Bay®" },
      { src: "/images/pbc-portal/lasb_1_2016_ground_green.jpg", alt: "Hole 1 at The Links at Spanish Bay®, Pebble Beach, CA", caption: "The opening hole at The Links at Spanish Bay® — the only true links-style course at Pebble Beach Resorts®.", subject: "The Links at Spanish Bay®" },
    ],
  },

  "jeff-marsh": {
    slug: "jeff-marsh",
    name: "Jeff Marsh",
    creditLine: "Photo by Jeff Marsh",
    bio: "Jeff Marsh photographed Pebble Beach Golf Links® in 2020, capturing aerial and ground-level views of the course’s most celebrated holes along Stillwater Cove and the Pacific coastline.",
    images: [
      { src: "/images/pbc-portal/pbgl_9_2020_aerial.jpg", alt: "Pebble Beach Golf Links® hole 9 aerial view, Stillwater Cove, Pebble Beach, CA", caption: "Hole 9 at Pebble Beach Golf Links® from above — the par-4 coastal fairway running along Stillwater Cove.", subject: "Pebble Beach Golf Links®" },
      { src: "/images/pbc-portal/pbgl_6_2020_ground_green.jpg", alt: "Hole 6 at Pebble Beach Golf Links®, Pebble Beach, CA", caption: "The green complex on Hole 6 at Pebble Beach Golf Links® — a par-5 that plays directly toward Stillwater Cove.", subject: "Pebble Beach Golf Links®" },
      { src: "/images/pbc-portal/pbgl_5_2020_ground_green.jpg", alt: "Hole 5 at Pebble Beach Golf Links®, Pebble Beach, CA", caption: "Hole 5 at Pebble Beach Golf Links® — one of the Pacific-facing holes on the front nine.", subject: "Pebble Beach Golf Links®" },
    ],
  },

  "martin-miller": {
    slug: "martin-miller",
    name: "Martin Miller",
    creditLine: "Photo by Martin Miller",
    bio: "Martin Miller photographed The Hay™ short course from the air in 2021, capturing the full layout of Tiger Woods and TGR Design’s reimagining of the original Peter Hay course at Pebble Beach.",
    images: [
      { src: "/images/pbc-portal/thehay_2021_aerial.jpg", alt: "The Hay™ short course aerial view, Pebble Beach, CA — Tiger Woods TGR Design 2021 redesign", caption: "The Hay™ from above — Tiger Woods and TGR Design’s 2021 reimagining of the original Peter Hay short course at Pebble Beach.", subject: "The Hay™" },
    ],
  },

  "sherman-chu": {
    slug: "sherman-chu",
    name: "Sherman Chu",
    creditLine: "Photo by Sherman Chu",
    worksFor: "Pebble Beach Company",
    bio: "Sherman Chu is one of the primary photographers for Pebble Beach Company, with an extensive body of work covering The Hay™ short course, The Inn at Spanish Bay™, The Spa at Pebble Beach™, Casa Palmero®, and the dining venues at Pebble Beach Resorts® including Peppoli, Terrace Lounge, Gallery Cafe, Sticks, Traps, and Hay’s Place.",
    images: [
      { src: "/images/pbc-portal/thehay_2_2021_ground_green.jpg", alt: "Hole 2 “Seven” at The Hay™, Pebble Beach, CA", caption: "Hole 2 “Seven” at The Hay™ — par-27 short course redesigned by Tiger Woods and TGR Design.", subject: "The Hay™" },
      { src: "/images/pbc-portal/thehay_5_2021_ground_green.jpg", alt: "Hole 5 “Grace” at The Hay™, Pebble Beach, CA", caption: "Hole 5 “Grace” at The Hay™ — one of nine holes redesigned by Tiger Woods and TGR Design.", subject: "The Hay™" },
      { src: "/images/pbc-portal/inn_2020_interior_lobby.jpg", alt: "The Inn at Spanish Bay™ lobby, Pebble Beach, CA", caption: "The lobby at The Inn at Spanish Bay™ — a 270-room resort overlooking the Pacific.", subject: "The Inn at Spanish Bay™" },
      { src: "/images/pbc-portal/inn_2018_executiveforestsuite.jpg", alt: "Executive Forest Suite at The Inn at Spanish Bay™, Pebble Beach, CA", caption: "The Executive Forest Suite at The Inn at Spanish Bay™ — forest-facing rooms with views into Del Monte Forest.", subject: "The Inn at Spanish Bay™" },
      { src: "/images/pbc-portal/the-inn-spanish-bay-suite.jpg", alt: "Spanish Bay Suite at The Inn at Spanish Bay™, Pebble Beach, CA", caption: "The Spanish Bay Suite at The Inn at Spanish Bay™ — premier oceanfront suite with panoramic Pacific views.", subject: "The Inn at Spanish Bay™" },
      { src: "/images/pbc-portal/spanish-bay-bagpiper.jpg", alt: "Spanish Bay bagpiper at The Inn at Spanish Bay™, Pebble Beach, CA — at sunset", caption: "The Spanish Bay bagpiper at The Inn at Spanish Bay™ — a Scottish piper plays every evening at sunset.", subject: "The Inn at Spanish Bay™" },
      { src: "/images/pbc-portal/spa_2024_interior_lockerroom.jpg", alt: "The Spa at Pebble Beach™ locker room, Pebble Beach, CA", caption: "The locker room at The Spa at Pebble Beach™ — 22,000 sq ft, Forbes Five-Star rated.", subject: "The Spa at Pebble Beach™" },
      { src: "/images/pbc-portal/spa_2024_interior_coldplungetubs.jpg", alt: "Cold plunge tubs at The Spa at Pebble Beach™, Pebble Beach, CA", caption: "The cold plunge tubs at The Spa at Pebble Beach™.", subject: "The Spa at Pebble Beach™" },
      { src: "/images/pbc-portal/peppoli_2026_interior_decor.jpg", alt: "Peppoli restaurant interior, The Lodge at Pebble Beach™, Pebble Beach, CA", caption: "Peppoli restaurant at The Lodge at Pebble Beach™ — Italian coastal cuisine with Pacific views.", subject: "Peppoli Restaurant" },
      { src: "/images/pbc-portal/terrace-lounge.jpg", alt: "Terrace Lounge at Pebble Beach Resorts®, Pebble Beach, CA", caption: "The Terrace Lounge at Pebble Beach Resorts®.", subject: "Terrace Lounge" },
    ],
  },

  "noah-webb": {
    slug: "noah-webb",
    name: "Noah Webb",
    creditLine: "Photo by Noah Webb",
    bio: "Noah Webb photographed The Lodge at Pebble Beach™ guest rooms and Fairway One Cottage in 2017 and 2018, and the guest rooms at The Inn at Spanish Bay™, capturing the interiors of Pebble Beach Resorts®’ most celebrated accommodations.",
    images: [
      { src: "/images/pbc-portal/lodge_2017_interior_fairwayone_cottage.jpg", alt: "Fairway One Cottage interior at The Lodge at Pebble Beach™, Pebble Beach, CA", caption: "Fairway One Cottage at The Lodge at Pebble Beach™ — the Palmer and Eastwood Cottages on the first fairway.", subject: "The Lodge at Pebble Beach™" },
      { src: "/images/pbc-portal/lodge_2018_interior_oceanstudio.jpg", alt: "Ocean Studio guest room at The Lodge at Pebble Beach™, Pebble Beach, CA", caption: "An Ocean Studio at The Lodge at Pebble Beach™ — rooms range from 570 to 1,300 sq ft.", subject: "The Lodge at Pebble Beach™" },
      { src: "/images/pbc-portal/fairway-one-cottage.jpg", alt: "Fairway One at The Lodge at Pebble Beach™, Pebble Beach, CA", caption: "Fairway One at The Lodge at Pebble Beach™ — 30 oversized rooms directly on the first fairway.", subject: "The Lodge at Pebble Beach™" },
      { src: "/images/pbc-portal/fairwayone_2017_exterior_cottage.jpg", alt: "Fairway One Cottage exterior at The Lodge at Pebble Beach™, Pebble Beach, CA", caption: "The exterior of Fairway One Cottage at The Lodge at Pebble Beach™.", subject: "The Lodge at Pebble Beach™" },
      { src: "/images/pbc-portal/the-inn-ocean-view-room.jpg", alt: "Ocean view room at The Inn at Spanish Bay™, Pebble Beach, CA", caption: "An ocean view room at The Inn at Spanish Bay™ — gas fireplace and private patio.", subject: "The Inn at Spanish Bay™" },
    ],
  },

  "jamie-alcala": {
    slug: "jamie-alcala",
    name: "Jamie Alcala",
    creditLine: "Photo by Jamie Alcala",
    bio: "Jamie Alcala photographed The Lodge at Pebble Beach™ and The Beach & Tennis Club in 2024 and 2025, capturing the newly refreshed exterior and lobby of The Lodge alongside the outdoor pool and facilities at the Beach & Tennis Club.",
    images: [
      { src: "/images/pbc-portal/lodge_2025_exterior.jpg", alt: "The Lodge at Pebble Beach™ exterior, Pebble Beach, CA — framing the 18th green", caption: "The Lodge at Pebble Beach™ exterior — the original 1919 property, framing the 18th green of Pebble Beach Golf Links®.", subject: "The Lodge at Pebble Beach™" },
      { src: "/images/pbc-portal/lodge_2025_lobby.jpg", alt: "The Lodge at Pebble Beach™ lobby, Pebble Beach, CA", caption: "The Lodge at Pebble Beach™ lobby — classic California coastal elegance.", subject: "The Lodge at Pebble Beach™" },
      { src: "/images/pbc-portal/btc_2024_exterior_pool.jpg", alt: "Beach & Tennis Club outdoor pool, Pebble Beach, CA", caption: "The outdoor pool at The Beach & Tennis Club, Pebble Beach Resorts®.", subject: "Beach & Tennis Club" },
      { src: "/images/pbc-portal/btc_2024_exterior.jpg", alt: "Beach & Tennis Club exterior, Pebble Beach, CA", caption: "The Beach & Tennis Club at Pebble Beach Resorts®.", subject: "Beach & Tennis Club" },
      { src: "/images/pbc-portal/btc_2024_interior_studio.jpg", alt: "Beach & Tennis Club interior studio, Pebble Beach, CA", caption: "The interior studio at The Beach & Tennis Club, Pebble Beach Resorts®.", subject: "Beach & Tennis Club" },
    ],
  },

  "joann-dost": {
    slug: "joann-dost",
    name: "Joann Dost",
    creditLine: "Photo by Joann Dost",
    bio: "Joann Dost is a celebrated photographer whose work documents the Pebble Beach Resorts® landscape, including the fire pits at The Inn at Spanish Bay™, the iconic Ghost Tree stop on 17-Mile Drive®, surfers at Spanish Bay, and aerial views of The Links at Spanish Bay®.",
    images: [
      { src: "/images/pbc-portal/the-inn-at-spanish-bay---fire-pits.jpg", alt: "Fire pits at The Inn at Spanish Bay™, Pebble Beach, CA — evening gathering at sunset", caption: "The fire pits at The Inn at Spanish Bay™ — each evening a bagpiper plays as the sun sets over the Pacific.", subject: "The Inn at Spanish Bay™" },
      { src: "/images/pbc-portal/17-mile-drive---ghost-tree-stop.jpg", alt: "Ghost Tree stop on 17-Mile Drive®, Pebble Beach, CA", caption: "The Ghost Tree, one of the iconic natural landmarks along 17-Mile Drive®.", subject: "17-Mile Drive®" },
      { src: "/images/pbc-portal/spanishbay_2021_surfer.jpg", alt: "Surfer at Spanish Bay, Pebble Beach, CA", caption: "A surfer at Spanish Bay along 17-Mile Drive®, Pebble Beach.", subject: "Spanish Bay" },
    ],
  },

  "randy-tunnell": {
    slug: "randy-tunnell",
    name: "Randy Tunnell",
    creditLine: "Photo by Randy Tunnell",
    bio: "Randy Tunnell photographed Pebble Beach Golf Links® in 2013, capturing the historic fairway approach on Hole 9 along Stillwater Cove, as well as the interior of Stave Wine Cellar at The Inn at Spanish Bay™.",
    images: [
      { src: "/images/pbc-portal/pbgl_9_2013_ground_fairway.jpg", alt: "Hole 9 fairway at Pebble Beach Golf Links®, Pebble Beach, CA — Stillwater Cove 2013", caption: "Playing into Hole 9 at Pebble Beach Golf Links® — the coastal fairway with Stillwater Cove and the Pacific stretching behind.", subject: "Pebble Beach Golf Links®" },
      { src: "/images/pbc-portal/stave_2014_interior_decor.jpg", alt: "Stave Wine Cellar interior at The Inn at Spanish Bay™, Pebble Beach, CA", caption: "Stave Wine Cellar at The Inn at Spanish Bay™ — curated wine selection in an intimate setting.", subject: "Stave Wine Cellar" },
    ],
  },

  "taylor-mahon": {
    slug: "taylor-mahon",
    name: "Taylor Mahon",
    creditLine: "Photo by Taylor Mahon",
    bio: "Taylor Mahon photographed Stillwater Bar & Grill in 2026, one of the signature dining venues at The Lodge at Pebble Beach™, overlooking the Pacific Ocean and the 18th fairway of Pebble Beach Golf Links®.",
    images: [
      { src: "/images/pbc-portal/stillwater--january-2026.jpg", alt: "Stillwater Bar & Grill interior, The Lodge at Pebble Beach™, Pebble Beach, CA", caption: "Stillwater Bar & Grill at The Lodge at Pebble Beach™ — panoramic Pacific Ocean views from the dining room.", subject: "Stillwater Bar & Grill" },
    ],
  },

  "christine-bush": {
    slug: "christine-bush",
    name: "Christine Bush",
    creditLine: "Photo by Christine Bush",
    bio: "Christine Bush photographed the wildlife of 17-Mile Drive®, capturing the deer that roam freely through the Pebble Beach landscape as one of the iconic natural encounters along the drive.",
    images: [
      { src: "/images/pbc-portal/17-mile-drive-wildlife---deer.jpg", alt: "Deer along 17-Mile Drive®, Pebble Beach, CA — wildlife on the Monterey Peninsula", caption: "Deer along 17-Mile Drive® — wildlife is a defining part of the Pebble Beach landscape.", subject: "17-Mile Drive®" },
    ],
  },

  "tgo": {
    slug: "tgo",
    name: "TGO",
    creditLine: "© TGO",
    bio: "TGO photographed the Pebble Beach Golf Academy™ facilities, including the driving range and the innovative robotic swing trainer — the first of its kind at a resort golf academy.",
    images: [
      { src: "/images/pbc-portal/pebble-beach-golf-academy--driving-range-photo-credit----tgo.jpg", alt: "Pebble Beach Golf Academy™ driving range, Pebble Beach, CA", caption: "The driving range at Pebble Beach Golf Academy™ — instruction programs for all skill levels.", subject: "Pebble Beach Golf Academy™" },
      { src: "/images/pbc-portal/pebble-beach-golf-academy--robotic-swing-trainer-photo-credit----tgo.jpg", alt: "Robotic swing trainer at Pebble Beach Golf Academy™, Pebble Beach, CA", caption: "The robotic swing trainer at Pebble Beach Golf Academy™ — cutting-edge instruction technology.", subject: "Pebble Beach Golf Academy™" },
    ],
  },

};

export const PHOTOGRAPHER_SLUGS = Object.keys(PHOTOGRAPHERS);
