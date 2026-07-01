import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ, { FAQ_CATEGORIES } from "@/components/FAQ";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Monterey Golf Tours",
  description:
    "Common questions about planning a Monterey Peninsula golf trip — group sizes, Pebble Beach Resorts® access, timing, and how the quote process works.",
  alternates: {
    canonical: `https://${SITE.domain}/faq/`,
  },
};

export default function FAQPage() {
  const canonicalUrl = `https://${SITE.domain}/faq/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Frequently Asked Questions | Monterey Golf Tours",
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "FAQ", item: canonicalUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
          cat.items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          }))
        ),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-[#16242c] px-6 pb-6 md:min-h-[340px] md:px-14 md:pb-8">
        <Image src="/art/faq-hero.svg" alt="" fill priority className="object-cover" />
        <Header />
        <div className="relative z-10">
          <h1 className="sr-only">Frequently asked questions</h1>
          <p className="max-w-[600px] rounded-lg bg-[rgba(255,255,255,.55)] px-4 py-2 font-body text-base leading-relaxed text-[#2A2620] backdrop-blur-sm md:text-lg">
            Common questions about planning a Monterey Peninsula golf trip.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <FAQ />

        <section className="px-6 py-16 text-center md:px-14 md:py-20">
          <h2 className="text-display-md font-display font-bold text-ink">
            Still have a question?
          </h2>
          <p className="mx-auto mt-3 max-w-[440px] font-body text-[15px] text-[#5a564e]">
            Skip the FAQ and tell us about your group directly — we&apos;ll answer
            everything in your custom quote.
          </p>
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
