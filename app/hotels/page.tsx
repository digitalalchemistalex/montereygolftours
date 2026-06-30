import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HOTELS } from "@/lib/hotels";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hotels on the Monterey Peninsula | Monterey Golf Tours",
  description:
    "Browse all 9 hotels Monterey Golf Tours recommends for group golf trips — from golf-anchor resorts to boutique village properties across the Monterey Peninsula.",
  alternates: {
    canonical: `https://${SITE.domain}/hotels/`,
  },
};

const TIER_INFO: { tier: 1 | 2 | 3; label: string; blurb: string }[] = [
  {
    tier: 1,
    label: "Golf-anchor",
    blurb: "On-site course or direct guest golf access",
  },
  {
    tier: 2,
    label: "Premium city base",
    blurb: "No on-site golf, excellent Monterey location",
  },
  {
    tier: 3,
    label: "Boutique / village",
    blurb: "Smaller, character-driven properties in Carmel village or downtown Monterey",
  },
];

export default function HotelsIndexPage() {
  const canonicalUrl = `https://${SITE.domain}/hotels/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Hotels on the Monterey Peninsula",
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
      },
      {
        "@type": "ItemList",
        itemListElement: HOTELS.map((h, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://${SITE.domain}/hotels/${h.slug}/`,
          name: h.name,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "Hotels", item: canonicalUrl },
        ],
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
            Hotels on the Monterey Peninsula
          </h1>
          <p className="mt-3 max-w-[640px] font-body text-base leading-relaxed text-[rgba(250,246,238,.85)] md:text-lg">
            9 properties, from golf-anchor resorts to boutique village stays — every one
            verified and ready to pair with a planned trip.
          </p>
        </div>
      </section>

      <main className="flex-1">
        {TIER_INFO.map((tierInfo) => {
          const tierHotels = HOTELS.filter((h) => h.tier === tierInfo.tier);
          return (
            <section
              key={tierInfo.tier}
              className="border-b border-[#e3ddcf] px-6 py-10 md:px-14 md:py-12"
            >
              <div className="mb-6">
                <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
                  {tierInfo.label}
                </div>
                <p className="mt-1 font-body text-[14px] text-[#6a665e]">{tierInfo.blurb}</p>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {tierHotels.map((h) => (
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
            </section>
          );
        })}

        <section className="bg-[#f4f0e7] px-6 py-12 text-center md:px-14 md:py-14">
          <h2 className="font-display text-2xl font-bold text-ink md:text-[32px]">
            Not sure which hotel fits your group?
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] font-body text-[15px] text-[#5a564e]">
            Tell us your group size, budget, and which courses you want to play, and
            we&apos;ll recommend the right base for your trip.
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
