import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PHOTOGRAPHERS } from "@/lib/photographers";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pebble Beach Photography Credits | Monterey Golf Tours",
  description: "All Pebble Beach Resorts\u00ae images on this site are licensed via the Pebble Beach Company Leisure Travel Sales Collection. Photographer credits listed by artist.",
  alternates: { canonical: `https://${SITE.domain}/photography/` },
  openGraph: {
    title: "Pebble Beach Photography Credits | Monterey Golf Tours",
    description: "Licensed photography from the Pebble Beach Company Leisure Travel Sales Collection — photographer credits for every image.",
    url: `https://${SITE.domain}/photography/`,
    siteName: "Monterey Golf Tours",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Pebble Beach Photography Credits | Monterey Golf Tours" },
};

const canonicalUrl = `https://${SITE.domain}/photography/`;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: "Pebble Beach Photography Credits | Monterey Golf Tours",
      isPartOf: { "@id": `https://${SITE.domain}/#website` },
      publisher: { "@id": `https://${SITE.domain}/#organization` },
      description: "Licensed photography from the Pebble Beach Company Leisure Travel Sales Collection — photographer credits for every image on Monterey Golf Tours.",
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["#speakable-summary"] },
    },
    {
      "@type": "ItemList",
      name: "Licensed Photographers — Pebble Beach Resorts®",
      description: "Photographers whose work is featured on Monterey Golf Tours under license from the Pebble Beach Company.",
      itemListElement: Object.values(PHOTOGRAPHERS).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `https://${SITE.domain}/photography/${p.slug}/`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Are the Pebble Beach photos on Monterey Golf Tours officially licensed?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. All Pebble Beach Resorts\u00ae images on this site are licensed via the Pebble Beach Company Leisure Travel Sales Collection. Each image is used with explicit permission and carries the required photographer credit." },
        },
        {
          "@type": "Question",
          name: "Who are the photographers behind the Pebble Beach images?",
          acceptedAnswer: { "@type": "Answer", text: "Licensed photographers include Kevin Merfeld - PBC, Jeff Marsh, Jamie Alcala, Sherman Chu, Noah Webb, Joann Dost, Martin Miller, Randy Tunnell, Taylor Mahon, Christine Bush, and TGO. Each photographer has a dedicated credit page on this site." },
        },
        {
          "@type": "Question",
          name: "Can I use the Pebble Beach photos from this site?",
          acceptedAnswer: { "@type": "Answer", text: "No. All images are licensed exclusively for use on Monterey Golf Tours. They are the property of the Pebble Beach Company and the respective photographers. Contact the Pebble Beach Company directly for licensing inquiries." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Photography", item: canonicalUrl },
      ],
    },
  ],
};

export default function PhotographyIndex() {
  const photographers = Object.values(PHOTOGRAPHERS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />

      <main className="flex-1">
        <section className="border-b border-[#e3ddcf] bg-white px-6 py-16 md:px-14 md:py-20">
          <div className="max-w-[800px]">
            <span className="font-ui text-[11px] font-bold uppercase tracking-[.1em] text-[#8a8a6e]">
              Licensed Photography
            </span>
            <h1 className="mt-3 font-display text-[32px] font-bold leading-tight text-ink md:text-[44px]">
              Photography Credits
            </h1>
            <p className="mt-4 max-w-[640px] font-body text-[15px] leading-relaxed text-[#5a564e]">
              All Pebble Beach Resorts® images on Monterey Golf Tours are licensed via the Pebble Beach Company
              Leisure Travel Sales Collection, accessed through our IAGTO partner agreement with Pebble Beach Resorts®.
              Every image is cleared for Third Party use and credited to the photographer per Pebble Beach Company licensing terms.
            </p>
          </div>
        </section>

        <section className="px-6 py-14 md:px-14 md:py-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {photographers.map((p) => {
              const hero = p.images[0];
              return (
                <Link
                  key={p.slug}
                  href={`/photography/${p.slug}/`}
                  className="group overflow-hidden rounded-2xl border border-[#e3ddcf] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-[#e8e4da]">
                    {hero && (
                      <Image
                        src={hero.src}
                        alt={hero.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 font-ui text-[10px] font-semibold text-white backdrop-blur-sm">
                      {p.images.length} image{p.images.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-display text-base font-bold text-ink">{p.name}</div>
                    {p.worksFor && (
                      <div className="mt-0.5 font-ui text-[11px] text-[#8a8a6e]">{p.worksFor}</div>
                    )}
                    <p className="mt-2 line-clamp-2 font-body text-[13px] leading-relaxed text-[#5a564e]">
                      {p.bio.split(".")[0]}.
                    </p>
                    <div className="mt-3 font-ui text-[12px] font-semibold text-ocean">
                      View photos →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-t border-[#e3ddcf] bg-[#f9f6ef] px-6 py-10 md:px-14">
          <p className="mx-auto max-w-[800px] font-ui text-[11px] leading-relaxed text-[#8a8276] text-center">
            Pebble Beach®, Pebble Beach Golf Links®, Pebble Beach Resorts®, The Lodge at Pebble Beach™,
            The Inn at Spanish Bay™, The Links at Spanish Bay™, Spyglass Hill® Golf Course, The Spa at Pebble Beach™,
            Casa Palmero®, 17-Mile Drive®, Pebble Beach Golf Academy™ and their respective underlying distinctive images
            are trademarks, service marks and trade dress of Pebble Beach Company. Used by permission.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
