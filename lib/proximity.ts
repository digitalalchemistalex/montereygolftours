// Source: mgts-lodging-intelligence.md (verified June 2 2026)
// All times in minutes, approximate driving distance

export const HOTEL_TO_COURSE_MINUTES: Record<string, Record<string, number>> = {
  "hyatt-regency-monterey":       { bayonet: 8,  "black-horse": 8,  "carmel-valley-ranch": 25, "quail-lodge": 20, "laguna-seca-golf-ranch": 12, "pacific-grove-golf-links": 10, "poppy-hills": 15, "club-at-pasadera": 10 },
  "carmel-valley-ranch":          { bayonet: 25, "black-horse": 25, "carmel-valley-ranch":  0, "quail-lodge": 10, "laguna-seca-golf-ranch": 20, "pacific-grove-golf-links": 25, "poppy-hills": 20, "club-at-pasadera": 20 },
  "quail-lodge":                  { bayonet: 20, "black-horse": 20, "carmel-valley-ranch": 10, "quail-lodge":  0, "laguna-seca-golf-ranch": 18, "pacific-grove-golf-links": 22, "poppy-hills": 18, "club-at-pasadera": 18 },
  "bernardus-lodge":              { bayonet: 30, "black-horse": 30, "carmel-valley-ranch":  7, "quail-lodge": 15, "laguna-seca-golf-ranch": 25, "pacific-grove-golf-links": 30, "poppy-hills": 25, "club-at-pasadera": 25 },
  "monterey-plaza-hotel":         { bayonet: 8,  "black-horse": 8,  "carmel-valley-ranch": 25, "quail-lodge": 20, "laguna-seca-golf-ranch": 12, "pacific-grove-golf-links":  8, "poppy-hills": 12, "club-at-pasadera":  8 },
  "intercontinental-the-clement": { bayonet: 8,  "black-horse": 8,  "carmel-valley-ranch": 25, "quail-lodge": 20, "laguna-seca-golf-ranch": 12, "pacific-grove-golf-links":  8, "poppy-hills": 12, "club-at-pasadera":  8 },
  "portola-hotel":                { bayonet: 10, "black-horse": 10, "carmel-valley-ranch": 25, "quail-lodge": 20, "laguna-seca-golf-ranch": 12, "pacific-grove-golf-links": 10, "poppy-hills": 14, "club-at-pasadera": 10 },
  "lauberge-carmel":              { bayonet: 18, "black-horse": 18, "carmel-valley-ranch": 20, "quail-lodge": 12, "laguna-seca-golf-ranch": 20, "pacific-grove-golf-links": 18, "poppy-hills": 15, "club-at-pasadera": 15 },
  "casa-munras":                  { bayonet: 8,  "black-horse": 8,  "carmel-valley-ranch": 25, "quail-lodge": 20, "laguna-seca-golf-ranch": 12, "pacific-grove-golf-links": 10, "poppy-hills": 14, "club-at-pasadera": 10 },
  "embassy-suites-monterey-bay":  { bayonet: 10, "black-horse": 10, "carmel-valley-ranch": 25, "quail-lodge": 20, "laguna-seca-golf-ranch": 12, "pacific-grove-golf-links": 10, "poppy-hills": 14, "club-at-pasadera": 10 },
  "monterey-beach-hotel":         { bayonet: 10, "black-horse": 10, "carmel-valley-ranch": 25, "quail-lodge": 20, "laguna-seca-golf-ranch": 12, "pacific-grove-golf-links": 10, "poppy-hills": 14, "club-at-pasadera": 10 },
  "lodge-at-pebble-beach":        { bayonet: 15, "black-horse": 15, "carmel-valley-ranch": 20, "quail-lodge": 15, "laguna-seca-golf-ranch": 18, "pacific-grove-golf-links": 12, "poppy-hills":  8, "club-at-pasadera": 15 },
  "inn-at-spanish-bay":           { bayonet: 15, "black-horse": 15, "carmel-valley-ranch": 20, "quail-lodge": 15, "laguna-seca-golf-ranch": 18, "pacific-grove-golf-links": 10, "poppy-hills":  8, "club-at-pasadera": 15 },
  "casa-palmero":                 { bayonet: 15, "black-horse": 15, "carmel-valley-ranch": 20, "quail-lodge": 15, "laguna-seca-golf-ranch": 18, "pacific-grove-golf-links": 12, "poppy-hills":  8, "club-at-pasadera": 15 },
};

export type HotelTier = "golf-anchor" | "luxury" | "city-base" | "boutique";

export const HOTEL_DISPLAY_NAMES: Record<string, string> = {
  "hyatt-regency-monterey":       "Hyatt Regency Monterey",
  "carmel-valley-ranch":          "Carmel Valley Ranch",
  "quail-lodge":                  "Quail Lodge & Golf Club",
  "bernardus-lodge":              "Bernardus Lodge & Spa",
  "monterey-plaza-hotel":         "Monterey Plaza Hotel & Spa",
  "intercontinental-the-clement": "InterContinental The Clement",
  "portola-hotel":                "Portola Hotel & Spa",
  "lauberge-carmel":              "L\u2019Auberge Carmel",
  "casa-munras":                  "Casa Munras Garden Hotel",
  "embassy-suites-monterey-bay":  "Embassy Suites Monterey Bay",
  "monterey-beach-hotel":         "Monterey Beach Hotel",
  "lodge-at-pebble-beach":        "The Lodge at Pebble Beach\u2122",
  "inn-at-spanish-bay":           "The Inn at Spanish Bay\u2122",
  "casa-palmero":                 "Casa Palmero\u2122",
};

export const HOTEL_META: Record<string, { tier: HotelTier; meta: string }> = {
  "hyatt-regency-monterey":       { tier: "golf-anchor", meta: "560 rooms \u00b7 free airport shuttle" },
  "carmel-valley-ranch":          { tier: "golf-anchor", meta: "179 all-suites \u00b7 Pete Dye on-site" },
  "quail-lodge":                  { tier: "golf-anchor", meta: "On-site course \u00b7 best conditions in Central CA" },
  "bernardus-lodge":              { tier: "luxury",      meta: "Boutique luxury \u00b7 TPC Pasadera access" },
  "monterey-plaza-hotel":         { tier: "city-base",   meta: "Cannery Row \u00b7 AAA Four Diamond" },
  "intercontinental-the-clement": { tier: "city-base",   meta: "Cannery Row waterfront \u00b7 premium" },
  "portola-hotel":                { tier: "city-base",   meta: "379 rooms \u00b7 best for groups 20+" },
  "lauberge-carmel":              { tier: "luxury",      meta: "Relais & Ch\u00e2teaux \u00b7 20 rooms" },
  "casa-munras":                  { tier: "boutique",    meta: "Historic \u00b7 downtown Monterey" },
  "embassy-suites-monterey-bay":  { tier: "city-base",   meta: "All-suite \u00b7 Seaside" },
  "monterey-beach-hotel":         { tier: "city-base",   meta: "Bayfront \u00b7 Monterey" },
  "lodge-at-pebble-beach":        { tier: "luxury",      meta: "Forbes Five-Star \u00b7 PBC property" },
  "inn-at-spanish-bay":           { tier: "luxury",      meta: "Gas fireplace every room \u00b7 PBC property" },
  "casa-palmero":                 { tier: "luxury",      meta: "24 rooms only \u00b7 full buyout available" },
};

export const COURSE_DISPLAY_NAMES: Record<string, string> = {
  bayonet:                    "Bayonet",
  "black-horse":              "Black Horse",
  "carmel-valley-ranch":      "CVR Pete Dye",
  "quail-lodge":              "Quail Lodge",
  "laguna-seca-golf-ranch":   "Laguna Seca",
  "pacific-grove-golf-links": "Pacific Grove",
  "poppy-hills":              "Poppy Hills",
  "club-at-pasadera":         "TPC Pasadera",
};

export interface HotelProximityRow {
  hotelSlug: string;
  hotelName: string;
  minutes: number;
  tier: HotelTier;
  meta: string;
}

export interface CourseProximityRow {
  courseSlug: string;
  courseName: string;
  minutes: number;
  isOnSite: boolean;
}

export function getHotelsForCourse(courseSlug: string): HotelProximityRow[] {
  return Object.entries(HOTEL_TO_COURSE_MINUTES)
    .map(([hotelSlug, courses]) => ({
      hotelSlug,
      hotelName: HOTEL_DISPLAY_NAMES[hotelSlug] ?? hotelSlug,
      minutes: courses[courseSlug] ?? 99,
      tier: HOTEL_META[hotelSlug]?.tier ?? "city-base",
      meta: HOTEL_META[hotelSlug]?.meta ?? "",
    }))
    .filter((h) => h.minutes < 99)
    .sort((a, b) => a.minutes - b.minutes);
}

export function getCoursesForHotel(hotelSlug: string): CourseProximityRow[] {
  const row = HOTEL_TO_COURSE_MINUTES[hotelSlug];
  if (!row) return [];
  return Object.entries(row)
    .map(([courseSlug, minutes]) => ({
      courseSlug,
      courseName: COURSE_DISPLAY_NAMES[courseSlug] ?? courseSlug,
      minutes,
      isOnSite: minutes === 0,
    }))
    .sort((a, b) => a.minutes - b.minutes);
}
