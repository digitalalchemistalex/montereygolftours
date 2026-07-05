import Link from "next/link";
import { SITE } from "@/lib/site";
import { COURSES } from "@/lib/courses";
import { HOTELS } from "@/lib/hotels";
import { DESTINATIONS } from "@/lib/destinations";
import { ITINERARIES } from "@/lib/itineraries";
import MobileNav from "./MobileNav";
import Logo from "./Logo";

// ── Static course groups ──────────────────────────────────────────────────
const COURSE_GROUPS = [
  {
    label: "Pebble Beach Resorts\u00ae",
    slugs: ["pebble-beach-golf-links","spyglass-hill","del-monte-golf-course","the-hay","links-at-spanish-bay"],
  },
  {
    label: "Resort & Valley",
    slugs: ["carmel-valley-ranch","quail-lodge","club-at-pasadera"],
  },
  {
    label: "Championship Public",
    slugs: ["bayonet","black-horse","poppy-hills"],
  },
  {
    label: "Daily Fee & Municipal",
    slugs: ["pacific-grove-golf-links","laguna-seca-golf-ranch","pasatiempo"],
  },
];

const courseMap = Object.fromEntries(COURSES.map((c) => [c.slug, c]));

// ── Hotel groups ──────────────────────────────────────────────────────────
const HOTEL_GROUPS = [
  {
    label: "Monterey",
    slugs: ["hyatt-regency-monterey","monterey-plaza","intercontinental-the-clement","portola-hotel","casa-munras"],
  },
  {
    label: "Carmel & Valley",
    slugs: ["bernardus-lodge","lauberge-carmel","quail-lodge","carmel-valley-ranch"],
  },
];
const hotelMap = Object.fromEntries(HOTELS.map((h) => [h.slug, h]));

// ── Itinerary cards ───────────────────────────────────────────────────────
const ITIN_ORDER = [
  "3-day-monterey-golf-weekend",
  "4-day-monterey-peninsula-golf-trip",
  "5-day-complete-monterey-golf-vacation",
  "7-day-ultimate-monterey-golf-trip",
  "carmel-valley-golf-getaway",
  "monterey-golf-trip-best-value",
];

const SIMPLE_LINKS = [
  { label: "Packages", href: "/packages/" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
  { label: "FAQ", href: "/faq/" },
];

// Shared dropdown shell
const DROP_CLS =
  "pointer-events-none absolute top-full z-50 pt-2 opacity-0 transition-all duration-200 ease-out [transform:translateY(-6px)] group-hover:pointer-events-auto group-hover:opacity-100 group-hover:[transform:translateY(0)]";
const PANEL_CLS =
  "overflow-hidden rounded-2xl border border-[#e3ddcf] bg-white shadow-[0_24px_60px_rgba(20,25,20,.28)]";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 border-b border-[rgba(255,255,255,.07)] bg-[#16242c]/96 px-5 py-4 backdrop-blur-md md:px-10">
      <Link href="/" className="flex flex-none items-center">
        <Logo />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden flex-1 items-center justify-center gap-1 whitespace-nowrap lg:flex">

        {/* ── COURSES ────────────────────────────────────────────────────── */}
        <div className="group relative">
          <Link href="/golf-courses/" className="flex items-center gap-1 rounded-lg px-3 py-2 font-ui text-[14px] font-medium text-[#f6f2e7] hover:bg-white/10 hover:text-gold">
            Courses
            <svg width="10" height="6" viewBox="0 0 10 6" className="mt-[1px] opacity-60"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
          </Link>

          <div className={`${DROP_CLS} left-1/2 w-[740px] -translate-x-1/2`}>
            <div className={PANEL_CLS}>
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-[#f0ebe1] bg-[#f9f6ef] px-5 py-3">
                <span className="font-ui text-[10.5px] font-bold uppercase tracking-[.1em] text-[#8a857a]">14 Courses &middot; Monterey Peninsula + Central Coast</span>
                <Link href="/golf-courses/" className="font-ui text-[11.5px] font-semibold text-ocean hover:text-ocean-dark">View all &rarr;</Link>
              </div>
              {/* 4-group grid */}
              <div className="grid grid-cols-4 divide-x divide-[#f0ebe1] p-0">
                {COURSE_GROUPS.map((group) => (
                  <div key={group.label} className="px-3 py-3">
                    <div className="mb-2 font-ui text-[9.5px] font-bold uppercase tracking-[.1em] text-[#a8a294]">{group.label}</div>
                    {group.slugs.map((slug) => {
                      const c = courseMap[slug];
                      if (!c) return null;
                      const isClosed = slug === "links-at-spanish-bay";
                      return (
                        <Link
                          key={slug}
                          href={`/golf-courses/${slug}/`}
                          className={`group/c flex flex-col rounded-md px-2 py-[5px] hover:bg-[#f4f0e7] ${isClosed ? "opacity-60" : ""}`}
                        >
                          <span className="flex items-center gap-1 font-ui text-[12.5px] font-medium leading-tight text-ink">
                            {c.name.replace("® Golf Course","®").replace(" Golf Links","").replace(" Golf Course","").replace(" Golf Club","")}
                            {isClosed && (
                              <span className="rounded-full bg-[#e8e0d2] px-1.5 py-px font-ui text-[8.5px] font-bold uppercase tracking-[.05em] text-[#8a857a]">Closed</span>
                            )}
                          </span>
                          <span className="font-body text-[10.5px] text-[#9a9287]">Par {c.par} &middot; {c.city.split(",")[0]}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── HOTELS ─────────────────────────────────────────────────────── */}
        <div className="group relative">
          <Link href="/hotels/" className="flex items-center gap-1 rounded-lg px-3 py-2 font-ui text-[14px] font-medium text-[#f6f2e7] hover:bg-white/10 hover:text-gold">
            Hotels
            <svg width="10" height="6" viewBox="0 0 10 6" className="mt-[1px] opacity-60"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
          </Link>

          <div className={`${DROP_CLS} left-1/2 w-[560px] -translate-x-1/2`}>
            <div className={PANEL_CLS}>
              <div className="flex items-center justify-between border-b border-[#f0ebe1] bg-[#f9f6ef] px-5 py-3">
                <span className="font-ui text-[10.5px] font-bold uppercase tracking-[.1em] text-[#8a857a]">9 Hotels &middot; Monterey, Carmel &amp; Carmel Valley</span>
                <Link href="/hotels/" className="font-ui text-[11.5px] font-semibold text-ocean hover:text-ocean-dark">View all &rarr;</Link>
              </div>
              <div className="grid grid-cols-2 divide-x divide-[#f0ebe1] p-0">
                {HOTEL_GROUPS.map((group) => (
                  <div key={group.label} className="px-4 py-3">
                    <div className="mb-2 font-ui text-[9.5px] font-bold uppercase tracking-[.1em] text-[#a8a294]">{group.label}</div>
                    {group.slugs.map((slug) => {
                      const h = hotelMap[slug];
                      if (!h) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/hotels/${slug}/`}
                          className="flex flex-col rounded-md px-2 py-[5px] hover:bg-[#f4f0e7]"
                        >
                          <span className="font-ui text-[12.5px] font-medium leading-tight text-ink">{h.name}</span>
                          <span className="font-body text-[10.5px] text-[#9a9287]">{h.city.split(",")[0]}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── DESTINATIONS ───────────────────────────────────────────────── */}
        <div className="group relative">
          <Link href="/destinations/" className="flex items-center gap-1 rounded-lg px-3 py-2 font-ui text-[14px] font-medium text-[#f6f2e7] hover:bg-white/10 hover:text-gold">
            Destinations
            <svg width="10" height="6" viewBox="0 0 10 6" className="mt-[1px] opacity-60"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
          </Link>

          <div className={`${DROP_CLS} left-1/2 w-[420px] -translate-x-1/2`}>
            <div className={PANEL_CLS}>
              <div className="flex items-center justify-between border-b border-[#f0ebe1] bg-[#f9f6ef] px-5 py-3">
                <span className="font-ui text-[10.5px] font-bold uppercase tracking-[.1em] text-[#8a857a]">6 Destination Areas</span>
                <Link href="/destinations/" className="font-ui text-[11.5px] font-semibold text-ocean hover:text-ocean-dark">View all &rarr;</Link>
              </div>
              <div className="grid grid-cols-2 gap-0 p-3">
                {Object.values(DESTINATIONS).map((d) => (
                  <Link
                    key={d.slug}
                    href={`/destinations/${d.slug}/`}
                    className="flex flex-col rounded-lg px-3 py-2.5 hover:bg-[#f4f0e7]"
                  >
                    <span className="font-ui text-[13px] font-semibold text-ink">{d.name}</span>
                    <span className="mt-0.5 line-clamp-1 font-body text-[11px] text-[#8a857a]">{d.speakable?.split(".")[0] ?? ""}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── ITINERARIES ────────────────────────────────────────────────── */}
        <div className="group relative">
          <Link href="/itineraries/" className="flex items-center gap-1 rounded-lg px-3 py-2 font-ui text-[14px] font-medium text-[#f6f2e7] hover:bg-white/10 hover:text-gold">
            Itineraries
            <svg width="10" height="6" viewBox="0 0 10 6" className="mt-[1px] opacity-60"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
          </Link>

          <div className={`${DROP_CLS} left-1/2 w-[580px] -translate-x-1/2`}>
            <div className={PANEL_CLS}>
              <div className="flex items-center justify-between border-b border-[#f0ebe1] bg-[#f9f6ef] px-5 py-3">
                <span className="font-ui text-[10.5px] font-bold uppercase tracking-[.1em] text-[#8a857a]">6 Sample Trips &middot; 3 to 7 Days</span>
                <Link href="/itineraries/" className="font-ui text-[11.5px] font-semibold text-ocean hover:text-ocean-dark">View all &rarr;</Link>
              </div>
              <div className="grid grid-cols-3 gap-2 p-3">
                {ITIN_ORDER.map((slug) => {
                  const t = ITINERARIES[slug];
                  if (!t) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/itineraries/${slug}/`}
                      className="group/t relative flex flex-col rounded-xl border border-[#e8e0d2] bg-[#faf7f2] p-3 hover:border-ocean hover:bg-white"
                    >
                      {t.mostBooked && (
                        <span className="mb-1.5 self-start rounded-full bg-gold px-2 py-px font-ui text-[8.5px] font-bold uppercase tracking-[.05em] text-ink">Most booked</span>
                      )}
                      <span className="font-ui text-[10px] font-bold uppercase tracking-[.08em] text-[#8a857a]">
                        {t.durationDays} days &middot; {t.rounds}
                      </span>
                      <span className="mt-0.5 font-display text-[13px] font-bold leading-snug text-ink">{t.shortTitle ?? t.title}</span>
                      <span className="mt-1 line-clamp-2 font-body text-[10.5px] leading-snug text-[#7a7670]">{t.target}</span>
                    </Link>
                  );
                })}
              </div>
              <div className="flex items-center justify-between border-t border-[#f0ebe1] px-4 py-2.5">
                <Link href="/itineraries/" className="font-ui text-[12px] font-semibold text-ocean hover:underline">See all itineraries &rarr;</Link>
                <Link href="/quote/" className="rounded-lg bg-ocean px-3.5 py-2 font-ui text-[12px] font-semibold text-cream hover:bg-ocean-dark">Get a custom quote</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Simple links */}
        {SIMPLE_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 font-ui text-[14px] font-medium text-[#f6f2e7] hover:bg-white/10 hover:text-gold">
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-none items-center gap-3">
        <a href={SITE.phoneHref} className="hidden font-ui text-[13.5px] font-semibold text-[#f3efe2] opacity-90 hover:opacity-100 sm:inline">
          {SITE.phone}
        </a>
        <Link href="/quote/" className="hidden rounded-[7px] bg-gold px-4 py-[9px] font-ui text-[14px] font-bold text-ink hover:bg-[#e6b82a] lg:inline-block">
          Get a Quote
        </Link>
        <MobileNav />
      </div>
    </header>
  );
}
