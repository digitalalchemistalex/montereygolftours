// PBGLTournaments.tsx
// "Tournaments You Can Play" section for PBGL course page.
// All data sourced from pebblebeach.com/golf/tournaments-you-can-play/ (Sep 14 2026).
// External links carry UTM tracking so PBC analytics show MGTS as referrer.

import Link from "next/link";

const UTM = "utm_source=montereygolftours&utm_medium=referral&utm_campaign=tournaments&utm_content=pbgl-page";

const HIGHLIGHTS = [
  {
    icon: "🏌️",
    title: "13 tournaments per year",
    body: "Different date options, formats, and price points. Something for every traveling group.",
  },
  {
    icon: "🤝",
    title: "Groups explicitly welcome",
    body: "PBC's tournament team runs a dedicated \"mini\" tournament within theirs for large traveling groups.",
  },
  {
    icon: "📋",
    title: "Net format — all handicaps",
    body: "Most events are net format, so scores compensate for handicap. Competitive backgrounds recommended.",
  },
  {
    icon: "⛳",
    title: "Multi-course rotation",
    body: "Typical rotation: Pebble Beach Golf Links®, Spyglass Hill™, The Links at Spanish Bay®, and Del Monte™.",
  },
] as const;

const ExternalArrow = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function PBGLTournaments() {
  return (
    <section className="border-b border-fairwayborder bg-[#f9f6ef] px-6 py-14 md:px-14 md:py-20">

      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="mb-3 inline-block rounded-full bg-fairway/10 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[.12em] text-fairway">
            Stay, Play &amp; Compete
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
            Play a tournament at Pebble Beach
          </h2>
          <p className="mt-3 max-w-2xl font-body text-[15px] leading-relaxed text-[#5a5448]">
            Pebble Beach Resorts® runs 13 amateur tournaments per year — including the{" "}
            <strong className="font-semibold text-ink">TaylorMade Pebble Beach Invitational</strong>, the world's only event matching PGA, LPGA, Champions, and Korn Ferry Tour pros against amateurs for the same purse. Your group can compete on the same courses.
          </p>
        </div>

        {/* Desktop link */}
        <a
          href={`https://www.pebblebeach.com/golf/tournaments-you-can-play/?${UTM}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden flex-none items-center gap-2 rounded-lg border border-fairway/30 px-4 py-2.5 font-ui text-[13px] font-semibold text-fairway transition-colors hover:border-fairway hover:bg-fairway/10 md:flex"
        >
          Tournament info on PebbleBeach.com <ExternalArrow />
        </a>
      </div>

      {/* Highlights grid */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHTS.map((h) => (
          <div
            key={h.title}
            className="flex flex-col gap-2 rounded-2xl border border-[#e8e0d0] bg-white px-5 py-5"
          >
            <span className="text-2xl" aria-hidden="true">{h.icon}</span>
            <div className="font-ui text-[13.5px] font-bold text-ink leading-snug">{h.title}</div>
            <div className="font-body text-[13px] leading-relaxed text-[#6a6358]">{h.body}</div>
          </div>
        ))}
      </div>

      {/* Flagship callout */}
      <div className="mb-10 overflow-hidden rounded-2xl border border-[#e8e0d0] bg-white">
        <div className="border-b border-[#f0ebe1] bg-[#1a3a2a] px-6 py-4">
          <span className="font-ui text-[10px] font-bold uppercase tracking-[.12em] text-gold">Flagship Event</span>
          <h3 className="mt-1 font-display text-[20px] font-bold text-cream">
            TaylorMade Pebble Beach Invitational
          </h3>
        </div>
        <div className="px-6 py-5">
          <p className="font-body text-[14.5px] leading-relaxed text-[#4a4f3c]">
            Founded in 1972. The world's only tournament matching players from the{" "}
            <strong className="font-semibold">PGA, LPGA, Champions, and Korn Ferry Tours</strong>{" "}
            — all competing for the same purse. Teams of four amateurs are matched with a different
            pro each day in this 72-hole invitational. Playing alongside tour professionals on{" "}
            Pebble Beach Golf Links® takes the experience to an entirely different level.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`https://www.pebblebeach.com/events/taylormade-pebble-beach-invitational/?${UTM}&utm_content=invitational`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#e0d8c8] bg-[#f9f6ef] px-4 py-2.5 font-ui text-[13px] font-semibold text-ink transition-colors hover:border-fairway/40 hover:text-fairway"
            >
              Invitational details <ExternalArrow />
            </a>
            <a
              href={`https://www.pebblebeach.com/golf/tournaments-you-can-play/?${UTM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#e0d8c8] bg-[#f9f6ef] px-4 py-2.5 font-ui text-[13px] font-semibold text-ink transition-colors hover:border-fairway/40 hover:text-fairway"
            >
              All 13 tournaments <ExternalArrow />
            </a>
          </div>
        </div>
      </div>

      {/* Contact + MGTS CTA split */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {/* PBC tournament office */}
        <div className="rounded-2xl border border-[#e8e0d0] bg-white px-6 py-5">
          <div className="mb-1 font-ui text-[10px] font-bold uppercase tracking-[.1em] text-[#a8a294]">
            Pebble Beach Tournament Office
          </div>
          <div className="font-display text-[16px] font-bold text-ink">Book direct with PBR</div>
          <p className="mt-2 font-body text-[13px] text-[#6a6358]">
            Contact Patrick Freeman (Director of Tournaments) or Brittany Palone directly.
          </p>
          <a
            href="tel:8778535864"
            className="mt-4 flex items-center gap-2 font-ui text-[15px] font-bold text-fairway hover:text-fairway-dark"
          >
            (877) 853-5864
          </a>
          <a
            href={`https://www.pebblebeach.com/golf/tournaments-you-can-play/?${UTM}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-[#a8a294] hover:text-fairway"
          >
            Tournament enquiry form <ExternalArrow />
          </a>
        </div>

        {/* MGTS CTA */}
        <div className="flex flex-col justify-between rounded-2xl bg-fairway px-6 py-5">
          <div>
            <div className="mb-1 font-ui text-[10px] font-bold uppercase tracking-[.1em] text-[rgba(250,246,238,.55)]">
              Monterey Golf Tours
            </div>
            <div className="font-display text-[16px] font-bold text-cream">
              Build a full tournament trip
            </div>
            <p className="mt-2 font-body text-[13px] text-[rgba(250,246,238,.7)]">
              We coordinate lodging, tee times on non-tournament days, transfers, and dining —
              so your group arrives ready to compete.
            </p>
          </div>
          <Link
            href="/quote/"
            className="mt-5 inline-block self-start rounded-[8px] bg-gold px-6 py-3 font-ui text-[13px] font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#e6b82a]"
          >
            Plan your tournament trip →
          </Link>
        </div>
      </div>

      {/* Mobile tournament link */}
      <a
        href={`https://www.pebblebeach.com/golf/tournaments-you-can-play/?${UTM}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-fairway/30 py-3 font-ui text-[13px] font-semibold text-fairway md:hidden"
      >
        Tournament info on PebbleBeach.com <ExternalArrow />
      </a>

    </section>
  );
}
