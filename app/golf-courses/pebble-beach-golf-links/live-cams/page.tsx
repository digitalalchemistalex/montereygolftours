import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";
import PBGLLiveCams from "@/components/PBGLLiveCams";

const BASE = `https://${SITE.domain}`;
const PAGE_URL = `${BASE}/golf-courses/pebble-beach-golf-links/live-cams/`;
const OG_IMAGE = `${BASE}/images/pbc-portal/pbgl-18th-hole-aerial.jpg`;
const UTM = "utm_source=montereygolftours&utm_medium=referral&utm_campaign=live-cams&utm_content=landing-cta";

// ─── SCHEMA ───────────────────────────────────────────────────────────────────
const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      "url": PAGE_URL,
      "name": "Pebble Beach Golf Links® Live Cam — Watch the Course Live | Monterey Golf Tours",
      "description": "Watch Pebble Beach Golf Links® live — four cameras on the 18th green, 17th green, 1st tee, and practice putting green. Hosted by Pebble Beach Resorts®. Then plan your round with Monterey Golf Tours.",
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
        { "@type": "ListItem", "position": 2, "name": "Golf Courses", "item": `${BASE}/golf-courses/` },
        { "@type": "ListItem", "position": 3, "name": "Pebble Beach Golf Links®", "item": `${BASE}/golf-courses/pebble-beach-golf-links/` },
        { "@type": "ListItem", "position": 4, "name": "Live Cams", "item": PAGE_URL }
      ]
    },
    // ItemList of the 4 cameras
    {
      "@type": "ItemList",
      "@id": `${PAGE_URL}#cameras`,
      "name": "Pebble Beach Golf Links® Live Cameras",
      "description": "Four live golf cameras at Pebble Beach Golf Links® — 18th green, 17th green, 1st tee, and practice putting green. Hosted by Pebble Beach Resorts®.",
      "numberOfItems": 4,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "Place", "name": "18th Green at Pebble Beach Golf Links®", "description": "Live camera on the most famous finishing hole in golf — the par-5 18th sweeping around Stillwater Cove.", "url": "https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/the-18th-green-at-pebble-beach-golf-links/" } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "Place", "name": "17th Green at Pebble Beach Golf Links®", "description": "Live camera on the iconic par-3 17th — hourglass green, ocean wind, the hole where Nicklaus hit the flag and Watson chipped in.", "url": "https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/the-17th-green-at-pebble-beach-golf-links/" } },
        { "@type": "ListItem", "position": 3, "item": { "@type": "Place", "name": "1st Tee at Pebble Beach Golf Links®", "description": "Live camera on the 1st tee — watch golfers begin their round at Pebble Beach Golf Links®.", "url": "https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/the-1st-tee-at-pebble-beach-golf-links/" } },
        { "@type": "ListItem", "position": 4, "item": { "@type": "Place", "name": "Practice Putting Green at Pebble Beach Golf Links®", "description": "Live camera on the practice putting green — watch pre-round warm-up at Pebble Beach Golf Links®.", "url": "https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/pebble-beach-golf-links-putting-green/" } }
      ]
    },
    // FAQPage
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does Pebble Beach Golf Links® have a live cam?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Pebble Beach Resorts® hosts four live cameras at Pebble Beach Golf Links® — on the 18th green, 17th green, 1st tee, and the practice putting green. The cameras are accessible on PebbleBeach.com and are live during daylight hours." }
        },
        {
          "@type": "Question",
          "name": "Which holes at Pebble Beach have live cameras?",
          "acceptedAnswer": { "@type": "Answer", "text": "Pebble Beach Golf Links® has live cameras on the 18th green (the famous finishing hole), the 17th green (the iconic par-3 over the ocean), the 1st tee, and the practice putting green." }
        },
        {
          "@type": "Question",
          "name": "How can I play the holes I see on the Pebble Beach live cam?",
          "acceptedAnswer": { "@type": "Answer", "text": "Pebble Beach Golf Links® tee times require a hotel stay — typically a minimum of 3 nights at a Pebble Beach Resorts® property. As an IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator, Monterey Golf Tours can book tee times, lodging, and transfers for groups of 2–400 players. Get a custom quote at montereygolftours.com/quote/" }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Pebble Beach Golf Links® Live Cam — Watch the Course Live | Monterey Golf Tours",
  description:
    "Watch Pebble Beach Golf Links® live — four cameras on the 18th green, 17th green, 1st tee, and practice putting green. Hosted by Pebble Beach Resorts®. Plan your round with us.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    title: "Pebble Beach Golf Links® Live Cams | Monterey Golf Tours",
    description: "Four live cameras at Pebble Beach Golf Links® — 18th green, 17th green, 1st tee, and putting green. Watch, then plan your round.",
    url: PAGE_URL,
    siteName: "Monterey Golf Tours",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Pebble Beach Golf Links® 18th hole — live cam guide by Monterey Golf Tours" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pebble Beach Golf Links® Live Cams | Monterey Golf Tours",
    description: "Four live cameras — 18th green, 17th green, 1st tee, putting green. Watch, then book your round.",
    images: [OG_IMAGE],
  },
};

const FAQS = [
  { q: "Does Pebble Beach Golf Links® have a live cam?", a: "Yes. Pebble Beach Resorts® hosts four live cameras at Pebble Beach Golf Links® — on the 18th green, 17th green, 1st tee, and the practice putting green. The cameras are live during daylight hours on PebbleBeach.com." },
  { q: "Which holes at Pebble Beach have live cameras?", a: "Live cameras are positioned on the 18th green (the famous par-5 finishing hole on Stillwater Cove), the 17th green (the iconic par-3), the 1st tee, and the practice putting green." },
  { q: "How can I play the holes I see on the live cam?", a: "Pebble Beach Golf Links® tee times require a hotel stay — typically a minimum of 3 nights at a Pebble Beach Resorts® property. As an IAGTO Authorized Operator, Monterey Golf Tours books tee times, lodging, and transfers for groups of 2–400 players." },
] as const;

export default function PBGLLiveCamsPage() {
  return (
    <>
      <Script id="schema-live-cams" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />
      <Header />
      <main className="flex-1 bg-[#0f1e14]">

        {/* Breadcrumb */}
        <div className="border-b border-[rgba(250,246,238,.08)] px-6 py-3 md:px-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 font-ui text-[12px] text-[rgba(250,246,238,.45)]">
              <li><Link href="/" className="hover:text-cream">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/golf-courses/" className="hover:text-cream">Golf Courses</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/golf-courses/pebble-beach-golf-links/" className="hover:text-cream">Pebble Beach Golf Links®</Link></li>
              <li aria-hidden="true">›</li>
              <li className="text-[rgba(250,246,238,.7)]">Live Cams</li>
            </ol>
          </nav>
        </div>

        {/* Hero */}
        <div className="px-6 pb-0 pt-12 md:px-14 md:pt-16">
          <div className="mb-2 flex items-center gap-3">
            <span className="inline-block rounded-full bg-gold/20 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[.12em] text-gold">Pebble Beach Golf Links®</span>
            <span className="flex items-center gap-1.5 rounded-full bg-red-600/80 px-2.5 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              <span className="font-ui text-[10px] font-bold uppercase tracking-[.06em] text-white">Live</span>
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-cream md:text-5xl">
            Watch Pebble Beach Golf Links® live
          </h1>
          <p className="speakable-intro mt-4 max-w-2xl font-body text-[16px] leading-relaxed text-[rgba(250,246,238,.72)]">
            Pebble Beach Resorts® hosts four live cameras at Pebble Beach Golf Links® — on the 18th green, 17th green, 1st tee, and practice putting green. Watch the most famous course in America in real time, then plan your own round with Monterey Golf Tours.
          </p>
        </div>

        {/* Cam grid */}
        <div className="mt-10">
          <PBGLLiveCams />
        </div>

        {/* FAQ — in DOM for AEO */}
        <section className="border-t border-[rgba(250,246,238,.08)] px-6 py-14 md:px-14 md:py-20">
          <h2 className="mb-8 font-display text-2xl font-bold text-cream md:text-3xl">
            Frequently asked questions
          </h2>
          <div className="max-w-2xl divide-y divide-[rgba(250,246,238,.08)] border-t border-[rgba(250,246,238,.08)]">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-ui text-[14.5px] font-semibold text-cream">
                  {faq.q}
                  <span className="font-display text-xl text-gold group-open:hidden flex-none">+</span>
                  <span className="hidden font-display text-xl text-gold group-open:inline flex-none">−</span>
                </summary>
                <p className="mt-3 max-w-xl font-body text-[14px] leading-relaxed text-[rgba(250,246,238,.65)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-16 text-center md:px-14 md:py-20">
          <h2 className="font-display text-3xl font-bold text-cream md:text-4xl">
            Ready to play these holes yourself?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-[15px] text-[rgba(250,246,238,.65)]">
            As an IAGTO Authorized Pebble Beach Resorts® Golf Travel Operator, we handle tee times, lodging, and transfers for groups of {SITE.minGroupSize}–{SITE.maxGroupSize} players. Pebble Beach Golf Links® stay minimum is typically 3 nights.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/quote/" className="inline-block rounded-[9px] bg-gold px-8 py-4 font-ui text-[15px] font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#e6b82a]">
              Get a custom quote →
            </Link>
            <Link href="/golf-courses/pebble-beach-golf-links/" className="inline-block rounded-[9px] border border-[rgba(250,246,238,.25)] px-8 py-4 font-ui text-[15px] font-semibold text-cream transition-colors hover:border-[rgba(250,246,238,.5)]">
              Course details
            </Link>
          </div>
          <p className="mt-5 font-body text-[12px] text-[rgba(250,246,238,.35)]">
            <a href={`https://www.pebblebeach.com/plan-my-trip/?${UTM}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[rgba(250,246,238,.6)]">Book direct with PBR</a> for individual tee times.
          </p>
        </section>

      </main>
      <Footer />
    </>
  );
}
