import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HOTEL_DETAILS } from "@/lib/hotel-details";
import { HOTELS } from "@/lib/hotels";
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

  const title = `${hotel.name} — Monterey Golf Trip Lodging | Monterey Golf Tours`;
  const description = `${hotel.name} in ${hotel.city} — ${hotel.rooms}. ${hotel.hook} Plan your Monterey golf trip with Monterey Golf Tours.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${SITE.domain}/hotels/${hotel.slug}/`,
    },
  };
}

const TIER_LABEL: Record<number, string> = {
  1: "Golf-anchor",
  2: "Premium city base",
  3: "Boutique",
};

export default async function HotelPage({ params }: Props) {
  const { slug } = await params;
  const hotel = HOTEL_DETAILS[slug];

  if (!hotel) {
    return (
      <>
        <Header />
        <main className="flex-1 px-6 py-32 text-center">
          <p className="font-body text-lg text-ink">Hotel not found.</p>
          <Link href="/hotels/" className="mt-4 inline-block font-ui text-ocean">
            View all hotels &rarr;
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const canonicalUrl = `https://${SITE.domain}/hotels/${hotel.slug}/`;
  const hotelImage = HOTELS.find((h) => h.slug === hotel.slug)?.image;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${hotel.name} — Monterey Golf Trip Lodging | Monterey Golf Tours`,
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
      },
      {
        "@type": "Hotel",
        "@id": `${canonicalUrl}#hotel`,
        name: hotel.name,
        description: hotel.hook,
        address: {
          "@type": "PostalAddress",
          streetAddress: hotel.address,
          addressLocality: hotel.city.split(",")[0].trim(),
          addressRegion: "CA",
        },
        telephone: hotel.phone === "Contact hotel directly" ? undefined : hotel.phone,
        url: canonicalUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: hotel.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "Hotels", item: `https://${SITE.domain}/hotels/` },
          { "@type": "ListItem", position: 3, name: hotel.name, item: canonicalUrl },
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

      <section className="relative flex min-h-[400px] flex-col overflow-hidden bg-[#16242c] md:min-h-[480px]">
        {hotelImage && (
          <Image src={hotelImage} alt={hotel.name} fill priority className="object-cover" />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.35) 0%, rgba(22,36,44,.78) 100%)" }}
        />
        <Header />
        <div className="relative z-10 mt-auto px-6 pb-10 md:px-14 md:pb-12">
          <span className="inline-block rounded-full bg-gold px-3 py-1 font-ui text-[11px] font-bold uppercase tracking-[.06em] text-ink">
            {TIER_LABEL[hotel.tier]}
          </span>
          <h1 className="mt-3 font-display text-[36px] font-bold leading-[1.1] text-cream md:text-[52px]">
            {hotel.name}
          </h1>
          <p className="mt-3 max-w-[600px] font-body text-base leading-relaxed text-[rgba(250,246,238,.85)] md:text-lg">
            {hotel.hook}
          </p>
        </div>
      </section>

      <main className="flex-1">
        <section className="border-b border-[#e3ddcf] px-6 py-6 md:px-14">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <FactBox label="Rooms" value={hotel.rooms} />
            <FactBox label="City" value={hotel.city} />
            <FactBox label="On-site golf" value={hotel.onSiteGolf ?? "None"} />
            <FactBox label="Airport" value={hotel.airportDistance} />
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-10 md:px-14 md:py-12">
          <div className="max-w-[760px] space-y-4">
            {hotel.description.map((p, i) => (
              <p key={i} className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-10 md:px-14 md:py-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
            Amenities
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hotel.amenities.map((a) => (
              <div
                key={a}
                className="rounded-lg border border-[#e3ddcf] bg-white px-4 py-3 font-body text-[14px] text-[#4a463f]"
              >
                {a}
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-10 md:px-14 md:py-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink md:text-[32px]">
            Why groups choose this hotel
          </h2>
          <p className="max-w-[700px] font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
            {hotel.positioning}
          </p>
        </section>

        <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-10 md:px-14 md:py-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
            Practical info
          </h2>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PracticalItem label="Address" value={hotel.address} />
            <PracticalItem label="Phone" value={hotel.phone} />
            <PracticalItem label="Website" value={hotel.website} />
            <PracticalItem label="Brand" value={hotel.brand} />
          </dl>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-10 md:px-14 md:py-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
            Common questions
          </h2>
          <div className="max-w-[800px] divide-y divide-[#e4e0d6] border-t border-[#e4e0d6]">
            {hotel.faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-ink">
                  {f.q}
                  <span className="font-ui text-xl text-gold group-open:hidden">+</span>
                  <span className="hidden font-ui text-xl text-gold group-open:inline">&minus;</span>
                </summary>
                <p className="mt-3 max-w-[700px] font-body text-[15px] leading-relaxed text-[#5a564e]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="px-6 py-12 text-center md:px-14 md:py-14">
          <h2 className="font-display text-2xl font-bold text-ink md:text-[32px]">
            Pair {hotel.name} with a planned golf trip
          </h2>
          <Link
            href="/quote/"
            className="mt-6 inline-block rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream hover:bg-ocean-dark"
          >
            Get a custom quote &rarr;
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

function FactBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#e3ddcf] bg-white p-4 text-center">
      <div className="font-ui text-[11px] font-semibold uppercase tracking-[.06em] text-[#8a857a]">
        {label}
      </div>
      <div className="mt-1 font-display text-base font-bold leading-snug text-ink">{value}</div>
    </div>
  );
}

function PracticalItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-ui text-[11px] font-semibold uppercase tracking-[.06em] text-[#8a857a]">
        {label}
      </dt>
      <dd className="mt-1 font-body text-[15px] text-ink">{value}</dd>
    </div>
  );
}
