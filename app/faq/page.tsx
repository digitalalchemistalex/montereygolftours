import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ, { FAQ_CATEGORIES } from "@/components/FAQ";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Monterey Golf Trip FAQ — Pebble Beach, Courses & Planning",
  description:
    "Common questions about planning a Monterey Peninsula golf trip — group sizes, Pebble Beach Resorts® access, best timing, and how the quote process works.",
  alternates: {
    canonical: `https://${SITE.domain}/faq/`,
  },
  openGraph: {
    title: "Monterey Golf Trip FAQ — Pebble Beach, Courses & Planning",
    description:
      "Common questions about planning a Monterey Peninsula golf trip — group sizes, Pebble Beach Resorts® access, best timing, and how the quote process works.",
    url: `https://${SITE.domain}/faq/`,
    siteName: "Monterey Golf Tours",
    images: [
      {
        url: `https://${SITE.domain}/images/pbc-portal/spyglass_7_2016_ground_green.jpg`,
        width: 1200,
        height: 630,
        alt: "Spyglass Hill Golf Course fairway on the Monterey Peninsula",
      },
    ],
    type: "website",
    locale: "en_US",
  },
};

export default function FAQPage() {
  const canonicalUrl = `https://${SITE.domain}/faq/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".faq-answer"],
        },
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Monterey Golf Trip FAQ — Pebble Beach, Courses & Planning Questions",
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

      <section className="relative flex min-h-[420px] flex-col justify-end bg-[#16242c] px-6 pb-6 md:min-h-[520px] md:px-14 md:pb-8">
        <Image
          src="/images/pbc-portal/spyglass_7_2016_ground_green.jpg"
          alt="Spyglass Hill Golf Course fairway on the Monterey Peninsula"
          fill priority className="object-cover" style={{ objectPosition: "center 60%" }} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(15,25,35,.32) 0%, rgba(15,25,35,0) 38%, rgba(20,40,20,.15) 100%)" }}
        />
        <Header />
        <div className="relative z-10 pt-44 md:pt-32">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]" style={{ textShadow: "0 2px 12px rgba(0,0,0,.5)" }}>
            Frequently asked questions
          </h1>
          <p className="speakable-intro mt-3 max-w-[560px] font-body text-[15px] leading-relaxed text-cream/80">
            Common questions about planning a Monterey Peninsula golf trip — group sizes, Pebble Beach Resorts® access, timing, and how the quote process works.
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
