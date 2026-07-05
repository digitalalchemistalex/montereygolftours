import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ITINERARIES } from "@/lib/itineraries";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Golf Trip Packages | Monterey Golf Tours",
  description:
    "Monterey Peninsula golf trip packages, priced from real course and lodging rates — 3 to 7 days, every length customizable to your group.",
  alternates: {
    canonical: `https://${SITE.domain}/packages/`,
  },
};

export default function PackagesPage() {
  const trips = Object.values(ITINERARIES).sort((a, b) => a.durationDays - b.durationDays);

  const canonicalUrl = `https://${SITE.domain}/packages/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Golf Trip Packages",
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

      <section className="relative flex min-h-[380px] flex-col justify-end overflow-hidden bg-[#16242c] px-6 pb-10 md:min-h-[520px] md:px-14 md:pb-12">
        <Image
          src="https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=2400&q=90"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,20,28,.2) 0%, rgba(20,20,28,.7) 100%)" }}
        />
        <Header />
        <div className="relative z-10 pt-40 md:pt-60">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]">
            Golf trip packages
          </h1>
          <p className="mt-3 max-w-[640px] font-body text-base leading-relaxed text-[rgba(250,246,238,.92)] md:text-lg">
            Every package below is built from real course and lodging rates &mdash; 3 to 7
            days, every length customizable to your group.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <section className="px-6 py-10 md:px-14 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((t) => (
              <Link
                key={t.slug}
                href={`/itineraries/${t.slug}/`}
                className="group relative flex aspect-square flex-col justify-end overflow-hidden transition-all duration-200 hover:z-10 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(0,0,0,.35)]"
              >
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw"
                />
                <div
                  className="absolute inset-0 transition-colors duration-200 group-hover:bg-[rgba(232,160,168,.12)]"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,21,18,.92) 0%, rgba(15,21,18,.55) 45%, rgba(15,21,18,.1) 100%)",
                  }}
                />
                <div className="absolute inset-0 border-2 border-transparent transition-colors duration-200 group-hover:border-gold" />
                <div className="relative z-10 p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-ui text-[11px] font-bold uppercase tracking-[.08em] text-[rgba(250,246,238,.85)]">
                      {t.durationDays} days &middot; {t.rounds}
                    </span>
                    {t.mostBooked && (
                      <span className="rounded-full bg-gold px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-[.05em] text-ink">
                        Most booked
                      </span>
                    )}
                  </div>
                  <div className="mt-2 font-display text-lg font-bold leading-tight text-cream md:text-xl">{t.title}</div>
                  <p className="mt-1.5 line-clamp-2 font-body text-[13px] leading-relaxed text-[rgba(250,246,238,.85)]">
                    {t.target}
                  </p>
                  <div className="mt-3 font-display text-base font-bold text-[#e8b8be] md:text-lg">
                    from ${t.priceFrom.toLocaleString()}
                    <span className="font-ui text-xs font-normal text-[rgba(250,246,238,.7)] md:text-sm">
                      /person
                    </span>
                    {!t.priceVerified && (
                      <span className="ml-1 font-ui text-[10px] font-normal italic text-[rgba(250,246,238,.7)]">
                        (est.)
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-[#e3ddcf] bg-[#f4f0e7] px-6 py-12 text-center md:px-14 md:py-14">
          <h2 className="font-display text-2xl font-bold text-ink md:text-[32px]">
            Want something custom?
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] font-body text-[15px] text-[#5a564e]">
            Every package here is a starting point &mdash; tell us your group and
            we&apos;ll build the right courses, lodging, and length around it.
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
