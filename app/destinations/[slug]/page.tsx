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

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(DESTINATIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = DESTINATIONS[slug];
  if (!dest) return {};

  // Keyword-first title: "Golf in [City] — [descriptor] | Monterey Golf Tours"
  const title = `Golf in ${dest.name}, California — Courses & Packages | Monterey Golf Tours`;
  const description = dest.speakable;

  return {
    title,
    description,
    alternates: { canonical: `https://${SITE.domain}/destinations/${dest.slug}/` },
    openGraph: {
      title,
      description,
      url: `https://${SITE.domain}/destinations/${dest.slug}/`,
      siteName: "Monterey Golf Tours",
      locale: "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
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
          <Link href="/destinations/" className="mt-4 inline-block font-ui text-ocean">View all destinations &rarr;</Link>
        </main>
        <Footer />
      </>
    );
  }

  const canonicalUrl = `https://${SITE.domain}/destinations/${dest.slug}/`;
  const destCourses = dest.courseSlugs.map((s) => COURSES.find((c) => c.slug === s)).filter(Boolean);
  const destHotels = dest.hotelSlugs.map((s) => HOTELS.find((h) => h.slug === s)).filter(Boolean);
  const destItineraries = dest.itinerarySlugs.map((s) => ITINERARIES[s]).filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `Golf in ${dest.name}, California — Courses & Packages | Monterey Golf Tours`,
        description: dest.speakable,
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
        publisher: { "@id": `https://${SITE.domain}/#organization` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "#speakable-summary", ".faq-answer"],
        },
      },
      {
        "@type": "TouristDestination",
        "@id": `${canonicalUrl}#destination`,
        name: dest.name,
        description: dest.speakable,
        address: { "@type": "PostalAddress", addressLocality: dest.name, addressRegion: "CA", addressCountry: "US" },
        touristType: { "@type": "Audience", audienceType: "Golfers" },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: dest.faqs.map((f: { q: string; a: string }) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "Destinations", item: `https://${SITE.domain}/destinations/` },
          { "@type": "ListItem", position: 3, name: dest.name, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative flex min-h-[480px] flex-col bg-[#16242c] md:min-h-[580px]">
        {dest.image && (
          <Image src={dest.image} alt={`Golf in ${dest.name}, Monterey Peninsula`} fill priority className="object-cover" />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,25,20,.2) 0%, rgba(10,25,20,.8) 100%)" }} />
        <Header />
        <div className="relative z-10 mt-auto px-6 pb-10 pt-48 md:px-14 md:pb-14 md:pt-36">
          <span className="inline-block rounded-full border border-cream/40 bg-black/30 px-3.5 py-1.5 font-ui text-[11px] font-semibold uppercase tracking-[.1em] text-cream backdrop-blur-sm">
            Monterey Peninsula
          </span>
          <h1 className="speakable-summary mt-4 font-display text-[34px] font-bold leading-[1.1] text-cream md:text-[48px]">
            {dest.heroTitle}
          </h1>
          <p id="speakable-summary" className="mt-3 max-w-[600px] font-body text-base leading-relaxed text-cream/90 md:text-lg">
            {dest.speakable}
          </p>
        </div>
      </section>

      <main className="flex-1">
        {destCourses.length > 0 && (
          <section className="border-b border-[#e3ddcf] px-6 py-14 md:px-14 md:py-20">
            <h2 className="font-display text-2xl font-bold text-ink md:text-[32px] mb-8">
              Golf courses in {dest.name}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {destCourses.map((c) => c && (
                <Link key={c.slug} href={`/golf-courses/${c.slug}/`}
                  className="group overflow-hidden rounded-2xl border border-[#e3ddcf] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative h-44 w-full overflow-hidden bg-[#e8e4da]">
                    {c.image && <Image src={c.image} alt={c.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="33vw" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-[.07em] text-white">{c.type}</span>
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

        {destHotels.length > 0 && (
          <section className="border-b border-[#e3ddcf] bg-[#f7f4ee] px-6 py-14 md:px-14 md:py-20">
            <h2 className="font-display text-2xl font-bold text-ink md:text-[32px] mb-8">
              Where to stay in {dest.name}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {destHotels.map((h) => h && (
                <Link key={h.slug} href={`/hotels/${h.slug}/`}
                  className="group overflow-hidden rounded-2xl border border-[#e3ddcf] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative h-44 w-full overflow-hidden bg-[#e8e4da]">
                    {h.image && <Image src={h.image} alt={h.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="33vw" />}
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

        {destItineraries.length > 0 && (
          <section className="border-b border-[#e3ddcf] px-6 py-14 md:px-14 md:py-20">
            <h2 className="font-display text-2xl font-bold text-ink md:text-[32px] mb-8">
              Sample {dest.name} golf itineraries
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {destItineraries.map((t) => t && (
                <Link key={t.slug} href={`/itineraries/${t.slug}/`}
                  className="group rounded-2xl border border-[#e3ddcf] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="font-display text-lg font-bold text-ink">{t.title}</div>
                  <div className="mt-1 font-body text-[13px] text-[#6a665e]">{t.durationDays} days · {t.rounds}</div>
                  <div className="mt-3 font-ui text-[13px] font-semibold text-ocean">View itinerary →</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {dest.faqs && dest.faqs.length > 0 && (
          <section className="border-b border-[#e3ddcf] bg-white px-6 py-14 md:px-14 md:py-20">
            <h2 className="font-display text-2xl font-bold text-ink md:text-[32px] mb-8">
              Common questions about golf in {dest.name}
            </h2>
            <div className="max-w-[800px] divide-y divide-[#e3ddcf] border-t border-[#e3ddcf]">
              {dest.faqs.map((f: { q: string; a: string }) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-ui text-base font-semibold text-ink">
                    {f.q}
                    <span className="font-display text-xl text-gold group-open:hidden">+</span>
                    <span className="hidden font-display text-xl text-gold group-open:inline">&minus;</span>
                  </summary>
                  <p className="faq-answer mt-3 max-w-[700px] font-body text-[15px] leading-relaxed text-[#4a4f3c]">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="px-6 py-16 text-center md:px-14 md:py-20">
          <h2 className="font-display text-2xl font-bold text-ink md:text-[32px]">
            Plan a golf trip to {dest.name}
          </h2>
          <p className="mx-auto mt-3 max-w-[500px] font-body text-[15px] text-[#5a564e]">
            Tell us your group size and dates &mdash; we&apos;ll put together courses, lodging, and transfers.
          </p>
          <Link href="/quote/"
            className="mt-6 inline-block rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream hover:bg-ocean-dark">
            Get a custom quote &rarr;
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
