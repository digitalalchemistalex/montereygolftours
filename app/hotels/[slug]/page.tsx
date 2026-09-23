import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HOTEL_DETAILS } from "@/lib/hotel-details";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(HOTEL_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hotel = HOTEL_DETAILS[slug];
  if (!hotel) return {};

  const TITLE_NAME: Record<string, string> = {
    "embassy-suites-monterey-bay-seaside": "Embassy Suites Monterey Bay",
    "monterey-beach-hotel": "Monterey Beach Hotel",
  };
  const displayName = TITLE_NAME[slug] ?? hotel.name;
  const isPBCHotel = ["lodge-at-pebble-beach","inn-at-spanish-bay","casa-palmero"].includes(slug);
  const hasOnSiteGolf = hotel.onSiteGolf !== null;
  const hotelTitle = isPBCHotel
    ? `${hotel.name} — Golf Packages & Pebble Beach Resorts® Stay`
    : hasOnSiteGolf
    ? `${displayName} — On-Site Golf & Monterey Peninsula Packages`
    : `${displayName} — Golf Group Hotel, Monterey Peninsula`;
  const hotelDesc = isPBCHotel
    ? `Stay at ${hotel.name} with Monterey Golf Tours — IAGTO-authorized Pebble Beach Resorts® tee times, group rates, and end-to-end trip planning. Custom quote in 24 hours.`
    : hasOnSiteGolf
    ? `${hotel.name} in ${hotel.city} — on-site golf, group-friendly, and bookable as part of a complete Monterey Peninsula golf package. Custom quote in 24 hours.`
    : (`${hotel.name} in ${hotel.city} — ${hotel.hook ?? ""} Book as part of a Monterey Peninsula golf trip for groups of 2–400.`).slice(0, 160);
  return {
    title: hotelTitle,
    description: hotelDesc,
    alternates: { canonical: `https://${SITE.domain}/hotels/${hotel.slug}/` },
    openGraph: {
      type: "website",
      title: hotelTitle,
      description: hotelDesc,
      url: `https://${SITE.domain}/hotels/${hotel.slug}/`,
      siteName: "Monterey Golf Tours",
    },
    twitter: { card: "summary_large_image", title: hotelTitle, description: hotelDesc },
  };
}

export default async function HotelPage({ params }: Props) {
  const { slug } = await params;
  const hotel = HOTEL_DETAILS[slug];

  if (!hotel) {
    return (
      <>
        <Header />
        <main className="flex-1 px-6 py-32 text-center">
          <p className="font-body text-lg text-ink">Page not found.</p>
          <Link href="/" className="mt-4 inline-block font-ui text-ocean">
            Return home &rarr;
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const RESORT_SLUGS = [
    "lodge-at-pebble-beach",
    "inn-at-spanish-bay",
    "casa-palmero",
    "carmel-valley-ranch-hotel",
    "quail-lodge-hotel",
    "bernardus-lodge",
  ];
  const hotelType = RESORT_SLUGS.includes(slug) ? ["Hotel", "Resort"] : "Hotel";
  const canonicalUrl = `https://${SITE.domain}/hotels/${hotel.slug}/`;
  const heroImage = hotel.gallery?.[0]?.src
    ? hotel.gallery[0].src.startsWith("/")
      ? `https://${SITE.domain}${hotel.gallery[0].src}`
      : hotel.gallery[0].src
    : `https://${SITE.domain}/og-image.jpg`;

  const hotelSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": hotelType,
        "@id": `${canonicalUrl}#hotel`,
        name: hotel.name,
        description: hotel.hook,
        address: {
          "@type": "PostalAddress",
          streetAddress: hotel.address,
          addressLocality: hotel.city.split(",")[0],
          addressRegion: "CA",
          addressCountry: "US",
        },
        telephone: hotel.phone,
        url: `https://${hotel.website}`,
        image: { "@type": "ImageObject", url: heroImage, width: 1200, height: 630 },
        numberOfRooms: hotel.rooms,
        amenityFeature: hotel.amenities.map((a) => ({
          "@type": "LocationFeatureSpecification",
          name: a,
          value: true,
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: hotel.name,
        description: hotel.hook?.slice(0, 155),
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
        publisher: { "@id": `https://${SITE.domain}/#organization` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "#speakable-summary", ".faq-answer"],
        },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "Hotels", item: `https://${SITE.domain}/hotels/` },
          { "@type": "ListItem", position: 3, name: hotel.name, item: canonicalUrl },
        ],
      },
      ...(hotel.faqs?.length > 0 ? [{
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: hotel.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }] : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
      />
      <Header />
      <main className="flex-1">
        <section className="relative h-[480px] bg-navy">
          {hotel.gallery?.[0] && (
            <Image
              src={hotel.gallery[0].src}
              alt={hotel.gallery[0].alt ?? hotel.name}
              fill
              className="object-cover opacity-60"
              priority
            />
          )}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <p className="font-ui text-sm uppercase tracking-widest text-gold mb-2">
              {hotel.city}
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-white">{hotel.name}</h1>
            <p id="speakable-summary" className="speakable-summary mt-4 max-w-2xl font-body text-lg text-white/90">
              {hotel.hook}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="space-y-4">
            {hotel.description.map((para, i) => (
              <p key={i} className="font-body text-base text-ink leading-relaxed">{para}</p>
            ))}
          </div>

          {hotel.amenities?.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl text-navy mb-4">Amenities</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {hotel.amenities.map((a, i) => (
                  <li key={i} className="font-body text-sm text-ink flex items-start gap-2">
                    <span className="mt-1 text-gold">✓</span>{a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hotel.driveTimeToCourses?.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl text-navy mb-4">Drive Time to Courses</h2>
              <ul className="space-y-2">
                {hotel.driveTimeToCourses.map((d, i) => (
                  <li key={i} className="font-body text-sm text-ink flex justify-between border-b border-sand pb-2">
                    <span>{d.course}</span>
                    <span className="text-ocean font-medium">{d.minutes} min</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hotel.faqs?.length > 0 && (
            <div className="mt-16 faq-section">
              <h2 className="font-display text-2xl text-navy mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {hotel.faqs.map((faq, i) => (
                  <details key={i} className="border-b border-sand pb-4">
                    <summary className="cursor-pointer font-ui text-base font-medium text-navy">
                      {faq.q}
                    </summary>
                    <p className="faq-answer mt-2 font-body text-sm text-ink leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 rounded-lg bg-navy p-8 text-center">
            <h2 className="font-display text-2xl text-white mb-2">
              Include {hotel.name} in your Monterey golf trip
            </h2>
            <p className="font-body text-white/80 mb-6">
              Monterey Golf Tours pairs lodging with tee times across the peninsula.
              Get a custom quote for your group.
            </p>
            <Link
              href="/quote/"
              className="inline-block bg-gold text-navy font-ui font-semibold px-8 py-3 rounded hover:bg-gold/90 transition"
            >
              Get a Custom Quote →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
