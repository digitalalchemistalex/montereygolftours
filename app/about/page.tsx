import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Monterey Golf Tours",
  description:
    "Monterey Golf Tours plans custom multi-day golf trips on the Monterey Peninsula — courses, lodging, and tee times handled end to end.",
  alternates: {
    canonical: `https://${SITE.domain}/about/`,
  },
};

const PRINCIPLES = [
  {
    n: "01",
    title: "Complete trips, not tee times",
    detail: "We don't sell single rounds — every trip is courses, lodging, and logistics planned together.",
  },
  {
    n: "02",
    title: "Never \"all-inclusive\"",
    detail: "Flights and meals aren't bundled in unless you specifically ask us to arrange them.",
  },
  {
    n: "03",
    title: "Authorized Pebble Beach access",
    detail: "As an IAGTO-contracted partner, we book Pebble Beach Resorts® courses directly.",
  },
];

export default function AboutPage() {
  const canonicalUrl = `https://${SITE.domain}/about/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "About Monterey Golf Tours",
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
      },
      {
        "@type": "AboutPage",
        "@id": `${canonicalUrl}#about`,
        url: canonicalUrl,
        about: { "@id": `https://${SITE.domain}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "About", item: canonicalUrl },
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

      <section className="relative flex min-h-[320px] flex-col justify-end overflow-hidden bg-[#16242c] md:min-h-[420px]">
        <Image src="/art/about-hero.svg" alt="Monterey Golf Tours" fill priority className="object-cover" />
        <Header />
        <div className="relative z-10 px-6 pb-8 pt-24 md:px-14 md:pb-10 md:pt-0">
          <h1 className="sr-only">About Monterey Golf Tours</h1>
        </div>
      </section>

      <main className="flex-1">
        <section className="border-b border-[#e3ddcf] px-6 py-16 md:px-14 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.6fr_1fr] md:gap-16">
            <div>
              <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
                Who we are
              </div>
              <p className="pull-quote mt-4 text-2xl leading-tight text-ink md:text-3xl">
                &ldquo;We plan the whole trip — not just the tee time.&rdquo;
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                Monterey Golf Tours plans custom multi-day golf trips on the Monterey
                Peninsula — courses, lodging, and tee times handled end to end. We work
                with groups of any size, from a twosome to 300 players, and put together
                trips ranging from a quick weekend to a full week covering every major
                course on the peninsula.
              </p>
              <p className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                As an IAGTO-contracted travel partner with Pebble Beach Resorts&reg;, we
                can book and coordinate tee times at Pebble Beach Golf Links&reg;,
                Spyglass Hill Golf Course&reg;, The Links at Spanish Bay&reg;, Del Monte
                Golf Course&reg;, and The Hay&trade;, alongside the rest of the
                peninsula&apos;s courses.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] bg-stone px-6 py-16 md:px-14 md:py-24">
          <h2 className="text-display-md mb-10 font-display font-bold text-ink md:mb-14">
            How we operate
          </h2>
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.n}>
                <div className="font-display text-3xl font-extrabold leading-none text-gold">
                  {p.n}
                </div>
                <div className="mt-3 font-ui text-lg font-semibold text-ink">{p.title}</div>
                <div className="mt-2 font-body text-[14px] leading-relaxed text-[#6a665e]">
                  {p.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-16 md:px-14 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.6fr_1fr] md:gap-16">
            <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
              Founder
            </div>
            <div>
              <p className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                Sean Schaeffer founded Monterey Golf Tours. It&apos;s part of a family of
                golf trip planning sites operating under the same ownership, including{" "}
                <a
                  href="https://golfthehighsierra.com"
                  className="text-ocean underline decoration-[rgba(44,110,142,.3)] underline-offset-2 hover:text-ocean-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Golf the High Sierra
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 text-center md:px-14 md:py-20">
          <h2 className="text-display-md font-display font-bold text-ink">
            Ready to plan your trip?
          </h2>
          <Link
            href="/quote/"
            className="mt-7 inline-block rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream transition-transform hover:-translate-y-0.5 hover:bg-ocean-dark"
          >
            Get a custom quote &rarr;
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
