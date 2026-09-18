import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

const PUBLISHED = "2026-08-22";
const MODIFIED = "2026-09-16";

export const metadata: Metadata = {
  title: "About Monterey Golf Tours — Custom Peninsula Golf Trips",
  description:
    "IAGTO-contracted Pebble Beach Resorts® partner. Custom Monterey Peninsula golf trips — courses, lodging, tee times, end to end. Groups of 2–400.",
  alternates: {
    canonical: `https://${SITE.domain}/about/`,
  },
  openGraph: {
    title: "About Monterey Golf Tours — Custom Peninsula Golf Trips",
    description:
      "IAGTO-contracted Pebble Beach Resorts® partner. Custom Monterey Peninsula golf trips — courses, lodging, tee times, end to end. Groups of 2–400.",
    url: `https://${SITE.domain}/about/`,
    type: "website",
  },
};

const PRINCIPLES = [
  {
    n: "01",
    title: "Complete trips, not tee times",
    detail: "We don't sell single rounds — every trip is courses, lodging, and logistics planned together.",
  },
  {
    n: "02",
    title: 'Never "all-inclusive"',
    detail: "Flights and meals aren't bundled in unless you specifically ask us to arrange them.",
  },
  {
    n: "03",
    title: "Authorized Pebble Beach access",
    detail: "As an IAGTO-contracted partner, we book Pebble Beach Resorts® courses directly.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What does Monterey Golf Tours actually handle?",
    a: "We handle courses, lodging, and tee times end to end. That means selecting the right courses for your group's skill level and schedule, booking accommodations at Peninsula hotels, and coordinating tee times — including at Pebble Beach Resorts® properties through our IAGTO contract. We do not book flights or meals unless you specifically ask.",
  },
  {
    q: "How large or small a group can you accommodate?",
    a: "We work with groups of any size, from a twosome to 400 players. Small groups get the same level of planning attention as large corporate outings.",
  },
  {
    q: "Is Monterey Golf Tours an authorized Pebble Beach booking agent?",
    a: "Yes. We are an IAGTO-contracted travel partner with Pebble Beach Resorts®, which means we can book tee times at Pebble Beach Golf Links®, Spyglass Hill® Golf Course, The Links at Spanish Bay®, Del Monte™ Golf Course, and The Hay™ directly through official channels.",
  },
  {
    q: "How long does a typical Monterey golf trip last?",
    a: "Most groups plan 3 to 7 days. A 4-day trip covers the four main courses comfortably; 5 days lets you add Carmel Valley Ranch or Black Horse. We build the schedule around how many rounds your group wants to play.",
  },
  {
    q: "When is the best time to golf on the Monterey Peninsula?",
    a: "May through October is peak season — fog typically burns off by 10am and afternoon conditions are ideal. April and November offer shoulder-season pricing with the same course conditions. Winter brings more coastal weather but the Peninsula plays year-round. Morning tee times between 8–10am get the most consistent conditions in any season.",
  },
  {
    q: "Why choose the Monterey Peninsula over other golf destinations?",
    a: "The Peninsula concentrates more world-ranked courses within a 15-mile radius than almost anywhere in the world — Pebble Beach Golf Links®, Spyglass Hill®, Pasatiempo, and Carmel Valley Ranch are all within easy range of each other. You can play four genuinely different course styles in four days without driving more than 30 minutes between any two.",
  },
];

export default function AboutPage() {
  const canonicalUrl = `https://${SITE.domain}/about/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "About Monterey Golf Tours | Custom Peninsula Golf Trips",
        description:
          "Monterey Golf Tours plans custom multi-day golf trips on the Monterey Peninsula — courses, lodging, and tee times handled end to end. IAGTO-contracted Pebble Beach Resorts® partner.",
        datePublished: PUBLISHED,
        dateModified: MODIFIED,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".speakable-intro", ".speakable-faq"],
        },
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
      },
      {
        "@type": "AboutPage",
        "@id": `${canonicalUrl}#about`,
        url: canonicalUrl,
        name: "About Monterey Golf Tours",
        datePublished: PUBLISHED,
        dateModified: MODIFIED,
        about: { "@id": `https://${SITE.domain}/#organization` },
        mentions: { "@id": `${canonicalUrl}#sean-schaeffer` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "About", item: canonicalUrl },
        ],
      },
      {
        "@type": "Person",
        "@id": `${canonicalUrl}#sean-schaeffer`,
        name: "Sean Schaeffer",
        jobTitle: "Founder",
        description:
          "Sean Schaeffer is the founder of Monterey Golf Tours and Golf the High Sierra. He operates a family of golf trip planning sites specializing in the Monterey Peninsula and the Reno/Tahoe/Graeagle region, coordinating custom multi-day golf packages for groups of 2 to 400 players.",
        url: canonicalUrl,
        worksFor: { "@id": `https://${SITE.domain}/#organization` },
        sameAs: ["https://golfthehighsierra.com"],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
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
      <section className="relative flex min-h-[420px] flex-col justify-end bg-[#16242c] md:min-h-[520px]">
        <Image
          src="/images/pbc-portal/pbgl_9_2020_aerial.jpg"
          alt="Aerial view of Pebble Beach Golf Links® Hole 9 along Stillwater Cove, Monterey Peninsula"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 72%" }}
        />
        <Header />
        <div className="relative z-10 px-6 pb-8 pt-40 md:px-14 md:pb-10 md:pt-60">
          <h1 className="font-display text-3xl font-bold text-cream drop-shadow-md md:text-4xl lg:text-5xl">
            About Monterey Golf Tours
          </h1>
          <p className="mt-3 max-w-xl font-body text-sm text-cream/80 drop-shadow md:text-base">
            IAGTO-contracted Pebble Beach Resorts® partner · 2–400 players · Custom Peninsula golf trips
          </p>
          <p className="mt-2 font-body text-xs text-cream/50">
            Photo by Jeff Marsh · Pebble Beach Golf Links®, Hole 9
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* Who we are */}
        <section className="border-b border-[#e3ddcf] px-6 py-16 md:px-14 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.6fr_1fr] md:gap-16">
            <div>
              <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
                Who we are
              </div>
              <p className="pull-quote mt-4 text-2xl leading-tight text-ink md:text-3xl">
                &ldquo;We plan the whole trip — not just the tee time.&rdquo;
              </p>
            </div>
            <div className="space-y-4">
              <p className="speakable-intro font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                Monterey Golf Tours is an active golf trip booking operation for the
                Monterey Peninsula. We confirm tee times, block hotel rooms, and
                coordinate logistics end to end under a single contract — for groups of
                2 to 400 players across all 14 courses on the peninsula, including
                direct IAGTO-authorized access to Pebble Beach Resorts&reg; properties.
                Custom quote within 24 hours.
              </p>
              <p className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                As an IAGTO-contracted travel partner with Pebble Beach Resorts&reg;, we
                can book and coordinate tee times at Pebble Beach Golf Links&reg;,
                Spyglass Hill Golf Course&reg;, The Links at Spanish Bay&reg;, Del Monte
                Golf Course&reg;, and The Hay&trade;, alongside the rest of the
                peninsula&apos;s courses.
              </p>
              <p className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                Every Monterey golf package we build starts with understanding your
                group — how many players, how many rounds, what mix of bucket-list courses
                versus hidden gems, and where everyone wants to stay. We match the
                itinerary to the group, not the other way around. The result is a
                coordinated Monterey Peninsula golf trip where the logistics are handled
                before you land.
              </p>
              <p className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                We book across all{" "}
                <Link
                  href="/golf-courses/"
                  className="text-ocean underline decoration-[rgba(44,110,142,.3)] underline-offset-2 hover:text-ocean-dark"
                >
                  14 courses on the Peninsula
                </Link>
                {" "}and coordinate stays at{" "}
                <Link
                  href="/hotels/"
                  className="text-ocean underline decoration-[rgba(44,110,142,.3)] underline-offset-2 hover:text-ocean-dark"
                >
                  11 vetted hotels
                </Link>
                {" "}from downtown Monterey to Carmel Valley. If you&apos;re looking for a
                starting point,{" "}
                <Link
                  href="/itineraries/"
                  className="text-ocean underline decoration-[rgba(44,110,142,.3)] underline-offset-2 hover:text-ocean-dark"
                >
                  our sample itineraries
                </Link>
                {" "}show what 3-, 4-, 5-, and 7-day trips typically look like.
              </p>
              <p className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                Beyond the courses, the Monterey Peninsula has enough to keep non-golfers
                and rest days fully occupied — the 17-Mile Drive&reg;, Cannery Row,
                Carmel-by-the-Sea village, wine tasting in Carmel Valley, and coastal
                hiking along Point Lobos. We can point you toward our{" "}
                <Link
                  href="/experiences/"
                  className="text-ocean underline decoration-[rgba(44,110,142,.3)] underline-offset-2 hover:text-ocean-dark"
                >
                  Peninsula experiences guide
                </Link>
                {" "}if you want to plan the off-course days too.
              </p>
            </div>
          </div>
        </section>

        {/* How we operate */}
        <section className="border-b border-[#e3ddcf] bg-stone px-6 py-16 md:px-14 md:py-24">
          <h2 className="text-display-md mb-10 font-display font-bold text-ink md:mb-14">
            How we operate
          </h2>
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.n}>
                <div className="font-display text-3xl font-extrabold leading-none text-gold">
                  {p.n}
                </div>
                <div className="mt-3 font-ui text-lg font-semibold text-ink">{p.title}</div>
                <div className="mt-2 font-body text-[14px] leading-relaxed text-[#6a665e]">
                  {p.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Founder */}
        <section className="border-b border-[#e3ddcf] px-6 py-16 md:px-14 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.6fr_1fr] md:gap-16">
            <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
              Founder
            </div>
            <div className="space-y-4">
              <p className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                Sean Schaeffer founded Monterey Golf Tours as part of a family of golf
                trip planning sites he operates across California&apos;s top golf
                destinations. The same team behind{" "}
                <a
                  href="https://golfthehighsierra.com"
                  className="text-ocean underline decoration-[rgba(44,110,142,.3)] underline-offset-2 hover:text-ocean-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Golf the High Sierra
                </a>
                {" "}— covering the Reno/Tahoe/Graeagle region — handles Monterey Peninsula
                trip planning under the same model: coordinated, multi-day golf packages
                built around the group, not the other way around.
              </p>
              <p className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                Every trip is planned with direct access to the Peninsula&apos;s courses
                and hotels. No middlemen, no call-center itineraries. If you have
                questions about how a specific trip would work,{" "}
                <Link
                  href="/contact/"
                  className="text-ocean underline decoration-[rgba(44,110,142,.3)] underline-offset-2 hover:text-ocean-dark"
                >
                  contact us directly
                </Link>
                {" "}or check the{" "}
                <Link
                  href="/faq/"
                  className="text-ocean underline decoration-[rgba(44,110,142,.3)] underline-offset-2 hover:text-ocean-dark"
                >
                  FAQ
                </Link>
                .
              </p>
              <p className="font-body text-[14px] text-[#9a9590] md:text-[15px]">
                Monterey, CA · {SITE.address}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-[#e3ddcf] bg-stone px-6 py-16 md:px-14 md:py-24">
          <h2 className="text-display-md mb-10 font-display font-bold text-ink md:mb-14">
            Common questions
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q}>
                <h3 className="speakable-faq font-ui text-base font-semibold text-ink">
                  {item.q}
                </h3>
                <p className="mt-2 font-body text-[14px] leading-relaxed text-[#6a665e]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 font-body text-[14px] text-[#9a9590]">
            More questions?{" "}
            <Link
              href="/faq/"
              className="text-ocean underline decoration-[rgba(44,110,142,.3)] underline-offset-2 hover:text-ocean-dark"
            >
              See the full FAQ
            </Link>
            .
          </p>
        </section>

        {/* CTA */}
        <section className="px-6 py-16 text-center md:px-14 md:py-20">
          <h2 className="text-display-md font-display font-bold text-ink">
            Ready to plan your trip?
          </h2>
          <p className="mt-3 font-body text-[15px] text-[#6a665e]">
            Custom quote within 24 hours · Groups of 2–400 · 14 Peninsula courses
          </p>
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
