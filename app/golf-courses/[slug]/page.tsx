import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
  const courseImage = COURSES.find((c) => c.slug === course.slug)?.image;

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
        ...(course.rating ? { courseRating: course.rating } : {}),
        ...(course.slope ? { courseSlope: course.slope } : {}),
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

  const statItems = [
    { label: "Par", value: String(course.par) },
    { label: "Yards", value: course.yards.replace(" yards", "") },
    ...(course.rating ? [{ label: "Rating", value: course.rating }] : []),
    ...(course.slope ? [{ label: "Slope", value: course.slope }] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative flex min-h-[440px] flex-col overflow-hidden bg-[#16242c] md:min-h-[560px]">
        {courseImage && (
          <Image src={courseImage} alt={course.name} fill priority className="object-cover" />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.25) 0%, rgba(22,36,44,.85) 100%)" }}
        />
        <Header />
        <div className="relative z-10 mt-auto px-6 pb-10 pt-24 md:px-14 md:pb-14 md:pt-0">
          <span className="inline-block rounded-full border border-[rgba(250,246,238,.4)] bg-[rgba(22,36,44,.4)] px-3.5 py-1.5 font-ui text-[11px] font-semibold uppercase tracking-[.1em] text-cream backdrop-blur-sm">
            {course.city}
          </span>
          <h1 className="text-display-lg mt-4 font-display font-extrabold text-cream" style={{ textShadow: "0 2px 24px rgba(0,0,0,.35)" }}>
            {course.name}
          </h1>
          <p className="mt-3 max-w-[620px] font-body text-base leading-relaxed text-[rgba(250,246,238,.9)] md:text-lg">
            {course.hook}
          </p>
        </div>
      </section>

      <main className="flex-1">
        <section className="border-b border-[#e3ddcf] px-6 py-8 md:px-14 md:py-10">
          <div className="flex flex-wrap gap-x-10 gap-y-6 md:gap-x-14">
            {statItems.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl font-extrabold leading-none text-ocean-dark md:text-5xl">
                  {s.value}
                </div>
                <div className="mt-1.5 font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a857a]">
                  {s.label}
                </div>
              </div>
            ))}
            <div className="min-w-[180px] flex-1">
              <div className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a857a]">
                Type
              </div>
              <div className="mt-1.5 font-display text-lg font-bold text-ink">{course.type}</div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-14 md:px-14 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.55fr_1fr] md:gap-16">
            <div>
              <p id="speakable-summary" className="pull-quote text-2xl leading-tight text-ink md:text-3xl">
                &ldquo;{course.bestFor[0]} will find this course most rewarding.&rdquo;
              </p>
              <div className="mt-6 font-body text-sm text-[#8a857a]">
                Designed by {course.designer}
              </div>
            </div>
            <div className="space-y-4">
              {course.description.map((p, i) => (
                <p key={i} className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] bg-stone px-6 py-14 md:px-14 md:py-20">
          <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
            Course highlights
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
            {course.highlights.map((h, i) => (
              <div key={h.label} className="flex gap-4">
                <div className="font-display text-2xl font-extrabold leading-none text-gold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-ui text-base font-semibold text-ink">{h.label}</div>
                  <div className="mt-1.5 font-body text-[14px] leading-relaxed text-[#6a665e]">
                    {h.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[#e3ddcf] px-6 py-14 md:px-14 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
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
              <div className="font-ui text-sm font-bold uppercase tracking-[.08em] text-[#a85561]">
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

        <section className="border-b border-[#e3ddcf] bg-stone px-6 py-10 md:px-14 md:py-14">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <PracticalItem label="Green fee" value={`${course.greenFeeEst} (verify current rates)`} />
            <PracticalItem label="Address" value={course.address} />
            <PracticalItem label="Phone" value={course.phone} />
            <PracticalItem label="Website" value={course.website} />
          </dl>
        </section>

        {nearby.length > 0 && (
          <section className="border-b border-[#e3ddcf] px-6 py-14 md:px-14 md:py-20">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
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

        <section className="border-b border-[#e3ddcf] px-6 py-14 md:px-14 md:py-20 faq-section">
          <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
            Common questions
          </h2>
          <div className="max-w-[800px] divide-y divide-[#e4e0d6] border-t border-[#e4e0d6]">
            {course.faqs.map((f) => (
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

        <section className="px-6 py-16 text-center md:px-14 md:py-20">
          <h2 className="text-display-md font-display font-bold text-ink">
            Play {course.name} as part of a planned trip
          </h2>
          <Link
            href="/packages/"
            className="mt-7 inline-block rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream transition-transform hover:-translate-y-0.5 hover:bg-ocean-dark"
          >
            View packages &rarr;
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

function PracticalItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-ui text-[11px] font-semibold uppercase tracking-[.06em] text-[#8a857a]">
        {label}
      </dt>
      <dd className="mt-1.5 font-body text-[15px] text-ink">{value}</dd>
    </div>
  );
}
