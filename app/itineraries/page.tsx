import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ITINERARIES } from "@/lib/itineraries";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sample Golf Trip Itineraries | Monterey Golf Tours",
  description:
    "Browse sample Monterey Peninsula golf trip itineraries, from a 3-day weekend to a 7-day ultimate trip — every one customizable to your group.",
  alternates: {
    canonical: `https://${SITE.domain}/itineraries/`,
  },
};

export default function ItinerariesIndexPage() {
  const trips = Object.values(ITINERARIES);
  const canonicalUrl = `https://${SITE.domain}/itineraries/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Sample Golf Trip Itineraries",
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
      },
      {
        "@type": "ItemList",
        itemListElement: trips.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://${SITE.domain}/itineraries/${t.slug}/`,
          name: t.title,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-[#16242c] px-6 pb-10 md:min-h-[340px] md:px-14 md:pb-12">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.4) 0%, rgba(22,36,44,.82) 100%)" }}
        />
        <Header />
        <div className="relative z-10">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]">
            Sample golf trip itineraries
          </h1>
          <p className="mt-3 max-w-[640px] font-body text-base leading-relaxed text-[rgba(250,246,238,.85)] md:text-lg">
            6 starting points, from a quick weekend to the full peninsula — every one
            customizable around your group.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <section className="px-6 py-10 md:px-14 md:py-12">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {trips.map((t) => (
              <Link
                key={t.slug}
                href={`/itineraries/${t.slug}/`}
                className="group relative flex h-[300px] flex-col justify-end overflow-hidden rounded-2xl shadow-[0_5px_18px_rgba(37,35,33,.14)] transition-transform duration-150 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(37,35,33,.26)]"
              >
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,21,18,.92) 0%, rgba(15,21,18,.55) 45%, rgba(15,21,18,.1) 100%)",
                  }}
                />
                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-2">
                    <span className="font-ui text-[11px] font-bold uppercase tracking-[.08em] text-[rgba(250,246,238,.85)]">
                      {t.durationDays} days &middot; {t.rounds}
                    </span>
                    {t.mostBooked && (
                      <span className="rounded-full bg-gold px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-[.05em] text-ink">
                        Most booked
                      </span>
                    )}
                  </div>
                  <div className="mt-2.5 font-display text-xl font-bold text-cream">{t.title}</div>
                  <p className="mt-1.5 font-body text-[14px] leading-relaxed text-[rgba(250,246,238,.85)]">
                    {t.target}
                  </p>
                  <div className="mt-3 font-display text-lg font-bold text-[#e8b8be]">
                    from ${t.priceFrom.toLocaleString()}
                    <span className="font-ui text-sm font-normal text-[rgba(250,246,238,.7)]">
                      /person
                    </span>
                    {!t.priceVerified && (
                      <span className="ml-1.5 font-ui text-[11px] font-normal italic text-[rgba(250,246,238,.7)]">
                        (estimate)
                      </span>
                    )}
                  </div>
                  <div className="mt-3 font-ui text-sm font-semibold text-[#e8b8be]">
                    View itinerary &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-[#e3ddcf] bg-[#f4f0e7] px-6 py-12 text-center md:px-14 md:py-14">
          <h2 className="font-display text-2xl font-bold text-ink md:text-[32px]">
            None of these quite fit?
          </h2>
          <p className="mx-auto mt-3 max-w-[500px] font-body text-[15px] text-[#5a564e]">
            Every itinerary is a starting point — tell us your group and we&apos;ll build
            something custom.
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
