"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import Header from "./Header";

const LEVELS = {
  scratch: {
    headline: ["Bayonet\u2019s Back Nine Waits.", "Can You Handle It?"],
    sub: "Combat Corner on #13. 72.8 rating. The peninsula\u2019s hardest public layout. We\u2019ll get you on the courses that actually test low handicappers \u2014 not just the famous ones.",
    cta: "Plan my scratch trip",
  },
  club: {
    headline: ["The Peninsula\u2019s Toughest Courses.", "Zero Logistics Headaches."],
    sub: "Play Bayonet, Black Horse, Laguna Seca, and the peninsula\u2019s iconic resort courses \u2014 tee times, lodging, and transfers handled end to end.",
    cta: "Plan my trip",
  },
  social: {
    headline: ["Monterey Golf Without the", "Handicap Pressure."],
    sub: "Pacific Grove\u2019s walking-friendly links. Quail Lodge\u2019s calm valley setting. Del Monte\u2019s historic layout. Great golf for groups who want fun over scorecards.",
    cta: "Show me social packages",
  },
  corp: {
    headline: ["14 Courses, One Point of Contact.", "Your Group, Handled."],
    sub: "Corporate outings on Carmel Valley Ranch, TPC Pasadera, or Poppy Hills. We handle tee sheet blocks, hotel room blocks, and transfers for groups up to 40.",
    cta: "Get a group quote",
  },
} as const;

type Level = keyof typeof LEVELS;

const MONTH_INTEL = [
  { booking: "2\u20133 weeks out", bookingNote: "Quiet season \u2014 good availability, AT&T Pro-Am approaching in Feb", event: "January value window", eventNote: "Best green fee rates of the year \u2014 quiet peninsula, great conditions" },
  { booking: "6\u20138 weeks out", bookingNote: "AT&T Pro-Am week books out entirely \u2014 plan around it", event: "AT&T Pro-Am \u00b7 Feb", eventNote: "Peninsula buzzing \u2014 celebrity pro-am shuts down key tee sheets" },
  { booking: "4\u20135 weeks out", bookingNote: "Post-AT&T lull \u2014 decent availability returning", event: "Spring shoulder season", eventNote: "Weather improving, crowds light, good value window" },
  { booking: "5\u20136 weeks out", bookingNote: "Spring season picking up \u2014 act early for peak dates", event: "Spring bloom in Carmel Valley", eventNote: "Wildflowers on the valley courses, warm afternoons" },
  { booking: "6+ weeks out", bookingNote: "May fills fast \u2014 best weather before summer fog arrives", event: "Pre-fog window closing", eventNote: "Last clear mornings before June marine layer sets in" },
  { booking: "8+ weeks out", bookingNote: "Peak season starts \u2014 schedule coastal courses post-10am", event: "Marine layer season", eventNote: "June fog on coastal holes \u2014 Carmel Valley stays clear all day" },
  { booking: "8+ weeks out", bookingNote: "Peak summer \u2014 inventory moves fast", event: "Summer peak", eventNote: "Fog most mornings \u2014 afternoon coastal rounds are the call" },
  { booking: "60\u201390 days out", bookingNote: "Car Week (mid-Aug) adds chaos \u2014 book around it or lean in", event: "Car Week \u00b7 Mid-Aug", eventNote: "Peninsula slammed \u2014 Pebble Beach Concours draws 20,000 visitors" },
  { booking: "60+ days out", bookingNote: "Peak fall \u2014 tee times moving fast right now", event: "Best month of the year", eventNote: "September \u2014 post-summer crowds gone, weather perfect, no Car Week chaos" },
  { booking: "5\u20136 weeks out", bookingNote: "Fall shoulder \u2014 weather still excellent, crowds thinning", event: "October sweet spot", eventNote: "Clearest skies of the year \u2014 no fog, warm afternoons at Carmel Valley" },
  { booking: "3\u20134 weeks out", bookingNote: "Off-peak starts \u2014 good rates and availability", event: "Pre-holiday quiet", eventNote: "Excellent time to play \u2014 locals\u2019 favourite window" },
  { booking: "2\u20133 weeks out", bookingNote: "Quiet season \u2014 best rates of the year", event: "December value window", eventNote: "Best green fee rates of the year \u2014 quiet peninsula, great conditions" },
];

interface WeatherLocation {
  name: string;
  temp: number;
  desc: string;
  clouds: number;
}

interface WeatherData {
  ok: boolean;
  locations: WeatherLocation[];
  fog: { chance: number; clearTime: string; note: string };
}

export default function HeroCentered() {
  const [level, setLevel] = useState<Level>("club");
  const [visible, setVisible] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const month = new Date().getMonth();
  const intel = MONTH_INTEL[month];

  useEffect(() => {
    fetch("/api/weather")
      .then((r) => r.json())
      .then((d: WeatherData) => { if (d.ok) setWeather(d); })
      .catch(() => {});
  }, []);

  function changeLevel(l: Level) {
    if (l === level) return;
    setVisible(false);
    setTimeout(() => { setLevel(l); setVisible(true); }, 200);
  }

  const current = LEVELS[level];

  return (
    <section className="relative flex min-h-[820px] flex-col overflow-hidden bg-[#16242c] md:min-h-[900px]">
      {/* Background image */}
      <Image
        src="/images/courses/gallery/pebble-beach-hole-9-aerial.jpg"
        alt="Pebble Beach Golf Links\u00ae \u2014 aerial view of Hole 9 at golden hour. Photo by Jeff Marsh"
        fill
        priority
        quality={92}
        sizes="100vw"
        className="hidden object-cover sm:block"
        style={{ objectPosition: "center 35%", filter: "saturate(1.15) contrast(1.06) brightness(1.02)" }}
      />
      <Image
        src="/images/courses/gallery/pebble-beach-hole-9.jpg"
        alt="Pebble Beach Golf Links\u00ae \u2014 Hole 9 coastal fairway. \u00a9 Pebble Beach Company"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="block object-cover sm:hidden"
        style={{ objectPosition: "center 60%", filter: "saturate(1.2) contrast(1.1) brightness(1.02)" }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(22,36,44,.15) 0%, rgba(22,36,44,.05) 25%, rgba(22,36,44,.3) 55%, rgba(22,36,44,.75) 88%, rgba(22,36,44,.92) 100%)" }}
      />

      <Header transparent />

      {/* Main content */}
      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[760px] flex-col items-center px-6 pb-10 text-center md:pb-12">

        <p className="font-ui text-[11px] font-semibold uppercase tracking-[.1em] text-gold">
          Monterey Peninsula &middot; Est. 1954
        </p>

        {/* Animated headline */}
        <div
          className="mt-5 transition-opacity duration-200"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <h1 className="font-display text-[42px] font-bold leading-[1.1] text-cream md:text-[50px]">
            {current.headline[0]}<br />{current.headline[1]}
          </h1>
          <p className="mt-4 font-body text-[17px] leading-relaxed text-[rgba(250,246,238,.65)] md:text-lg">
            {current.sub}
          </p>
        </div>

        {/* Level selector */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="font-ui text-[11px] font-semibold uppercase tracking-[.07em] text-[rgba(250,246,238,.4)]">
            I play as a
          </span>
          {(Object.keys(LEVELS) as Level[]).map((l) => (
            <button
              key={l}
              onClick={() => changeLevel(l)}
              className={[
                "rounded-[7px] border px-4 py-2 font-ui text-[12px] font-semibold transition-all",
                level === l
                  ? "border-gold/60 bg-gold/[.18] text-gold"
                  : "border-cream/20 bg-cream/[.06] text-cream/55 hover:border-cream/40 hover:text-cream/85",
              ].join(" ")}
            >
              {l === "scratch" ? "Single figures" : l === "club" ? "Club golfer" : l === "social" ? "Social / fun" : "Corporate group"}
            </button>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-7 flex w-full max-w-[420px] flex-col gap-3">
          <Link
            href="/quote/"
            className="rounded-[9px] bg-cream px-7 py-4 text-center font-ui text-base font-bold uppercase tracking-[.05em] text-ink shadow-[0_6px_18px_rgba(0,0,0,.35)] transition-transform hover:-translate-y-0.5"
          >
            {current.cta}
          </Link>
          <Link
            href="/itineraries/"
            className="rounded-[9px] border-[1.5px] border-cream/70 bg-[rgba(22,36,44,.35)] px-7 py-3.5 text-center font-ui text-[15px] font-semibold text-cream backdrop-blur-[2px] transition-transform hover:-translate-y-0.5 hover:border-gold"
          >
            See sample itineraries &rsaquo;
          </Link>
        </div>
      </div>

      {/* Intelligence strip */}
      <div className="relative z-10 mx-4 grid max-w-[980px] grid-cols-2 gap-x-0 border-t border-cream/[.15] md:mx-auto md:grid-cols-4">
        
        {/* Cell 1: Live weather */}
        <div className="flex flex-col gap-1.5 px-6 py-7 first:pl-0">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
            </span>
            <span className="font-ui text-[10px] font-bold uppercase tracking-[.08em] text-cream/40">
              Live on the peninsula
            </span>
          </div>
          {weather ? (
            <>
              <p className="font-display text-[22px] font-bold leading-none text-cream">
                {weather.locations[0].temp}&deg;F{" "}
                <span className="font-body text-[13px] font-normal text-cream/40">
                  &middot; {weather.locations[0].desc}
                </span>
              </p>
              <div className="mt-1 flex gap-4">
                {weather.locations.map((loc) => (
                  <div key={loc.name} className="flex flex-col gap-0.5">
                    <span className="font-ui text-[9px] font-bold uppercase tracking-[.06em] text-cream/30">{loc.name}</span>
                    <span className="font-ui text-[12px] font-semibold text-cream/70">{loc.temp}&deg;F</span>
                    <span className="font-ui text-[10px] text-cream/35">{loc.desc}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="font-body text-[13px] italic text-cream/30">Fetching&hellip;</p>
          )}
        </div>

        {/* Cell 2: Fog */}
        <div className="flex flex-col gap-1.5 border-l border-cream/[.1] px-6 py-7">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="font-ui text-[10px] font-bold uppercase tracking-[.08em] text-cream/40">
              Fog &amp; conditions
            </span>
          </div>
          {weather ? (
            <>
              <p className="font-display text-[15px] font-semibold leading-snug text-cream">
                Marine layer{" "}
                <span className="text-gold">{weather.fog.clearTime}</span>
              </p>
              <p className="font-body text-[11px] leading-snug text-cream/40">{weather.fog.note}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-ui text-[10px] text-cream/35">Fog chance</span>
                <div className="h-1 w-14 overflow-hidden rounded-full bg-cream/10">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${weather.fog.chance}%`,
                      background: weather.fog.chance > 60 ? "#94a3b8" : weather.fog.chance > 30 ? "#c8a84b" : "#4ade80",
                    }}
                  />
                </div>
                <span className="font-ui text-[10px] text-cream/50">{weather.fog.chance}%</span>
              </div>
            </>
          ) : (
            <p className="font-body text-[13px] italic text-cream/30">Loading&hellip;</p>
          )}
        </div>

        {/* Cell 3: Booking window */}
        <div className="flex flex-col gap-1.5 border-l border-cream/[.1] px-6 py-7">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            <span className="font-ui text-[10px] font-bold uppercase tracking-[.08em] text-cream/40">
              Booking window
            </span>
          </div>
          <p className="font-display text-[15px] font-semibold leading-snug text-cream">
            Book <span className="text-gold">{intel.booking}</span>
          </p>
          <p className="font-body text-[11px] leading-snug text-cream/40">{intel.bookingNote}</p>
        </div>

        {/* Cell 4: Local intel */}
        <div className="flex flex-col gap-1.5 border-l border-cream/[.1] px-6 py-7">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-ui text-[10px] font-bold uppercase tracking-[.08em] text-cream/40">
              Local intel
            </span>
          </div>
          <p className="font-display text-[15px] font-semibold leading-snug text-cream">
            {intel.event}
          </p>
          <p className="font-body text-[11px] leading-snug text-cream/40">{intel.eventNote}</p>
        </div>

      </div>
    </section>
  );
}
