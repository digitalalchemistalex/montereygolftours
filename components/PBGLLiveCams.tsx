// PBGLLiveCams.tsx
// Live cam teaser section for Pebble Beach Golf Links.
// All outbound links carry UTM params so PBC analytics show traffic from MGTS.
// Desktop: 2×2 grid. Mobile: stacked full-width cards.

import Link from "next/link";

const UTM = "utm_source=montereygolftours&utm_medium=referral&utm_campaign=live-cams";

const CAMS = [
  {
    id: "18th-green",
    hole: "18th Green",
    label: "The iconic finishing hole",
    description:
      "Watch golfers complete their round on the most famous closing hole in golf — the par-5 18th hugging Stillwater Cove.",
    url: `https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/the-18th-green-at-pebble-beach-golf-links/?${UTM}&utm_content=18th-green`,
    icon: "🏆",
    accent: "bg-[#1a3a2a]",
  },
  {
    id: "17th-green",
    hole: "17th Green",
    label: "The par-3 over the Pacific",
    description:
      "The 17th is one of the most nerve-wracking par-3s in the world. Judge the ocean wind, pick your club, hold on.",
    url: `https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/the-17th-green-at-pebble-beach-golf-links/?${UTM}&utm_content=17th-green`,
    icon: "🌊",
    accent: "bg-[#1c3050]",
  },
  {
    id: "1st-tee",
    hole: "1st Tee",
    label: "Where every round begins",
    description:
      "Feel the butterflies. Watch players step onto the first tee and begin their Pebble Beach round — a moment golfers remember forever.",
    url: `https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/the-1st-tee-at-pebble-beach-golf-links/?${UTM}&utm_content=1st-tee`,
    icon: "⛳",
    accent: "bg-[#2d4a1e]",
  },
  {
    id: "putting-green",
    hole: "Putting Green",
    label: "Pre-round warm-up",
    description:
      "The practice green before a round at Pebble Beach. Spot your group warming up, or just soak in the pre-game atmosphere.",
    url: `https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/pebble-beach-golf-links-putting-green/?${UTM}&utm_content=putting-green`,
    icon: "🎯",
    accent: "bg-[#3a2a10]",
  },
] as const;

export default function PBGLLiveCams() {
  return (
    <section className="border-b border-fairwayborder bg-[#0f1e14] px-6 py-14 md:px-14 md:py-20">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="mb-2 inline-block rounded-full bg-gold/20 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[.12em] text-gold">
            Live Golf Cams
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight text-cream md:text-4xl">
            Watch Pebble Beach right now
          </h2>
          <p className="mt-2 max-w-xl font-body text-[15px] leading-relaxed text-[rgba(250,246,238,.65)]">
            Four live cameras on the course — the 18th green, 17th green, 1st tee, and practice
            putting green. Courtesy of Pebble Beach Resorts®.
          </p>
        </div>
        {/* Desktop: link to the hub page */}
        <a
          href={`https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/?${UTM}&utm_content=all-cams-hub`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden flex-none items-center gap-1.5 rounded-lg border border-gold/40 px-4 py-2.5 font-ui text-[13px] font-semibold text-gold transition-colors hover:border-gold hover:bg-gold/10 md:flex"
        >
          View all cams on PebbleBeach.com
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-70">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Cam grid — 2×2 desktop / stacked mobile */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CAMS.map((cam) => (
          <a
            key={cam.id}
            href={cam.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[rgba(250,246,238,.1)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[rgba(250,246,238,.2)]"
          >
            {/* Dark gradient header strip */}
            <div className={`${cam.accent} flex items-center gap-3 px-5 py-4`}>
              <span className="text-2xl" aria-hidden="true">{cam.icon}</span>
              <div>
                <div className="font-display text-[17px] font-bold text-cream leading-tight">
                  {cam.hole}
                </div>
                <div className="font-ui text-[11px] text-[rgba(250,246,238,.6)]">
                  {cam.label}
                </div>
              </div>
              {/* Live badge */}
              <div className="ml-auto flex items-center gap-1.5 rounded-full bg-red-600/80 px-2.5 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                <span className="font-ui text-[10px] font-bold uppercase tracking-[.06em] text-white">
                  Live
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-4 bg-[#16261c] px-5 py-4">
              <p className="font-body text-[14px] leading-relaxed text-[rgba(250,246,238,.7)]">
                {cam.description}
              </p>
              <div className="flex items-center gap-1.5 font-ui text-[13px] font-semibold text-gold transition-opacity group-hover:opacity-100 opacity-80">
                Watch live on PebbleBeach.com
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Mobile: hub link */}
      <div className="mt-6 md:hidden">
        <a
          href={`https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/?${UTM}&utm_content=all-cams-hub`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold/40 py-3 font-ui text-[13px] font-semibold text-gold"
        >
          View all cams on PebbleBeach.com
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Attribution note */}
      <p className="mt-6 font-body text-[11px] text-[rgba(250,246,238,.35)] text-center">
        Live camera feeds are provided by Pebble Beach Resorts®. Monterey Golf Tours is an IAGTO-member Authorized Pebble Beach Resorts® Golf Travel Operator.
      </p>
    </section>
  );
}
