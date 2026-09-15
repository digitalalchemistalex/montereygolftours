import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PBCEvents from "@/components/PBCEvents";
import PBCMajorsBanner from "@/components/PBCMajorsBanner";
import { SITE } from "@/lib/site";

// ─────────────────────────────────────────────────────────────────────────────
// UTM — all outbound PBC links on this page use utm_campaign=pbc-hub so that
// PBC's GA shows montereygolftours.com/pebble-beach/ as a single clean referrer.
// ─────────────────────────────────────────────────────────────────────────────
const UTM = "utm_source=montereygolftours&utm_medium=referral&utm_campaign=pbc-hub";

const PBC_COURSES = [
  {
    slug: "pebble-beach-golf-links",
    name: "Pebble Beach Golf Links®",
    par: "Par 72 · 6,802 yds",
    hook: "The world's most famous public course — clifftop drama on Stillwater Cove. Six U.S. Opens.",
    pbcPath: "/golf/pebble-beach-golf-links/",
    utmContent: "pbgl-course",
    iagto: true,
    closed: false,
  },
  {
    slug: "spyglass-hill",
    name: "Spyglass Hill™ Golf Course",
    par: "Par 72 · 6,960 yds",
    hook: "Robert Trent Jones Sr. masterpiece — pine forest drops to coastal dunes. Rating 75.4, slope 145.",
    pbcPath: "/golf/spyglass-hill-golf-course/",
    utmContent: "spyglass-course",
    iagto: true,
    closed: false,
  },
  {
    slug: "del-monte-golf-course",
    name: "Del Monte™ Golf Course",
    par: "Par 72 · 6,356 yds",
    hook: "Oldest course in continuous use west of the Mississippi, est. 1897. Historic and accessible.",
    pbcPath: "/golf/del-monte-golf-course/",
    utmContent: "del-monte-course",
    iagto: true,
    closed: false,
  },
  {
    slug: "the-hay",
    name: "The Hay™",
    par: "Par 27 · 670 yds · 9 holes",
    hook: "Tiger Woods and TGR Design (2021). The perfect warm-up — a replica of the famous 7th hole included.",
    pbcPath: "/golf/the-hay/",
    utmContent: "the-hay-course",
    iagto: false,
    closed: false,
  },
  {
    slug: "links-at-spanish-bay",
    name: "The Links at Spanish Bay®",
    par: "Par 72 · Links style",
    hook: "Closed for a Gil Hanse transformation — reopens April 17, 2027. Join the waitlist now.",
    pbcPath: "/golf/the-links-at-spanish-bay/",
    utmContent: "spanish-bay-course",
    iagto: true,
    closed: true,
  },
] as const;

const PBC_HOTELS = [
  {
    slug: "lodge-at-pebble-beach",
    name: "The Lodge at Pebble Beach™",
    detail: "Open since 1919 · Steps from the 1st tee · Fairway One Cottages",
    pbcPath: "/accommodations/the-lodge-at-pebble-beach/",
    utmContent: "lodge-hotel",
  },
  {
    slug: "inn-at-spanish-bay",
    name: "The Inn at Spanish Bay™",
    detail: "Scottish links atmosphere · Nightly bagpiper · Ocean-view rooms",
    pbcPath: "/accommodations/the-inn-at-spanish-bay/",
    utmContent: "inn-hotel",
  },
  {
    slug: "casa-palmero",
    name: "Casa Palmero™",
    detail: "24-room exclusive retreat · Complimentary spa · Most intimate PBR property",
    pbcPath: "/accommodations/casa-palmero-at-pebble-beach/",
    utmContent: "casa-hotel",
  },
] as const;

const EXPERIENCES = [
  {
    label: "Live Golf Cams",
    desc: "Watch the 18th green, 17th, 1st tee, and putting green live.",
    href: `https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/?${UTM}&utm_content=live-cams`,
    internal: "/golf-courses/pebble-beach-golf-links/live-cams/",
  },
  {
    label: "Tournaments You Can Play",
    desc: "13 amateur tournaments per year. Groups of any size welcome.",
    href: `https://www.pebblebeach.com/golf/tournaments-you-can-play/?${UTM}&utm_content=tournaments`,
    internal: null,
  },
  {
    label: "Plan My Trip",
    desc: "Pebble Beach Resorts® direct booking — lodging, tee times, dining.",
    href: `https://www.pebblebeach.com/plan-my-trip/?${UTM}&utm_content=plan-my-trip`,
    internal: null,
  },
  {
    label: "2027 U.S. Open",
    desc: "June 17–20, 2027 at Pebble Beach Golf Links®.",
    href: `https://www.pebblebeach.com/events/us-open-championship/?${UTM}&utm_content=us-open`,
    internal: null,
  },
] as const;

export const metadata: Metadata = {
  title: "Pebble Beach Golf Packages — Courses, Hotels & Tee Times | Monterey Golf Tours",
  description:
    "Everything about Pebble Beach Resorts® for your golf trip — Pebble Beach Golf Links®, Spyglass Hill™, Del Monte™, The Hay™, and all three resort hotels. As an IAGTO Authorized Operator, we book the full experience.",
  alternates: {
    canonical: `https://${SITE.domain}/pebble-beach/`,
  },
  openGraph: {
    type: "website",
    title: "Pebble Beach Golf Packages | Monterey Golf Tours",
    description:
      "Pebble Beach Golf Links®, Spyglass Hill™, Del Monte™, The Hay™ — tee times, lodging, and full trip planning by an IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator.",
    url: `https://${SITE.domain}/pebble-beach/`,
    images: [{ url: `https://${SITE.domain}/images/pbc-portal/pbgl-18th-hole-aerial.jpg`, width: 1200, height: 800, alt: "Pebble Beach Golf Links® 18th hole" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pebble Beach Golf Packages | Monterey Golf Tours",
    description: "IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator — courses, hotels, events, live cams.",
  },
};

const ExternalArrow = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function PebbleBeachHubPage() {
  return (
    <>
      <Header />
      <main className="flex-1">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[60vh] overflow-hidden bg-[#0a1610]">
          <Image
            src="/images/pbc-portal/pbgl-18th-hole-aerial.jpg"
            alt="Pebble Beach Golf Links® 18th hole aerial, Pebble Beach, CA"
            fill
            className="object-cover opacity-50"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,22,16,.3)] via-transparent to-[#0a1610]" />
          <div className="relative flex min-h-[60vh] flex-col items-start justify-end px-6 pb-14 md:px-14 md:pb-20">
            <span className="mb-3 inline-block rounded-full bg-gold/25 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[.14em] text-gold">
              IAGTO Partner · Authorized Pebble Beach Resorts® Golf Travel Operator
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-cream md:text-6xl">
              Pebble Beach<br className="hidden md:block" /> golf packages
            </h1>
            <p className="mt-4 max-w-2xl font-body text-[16px] leading-relaxed text-[rgba(250,246,238,.72)]">
              Five courses. Three resort hotels. One of the most celebrated stretches of
              coastline in the world. We plan everything — tee times, accommodation, transfers,
              and the details that make it a trip you remember.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote/"
                className="inline-block rounded-[9px] bg-gold px-7 py-4 font-ui text-[15px] font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#e6b82a]"
              >
                Get a custom quote →
              </Link>
              <a
                href={`https://www.pebblebeach.com/plan-my-trip/?${UTM}&utm_content=hero-plan`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[9px] border border-[rgba(250,246,238,.25)] px-7 py-4 font-ui text-[15px] font-semibold text-cream transition-colors hover:border-[rgba(250,246,238,.5)]"
              >
                Plan direct with PBR <ExternalArrow />
              </a>
            </div>
          </div>
        </section>

        {/* ── MAJORS BANNER ────────────────────────────────────────────────── */}
        <PBCMajorsBanner />

        {/* ── BREADCRUMB ───────────────────────────────────────────────────── */}
        <div className="border-b border-[#e8e2d3] bg-cream px-6 py-3 md:px-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 font-ui text-[12px] text-[#a8a294]">
              <li><Link href="/" className="hover:text-ink">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li className="text-ink">Pebble Beach Resorts®</li>
            </ol>
          </nav>
        </div>

        {/* ── COURSES ──────────────────────────────────────────────────────── */}
        <section className="border-b border-fairwayborder bg-cream px-6 py-14 md:px-14 md:py-20">
          <div className="mb-2 flex items-center gap-3">
            <span className="rounded-full bg-gold/20 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[.12em] text-[#8a6a00]">
              Golf Courses
            </span>
            <span className="rounded-full border border-gold/40 px-2.5 py-1 font-ui text-[9px] font-semibold uppercase tracking-[.07em] text-gold">
              IAGTO Partner
            </span>
          </div>
          <h2 className="mb-8 font-display text-3xl font-bold text-ink md:text-4xl">
            Five courses at Pebble Beach Resorts®
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PBC_COURSES.map((course) => (
              <div
                key={course.slug}
                className={`group flex flex-col overflow-hidden rounded-2xl border ${course.closed ? "border-[#e8e0d0] bg-[#faf7f2] opacity-75" : "border-[#e8e0d0] bg-white hover:border-fairway/40 hover:shadow-md transition-all duration-200"}`}
              >
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-ui text-[13.5px] font-bold text-ink leading-snug">
                        {course.name}
                      </div>
                      <div className="mt-0.5 font-body text-[11.5px] text-[#9a9088]">
                        {course.par}
                      </div>
                    </div>
                    <div className="flex flex-none flex-col gap-1 items-end">
                      {course.iagto && (
                        <span className="rounded-full bg-gold/15 px-2 py-0.5 font-ui text-[8.5px] font-bold uppercase tracking-[.05em] text-[#8a6a00]">
                          IAGTO
                        </span>
                      )}
                      {course.closed && (
                        <span className="rounded-full bg-[#ede7d5] px-2 py-0.5 font-ui text-[8.5px] font-bold uppercase tracking-[.05em] text-[#8a7a5a]">
                          Closed
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 flex-1 font-body text-[13px] leading-relaxed text-[#5a5448]">
                    {course.hook}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <Link
                      href={`/golf-courses/${course.slug}/`}
                      className="font-ui text-[12px] font-semibold text-fairway hover:underline"
                    >
                      Course details →
                    </Link>
                    <a
                      href={`https://www.pebblebeach.com${course.pbcPath}?${UTM}&utm_content=${course.utmContent}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-ui text-[12px] font-semibold text-[#a8a294] hover:text-fairway"
                    >
                      PebbleBeach.com <ExternalArrow />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOTELS ───────────────────────────────────────────────────────── */}
        <section className="border-b border-fairwayborder bg-[#f9f6ef] px-6 py-14 md:px-14 md:py-20">
          <span className="mb-3 inline-block rounded-full bg-fairway/10 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[.12em] text-fairway">
            Resort Hotels
          </span>
          <h2 className="mb-8 font-display text-3xl font-bold text-ink md:text-4xl">
            Three hotels, one resort
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {PBC_HOTELS.map((hotel) => (
              <div
                key={hotel.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8e0d0] bg-white transition-all duration-200 hover:border-fairway/40 hover:shadow-md"
              >
                <div className="flex flex-1 flex-col p-5">
                  <div className="font-ui text-[13.5px] font-bold text-ink leading-snug">
                    {hotel.name}
                  </div>
                  <p className="mt-2 flex-1 font-body text-[13px] text-[#5a5448]">
                    {hotel.detail}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <Link
                      href={`/hotels/${hotel.slug}/`}
                      className="font-ui text-[12px] font-semibold text-fairway hover:underline"
                    >
                      Hotel details →
                    </Link>
                    <a
                      href={`https://www.pebblebeach.com${hotel.pbcPath}?${UTM}&utm_content=${hotel.utmContent}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-ui text-[12px] font-semibold text-[#a8a294] hover:text-fairway"
                    >
                      PebbleBeach.com <ExternalArrow />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 font-body text-[13px] text-[#8a857a]">
            All three hotels share access to The Beach &amp; Tennis Club™ and The Spanish Bay Club™.
            Pebble Beach Golf Links® stay typically requires a minimum of 3 nights.
          </p>
        </section>

        {/* ── EXPERIENCES / QUICK LINKS ─────────────────────────────────────── */}
        <section className="border-b border-fairwayborder bg-white px-6 py-14 md:px-14 md:py-20">
          <h2 className="mb-8 font-display text-3xl font-bold text-ink md:text-4xl">
            More from Pebble Beach Resorts®
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERIENCES.map((exp) => (
              <a
                key={exp.label}
                href={exp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-2xl border border-[#e8e0d0] bg-[#faf7f2] px-5 py-5 transition-all hover:border-fairway/40 hover:bg-white"
              >
                <div className="font-ui text-[13.5px] font-bold text-ink group-hover:text-fairway leading-snug flex items-center justify-between gap-2">
                  {exp.label} <ExternalArrow />
                </div>
                <div className="font-body text-[13px] text-[#6a6358]">{exp.desc}</div>

              </a>
            ))}
          </div>
        </section>

        {/* ── EVENTS CALENDAR ──────────────────────────────────────────────── */}
        <PBCEvents
          tiers={["golf", "lifestyle"]}
          showRecurring={true}
          title="Upcoming events at Pebble Beach Resorts®"
          subtitle="Every event, recurring and dated — plan your trip around the calendar."
        />

        {/* ── IAGTO TRUST + CTA ────────────────────────────────────────────── */}
        <section className="bg-[#0a1610] px-6 py-16 text-center md:px-14 md:py-20">
          <span className="mb-4 inline-block rounded-full border border-gold/40 px-4 py-1.5 font-ui text-[10px] font-bold uppercase tracking-[.14em] text-gold">
            IAGTO Partner · Authorized Pebble Beach Resorts® Golf Travel Operator
          </span>
          <h2 className="font-display text-3xl font-bold text-cream md:text-4xl">
            Book Pebble Beach through us
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-[15px] leading-relaxed text-[rgba(250,246,238,.65)]">
            As an IAGTO-contracted operator we access Pebble Beach tee times, IAGTO rates, and
            the full resort experience — wrapped into a single planned trip for groups of{" "}
            {SITE.minGroupSize}–{SITE.maxGroupSize} players.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/quote/"
              className="inline-block rounded-[9px] bg-gold px-8 py-4 font-ui text-[15px] font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#e6b82a]"
            >
              Get a custom quote →
            </Link>
            <a
              href={`https://www.pebblebeach.com/plan-my-trip/?${UTM}&utm_content=bottom-cta`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[9px] border border-[rgba(250,246,238,.2)] px-8 py-4 font-ui text-[15px] font-semibold text-cream transition-colors hover:border-[rgba(250,246,238,.45)]"
            >
              Book direct with PBR <ExternalArrow />
            </a>
          </div>
          <p className="mt-6 font-body text-[12px] text-[rgba(250,246,238,.3)]">
            Pebble Beach Golf Links® stay minimum is typically 3 nights.
            Groups may book up to 18 months in advance as Lodge guests.
          </p>
        </section>

      </main>
      <Footer />
    </>
  );
}
