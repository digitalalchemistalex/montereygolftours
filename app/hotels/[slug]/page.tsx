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

      <section className="relative flex min-h-[440px] flex-col overflow-hidden bg-[#16242c] md:min-h-[560px]">
        {hotelImage && (
          <Image src={hotelImage} alt={hotel.name} fill priority className="object-cover" />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.15) 0%, rgba(22,36,44,.7) 100%)" }}
        />
        <Header />
        <div className="relative z-10 mt-auto px-6 pb-10 pt-24 md:px-14 md:pb-14 md:pt-0">
          <span className="inline-block rounded-full bg-gold px-3 py-1 font-ui text-[11px] font-bold uppercase tracking-[.06em] text-ink">
            {TIER_LABEL[hotel.tier]}
          </span>
          <h1 className="text-display-lg mt-4 font-display font-extrabold text-cream" style={{ textShadow: "0 2px 24px rgba(0,0,0,.35)" }}>
            {hotel.name}
          </h1>
          <p className="mt-3 max-w-[600px] font-body text-base leading-relaxed text-[rgba(250,246,238,.9)] md:text-lg">
            {hotel.hook}
          </p>
        </div>
      </section>

      <main className="flex-1">
        <section className="border-b border-[#e3ddcf] px-6 py-8 md:px-14 md:py-10">
          <div className="flex flex-wrap gap-x-10 gap-y-6 md:gap-x-14">
            <div>
              <div className="font-display text-4xl font-extrabold leading-none text-ocean-dark md:text-5xl">
                {hotel.rooms.split(" ")[0]}
              </div>
              <div className="mt-1.5 font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a857a]">
                Rooms
              </div>
            </div>
            <div className="min-w-[140px]">
              <div className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a857a]">
                City
              </div>
              <div className="mt-1.5 font-display text-lg font-bold text-ink">{hotel.city}</div>
            </div>
            <div className="min-w-[160px]">
              <div className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a857a]">
                On-site golf
              </div>
              <div className="mt-1.5 font-display text-lg font-bold text-ink">{hotel.onSiteGolf ?? "None"}</div>
            </div>
            <div className="min-w-[140px]">
              <div className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a857a]">
                Airport
              </div>
              <div className="mt-1.5 font-display text-lg font-bold text-ink">{hotel.airportDistance}</div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-14 md:px-14 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.55fr_1fr] md:gap-16">
            <div>
              <p className="pull-quote text-2xl leading-tight text-ink md:text-3xl">
                &ldquo;{hotel.positioning.split(".")[0]}.&rdquo;
              </p>
              <div className="mt-6 font-ui text-sm font-semibold uppercase tracking-[.06em] text-ocean-dark">
                {hotel.brand}
              </div>
            </div>
            <div className="space-y-4">
              {hotel.description.map((p, i) => (
                <p key={i} className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] bg-stone px-6 py-14 md:px-14 md:py-20">
          <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
            Amenities
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {hotel.amenities.map((a) => (
              <div key={a} className="flex items-baseline gap-2.5 border-b border-[#ddd6c2] py-2.5 font-body text-[14px] text-[#4a463f]">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                {a}
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-10 md:px-14 md:py-14">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <PracticalItem label="Address" value={hotel.address} />
            <PracticalItem label="Phone" value={hotel.phone} />
            <PracticalItem label="Website" value={hotel.website} />
            <PracticalItem label="Brand" value={hotel.brand} />
          </dl>
        </section>

        <section className="border-b border-[#e3ddcf] bg-stone px-6 py-14 md:px-14 md:py-20">
          <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
            Common questions
          </h2>
          <div className="max-w-[800px] divide-y divide-[#ddd6c2] border-t border-[#ddd6c2]">
            {hotel.faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-ui text-base font-semibold text-ink">
                  {f.q}
                  <span className="font-display text-xl text-gold group-open:hidden">+</span>
                  <span className="hidden font-display text-xl text-gold group-open:inline">&minus;</span>
                </summary>
                <p className="mt-3 max-w-[700px] font-body text-[15px] leading-relaxed text-[#5a564e]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="px-6 py-16 text-center md:px-14 md:py-20">
          <h2 className="text-display-md font-display font-bold text-ink">
            Pair {hotel.name} with a planned golf trip
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

function PracticalItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-ui text-[11px] font-semibold uppercase tracking-[.06em] text-[#8a857a]">
        {label}
      </dt>
      <dd className="mt-1.5 font-body text-[15px] text-ink">{value}</dd>
    </div>
  );
}
