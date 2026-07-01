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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative flex min-h-[440px] flex-col overflow-hidden bg-[#16242c] md:min-h-[560px]">
        <Image src={trip.image} alt={trip.title} fill priority className="object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.2) 0%, rgba(22,36,44,.72) 100%)" }}
        />
        <Header />
        <div className="relative z-10 mt-auto px-6 pb-10 md:px-14 md:pb-14">
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
        <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-8 md:px-14">
          <p
            id="speakable-summary"
            className="max-w-[760px] font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base"
          >
            A {trip.durationDays}-day trip with {trip.rounds}, based at {trip.baseHotel}.
            Pricing runs from ${trip.priceFrom.toLocaleString()} to $
            {trip.priceTo.toLocaleString()} per person depending on course and room
            selections — built for {trip.target.toLowerCase()}.
          </p>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-6 md:px-14">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <FactBox label="Days" value={String(trip.durationDays)} />
            <FactBox label="Rounds" value={trip.rounds} />
            <FactBox label="Base hotel" value={trip.baseHotel} />
            <FactBox
              label="Price from"
              value={`$${trip.priceFrom.toLocaleString()}/person`}
            />
          </div>
          {!trip.priceVerified && (
            <p className="mt-4 max-w-[700px] font-body text-[13px] italic text-[#8a7560]">
              This price range is an estimate based on typical course and lodging costs,
              not a recalculated figure from current rates. Get a custom quote for
              accurate pricing.
            </p>
          )}
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-10 md:px-14 md:py-12">
          <h2 className="mb-7 font-display text-2xl font-bold text-ink md:text-[32px]">
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

        {tripCourses.length > 0 && (
          <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-10 md:px-14 md:py-12">
            <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
              Courses on this trip
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tripCourses.map((c) =>
                c ? (
                  <Link
                    key={c.slug}
                    href={`/golf-courses/${c.slug}/`}
                    className="rounded-xl border border-[#e3ddcf] bg-white p-5 shadow-[0_2px_8px_rgba(37,35,33,.06)] transition-transform hover:-translate-y-1"
                  >
                    <div className="font-display text-lg font-bold text-ink">{c.name}</div>
                    <div className="mt-1.5 font-body text-[13px] text-[#6a665e]">
                      Par {c.par} &middot; {c.yards}
                    </div>
                    <div className="mt-3 font-ui text-sm font-semibold text-ocean">
                      View course &rarr;
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </section>
        )}

        {tripHotels.length > 0 && (
          <section className="border-b border-[#e3ddcf] px-6 py-10 md:px-14 md:py-12">
            <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
              Where you&apos;ll stay
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {tripHotels.map((h) =>
                h ? (
                  <Link
                    key={h.slug}
                    href={`/hotels/${h.slug}/`}
                    className="rounded-xl border border-[#e3ddcf] bg-white p-5 shadow-[0_2px_8px_rgba(37,35,33,.06)] transition-transform hover:-translate-y-1"
                  >
                    <div className="font-display text-lg font-bold text-ink">{h.name}</div>
                    <div className="mt-1.5 font-body text-[13px] text-[#6a665e]">{h.city}</div>
                    <div className="mt-3 font-ui text-sm font-semibold text-ocean">
                      View hotel &rarr;
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </section>
        )}

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

        <section className="px-6 py-12 text-center md:px-14 md:py-14">
          <h2 className="font-display text-2xl font-bold text-ink md:text-[32px]">
            Want different courses or dates?
          </h2>
          <p className="mx-auto mt-3 max-w-[500px] font-body text-[15px] text-[#5a564e]">
            Every itinerary here is a starting point — we&apos;ll customize it around your
            group.
          </p>
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
