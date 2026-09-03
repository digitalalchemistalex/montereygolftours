import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Custom Golf Trip Quote | Monterey Golf Tours",
  description:
    "Tell us your group size, dates, and budget, and we'll put together a custom Monterey Peninsula golf trip quote within 24 hours.",
  alternates: {
    canonical: `https://${SITE.domain}/quote/`,
  },
};

export default function QuotePage() {
  const canonicalUrl = `https://${SITE.domain}/quote/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Get a Custom Golf Trip Quote | Monterey Golf Tours",
        description: "Tell us your group size, dates, and budget, and we'll put together a custom Monterey Peninsula golf trip quote within 24 hours.",
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1"] },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "Get a Quote", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative flex min-h-[420px] flex-col justify-end bg-[#16242c] px-6 pb-10 md:min-h-[520px] md:px-14 md:pb-12">
        <Image src="/images/pbc-portal/spyglass_7_2016_ground_green.jpg" alt="" fill priority className="object-cover" style={{ objectPosition: "center 70%" }} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(15,25,20,.18) 0%, rgba(15,25,20,.6) 100%)" }}
        />
        <Header />
        <div className="relative z-10 pt-44 md:pt-32">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]" style={{ textShadow: "0 2px 12px rgba(0,0,0,.4)" }}>
            Get a custom golf trip quote
          </h1>
          <p className="mt-3 max-w-[600px] rounded-lg bg-[rgba(255,255,255,.5)] px-3 py-1.5 font-body text-base leading-relaxed text-[#1e2820] backdrop-blur-sm md:text-lg">
            Tell us about your group and we&apos;ll put together a trip — courses, lodging,
            and a price range — within 24 hours.
          </p>
        </div>
      </section>

      <main className="flex-1 px-6 py-12 md:px-14 md:py-16">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="mb-8 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-[#e3ddcf] bg-white px-3 py-4">
                <div className="font-display text-2xl font-bold text-ocean-dark">24hr</div>
                <div className="mt-1 font-ui text-[11px] uppercase tracking-[.05em] text-[#8a857a]">Response time</div>
              </div>
              <div className="rounded-xl border border-[#e3ddcf] bg-white px-3 py-4">
                <div className="font-display text-2xl font-bold text-ocean-dark">2&ndash;300</div>
                <div className="mt-1 font-ui text-[11px] uppercase tracking-[.05em] text-[#8a857a]">Group sizes welcome</div>
              </div>
              <div className="rounded-xl border border-[#e3ddcf] bg-white px-3 py-4">
                <div className="font-display text-2xl font-bold text-ocean-dark">$0</div>
                <div className="mt-1 font-ui text-[11px] uppercase tracking-[.05em] text-[#8a857a]">Obligation to quote</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <Suspense fallback={<div className="h-[600px]" />}>
              <QuoteForm />
            </Suspense>
          </Reveal>

          <p className="mt-6 text-center font-body text-[13px] text-[#8a857a]">
            Prefer to talk it through? Call us at{" "}
            <a href={SITE.phoneHref} className="text-ocean">
              {SITE.phone}
            </a>
            .
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
