import type { Metadata } from "next";
import Link from "next/link";
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

export default function BlogIndexPage() {
  const posts = Object.values(BLOG_POSTS).sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );

  return (
    <>
      <section className="relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-[#16242c] px-6 pb-10 md:min-h-[340px] md:px-14 md:pb-12">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.4) 0%, rgba(22,36,44,.82) 100%)" }}
        />
        <Header />
        <div className="relative z-10">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]">
            Trip planning guides
          </h1>
          <p className="mt-3 max-w-[600px] font-body text-base leading-relaxed text-[rgba(250,246,238,.85)] md:text-lg">
            Course breakdowns, seasonal advice, and planning guides for golfing the
            Monterey Peninsula.
          </p>
        </div>
      </section>

      <main className="flex-1 px-6 py-10 md:px-14 md:py-12">
        <div className="mx-auto grid max-w-[920px] grid-cols-1 gap-5 sm:grid-cols-2">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}/`}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[#e3ddcf] bg-white p-5 shadow-[0_3px_11px_rgba(37,35,33,.06)] transition-transform duration-150 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(37,35,33,.12)]"
            >
              <div>
                <span className="font-ui text-[11px] font-bold uppercase tracking-[.08em] text-gold">
                  {p.category}
                </span>
                <div className="mt-2 font-display text-lg font-bold leading-snug text-ink">
                  {p.title}
                </div>
                <p className="mt-2 font-body text-[13px] leading-relaxed text-[#5a564e]">
                  {p.intro}
                </p>
              </div>
              <div className="mt-4 font-ui text-sm font-semibold text-ocean">
                Read more &rarr;
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
