import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EXPERIENCES } from "@/lib/experiences";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pebble Beach Experiences — Dining, Spa & 17-Mile Drive | Monterey Golf Tours",
  description: "Beyond golf \u2014 dining at Stillwater Bar & Grill, the Forbes Five-Star Spa, 17-Mile Drive\u00ae, the Golf Academy, and The Beach & Tennis Club at Pebble Beach Resorts\u00ae.",
  alternates: { canonical: `https://${SITE.domain}/experiences/` },
  openGraph: {
    title: "Pebble Beach Experiences — Dining, Spa & 17-Mile Drive | Monterey Golf Tours",
    description: "Plan your full Monterey trip — dining, spa, 17-Mile Drive\u00ae, golf instruction, and beach access at Pebble Beach Resorts\u00ae.",
    url: `https://${SITE.domain}/experiences/`,
    siteName: "Monterey Golf Tours",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Pebble Beach Experiences | Monterey Golf Tours" },
};

const canonicalUrl = `https://${SITE.domain}/experiences/`;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: "Pebble Beach Resorts\u00ae Experiences | Monterey Golf Tours",
      isPartOf: { "@id": `https://${SITE.domain}/#website` },
      publisher: { "@id": `https://${SITE.domain}/#organization` },
      description: "Beyond golf \u2014 dining, spa, 17-Mile Drive\u00ae, the Golf Academy, and The Beach & Tennis Club at Pebble Beach Resorts\u00ae.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Experiences", item: canonicalUrl },
      ],
    },
  ],
};

export default function ExperiencesIndex() {
  const experiences = Object.values(EXPERIENCES);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />

      <main className="flex-1">
        <section className="border-b border-[#e3ddcf] bg-white px-6 py-16 md:px-14 md:py-20">
          <div className="max-w-[800px]">
            <span className="font-ui text-[11px] font-bold uppercase tracking-[.1em] text-[#8a8a6e]">
              Pebble Beach Resorts\u00ae
            </span>
            <h1 className="mt-3 font-display text-[32px] font-bold leading-tight text-ink md:text-[44px]">
              Beyond the Fairways
            </h1>
            <p className="mt-4 max-w-[640px] font-body text-[15px] leading-relaxed text-[#5a564e]">
              A Monterey golf trip is more than the rounds. Dining, spa, 17-Mile Drive\u00ae, the Golf Academy,
              and The Beach & Tennis Club are all part of what makes Pebble Beach Resorts\u00ae the most
              complete golf destination in the country.
            </p>
          </div>
        </section>

        <section className="px-6 py-14 md:px-14 md:py-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp) => {
              const hero = exp.images[0];
              return (
                <Link
                  key={exp.slug}
                  href={`/experiences/${exp.slug}/`}
                  className="group overflow-hidden rounded-2xl border border-[#e3ddcf] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-[#e8e4da]">
                    <Image
                      src={hero.src}
                      alt={hero.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 font-ui text-[10px] font-semibold text-white backdrop-blur-sm">
                      {exp.images.length} photo{exp.images.length !== 1 ? "s" : ""}
                    </div>
                    {hero.credit && (
                      <div className="absolute bottom-3 right-3 rounded bg-black/50 px-1.5 py-0.5 font-ui text-[9px] text-white/75 backdrop-blur-sm">
                        {hero.credit}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="font-display text-base font-bold text-ink">{exp.name}</div>
                    <div className="mt-1 font-ui text-[12px] font-semibold text-[#8a8a6e]">{exp.headline}</div>
                    <p className="mt-2 line-clamp-2 font-body text-[13px] leading-relaxed text-[#5a564e]">
                      {exp.hook}
                    </p>
                    <div className="mt-3 font-ui text-[12px] font-semibold text-ocean">
                      Explore \u2192
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-t border-[#e3ddcf] bg-[#f9f6ef] px-6 py-12 text-center md:px-14">
          <h2 className="font-display text-xl font-bold text-ink">Plan your full Monterey trip</h2>
          <p className="mt-3 mx-auto max-w-[560px] font-body text-[14px] leading-relaxed text-[#5a564e]">
            Monterey Golf Tours coordinates golf, accommodation, dining, and experiences in one custom quote.
            Groups of 2 to 400.
          </p>
          <Link
            href="/quote/"
            className="mt-6 inline-block rounded-[9px] bg-fairway px-7 py-4 font-ui text-base font-semibold text-white hover:bg-fairway-dark"
          >
            Get a custom quote \u2192
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
