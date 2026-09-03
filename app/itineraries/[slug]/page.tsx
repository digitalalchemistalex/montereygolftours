import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ITINERARIES } from "@/lib/itineraries";
import { COURSES } from "@/lib/courses";
import { HOTELS } from "@/lib/hotels";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(ITINERARIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trip = ITINERARIES[slug];
  if (!trip) return {};

  // Keyword-first: trip type + "Monterey golf" + price signal
  const priceStr = trip.priceFrom > 0 ? ` from $${trip.priceFrom}/person` : "";
  const title = `${trip.title} — Monterey Golf Trip${priceStr} | Monterey Golf Tours`;
  const description = `${trip.durationDays}-day Monterey Peninsula golf trip — ${trip.rounds}. ${trip.target} Fully customizable for your group.`;

  const heroImage = trip.image
    ? trip.image.startsWith("/") ? `https://${SITE.domain}${trip.image}` : trip.image
    : `https://${SITE.domain}/og-image.jpg`;

  return {
    title,
    description,
    alternates: { canonical: `https://${SITE.domain}/itineraries/${trip.slug}/` },
    openGraph: {
      title,
      description,
      url: `https://${SITE.domain}/itineraries/${trip.slug}/`,
      siteName: "Monterey Golf Tours",
      locale: "en_US",
      type: "website",
      images: [{ url: heroImage, width: 1200, height: 800, alt: trip.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [heroImage] },
  };
}

export default async function ItineraryPage({ params }: Props) {
  const { slug } = await params;
  const trip = ITINERARIES[slug];

  if (!trip) {
    return (
      <>
        <Header />
        <main className="flex-1 px-6 py-32 text-center">
          <p className="font-body text-lg text-ink">Itinerary not found.</p>
          <Link href="/itineraries/" className="mt-4 inline-block font-ui text-ocean">View all itineraries &rarr;</Link>
        </main>
        <Footer />
      </>
    );
  }

  const canonicalUrl = `https://${SITE.domain}/itineraries/${trip.slug}/`;
  const tripCourses = trip.courseSlugs.map((s: string) => COURSES.find((c) => c.slug === s)).filter(Boolean);
  const tripHotels = trip.hotelSlugs.map((s: string) => HOTELS.find((h) => h.slug === s)).filter(Boolean);
  const otherTrips = Object.values(ITINERARIES).filter((t) => t.slug !== trip.slug).slice(0, 2);

  // AEO-targeted FAQs generated from trip data — answers in answer-first format
  const generatedFaqs = [
    {
      q: `How long is the ${trip.title}?`,
      a: `The ${trip.title} is ${trip.durationDays} days, covering ${trip.rounds}. ${trip.target}`,
    },
    {
      q: `How much does the ${trip.title} cost?`,
      a: trip.priceFrom > 0
        ? `The ${trip.title} starts from $${trip.priceFrom} per person, depending on group size, course selection, and lodging. Contact Monterey Golf Tours for a custom quote.`
        : `Pricing for the ${trip.title} depends on group size, course selection, and lodging. Contact Monterey Golf Tours for a custom quote within 24 hours.`,
    },
    {
      q: `Can the ${trip.title} be customized?`,
      a: `Yes — every Monterey Golf Tours itinerary is a starting point. Course lineup, lodging, group size, and daily order can all be adjusted. Submit a quote request and we'll tailor it within 24 hours.`,
    },
    {
      q: `What courses are included in the ${trip.title}?`,
      a: tripCourses.length > 0
        ? `This itinerary includes: ${tripCourses.map((c) => c?.name).join(", ")}. Course order and selection can be adjusted based on your group's preference and skill level.`
        : `Course selection for this itinerary is customized based on your group's preference and dates. Contact Monterey Golf Tours for a tailored lineup.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${trip.title} | Monterey Golf Tours`,
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
        publisher: { "@id": `https://${SITE.domain}/#organization` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "#speakable-summary", ".faq-answer"],
        },
      },
      {
        "@type": "TouristTrip",
        "@id": `${canonicalUrl}#trip`,
        name: trip.title,
        description: trip.target,
        provider: { "@id": `https://${SITE.domain}/#organization` },
        touristType: { "@type": "Audience", audienceType: "Golfers" },
        ...(trip.priceFrom > 0 ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: trip.priceFrom,
              priceCurrency: "USD",
            },
            availability: "https://schema.org/InStock",
            url: `https://${SITE.domain}/quote/`,
          },
        } : {}),
        itinerary: trip.days.map((d: { title: string; items: string[] }) => ({
          "@type": "Event",
          name: d.title,
          description: d.items.join(" "),
          location: { "@type": "Place", name: "Monterey Peninsula, California" },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: generatedFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "Itineraries", item: `https://${SITE.domain}/itineraries/` },
          { "@type": "ListItem", position: 3, name: trip.title, item: canonicalUrl },
        ],
      },
    ],
  };

  const heroImg = tripCourses[0]?.image ?? null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative flex min-h-[480px] flex-col bg-[#16242c] md:min-h-[580px]">
        {heroImg && (
          <Image src={heroImg} alt={`${trip.title} — Monterey Peninsula golf`} fill priority className="object-cover" style={{ objectPosition: "center 40%" }} />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,25,15,.25) 0%, rgba(15,25,15,.88) 100%)" }} />
        <Header />
        <div className="relative z-10 mt-auto px-6 pb-10 pt-48 md:px-14 md:pb-14 md:pt-36">
          <span className="inline-block rounded-full border border-cream/40 bg-black/30 px-3.5 py-1.5 font-ui text-[11px] font-semibold uppercase tracking-[.1em] text-cream backdrop-blur-sm">
            {trip.durationDays}-day itinerary
          </span>
          <h1 className="mt-4 font-display text-[34px] font-bold leading-[1.1] text-cream md:text-[48px]">
            {trip.title}
          </h1>
          <p id="speakable-summary" className="mt-3 max-w-[620px] font-body text-base leading-relaxed text-cream/90 md:text-lg">
            {trip.target}
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* Stats bar */}
        <section className="border-b border-[#e3ddcf] bg-white px-6 py-8 md:px-14">
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <StatItem label="Duration" value={`${trip.durationDays} days`} />
            <StatItem label="Rounds" value={trip.rounds} />
            {trip.priceFrom > 0 && <StatItem label="From" value={`$${trip.priceFrom}/person`} />}
          </div>
        </section>

        {/* Day-by-day */}
        <section className="border-b border-[#e3ddcf] px-6 py-14 md:px-14 md:py-20">
          <h2 className="font-display text-2xl font-bold text-ink md:text-[32px] mb-10">Day-by-day</h2>
          <div className="space-y-8 max-w-[720px]">
            {trip.days.map((d: { title: string; items: string[] }, i: number) => (
              <div key={i} className="flex gap-6">
                <div className="flex-none">
                  <div className="font-display text-[28px] font-extrabold leading-none text-fairway">{String(i + 1).padStart(2, "0")}</div>
                </div>
                <div>
                  <div className="font-ui text-base font-bold text-ink">{d.title}</div>
                  <ul className="mt-2 space-y-1.5">
                    {d.items.map((item: string, j: number) => (
                      <li key={j} className="flex gap-2 font-body text-[14px] leading-relaxed text-[#4a4f3c]">
                        <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-fairway" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Courses */}
        {tripCourses.length > 0 && (
          <section className="border-b border-[#e3ddcf] bg-white px-6 py-14 md:px-14 md:py-20">
            <h2 className="font-display text-2xl font-bold text-ink md:text-[32px] mb-8">Courses on this trip</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tripCourses.map((c) => c && (
                <Link key={c.slug} href={`/golf-courses/${c.slug}/`}
                  className="group overflow-hidden rounded-2xl border border-[#e3ddcf] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative h-44 w-full overflow-hidden bg-[#e8e4da]">
                    {c.image && <Image src={c.image} alt={c.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="33vw" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="font-display text-base font-bold text-ink">{c.name}</div>
                    <div className="mt-0.5 font-body text-[12px] text-[#6a665e]">Par {c.par} · {c.yards}</div>
                    <div className="mt-2 font-ui text-[12px] font-semibold text-ocean">View course →</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Hotels */}
        {tripHotels.length > 0 && (
          <section className="border-b border-[#e3ddcf] px-6 py-14 md:px-14 md:py-20">
            <h2 className="font-display text-2xl font-bold text-ink md:text-[32px] mb-8">Lodging options</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {tripHotels.map((h) => h && (
                <Link key={h.slug} href={`/hotels/${h.slug}/`}
                  className="group overflow-hidden rounded-2xl border border-[#e3ddcf] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative h-44 w-full overflow-hidden bg-[#e8e4da]">
                    {h.image && <Image src={h.image} alt={h.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="50vw" />}
                  </div>
                  <div className="p-4">
                    <div className="font-display text-base font-bold text-ink">{h.name}</div>
                    <div className="mt-0.5 font-body text-[12px] text-[#6a665e]">{h.city}</div>
                    <div className="mt-2 font-ui text-[12px] font-semibold text-ocean">View hotel →</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ — generated from trip data, faq-answer class for speakable */}
        <section className="border-b border-[#e3ddcf] bg-white px-6 py-14 md:px-14 md:py-20">
          <h2 className="font-display text-2xl font-bold text-ink md:text-[32px] mb-8">Common questions</h2>
          <div className="max-w-[800px] divide-y divide-[#e3ddcf] border-t border-[#e3ddcf]">
            {generatedFaqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-ui text-base font-semibold text-ink">
                  {f.q}
                  <span className="font-display text-xl text-fairway group-open:hidden">+</span>
                  <span className="hidden font-display text-xl text-fairway group-open:inline">&minus;</span>
                </summary>
                <p className="faq-answer mt-3 max-w-[700px] font-body text-[15px] leading-relaxed text-[#4a4f3c]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Cross-sell + CTA */}
        <section className="px-6 py-16 text-center md:px-14 md:py-20">
          <h2 className="font-display text-2xl font-bold text-ink">
            Customise this Monterey golf trip for your group
          </h2>
          <p className="mx-auto mt-3 max-w-[480px] font-body text-[15px] text-[#5a564e]">
            This itinerary is a starting point. Tell us your dates and group size &mdash; we&apos;ll adjust the course lineup and lodging and quote you within 24 hours.
          </p>
          <Link href="/quote/"
            className="mt-6 inline-block rounded-[9px] bg-fairway px-7 py-4 font-ui text-base font-semibold text-white hover:bg-fairway-dark">
            Get a custom quote &rarr;
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-ui text-[11px] font-semibold uppercase tracking-[.06em] text-[#8a8a6e]">{label}</div>
      <div className="mt-1 font-display text-xl font-bold text-ink">{value}</div>
    </div>
  );
}
