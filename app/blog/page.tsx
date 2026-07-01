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
        <div className="relative z-10 pt-20 md:pt-0">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]">
            Trip planning guides
          </h1>
          <p className="mt-3 max-w-[600px] font-body text-base leading-relaxed text-[rgba(250,246,238,.85)] md:text-lg">
            Course breakdowns, seasonal advice, and planning guides for golfing the
            Monterey Peninsula.
          </p>
        </div>
      </section>

      <main className="flex-1 px-6 py-16 md:px-14 md:py-24">
        <div className="mx-auto flex max-w-[1040px] flex-wrap justify-center gap-x-10 gap-y-14">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="group flex w-[260px] flex-col items-center text-center">
              <div className="relative aspect-square w-full max-w-[260px] overflow-hidden rounded-full shadow-[0_10px_28px_rgba(30,40,38,.2)] transition-transform duration-200 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_40px_rgba(30,40,38,.3)]">
                <Image
                  src={p.cardImage}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="260px"
                />
              </div>
              <div
                className="mt-4 text-[26px] leading-none text-ink"
                style={{ fontFamily: "'Pacifico', cursive" }}
              >
                {p.cardTitle}
              </div>
              <span className="mt-2 font-ui text-[11px] font-bold uppercase tracking-[.08em] text-gold">
                {p.category}
              </span>
              <div className="mt-3 font-ui text-sm font-semibold text-ocean group-hover:text-ocean-dark">
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
