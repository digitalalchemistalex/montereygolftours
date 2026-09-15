// PBCMajorsBanner.tsx
// Compact dual-event callout for AT&T Pro-Am (Feb 2027) + U.S. Open (Jun 2027).
// Shown on PBGL course page and PBC hotel pages.
// Auto-hides after Jun 20 2027.

const UTM = "utm_source=montereygolftours&utm_medium=referral&utm_campaign=majors-banner";

function isBefore(isoDate: string) {
  return new Date() < new Date(isoDate);
}

export default function PBCMajorsBanner() {
  const showATT    = isBefore("2027-02-07");
  const showUSOpen = isBefore("2027-06-20");

  if (!showATT && !showUSOpen) return null;

  const events = [
    showATT && {
      id: "att",
      label: "PGA Tour",
      name: "AT&T Pebble Beach Pro-Am",
      date: "Feb 1–7, 2027",
      url: `https://www.pebblebeach.com/events/att-pebble-beach-pro-am/?${UTM}&utm_content=att-banner`,
      color: "bg-[#1c3050]",
    },
    showUSOpen && {
      id: "usopen",
      label: "USGA",
      name: "2027 U.S. Open Championship",
      date: "Jun 17–20, 2027",
      url: `https://www.pebblebeach.com/events/us-open-championship/?${UTM}&utm_content=usopen-banner`,
      color: "bg-[#1a3a2a]",
    },
  ].filter(Boolean) as { id: string; label: string; name: string; date: string; url: string; color: string }[];

  return (
    <div className="border-b border-fairwayborder bg-[#f9f6ef] px-6 py-4 md:px-14">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <span className="flex-none font-ui text-[10px] font-bold uppercase tracking-[.12em] text-[#a8a294]">
          Coming to Pebble Beach
        </span>
        <div className="flex flex-wrap gap-2">
          {events.map((e) => (
            <a
              key={e.id}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${e.color} group inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 transition-opacity hover:opacity-90`}
            >
              <span className="font-ui text-[9px] font-bold uppercase tracking-[.07em] text-[rgba(250,246,238,.6)]">
                {e.label}
              </span>
              <span className="font-ui text-[12px] font-semibold text-cream">
                {e.name}
              </span>
              <span className="rounded-full bg-[rgba(255,255,255,.15)] px-2 py-0.5 font-ui text-[10px] font-semibold text-[rgba(250,246,238,.85)]">
                {e.date}
              </span>
            </a>
          ))}
        </div>
        <a
          href={`/quote/`}
          className="hidden flex-none font-ui text-[12px] font-semibold text-fairway hover:underline sm:ml-auto sm:inline"
        >
          Plan your trip →
        </a>
      </div>
    </div>
  );
}
