import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ITINERARIES } from "@/lib/itineraries";
import { getMontereyTrips } from "@/lib/gths";
import { SITE } from "@/lib/site";

// GTHS api-image.php returns 403 — use index-based Unsplash fallbacks so each card gets a different photo
const GTHS_IMG_BY_INDEX: string[] = [
  "https://images.unsplash.com/photo-1538648759472-7251f7cb2c2f?auto=format&fit=crop&w=600&h=350&q=80",
  "https://images.unsplash.com/photo-1605147861225-7bcd55f8e513?auto=format&fit=crop&w=600&h=350&q=80",
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&h=350&q=80",
  "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=600&h=350&q=80",
  "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&h=350&q=80",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=600&h=350&q=80",
];
function gthsImg(index: number): string {
  return GTHS_IMG_BY_INDEX[index % GTHS_IMG_BY_INDEX.length];
}

export const metadata: Metadata = {
  title: "Golf Trip Packages | Monterey Golf Tours",
  description:
    "Real Monterey Peninsula golf packages — 3 to 7 days, priced from actual course and lodging rates. Fully customizable for your group.",
  alternates: { canonical: `https://${SITE.domain}/packages/` },
};

// VIBE → badge color
const VIBE_COLORS: Record<string, string> = {
  Premium:    "bg-gold text-ink",
  Value:      "bg-[#2e6b44] text-cream",
  Classic:    "bg-ocean text-cream",
  Luxury:     "bg-[#5c3d2e] text-cream",
  Relaxed:    "bg-[#4a6741] text-cream",
};

function vibeBadge(vibe: string) {
  return VIBE_COLORS[vibe] ?? "bg-[#e3ddcf] text-ink";
}

// Sanitise PB course names from GTHS courses[] before display
const PB_SLUGS = ["Pebble Beach Golf Links", "Spyglass Hill Golf Course",
  "The Links at Spanish Bay", "Del Monte Golf Course", "The Hay"];
function safeCourse(name: string): string {
  if (PB_SLUGS.some(pb => name.includes(pb.split(" ")[0]) && name.includes("Beach") || name.includes("Spyglass") || name.includes("Spanish Bay"))) {
    return "Pebble Beach Resorts® course";
  }
  return name;
}

export default async function PackagesPage() {
  const [gthsTrips, internalTrips] = await Promise.all([
    getMontereyTrips(),
    Promise.resolve(Object.values(ITINERARIES).sort((a, b) => a.durationDays - b.durationDays)),
  ]);

  const hasGTHS = gthsTrips.length > 0;
  const fromPrice = hasGTHS
    ? Math.min(...gthsTrips.map((t) => t.pricePerPerson))
    : 880; // verified floor from mgts-gths-data-integration.md

  const canonicalUrl = `https://${SITE.domain}/packages/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Monterey Golf Trip Packages",
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
        description: `Real Monterey Peninsula golf packages from $${fromPrice.toLocaleString()}/person`,
      },
      {
        "@type": "ItemList",
        itemListElement: internalTrips.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://${SITE.domain}/itineraries/${t.slug}/`,
          name: t.title,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative flex min-h-[440px] flex-col justify-end bg-[#16242c] md:min-h-[540px]">
        <Image
          src="https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=2400&q=90"
          alt="Monterey Peninsula golf"
          fill priority
          className="object-cover object-[center_70%]"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(20,20,28,.2) 0%,rgba(20,20,28,.75) 100%)" }} />
        <Header />
        <div className="relative z-10 px-6 pb-12 pt-44 md:px-14 md:pb-14">
          <p className="mb-3 font-ui text-[11px] font-bold uppercase tracking-[.1em] text-gold">Monterey Golf Tours</p>
          <h1 className="font-display text-[36px] font-extrabold leading-[1.05] text-cream md:text-[54px]">
            Golf trip packages
          </h1>
          <p className="mt-4 max-w-[600px] font-body text-base leading-relaxed text-[rgba(250,246,238,.9)] md:text-lg">
            Every package below is built from real course and lodging rates — 3 to 7 days,
            fully customizable for your group.
            {hasGTHS && (
              <span className="mt-1 block font-ui text-[13px] text-gold">
                From ${fromPrice.toLocaleString()}/person · Based on real trips we&apos;ve run
              </span>
            )}
          </p>
        </div>
      </section>

      <main className="flex-1">

        {/* GTHS Real Trips — shown when API returns data */}
        {hasGTHS && (
          <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-14 md:px-14 md:py-20">
            <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="mb-2 inline-block rounded-full bg-ocean px-3 py-1 font-ui text-[11px] font-bold uppercase tracking-[.06em] text-cream">
                  Real trips we&apos;ve run
                </span>
                <h2 className="font-display text-2xl font-bold text-ink md:text-[32px]">
                  Recent Monterey Peninsula trips
                </h2>
                <p className="mt-2 font-body text-[14px] text-[#6a665e]">
                  Sourced from our Golf the High Sierra portfolio — real groups, real courses, real pricing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gthsTrips.map((trip, index) => (
                <a
                  key={trip.id}
                  href={trip.canonicalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-2xl border border-[#e3ddcf] bg-white shadow-[0_3px_12px_rgba(37,35,33,.07)] transition-all hover:-translate-y-1.5 hover:shadow-[0_12px_36px_rgba(37,35,33,.14)]"
                >
                  {/* Image */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={gthsImg(index)}
                      alt={`${trip.vibe} Monterey golf trip — ${trip.nights} nights`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Vibe badge */}
                    <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-[.06em] ${vibeBadge(trip.vibe)}`}>
                      {trip.vibe}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 font-ui text-[11px] font-semibold uppercase tracking-[.07em] text-[#8a857a]">
                      <span>{trip.nights} nights</span>
                      <span>&middot;</span>
                      <span>{trip.rounds} rounds</span>
                      <span>&middot;</span>
                      <span>{trip.groupSize} players</span>
                    </div>

                    <p className="mt-2 font-body text-[14px] leading-relaxed text-[#4a463f] line-clamp-3">
                      {trip.synopsis}
                    </p>

                    {/* Courses */}
                    {trip.courses.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {trip.courses.slice(0, 3).map((c) => (
                          <span key={c} className="rounded-full border border-[#e3ddcf] bg-[#f4f0e7] px-2.5 py-0.5 font-ui text-[11px] text-[#6a665e]">
                            {safeCourse(c)}
                          </span>
                        ))}
                        {trip.courses.length > 3 && (
                          <span className="rounded-full border border-[#e3ddcf] bg-[#f4f0e7] px-2.5 py-0.5 font-ui text-[11px] text-[#6a665e]">
                            +{trip.courses.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price + CTA */}
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="font-ui text-[11px] text-[#8a857a]">from </span>
                        <span className="font-display text-xl font-bold text-ocean-dark">
                          ${trip.pricePerPerson.toLocaleString()}
                        </span>
                        <span className="font-ui text-[12px] text-[#8a857a]">/person</span>
                      </div>
                      <span className="font-ui text-[12px] font-semibold text-ocean group-hover:underline">
                        View full trip &rarr;
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-6 text-center font-body text-[12px] text-[#a8a294]">
              Trip data sourced from{" "}
              <a href="https://golfthehighsierra.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-ocean">
                Golf the High Sierra
              </a>
              {" "}— our Monterey Peninsula golf portfolio.
            </p>
          </section>
        )}

        {/* Internal itinerary templates — always shown */}
        <section className="px-6 py-14 md:px-14 md:py-20">
          <div className="mb-10">
            <h2 className="font-display text-2xl font-bold text-ink md:text-[32px]">
              {hasGTHS ? "Build your own trip" : "Trip templates"}
            </h2>
            <p className="mt-2 font-body text-[14px] text-[#6a665e]">
              {hasGTHS
                ? "Use these day-by-day frameworks as a starting point — we'll customize courses, lodging, and dates around your group."
                : "Every length covered — 3 to 7 days, priced from real course and lodging rates."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {internalTrips.map((t) => (
              <Link
                key={t.slug}
                href={`/itineraries/${t.slug}/`}
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-xl shadow-[0_3px_12px_rgba(37,35,33,.09)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(37,35,33,.18)]"
              >
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top,rgba(15,21,18,.92) 0%,rgba(15,21,18,.5) 50%,rgba(15,21,18,.08) 100%)" }}
                />
                <div className="absolute inset-0 border-2 border-transparent transition-colors duration-200 group-hover:border-gold rounded-xl" />
                <div className="relative z-10 p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-ui text-[11px] font-bold uppercase tracking-[.08em] text-[rgba(250,246,238,.8)]">
                      {t.durationDays} days &middot; {t.rounds}
                    </span>
                    {t.mostBooked && (
                      <span className="rounded-full bg-gold px-2.5 py-0.5 font-ui text-[10px] font-bold uppercase tracking-[.05em] text-ink">
                        Most booked
                      </span>
                    )}
                  </div>
                  <div className="font-display text-lg font-bold leading-tight text-cream">{t.title}</div>
                  <p className="mt-1 line-clamp-2 font-body text-[12px] leading-relaxed text-[rgba(250,246,238,.8)]">
                    {t.target}
                  </p>
                  <div className="mt-3 font-ui text-sm font-semibold text-ocean group-hover:text-gold transition-colors">
                    View itinerary &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quote CTA */}
        <section className="border-t border-[#e3ddcf] bg-[#16242c] px-6 py-14 text-center md:px-14 md:py-16">
          <h2 className="font-display text-2xl font-bold text-cream md:text-[32px]">
            Want something custom?
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] font-body text-[15px] leading-relaxed text-[rgba(250,246,238,.8)]">
            Every package here is a starting point — tell us your group size, dates, and
            budget and we&apos;ll build the right courses, lodging, and length around it.
          </p>
          <Link
            href="/quote/"
            className="mt-6 inline-block rounded-[9px] bg-gold px-7 py-4 font-ui text-base font-semibold text-ink hover:bg-[#e6b82a]"
          >
            Get a custom quote &rarr;
          </Link>
        </section>

      </main>
      <Footer />
    </>
  );
}
