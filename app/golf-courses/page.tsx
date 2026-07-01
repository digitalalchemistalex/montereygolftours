import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COURSES } from "@/lib/courses";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Golf Courses on the Monterey Peninsula | Monterey Golf Tours",
  description:
    "Browse all 14 golf courses Monterey Golf Tours plans trips around — from championship resort courses to accessible daily-fee rounds across the Monterey Peninsula.",
  alternates: {
    canonical: `https://${SITE.domain}/golf-courses/`,
  },
};

export default function GolfCoursesIndexPage() {
  const canonicalUrl = `https://${SITE.domain}/golf-courses/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Golf Courses on the Monterey Peninsula",
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
      },
      {
        "@type": "ItemList",
        itemListElement: COURSES.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://${SITE.domain}/golf-courses/${c.slug}/`,
          name: c.name,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "Golf Courses", item: canonicalUrl },
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

      <section className="relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-[#16242c] px-6 pb-10 md:min-h-[340px] md:px-14 md:pb-12">
        <Image
          src="/art/courses-hero.svg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,20,30,.25) 0%, rgba(22,20,30,.7) 100%)" }}
        />
        <Header />
        <div className="relative z-10 pt-20 md:pt-0">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]">
            Golf courses on the Monterey Peninsula
          </h1>
          <p className="mt-3 max-w-[640px] font-body text-base leading-relaxed text-[rgba(250,246,238,.9)] md:text-lg">
            14 courses, from championship cliff-top rounds to accessible daily-fee golf — all
            bookable as part of a planned Monterey Golf Tours trip.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <section className="px-6 py-10 md:px-14 md:py-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c) => (
              <Link
                key={c.slug}
                href={`/golf-courses/${c.slug}/`}
                className="group relative flex h-[280px] flex-col justify-end overflow-hidden rounded-xl shadow-[0_5px_18px_rgba(37,35,33,.14)] transition-transform duration-150 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(37,35,33,.26)]"
              >
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-ocean to-ocean-dark" />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,21,18,.92) 0%, rgba(15,21,18,.55) 45%, rgba(15,21,18,.1) 100%)",
                  }}
                />
                <div className="relative z-10 p-5">
                  <span className="inline-block rounded-full bg-[rgba(255,255,255,.15)] px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-[.06em] text-cream backdrop-blur-sm">
                    {c.type}
                  </span>
                  <div className="mt-2.5 font-display text-xl font-bold leading-snug text-cream">
                    {c.name}
                  </div>
                  <div className="mt-1 font-body text-[13px] text-[rgba(250,246,238,.85)]">
                    {c.city} &middot; Par {c.par} &middot; {c.yards}
                  </div>
                  {!c.image && (
                    <div className="mt-2 font-ui text-[11px] italic text-[rgba(250,246,238,.7)]">
                      Photo coming soon
                    </div>
                  )}
                  <div className="mt-3 font-ui text-sm font-semibold text-[#e8b8be]">
                    View course &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-[#e3ddcf] bg-[#f4f0e7] px-6 py-12 text-center md:px-14 md:py-14">
          <h2 className="font-display text-2xl font-bold text-ink md:text-[32px]">
            Not sure which courses fit your group?
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] font-body text-[15px] text-[#5a564e]">
            Tell us your group size, skill level, and dates, and we&apos;ll put together a
            course lineup that fits.
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
