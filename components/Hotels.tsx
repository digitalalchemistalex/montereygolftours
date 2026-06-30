import Link from "next/link";
import Image from "next/image";
import { HOTELS } from "@/lib/hotels";

const FEATURED_SLUGS = ["hyatt-regency-monterey", "carmel-valley-ranch", "quail-lodge"];

export default function Hotels() {
  const featured = FEATURED_SLUGS.map((slug) => HOTELS.find((h) => h.slug === slug)!);

  return (
    <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-12 md:px-14 md:py-[54px]">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
            Where to stay
          </div>
          <h2 className="font-display text-3xl font-bold leading-none text-ink md:text-[40px]">
            Golf-anchor hotels
          </h2>
        </div>
        <Link
          href="/hotels/"
          className="hidden whitespace-nowrap font-ui text-[15px] font-semibold text-ocean hover:text-ocean-dark md:inline"
        >
          View all hotels &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {featured.map((h) => (
          <Link
            key={h.slug}
            href={`/hotels/${h.slug}/`}
            className="group flex flex-col overflow-hidden rounded-xl border border-[#e3ddcf] bg-white shadow-[0_3px_11px_rgba(37,35,33,.06)] transition-transform duration-150 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(37,35,33,.12)]"
          >
            <div className="relative h-[150px] w-full overflow-hidden">
              <Image
                src={h.image}
                alt={h.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                {h.onSiteGolf && (
                  <span className="inline-block rounded-full bg-[#e7f0f3] px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-[.06em] text-ocean-dark">
                    On-site golf
                  </span>
                )}
                <div className="mt-3 font-display text-lg font-bold text-ink">{h.name}</div>
                <div className="mt-1.5 font-body text-[13px] text-[#6a665e]">{h.city}</div>
                <p className="mt-3 font-body text-[13px] leading-relaxed text-[#5a564e]">
                  {h.description}
                </p>
              </div>
              <div className="mt-4 font-ui text-sm font-semibold text-ocean">View hotel &rarr;</div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/hotels/"
        className="mt-6 block font-ui text-[15px] font-semibold text-ocean hover:text-ocean-dark md:hidden"
      >
        View all hotels &rarr;
      </Link>
    </section>
  );
}
