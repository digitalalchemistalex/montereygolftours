import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { COURSES } from "@/lib/courses";
import { HOTELS } from "@/lib/hotels";
import { DESTINATIONS } from "@/lib/destinations";
import { ITINERARIES } from "@/lib/itineraries";
import MobileNav from "./MobileNav";
import Logo from "./Logo";

// ── What makes each course distinct — shown in the dropdown ───────────────
const COURSE_CHAR: Record<string, string> = {
  "pebble-beach-golf-links": "Oceanside clifftop · iconic",
  "spyglass-hill":           "Pine forest into coastal dunes",
  "del-monte-golf-course":   "Oldest course west of the Mississippi",
  "the-hay":                 "9-hole short course · Tiger Woods design",
  "links-at-spanish-bay":    "Closed for renovation · reopens Apr 2027",
  "bayonet":                 "Championship · former Fort Ord",
  "black-horse":             "Monterey Bay views · Fort Ord",
  "carmel-valley-ranch":     "Fog-free inland · Pete Dye design",
  "quail-lodge":             "Sunny valley resort",
  "club-at-pasadera":        "Nicklaus Signature · Monday access",
  "poppy-hills":             "NCGA bentgrass · Del Monte Forest",
  "pacific-grove-golf-links":"Coastal municipal · ocean back nine",
  "laguna-seca-golf-ranch":  "Accessible daily-fee",
  "pasatiempo":              "Alister MacKenzie · Santa Cruz",
};

// ── Hotel quick notes for golfers ─────────────────────────────────────────
const HOTEL_NOTE: Record<string, { stars: string; note: string }> = {
  "bernardus-lodge":          { stars: "★★★★★", note: "Ultra-luxury · Carmel Valley" },
  "carmel-valley-ranch":      { stars: "★★★★",  note: "Golf resort · fog-free" },
  "quail-lodge":              { stars: "★★★★",  note: "Golf resort · valley" },
  "hyatt-regency-monterey":   { stars: "★★★★",  note: "22 secluded acres · golf groups" },
  "monterey-plaza":           { stars: "★★★★",  note: "Waterfront · Cannery Row" },
  "intercontinental-the-clement": { stars: "★★★★", note: "Boutique · oceanfront" },
  "portola-hotel":            { stars: "★★★★",  note: "Downtown Monterey" },
  "casa-munras":              { stars: "★★★",   note: "Boutique · historic garden" },
  "hotel-abrego":                      { stars: "★★★", note: "Boutique · downtown Monterey" },
  "embassy-suites-monterey-bay-seaside": { stars: "★★★", note: "All-suite · free breakfast" },
  "monterey-beach-hotel":              { stars: "★★★", note: "Beachfront · Tribute Portfolio" },
};

// ── Course groups ─────────────────────────────────────────────────────────
const PB_SLUGS   = ["pebble-beach-golf-links","spyglass-hill","del-monte-golf-course","the-hay","links-at-spanish-bay"];
const OTHER_SLUGS = ["bayonet","black-horse","carmel-valley-ranch","quail-lodge","club-at-pasadera",
                     "poppy-hills","pacific-grove-golf-links","laguna-seca-golf-ranch","pasatiempo"];

// ── Hotel groups ──────────────────────────────────────────────────────────
const MONTEREY_SLUGS    = ["hyatt-regency-monterey","monterey-plaza","intercontinental-the-clement","portola-hotel","casa-munras","hotel-abrego","embassy-suites-monterey-bay-seaside","monterey-beach-hotel"];
const CARMEL_SLUGS      = ["bernardus-lodge","quail-lodge","carmel-valley-ranch"];

const courseMap  = Object.fromEntries(COURSES.map(c => [c.slug, c]));
const hotelMap   = Object.fromEntries(HOTELS.map(h => [h.slug, h]));

// ── Featured items ────────────────────────────────────────────────────────
const FC = courseMap["bayonet"]!;
const FH = hotelMap["hyatt-regency-monterey"]!;

const SIMPLE_LINKS = [
  { label: "Packages",    href: "/packages/" },
  { label: "Blog",        href: "/blog/" },
  { label: "About",       href: "/about/" },
  { label: "FAQ",         href: "/faq/" },
];

// ── Shared primitives ─────────────────────────────────────────────────────
const chevron = (
  <svg width="10" height="6" viewBox="0 0 10 6" className="mt-[1px] opacity-60 transition-transform duration-150 group-hover/t:rotate-180">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

const DROP = "pointer-events-none absolute top-full pt-2 z-50 opacity-0 transition-all duration-200 ease-out [transform:translateY(-6px)] group-hover:pointer-events-auto group-hover:opacity-100 group-hover:[transform:translateY(0)]";
const CARD = "overflow-hidden rounded-2xl border border-[#e3ddcf]/60 bg-white shadow-[0_28px_64px_rgba(15,22,18,.32)]";

// ── Featured image panel (reused across dropdowns) ────────────────────────
function FeaturedPanel({ image, alt, title, sub, href }: {
  image: string; alt: string; title: string; sub: string; href: string;
}) {
  return (
    <Link href={href} className="group/f relative flex min-h-[280px] flex-col justify-end overflow-hidden">
      <Image src={image} alt={alt} fill
        className="object-cover transition-transform duration-500 group-hover/f:scale-105"
        sizes="240px" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(10,16,14,.95) 0%,rgba(10,16,14,.55) 55%,rgba(10,16,14,.1) 100%)" }} />
      <div className="relative p-5">
        <span className="mb-2 inline-block rounded-full bg-gold px-2.5 py-1 font-ui text-[9px] font-bold uppercase tracking-[.08em] text-ink">Featured</span>
        <div className="font-display text-[16px] font-bold leading-snug text-cream">{title}</div>
        <div className="mt-1 font-body text-[11.5px] leading-snug text-[rgba(250,246,238,.75)]">{sub}</div>
        <div className="mt-3 font-ui text-[11px] font-semibold text-gold opacity-80 group-hover/f:opacity-100">View →</div>
      </div>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 border-b border-[#e8e2d3] bg-cream/97 px-5 py-[22px] backdrop-blur-md md:px-10">
      {/* Logo */}
      <Link href="/" className="flex flex-none items-center">
        <div className="scale-90 sm:scale-100">
          <Logo size={130} />
        </div>
      </Link>

      {/* Nav */}
      <nav className="hidden flex-1 items-center justify-center gap-0.5 whitespace-nowrap lg:flex">

        {/* ━━ COURSES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="group relative">
          <Link href="/golf-courses/" className="group/t flex items-center gap-1 rounded-lg px-3.5 py-2.5 font-ui text-[14px] font-medium text-ink hover:bg-[#f4f0e7] hover:text-terracotta-dark">
            Courses {chevron}
          </Link>

          {/* 700px: dark featured left + grouped list right */}
          <div className={`${DROP} left-1/2 w-[700px] -translate-x-1/2`}>
            <div className={`${CARD} grid grid-cols-[220px_1fr]`}>

              {/* Left: featured course */}
              <FeaturedPanel
                image={FC.image!.startsWith("/") ? FC.image! : `${FC.image!}?auto=format&fit=crop&w=440&h=560&q=85`}
                alt={FC.name} title={FC.name}
                sub={COURSE_CHAR[FC.slug] ?? FC.hook}
                href={`/golf-courses/${FC.slug}/`}
              />

              {/* Right: two sections */}
              <div className="flex flex-col bg-white">
                {/* PB Resorts */}
                <div className="border-b border-[#f0ebe1] bg-[#fdfbf7] px-4 pt-4 pb-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-ui text-[9.5px] font-bold uppercase tracking-[.12em] text-[#9a8a6e]">Pebble Beach Resorts®</span>
                    <span className="rounded-full border border-gold/40 px-2 py-0.5 font-ui text-[8.5px] font-semibold uppercase tracking-[.06em] text-gold">IAGTO Partner</span>
                  </div>
                  <div className="grid grid-cols-1 gap-0">
                    {PB_SLUGS.map(slug => {
                      const c = courseMap[slug]; if (!c) return null;
                      const closed = slug === "links-at-spanish-bay";
                      return (
                        <Link key={slug} href={`/golf-courses/${slug}/`}
                          className={`flex items-baseline justify-between rounded-md px-2 py-[4px] hover:bg-[#f4f0e7] ${closed ? "opacity-50" : ""}`}>
                          <div className="flex items-center gap-2">
                            <span className="font-ui text-[12.5px] font-medium text-ink leading-tight">
                              {c.name.replace(" Golf Links\u00ae","®").replace(" Golf Course\u00ae","®").replace(" Golf Course","").replace("\u2122"," ™")}
                            </span>
                            {closed && <span className="rounded-full bg-[#ede7d5] px-1.5 py-px font-ui text-[8px] font-bold uppercase tracking-[.05em] text-[#8a7a5a]">Closed</span>}
                          </div>
                          <span className="flex-none font-body text-[10.5px] text-[#a0958a]">Par {c.par}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Other courses — 2 cols */}
                <div className="flex-1 px-4 py-3">
                  <div className="mb-2 font-ui text-[9.5px] font-bold uppercase tracking-[.12em] text-[#a8a294]">Championship, Resort & Daily Fee</div>
                  <div className="grid grid-cols-2 gap-x-2">
                    {OTHER_SLUGS.map(slug => {
                      const c = courseMap[slug]; if (!c) return null;
                      return (
                        <Link key={slug} href={`/golf-courses/${slug}/`}
                          className="flex flex-col rounded-md px-2 py-[4px] hover:bg-[#f4f0e7]">
                          <span className="font-ui text-[12px] font-medium leading-tight text-ink">{c.name.replace(" Golf Links","").replace(" Golf Course","").replace(" Golf Club","").replace(" Golf Ranch","")}</span>
                          <span className="font-body text-[10px] text-[#a0958a]">{COURSE_CHAR[slug]?.split("·")[0].trim() ?? c.city.split(",")[0]}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <Link href="/golf-courses/"
                  className="flex items-center justify-center gap-1.5 border-t border-[#f0ebe1] py-2.5 font-ui text-[12px] font-semibold text-ocean hover:bg-[#f4f0e7]">
                  View all 14 courses &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ━━ HOTELS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="group relative">
          <Link href="/hotels/" className="group/t flex items-center gap-1 rounded-lg px-3.5 py-2.5 font-ui text-[14px] font-medium text-ink hover:bg-[#f4f0e7] hover:text-terracotta-dark">
            Hotels {chevron}
          </Link>

          <div className={`${DROP} left-1/2 w-[600px] -translate-x-1/2`}>
            <div className={`${CARD} grid grid-cols-[200px_1fr]`}>
              <FeaturedPanel
                image={FH.image.startsWith("/") ? FH.image : `${FH.image}?auto=format&fit=crop&w=400&h=520&q=85`}
                alt={FH.name} title={FH.name}
                sub="22 secluded acres · Ideal for golf groups"
                href={`/hotels/${FH.slug}/`}
              />

              <div className="flex flex-col bg-white">
                {/* Monterey */}
                <div className="border-b border-[#f0ebe1] px-4 pt-4 pb-3">
                  <div className="mb-2 font-ui text-[9.5px] font-bold uppercase tracking-[.12em] text-[#a8a294]">Monterey</div>
                  {MONTEREY_SLUGS.map(slug => {
                    const h = hotelMap[slug]; if (!h) return null;
                    const meta = HOTEL_NOTE[slug];
                    return (
                      <Link key={slug} href={`/hotels/${slug}/`}
                        className="flex flex-col rounded-md px-2 py-[5px] hover:bg-[#f4f0e7]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-ui text-[12.5px] font-medium text-ink truncate">{h.name.replace(" Hotel & Spa","").replace(" Garden Hotel & Spa","").replace(" Hotel","")}</span>
                          {meta && <span className="flex-none font-body text-[10px] text-gold">{meta.stars}</span>}
                        </div>
                        {meta && <span className="font-body text-[10.5px] text-[#a0958a]">{meta.note}</span>}
                      </Link>
                    );
                  })}
                </div>
                {/* Carmel & Valley */}
                <div className="flex-1 px-4 py-3">
                  <div className="mb-2 font-ui text-[9.5px] font-bold uppercase tracking-[.12em] text-[#a8a294]">Carmel & Carmel Valley</div>
                  {CARMEL_SLUGS.map(slug => {
                    const h = hotelMap[slug]; if (!h) return null;
                    const meta = HOTEL_NOTE[slug];
                    return (
                      <Link key={slug} href={`/hotels/${slug}/`}
                        className="flex flex-col rounded-md px-2 py-[5px] hover:bg-[#f4f0e7]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-ui text-[12.5px] font-medium text-ink truncate">{h.name.replace(" Lodge & Spa","").replace(" & Golf Club","")}</span>
                          {meta && <span className="flex-none font-body text-[10px] text-gold">{meta.stars}</span>}
                        </div>
                        {meta && <span className="font-body text-[10.5px] text-[#a0958a]">{meta.note}</span>}
                      </Link>
                    );
                  })}
                </div>
                <Link href="/hotels/"
                  className="flex items-center justify-center gap-1.5 border-t border-[#f0ebe1] py-2.5 font-ui text-[12px] font-semibold text-ocean hover:bg-[#f4f0e7]">
                  View all 11 hotels &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ━━ DESTINATIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="group relative">
          <Link href="/destinations/" className="group/t flex items-center gap-1 rounded-lg px-3.5 py-2.5 font-ui text-[14px] font-medium text-ink hover:bg-[#f4f0e7] hover:text-terracotta-dark">
            Destinations {chevron}
          </Link>

          <div className={`${DROP} left-1/2 w-[600px] -translate-x-1/2`}>
            <div className={CARD}>
              <div className="border-b border-[#f0ebe1] bg-[#f9f6ef] px-5 py-2.5 flex items-center justify-between">
                <span className="font-ui text-[10px] font-bold uppercase tracking-[.12em] text-[#a8a294]">6 Areas · Monterey Peninsula + Central Coast</span>
                <Link href="/destinations/" className="font-ui text-[11px] font-semibold text-ocean hover:text-ocean-dark">View all →</Link>
              </div>
              <div className="grid grid-cols-2 gap-0">
                {Object.values(DESTINATIONS).map(d => (
                  <Link key={d.slug} href={`/destinations/${d.slug}/`}
                    className="group/d flex items-center gap-3 px-4 py-3 hover:bg-[#faf7f2] border-b border-r border-[#f5f0e8] last:border-r-0 [&:nth-child(2n)]:border-r-0">
                    {/* Destination image thumbnail */}
                    <div className="relative h-14 w-20 flex-none overflow-hidden rounded-lg">
                      <Image
                        src={`${d.image}?auto=format&fit=crop&w=160&h=112&q=70`}
                        alt={d.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover/d:scale-105"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-ui text-[13px] font-semibold text-ink group-hover/d:text-ocean leading-tight">{d.name}</div>
                      <div className="mt-0.5 font-body text-[11px] leading-snug text-[#8a857a] line-clamp-2">
                        {d.trustBar?.[0] ?? d.speakable.split(".")[0].slice(0, 60)}
                      </div>
                      <div className="mt-1 font-ui text-[10px] font-semibold text-[#b8a890] opacity-0 transition-opacity group-hover/d:opacity-100">Explore area →</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ━━ ITINERARIES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="group relative">
          <Link href="/itineraries/" className="group/t flex items-center gap-1 rounded-lg px-3.5 py-2.5 font-ui text-[14px] font-medium text-ink hover:bg-[#f4f0e7] hover:text-terracotta-dark">
            Itineraries {chevron}
          </Link>

          <div className={`${DROP} left-1/2 w-[580px] -translate-x-1/2`}>
            <div className={CARD}>
              <div className="border-b border-[#f0ebe1] bg-[#f9f6ef] px-5 py-3">
                <span className="font-ui text-[10px] font-bold uppercase tracking-[.12em] text-[#a8a294]">6 Sample Trips · 3 to 7 Days</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 p-3">
                {Object.values(ITINERARIES).map(t => (
                  <Link key={t.slug} href={`/itineraries/${t.slug}/`}
                    className="group/i relative flex flex-col overflow-hidden rounded-xl border border-[#e8e0d2] bg-[#faf7f2] p-0 hover:border-ocean/40 hover:shadow-sm">
                    {/* Colour strip by duration */}
                    <div className={`h-1 w-full ${t.durationDays <= 3 ? "bg-[#4a86b8]" : t.durationDays === 4 ? "bg-ocean" : t.durationDays === 5 ? "bg-[#2e6b44]" : "bg-gold"}`} />
                    <div className="p-3">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-ui text-[10px] font-bold uppercase tracking-[.08em] text-[#8a857a]">
                          {t.durationDays} days &middot; {t.rounds}
                        </span>
                        {t.mostBooked && (
                          <span className="rounded-full bg-gold px-2 py-0.5 font-ui text-[8.5px] font-bold uppercase tracking-[.05em] text-ink">Most booked</span>
                        )}
                      </div>
                      <div className="mt-1 font-display text-[13.5px] font-bold leading-snug text-ink group-hover/i:text-ocean">
                        {t.shortTitle}
                      </div>
                      <div className="mt-1 line-clamp-2 font-body text-[11px] leading-snug text-[#7a7670]">
                        {t.target}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-[#f0ebe1] px-4 py-2.5">
                <Link href="/itineraries/" className="font-ui text-[12px] font-semibold text-ocean hover:underline">See all itineraries &rarr;</Link>
                <Link href="/quote/" className="rounded-lg bg-ocean px-4 py-2 font-ui text-[12px] font-semibold text-cream hover:bg-ocean-dark">Get a custom quote</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Simple links */}
        {SIMPLE_LINKS.map(l => (
          <Link key={l.href} href={l.href}
            className="rounded-lg px-3.5 py-2.5 font-ui text-[14px] font-medium text-ink hover:bg-[#f4f0e7] hover:text-terracotta-dark">
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex flex-none items-center gap-3">
        <a href={SITE.phoneHref} className="hidden font-ui text-[13px] font-semibold text-ink/70 hover:text-ink sm:inline">
          {SITE.phone}
        </a>
        <Link href="/quote/"
          className="hidden rounded-[7px] bg-gold px-4 py-[9px] font-ui text-[14px] font-bold text-ink hover:bg-[#e6b82a] lg:inline-block">
          Get a Quote
        </Link>
        <MobileNav />
      </div>
    </header>
  );
}
