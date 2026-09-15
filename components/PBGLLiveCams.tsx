// PBGLLiveCams.tsx
// Live cam teaser section — links to PBC's own cam pages with full UTM tracking.
// Descriptions sourced directly from PBC page copy (fetched Sep 14 2026).
// Desktop: 2×2 grid. Mobile: stacked full-width cards.

import Link from "next/link";

const UTM = "utm_source=montereygolftours&utm_medium=referral&utm_campaign=live-cams";

const CAMS = [
  {
    id: "18th-green",
    hole: "18th Green",
    holeNum: "18",
    par: "Par 5",
    label: "The most famous finishing hole in golf",
    description:
      "Originally opened as a par-4, now an unforgettable par-5 sweeping around Stillwater Cove — ocean left, a Cypress tree in the fairway, out-of-bounds right. Start plotting your game plan.",
    url: `https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/the-18th-green-at-pebble-beach-golf-links/?${UTM}&utm_content=18th-green`,
    icon: "🏆",
    accentTop: "bg-[#1a3a2a]",
    accentBody: "bg-[#16261c]",
  },
  {
    id: "17th-green",
    hole: "17th Green",
    holeNum: "17",
    par: "Par 3",
    label: "The nerve-wracking par-3 over the Pacific",
    description:
      "One of the most iconic par-3s in the world. Judge the ocean wind, pick your club, and hold on. Visualize your tee shot before you get here.",
    url: `https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/the-17th-green-at-pebble-beach-golf-links/?${UTM}&utm_content=17th-green`,
    icon: "🌊",
    accentTop: "bg-[#1c3050]",
    accentBody: "bg-[#151e30]",
  },
  {
    id: "1st-tee",
    hole: "1st Tee",
    holeNum: "1",
    par: "Par 4",
    label: "Where every Pebble Beach round begins",
    description:
      "Feel the butterflies. Watch players step onto the 1st tee and begin their round — a moment every golfer who's played here remembers for the rest of their life.",
    url: `https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/the-1st-tee-at-pebble-beach-golf-links/?${UTM}&utm_content=1st-tee`,
    icon: "⛳",
    accentTop: "bg-[#2d4a1e]",
    accentBody: "bg-[#1e3214]",
  },
  {
    id: "putting-green",
    hole: "Putting Green",
    holeNum: "★",
    par: "Practice",
    label: "Pre-round warm-up at Pebble Beach",
    description:
      "The practice putting green before a round. Feel the butterflies as you daydream about hitting a few final putts before your tee time at Pebble Beach Golf Links®.",
    url: `https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/pebble-beach-golf-links-putting-green/?${UTM}&utm_content=putting-green`,
    icon: "🎯",
    accentTop: "bg-[#3a2a10]",
    accentBody: "bg-[#271d0a]",
  },
] as const;

const UTM_HUB = `${UTM}&utm_content=all-cams-hub`;
const PBC_CAMS_URL = `https://www.pebblebeach.com/golf/pebble-beach-golf-links/live-golf-cams/?${UTM_HUB}`;

const ExternalArrow = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function PBGLLiveCams() {
  return (
    <section className="border-b border-fairwayborder bg-[#0f1e14] px-6 py-14 md:px-14 md:py-20">

      {/* Header row */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="mb-3 inline-block rounded-full bg-gold/20 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[.12em] text-gold">
            Live Golf Cams · Pebble Beach Golf Links®
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight text-cream md:text-4xl">
            Watch the course right now
          </h2>
          <p className="mt-3 max-w-xl font-body text-[15px] leading-relaxed text-[rgba(250,246,238,.65)]">
            Four live cameras on the course — 18th green, 17th green, 1st tee, and practice
            putting green. Hosted by Pebble Beach Resorts®.
          </p>
        </div>

        {/* Desktop hub link */}
        <a
          href={PBC_CAMS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden flex-none items-center gap-2 rounded-lg border border-gold/40 px-4 py-2.5 font-ui text-[13px] font-semibold text-gold transition-colors hover:border-gold hover:bg-gold/10 md:flex"
        >
          All cams on PebbleBeach.com <ExternalArrow />
        </a>
      </div>

      {/* 2×2 grid desktop / stacked mobile */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CAMS.map((cam) => (
          <a
            key={cam.id}
            href={cam.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[rgba(250,246,238,.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(250,246,238,.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,.4)]"
          >
            {/* Header strip */}
            <div className={`${cam.accentTop} flex items-center gap-3 px-5 py-4`}>
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[rgba(0,0,0,.25)] font-display text-[13px] font-bold text-cream">
                {cam.holeNum}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-[16px] font-bold text-cream leading-tight truncate">
                  {cam.hole}
                </div>
                <div className="font-ui text-[10.5px] text-[rgba(250,246,238,.55)]">
                  {cam.par} · {cam.label}
                </div>
              </div>
              {/* Live badge */}
              <div className="ml-auto flex flex-none items-center gap-1.5 rounded-full bg-red-600/80 px-2.5 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                <span className="font-ui text-[9.5px] font-bold uppercase tracking-[.07em] text-white">Live</span>
              </div>
            </div>

            {/* Body */}
            <div className={`${cam.accentBody} flex flex-1 flex-col justify-between gap-4 px-5 py-4`}>
              <p className="font-body text-[13.5px] leading-relaxed text-[rgba(250,246,238,.68)]">
                {cam.description}
              </p>
              <div className="flex items-center gap-1.5 font-ui text-[12.5px] font-semibold text-gold opacity-75 transition-opacity group-hover:opacity-100">
                Watch live on PebbleBeach.com <ExternalArrow />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Mobile hub link */}
      <a
        href={PBC_CAMS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-gold/40 py-3 font-ui text-[13px] font-semibold text-gold md:hidden"
      >
        All cams on PebbleBeach.com <ExternalArrow />
      </a>

      {/* "Want to play it?" CTA */}
      <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-[rgba(250,246,238,.08)] bg-[rgba(255,255,255,.04)] px-6 py-6 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <p className="font-display text-[17px] font-bold text-cream">
            Want to play these holes yourself?
          </p>
          <p className="mt-1 font-body text-[13px] text-[rgba(250,246,238,.55)]">
            We arrange tee times, lodging, and transfers as an authorized Pebble Beach Resorts® golf travel operator.
          </p>
        </div>
        <Link
          href="/quote/"
          className="flex-none rounded-[8px] bg-gold px-6 py-3 font-ui text-[13px] font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#e6b82a]"
        >
          Get a quote →
        </Link>
      </div>

      {/* Attribution */}
      <p className="mt-5 text-center font-body text-[11px] text-[rgba(250,246,238,.28)]">
        Live camera feeds hosted by Pebble Beach Resorts®. Monterey Golf Tours is an IAGTO-member Authorized Pebble Beach Resorts® Golf Travel Operator.
      </p>
    </section>
  );
}
