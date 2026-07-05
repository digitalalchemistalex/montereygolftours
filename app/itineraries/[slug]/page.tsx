import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ITINERARIES } from "@/lib/itineraries";
import { COURSES } from "@/lib/courses";
import { HOTELS } from "@/lib/hotels";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(ITINERARIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trip = ITINERARIES[slug];
  if (!trip) return {};

  return {
    title: `${trip.title} | Monterey Golf Tours`,
    description: `${trip.title} — ${trip.durationDays} days, ${trip.rounds}, from $${trip.priceFrom}/person. ${trip.target}`,
    alternates: {
      canonical: `https://${SITE.domain}/itineraries/${trip.slug}/`,
    },
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
          <Link href="/itineraries/" className="mt-4 inline-block font-ui text-ocean">
            View all itineraries &rarr;
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const canonicalUrl = `https://${SITE.domain}/itineraries/${trip.slug}/`;
  const tripCourses = trip.courseSlugs
    .map((s) => COURSES.find((c) => c.slug === s))
    .filter(Boolean);
  const tripHotels = trip.hotelSlugs
    .map((s) => HOTELS.find((h) => h.slug === s))
    .filter(Boolean);

  // Cross-sell: up to 2 other itineraries, different from current
  const otherTrips = Object.values(ITINERARIES)
    .filter((t) => t.slug !== trip.slug)
    .slice(0, 2);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${trip.title} | Monterey Golf Tours`,
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
      },
      {
        "@type": "TouristTrip",
        "@id": `${canonicalUrl}#trip`,
        name: trip.title,
        description: trip.target,
        itinerary: trip.days.map((d) => ({
          "@type": "Event",
          name: d.title,
          description: d.items.join(" "),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Itineraries",
            item: `https://${SITE.domain}/itineraries/`,
          },
          { "@type": "ListItem", position: 3, name: trip.title, item: canonicalUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: trip.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[420px] flex-col overflow-hidden bg-[#16242c] md:min-h-[560px]">
        <Image src={trip.image} alt={trip.title} fill priority className="object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.2) 0%, rgba(22,36,44,.72) 100%)" }}
        />
        <Header />
        <div className="relative z-10 mt-auto px-6 pb-10 pt-40 md:px-14 md:pb-14 md:pt-60">
          {trip.mostBooked && (
            <span className="mb-3 inline-block rounded-full bg-gold px-3 py-1 font-ui text-[11px] font-bold uppercase tracking-[.05em] text-ink">
              Most booked
            </span>
          )}
          <h1 className="text-display-lg font-display font-extrabold text-cream" style={{ textShadow: "0 2px 24px rgba(0,0,0,.35)" }}>
            {trip.title}
          </h1>
          <p className="mt-3 max-w-[600px] font-body text-base leading-relaxed text-[rgba(250,246,238,.9)] md:text-lg">
            {trip.target}
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* Stats + summary */}
        <section className="border-b border-[#e3ddcf] px-6 py-14 md:px-14 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.5fr_1fr] md:gap-16">
            <div className="flex flex-wrap gap-x-10 gap-y-6">
              <div>
                <div className="font-display text-4xl font-extrabold leading-none text-ocean-dark md:text-5xl">
                  {trip.durationDays}
                </div>
                <div className="mt-1.5 font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a857a]">
                  Days
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold leading-none text-ink md:text-3xl">
                  {trip.rounds}
                </div>
                <div className="mt-1.5 font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a857a]">
                  Rounds
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold leading-none text-gold md:text-3xl">
                  ${trip.priceFrom.toLocaleString()}
                </div>
                <div className="mt-1.5 font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a857a]">
                  Price from{!trip.priceVerified && " (estimate)"}
                </div>
              </div>
            </div>
            <div>
              <p id="speakable-summary" className="pull-quote text-xl leading-snug text-ink md:text-2xl">
                A {trip.durationDays}-day trip with {trip.rounds}, based at {trip.baseHotel}.
              </p>
              <p className="mt-4 font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                Pricing runs from ${trip.priceFrom.toLocaleString()} to $
                {trip.priceTo.toLocaleString()} per person depending on course and room
                selections — built for {trip.target.toLowerCase()}.
                {!trip.priceVerified && (
                  <span className="mt-2 block text-[13px] italic text-[#a87a5c]">
                    This range is an estimate, not a recalculated figure from current
                    rates. Get a custom quote for accurate pricing.
                  </span>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Day-by-day */}
        <section className="border-b border-[#e3ddcf] bg-stone px-6 py-14 md:px-14 md:py-20">
          <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
            Day-by-day itinerary
          </h2>
          <div className="space-y-6">
            {trip.days.map((d) => (
              <div
                key={d.day}
                className="rounded-2xl border border-[#e3ddcf] bg-white p-6 shadow-[0_3px_11px_rgba(37,35,33,.06)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ocean font-ui text-[15px] font-semibold text-white">
                    {d.day}
                  </div>
                  <div className="font-display text-lg font-bold text-ink">{d.title}</div>
                </div>
                <ul className="mt-4 space-y-2 pl-12 font-body text-[14px] leading-relaxed text-[#5a564e]">
                  {d.items.map((item, i) => (
                    <li key={i}>&middot; {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Courses — with images */}
        {tripCourses.length > 0 && (
          <section className="border-b border-[#e3ddcf] px-6 py-14 md:px-14 md:py-20">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
              Courses on this trip
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tripCourses.map((c) =>
                c ? (
                  <Link
                    key={c.slug}
                    href={`/golf-courses/${c.slug}/`}
                    className="group overflow-hidden rounded-xl border border-[#e3ddcf] bg-white shadow-[0_2px_8px_rgba(37,35,33,.06)] transition-all hover:-translate-y-1.5 hover:shadow-[0_10px_28px_rgba(37,35,33,.13)]"
                  >
                    {c.image && (
                      <div className="relative h-44 w-full overflow-hidden">
                        <Image
                          src={c.image}
                          alt={c.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="font-display text-base font-bold text-ink">{c.name}</div>
                      <div className="mt-1 font-body text-[13px] text-[#6a665e]">
                        Par {c.par} &middot; {c.yards} &middot; {c.type}
                      </div>
                      <div className="mt-3 font-ui text-sm font-semibold text-ocean">
                        View course &rarr;
                      </div>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </section>
        )}

        {/* Hotels — with images */}
        {tripHotels.length > 0 && (
          <section className="border-b border-[#e3ddcf] bg-stone px-6 py-14 md:px-14 md:py-20">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
              Where you&apos;ll stay
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {tripHotels.map((h) =>
                h ? (
                  <Link
                    key={h.slug}
                    href={`/hotels/${h.slug}/`}
                    className="group overflow-hidden rounded-xl border border-[#e3ddcf] bg-white shadow-[0_2px_8px_rgba(37,35,33,.06)] transition-all hover:-translate-y-1.5 hover:shadow-[0_10px_28px_rgba(37,35,33,.13)]"
                  >
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={h.image}
                        alt={h.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-5">
                      <div className="font-display text-lg font-bold text-ink">{h.name}</div>
                      <div className="mt-1 font-body text-[13px] text-[#6a665e]">{h.city}</div>
                      <p className="mt-2 font-body text-[13px] leading-relaxed text-[#5a564e] line-clamp-2">
                        {h.description}
                      </p>
                      <div className="mt-3 font-ui text-sm font-semibold text-ocean">
                        View hotel &rarr;
                      </div>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </section>
        )}

        {/* What's included */}
        <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-10 md:px-14 md:py-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink md:text-[32px]">
            What&apos;s included
          </h2>
          <p className="max-w-[700px] font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
            Course bookings, lodging coordination, and trip planning, as priced above.
            Flights and meals are not included unless specifically arranged as part of
            your custom quote.
          </p>
        </section>

        {/* Upsell — Pebble Beach add-on */}
        <section className="border-b border-[#e3ddcf] bg-[#16242c] px-6 py-14 md:px-14 md:py-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="mb-3 inline-block rounded-full bg-gold px-3 py-1 font-ui text-[11px] font-bold uppercase tracking-[.05em] text-ink">
                Optional upgrade
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-cream md:text-[32px]">
                Add Pebble Beach Golf Links® to your trip
              </h2>
              <p className="mt-3 max-w-[520px] font-body text-[15px] leading-relaxed text-[rgba(250,246,238,.8)]">
                Pebble Beach Golf Links® and Spyglass Hill® Golf Course are available as add-ons
                to any itinerary. Green fees from $625/person — mention it in your quote and
                we&apos;ll build it in.
              </p>
            </div>
            <Link
              href={`/quote/?trip=${trip.slug}&upgrade=pebble-beach`}
              className="flex-none whitespace-nowrap rounded-[9px] border-2 border-gold px-7 py-4 font-ui text-base font-semibold text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Add to my quote &rarr;
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-[#e3ddcf] px-6 py-14 md:px-14 md:py-20">
          <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
            Common questions
          </h2>
          <div className="max-w-[800px] divide-y divide-[#e4e0d6] border-t border-[#e4e0d6]">
            {trip.faqs.map((f) => (
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

        {/* Cross-sell — other itineraries */}
        {otherTrips.length > 0 && (
          <section className="border-b border-[#e3ddcf] bg-stone px-6 py-14 md:px-14 md:py-20">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
              Other trips to consider
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {otherTrips.map((t) => (
                <Link
                  key={t.slug}
                  href={`/itineraries/${t.slug}/`}
                  className="group overflow-hidden rounded-xl border border-[#e3ddcf] bg-white shadow-[0_2px_8px_rgba(37,35,33,.06)] transition-all hover:-translate-y-1.5 hover:shadow-[0_10px_28px_rgba(37,35,33,.13)]"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={t.image}
                      alt={t.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    {t.mostBooked && (
                      <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-0.5 font-ui text-[10px] font-bold uppercase tracking-[.05em] text-ink">
                        Most booked
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="font-display text-lg font-bold text-ink">{t.title}</div>
                    <div className="mt-1 font-body text-[13px] text-[#6a665e]">
                      {t.durationDays} days &middot; {t.rounds} &middot; from ${t.priceFrom.toLocaleString()}/person
                    </div>
                    <p className="mt-2 font-body text-[13px] leading-relaxed text-[#5a564e]">
                      {t.target}
                    </p>
                    <div className="mt-3 font-ui text-sm font-semibold text-ocean">
                      View itinerary &rarr;
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Upsell — next trip up */}
        {(() => {
          const allTrips = Object.values(ITINERARIES).sort((a, b) => a.priceFrom - b.priceFrom);
          const currentIndex = allTrips.findIndex((t) => t.slug === trip.slug);
          const upsell = allTrips[currentIndex + 1];
          if (!upsell) return null;
          return (
            <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-14 md:px-14 md:py-16">
              <div className="mx-auto max-w-[900px]">
                <div className="font-ui text-[11px] font-bold uppercase tracking-[.1em] text-gold">
                  Take it further
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold text-ink md:text-[28px]">
                  Add more days, more courses
                </h2>
                <p className="mt-2 max-w-[560px] font-body text-[14px] leading-relaxed text-[#5a564e]">
                  Groups who extend to {upsell.durationDays} days typically add{" "}
                  {upsell.rounds} — giving the trip a more relaxed pace and room
                  for one more standout course.
                </p>
                <Link
                  href={`/itineraries/${upsell.slug}/`}
                  className="group mt-6 flex max-w-[420px] items-center justify-between gap-4 overflow-hidden rounded-xl border border-[#e3ddcf] bg-white shadow-[0_2px_8px_rgba(37,35,33,.06)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(37,35,33,.13)]"
                >
                  {upsell.image && (
                    <div className="relative h-full w-[120px] flex-none self-stretch overflow-hidden">
                      <Image
                        src={upsell.image}
                        alt={upsell.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="120px"
                      />
                    </div>
                  )}
                  <div className="flex-1 py-4 pr-5">
                    <div className="font-ui text-[11px] font-bold uppercase tracking-[.06em] text-gold">
                      {upsell.durationDays} days &middot; {upsell.rounds}
                    </div>
                    <div className="mt-1 font-display text-base font-bold text-ink">
                      {upsell.title}
                    </div>
                    <div className="mt-1 font-display text-sm font-bold text-ocean-dark">
                      from ${upsell.priceFrom.toLocaleString()}/person
                    </div>
                    <div className="mt-2 font-ui text-sm font-semibold text-ocean">
                      See this itinerary &rarr;
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          );
        })()}

        {/* Cross-sell — related itineraries at similar price point */}
        {(() => {
          const related = Object.values(ITINERARIES)
            .filter((t) => t.slug !== trip.slug)
            .sort((a, b) => Math.abs(a.priceFrom - trip.priceFrom) - Math.abs(b.priceFrom - trip.priceFrom))
            .slice(0, 2);
          if (related.length === 0) return null;
          return (
            <section className="border-b border-[#e3ddcf] px-6 py-14 md:px-14 md:py-16">
              <div className="mx-auto max-w-[900px]">
                <div className="font-ui text-[11px] font-bold uppercase tracking-[.1em] text-gold">
                  You might also like
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold text-ink md:text-[28px]">
                  Similar trips
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {related.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/itineraries/${t.slug}/`}
                      className="group overflow-hidden rounded-xl border border-[#e3ddcf] bg-white shadow-[0_2px_8px_rgba(37,35,33,.06)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(37,35,33,.13)]"
                    >
                      {t.image && (
                        <div className="relative h-40 w-full overflow-hidden">
                          <Image
                            src={t.image}
                            alt={t.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="font-ui text-[11px] font-bold uppercase tracking-[.06em] text-gold">
                          {t.durationDays} days &middot; {t.rounds}
                        </div>
                        <div className="mt-1.5 font-display text-base font-bold text-ink">
                          {t.title}
                        </div>
                        <div className="mt-1 font-display text-sm font-bold text-ocean-dark">
                          from ${t.priceFrom.toLocaleString()}/person
                        </div>
                        <div className="mt-3 font-ui text-sm font-semibold text-ocean">
                          View itinerary &rarr;
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* Custom quote CTA */}
        <section className="px-6 py-12 text-center md:px-14 md:py-14">
          <h2 className="font-display text-2xl font-bold text-ink md:text-[32px]">
            Want different courses or dates?
          </h2>
          <p className="mx-auto mt-3 max-w-[500px] font-body text-[15px] text-[#5a564e]">
            Every itinerary here is a starting point — we&apos;ll customize it around your
            group.
          </p>
          <Link
            href={`/quote/?trip=${trip.slug}`}
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
