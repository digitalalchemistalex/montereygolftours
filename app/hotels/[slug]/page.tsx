import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COURSE_DETAILS } from "@/lib/course-details";
import { HOTEL_DETAILS } from "@/lib/hotel-details";
import GalleryLightbox from "@/components/GalleryLightbox";
import TabbedGallery from "@/components/TabbedGallery";
import { COURSES } from "@/lib/courses";
import { getCoursePricing } from "@/lib/course-pricing";
import { SITE } from "@/lib/site";
import CourseHotels from "@/components/CourseHotels";
import CarWeekBanner from "@/components/CarWeekBanner";
import MondayInsider from "@/components/MondayInsider";
import PoppyHillsValue from "@/components/PoppyHillsValue";
import SpanishBayWaitlist from "@/components/SpanishBayWaitlist";
import PBGLLiveCams from "@/components/PBGLLiveCams";
import PBGLTournaments from "@/components/PBGLTournaments";
import PBCEvents from "@/components/PBCEvents";
import PBCMajorsBanner from "@/components/PBCMajorsBanner";

type Props = {
  params: Promise<{ slug: string }>;
};

// Revalidate every hour so pricing edits made in Supabase's table editor
// show up automatically without needing a full manual redeploy -- otherwise
// this page's static generation would only pick up new prices at build time.
export const revalidate = 3600;

export async function generateStaticParams() {
  const courseSlugs = Object.keys(COURSE_DETAILS).map((slug) => ({ slug }));
  const hotelSlugs = Object.keys(HOTEL_DETAILS).map((slug) => ({ slug }));
  return [...courseSlugs, ...hotelSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Hotel pages
  const hotel = HOTEL_DETAILS[slug];
  if (hotel) {
    const TITLE_NAME: Record<string, string> = {
      "embassy-suites-monterey-bay-seaside": "Embassy Suites Monterey Bay",
      "monterey-beach-hotel": "Monterey Beach Hotel",
    };
    const displayName = TITLE_NAME[slug] ?? hotel.name;
    const isPBCHotel = ["lodge-at-pebble-beach","inn-at-spanish-bay","casa-palmero"].includes(slug);
    const hasOnSiteGolf = hotel.onSiteGolf !== null;
    const hotelTitle = isPBCHotel
      ? `${hotel.name} — Golf Packages & Pebble Beach Resorts® Stay`
      : hasOnSiteGolf
      ? `${displayName} — On-Site Golf & Monterey Peninsula Packages`
      : `${displayName} — Golf Group Hotel, Monterey Peninsula`;
    const hotelDesc = isPBCHotel
      ? `Stay at ${hotel.name} with Monterey Golf Tours — IAGTO-authorized Pebble Beach Resorts® tee times, group rates, and end-to-end trip planning. Custom quote in 24 hours.`
      : hasOnSiteGolf
      ? `${hotel.name} in ${hotel.city} — on-site golf, group-friendly, and bookable as part of a complete Monterey Peninsula golf package. Custom quote in 24 hours.`
      : (`${hotel.name} in ${hotel.city} — ${hotel.hook ?? ""} Book as part of a Monterey Peninsula golf trip for groups of 2–400.`).slice(0, 160);
    return {
      title: hotelTitle,
      description: hotelDesc,
      alternates: { canonical: `https://${SITE.domain}/hotels/${hotel.slug}/` },
      openGraph: {
        type: "website",
        title: hotelTitle,
        description: hotelDesc,
        url: `https://${SITE.domain}/hotels/${hotel.slug}/`,
        siteName: "Monterey Golf Tours",
      },
      twitter: { card: "summary_large_image", title: hotelTitle, description: hotelDesc },
    };
  }

  // Course pages
  const course = COURSE_DETAILS[slug];
  if (!course) return {};

  const isClosed = slug === "links-at-spanish-bay";
  const isPBC = ["pebble-beach-golf-links","spyglass-hill","del-monte-golf-course","the-hay"].includes(slug);
  const title = isClosed
    ? `${course.name} — Closed for Renovation, Reopening April 2027 | Waitlist Open`
    : isPBC
    ? `${course.name} — IAGTO Tee Times & Pebble Beach Golf Packages`
    : `${course.name} — Group Tee Times & Monterey Golf Trip Planning`;
  const description = isClosed
    ? `${course.name} is closed for a Gil Hanse-led renovation, reopening April 17, 2027. Join the waitlist and plan your Monterey Peninsula golf trip around the reopening.`
    : isPBC
    ? `Book ${course.name} through Monterey Golf Tours — IAGTO-authorized tee times, Pebble Beach Resorts® lodging, and end-to-end trip planning for groups of 2–400. Custom quote in 24 hours.`
    : (`${course.name} in ${course.city} — Par ${course.par}, ${course.yards}. Group tee times, hotel coordination, and Monterey Peninsula trip planning. Custom quote in 24 hours.`).slice(0, 160);

  const courseData = COURSES.find((c) => c.slug === slug);
  const ogImage = courseData?.image?.startsWith("/")
    ? `https://${SITE.domain}${courseData.image}`
    : courseData?.image ?? "/og-image.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: `https://${SITE.domain}/golf-courses/${course.slug}/`,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://${SITE.domain}/golf-courses/${course.slug}/`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: course.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = COURSE_DETAILS[slug];

  // ── Hotel pages ─────────────────────────────────────────────────
  const hotel = HOTEL_DETAILS[slug];
  if (hotel) {
    const RESORT_SLUGS = [
      "lodge-at-pebble-beach",
      "inn-at-spanish-bay",
      "casa-palmero",
      "carmel-valley-ranch-hotel",
      "quail-lodge-hotel",
      "bernardus-lodge",
    ];
    const hotelType = RESORT_SLUGS.includes(slug) ? ["Hotel", "Resort"] : "Hotel";
    const canonicalUrl = `https://${SITE.domain}/hotels/${hotel.slug}/`;
    const heroImage = hotel.gallery?.[0]?.src
      ? hotel.gallery[0].src.startsWith("/")
        ? `https://${SITE.domain}${hotel.gallery[0].src}`
        : hotel.gallery[0].src
      : `https://${SITE.domain}/og-image.jpg`;

    const hotelSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": hotelType,
          "@id": `${canonicalUrl}#hotel`,
          name: hotel.name,
          description: hotel.hook,
          address: {
            "@type": "PostalAddress",
            streetAddress: hotel.address,
            addressLocality: hotel.city.split(",")[0],
            addressRegion: "CA",
            addressCountry: "US",
          },
          telephone: hotel.phone,
          url: `https://${hotel.website}`,
          image: { "@type": "ImageObject", url: heroImage, width: 1200, height: 630 },
          numberOfRooms: hotel.rooms,
          amenityFeature: hotel.amenities.map((a) => ({
            "@type": "LocationFeatureSpecification",
            name: a,
            value: true,
          })),
        },
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: hotel.name,
          description: hotel.hook?.slice(0, 155),
          isPartOf: { "@id": `https://${SITE.domain}/#website` },
          publisher: { "@id": `https://${SITE.domain}/#organization` },
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", "#speakable-summary", ".faq-answer"],
          },
          breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonicalUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
            { "@type": "ListItem", position: 2, name: "Hotels", item: `https://${SITE.domain}/hotels/` },
            { "@type": "ListItem", position: 3, name: hotel.name, item: canonicalUrl },
          ],
        },
        ...(hotel.faqs?.length > 0 ? [{
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          mainEntity: hotel.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }] : []),
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
        <Header />
        <main className="flex-1">
          <section className="relative h-[480px] bg-navy">
            {hotel.gallery?.[0] && (
              <Image
                src={hotel.gallery[0].src}
                alt={hotel.gallery[0].alt ?? hotel.name}
                fill
                className="object-cover opacity-60"
                priority
              />
            )}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
              <p className="font-ui text-sm uppercase tracking-widest text-gold mb-2">
                {hotel.city}
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-white">{hotel.name}</h1>
              <p id="speakable-summary" className="speakable-summary mt-4 max-w-2xl font-body text-lg text-white/90">
                {hotel.hook}
              </p>
            </div>
          </section>

          <section className="mx-auto max-w-4xl px-6 py-16">
            <div className="space-y-4">
              {hotel.description.map((para, i) => (
                <p key={i} className="font-body text-base text-ink leading-relaxed">{para}</p>
              ))}
            </div>

            {hotel.amenities?.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl text-navy mb-4">Amenities</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {hotel.amenities.map((a, i) => (
                    <li key={i} className="font-body text-sm text-ink flex items-start gap-2">
                      <span className="mt-1 text-gold">✓</span>{a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hotel.driveTimeToCourses?.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl text-navy mb-4">Drive Time to Courses</h2>
                <ul className="space-y-2">
                  {hotel.driveTimeToCourses.map((d, i) => (
                    <li key={i} className="font-body text-sm text-ink flex justify-between border-b border-sand pb-2">
                      <span>{d.course}</span>
                      <span className="text-ocean font-medium">{d.minutes} min</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hotel.faqs?.length > 0 && (
              <div className="mt-16 faq-section">
                <h2 className="font-display text-2xl text-navy mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {hotel.faqs.map((faq, i) => (
                    <details key={i} className="border-b border-sand pb-4">
                      <summary className="cursor-pointer font-ui text-base font-medium text-navy">
                        {faq.q}
                      </summary>
                      <p className="faq-answer mt-2 font-body text-sm text-ink leading-relaxed">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 rounded-lg bg-navy p-8 text-center">
              <h2 className="font-display text-2xl text-white mb-2">
                Include {hotel.name} in your Monterey golf trip
              </h2>
              <p className="font-body text-white/80 mb-6">
                Monterey Golf Tours pairs lodging with tee times across the peninsula.
                Get a custom quote for your group.
              </p>
              <Link
                href="/quote/"
                className="inline-block bg-gold text-navy font-ui font-semibold px-8 py-3 rounded hover:bg-gold/90 transition"
              >
                Get a Custom Quote →
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  // ── Course pages (fallthrough) ───────────────────────────────────
  if (!course) {
    return (
      <>
        <Header />
        <main className="flex-1 px-6 py-32 text-center">
          <p className="font-body text-lg text-ink">Page not found.</p>
          <Link href="/" className="mt-4 inline-block font-ui text-ocean">
            Return home &rarr;
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const livePricing = await getCoursePricing(course.slug);
  const greenFeeDisplay = livePricing?.price_label ?? course.greenFeeEst;
  // courseData from COURSES has the image field (CourseDetail doesn't)
  const courseData = COURSES.find(c => c.slug === slug);

  const nearby = course.nearbySlugs
    .map((s) => COURSES.find((c) => c.slug === s))
    .filter(Boolean);

  const canonicalUrl = `https://${SITE.domain}/golf-courses/${course.slug}/`;
  const courseImage = COURSES.find((c) => c.slug === course.slug)?.image;
  const isClosed = slug === "links-at-spanish-bay";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: isClosed
          ? `${course.name} — Closed for Renovation, Reopening April 2027`
          : `${course.name} — Tee Times & Course Info`,
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
        publisher: { "@id": `https://${SITE.domain}/#organization` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "#speakable-summary", ".faq-section"],
        },
      },
      {
        "@type": "GolfCourse",
        "@id": `${canonicalUrl}#course`,
        name: course.name,
        description: course.hook?.slice(0, 155),
        address: {
          "@type": "PostalAddress",
          streetAddress: course.address,
          addressLocality: course.city.split(",")[0].trim(),
          addressRegion: "CA",
          addressCountry: "US",
        },
        telephone: course.phone,
        url: canonicalUrl,
        numberOfHoles: course.holes,
        courseLength: course.yards,
        ...(course.rating ? { courseRating: course.rating } : {}),
        ...(course.slope ? { courseSlope: course.slope } : {}),
        ...(course.designer && course.designer !== "Unknown" ? {
          amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "Designer", value: course.designer },
            { "@type": "LocationFeatureSpecification", name: "Par", value: String(course.par) },
            { "@type": "LocationFeatureSpecification", name: "Course Type", value: course.type },
          ],
        } : {}),
        offers: {
          "@type": "Offer",
          name: "Green Fee",
          description: greenFeeDisplay,
          priceCurrency: "USD",
          availability: isClosed
            ? "https://schema.org/Discontinued"
            : "https://schema.org/InStock",
        },
        ...(courseData?.image ? {
          image: {
            "@type": "ImageObject",
            url: courseData!.image.startsWith("/")
              ? `https://${SITE.domain}${courseData!.image}`
              : `${courseData!.image}?auto=format&fit=crop&w=1200&h=800&q=85`,
            contentUrl: courseData!.image.startsWith("/")
              ? `https://${SITE.domain}${courseData!.image}`
              : `${courseData!.image}?auto=format&fit=crop&w=1200&h=800&q=85`,
            width: 1200,
            height: 800,
            name: `${courseData!.name} — Monterey Golf Tours`,
            caption: `${courseData!.name}, Monterey Peninsula, California`,
            copyrightNotice: `© ${courseData!.name}`,
            creditText: `${courseData!.name} via Monterey Golf Tours`,
            acquireLicensePage: `https://${SITE.domain}/contact/`,
            license: "https://creativecommons.org/licenses/by/4.0/",
          },
        } : {}),
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
      // Service + Product dual type — required for Google review snippet eligibility
      {
        "@type": ["Service", "Product"],
        "@id": `${canonicalUrl}#service`,
        name: `Play ${course.name} — Monterey Golf Tours`,
        description: course.hook,
        provider: { "@id": `https://${SITE.domain}/#organization` },
        brand: { "@id": `https://${SITE.domain}/#organization` },
        category: "Golf Course Booking",
        areaServed: {
          "@type": "Place",
          name: course.city,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: isClosed
            ? "https://schema.org/Discontinued"
            : "https://schema.org/InStock",
          url: `https://${SITE.domain}/quote/`,
        },
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

      <section className="relative flex min-h-[480px] flex-col bg-[#16242c] md:min-h-[600px]">
        {courseImage && (
          <Image src={courseImage} alt={course.name} fill priority className="object-cover" />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(15,25,15,.25) 0%, rgba(15,25,15,.85) 100%)" }}
        />
        <Header />
        <div className="relative z-10 mt-auto px-6 pb-10 pt-48 md:px-14 md:pb-14 md:pt-36">
          <span className="inline-block rounded-full border border-[rgba(250,246,238,.4)] bg-[rgba(20,30,15,.4)] px-3.5 py-1.5 font-ui text-[11px] font-semibold uppercase tracking-[.1em] text-cream backdrop-blur-sm">
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

      <main className="flex-1 bg-fairwaycream">
        <section className="border-b border-fairwayborder px-6 py-8 md:px-14 md:py-10">
          <div className="flex flex-wrap gap-x-10 gap-y-6 md:gap-x-14">
            {statItems.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl font-extrabold leading-none text-fairway-dark md:text-5xl">
                  {s.value}
                </div>
                <div className="mt-1.5 font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a8a6e]">
                  {s.label}
                </div>
              </div>
            ))}
            <div className="min-w-[180px] flex-1">
              <div className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a8a6e]">
                Type
              </div>
              <div className="mt-1.5 font-display text-lg font-bold text-ink">{course.type}</div>
            </div>
          </div>
        </section>

        <section className="border-b border-fairwayborder bg-white px-6 py-14 md:px-14 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.55fr_1fr] md:gap-16">
            <div>
              <p id="speakable-summary" className="pull-quote text-2xl leading-tight text-ink md:text-3xl">
                &ldquo;{course.bestFor[0]} will find this course most rewarding.&rdquo;
              </p>
              <div className="mt-6 font-body text-sm text-[#8a8a6e]">
                Designed by {course.designer}
              </div>
            </div>
            <div className="space-y-4">
              {course.description.map((p, i) => (
                <p key={i} className="font-body text-[15px] leading-relaxed text-[#3a3f2e] md:text-base">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {course.gallery && course.gallery.length > 0 && (
          <section className="border-b border-fairwayborder bg-white px-6 py-14 md:px-14 md:py-20">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
              Photos
            </h2>
            {course.gallery.some((img) => img.category)
              ? <TabbedGallery images={course.gallery} entityName={course.name} />
              : <GalleryLightbox images={course.gallery} entityName={course.name} />}
          </section>
        )}

        <section className="border-b border-fairwayborder px-6 py-14 md:px-14 md:py-20">
          <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
            Course highlights
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
            {course.highlights.map((h, i) => (
              <div key={h.label} className="flex gap-4">
                <div className="font-display text-2xl font-extrabold leading-none text-fairway">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-ui text-base font-semibold text-ink">{h.label}</div>
                  <div className="mt-1.5 font-body text-[14px] leading-relaxed text-[#5c6048]">
                    {h.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {course.pointers && (
          <section className="border-b border-fairwayborder bg-white px-6 py-14 md:px-14 md:py-20">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
              Worth knowing
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {course.pointers.map((p) => (
                <div key={p} className="flex gap-3 rounded-xl border border-fairwayborder bg-fairwaycream p-4">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-fairway" />
                  <p className="font-body text-[14px] leading-relaxed text-[#3a3f2e]">{p}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="border-b border-fairwayborder px-6 py-14 md:px-14 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <div className="font-ui text-sm font-bold uppercase tracking-[.08em] text-fairway-dark">
                Best for
              </div>
              <ul className="mt-3 space-y-2 font-body text-[15px] text-[#3a3f2e]">
                {course.bestFor.map((b) => (
                  <li key={b}>&middot; {b}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-ui text-sm font-bold uppercase tracking-[.08em] text-[#a85561]">
                Less ideal if
              </div>
              <ul className="mt-3 space-y-2 font-body text-[15px] text-[#3a3f2e]">
                {course.lessIdealIf.map((b) => (
                  <li key={b}>&middot; {b}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-fairwayborder bg-white px-6 py-10 md:px-14 md:py-14">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <PracticalItem label="Green fee" value={`${greenFeeDisplay} (verify current rates)`} />
            <PracticalItem label="Address" value={course.address} />
            <PracticalItem label="Phone" value={course.phone} />
            <PracticalItem label="Website" value={course.website} />
          </dl>
        </section>

        {nearby.length > 0 && (
          <section className="border-b border-fairwayborder px-6 py-14 md:px-14 md:py-20">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
              Nearby courses
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {nearby.map((c) =>
                c ? (
                  <Link
                    key={c.slug}
                    href={`/golf-courses/${c.slug}/`}
                    className="group overflow-hidden rounded-2xl border border-[#e3ddcf] bg-white shadow-[0_3px_12px_rgba(37,35,33,.08)] transition-all hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(37,35,33,.15)]"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-[#e8e4da]">
                      {c.image && (
                        <Image src={c.image} alt={c.name} fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 33vw" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,20,18,.4)] to-transparent" />
                      <span className="absolute left-3 bottom-3 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-[.07em] text-white">
                        {c.type.split("/")[0].trim()}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="font-display text-base font-bold leading-snug text-ink group-hover:text-ocean transition-colors">{c.name}</div>
                      <div className="mt-1 font-body text-[12.5px] text-[#6a665e]">Par {c.par} · {c.yards} · {c.city.split(",")[0]}</div>
                      <p className="mt-2 line-clamp-2 font-body text-[12px] leading-relaxed text-[#7a7670]">{c.hook}</p>
                      <div className="mt-3 flex items-center gap-1 font-ui text-[12.5px] font-semibold text-ocean">
                        View course
                        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </section>
        )}

        {/* Closest hotels — proximity cards */}
        <section className="border-b border-fairwayborder px-6 py-14 md:px-14 md:py-20">
          <CourseHotels courseSlug={slug} courseName={course.name} />
        </section>

        {/* Live cams — PBGL only */}
        {slug === "pebble-beach-golf-links" && (
          <PBGLLiveCams />
        )}

        {/* Hub page crosslink — PBGL only */}
        {slug === "pebble-beach-golf-links" && (
          <div className="border-b border-fairwayborder bg-[#faf7f2] px-6 py-5 md:px-14">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-body text-[14px] text-[#5a5448]">
                Planning a Pebble Beach trip for your group?
              </p>
              <Link href="/pebble-beach/" className="flex-none font-ui text-[13px] font-bold text-fairway hover:underline">
                View Pebble Beach packages →
              </Link>
            </div>
          </div>
        )}

        {/* Tournaments You Can Play — PBGL only */}
        {slug === "pebble-beach-golf-links" && (
          <PBGLTournaments />
        )}

        {/* Majors banner — PBC courses: PBGL, Spyglass, Del Monte, The Hay */}
        {["pebble-beach-golf-links","spyglass-hill","del-monte-golf-course","the-hay"].includes(slug) && (
          <PBCMajorsBanner />
        )}

        {/* Events calendar — PBGL only (golf tier) */}
        {slug === "pebble-beach-golf-links" && (
          <PBCEvents
            tiers={["golf"]}
            title="Upcoming events at Pebble Beach Golf Links®"
            subtitle="Plan your round around what's happening on the course."
          />
        )}

        {/* Car Week banner — shows Aug 1-20 only, Bayonet + Black Horse */}
        {(slug === "bayonet" || slug === "black-horse") && (
          <div className="px-6 pt-6 md:px-14">
            <CarWeekBanner />
          </div>
        )}

        {/* Monday Insider — TPC Pasadera only */}
        {slug === "club-at-pasadera" && (
          <section className="border-b border-fairwayborder px-6 py-14 md:px-14 md:py-20">
            <MondayInsider />
          </section>
        )}

        {/* Poppy Hills value block */}
        {slug === "poppy-hills" && (
          <section className="border-b border-fairwayborder bg-white px-6 py-14 md:px-14 md:py-20">
            <PoppyHillsValue />
          </section>
        )}

        <section className="relative overflow-hidden border-b border-fairwayborder bg-white px-6 py-14 md:px-14 md:py-20 faq-section">
          <div className="pointer-events-none absolute inset-0 text-fairway opacity-[0.05]">
            <Image src="/art/patterns/faq-bg.svg" alt="" fill className="object-cover" />
          </div>
          <div className="relative">
            <h2 className="text-display-md mb-8 font-display font-bold text-ink md:mb-10">
              Common questions
            </h2>
            <div className="max-w-[800px] divide-y divide-fairwayborder border-t border-fairwayborder">
              {course.faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-ui text-base font-semibold text-ink">
                    {f.q}
                    <span className="font-display text-xl text-fairway group-open:hidden">+</span>
                    <span className="hidden font-display text-xl text-fairway group-open:inline">&minus;</span>
                  </summary>
                  <p className="mt-3 max-w-[700px] font-body text-[15px] leading-relaxed text-[#4a4f3c]">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {isClosed ? (
          <section className="px-6 py-14 md:px-14 md:py-20">
            <SpanishBayWaitlist />
          </section>
        ) : (
          <section className="px-6 py-16 text-center md:px-14 md:py-20">
            <h2 className="text-display-md font-display font-bold text-ink">
              Play {course.name} as part of a planned trip
            </h2>
            <Link
              href="/packages/"
              className="mt-7 inline-block rounded-[9px] bg-fairway px-7 py-4 font-ui text-base font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-fairway-dark"
            >
              View packages &rarr;
            </Link>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

function PracticalItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-ui text-[11px] font-semibold uppercase tracking-[.06em] text-[#8a8a6e]">
        {label}
      </dt>
      <dd className="mt-1.5 font-body text-[15px] text-ink">{value}</dd>
    </div>
  );
}
