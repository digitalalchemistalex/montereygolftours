import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HotelGalleryLightbox from "@/components/HotelGalleryLightbox";
import { HOTEL_DETAILS } from "@/lib/hotel-details";
import { HOTELS } from "@/lib/hotels";
import { COURSES } from "@/lib/courses";
import { ITINERARIES } from "@/lib/itineraries";
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

  const nearbyCity = hotel?.city?.split(",")[0].trim() ?? "";
  const nearbyCourses = hotel ? COURSES
    .filter(c => c.city.includes(nearbyCity) || c.city.includes("Monterey") || c.city.includes("Carmel") || c.city.includes("Seaside"))
    .filter(c => c.slug !== "links-at-spanish-bay")
    .slice(0, 3) : [];
  const allTrips = Object.values(ITINERARIES);
  const crossSellTrips = hotel ? [
    ...allTrips.filter(t => t.hotelSlugs?.includes(hotel.slug)),
    ...allTrips.filter(t => !t.hotelSlugs?.includes(hotel.slug)),
  ].slice(0, 2) : [];

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
  const sortedDriveTimes = [...hotel.driveTimeToCourses].sort((a, b) => a.minutes - b.minutes);

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

      <section className="relative flex min-h-[480px] flex-col bg-[#16242c] md:min-h-[600px]">
        {hotelImage && (
          <Image src={hotelImage} alt={hotel.name} fill priority className="object-cover" />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.15) 0%, rgba(22,36,44,.7) 100%)" }}
        />
        <Header />
        <div className="relative z-10 mt-auto px-6 pb-10 pt-48 md:px-14 md:pb-14 md:pt-36">
          <span className="inline-block rounded-full bg-terracotta px-3 py-1 font-ui text-[11px] font-bold uppercase tracking-[.06em] text-white">
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

      <main className="flex-1 bg-warmcream">
        <section className="border-b border-warmborder px-6 py-8 md:px-14 md:py-10">
          <div className="flex flex-wrap gap-x-10 gap-y-6 md:gap-x-14">
            <div>
              <div className="font-display text-4xl font-extrabold leading-none text-terracotta-dark md:text-5xl">
                {hotel.rooms.split(" ")[0]}
              </div>
              <div className="mt-1.5 font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#9c8570]">
                Rooms
              </div>
            </div>
            <div className="min-w-[140px]">
              <div className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#9c8570]">
                City
              </div>
              <div className="mt-1.5 font-display text-lg font-bold text-ink">{hotel.city}</div>
            </div>
            <div className="min-w-[160px]">
              <div className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#9c8570]">
                On-site golf
              </div>
              <div className="mt-1.5 font-display text-lg font-bold text-ink">{hotel.onSiteGolf ?? "None"}</div>
            </div>
            <div className="min-w-[140px]">
              <div className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#9c8570]">
                Airport
              </div>
              <div className="mt-1.5 font-display text-lg font-bold text-ink">{hotel.airportDistance}</div>
            </div>
          </div>
        </section>

        <section className="border-b border-warmborder px-6 py-14 md:px-14 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.55fr_1fr] md:gap-16">
            <div>
              <p className="pull-quote text-2xl leading-tight text-ink md:text-3xl">
                &ldquo;{hotel.positioning.split(".")[0]}.&rdquo;
              </p>
              <div className="mt-6 font-ui text-sm font-semibold uppercase tracking-[.06em] text-terracotta-dark">
                {hotel.brand}
              </div>
            </div>
            <div className="space-y-4">
              {hotel.description.map((p, i) => (
                <p key={i} className="font-body text-[15px] leading-relaxed text-[#4a3f34] md:text-base">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {hotel.gallery && hotel.gallery.length > 0 && (
          <section className="border-b border-warmborder bg-white px-6 py-14 md:px-14 md:py-20">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
              Photos
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr] md:gap-3" style={{ height: "auto" }}>
              <div className="group relative h-[280px] overflow-hidden rounded-xl shadow-[0_5px_18px_rgba(37,35,33,.14)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(37,35,33,.22)] md:h-[440px]">
                <Image
                  src={hotel.gallery[0]}
                  alt={`${hotel.name} — photo 1`}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
              {hotel.gallery.length > 1 && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:grid-rows-2">
                  {hotel.gallery.slice(1, 3).map((src, i) => (
                    <div key={src} className="group relative h-[135px] overflow-hidden rounded-xl shadow-[0_5px_18px_rgba(37,35,33,.14)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(37,35,33,.22)] md:h-full">
                      <Image
                        src={src}
                        alt={`${hotel.name} — photo ${i + 2}`}
                        fill
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <HotelGalleryLightbox images={hotel.gallery} hotelName={hotel.name} />
          </section>
        )}        {hotel.roomFeatures && (
          <section className="border-b border-warmborder bg-white px-6 py-14 md:px-14 md:py-20">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
              Rooms &amp; suites
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {hotel.roomFeatures.map((r) => (
                <div key={r} className="flex items-baseline gap-2.5 border-b border-warmborder py-2.5 font-body text-[14px] text-[#4a3f34]">
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-terracotta" />
                  {r}
                </div>
              ))}
            </div>
            {hotel.uniqueDetails && (
              <div className="mt-8 rounded-xl border border-warmborder bg-warmcream p-5">
                {hotel.uniqueDetails.map((d) => (
                  <p key={d} className="font-body text-[14px] leading-relaxed text-[#4a3f34]">
                    &middot; {d}
                  </p>
                ))}
              </div>
            )}
          </section>
        )}

        <section className="relative overflow-hidden border-b border-warmborder bg-white px-6 py-14 md:px-14 md:py-20">
          <div className="pointer-events-none absolute inset-0 text-terracotta opacity-[0.05]">
            <Image src="/art/patterns/amenities-bg.svg" alt="" fill className="object-cover" />
          </div>
          <div className="relative">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
              Amenities
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {hotel.amenities.map((a) => (
                <div key={a} className="flex items-baseline gap-2.5 border-b border-warmborder py-2.5 font-body text-[14px] text-[#4a3f34]">
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-terracotta" />
                  {a}
                </div>
              ))}
            </div>

            {hotel.diningNames && (
              <div className="mt-10">
                <div className="font-ui text-sm font-bold uppercase tracking-[.06em] text-terracotta-dark">
                  Dining
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {hotel.diningNames.map((d) => (
                    <div key={d.name} className="rounded-lg border border-warmborder bg-warmcream p-4">
                      <div className="font-display text-base font-bold text-ink">{d.name}</div>
                      <div className="mt-1 font-body text-[13px] text-[#7a6a58]">{d.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {sortedDriveTimes.length > 0 && (
          <section className="border-b border-warmborder bg-white px-6 py-14 md:px-14 md:py-20">
            <h2 className="text-display-md mb-3 font-display font-bold text-ink md:mb-4">
              Distance to courses
            </h2>
            <p className="mb-8 max-w-[600px] font-body text-[14px] text-[#7a6a58]">
              Approximate driving times from {hotel.name}.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {sortedDriveTimes.map((d) => (
                <div key={d.course} className="flex items-center justify-between border-b border-warmborder py-2.5">
                  <span className="font-body text-[14px] text-[#4a3f34]">{d.course}</span>
                  <span className="font-display text-base font-bold text-terracotta-dark">{d.minutes} min</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="border-b border-warmborder px-6 py-10 md:px-14 md:py-14">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <PracticalItem label="Address" value={hotel.address} />
            <PracticalItem label="Phone" value={hotel.phone} />
            <PracticalItem label="Website" value={hotel.website} />
            <PracticalItem label="Brand" value={hotel.brand} />
          </dl>
        </section>

        <section className="relative overflow-hidden border-b border-warmborder bg-white px-6 py-14 md:px-14 md:py-20">
          <div className="pointer-events-none absolute inset-0 text-terracotta opacity-[0.05]">
            <Image src="/art/patterns/faq-bg.svg" alt="" fill className="object-cover" />
          </div>
          <div className="relative">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
              Common questions
            </h2>
            <div className="max-w-[800px] divide-y divide-warmborder border-t border-warmborder">
              {hotel.faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-ui text-base font-semibold text-ink">
                    {f.q}
                    <span className="font-display text-xl text-terracotta group-open:hidden">+</span>
                    <span className="hidden font-display text-xl text-terracotta group-open:inline">&minus;</span>
                  </summary>
                  <p className="mt-3 max-w-[700px] font-body text-[15px] leading-relaxed text-[#5a4f42]">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby courses cross-sell */}
        {nearbyCourses.length > 0 && (
          <section className="border-t border-[#e3ddcf] bg-stone px-6 py-14 md:px-14 md:py-20">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink">
              Courses near {hotel.name}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {nearbyCourses.map(c => (
                <Link key={c.slug} href={`/golf-courses/${c.slug}/`}
                  className="group overflow-hidden rounded-2xl border border-[#e3ddcf] bg-white shadow-[0_3px_12px_rgba(37,35,33,.08)] transition-all hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(37,35,33,.15)]">
                  {/* Image with type badge overlay */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#e8e4da]">
                    {c.image && (
                      <Image src={c.image} alt={c.name} fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,20,18,.4)] to-transparent" />
                    <span className="absolute left-3 bottom-3 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-[.07em] text-white">
                      {c.type.split("/")[0].trim()}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <div className="font-display text-base font-bold leading-snug text-ink group-hover:text-ocean transition-colors">{c.name}</div>
                    <div className="mt-1 font-body text-[12.5px] text-[#6a665e]">Par {c.par} · {c.yards} · {c.city.split(",")[0]}</div>
                    <p className="mt-2 line-clamp-2 font-body text-[12px] leading-relaxed text-[#7a7670]">{c.hook}</p>
                    <div className="mt-3 flex items-center gap-1 font-ui text-[12.5px] font-semibold text-ocean">
                      View course
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Itinerary cross-sell */}
        {crossSellTrips.length > 0 && (
          <section className="border-t border-[#e3ddcf] px-6 py-14 md:px-14 md:py-20">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink">
              Golf trips based here
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {crossSellTrips.map(t => (
                <Link key={t.slug} href={`/itineraries/${t.slug}/`}
                  className="group overflow-hidden rounded-xl border border-[#e3ddcf] bg-white shadow-[0_2px_8px_rgba(37,35,33,.06)] transition-all hover:-translate-y-1.5 hover:shadow-[0_10px_28px_rgba(37,35,33,.13)]">
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image src={t.image} alt={t.title} fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw" />
                    {t.mostBooked && (
                      <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-0.5 font-ui text-[10px] font-bold uppercase tracking-[.05em] text-ink">Most booked</span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="font-display text-base font-bold text-ink">{t.title}</div>
                    <div className="mt-1 font-body text-[13px] text-[#6a665e]">{t.durationDays} days · {t.rounds}</div>
                    <div className="mt-3 font-ui text-sm font-semibold text-ocean">View itinerary →</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="px-6 py-16 text-center md:px-14 md:py-20">
          <h2 className="text-display-md font-display font-bold text-ink">
            Pair {hotel.name} with a planned golf trip
          </h2>
          <Link
            href={`/quote/?hotel=${hotel.slug}`}
            className="mt-7 inline-block rounded-[9px] bg-terracotta px-7 py-4 font-ui text-base font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-terracotta-dark"
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
      <dt className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#9c8570]">
        {label}
      </dt>
      <dd className="mt-1.5 font-body text-[15px] text-ink">{value}</dd>
    </div>
  );
}
