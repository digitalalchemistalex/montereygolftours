import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import MobileNav from "./MobileNav";

const STATS = [
  { n: "14", l: "Courses available" },
  { n: "11", l: "Hotels & resorts" },
  { n: "1954", l: "Year Bayonet opened" },
  { n: "1897", l: "Oldest course on the peninsula" },
];

export default function HeroCentered() {
  return (
    <section className="relative flex min-h-[820px] flex-col overflow-hidden bg-[#16242c] md:min-h-[900px]">
      <Image
        src="https://images.unsplash.com/photo-1742498626135-67a7d3501eff?auto=format&fit=crop&w=2400&q=95"
        alt="Aerial view of a coastal golf course at sunrise"
        fill
        priority
        quality={92}
        sizes="100vw"
        className="hidden object-cover sm:block"
        style={{ objectPosition: "center 55%", filter: "saturate(1.18) contrast(1.08) brightness(1.03)" }}
      />
      <Image
        src="https://images.unsplash.com/photo-1709525616662-8d9f9a995ceb?auto=format&fit=crop&w=800&q=95"
        alt="Golf course green with fairway and trees"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="block object-cover sm:hidden"
        style={{ objectPosition: "center 60%", filter: "saturate(1.2) contrast(1.1) brightness(1.02)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(22,36,44,.55) 0%, rgba(22,36,44,.25) 30%, rgba(22,36,44,.55) 70%, rgba(22,36,44,.82) 100%)",
        }}
      />

      <div className="absolute right-5 top-5 z-20 md:right-8 md:top-6">
        <MobileNav forceVisible />
      </div>

      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[720px] flex-col items-center px-6 pb-10 pt-20 text-center md:pb-12">
        <Image
          src="/brand/logo.png"
          alt="Monterey Golf Tours"
          width={280}
          height={268}
          priority
          style={{ width: 220, height: "auto" }}
          className="md:!w-[280px]"
        />

        <div className="mt-6 h-px w-24 bg-[rgba(250,246,238,.35)]" />

        <p className="mt-6 font-body text-lg italic leading-relaxed text-[rgba(250,246,238,.9)] md:text-xl">
          Group Trip Reservations
        </p>
        <a
          href={SITE.phoneHref}
          className="mt-2 font-display text-3xl font-bold text-cream md:text-4xl"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,.4)" }}
        >
          {SITE.phone}
        </a>

        <div className="mt-3 h-px w-24 bg-[rgba(250,246,238,.35)]" />

        <div className="mt-8 flex w-full max-w-[420px] flex-col gap-3">
          <Link
            href="/quote/"
            className="rounded-[9px] bg-cream px-7 py-4 text-center font-ui text-base font-bold uppercase tracking-[.05em] text-ink shadow-[0_6px_18px_rgba(0,0,0,.25)] transition-transform hover:-translate-y-0.5"
          >
            Plan My Trip
          </Link>
          <Link
            href="/itineraries/"
            className="rounded-[9px] border-[1.5px] border-[rgba(250,246,238,.55)] bg-[rgba(22,36,44,.25)] px-7 py-3.5 text-center font-ui text-[15px] font-semibold text-cream backdrop-blur-[2px] transition-transform hover:-translate-y-0.5 hover:border-gold"
          >
            Preview Availability &rsaquo;
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-6 grid max-w-[980px] grid-cols-2 gap-x-6 gap-y-8 border-t border-[rgba(250,246,238,.22)] px-0 py-7 md:mx-auto md:grid-cols-4 md:py-8">
        {STATS.map((s, i) => (
          <div key={s.l} className={i === 0 ? "md:pr-4" : "md:border-l md:border-[rgba(250,246,238,.15)] md:pl-6"}>
            <div className="font-display text-stat-lg font-extrabold leading-none text-gold text-center md:text-left">
              {s.n}
            </div>
            <div className="mt-2.5 text-center font-ui text-[11px] font-medium uppercase tracking-[.08em] text-[rgba(250,246,238,.75)] md:text-left md:text-xs">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
