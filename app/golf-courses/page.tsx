import type { Metadata } from "next";
import Link from "next/link";
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
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.4) 0%, rgba(22,36,44,.82) 100%)" }}
        />
        <Header />
        <div className="relative z-10">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]">
            Golf courses on the Monterey Peninsula
          </h1>
          <p className="mt-3 max-w-[640px] font-body text-base leading-relaxed text-[rgba(250,246,238,.85)] md:text-lg">
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
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[#e3ddcf] bg-white p-5 shadow-[0_3px_11px_rgba(37,35,33,.06)] transition-transform duration-150 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(37,35,33,.12)]"
              >
                <div>
                  <span className="inline-block rounded-full bg-[#e7f0f3] px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-[.06em] text-ocean-dark">
                    {c.type}
                  </span>
                  <div className="mt-3 font-display text-lg font-bold leading-snug text-ink">
                    {c.name}
                  </div>
                  <div className="mt-1.5 font-body text-[13px] text-[#6a665e]">
                    {c.city} &middot; Par {c.par} &middot; {c.yards}
                  </div>
                  <p className="mt-3 font-body text-[13px] leading-relaxed text-[#5a564e]">
                    {c.hook}
                  </p>
                </div>
                <div className="mt-4 font-ui text-sm font-semibold text-ocean">
                  View course &rarr;
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
