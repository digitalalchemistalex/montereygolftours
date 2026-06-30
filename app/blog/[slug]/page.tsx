import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];
  if (!post) return {};

  return {
    title: `${post.title} | Monterey Golf Tours`,
    description: post.intro.slice(0, 155),
    alternates: {
      canonical: `https://${SITE.domain}/blog/${post.slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    return (
      <>
        <Header />
        <main className="flex-1 px-6 py-32 text-center">
          <p className="font-body text-lg text-ink">Post not found.</p>
          <Link href="/blog/" className="mt-4 inline-block font-ui text-ocean">
            View all posts &rarr;
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const canonicalUrl = `https://${SITE.domain}/blog/${post.slug}/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${post.title} | Monterey Golf Tours`,
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
      },
      {
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#post`,
        headline: post.title,
        description: post.intro,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        author: { "@type": "Organization", name: SITE.name },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `https://${SITE.domain}/blog/` },
          { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
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

      <section className="border-b border-[#e3ddcf] bg-[#16242c] px-6 py-12 md:px-14">
        <Header />
      </section>

      <main className="flex-1 px-6 py-10 md:px-14 md:py-12">
        <div className="mx-auto max-w-[720px]">
          <span className="font-ui text-[12px] font-bold uppercase tracking-[.1em] text-gold">
            {post.category}
          </span>
          <h1 className="mt-2 font-display text-[28px] font-bold leading-[1.15] text-ink md:text-[40px]">
            {post.title}
          </h1>
          <p className="mt-4 font-body text-[16px] leading-relaxed text-[#4a463f] md:text-[17px]">
            {post.intro}
          </p>

          <div className="mt-8 space-y-7">
            {post.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {s.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="font-body text-[15px] leading-relaxed text-[#4a463f] md:text-base"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {post.takeaways && (
            <div className="mt-8 rounded-2xl border border-[#e3ddcf] bg-[#f4f0e7] p-6">
              <div className="font-display text-lg font-bold text-ink">Key takeaways</div>
              <ul className="mt-3 space-y-2 font-body text-[14px] text-[#4a463f]">
                {post.takeaways.map((t) => (
                  <li key={t}>&middot; {t}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 border-t border-[#e4e0d6] pt-6">
            <div className="font-ui text-[12px] font-semibold uppercase tracking-[.06em] text-[#8a857a]">
              Related
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              {post.internalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full border border-[#e3ddcf] bg-white px-4 py-2 font-ui text-[13px] font-semibold text-ocean hover:border-ocean"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/quote/"
              className="inline-block rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream hover:bg-ocean-dark"
            >
              Plan your Monterey golf trip &rarr;
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
