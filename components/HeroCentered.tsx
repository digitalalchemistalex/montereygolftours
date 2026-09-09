"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import Header from "./Header";

const MONTH_INTEL = [
  { booking: "2–3 weeks out", bookingNote: "Quiet season — good availability, AT&T Pro-Am approaching in Feb", event: "January value window", eventNote: "Best green fee rates of the year — quiet peninsula, great conditions" },
  { booking: "6–8 weeks out", bookingNote: "AT&T Pro-Am week books out entirely — plan around it", event: "AT&T Pro-Am · Feb", eventNote: "Peninsula buzzing — celebrity pro-am shuts down key tee sheets" },
  { booking: "4–5 weeks out", bookingNote: "Post-AT&T lull — decent availability returning", event: "Spring shoulder season", eventNote: "Weather improving, crowds light, good value window" },
  { booking: "5–6 weeks out", bookingNote: "Spring season picking up — act early for peak dates", event: "Spring bloom in Carmel Valley", eventNote: "Wildflowers on the valley courses, warm afternoons" },
  { booking: "6+ weeks out", bookingNote: "May fills fast — best weather before summer fog arrives", event: "Pre-fog window closing", eventNote: "Last clear mornings before June marine layer sets in" },
  { booking: "8+ weeks out", bookingNote: "Peak season starts — schedule coastal courses post-10am", event: "Marine layer season", eventNote: "June fog on coastal holes — Carmel Valley stays clear all day" },
  { booking: "8+ weeks out", bookingNote: "Peak summer — inventory moves fast", event: "Summer peak", eventNote: "Fog most mornings — afternoon coastal rounds are the call" },
  { booking: "60–90 days out", bookingNote: "Car Week (mid-Aug) adds chaos — book around it or lean in", event: "Car Week · Mid-Aug", eventNote: "Peninsula slammed — Pebble Beach Concours draws 20,000 visitors" },
  { booking: "60+ days out", bookingNote: "Peak fall — tee times moving fast right now", event: "Best month of the year", eventNote: "September — post-summer crowds gone, weather perfect, no Car Week chaos" },
  { booking: "5–6 weeks out", bookingNote: "Fall shoulder — weather still excellent, crowds thinning", event: "October sweet spot", eventNote: "Clearest skies of the year — no fog, warm afternoons at Carmel Valley" },
  { booking: "3–4 weeks out", bookingNote: "Off-peak starts — good rates and availability", event: "Pre-holiday quiet", eventNote: "Excellent time to play — locals’ favourite window" },
  { booking: "2–3 weeks out", bookingNote: "Quiet season — best rates of the year", event: "December value window", eventNote: "Best green fee rates of the year — quiet peninsula, great conditions" },
];

interface WeatherLocation { name: string; temp: number; desc: string; }
interface WeatherData { ok: boolean; locations: WeatherLocation[]; fog: { chance: number; clearTime: string; note: string }; }

export default function HeroCentered() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const month = new Date().getMonth();
  const intel = MONTH_INTEL[month];

  useEffect(() => {
    fetch("/api/weather")
      .then((r) => r.json())
      .then((d: WeatherData) => { if (d.ok) setWeather(d); })
      .catch(() => {});
  }, []);

  return (
    <section className="relative flex min-h-[820px] flex-col overflow-hidden bg-[#16242c] md:min-h-[900px]">

      {/* Background image — same as original */}
      <Image
        src="/images/courses/gallery/pebble-beach-hole-9-aerial.jpg"
        alt="Monterey Peninsula golf courses — aerial view of the California coast at golden hour"
        fill
        priority
        quality={92}
        sizes="100vw"
        className="hidden object-cover sm:block"
        style={{ objectPosition: "center 35%", filter: "saturate(1.15) contrast(1.06) brightness(1.02)" }}
      />
      <Image
        src="/images/courses/bayonet-hero.webp"
        alt="Monterey Peninsula golf — coastal fairway at Pebble Beach area. © Pebble Beach Company"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="block object-cover sm:hidden"
        style={{ objectPosition: "center 40%", filter: "saturate(1.1) contrast(1.05) brightness(0.88)" }}
      />

      {/* Photo credit — bottom right */}
      <div className="absolute bottom-2 right-3 z-10 hidden sm:block">
        <span className="font-ui text-[9px] text-white/50 tracking-[.04em]">Photo by Jeff Marsh · © Pebble Beach Company</span>
      </div>

      {/* Overlay — darkened at top so nav is readable */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(10,20,15,.72) 0%, rgba(10,20,15,.55) 20%, rgba(10,20,15,.42) 40%, rgba(10,20,15,.58) 65%, rgba(10,20,15,.84) 88%, rgba(10,20,15,.95) 100%)" }}
      />

      <Header transparent />

      {/* Hero content */}
      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[780px] flex-col items-center px-6 pb-10 text-center md:pb-12">

        {/* Logo */}
        <Image
          src="/brand/logo-correct.png"
          alt="Monterey Golf Tours"
          width={1024}
          height={1024}
          priority
          style={{ width: 120, height: "auto" }}
          className="md:!w-[140px]"
        />
        <div className="mt-5 h-px w-20 bg-[rgba(250,246,238,.35)]" />

        {/* Eyebrow — secondary keyword: "Monterey Peninsula Golf" */}
        <p className="mt-5 font-ui text-[11px] font-semibold uppercase tracking-[.1em] text-gold">
          Monterey Peninsula Golf &middot; Group &amp; Custom Trips
        </p>

        {/* ── H1 — SERVER RENDERED, NEVER CHANGES ──────────────────────────
            P1 keyword: "Monterey Golf Packages"
            P1 keyword: "Monterey Golf Trip"
            Speakable target. Crawled by Google + AI engines on first byte.
        ─────────────────────────────────────────────────────────────────── */}
        <h1 className="speakable-summary mt-6 font-display text-[40px] font-bold leading-[1.1] text-cream md:text-[48px]">
          Monterey Golf Packages &amp; Group Trip Planning
        </h1>

        {/* Sub-headline — static */}
        <p className="mt-4 font-body text-[17px] leading-relaxed text-[rgba(250,246,238,.7)] md:text-lg">
          Golf trip planning for individuals, recreational groups, club member getaways, and corporate meetings and golf outings
        </p>

        {/* CTAs */}
        <div className="mt-7 flex w-full max-w-[440px] flex-col gap-3">
          <Link
            href="/quote/"
            className="rounded-[9px] bg-cream px-7 py-4 text-center font-ui text-base font-bold uppercase tracking-[.05em] text-ink shadow-[0_6px_18px_rgba(0,0,0,.35)] transition-transform hover:-translate-y-0.5"
          >
            Plan my trip
          </Link>
          <Link
            href="/itineraries/"
            className="rounded-[9px] border-[1.5px] border-cream/70 bg-[rgba(22,36,44,.35)] px-7 py-3.5 text-center font-ui text-[15px] font-semibold text-cream backdrop-blur-[2px] transition-transform hover:-translate-y-0.5 hover:border-gold"
          >
            See sample Monterey golf itineraries &rsaquo;
          </Link>
        </div>
      </div>

      {/* Intelligence strip */}
      <div className="relative z-10 mx-4 grid max-w-[980px] grid-cols-2 gap-x-0 border-t border-cream/[.15] md:mx-auto md:grid-cols-4">

        {/* Cell 1: Live weather */}
        <div className="flex flex-col gap-1.5 px-0 py-7 md:px-6 md:first:pl-0">
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
        <div className="flex flex-col gap-1.5 border-l border-cream/[.1] px-4 py-7 md:px-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="font-ui text-[10px] font-bold uppercase tracking-[.08em] text-cream/40">Fog &amp; conditions</span>
          </div>
          {weather ? (
            <>
              <p className="font-display text-[15px] font-semibold leading-snug text-cream">
                Marine layer <span className="text-gold">{weather.fog.clearTime}</span>
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
        <div className="flex flex-col gap-1.5 border-l border-cream/[.1] px-4 py-7 md:px-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            <span className="font-ui text-[10px] font-bold uppercase tracking-[.08em] text-cream/40">Booking window</span>
          </div>
          <p className="font-display text-[15px] font-semibold leading-snug text-cream">
            Book <span className="text-gold">{intel.booking}</span>
          </p>
          <p className="font-body text-[11px] leading-snug text-cream/40">{intel.bookingNote}</p>
        </div>

        {/* Cell 4: Local intel */}
        <div className="flex flex-col gap-1.5 border-l border-cream/[.1] px-4 py-7 md:px-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-ui text-[10px] font-bold uppercase tracking-[.08em] text-cream/40">Local intel</span>
          </div>
          <p className="font-display text-[15px] font-semibold leading-snug text-cream">{intel.event}</p>
          <p className="font-body text-[11px] leading-snug text-cream/40">{intel.eventNote}</p>
        </div>

      </div>
    </section>
  );
}
