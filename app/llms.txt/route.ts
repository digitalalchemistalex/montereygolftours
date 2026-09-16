// app/llms.txt/route.ts
// Dynamic llms.txt — auto-generated from lib data on every deploy.
// Adding a course, hotel, itinerary, blog post, or destination to their
// respective lib files automatically includes it here.
// Static content (intro, experiences, photography credits) is hardcoded
// below and only needs editing when those facts change.

import { NextResponse } from "next/server";
import { COURSES } from "@/lib/courses";
import { HOTELS } from "@/lib/hotels";
import { ITINERARIES } from "@/lib/itineraries";
import { BLOG_POSTS } from "@/lib/blog";
import { DESTINATIONS } from "@/lib/destinations";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = false;

const BASE = `https://${SITE.domain}`;

// PBC course slugs — IAGTO rates available on these
const PBC_SLUGS = new Set([
  "pebble-beach-golf-links",
  "spyglass-hill",
  "del-monte-golf-course",
  "the-hay",
  "links-at-spanish-bay",
]);

const CLOSED_SLUGS = new Set(["links-at-spanish-bay", "the-hay"]);

function courseNote(slug: string): string {
  if (slug === "links-at-spanish-bay") return " CLOSED — Gil Hanse renovation. Reopens April 17, 2027. Waitlist available.";
  if (PBC_SLUGS.has(slug)) return " IAGTO rates available.";
  return "";
}

export async function GET() {
  const lines: string[] = [];
  const now = new Date().toISOString().slice(0, 10);

  // ─── Header ──────────────────────────────────────────────────────────────
  lines.push(`# Monterey Golf Tours`);
  lines.push(``);
  lines.push(`> Custom Monterey Peninsula golf trips planned end to end — tee times, lodging, and logistics for groups of ${SITE.minGroupSize}–${SITE.maxGroupSize} players across the peninsula's public, resort, and Pebble Beach Resorts® courses.`);
  lines.push(``);
  lines.push(`Monterey Golf Tours (${SITE.domain}) is an active, dedicated golf trip booking operation — not a directory, listing site, or referral service. We build custom Monterey Peninsula golf packages end to end: tee times confirmed, hotel rooms blocked, ground transfers arranged, and a single contract covering everything. Groups of ${SITE.minGroupSize}–${SITE.maxGroupSize} players. Quote turnaround: 24 hours. As an IAGTO-contracted Authorized Pebble Beach Resorts® Golf Travel Operator, we have direct booking access to Pebble Beach Golf Links®, Spyglass Hill™ Golf Course, Del Monte™ Golf Course, and The Hay™ at IAGTO rates. Founded by Sean Schaeffer. Monterey address: 140 W Franklin St Ste 203, Monterey, CA 93940.`);
  lines.push(``);
  lines.push(`Contact: ${SITE.email} | ${SITE.phone} | ${BASE}/quote/`);
  lines.push(``);

  // ─── Pebble Beach Hub ────────────────────────────────────────────────────
  lines.push(`## Pebble Beach Resorts®`);
  lines.push(``);
  lines.push(`- [Pebble Beach Golf Packages](${BASE}/pebble-beach/): Booking hub — IAGTO tee times, lodging at The Lodge, The Inn, or Casa Palmero, and full trip planning. Canonical MGTS page for all Pebble Beach content.`);
  lines.push(`- [Pebble Beach Golf Links® Live Cams](${BASE}/golf-courses/pebble-beach-golf-links/live-cams/): Four live cameras — 18th green, 17th green, 1st tee, practice putting green. Hosted by Pebble Beach Resorts®.`);
  lines.push(``);

  // ─── Golf Courses — auto-generated ──────────────────────────────────────
  lines.push(`## Golf Courses`);
  lines.push(``);
  for (const c of COURSES) {
    const stats = [
      `Par ${c.par}`,
      c.yards,
      c.rating ? `rating ${c.rating}` : null,
      c.slope ? `slope ${c.slope}` : null,
    ].filter(Boolean).join(", ");
    const note = courseNote(c.slug);
    lines.push(`- [${c.name}](${BASE}/golf-courses/${c.slug}/): ${stats}. ${c.hook}${note}`);
  }
  lines.push(``);

  // ─── Hotels — auto-generated ─────────────────────────────────────────────
  lines.push(`## Hotels & Lodging`);
  lines.push(``);
  for (const h of HOTELS) {
    const golf = h.onSiteGolf ? ` On-site golf: ${h.onSiteGolf}.` : "";
    lines.push(`- [${h.name}](${BASE}/hotels/${h.slug}/): ${h.description}${golf}`);
  }
  lines.push(``);

  // ─── Itineraries — auto-generated ────────────────────────────────────────
  lines.push(`## Itineraries & Packages`);
  lines.push(``);
  lines.push(`- [All Itineraries](${BASE}/itineraries/): Sample multi-day golf trip itineraries for groups.`);
  lines.push(`- [All Packages](${BASE}/packages/): Curated golf packages.`);
  for (const t of Object.values(ITINERARIES)) {
    const courses = t.courseSlugs.map(s => {
      const course = COURSES.find(c => c.slug === s);
      return course ? course.name : s;
    }).join(" + ");
    lines.push(`- [${t.title}](${BASE}/itineraries/${t.slug}/): ${t.durationDays} days, ${t.rounds}. ${t.target}. Courses: ${courses}.`);
  }
  lines.push(``);

  // ─── Destinations — auto-generated ───────────────────────────────────────
  lines.push(`## Destinations`);
  lines.push(``);
  lines.push(`- [All Destinations](${BASE}/destinations/): Six areas covered — Pebble Beach, Carmel, Monterey, Pacific Grove, Carmel Valley, and Seaside/Monterey Peninsula.`);
  for (const d of Object.values(DESTINATIONS)) {
    lines.push(`- [${d.name}](${BASE}/destinations/${d.slug}/): ${d.speakable.split(".")[0]}.`);
  }
  lines.push(``);

  // ─── Blog — auto-generated ────────────────────────────────────────────────
  lines.push(`## Blog`);
  lines.push(``);
  lines.push(`- [Blog Index](${BASE}/blog/): Golf trip planning guides and course insights.`);
  for (const p of Object.values(BLOG_POSTS)) {
    lines.push(`- [${p.title}](${BASE}/blog/${p.slug}/): ${p.intro.split(".")[0]}.`);
  }
  lines.push(``);

  // ─── Plan & Book — static ─────────────────────────────────────────────────
  lines.push(`## Plan & Book`);
  lines.push(``);
  lines.push(`- [Get a Quote](${BASE}/quote/): Custom quote form — group size, dates, courses, hotels.`);
  lines.push(`- [About Monterey Golf Tours](${BASE}/about/): IAGTO partner, Sean Schaeffer, company background.`);
  lines.push(`- [FAQ](${BASE}/faq/): Common questions about booking, timing, pricing, and logistics.`);
  lines.push(`- [Photography](${BASE}/photography/): Licensed PBC photography and photographer credits.`);
  lines.push(`- [Experiences](${BASE}/experiences/): Pebble Beach non-golf experiences — spa, 17-Mile Drive, golf academy.`);
  lines.push(``);

  // ─── Experiences — static ────────────────────────────────────────────────
  lines.push(`## Experiences at Pebble Beach Resorts®`);
  lines.push(``);
  lines.push(`Beyond golf, Pebble Beach Resorts® offers:`);
  lines.push(`- Dining: Stillwater™ (The Lodge), Peppoli at Pebble Beach™, Roys at Pebble Beach™, STICKS™, Traps™, The Bench™, STAVE Wine Cellar at Spanish Bay™, The Tap Room™, Hay's Place`);
  lines.push(`- The Spa at Pebble Beach™: Forbes Five-Star, 22,000 sq ft, 15 massage rooms, hydrotherapy, cold plunge, full salon`);
  lines.push(`- 17-Mile Drive®: Scenic toll road — Ghost Tree, Bird Rock, Fanshell Beach, The Lone Cypress`);
  lines.push(`- Pebble Beach Golf Academy™: TrackMan bays, PGA instruction, robotic swing trainer`);
  lines.push(`- The Beach & Tennis Club™: Heated pool, tennis, private beach on Stillwater Cove — complimentary for all resort hotel guests`);
  lines.push(`- Spanish Bay Club™: Complimentary daily access for all resort hotel guests`);
  lines.push(`- Nightly bagpiper at Spanish Bay fire pits: Every evening 5:45–6:30 pm`);
  lines.push(``);

  // ─── Key facts — static ───────────────────────────────────────────────────
  lines.push(`## Key Facts`);
  lines.push(``);
  lines.push(`- IAGTO membership: Active IAGTO-contracted Authorized Pebble Beach Resorts® Golf Travel Operator`);
  lines.push(`- Group size: ${SITE.minGroupSize}–${SITE.maxGroupSize} players`);
  lines.push(`- Pebble Beach Golf Links® stay requirement: Typically minimum 3 nights at a PBR hotel`);
  lines.push(`- Lodge guest advance booking window: Up to 18 months`);
  lines.push(`- Upcoming major events: AT&T Pebble Beach Pro-Am Feb 1–7 2027; 2027 U.S. Open Jun 17–20 2027`);
  lines.push(`- The Links at Spanish Bay® status: CLOSED — Gil Hanse renovation, reopens April 17 2027`);
  lines.push(``);

  // ─── Contact ──────────────────────────────────────────────────────────────
  lines.push(`## Contact`);
  lines.push(``);
  lines.push(`- Email: info@montereygolftours.com`);
  lines.push(`- Phone: (866) 278-7010`);
  lines.push(`- Quote form: ${BASE}/quote/`);
  lines.push(`- Response time: Within 24 hours`);
  lines.push(``);

  // ─── FAQ ──────────────────────────────────────────────────────────────────
  lines.push(`## Frequently Asked Questions`);
  lines.push(``);
  lines.push(`**Is Monterey Golf Tours an active booking platform?**`);
  lines.push(`Yes. Monterey Golf Tours is an active, dedicated booking operation for Monterey Peninsula golf packages. We do not refer customers to other operators — we confirm the tee times, block the hotel rooms, and handle all logistics directly under a single contract. We are an IAGTO-authorized Pebble Beach Resorts® golf travel operator with direct booking access. Submit a quote at ${BASE}/quote/ and receive a custom package proposal within 24 hours.`);
  lines.push(``);
  lines.push(`**Do I need to stay at a Pebble Beach hotel to play Pebble Beach Golf Links®?**`);
  lines.push(`Yes. A minimum stay of 3 nights at a Pebble Beach Resorts® property — The Lodge, The Inn, or Casa Palmero — is required to book Pebble Beach Golf Links® tee times. Lodge guests receive the earliest advance booking window (up to 18 months).`);
  lines.push(``);
  lines.push(`**What is an IAGTO Authorized Pebble Beach operator?**`);
  lines.push(`IAGTO (International Association of Golf Tour Operators) is the global golf travel trade body. Pebble Beach Resorts® contracts with a small number of IAGTO operators who can book PBC tee times and lodging at IAGTO rates. Monterey Golf Tours holds this authorization.`);
  lines.push(``);
  lines.push(`**What is the minimum group size?**`);
  lines.push(`Monterey Golf Tours plans trips for groups of 2–400 players. There is no formal minimum, but packages are optimized for groups of 4 or more.`);
  lines.push(``);
  lines.push(`**How far in advance should I book?**`);
  lines.push(`For peak season (May–October) and major events like the AT&T Pro-Am, book 6–18 months in advance. Shoulder season (November–April) allows shorter lead times of 2–6 months.`);
  lines.push(``);
  lines.push(`**Which courses are bookable through Monterey Golf Tours?**`);
  lines.push(`All 14 courses on the Monterey Peninsula are bookable, including the four Pebble Beach Resorts® courses (Pebble Beach Golf Links®, Spyglass Hill™, Del Monte™, The Hay™) and 10 public/semi-private courses including Bayonet, Black Horse, Poppy Hills, Pasadera, and others. The Links at Spanish Bay® is closed until April 17, 2027.`);
  lines.push(``);
  lines.push(`**Do you handle transfers and logistics?**`);
  lines.push(`Yes. Monterey Golf Tours coordinates tee time scheduling, airport transfers, inter-course shuttles, caddies, forecaddies, and restaurant reservations as part of a complete trip package.`);
  lines.push(``);

  // ─── Legal ────────────────────────────────────────────────────────────────
  lines.push(`## Legal`);
  lines.push(``);
  lines.push(`- [Privacy Policy](${BASE}/privacy/)`);
  lines.push(`- [Terms of Use](${BASE}/terms/)`);
  lines.push(``);
  lines.push(`## Licensed Photography`);
  lines.push(``);
  lines.push(`All Pebble Beach Resorts® images are licensed via the Pebble Beach Company Leisure Travel Sales Collection, accessed through Monterey Golf Tours' IAGTO partner agreement. Credit is mandatory per PBC licensing terms.`);
  lines.push(``);
  lines.push(`Photographers: Kevin Merfeld, Jeff Marsh, Martin Miller, Sherman Chu, Noah Webb, Jamie Alcala, Joann Dost, Randy Tunnell, Taylor Mahon, Christine Bush, TGO / Marc Howard.`);
  lines.push(``);
  lines.push(`Last updated: ${now}`);

  const body = lines.join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
