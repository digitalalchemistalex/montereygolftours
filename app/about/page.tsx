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

      <section className="relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-[#16242c] px-6 pb-10 md:min-h-[340px] md:px-14 md:pb-12">
        <Image
          src="/art/about-hero.svg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(35,20,15,.18) 0%, rgba(35,20,15,.65) 100%)" }}
        />
        <Header />
        <div className="relative z-10">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]">
            About Monterey Golf Tours
          </h1>
        </div>
      </section>

      <main className="flex-1 px-6 py-12 md:px-14 md:py-14">
        <div className="mx-auto max-w-[760px] space-y-8">
          <div>
            <p className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
              Monterey Golf Tours plans custom multi-day golf trips on the Monterey
              Peninsula &mdash; courses, lodging, and tee times handled end to end. We work
              with groups of any size, from a twosome to 300 players, and put together
              trips ranging from a quick weekend to a full week covering every major
              course on the peninsula.
            </p>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
              As an IAGTO-contracted travel partner with Pebble Beach Resorts&reg;, we can
              book and coordinate tee times at Pebble Beach Golf Links&reg;, Spyglass Hill
              Golf Course&reg;, The Links at Spanish Bay&reg;, Del Monte Golf Course&trade;,
              and The Hay&trade;, alongside the rest of the peninsula&apos;s courses.
            </p>
          </div>

          <div className="rounded-2xl border border-[#e3ddcf] bg-white p-6 md:p-8">
            <div className="font-display text-lg font-bold text-ink">Founder</div>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-[#4a463f]">
              Sean Schaeffer founded Monterey Golf Tours. Monterey Golf Tours is part of
              a family of golf trip planning sites operating under the same ownership,
              including{" "}
              <a
                href="https://golfthehighsierra.com"
                className="text-ocean"
                target="_blank"
                rel="noopener noreferrer"
              >
                Golf the High Sierra
              </a>
              .
            </p>
          </div>

          <div>
            <div className="font-display text-lg font-bold text-ink">What we don&apos;t do</div>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-[#4a463f]">
              We don&apos;t sell individual tee times &mdash; we plan complete trips. And
              we don&apos;t use the word &ldquo;all-inclusive&rdquo;: flights and meals
              aren&apos;t included in a package unless specifically arranged as part of
              your custom quote.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/quote/"
              className="inline-block rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream hover:bg-ocean-dark"
            >
              Get a custom quote &rarr;
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
