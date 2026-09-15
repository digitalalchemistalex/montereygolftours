import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PBCEvents from "@/components/PBCEvents";
import PBCMajorsBanner from "@/components/PBCMajorsBanner";
import { SITE } from "@/lib/site";

const UTM = "utm_source=montereygolftours&utm_medium=referral&utm_campaign=pbc-hub";
const BASE = `https://${SITE.domain}`;
const PAGE_URL = `${BASE}/pebble-beach/`;
const OG_IMAGE = `${BASE}/images/pbc-portal/pbgl-18th-hole-aerial.jpg`;

// ─── SCHEMA ───────────────────────────────────────────────────────────────────
const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. WebPage + Speakable
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      "url": PAGE_URL,
      "name": "Pebble Beach Golf Packages — Courses, Hotels & Tee Times | Monterey Golf Tours",
      "description": "Plan a Pebble Beach golf trip with Monterey Golf Tours — IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator. Pebble Beach Golf Links®, Spyglass Hill™, Del Monte™, The Hay™, and all three resort hotels. Groups of 2–400 players.",
      "isPartOf": { "@id": `${BASE}/#website` },
      "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", ".speakable-intro", ".speakable-faq"]
      },
      "dateModified": "2026-09-14"
    },
    // 2. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
        { "@type": "ListItem", "position": 2, "name": "Pebble Beach Resorts®", "item": PAGE_URL }
      ]
    },
    // 3. TravelAgency (operator identity)
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
      "description": "IAGTO-member Authorized Pebble Beach Resorts® Golf Travel Operator. We plan multi-day Pebble Beach golf packages for groups of 2–400 players — tee times, lodging, and transfers."
    },
    // 4. ItemList — PBC courses
    {
      "@type": "ItemList",
      "@id": `${PAGE_URL}#courses`,
      "name": "Pebble Beach Resorts® Golf Courses",
      "description": "Five golf courses at Pebble Beach Resorts® bookable through Monterey Golf Tours.",
      "numberOfItems": 5,
      "itemListElement": [
        {
          "@type": "ListItem", "position": 1,
          "item": {
            "@type": "GolfCourse",
            "name": "Pebble Beach Golf Links®",
            "url": `${BASE}/golf-courses/pebble-beach-golf-links/`,
            "description": "No. 1 Public Golf Course in America. Par 72, 6,802 yards. Six U.S. Opens. Clifftop holes on Stillwater Cove.",
            "address": { "@type": "PostalAddress", "addressLocality": "Pebble Beach", "addressRegion": "CA", "addressCountry": "US" }
          }
        },
        {
          "@type": "ListItem", "position": 2,
          "item": {
            "@type": "GolfCourse",
            "name": "Spyglass Hill™ Golf Course",
            "url": `${BASE}/golf-courses/spyglass-hill/`,
            "description": "Par 72, 6,960 yards. Rating 75.4, slope 145. Robert Trent Jones Sr. Pine forest to coastal dunes.",
            "address": { "@type": "PostalAddress", "addressLocality": "Pebble Beach", "addressRegion": "CA", "addressCountry": "US" }
          }
        },
        {
          "@type": "ListItem", "position": 3,
          "item": {
            "@type": "GolfCourse",
            "name": "Del Monte™ Golf Course",
            "url": `${BASE}/golf-courses/del-monte-golf-course/`,
            "description": "Par 72, 6,356 yards. Est. 1897 — oldest course in continuous use west of the Mississippi.",
            "address": { "@type": "PostalAddress", "addressLocality": "Monterey", "addressRegion": "CA", "addressCountry": "US" }
          }
        },
        {
          "@type": "ListItem", "position": 4,
          "item": {
            "@type": "GolfCourse",
            "name": "The Hay™",
            "url": `${BASE}/golf-courses/the-hay/`,
            "description": "Par 27, 9-hole short course. Tiger Woods and TGR Design redesign, opened 2021.",
            "address": { "@type": "PostalAddress", "addressLocality": "Pebble Beach", "addressRegion": "CA", "addressCountry": "US" }
          }
        },
        {
          "@type": "ListItem", "position": 5,
          "item": {
            "@type": "GolfCourse",
            "name": "The Links at Spanish Bay®",
            "url": `${BASE}/golf-courses/links-at-spanish-bay/`,
            "description": "Closed for Gil Hanse renovation. Reopens April 17, 2027. Join waitlist now.",
            "address": { "@type": "PostalAddress", "addressLocality": "Pebble Beach", "addressRegion": "CA", "addressCountry": "US" }
          }
        }
      ]
    },
    // 5. Upcoming major Events
    {
      "@type": "Event",
      "name": "AT&T Pebble Beach Pro-Am 2027",
      "startDate": "2027-02-01",
      "endDate": "2027-02-07",
      "location": { "@type": "Place", "name": "Pebble Beach Golf Links®", "address": { "@type": "PostalAddress", "addressLocality": "Pebble Beach", "addressRegion": "CA" } },
      "url": `https://www.pebblebeach.com/events/att-pebble-beach-pro-am/?${UTM}&utm_content=schema-att`
    },
    {
      "@type": "Event",
      "name": "2027 U.S. Open Championship",
      "startDate": "2027-06-17",
      "endDate": "2027-06-20",
      "location": { "@type": "Place", "name": "Pebble Beach Golf Links®", "address": { "@type": "PostalAddress", "addressLocality": "Pebble Beach", "addressRegion": "CA" } },
      "url": `https://www.pebblebeach.com/events/us-open-championship/?${UTM}&utm_content=schema-usopen`
    },
    // 6. FAQPage
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I book a tee time at Pebble Beach Golf Links® as a group?",
          "acceptedAnswer": { "@type": "Answer", "text": "Pebble Beach Golf Links® tee times for groups are bookable through an IAGTO Authorized Golf Travel Operator like Monterey Golf Tours. As an authorized operator, we access IAGTO rates and can book the full resort experience — tee times, lodging at The Lodge, The Inn, or Casa Palmero, and transfers — for groups of 2 to 400 players. Contact us for a custom quote." }
        },
        {
          "@type": "Question",
          "name": "Do you need to stay at The Lodge to play Pebble Beach Golf Links®?",
          "acceptedAnswer": { "@type": "Answer", "text": "Pebble Beach Golf Links® tee times are subject to a hotel stay requirement. A minimum stay of typically 3 nights at a Pebble Beach Resorts® hotel — The Lodge at Pebble Beach™, The Inn at Spanish Bay™, or Casa Palmero™ — is required to book a tee time at Pebble Beach Golf Links®. Lodge guests can book tee times up to 18 months in advance." }
        },
        {
          "@type": "Question",
          "name": "What Pebble Beach courses can Monterey Golf Tours book?",
          "acceptedAnswer": { "@type": "Answer", "text": "As an IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator, Monterey Golf Tours can book tee times at Pebble Beach Golf Links®, Spyglass Hill™ Golf Course, Del Monte™ Golf Course, and The Hay™. The Links at Spanish Bay® is currently closed for renovation and reopens April 17, 2027." }
        },
        {
          "@type": "Question",
          "name": "Is the 2027 U.S. Open at Pebble Beach?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. The 2027 U.S. Open Championship is scheduled for June 17–20, 2027 at Pebble Beach Golf Links®. It will be the seventh U.S. Open held at Pebble Beach — more than any other course over the last 50 years. Pebble Beach is also scheduled to host U.S. Opens in 2032, 2037, and 2044." }
        },
        {
          "@type": "Question",
          "name": "What is the best hotel at Pebble Beach for a golf group?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Lodge at Pebble Beach™ is the top choice for golf groups — it sits steps from the 1st tee of Pebble Beach Golf Links® and includes Fairway One Cottages where up to 8 players can share a 1,000 sq ft cottage with a fireplace and fire pit directly on the first fairway. Lodge guests also receive the earliest advance tee time booking window at the resort — up to 18 months." }
        },
        {
          "@type": "Question",
          "name": "Can I watch Pebble Beach Golf Links® live on camera?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Pebble Beach Resorts® hosts four live cameras on Pebble Beach Golf Links® — the 18th green, 17th green, 1st tee, and practice putting green. Watch them on PebbleBeach.com, or visit our dedicated live cam page at montereygolftours.com/golf-courses/pebble-beach-golf-links/live-cams/" }
        }
      ]
    }
  ]
};

// ─── METADATA ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Pebble Beach Golf Packages — Courses, Hotels & Tee Times | Monterey Golf Tours",
  description:
    "Plan a Pebble Beach golf trip with an IAGTO Authorized Operator. Pebble Beach Golf Links®, Spyglass Hill™, Del Monte™, The Hay™, all 3 resort hotels. Groups of 2–400. Get a custom quote.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    title: "Pebble Beach Golf Packages | Monterey Golf Tours",
    description:
      "IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator. Pebble Beach Golf Links®, Spyglass Hill™, Del Monte™, The Hay™ — tee times, lodging, and full trip planning for groups of 2–400.",
    url: PAGE_URL,
    siteName: "Monterey Golf Tours",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Pebble Beach Golf Links® 18th hole — Monterey Golf Tours" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pebble Beach Golf Packages | Monterey Golf Tours",
    description: "IAGTO Authorized Operator. Courses, hotels, tee times, and full trip planning for groups of 2–400.",
    images: [OG_IMAGE],
  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PBC_COURSES = [
  { slug: "pebble-beach-golf-links", name: "Pebble Beach Golf Links®", par: "Par 72 · 6,802 yds", hook: "No. 1 Public Golf Course in America. Clifftop drama on Stillwater Cove. Six U.S. Opens.", pbcPath: "/golf/pebble-beach-golf-links/", utmContent: "pbgl-course", iagto: true, closed: false },
  { slug: "spyglass-hill", name: "Spyglass Hill™ Golf Course", par: "Par 72 · 6,960 yds · Rating 75.4 · Slope 145", hook: "Robert Trent Jones Sr. masterpiece — pine forest into coastal dunes. The toughest of the PBR courses.", pbcPath: "/golf/spyglass-hill-golf-course/", utmContent: "spyglass-course", iagto: true, closed: false },
  { slug: "del-monte-golf-course", name: "Del Monte™ Golf Course", par: "Par 72 · 6,356 yds", hook: "Oldest course in continuous use west of the Mississippi, est. 1897. Historic and accessible.", pbcPath: "/golf/del-monte-golf-course/", utmContent: "del-monte-course", iagto: true, closed: false },
  { slug: "the-hay", name: "The Hay™", par: "Par 27 · 670 yds · 9 holes", hook: "Tiger Woods and TGR Design (2021). Includes a replica of the famous 7th hole. The perfect warm-up.", pbcPath: "/golf/the-hay/", utmContent: "the-hay-course", iagto: false, closed: false },
  { slug: "links-at-spanish-bay", name: "The Links at Spanish Bay®", par: "Par 72 · Links style", hook: "Closed for a Gil Hanse transformation — reopens April 17, 2027. Join the waitlist now.", pbcPath: "/golf/the-links-at-spanish-bay/", utmContent: "spanish-bay-course", iagto: true, closed: true },
] as const;

const PBC_HOTELS = [
  { slug: "lodge-at-pebble-beach", name: "The Lodge at Pebble Beach™", detail: "Open since 1919 · Steps from the 1st tee · Fairway One Cottages · 18-month advance booking", pbcPath: "/accommodations/the-lodge-at-pebble-beach/", utmContent: "lodge-hotel" },
  { slug: "inn-at-spanish-bay", name: "The Inn at Spanish Bay™", detail: "Scottish links atmosphere · Nightly bagpiper at sunset · Ocean-view rooms", pbcPath: "/accommodations/the-inn-at-spanish-bay/", utmContent: "inn-hotel" },
  { slug: "casa-palmero", name: "Casa Palmero™", detail: "24-room exclusive retreat · Complimentary daily spa · Most intimate PBR property", pbcPath: "/accommodations/casa-palmero-at-pebble-beach/", utmContent: "casa-hotel" },
] as const;

const FAQS = [
  { q: "Do you need to stay at The Lodge to play Pebble Beach Golf Links®?", a: "Pebble Beach Golf Links® tee times are subject to a hotel stay requirement. A minimum stay of typically 3 nights at a Pebble Beach Resorts® hotel is required. Lodge guests can book tee times up to 18 months in advance — the longest booking window available." },
  { q: "What Pebble Beach courses can Monterey Golf Tours book?", a: "As an IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator, we book Pebble Beach Golf Links®, Spyglass Hill™ Golf Course, Del Monte™ Golf Course, and The Hay™. The Links at Spanish Bay® is closed for renovation and reopens April 17, 2027." },
  { q: "Is the 2027 U.S. Open Championship at Pebble Beach?", a: "Yes — June 17–20, 2027 at Pebble Beach Golf Links®. It will be the seventh U.S. Open at Pebble Beach, which is also scheduled to host the championship in 2032, 2037, and 2044." },
  { q: "What is the best hotel at Pebble Beach for a golf group?", a: "The Lodge at Pebble Beach™ is the top choice for golf groups — it sits steps from the 1st tee of Pebble Beach Golf Links® and includes Fairway One Cottages where up to 8 players share a cottage directly on the first fairway. Lodge guests receive the earliest advance booking window in the resort — up to 18 months." },
  { q: "Can I watch a live cam of Pebble Beach Golf Links®?", a: "Yes. Pebble Beach Resorts® hosts four live cameras — 18th green, 17th green, 1st tee, and practice putting green. We have a dedicated guide at montereygolftours.com/golf-courses/pebble-beach-golf-links/live-cams/" },
] as const;

const ExternalArrow = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function PebbleBeachHubPage() {
  return (
    <>
      <Script id="schema-pbc-hub" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />
      <Header />
      <main className="flex-1">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-[60vh] overflow-hidden bg-[#0a1610]">
          <Image src="/images/pbc-portal/pbgl-18th-hole-aerial.jpg" alt="Pebble Beach Golf Links® 18th hole aerial — Monterey Golf Tours" fill className="object-cover opacity-50" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,22,16,.3)] via-transparent to-[#0a1610]" />
          <div className="relative flex min-h-[60vh] flex-col items-start justify-end px-6 pb-14 md:px-14 md:pb-20">
            <span className="mb-3 inline-block rounded-full bg-gold/25 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[.14em] text-gold">
              IAGTO Partner · Authorized Pebble Beach Resorts® Golf Travel Operator
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-cream md:text-6xl">
              Pebble Beach golf packages
            </h1>
            {/* Speakable intro — AI crawlers read this as the page summary */}
            <p className="speakable-intro mt-4 max-w-2xl font-body text-[16px] leading-relaxed text-[rgba(250,246,238,.75)]">
              Monterey Golf Tours is an IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator. We plan complete Pebble Beach golf trips for groups of {SITE.minGroupSize}–{SITE.maxGroupSize} players — tee times at Pebble Beach Golf Links®, Spyglass Hill™ Golf Course, Del Monte™ Golf Course, and The Hay™, combined with lodging at The Lodge, The Inn at Spanish Bay, or Casa Palmero.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote/" className="inline-block rounded-[9px] bg-gold px-7 py-4 font-ui text-[15px] font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#e6b82a]">
                Get a custom quote →
              </Link>
              <a href={`https://www.pebblebeach.com/plan-my-trip/?${UTM}&utm_content=hero-plan`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[9px] border border-[rgba(250,246,238,.25)] px-7 py-4 font-ui text-[15px] font-semibold text-cream transition-colors hover:border-[rgba(250,246,238,.5)]">
                Plan direct with PBR <ExternalArrow />
              </a>
            </div>
          </div>
        </section>

        {/* ── MAJORS BANNER ─────────────────────────────────────────────── */}
        <PBCMajorsBanner />

        {/* ── BREADCRUMB ────────────────────────────────────────────────── */}
        <div className="border-b border-[#e8e2d3] bg-cream px-6 py-3 md:px-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 font-ui text-[12px] text-[#a8a294]">
              <li><Link href="/" className="hover:text-ink">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li className="text-ink font-medium">Pebble Beach Resorts®</li>
            </ol>
          </nav>
        </div>

        {/* ── WHY BOOK THROUGH US — AEO answer block ────────────────────── */}
        <section className="border-b border-fairwayborder bg-cream px-6 py-12 md:px-14 md:py-16">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              Why book Pebble Beach through Monterey Golf Tours?
            </h2>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-[#4a4f3c]">
              Pebble Beach Golf Links® tee times are subject to a hotel stay requirement — typically a minimum of 3 nights at a Pebble Beach Resorts® property. As an IAGTO-contracted travel operator, we coordinate the full package: resort tee times at IAGTO rates, accommodation at The Lodge, The Inn at Spanish Bay, or Casa Palmero, and all transfers — in a single quote for groups of {SITE.minGroupSize} to {SITE.maxGroupSize} players. Lodge guests we book receive the maximum advance booking window of up to 18 months.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { stat: "2–400", label: "Players per group" },
                { stat: "IAGTO", label: "Authorized operator" },
                { stat: "18 mo", label: "Advance booking (Lodge)" },
                { stat: "4 courses", label: "Currently bookable" },
              ].map(s => (
                <div key={s.stat} className="rounded-xl border border-[#e8e0d0] bg-[#faf7f2] px-4 py-4 text-center">
                  <div className="font-display text-2xl font-bold text-fairway">{s.stat}</div>
                  <div className="mt-1 font-body text-[12px] text-[#6a6358]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COURSES ───────────────────────────────────────────────────── */}
        <section className="border-b border-fairwayborder bg-white px-6 py-14 md:px-14 md:py-20">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gold/20 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[.12em] text-[#8a6a00]">Golf Courses</span>
            <span className="rounded-full border border-gold/40 px-2.5 py-1 font-ui text-[9px] font-semibold uppercase tracking-[.07em] text-gold">IAGTO Rates Available</span>
          </div>
          <h2 className="mb-2 font-display text-3xl font-bold text-ink md:text-4xl">
            Five courses at Pebble Beach Resorts®
          </h2>
          <p className="mb-8 max-w-2xl font-body text-[14.5px] text-[#5a5448]">
            Pebble Beach Golf Links®, Spyglass Hill™ Golf Course, Del Monte™ Golf Course, and The Hay™ are bookable through us at IAGTO rates. The Links at Spanish Bay® reopens April 17, 2027.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PBC_COURSES.map((course) => (
              <div key={course.slug} className={`group flex flex-col overflow-hidden rounded-2xl border ${course.closed ? "border-[#e8e0d0] bg-[#faf7f2] opacity-70" : "border-[#e8e0d0] bg-white transition-all hover:border-fairway/40 hover:shadow-md"}`}>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-ui text-[13.5px] font-bold text-ink leading-snug">{course.name}</div>
                      <div className="mt-0.5 font-body text-[11.5px] text-[#9a9088]">{course.par}</div>
                    </div>
                    <div className="flex flex-none flex-col gap-1 items-end">
                      {course.iagto && <span className="rounded-full bg-gold/15 px-2 py-0.5 font-ui text-[8.5px] font-bold uppercase tracking-[.05em] text-[#8a6a00]">IAGTO</span>}
                      {course.closed && <span className="rounded-full bg-[#ede7d5] px-2 py-0.5 font-ui text-[8.5px] font-bold uppercase tracking-[.05em] text-[#8a7a5a]">Closed</span>}
                    </div>
                  </div>
                  <p className="mt-3 flex-1 font-body text-[13px] leading-relaxed text-[#5a5448]">{course.hook}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Link href={`/golf-courses/${course.slug}/`} className="font-ui text-[12px] font-semibold text-fairway hover:underline">Course details →</Link>
                    <a href={`https://www.pebblebeach.com${course.pbcPath}?${UTM}&utm_content=${course.utmContent}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-ui text-[12px] font-semibold text-[#a8a294] hover:text-fairway">PebbleBeach.com <ExternalArrow /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOTELS ────────────────────────────────────────────────────── */}
        <section className="border-b border-fairwayborder bg-[#f9f6ef] px-6 py-14 md:px-14 md:py-20">
          <span className="mb-3 inline-block rounded-full bg-fairway/10 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[.12em] text-fairway">Resort Hotels</span>
          <h2 className="mb-2 font-display text-3xl font-bold text-ink md:text-4xl">Three hotels, one resort</h2>
          <p className="mb-8 max-w-2xl font-body text-[14.5px] text-[#5a5448]">
            A stay at any Pebble Beach Resorts® hotel grants access to The Beach &amp; Tennis Club™ and The Spanish Bay Club™. Pebble Beach Golf Links® stay minimum is typically 3 nights.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {PBC_HOTELS.map((hotel) => (
              <div key={hotel.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8e0d0] bg-white transition-all hover:border-fairway/40 hover:shadow-md">
                <div className="flex flex-1 flex-col p-5">
                  <div className="font-ui text-[13.5px] font-bold text-ink leading-snug">{hotel.name}</div>
                  <p className="mt-2 flex-1 font-body text-[13px] text-[#5a5448]">{hotel.detail}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Link href={`/hotels/${hotel.slug}/`} className="font-ui text-[12px] font-semibold text-fairway hover:underline">Hotel details →</Link>
                    <a href={`https://www.pebblebeach.com${hotel.pbcPath}?${UTM}&utm_content=${hotel.utmContent}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-ui text-[12px] font-semibold text-[#a8a294] hover:text-fairway">PebbleBeach.com <ExternalArrow /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── QUICK LINKS ───────────────────────────────────────────────── */}
        <section className="border-b border-fairwayborder bg-white px-6 py-14 md:px-14 md:py-20">
          <h2 className="mb-8 font-display text-3xl font-bold text-ink md:text-4xl">More at Pebble Beach Resorts®</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Live Golf Cams", desc: "Watch the 18th green, 17th green, 1st tee, and putting green live.", href: `https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/?${UTM}&utm_content=live-cams`, internal: "/golf-courses/pebble-beach-golf-links/live-cams/" },
              { label: "Tournaments You Can Play", desc: "13 amateur tournaments per year. Groups of any size welcome.", href: `https://www.pebblebeach.com/golf/tournaments-you-can-play/?${UTM}&utm_content=tournaments`, internal: null },
              { label: "2027 U.S. Open Championship", desc: "June 17–20, 2027 at Pebble Beach Golf Links®. Plan now.", href: `https://www.pebblebeach.com/events/us-open-championship/?${UTM}&utm_content=us-open`, internal: null },
              { label: "AT&T Pebble Beach Pro-Am", desc: "Feb 1–7, 2027. PGA Tour tradition at Pebble Beach since 1947.", href: `https://www.pebblebeach.com/events/att-pebble-beach-pro-am/?${UTM}&utm_content=att-pro-am`, internal: null },
            ].map((exp) => (
              <div key={exp.label} className="flex flex-col gap-2 rounded-2xl border border-[#e8e0d0] bg-[#faf7f2] px-5 py-5">
                <div className="font-ui text-[13.5px] font-bold text-ink leading-snug">{exp.label}</div>
                <div className="flex-1 font-body text-[13px] text-[#6a6358]">{exp.desc}</div>
                <div className="flex flex-wrap gap-3 mt-1">
                  <a href={exp.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-ui text-[12px] font-semibold text-fairway hover:underline">PebbleBeach.com <ExternalArrow /></a>
                  {exp.internal && <Link href={exp.internal} className="font-ui text-[12px] font-semibold text-[#a8a294] hover:text-fairway">Our guide →</Link>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EVENTS ────────────────────────────────────────────────────── */}
        <PBCEvents tiers={["golf", "lifestyle"]} showRecurring title="Upcoming events at Pebble Beach Resorts®" subtitle="Plan your trip around the calendar — golf tournaments, culinary events, and nightly entertainment." />

        {/* ── FAQ — rendered in DOM for AEO crawlability ────────────────── */}
        <section className="border-b border-fairwayborder bg-[#f9f6ef] px-6 py-14 md:px-14 md:py-20">
          <h2 className="mb-8 font-display text-3xl font-bold text-ink md:text-4xl">
            Frequently asked questions
          </h2>
          <div className="speakable-faq max-w-3xl divide-y divide-[#e8e0d0] border-t border-[#e8e0d0]">
            {FAQS.map((faq) => (
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

        {/* ── IAGTO CTA ─────────────────────────────────────────────────── */}
        <section className="bg-[#0a1610] px-6 py-16 text-center md:px-14 md:py-20">
          <span className="mb-4 inline-block rounded-full border border-gold/40 px-4 py-1.5 font-ui text-[10px] font-bold uppercase tracking-[.14em] text-gold">
            IAGTO Partner · Authorized Pebble Beach Resorts® Golf Travel Operator
          </span>
          <h2 className="font-display text-3xl font-bold text-cream md:text-4xl">Book Pebble Beach through us</h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-[15px] leading-relaxed text-[rgba(250,246,238,.65)]">
            As an IAGTO-contracted operator we access Pebble Beach tee times, IAGTO rates, and the full resort experience — wrapped into a single planned trip for groups of {SITE.minGroupSize}–{SITE.maxGroupSize} players.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/quote/" className="inline-block rounded-[9px] bg-gold px-8 py-4 font-ui text-[15px] font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#e6b82a]">
              Get a custom quote →
            </Link>
            <a href={`https://www.pebblebeach.com/plan-my-trip/?${UTM}&utm_content=bottom-cta`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[9px] border border-[rgba(250,246,238,.2)] px-8 py-4 font-ui text-[15px] font-semibold text-cream transition-colors hover:border-[rgba(250,246,238,.45)]">
              Book direct with PBR <ExternalArrow />
            </a>
          </div>
          <p className="mt-6 font-body text-[12px] text-[rgba(250,246,238,.3)]">
            Pebble Beach Golf Links® stay minimum is typically 3 nights. Lodge guests book up to 18 months in advance.
          </p>
        </section>

      </main>
      <Footer />
    </>
  );
}
