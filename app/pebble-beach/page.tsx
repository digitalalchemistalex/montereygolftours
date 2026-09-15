import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

const BASE = `https://${SITE.domain}`;
const PAGE_URL = `${BASE}/pebble-beach/`;
const OG_IMAGE = `${BASE}/images/pbc-portal/pbgl-18th-hole-aerial.jpg`;

// ─── SCHEMA ──────────────────────────────────────────────────────────────────
const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      "url": PAGE_URL,
      "name": "Pebble Beach Golf Packages — Book With an IAGTO Authorized Operator | Monterey Golf Tours",
      "description": "Book a Pebble Beach golf package through Monterey Golf Tours — IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator. Tee times at Pebble Beach Golf Links®, Spyglass Hill™, Del Monte™, and The Hay™. Lodging, transfers, and full trip planning for groups of 2–400.",
      "isPartOf": { "@id": `${BASE}/#website` },
      "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", ".speakable-intro"]
      },
      "dateModified": "2026-09-14"
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
        { "@type": "ListItem", "position": 2, "name": "Pebble Beach Golf Packages", "item": PAGE_URL }
      ]
    },
    {
      "@type": "TravelAgency",
      "@id": `${BASE}/#travelagency`,
      "name": "Monterey Golf Tours",
      "url": BASE,
      "telephone": SITE.phone,
      "email": SITE.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "140 W Franklin St Ste 203",
        "addressLocality": "Monterey",
        "addressRegion": "CA",
        "postalCode": "93940",
        "addressCountry": "US"
      },
      "areaServed": { "@type": "Place", "name": "Monterey Peninsula, California" },
      "description": "IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator. We plan and book Pebble Beach golf packages for groups of 2–400 — tee times, lodging, and transfers in one quote."
    },
    {
      "@type": "Service",
      "name": "Pebble Beach Golf Package Planning",
      "provider": { "@id": `${BASE}/#travelagency` },
      "serviceType": "Golf Trip Planning",
      "areaServed": { "@type": "Place", "name": "Pebble Beach, California" },
      "description": "End-to-end Pebble Beach golf trip planning — IAGTO tee times at Pebble Beach Golf Links®, Spyglass Hill™ Golf Course, Del Monte™ Golf Course, and The Hay™; lodging at The Lodge at Pebble Beach™, The Inn at Spanish Bay™, or Casa Palmero™; and all transfers.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "description": "Custom quote based on group size, dates, course selection, and lodging tier. Contact for pricing."
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I book a Pebble Beach golf package for my group?",
          "acceptedAnswer": { "@type": "Answer", "text": "Submit a quote request at montereygolftours.com/quote/ with your group size, preferred dates, and courses. As an IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator, we access IAGTO tee times and rates, then build a full package — tee times, lodging, and transfers — in a single quote." }
        },
        {
          "@type": "Question",
          "name": "Do you need to stay at The Lodge at Pebble Beach to play Pebble Beach Golf Links®?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — Pebble Beach Golf Links® tee times require a hotel stay, typically a minimum of 3 nights at a Pebble Beach Resorts® property (The Lodge, The Inn at Spanish Bay, or Casa Palmero). Lodge guests receive the earliest advance booking window — up to 18 months." }
        },
        {
          "@type": "Question",
          "name": "What courses are included in a Pebble Beach golf package?",
          "acceptedAnswer": { "@type": "Answer", "text": "We can book Pebble Beach Golf Links®, Spyglass Hill™ Golf Course, Del Monte™ Golf Course, and The Hay™ as part of a package. Most groups pair Pebble Beach Golf Links® with Spyglass Hill™ and one or two non-resort courses like Bayonet or Poppy Hills." }
        },
        {
          "@type": "Question",
          "name": "How much does a Pebble Beach golf package cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Pebble Beach Golf Links® green fees are set by Pebble Beach Resorts® and vary by season — contact us for current IAGTO rates. Full packages including lodging and multiple rounds are priced on request based on group size, hotel tier, and dates. We do not publish per-round prices; all pricing comes via custom quote." }
        },
        {
          "@type": "Question",
          "name": "What is an IAGTO Authorized Pebble Beach Golf Travel Operator?",
          "acceptedAnswer": { "@type": "Answer", "text": "IAGTO (International Association of Golf Tour Operators) is the global trade body for golf travel. An IAGTO-contracted operator has a direct agreement with Pebble Beach Resorts® to book tee times at IAGTO rates and promote PBC courses to travelling golfers. Monterey Golf Tours holds this authorization." }
        }
      ]
    },
    {
      "@type": "Event",
      "name": "AT&T Pebble Beach Pro-Am 2027",
      "startDate": "2027-02-01",
      "endDate": "2027-02-07",
      "location": { "@type": "Place", "name": "Pebble Beach Golf Links®", "address": { "@type": "PostalAddress", "addressLocality": "Pebble Beach", "addressRegion": "CA" } },
      "description": "Annual PGA Tour event at Pebble Beach Golf Links®. Plan a trip around the Pro-Am with Monterey Golf Tours."
    },
    {
      "@type": "Event",
      "name": "2027 U.S. Open Championship",
      "startDate": "2027-06-17",
      "endDate": "2027-06-20",
      "location": { "@type": "Place", "name": "Pebble Beach Golf Links®", "address": { "@type": "PostalAddress", "addressLocality": "Pebble Beach", "addressRegion": "CA" } },
      "description": "The 2027 U.S. Open at Pebble Beach Golf Links®. Book your trip around the championship with Monterey Golf Tours."
    }
  ]
};

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Pebble Beach Golf Packages — Book With an IAGTO Authorized Operator | Monterey Golf Tours",
  description:
    "Book a Pebble Beach golf package with Monterey Golf Tours — IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator. Tee times, lodging, and full trip planning for groups of 2–400. Get a custom quote.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    title: "Pebble Beach Golf Packages | Monterey Golf Tours",
    description:
      "IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator. Tee times at Pebble Beach Golf Links®, Spyglass Hill™, Del Monte™, The Hay™. Lodging and transfers. Groups of 2–400. Custom quote.",
    url: PAGE_URL,
    siteName: "Monterey Golf Tours",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Pebble Beach Golf Links® 18th hole — book your package with Monterey Golf Tours" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pebble Beach Golf Packages | Monterey Golf Tours",
    description: "IAGTO Authorized Operator. Tee times, lodging, and full trip planning for groups of 2–400. Custom quote.",
    images: [OG_IMAGE],
  },
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const WHAT_WE_BOOK = [
  { name: "Pebble Beach Golf Links®", slug: "pebble-beach-golf-links", detail: "Par 72 · 6,802 yds · No. 1 Public Course in America · IAGTO rates", highlight: true },
  { name: "Spyglass Hill™ Golf Course", slug: "spyglass-hill", detail: "Par 72 · 6,960 yds · Rating 75.4 · Slope 145 · IAGTO rates", highlight: false },
  { name: "Del Monte™ Golf Course", slug: "del-monte-golf-course", detail: "Par 72 · 6,356 yds · Est. 1897 · IAGTO rates", highlight: false },
  { name: "The Hay™", slug: "the-hay", detail: "Par 27 · 9 holes · Tiger Woods design · Warm-up or twilight", highlight: false },
  { name: "Bayonet", slug: "bayonet", detail: "Par 72 · 7,024 yds · Former Fort Ord · Championship layout", highlight: false },
  { name: "Poppy Hills Golf Course", slug: "poppy-hills", detail: "Par 71 · 7,091 yds · NCGA · No resort gate fee", highlight: false },
] as const;

const LODGING = [
  { name: "The Lodge at Pebble Beach™", slug: "lodge-at-pebble-beach", tier: "IAGTO Property", note: "Steps from the 1st tee · 18-month advance booking · Fairway One Cottages" },
  { name: "The Inn at Spanish Bay™", slug: "inn-at-spanish-bay", tier: "IAGTO Property", note: "Ocean-view rooms · Nightly bagpiper · Scottish links atmosphere" },
  { name: "Casa Palmero™", slug: "casa-palmero", tier: "IAGTO Property", note: "24-room estate · Complimentary spa · Most exclusive PBR address" },
  { name: "Hyatt Regency Monterey", slug: "hyatt-regency-monterey", tier: "Non-resort", note: "Sits on Del Monte™ Golf Course · 560 rooms · Best for large groups" },
  { name: "Monterey Plaza Hotel & Spa", slug: "monterey-plaza-hotel", tier: "Non-resort", note: "Forbes Four-Star · Cannery Row · Best non-resort waterfront option" },
] as const;

const PACKAGES: { slug: string; name: string; duration: string; rounds: string; courses: string; hotel: string; hook: string; mostBooked?: boolean }[] = [
  {
    slug: "pebble-beach-golf-package",
    name: "The Pebble Pilgrimage",
    duration: "4 days",
    rounds: "4 rounds",
    courses: "Pebble Beach Golf Links® · Spyglass Hill™ · Poppy Hills · Bayonet",
    hotel: "Monterey Plaza or Hyatt Regency",
    hook: "The classic bucket-list trip. PBGL and Spyglass back-to-back, with Poppy Hills as the warm-up and Bayonet as the closer.",
  },
  {
    slug: "7-day-ultimate-monterey-golf-trip",
    name: "The Ultimate Monterey",
    duration: "7 days",
    rounds: "7 rounds",
    courses: "Pebble Beach Golf Links® · Spyglass Hill™ · Del Monte™ · Bayonet · Black Horse · CVR · Pasatiempo",
    hotel: "Split Monterey + Carmel Valley",
    hook: "Every major course on the peninsula in one week. Built for groups who want the complete Monterey experience.",
  },
  {
    slug: "4-day-monterey-peninsula-golf-trip",
    name: "4-Day Classic Peninsula",
    duration: "4 days",
    rounds: "4 rounds",
    courses: "Poppy Hills · Bayonet · Carmel Valley Ranch · Black Horse",
    hotel: "Hyatt Regency or Monterey Plaza",
    hook: "The most-booked trip — serious courses at serious value, with the full peninsula experience. No resort stay required.",
    mostBooked: true,
  },
];

const FAQS_DISPLAY = [
  { q: "Do you need to stay at The Lodge to play Pebble Beach Golf Links®?", a: "Yes — tee times at Pebble Beach Golf Links® require a hotel stay, typically a minimum of 3 nights at a Pebble Beach Resorts® property. Lodge guests receive the earliest booking window — up to 18 months in advance. We handle the hotel and tee time together in one package." },
  { q: "How much does a Pebble Beach golf package cost?", a: "Pebble Beach Golf Links® green fees are set by Pebble Beach Resorts® and vary by season. We don't publish per-round pricing — all packages are quoted based on your group size, dates, hotel tier, and course mix. Submit a quote request and we'll come back to you with a full breakdown." },
  { q: "What courses can you book at Pebble Beach Resorts®?", a: "As an IAGTO Authorized Operator we book Pebble Beach Golf Links®, Spyglass Hill™ Golf Course, Del Monte™ Golf Course, and The Hay™ at IAGTO rates. The Links at Spanish Bay® is closed for renovation until April 17, 2027. We also book Bayonet, Black Horse, Poppy Hills, Carmel Valley Ranch, Pasatiempo, and every other public course on the peninsula." },
  { q: "What does Monterey Golf Tours handle for us?", a: "Everything — tee times at the courses you want, accommodation at the right hotel for your group's size and budget, airport transfers, and the day-by-day logistics. You get one quote, one point of contact, and a trip where nothing falls through the cracks." },
  { q: "Is the 2027 U.S. Open a good time to plan a Pebble Beach trip?", a: "The U.S. Open (June 17–20, 2027) creates the highest demand window of the decade — rooms and tee times around those dates book out early. If your group wants to be in Pebble Beach during the Open week, contact us now. If you want to play the course without the Open premium, we'd recommend scheduling around it." },
] as const;

export default function PebbleBeachPackagesPage() {
  return (
    <>
      <Script id="schema-pbc" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />
      <Header />
      <main className="flex-1">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative min-h-[65vh] overflow-hidden bg-[#0a1610]">
          <Image src="/images/pbc-portal/pbgl-18th-hole-aerial.jpg" alt="Pebble Beach Golf Links® 18th hole — book your group package with Monterey Golf Tours" fill className="object-cover opacity-45" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,22,16,.2)] via-transparent to-[#0a1610]" />
          <div className="relative flex min-h-[65vh] flex-col items-start justify-end px-6 pb-14 md:px-14 md:pb-20">
            <span className="mb-3 inline-block rounded-full bg-gold/25 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[.14em] text-gold">
              IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-cream md:text-6xl">
              Book a Pebble Beach<br className="hidden md:block" /> golf package
            </h1>
            <p className="speakable-intro mt-4 max-w-2xl font-body text-[16px] leading-relaxed text-[rgba(250,246,238,.75)]">
              Monterey Golf Tours plans and books complete Pebble Beach golf trips — tee times at Pebble Beach Golf Links®, Spyglass Hill™, Del Monte™, and The Hay™ combined with lodging and transfers, in a single custom quote for groups of {SITE.minGroupSize}–{SITE.maxGroupSize} players.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote/" className="inline-block rounded-[9px] bg-gold px-7 py-4 font-ui text-[15px] font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#e6b82a]">
                Get a custom quote →
              </Link>
              <a href={`tel:${SITE.phoneHref.replace("tel:", "")}`} className="inline-flex items-center gap-2 rounded-[9px] border border-[rgba(250,246,238,.25)] px-7 py-4 font-ui text-[15px] font-semibold text-cream transition-colors hover:border-[rgba(250,246,238,.5)]">
                Call {SITE.phone}
              </a>
            </div>
          </div>
        </section>

        {/* ── BREADCRUMB ────────────────────────────────────────────── */}
        <div className="border-b border-[#e8e2d3] bg-cream px-6 py-3 md:px-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 font-ui text-[12px] text-[#a8a294]">
              <li><Link href="/" className="hover:text-ink">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li className="font-medium text-ink">Pebble Beach Golf Packages</li>
            </ol>
          </nav>
        </div>

        {/* ── WHY US — the booking case ─────────────────────────────── */}
        <section className="border-b border-fairwayborder bg-cream px-6 py-14 md:px-14 md:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
                Why book through an authorized operator?
              </h2>
              <p className="mt-4 font-body text-[15px] leading-relaxed text-[#4a4f3c]">
                Pebble Beach Golf Links® tee times are tied to a hotel stay requirement — typically a minimum of 3 nights at a Pebble Beach Resorts® property. As an IAGTO-contracted operator, we hold a direct agreement with Pebble Beach Resorts® that gives us access to IAGTO rates and the ability to book the full package — tee times, lodging, and transfers — in one place, for groups of any size.
              </p>
              <p className="mt-4 font-body text-[15px] leading-relaxed text-[#4a4f3c]">
                You get one point of contact. One quote. And a trip where the tee times, the hotel, and the logistics are all confirmed before you travel.
              </p>
              <Link href="/quote/" className="mt-6 inline-block rounded-[9px] bg-fairway px-6 py-3.5 font-ui text-[14px] font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-fairway-dark">
                Request a quote →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "IAGTO", label: "Authorized operator status" },
                { stat: "2–400", label: "Players per group" },
                { stat: "18 mo", label: "Advance booking (Lodge guests)" },
                { stat: "1 quote", label: "Tee times + hotel + transfers" },
              ].map(s => (
                <div key={s.stat} className="flex flex-col justify-between rounded-2xl border border-[#e8e0d0] bg-[#faf7f2] px-5 py-6">
                  <div className="font-display text-3xl font-bold text-fairway">{s.stat}</div>
                  <div className="mt-2 font-body text-[13px] text-[#6a6358]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COURSES WE BOOK ───────────────────────────────────────── */}
        <section className="border-b border-fairwayborder bg-white px-6 py-14 md:px-14 md:py-20">
          <h2 className="mb-2 font-display text-3xl font-bold text-ink md:text-4xl">Courses we book</h2>
          <p className="mb-8 max-w-xl font-body text-[14.5px] text-[#5a5448]">
            Pebble Beach Resorts® courses at IAGTO rates, plus every major public and daily-fee course on the peninsula.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_BOOK.map((c) => (
              <Link key={c.slug} href={`/golf-courses/${c.slug}/`}
                className={`group flex flex-col gap-1.5 rounded-2xl border px-5 py-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${c.highlight ? "border-gold/40 bg-[#fdf9ef]" : "border-[#e8e0d0] bg-white hover:border-fairway/40"}`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="font-ui text-[13px] font-bold text-ink leading-snug group-hover:text-fairway">{c.name}</div>
                  {c.highlight && <span className="rounded-full bg-gold/20 px-2 py-0.5 font-ui text-[8.5px] font-bold uppercase tracking-[.06em] text-[#8a6a00] flex-none">IAGTO</span>}
                </div>
                <div className="font-body text-[12px] text-[#8a857a]">{c.detail}</div>
                <div className="mt-1 font-ui text-[11.5px] font-semibold text-fairway opacity-0 group-hover:opacity-100 transition-opacity">View course →</div>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#e8e0d0] bg-[#faf7f2] px-4 py-3">
            <span className="font-ui text-[11px] font-semibold text-[#8a857a]">Also on Pebble Beach Golf Links®:</span>
            <Link href="/golf-courses/pebble-beach-golf-links/live-cams/" className="font-ui text-[12px] font-semibold text-fairway hover:underline">Live course cameras →</Link>
          </div>
          <p className="mt-4 font-body text-[13px] text-[#8a857a]">
            We also book Carmel Valley Ranch, Quail Lodge, Pacific Grove, Laguna Seca, Pasatiempo, TPC Monterey at Pasadera, and Black Horse.{" "}
            <Link href="/golf-courses/" className="font-semibold text-fairway hover:underline">See all 14 courses →</Link>
          </p>
        </section>

        {/* ── SAMPLE PACKAGES ───────────────────────────────────────── */}
        <section className="border-b border-fairwayborder bg-[#f9f6ef] px-6 py-14 md:px-14 md:py-20">
          <h2 className="mb-2 font-display text-3xl font-bold text-ink md:text-4xl">Sample packages</h2>
          <p className="mb-8 max-w-xl font-body text-[14.5px] text-[#5a5448]">
            Starting points — every package is customised to your group, dates, and budget.
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <div key={pkg.slug} className="relative flex flex-col overflow-hidden rounded-2xl border border-[#e8e0d0] bg-white">
                {pkg.mostBooked && (
                  <div className="absolute right-4 top-4 rounded-full bg-gold px-2.5 py-1 font-ui text-[9px] font-bold uppercase tracking-[.06em] text-ink">Most booked</div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="font-ui text-[10px] font-bold uppercase tracking-[.1em] text-[#a8a294]">{pkg.duration} · {pkg.rounds}</div>
                  <div className="mt-1 font-display text-[18px] font-bold text-ink leading-snug">{pkg.name}</div>
                  <p className="mt-3 flex-1 font-body text-[13.5px] leading-relaxed text-[#5a5448]">{pkg.hook}</p>
                  <div className="mt-4 space-y-1.5">
                    <div className="font-body text-[12px] text-[#8a857a]"><span className="font-semibold text-ink">Courses:</span> {pkg.courses}</div>
                    <div className="font-body text-[12px] text-[#8a857a]"><span className="font-semibold text-ink">Hotel:</span> {pkg.hotel}</div>
                  </div>
                  <div className="mt-5 flex gap-3">
                    <Link href={`/itineraries/${pkg.slug}/`} className="font-ui text-[12.5px] font-semibold text-fairway hover:underline">View itinerary →</Link>
                    <Link href="/quote/" className="font-ui text-[12.5px] font-semibold text-[#a8a294] hover:text-fairway">Get a quote →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/itineraries/" className="font-ui text-[13px] font-semibold text-fairway hover:underline">See all sample itineraries →</Link>
          </div>
        </section>

        {/* ── LODGING ───────────────────────────────────────────────── */}
        <section className="border-b border-fairwayborder bg-white px-6 py-14 md:px-14 md:py-20">
          <h2 className="mb-2 font-display text-3xl font-bold text-ink md:text-4xl">Hotels we book</h2>
          <p className="mb-8 max-w-xl font-body text-[14.5px] text-[#5a5448]">
            Pebble Beach Resorts® properties and the best non-resort hotels on the peninsula — matched to your group size and budget.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LODGING.map((h) => (
              <Link key={h.slug} href={`/hotels/${h.slug}/`}
                className="group flex flex-col gap-1.5 rounded-2xl border border-[#e8e0d0] bg-[#faf7f2] px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-fairway/40 hover:shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-ui text-[13px] font-bold text-ink leading-snug group-hover:text-fairway">{h.name}</div>
                  {h.tier === "IAGTO Property" && <span className="rounded-full bg-gold/15 px-2 py-0.5 font-ui text-[8px] font-bold uppercase tracking-[.05em] text-[#8a6a00] flex-none">IAGTO</span>}
                </div>
                <div className="font-body text-[12px] text-[#8a857a]">{h.note}</div>
                <div className="mt-1 font-ui text-[11.5px] font-semibold text-fairway opacity-0 group-hover:opacity-100 transition-opacity">View hotel →</div>
              </Link>
            ))}
          </div>
          <p className="mt-5 font-body text-[13px] text-[#8a857a]">
            We also book Portola Hotel, Bernardus Lodge, Quail Lodge, Casa Munras, Embassy Suites, and more.{" "}
            <Link href="/hotels/" className="font-semibold text-fairway hover:underline">See all 11+ hotels →</Link>
          </p>
        </section>

        {/* ── EVENTS — trip-planning hooks only ─────────────────────── */}
        <section className="border-b border-fairwayborder bg-[#f9f6ef] px-6 py-14 md:px-14 md:py-20">
          <h2 className="mb-2 font-display text-3xl font-bold text-ink md:text-4xl">Planning around an event?</h2>
          <p className="mb-8 max-w-xl font-body text-[14.5px] text-[#5a5448]">
            Pebble Beach hosts major events that make already-limited tee times even harder to book. Plan ahead.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { name: "AT&T Pebble Beach Pro-Am", date: "Feb 1–7, 2027", note: "PGA Tour at PBGL. Course partially closed during tournament. Book your trip for the week before or after — or be there for it.", cta: "Plan around the Pro-Am" },
              { name: "2027 U.S. Open Championship", date: "Jun 17–20, 2027", note: "The highest-demand week at Pebble Beach in years. Hotel and tee time availability around these dates is extremely limited. Contact us now.", cta: "Plan around the U.S. Open", urgent: true },
            ].map((ev) => (
              <div key={ev.name} className={`rounded-2xl border px-6 py-5 ${ev.urgent ? "border-gold/30 bg-[#fdf9ef]" : "border-[#e8e0d0] bg-white"}`}>
                {ev.urgent && <div className="mb-2 font-ui text-[9.5px] font-bold uppercase tracking-[.1em] text-gold">High demand — limited availability</div>}
                <div className="font-display text-[17px] font-bold text-ink">{ev.name}</div>
                <div className="mt-0.5 font-ui text-[12px] font-semibold text-fairway">{ev.date}</div>
                <p className="mt-2 font-body text-[13.5px] leading-relaxed text-[#5a5448]">{ev.note}</p>
                <Link href="/quote/" className="mt-4 inline-block font-ui text-[12.5px] font-semibold text-fairway hover:underline">{ev.cta} →</Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section className="border-b border-fairwayborder bg-white px-6 py-14 md:px-14 md:py-20">
          <h2 className="mb-8 font-display text-3xl font-bold text-ink md:text-4xl">Common questions</h2>
          <div className="max-w-3xl divide-y divide-[#e8e0d0] border-t border-[#e8e0d0]">
            {FAQS_DISPLAY.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-ui text-[15px] font-semibold text-ink">
                  {faq.q}
                  <span className="font-display text-xl text-fairway group-open:hidden flex-none">+</span>
                  <span className="hidden font-display text-xl text-fairway group-open:inline flex-none">−</span>
                </summary>
                <p className="mt-3 max-w-2xl font-body text-[14.5px] leading-relaxed text-[#4a4f3c]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────── */}
        <section className="bg-[#0a1610] px-6 py-16 text-center md:px-14 md:py-24">
          <span className="mb-4 inline-block rounded-full border border-gold/40 px-4 py-1.5 font-ui text-[10px] font-bold uppercase tracking-[.14em] text-gold">
            IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator
          </span>
          <h2 className="font-display text-3xl font-bold text-cream md:text-4xl">
            Ready to book your Pebble Beach trip?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-[15px] leading-relaxed text-[rgba(250,246,238,.65)]">
            Tell us your group size, preferred dates, and what you want to play. We'll come back with a full quote — courses, hotel, and transfers.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/quote/" className="inline-block rounded-[9px] bg-gold px-8 py-4 font-ui text-[15px] font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#e6b82a]">
              Get a custom quote →
            </Link>
            <a href={`tel:${SITE.phoneHref.replace("tel:", "")}`} className="inline-flex items-center gap-2 rounded-[9px] border border-[rgba(250,246,238,.2)] px-8 py-4 font-ui text-[15px] font-semibold text-cream transition-colors hover:border-[rgba(250,246,238,.45)]">
              Call {SITE.phone}
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
