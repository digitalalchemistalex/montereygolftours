// app/itineraries/architects-trail/page.tsx
// Static page — all data verified from mgts-course-intelligence.md June 2026
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Architect\u2019s Trail \u2014 4-Course Monterey Golf Itinerary | Monterey Golf Tours",
  description:
    "Play four legendary architect designs in one Monterey Peninsula trip: Pete Dye, Jack Nicklaus, Robert Trent Jones Jr., and Gene Bates. No private club required.",
  alternates: { canonical: `https://${SITE.domain}/itineraries/architects-trail/` },
};

const STOPS = [
  {
    num: "1",
    numBg: "#E6F1FB", numColor: "#042C53",
    architect: "Pete Dye", archColor: "#185FA5",
    course: "Carmel Valley Ranch",
    claim: "Only Pete Dye course in Northern California",
    claimColor: "#185FA5",
    desc: "Par 70, 6,117 yards. Dye\u2019s signature railroad ties and island-style greens through the Santa Lucia foothills. Original 1980, redesigned Gene Bates 2006.",
  },
  {
    num: "2",
    numBg: "#EAF3DE", numColor: "#085041",
    architect: "Jack Nicklaus", archColor: "#085041",
    course: "TPC Monterey at Pasadera",
    claim: "Only Nicklaus Signature on the peninsula \u00b7 Monday public access",
    claimColor: "#085041",
    desc: "Par 71, 6,673 yards. Nicklaus calls it one of the best courses he designed. \u201cThe Moment\u201d \u2014 a 205-yard par\u00a03 over a canyon with views to Monterey Bay.",
  },
  {
    num: "3",
    numBg: "#FAEEDA", numColor: "#633806",
    architect: "Robert Trent Jones Jr.", archColor: "#854F0B",
    course: "Poppy Hills Golf Course",
    claim: "Golf Digest Top\u00a0100 \u00b7 former AT&T Pro-Am co-host",
    claimColor: "#854F0B",
    desc: "Par 71, 7,002 yards through Del Monte Forest. RTJ\u00a0Jr.\u2019s 1986 design, renovated 2014. Montgomerie compared it to Pine Valley. Bentgrass greens rated \u201camong the purest on the peninsula\u201d by the NCGA.",
  },
  {
    num: "4",
    numBg: "#FAECE7", numColor: "#712B13",
    architect: "Gene Bates", archColor: "#993C1D",
    course: "Bayonet",
    claim: "Golf Digest Top\u00a075 affordable \u00b7 #16 best layout in the US",
    claimColor: "#993C1D",
    desc: "Par 72, 7,094 yards. Bates\u2019 2007 redesign of the 1954 military Fort Ord layout. \u201cCombat Corner\u201d doglegs on the back nine. One of California\u2019s most demanding public courses.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `https://${SITE.domain}/itineraries/architects-trail/#webpage`,
      url: `https://${SITE.domain}/itineraries/architects-trail/`,
      name: "The Architect\u2019s Trail \u2014 4-Course Monterey Golf Itinerary | Monterey Golf Tours",
      isPartOf: { "@id": `https://${SITE.domain}/#website` },
    },
    {
      "@type": "TouristTrip",
      name: "The Architect\u2019s Trail",
      description:
        "Four legendary designers, four publicly-playable courses, one Monterey Peninsula trip. Pete Dye, Jack Nicklaus, Robert Trent Jones Jr., and Gene Bates \u2014 each left exactly one course here.",
      touristType: "Golfer",
      itinerary: {
        "@type": "ItemList",
        itemListElement: STOPS.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.course,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home",        item: `https://${SITE.domain}/`             },
        { "@type": "ListItem", position: 2, name: "Itineraries", item: `https://${SITE.domain}/itineraries/` },
        { "@type": "ListItem", position: 3, name: "The Architect\u2019s Trail" },
      ],
    },
  ],
};

export default function ArchitectsTrailPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />

      <main className="flex-1 bg-fairwaycream">

        {/* Card wrapper */}
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
          <div style={{ border: "0.5px solid #D3D1C7", borderRadius: 16, overflow: "hidden" }}>

            {/* Charcoal header */}
            <div style={{ background: "#2C2C2A", padding: "1.75rem 2rem" }} className="at-header">
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", margin: "0 0 8px" }}>
                Signature itinerary
              </p>
              <h1 style={{ margin: "0 0 0.5rem", fontSize: "clamp(18px,5vw,22px)", fontWeight: 500, color: "#ffffff", lineHeight: 1.2 }}>
                The Architect&apos;s Trail
              </h1>
              <p style={{ margin: "0 0 1.25rem", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                Four legendary designers. One peninsula. Every course publicly playable &mdash; each the only example
                of its architect&apos;s work in Northern California.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["4\u20135 days", "4 rounds", "4+ golfers"].map((c) => (
                  <span key={c} style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.08)", border: "0.5px solid rgba(255,255,255,0.15)", padding: "4px 12px", borderRadius: 20 }}>
                    {c}
                  </span>
                ))}
                <span style={{ fontSize: 11, color: "#43d692", background: "rgba(67,214,146,0.1)", border: "0.5px solid rgba(67,214,146,0.25)", padding: "4px 12px", borderRadius: 20 }}>
                  No private club required
                </span>
              </div>
              <style>{`@media(max-width:480px){.at-header{padding:1.25rem}}`}</style>
            </div>

            {/* Stops */}
            <div style={{ background: "#ffffff", padding: "0 2rem" }} className="at-body">
              {STOPS.map((s, i) => (
                <div
                  key={s.num}
                  style={{
                    display: "grid", gridTemplateColumns: "44px 1fr",
                    gap: "0 16px", padding: "1.5rem 0",
                    borderBottom: i < STOPS.length - 1 ? "0.5px solid #F1EFE8" : undefined,
                  }}
                >
                  {/* Spine */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, flexShrink: 0, background: s.numBg, color: s.numColor }}>
                      {s.num}
                    </div>
                    {i < STOPS.length - 1 && <div style={{ width: 1, flex: 1, margin: "6px 0", background: "#F1EFE8" }} />}
                  </div>
                  {/* Content */}
                  <div>
                    <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 500, margin: "0 0 4px", color: s.archColor }}>{s.architect}</p>
                    <h3 style={{ fontSize: 15, fontWeight: 500, color: "#2C2C2A", margin: "0 0 4px", lineHeight: 1.25 }}>{s.course}</h3>
                    <p style={{ fontSize: 12, fontWeight: 500, color: s.claimColor, margin: "0 0 8px" }}>{s.claim}</p>
                    <p style={{ fontSize: 13, color: "#5F5E5A", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
              <style>{`@media(max-width:480px){.at-body{padding:0 1.25rem}.at-body>div{grid-template-columns:38px 1fr;gap:0 12px}}`}</style>
            </div>

            {/* Footer */}
            <div style={{ background: "#F1EFE8", borderTop: "0.5px solid #D3D1C7", padding: "1.25rem 2rem" }} className="at-footer">
              <p style={{ fontSize: 13, color: "#444441", margin: "0 0 1rem", lineHeight: 1.6 }}>
                We coordinate all tee times &mdash; including Monday access at Pasadera and advance group
                booking at Poppy Hills. You focus on the golf.
              </p>
              <Link
                href="/quote/"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  width: "100%", padding: 12, boxSizing: "border-box",
                  background: "#2C2C2A", color: "#ffffff",
                  borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none",
                }}
              >
                Request a quote for The Architect&apos;s Trail
              </Link>
              <style>{`@media(max-width:480px){.at-footer{padding:1.25rem}}`}</style>
            </div>

          </div>

          {/* Back link */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <Link href="/itineraries/" style={{ fontSize: 13, color: "#5F5E5A", textDecoration: "none" }}>
              &larr; All itineraries
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
