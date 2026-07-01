import Link from "next/link";
import Image from "next/image";
import { FEATURED_ITINERARY } from "@/lib/itinerary";
import { ITINERARIES } from "@/lib/itineraries";
import Reveal from "./Reveal";

export default function Itinerary() {
  const fullTrip = ITINERARIES[FEATURED_ITINERARY.slug];

  return (
    <section className="border-b border-[#e3ddcf] bg-stone px-6 py-16 md:px-14 md:py-24">
      <Reveal>
        <div className="mb-10 flex flex-wrap items-center gap-3 md:mb-12">
          <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
            Sample itinerary
          </div>
          <span className="rounded-full bg-gold px-3 py-1 font-ui text-[11px] font-bold text-ink shadow-[0_1px_4px_rgba(0,0,0,.15)]">
            Most booked
          </span>
        </div>
      </Reveal>

      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_34px_rgba(37,35,33,.1)] md:grid md:grid-cols-[0.9fr_1.1fr]">
        {fullTrip && (
          <div className="relative h-[220px] w-full md:h-auto">
            <Image
              src={fullTrip.image}
              alt={fullTrip.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(0deg, rgba(15,21,18,.55) 0%, rgba(15,21,18,0) 55%)",
              }}
            />
            <div className="absolute left-6 top-6 font-display text-stat-lg font-extrabold leading-none text-cream" style={{ textShadow: "0 2px 16px rgba(0,0,0,.4)" }}>
              4<span className="text-2xl font-semibold align-top">-day</span>
            </div>
          </div>
        )}

        <div className="p-6 md:p-10">
          <div className="font-display text-2xl font-bold text-ink md:text-3xl">
            {FEATURED_ITINERARY.title}
          </div>

          <div className="mt-7 space-y-0">
            {FEATURED_ITINERARY.days.map((d, i) => (
              <div
                key={d.n}
                className={`flex items-start gap-4 py-3.5 ${
                  i < FEATURED_ITINERARY.days.length - 1 ? "border-b border-[#ede8da]" : ""
                }`}
              >
                <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ocean font-ui text-[13px] font-semibold text-white">
                  {d.n}
                </div>
                <div>
                  <div className="font-ui text-[15px] font-semibold text-ink">{d.label}</div>
                  <div className="mt-0.5 font-body text-[13px] leading-relaxed text-[#7a766e]">
                    {d.note}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href={`/itineraries/${FEATURED_ITINERARY.slug}/`}
            className="mt-7 inline-flex items-center font-ui text-[15px] font-semibold text-ocean hover:text-ocean-dark"
          >
            View full itinerary &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
