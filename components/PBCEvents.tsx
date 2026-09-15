// PBCEvents.tsx
// Upcoming PBC events — renders only future events, auto-hides past ones.
// Data sourced from pebblebeach.com/events/ Sep 14 2026.
// Props control which event tiers to show so the same component works on
// course pages (golf-tier only) and hotel pages (all tiers).
// All outbound links carry UTM tracking.

import Link from "next/link";

const UTM_BASE = "utm_source=montereygolftours&utm_medium=referral&utm_campaign=pbc-events";

type EventTier = "golf" | "lifestyle" | "recurring";

type PBCEvent = {
  id: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  // ISO date string for the START of the event — used to hide past events
  startDate: string;
  // ISO date string for END — we hide after this passes
  endDate: string;
  tier: EventTier;
  url: string;
  utmContent: string;
  highlight?: boolean; // renders with accent treatment
};

const EVENTS: PBCEvent[] = [
  {
    id: "pure-insurance",
    title: "Pure Insurance Championship",
    subtitle: "PGA Champions Tour · Del Monte™ Golf Course",
    dateLabel: "Sep 18–20, 2026",
    startDate: "2026-09-18",
    endDate: "2026-09-20",
    tier: "golf",
    url: "https://www.pebblebeach.com/events/pure-insurance-championship/",
    utmContent: "pure-insurance",
  },
  {
    id: "monterey-open",
    title: "2026 Monterey Open",
    subtitle: "54-hole stroke play · Del Monte™ Golf Course",
    dateLabel: "Oct 19–21, 2026",
    startDate: "2026-10-19",
    endDate: "2026-10-21",
    tier: "golf",
    url: "https://www.pebblebeach.com/golf/del-monte-golf-course/monterey-open-championship/",
    utmContent: "monterey-open",
  },
  {
    id: "taylormade-invitational",
    title: "TaylorMade Pebble Beach Invitational",
    subtitle: "PGA · LPGA · Champions · Korn Ferry Tours + amateurs",
    dateLabel: "Nov 17–22, 2026",
    startDate: "2026-11-17",
    endDate: "2026-11-22",
    tier: "golf",
    url: "https://www.pebblebeach.com/events/taylormade-pebble-beach-invitational/",
    utmContent: "taylormade-invitational",
    highlight: true,
  },
  {
    id: "att-pro-am",
    title: "AT&T Pebble Beach Pro-Am",
    subtitle: "PGA Tour · World's best golfers + celebrities",
    dateLabel: "Feb 1–7, 2027",
    startDate: "2027-02-01",
    endDate: "2027-02-07",
    tier: "golf",
    url: "https://www.pebblebeach.com/events/att-pebble-beach-pro-am/",
    utmContent: "att-pro-am",
    highlight: true,
  },
  {
    id: "food-wine",
    title: "Pebble Beach Food & Wine",
    subtitle: "135+ global chefs · 150 wineries",
    dateLabel: "Apr 1–4, 2027",
    startDate: "2027-04-01",
    endDate: "2027-04-04",
    tier: "lifestyle",
    url: "https://www.pebblebeachfoodandwine.com/",
    utmContent: "food-wine",
  },
  {
    id: "us-open-2027",
    title: "2027 U.S. Open Championship",
    subtitle: "Pebble Beach Golf Links® · Championship history",
    dateLabel: "Jun 17–20, 2027",
    startDate: "2027-06-17",
    endDate: "2027-06-20",
    tier: "golf",
    url: "https://www.pebblebeach.com/events/us-open-championship/",
    utmContent: "us-open-2027",
    highlight: true,
  },
  {
    id: "concours",
    title: "Pebble Beach Concours d'Elegance",
    subtitle: "76th year · Monterey Car Week flagship",
    dateLabel: "Aug 15, 2027",
    startDate: "2027-08-15",
    endDate: "2027-08-15",
    tier: "lifestyle",
    url: "https://www.pebblebeach.com/events/concours-delegance/",
    utmContent: "concours",
  },
];

// Recurring events shown as a compact row, not date-gated
const RECURRING = [
  {
    id: "bagpiper",
    title: "Spanish Bay Bagpiper",
    detail: "Every evening · 5:45–6:30 pm · Fire pits",
    url: `https://www.pebblebeach.com/events/?${UTM_BASE}&utm_content=bagpiper`,
  },
  {
    id: "jazz",
    title: "Live Jazz at The Inn",
    detail: "Thu–Sat · 7–10 pm · Lobby Lounge",
    url: `https://www.pebblebeach.com/dining/the-lobby-lounge/?${UTM_BASE}&utm_content=jazz`,
  },
  {
    id: "blues",
    title: "Patio Blues at The Inn",
    detail: "Saturdays · 2–5 pm · The Inn patio",
    url: `https://www.pebblebeach.com/events/?${UTM_BASE}&utm_content=blues`,
  },
];

function isFuture(endDate: string): boolean {
  return new Date(endDate) >= new Date(new Date().toISOString().slice(0, 10));
}

const ExternalArrow = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

type Props = {
  tiers?: EventTier[];        // which tiers to show; defaults to ["golf"]
  showRecurring?: boolean;    // show recurring events row; defaults false
  title?: string;
  subtitle?: string;
};

export default function PBCEvents({
  tiers = ["golf"],
  showRecurring = false,
  title = "Upcoming events at Pebble Beach",
  subtitle = "Plan your trip around what's happening on the Monterey Peninsula.",
}: Props) {
  const visibleEvents = EVENTS.filter(
    (e) => tiers.includes(e.tier) && isFuture(e.endDate)
  );

  if (visibleEvents.length === 0 && !showRecurring) return null;

  return (
    <section className="border-b border-fairwayborder bg-white px-6 py-14 md:px-14 md:py-20">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="mb-2 inline-block rounded-full bg-fairway/10 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[.12em] text-fairway">
            Calendar
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
            {title}
          </h2>
          <p className="mt-2 max-w-xl font-body text-[14.5px] text-[#5a5448]">{subtitle}</p>
        </div>
        <a
          href={`https://www.pebblebeach.com/events/?${UTM_BASE}&utm_content=full-calendar`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden flex-none items-center gap-1.5 rounded-lg border border-[#e0d8c8] px-4 py-2.5 font-ui text-[13px] font-semibold text-ink transition-colors hover:border-fairway/40 hover:text-fairway md:flex"
        >
          Full calendar on PebbleBeach.com <ExternalArrow />
        </a>
      </div>

      {/* Event list */}
      {visibleEvents.length > 0 && (
        <div className="divide-y divide-[#f0ebe1] border-t border-[#f0ebe1]">
          {visibleEvents.map((event) => (
            <a
              key={event.id}
              href={`${event.url}${event.url.includes("?") ? "&" : "?"}${UTM_BASE}&utm_content=${event.utmContent}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-[#faf7f2] -mx-2 px-2 rounded-lg"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Date pill */}
                <div className={`hidden flex-none flex-col items-center rounded-xl px-3 py-2 text-center sm:flex ${event.highlight ? "bg-fairway text-cream" : "bg-[#f4f0e7] text-ink"}`}>
                  <span className="font-ui text-[10px] font-bold uppercase tracking-[.06em] opacity-70">
                    {event.dateLabel.split(" ")[0].slice(0, 3)}
                  </span>
                  <span className="font-display text-[16px] font-bold leading-tight">
                    {event.dateLabel.replace(/[A-Za-z]+ /,"").split("–")[0].split(",")[0]}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {event.highlight && (
                      <span className="hidden rounded-full bg-gold/20 px-2 py-0.5 font-ui text-[9px] font-bold uppercase tracking-[.06em] text-[#8a6a00] sm:inline">
                        Major event
                      </span>
                    )}
                  </div>
                  <div className="font-ui text-[14px] font-semibold text-ink leading-tight group-hover:text-fairway">
                    {event.title}
                  </div>
                  <div className="mt-0.5 font-body text-[12.5px] text-[#8a857a]">
                    {event.dateLabel} · {event.subtitle}
                  </div>
                </div>
              </div>
              <div className="flex flex-none items-center gap-1 font-ui text-[12px] font-semibold text-[#a8a294] group-hover:text-fairway">
                <span className="hidden sm:inline">Details</span>
                <ExternalArrow />
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Recurring events */}
      {showRecurring && (
        <div className="mt-8">
          <div className="mb-3 font-ui text-[10px] font-bold uppercase tracking-[.12em] text-[#a8a294]">
            Happening every week
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {RECURRING.map((r) => (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-[#e8e0d0] bg-[#faf7f2] px-4 py-3 transition-colors hover:border-fairway/30"
              >
                <div className="font-ui text-[13px] font-semibold text-ink group-hover:text-fairway leading-tight">
                  {r.title}
                </div>
                <div className="mt-1 font-body text-[12px] text-[#8a857a]">{r.detail}</div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mobile full calendar link */}
      <a
        href={`https://www.pebblebeach.com/events/?${UTM_BASE}&utm_content=full-calendar`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#e0d8c8] py-3 font-ui text-[13px] font-semibold text-ink md:hidden"
      >
        Full calendar on PebbleBeach.com <ExternalArrow />
      </a>

      {/* MGTS CTA */}
      <div className="mt-6 rounded-2xl bg-[#f4f0e7] px-5 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-[13.5px] text-[#4a4f3c]">
          Planning a trip around one of these events? We handle tee times, lodging, and transfers.
        </p>
        <Link
          href="/quote/"
          className="flex-none self-start rounded-[8px] bg-fairway px-5 py-2.5 font-ui text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-fairway-dark sm:self-auto"
        >
          Get a quote →
        </Link>
      </div>
    </section>
  );
}
