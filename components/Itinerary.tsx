import Link from "next/link";
import { FEATURED_ITINERARY } from "@/lib/itinerary";

export default function Itinerary() {
  return (
    <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-12 md:px-14 md:py-[54px]">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h2 className="font-display text-2xl font-bold text-ink md:text-[36px]">
          Sample itinerary
        </h2>
        <span className="rounded-full bg-gold px-3 py-1 font-ui text-[11px] font-bold text-ink shadow-[0_1px_4px_rgba(0,0,0,.15)]">
          Most booked
        </span>
      </div>

      <div className="rounded-2xl border border-[#e3ddcf] bg-white p-6 shadow-[0_5px_18px_rgba(37,35,33,.08)] md:p-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div className="font-display text-lg font-bold text-ink md:text-xl">
            {FEATURED_ITINERARY.title}
          </div>
          <Link
            href={`/itineraries/${FEATURED_ITINERARY.slug}/`}
            className="font-ui text-[15px] font-semibold text-ocean hover:text-ocean-dark"
          >
            View full itinerary &rarr;
          </Link>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {FEATURED_ITINERARY.days.map((d, i) => (
            <div
              key={d.n}
              className="relative flex flex-1 flex-col items-center text-center"
            >
              {i < FEATURED_ITINERARY.days.length - 1 && (
                <div className="absolute left-1/2 top-[17px] hidden h-[2px] w-full bg-[#e0dccf] sm:block" />
              )}
              <div className="relative z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-ocean font-ui text-[15px] font-semibold text-white shadow-[0_2px_7px_rgba(31,79,102,.3)]">
                {d.n}
              </div>
              <div className="mt-3 font-ui text-base font-semibold text-ink">{d.label}</div>
              <div className="mt-1.5 max-w-[160px] font-body text-[13px] leading-relaxed text-[#7a766e]">
                {d.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
