import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DESTINATIONS } from "@/lib/destinations";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Monterey Peninsula Golf Destinations | Monterey Golf Tours",
  description:
    "Explore golf by destination across the Monterey Peninsula — Monterey, Carmel, Carmel Valley, Pacific Grove, Seaside, and the Pebble Beach area.",
  alternates: {
    canonical: `https://${SITE.domain}/destinations/`,
  },
};

export default function DestinationsIndexPage() {
  const destinations = Object.values(DESTINATIONS);

  return (
    <>
      <section className="relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-[#16242c] px-6 pb-10 md:min-h-[340px] md:px-14 md:pb-12">
        <Image
          src="/art/destinations-hero.svg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,30,38,.18) 0%, rgba(10,30,38,.68) 100%)" }}
        />
        <Header />
        <div className="relative z-10">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]">
            Golf destinations on the Monterey Peninsula
          </h1>
          <p className="mt-3 max-w-[640px] font-body text-base leading-relaxed text-[rgba(250,246,238,.92)] md:text-lg">
            Six areas, each with its own character &mdash; from the warm Carmel Valley
            inland to the world-renowned Del Monte Forest.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <section className="px-6 py-10 md:px-14 md:py-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}/`}
                className="group relative flex h-[280px] flex-col justify-end overflow-hidden rounded-xl shadow-[0_5px_18px_rgba(37,35,33,.14)] transition-transform duration-150 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(37,35,33,.26)]"
              >
                <Image
                  src={d.image}
                  alt={d.name}
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
                  <div className="font-display text-xl font-bold leading-snug text-cream">
                    {d.name}
                  </div>
                  <p className="mt-2 font-body text-[13px] leading-relaxed text-[rgba(250,246,238,.85)]">
                    {d.speakable}
                  </p>
                  <div className="mt-3 font-ui text-sm font-semibold text-[#e8b8be]">
                    Explore {d.name} &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-[#e3ddcf] bg-[#f4f0e7] px-6 py-12 text-center md:px-14 md:py-14">
          <h2 className="font-display text-2xl font-bold text-ink md:text-[32px]">
            Not sure where to base your trip?
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] font-body text-[15px] text-[#5a564e]">
            Tell us your group&apos;s priorities and we&apos;ll recommend the right
            destination and course lineup.
          </p>
          <Link
            href="/quote/"
            className="mt-6 inline-block rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream hover:bg-ocean-dark"
          >
            Get a custom quote &rarr;
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
