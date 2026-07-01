import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Monterey Golf Tours",
  description:
    "Get in touch with Monterey Golf Tours to start planning your Monterey Peninsula golf trip.",
  alternates: {
    canonical: `https://${SITE.domain}/contact/`,
  },
};

export default function ContactPage() {
  const canonicalUrl = `https://${SITE.domain}/contact/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Contact Monterey Golf Tours",
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
      },
      {
        "@type": "ContactPage",
        "@id": `${canonicalUrl}#contact`,
        url: canonicalUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "Contact", item: canonicalUrl },
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

      <section className="relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-[#7EC8E8] px-6 pb-10 md:min-h-[340px] md:px-14 md:pb-12">
        <Image
          src="/art/contact-hero.svg"
          alt="Illustration of a golfer on a fairway on a sunny day"
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(15,25,35,.32) 0%, rgba(15,25,35,0) 38%, rgba(20,40,20,.15) 100%)" }}
        />
        <Header />
        <div className="relative z-10 pt-20 md:pt-0">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-ink md:text-[48px]" style={{ textShadow: "0 1px 8px rgba(255,255,255,.6)" }}>
            Get in touch
          </h1>
        </div>
      </section>

      <main className="flex-1 px-6 py-12 md:px-14 md:py-14">
        <div className="mx-auto grid max-w-[820px] grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#e3ddcf] bg-white p-6 md:p-8">
            <div className="font-display text-lg font-bold text-ink">For a custom trip quote</div>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-[#5a564e]">
              The fastest way to start planning is the quote form &mdash; tell us your
              group and we&apos;ll respond within 24 hours.
            </p>
            <Link
              href="/quote/"
              className="mt-5 inline-block rounded-[9px] bg-ocean px-6 py-3.5 font-ui text-[15px] font-semibold text-cream hover:bg-ocean-dark"
            >
              Get a custom quote &rarr;
            </Link>
          </div>

          <div className="rounded-2xl border border-[#e3ddcf] bg-[#f4f0e7] p-6 md:p-8">
            <div className="font-display text-lg font-bold text-ink">Direct contact</div>
            <dl className="mt-4 space-y-3 font-body text-[15px] text-[#4a463f]">
              <div>
                <dt className="font-ui text-[11px] font-semibold uppercase tracking-[.06em] text-[#8a857a]">
                  Phone
                </dt>
                <dd>
                  <a href={SITE.phoneHref} className="text-ocean">
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              {SITE.email && (
                <div>
                  <dt className="font-ui text-[11px] font-semibold uppercase tracking-[.06em] text-[#8a857a]">
                    Email
                  </dt>
                  <dd>
                    <a href={`mailto:${SITE.email}`} className="text-ocean">
                      {SITE.email}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="font-ui text-[11px] font-semibold uppercase tracking-[.06em] text-[#8a857a]">
                  Mailing address
                </dt>
                <dd>{SITE.address}</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
