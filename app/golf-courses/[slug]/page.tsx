import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COURSE_DETAILS } from "@/lib/course-details";
import { COURSES } from "@/lib/courses";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(COURSE_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSE_DETAILS[slug];
  if (!course) return {};

  const title = `${course.name} — Tee Times & Course Info | Monterey Golf Tours`;
  const description = `${course.name} in ${course.city} — Par ${course.par}, ${course.yards}, designer ${course.designer.split("(")[0].trim()}. Plan your Monterey golf trip including ${course.name} with Monterey Golf Tours.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${SITE.domain}/golf-courses/${course.slug}/`,
    },
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = COURSE_DETAILS[slug];

  if (!course) {
    return (
      <>
        <Header />
        <main className="flex-1 px-6 py-32 text-center">
          <p className="font-body text-lg text-ink">Course not found.</p>
          <Link href="/golf-courses/" className="mt-4 inline-block font-ui text-ocean">
            View all courses &rarr;
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const nearby = course.nearbySlugs
    .map((s) => COURSES.find((c) => c.slug === s))
    .filter(Boolean);

  const canonicalUrl = `https://${SITE.domain}/golf-courses/${course.slug}/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${course.name} — Tee Times & Course Info | Monterey Golf Tours`,
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
        publisher: { "@id": `https://${SITE.domain}/#organization` },
      },
      {
        "@type": "GolfCourse",
        "@id": `${canonicalUrl}#course`,
        name: course.name,
        description: course.hook,
        address: {
          "@type": "PostalAddress",
          streetAddress: course.address,
          addressLocality: course.city.split(",")[0].trim(),
          addressRegion: "CA",
        },
        telephone: course.phone,
        url: canonicalUrl,
        numberOfHoles: course.holes,
        courseLength: course.yards,
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: course.faqs.map((f) => ({
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
            name: "Golf Courses",
            item: `https://${SITE.domain}/golf-courses/`,
          },
          { "@type": "ListItem", position: 3, name: course.name, item: canonicalUrl },
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

      <section className="relative flex min-h-[400px] flex-col overflow-hidden bg-[#16242c] md:min-h-[480px]">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.35) 0%, rgba(22,36,44,.78) 100%)" }}
        />
        <Header />
        <div className="relative z-10 mt-auto px-6 pb-10 md:px-14 md:pb-12">
          <h1 className="font-display text-[36px] font-bold leading-[1.1] text-cream md:text-[52px]">
            {course.name} &mdash; {course.city}
          </h1>
          <p className="mt-3 max-w-[600px] font-body text-base leading-relaxed text-[rgba(250,246,238,.85)] md:text-lg">
            {course.hook}
          </p>
        </div>
      </section>

      <main className="flex-1">
        <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-8 md:px-14">
          <p
            id="speakable-summary"
            className="max-w-[760px] font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base"
          >
            {course.name} is a {course.type.toLowerCase()} course in {course.city}, designed by{" "}
            {course.designer}. The course plays to par {course.par} at {course.yards} from the back
            tees. {course.bestFor[0]} will find this course most rewarding.
          </p>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-6 md:px-14">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <FactBox label="Par" value={String(course.par)} />
            <FactBox label="Yards" value={course.yards} />
            <FactBox label="Type" value={course.type} />
            <FactBox label="City" value={course.city} />
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-10 md:px-14 md:py-12">
          <div className="max-w-[760px] space-y-4">
            {course.description.map((p, i) => (
              <p key={i} className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-10 md:px-14 md:py-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
            Course highlights
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {course.highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-xl border border-[#e3ddcf] bg-white p-5 shadow-[0_2px_8px_rgba(37,35,33,.06)]"
              >
                <div className="font-ui text-sm font-semibold text-ink">{h.label}</div>
                <div className="mt-2 font-body text-[13px] leading-relaxed text-[#6a665e]">
                  {h.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-10 md:px-14 md:py-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
            Who this course is for
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="font-ui text-sm font-bold uppercase tracking-[.08em] text-ocean-dark">
                Best for
              </div>
              <ul className="mt-3 space-y-2 font-body text-[15px] text-[#4a463f]">
                {course.bestFor.map((b) => (
                  <li key={b}>&middot; {b}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-ui text-sm font-bold uppercase tracking-[.08em] text-[#8a5b2b]">
                Less ideal if
              </div>
              <ul className="mt-3 space-y-2 font-body text-[15px] text-[#4a463f]">
                {course.lessIdealIf.map((b) => (
                  <li key={b}>&middot; {b}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-10 md:px-14 md:py-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
            Practical info
          </h2>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PracticalItem label="Green fee" value={`${course.greenFeeEst} (verify current rates)`} />
            <PracticalItem label="Address" value={course.address} />
            <PracticalItem label="Phone" value={course.phone} />
            <PracticalItem label="Website" value={course.website} />
          </dl>
        </section>

        {nearby.length > 0 && (
          <section className="border-b border-[#e3ddcf] px-6 py-10 md:px-14 md:py-12">
            <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
              Nearby courses
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {nearby.map((c) =>
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

        <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-10 md:px-14 md:py-12 faq-section">
          <h2 className="mb-6 font-display text-2xl font-bold text-ink md:text-[32px]">
            Common questions
          </h2>
          <div className="max-w-[800px] divide-y divide-[#e4e0d6] border-t border-[#e4e0d6]">
            {course.faqs.map((f) => (
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
            Play {course.name} as part of a planned Monterey trip
          </h2>
          <Link
            href="/packages/"
            className="mt-6 inline-block rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream hover:bg-ocean-dark"
          >
            View packages &rarr;
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
      <div className="mt-1 font-display text-lg font-bold text-ink">{value}</div>
    </div>
  );
}

function PracticalItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-ui text-[11px] font-semibold uppercase tracking-[.06em] text-[#8a857a]">
        {label}
      </dt>
      <dd className="mt-1 font-body text-[15px] text-ink">{value}</dd>
    </div>
  );
}
