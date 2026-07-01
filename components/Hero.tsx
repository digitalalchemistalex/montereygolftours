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

      <div className="relative z-10 mt-auto max-w-[820px] px-6 pb-8 md:px-14 md:pb-8">
        <h1
          className="text-display-xl font-display font-extrabold text-cream"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,.35)" }}
        >
          Your group&apos;s golf trip,
          <br />
          <span className="text-gold">planned end to end.</span>
        </h1>
        <p className="mt-5 max-w-[520px] font-body text-base leading-relaxed text-[rgba(250,246,238,.88)] md:mt-6 md:text-lg">
          Courses, tee times, lodging, and transport for the Monterey Peninsula — handled by people
          who know the fog patterns as well as the fairways.
        </p>
        <div className="mt-7 flex flex-wrap gap-3 md:mt-9">
          <Link
            href="/quote/"
            className="inline-flex items-center gap-2 rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream shadow-[0_6px_18px_rgba(0,0,0,.25)] transition-transform hover:-translate-y-0.5 hover:bg-ocean-dark"
          >
            Get a custom quote &rarr;
          </Link>
          <Link
            href="/itineraries/"
            className="inline-flex items-center rounded-[9px] border-[1.5px] border-[rgba(250,246,238,.55)] bg-[rgba(22,36,44,.25)] px-7 py-4 font-ui text-base font-semibold text-cream backdrop-blur-[2px] transition-transform hover:-translate-y-0.5 hover:border-gold hover:bg-[rgba(232,160,168,.18)]"
          >
            See sample itineraries
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-6 grid max-w-[980px] grid-cols-2 gap-x-6 gap-y-8 border-t border-[rgba(250,246,238,.22)] px-0 py-7 md:mx-14 md:grid-cols-4 md:py-8">
        {STATS.map((s, i) => (
          <div key={s.l} className={i === 0 ? "md:pr-4" : "md:border-l md:border-[rgba(250,246,238,.15)] md:pl-6"}>
            <div className="font-display text-stat-lg font-extrabold leading-none text-gold">
              {s.n}
            </div>
            <div className="mt-2.5 font-ui text-[11px] font-medium uppercase tracking-[.08em] text-[rgba(250,246,238,.75)] md:text-xs">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
