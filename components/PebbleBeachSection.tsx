import Link from "next/link";

const PBC_COURSES = [
  {
    slug: "pebble-beach-golf-links",
    name: "Pebble Beach Golf Links®",
    hook: "The world&apos;s most famous public golf course — clifftop drama on Stillwater Cove",
    closed: false,
  },
  {
    slug: "spyglass-hill",
    name: "Spyglass Hill® Golf Course",
    hook: "Where forest meets ocean — one of the most scenic and challenging tracks on the Peninsula",
    closed: false,
  },
  {
    slug: "links-at-spanish-bay",
    name: "The Links at Spanish Bay®",
    hook: "Closed for renovation · Reopens April 17, 2027 · Gil Hanse redesign",
    closed: true,
  },
  {
    slug: "del-monte-golf-course",
    name: "Del Monte Golf Course®",
    hook: "The oldest continuously operating golf course west of the Mississippi, est. 1897",
    closed: false,
  },
  {
    slug: "the-hay",
    name: "The Hay™",
    hook: "A 9-hole short course designed by Tiger Woods — perfect for a warm-up or twilight round",
    closed: false,
  },
];

const PBC_LODGING = [
  {
    name: "The Lodge at Pebble Beach™",
    hook: "Iconic resort at the 18th hole — the benchmark for golf resort luxury",
    url: "https://www.pebblebeach.com/accommodations/the-lodge/",
  },
  {
    name: "The Inn at Spanish Bay™",
    hook: "Scottish links atmosphere with ocean-view rooms and a nightly bagpiper at sunset",
    url: "https://www.pebblebeach.com/accommodations/the-inn-at-spanish-bay/",
  },
  {
    name: "Casa Palmero™",
    hook: "An intimate 24-room retreat — the most exclusive address on the Peninsula",
    url: "https://www.pebblebeach.com/accommodations/casa-palmero/",
  },
];

export default function PebbleBeachSection() {
  return (
    <section className="bg-[#0e1f2b] px-6 py-20 md:px-14 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-col items-center text-center">
          <span className="rounded-full border border-[#c8a84b]/40 px-3 py-1 font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#c8a84b]">
            IAGTO Authorized Partner
          </span>
          <h2 className="mt-4 font-display text-[32px] font-bold text-white md:text-[42px]">
            Pebble Beach Resorts®
          </h2>
          <p className="mt-3 max-w-[560px] font-body text-[15px] leading-relaxed text-white/75">
            Exclusive access to the world&apos;s most celebrated golf destination
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          <div>
            <div className="mb-3 font-ui text-[11px] font-bold uppercase tracking-[.14em] text-[#c8a84b]">
              Golf Courses
            </div>
            <div className="flex flex-col gap-4">
              {PBC_COURSES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/golf-courses/${c.slug}/`}
                  className={`block rounded-lg border border-white/10 px-4 py-3 transition-colors hover:bg-white/5 ${c.closed ? "opacity-70" : ""}`}
                >
                  <div className="font-ui text-[14.5px] font-semibold text-white">{c.name}</div>
                  <div className="mt-1 font-body text-[12.5px] leading-relaxed text-white/60">{c.hook}</div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 font-ui text-[11px] font-bold uppercase tracking-[.14em] text-[#c8a84b]">
              Lodging
            </div>
            <div className="flex flex-col gap-4">
              {PBC_LODGING.map((h) => (
                <a
                  key={h.name}
                  href={h.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-white/10 px-4 py-3 transition-colors hover:bg-white/5"
                >
                  <div className="font-ui text-[14.5px] font-semibold text-white">{h.name}</div>
                  <div className="mt-1 font-body text-[12.5px] leading-relaxed text-white/60">{h.hook}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-[820px] text-center font-ui text-xs leading-relaxed text-white/40">
          Pebble Beach®, Pebble Beach Golf Links®, Spyglass Hill® Golf Course, The Links at Spanish Bay®,
          Del Monte Golf Course®, The Hay™, The Lodge at Pebble Beach™, The Inn at Spanish Bay™, and
          Casa Palmero™ are trademarks, service marks, and trade dress of Pebble Beach Company. Used with permission.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/quote/?interest=pebble-beach"
            className="rounded-[7px] bg-[#c8a84b] px-6 py-3 font-ui text-[15px] font-bold text-[#0e1f2b] hover:bg-[#d4b65e]"
          >
            Plan Your Pebble Beach Resorts® Trip &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
