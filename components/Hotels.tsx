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
            className="group relative flex h-[280px] flex-col justify-end overflow-hidden rounded-xl shadow-[0_5px_18px_rgba(37,35,33,.14)] transition-transform duration-150 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(37,35,33,.26)]"
          >
            <Image
              src={h.image}
              alt={h.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,21,18,.92) 0%, rgba(15,21,18,.55) 45%, rgba(15,21,18,.1) 100%)",
              }}
            />
            <div className="relative z-10 p-5">
              {h.onSiteGolf && (
                <span className="inline-block rounded-full bg-[rgba(255,255,255,.15)] px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-[.06em] text-cream backdrop-blur-sm">
                  On-site golf
                </span>
              )}
              <div className="mt-2.5 font-display text-xl font-bold leading-snug text-cream">
                {h.name}
              </div>
              <div className="mt-1 font-body text-[13px] text-[rgba(250,246,238,.85)]">
                {h.city}
              </div>
              <p className="mt-2 font-body text-[13px] leading-relaxed text-[rgba(250,246,238,.85)]">
                {h.description}
              </p>
              <div className="mt-3 font-ui text-sm font-semibold text-[#e8b8be]">
                View hotel &rarr;
              </div>
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
