import Link from "next/link";
import Image from "next/image";
import Header from "./Header";

const STATS = [
  { n: "8", l: "Courses on tap" },
  { n: "9", l: "Properties to stay" },
  { n: "1954", l: "Year Bayonet opened" },
  { n: "1897", l: "Oldest course on the peninsula" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[640px] flex-col overflow-hidden bg-[#16242c] md:min-h-[820px]">
      <Image
        src="https://images.unsplash.com/photo-1742498626135-67a7d3501eff?auto=format&fit=crop&w=1920&q=80"
        alt="Aerial view of a coastal golf course at sunrise"
        fill
        priority
        className="object-cover"
        style={{ objectPosition: "center 55%" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(22,36,44,.20) 0%, rgba(22,36,44,.10) 30%, rgba(22,36,44,.55) 72%, rgba(22,36,44,.72) 100%)",
        }}
      />

      <Header />

      <div className="relative z-10 mt-auto max-w-[760px] px-6 pb-8 md:px-14 md:pb-7">
        <span className="inline-block rounded-full border border-[rgba(250,246,238,.4)] bg-[rgba(22,36,44,.35)] px-4 py-1.5 font-ui text-xs font-semibold uppercase tracking-[.1em] text-cream backdrop-blur-sm">
          Monterey Peninsula, California
        </span>
        <h1
          className="mt-6 font-display text-[40px] font-bold leading-[1.08] text-cream md:text-[64px] md:leading-[1.05]"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,.3)" }}
        >
          Your group&apos;s golf trip to the coast, planned end to end
        </h1>
        <p className="mt-5 max-w-[540px] font-body text-base leading-relaxed text-[rgba(250,246,238,.85)] md:mt-6 md:text-lg">
          Courses, tee times, lodging, and transport for the Monterey Peninsula — handled by people
          who know the fog patterns as well as the fairways.
        </p>
        <div className="mt-7 flex flex-wrap gap-3 md:mt-8">
          <Link
            href="/quote/"
            className="inline-flex items-center gap-2 rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream shadow-[0_6px_18px_rgba(0,0,0,.25)] hover:bg-ocean-dark"
          >
            Get a custom quote &rarr;
          </Link>
          <Link
            href="/itineraries/"
            className="inline-flex items-center rounded-[9px] border-[1.5px] border-[rgba(250,246,238,.55)] bg-[rgba(22,36,44,.25)] px-7 py-4 font-ui text-base font-semibold text-cream backdrop-blur-[2px] hover:border-gold hover:bg-[rgba(232,160,168,.18)]"
          >
            See sample itineraries
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-6 flex max-w-[920px] border-t border-[rgba(250,246,238,.22)] px-0 py-6 md:mx-14 md:py-7">
        {STATS.map((s) => (
          <div key={s.l} className="flex-1">
            <div className="font-display text-2xl font-bold leading-none text-gold md:text-[40px]">
              {s.n}
            </div>
            <div className="mt-2 font-ui text-[11px] font-medium uppercase tracking-[.06em] text-[rgba(250,246,238,.75)] md:text-xs">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
