import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Monterey Golf Trip Planning Blog | Monterey Golf Tours",
  description:
    "Trip planning guides, course breakdowns, and seasonal advice for golfing the Monterey Peninsula.",
  alternates: {
    canonical: `https://${SITE.domain}/blog/`,
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Trip Planning": "bg-ocean text-cream",
  "Course Guides": "bg-[#2e6b44] text-cream",
  "Best Of": "bg-gold text-ink",
};

export default function BlogIndexPage() {
  const posts = Object.values(BLOG_POSTS).sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );

  const [featured, ...rest] = posts;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[380px] flex-col justify-end overflow-hidden bg-[#16242c] md:min-h-[520px]">
        <Image
          src="https://images.unsplash.com/photo-1443706340763-4b60757a36ce?auto=format&fit=crop&w=2400&q=90"
          alt="Coastal golf course at dawn"
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.25) 0%, rgba(22,36,44,.78) 100%)" }}
        />
        <Header />
        <div className="relative z-10 px-6 pb-12 pt-40 md:px-14 md:pb-16 md:pt-64">
          <p className="mb-3 font-ui text-[11px] font-bold uppercase tracking-[.1em] text-gold">
            Monterey Golf Tours
          </p>
          <h1 className="font-display text-[36px] font-extrabold leading-[1.05] text-cream md:text-[54px]">
            Trip planning<br />guides &amp; course intel
          </h1>
          <p className="mt-4 max-w-[560px] font-body text-base leading-relaxed text-[rgba(250,246,238,.8)] md:text-lg">
            Seasonal advice, course breakdowns, and everything you need to plan a
            Monterey Peninsula golf trip.
          </p>
        </div>
      </section>

      <main className="flex-1 px-6 py-14 md:px-14 md:py-20">
        <div className="mx-auto max-w-[1100px]">

          {/* Featured post — full-width card */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}/`}
              className="group mb-14 flex flex-col overflow-hidden rounded-2xl border border-[#e3ddcf] bg-white shadow-[0_4px_20px_rgba(37,35,33,.08)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,35,33,.14)] md:mb-16 md:flex-row"
            >
              <div className="relative h-56 flex-none overflow-hidden md:h-auto md:w-[44%]">
                <Image
                  src={featured.cardImage}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 44vw"
                />
              </div>
              <div className="flex flex-col justify-center p-7 md:p-10">
                <span
                  className={`mb-4 inline-block self-start rounded-full px-3 py-1 font-ui text-[11px] font-bold uppercase tracking-[.06em] ${CATEGORY_COLORS[featured.category] ?? "bg-[#e3ddcf] text-ink"}`}
                >
                  {featured.category}
                </span>
                <h2 className="font-display text-2xl font-bold leading-snug text-ink md:text-[32px]">
                  {featured.title}
                </h2>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-[#5a564e] md:text-base line-clamp-3">
                  {featured.intro}
                </p>
                <div className="mt-6 flex items-center gap-2 font-ui text-sm font-semibold text-ocean">
                  Read guide
                  <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            </Link>
          )}

          {/* Remaining posts — card grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}/`}
                  className="group overflow-hidden rounded-2xl border border-[#e3ddcf] bg-white shadow-[0_2px_8px_rgba(37,35,33,.06)] transition-all hover:-translate-y-1.5 hover:shadow-[0_10px_28px_rgba(37,35,33,.13)]"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={p.cardImage}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <span
                      className={`mb-3 inline-block rounded-full px-2.5 py-0.5 font-ui text-[10px] font-bold uppercase tracking-[.06em] ${CATEGORY_COLORS[p.category] ?? "bg-[#e3ddcf] text-ink"}`}
                    >
                      {p.category}
                    </span>
                    <h2 className="font-display text-base font-bold leading-snug text-ink">
                      {p.title}
                    </h2>
                    <p className="mt-2 font-body text-[13px] leading-relaxed text-[#6a665e] line-clamp-2">
                      {p.intro}
                    </p>
                    <div className="mt-4 flex items-center gap-1 font-ui text-sm font-semibold text-ocean">
                      Read guide
                      <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-[#16242c] px-8 py-10 text-center md:mt-20 md:px-14 md:py-14">
            <h2 className="font-display text-2xl font-bold text-cream md:text-[32px]">
              Ready to plan your trip?
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] font-body text-[15px] leading-relaxed text-[rgba(250,246,238,.8)]">
              Browse our itineraries or get a custom quote — we handle the tee times, lodging, and logistics.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/itineraries/"
                className="rounded-[9px] bg-gold px-6 py-3.5 font-ui text-base font-semibold text-ink hover:bg-[#e6b82a]"
              >
                Browse itineraries
              </Link>
              <Link
                href="/quote/"
                className="rounded-[9px] border border-[rgba(250,246,238,.3)] px-6 py-3.5 font-ui text-base font-semibold text-cream hover:border-[rgba(250,246,238,.6)]"
              >
                Get a custom quote
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
