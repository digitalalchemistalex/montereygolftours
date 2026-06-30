import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DESTINATIONS } from "@/lib/destinations";
import { COURSES } from "@/lib/courses";
import { HOTELS } from "@/lib/hotels";
import { ITINERARIES } from "@/lib/itineraries";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(DESTINATIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = DESTINATIONS[slug];
  if (!dest) return {};

  return {
    title: `${dest.heroTitle} | Monterey Golf Tours`,
    description: dest.speakable,
    alternates: {
      canonical: `https://${SITE.domain}/destinations/${dest.slug}/`,
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const dest = DESTINATIONS[slug];

  if (!dest) {
    return (
      <>
        <Header />
        <main className="flex-1 px-6 py-32 text-center">
          <p className="font-body text-lg text-ink">Destination not found.</p>
          <Link href="/destinations/" className="mt-4 inline-block font-ui text-ocean">
            View all destinations &rarr;
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const canonicalUrl = `https://${SITE.domain}/destinations/${dest.slug}/`;
  const destCourses = dest.courseSlugs
    .map((s) => COURSES.find((c) => c.slug === s))
    .filter(Boolean);
  const destHotels = dest.hotelSlugs
    .map((s) => HOTELS.find((h) => h.slug === s))
    .filter(Boolean);
  const destItineraries = dest.itinerarySlugs
    .map((s) => ITINERARIES[s])
    .filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${dest.heroTitle} | Monterey Golf Tours`,
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
      },
      {
        "@type": "TouristDestination",
        "@id": `${canonicalUrl}#destination`,
        name: dest.name,
        description: dest.speakable,
        address: { "@type": "PostalAddress", addressLocality: dest.name, addressRegion: "CA" },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: dest.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Destinations",
            item: `https://${SITE.domain}/destinations/`,
          },
          { "@type": "ListItem", position: 3, name: dest.name, item: canonicalUrl },
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

      <section className="relative flex min-h-[360px] flex-col overflow-hidden bg-[#16242c] md:min-h-[420px]">
        <Image src={dest.image} alt={dest.name} fill priority className="object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.35) 0%, rgba(22,36,44,.78) 100%)" }}
        />
        <Header />
        <div className="relative z-10 mt-auto px-6 pb-10 md:px-14 md:pb-12">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]">
            {dest.heroTitle}
          </h1>
        </div>
      </section>

      <main className="flex-1">
        <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-8 md:px-14">
          <p
            id="speakable-summary"
            className="max-w-[760px] font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base"
          >
            {dest.speakable}
          </p>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-6 md:px-14">
          <div className="flex flex-wrap gap-3">
            {dest.trustBar.map((item) => (
              <span
                key={item}
                className="rounded-full bg-[#e7f0f3] px-4 py-2 font-ui text-[13px] font-semibold text-ocean-dark"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-10 md:px-14 md:py-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink md:text-[32px]">
            Why play golf in {dest.name}
          </h2>
          <p className="max-w-[760px] font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
            {dest.whyPlay}
          </p>
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dest.features.map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-[#e3ddcf] bg-white p-5 shadow-[0_2px_8px_rgba(37,35,33,.06)]"
              >
                <div className="font-ui text-sm font-semibold text-ink">{f.label}</div>
                <div className="mt-2 font-body text-[13px] leading-relaxed text-[#6a665e]">
                  {f.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {destCourses.length > 0 && (
          <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-10 md:px-14 md:py-12">
            <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
              Courses in / near {dest.name}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {destCourses.map((c) =>
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
                    <p className="mt-3 font-body text-[13px] leading-relaxed text-[#5a564e]">
                      {c.hook}
                    </p>
                    <div className="mt-3 font-ui text-sm font-semibold text-ocean">
                      View course &rarr;
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </section>
        )}

        {destHotels.length > 0 && (
          <section className="border-b border-[#e3ddcf] px-6 py-10 md:px-14 md:py-12">
            <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
              Stay here
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {destHotels.map((h) =>
                h ? (
                  <Link
                    key={h.slug}
                    href={`/hotels/${h.slug}/`}
                    className="rounded-xl border border-[#e3ddcf] bg-white p-5 shadow-[0_2px_8px_rgba(37,35,33,.06)] transition-transform hover:-translate-y-1"
                  >
                    <div className="font-display text-lg font-bold text-ink">{h.name}</div>
                    <div className="mt-1.5 font-body text-[13px] text-[#6a665e]">{h.city}</div>
                    <p className="mt-3 font-body text-[13px] leading-relaxed text-[#5a564e]">
                      {h.description}
                    </p>
                    <div className="mt-3 font-ui text-sm font-semibold text-ocean">
                      View hotel &rarr;
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </section>
        )}

        {destItineraries.length > 0 && (
          <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-10 md:px-14 md:py-12">
            <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
              Sample itineraries featuring {dest.name}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {destItineraries.map((t) => (
                <Link
                  key={t.slug}
                  href={`/itineraries/${t.slug}/`}
                  className="rounded-xl border border-[#e3ddcf] bg-white p-5 shadow-[0_2px_8px_rgba(37,35,33,.06)] transition-transform hover:-translate-y-1"
                >
                  <div className="font-ui text-[11px] font-bold uppercase tracking-[.08em] text-ocean-dark">
                    {t.durationDays} days &middot; {t.rounds}
                  </div>
                  <div className="mt-2 font-display text-lg font-bold text-ink">{t.title}</div>
                  <div className="mt-3 font-display text-base font-bold text-ocean-dark">
                    from ${t.priceFrom.toLocaleString()}/person
                    {!t.priceVerified && (
                      <span className="ml-1 font-ui text-[10px] font-normal italic text-[#8a7560]">
                        (estimate)
                      </span>
                    )}
                  </div>
                  <div className="mt-3 font-ui text-sm font-semibold text-ocean">
                    View itinerary &rarr;
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="border-b border-[#e3ddcf] px-6 py-10 md:px-14 md:py-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
            Common questions
          </h2>
          <div className="max-w-[800px] divide-y divide-[#e4e0d6] border-t border-[#e4e0d6]">
            {dest.faqs.map((f) => (
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
            Plan your {dest.name} golf trip
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
