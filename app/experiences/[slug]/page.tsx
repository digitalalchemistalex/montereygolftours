import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TabbedGallery from "@/components/TabbedGallery";
import { EXPERIENCES, EXPERIENCE_SLUGS } from "@/lib/experiences";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return EXPERIENCE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exp = EXPERIENCES[slug];
  if (!exp) return {};
  return {
    title: `${exp.name} at Pebble Beach | Monterey Golf Tours`,
    description: exp.hook,
    alternates: { canonical: `https://${SITE.domain}/experiences/${slug}/` },
    openGraph: {
      title: `${exp.name} at Pebble Beach | Monterey Golf Tours`,
      description: exp.hook,
      url: `https://${SITE.domain}/experiences/${slug}/`,
      siteName: "Monterey Golf Tours",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${exp.name} at Pebble Beach | Monterey Golf Tours` },
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const exp = EXPERIENCES[slug];

  if (!exp) {
    return (
      <>
        <Header />
        <main className="flex-1 px-6 py-32 text-center">
          <p className="font-body text-lg text-ink">Experience not found.</p>
          <Link href="/experiences/" className="mt-4 inline-block font-ui text-ocean">
            View all experiences \u2192
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const canonicalUrl = `https://${SITE.domain}/experiences/${slug}/`;
  const heroImg = exp.images[0];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${exp.name} | Monterey Golf Tours`,
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
        publisher: { "@id": `https://${SITE.domain}/#organization` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "#speakable-summary", ".faq-section"],
        },
      },
      {
        "@type": "TouristAttraction",
        "@id": `${canonicalUrl}#attraction`,
        name: exp.name,
        description: exp.hook,
        address: {
          "@type": "PostalAddress",
          streetAddress: exp.schema.address.split(",")[0],
          addressLocality: "Pebble Beach",
          addressRegion: "CA",
          addressCountry: "US",
        },
        url: canonicalUrl,
        ...(heroImg ? {
          image: {
            "@type": "ImageObject",
            url: `https://${SITE.domain}${heroImg.src}`,
            name: heroImg.caption,
            caption: heroImg.caption,
            creditText: heroImg.credit,
            copyrightNotice: "\u00a9 Pebble Beach Company",
            creator: { "@type": "Person", name: heroImg.photographer },
          },
        } : {}),
      },
      {
        "@type": ["Service", "Product"],
        "@id": `${canonicalUrl}#service`,
        name: `${exp.name} \u2014 Monterey Golf Tours`,
        description: exp.hook,
        provider: { "@id": `https://${SITE.domain}/#organization` },
        brand: { "@id": `https://${SITE.domain}/#organization` },
        category: "Golf Trip Experience",
        areaServed: { "@type": "Place", name: "Pebble Beach, CA" },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `https://${SITE.domain}/quote/`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: exp.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "Experiences", item: `https://${SITE.domain}/experiences/` },
          { "@type": "ListItem", position: 3, name: exp.name, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />

      <main className="flex-1 bg-fairwaycream">
        {/* Hero */}
        <section className="border-b border-[#e3ddcf] bg-white px-6 py-14 md:px-14 md:py-16">
          <nav className="mb-6 font-ui text-[12px] text-[#8a8a6e]">
            <Link href="/experiences/" className="hover:text-ink">Experiences</Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{exp.name}</span>
          </nav>
          <h1 className="font-display text-[32px] font-bold leading-tight text-ink md:text-[44px]">
            {exp.name}
          </h1>
          <p className="mt-3 font-ui text-[15px] font-semibold text-[#8a8a6e]">{exp.headline}</p>
          <p id="speakable-summary" className="mt-4 max-w-[700px] font-body text-[15px] leading-relaxed text-[#5a564e]">
            {exp.hook}
          </p>
        </section>

        {/* Description */}
        <section className="border-b border-[#e3ddcf] bg-white px-6 py-14 md:px-14 md:py-16">
          <div className="max-w-[800px] space-y-4">
            {exp.description.map((p, i) => (
              <p key={i} className="font-body text-[15px] leading-relaxed text-[#3a3f2e]">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* Gallery */}
        {exp.images.length > 0 && (
          <section className="border-b border-[#e3ddcf] bg-white px-6 py-14 md:px-14 md:py-16">
            <h2 className="mb-8 font-display text-2xl font-bold text-ink">Photos</h2>
            <TabbedGallery images={exp.images} entityName={exp.name} />
          </section>
        )}

        {/* FAQ */}
        <section className="border-b border-[#e3ddcf] bg-white px-6 py-14 md:px-14 md:py-16 faq-section">
          <h2 className="mb-8 font-display text-2xl font-bold text-ink">Common questions</h2>
          <div className="max-w-[800px] divide-y divide-[#e3ddcf] border-t border-[#e3ddcf]">
            {exp.faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-ui text-base font-semibold text-ink">
                  {f.q}
                  <span className="font-display text-xl text-fairway group-open:hidden">+</span>
                  <span className="hidden font-display text-xl text-fairway group-open:inline">&minus;</span>
                </summary>
                <p className="mt-3 max-w-[700px] font-body text-[15px] leading-relaxed text-[#4a4f3c]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-16 text-center md:px-14 md:py-20">
          <h2 className="font-display text-2xl font-bold text-ink">
            Add {exp.name} to your Monterey trip
          </h2>
          <p className="mt-3 mx-auto max-w-[500px] font-body text-[14px] leading-relaxed text-[#5a564e]">
            Monterey Golf Tours builds custom itineraries that include golf, accommodation, and experiences.
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
