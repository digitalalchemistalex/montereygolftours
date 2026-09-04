import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PHOTOGRAPHERS, PHOTOGRAPHER_SLUGS } from "@/lib/photographers";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PHOTOGRAPHER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = PHOTOGRAPHERS[slug];
  if (!p) return {};
  return {
    title: `${p.name} | Pebble Beach Photographer | Monterey Golf Tours`,
    description: `${p.name} — licensed Pebble Beach Company photographer. ${p.bio.slice(0, 120)}`,
    alternates: { canonical: `https://${SITE.domain}/photography/${slug}/` },
    openGraph: {
      title: `${p.name} | Pebble Beach Photographer`,
      description: p.bio,
      url: `https://${SITE.domain}/photography/${slug}/`,
      siteName: "Monterey Golf Tours",
      type: "profile",
    },
    twitter: { card: "summary_large_image", title: `${p.name} | Pebble Beach Photographer | Monterey Golf Tours` },
  };
}

export default async function PhotographerPage({ params }: Props) {
  const { slug } = await params;
  const p = PHOTOGRAPHERS[slug];

  if (!p) {
    return (
      <>
        <Header />
        <main className="flex-1 px-6 py-32 text-center">
          <p className="font-body text-lg text-ink">Photographer not found.</p>
          <Link href="/photography/" className="mt-4 inline-block font-ui text-ocean">
            View all photographers →
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const canonicalUrl = `https://${SITE.domain}/photography/${slug}/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${p.name} — Licensed Photography | Monterey Golf Tours`,
        isPartOf: { "@id": `https://${SITE.domain}/#website` },
        publisher: { "@id": `https://${SITE.domain}/#organization` },
      },
      {
        "@type": "Person",
        "@id": `${canonicalUrl}#person`,
        name: p.name,
        jobTitle: "Photographer",
        description: p.bio,
        ...(p.worksFor ? { worksFor: { "@type": "Organization", name: p.worksFor } } : {}),
        image: p.images.map((img) => ({
          "@type": "ImageObject",
          url: `https://${SITE.domain}${img.src}`,
          name: img.caption,
          caption: img.caption,
          creditText: p.creditLine,
          copyrightNotice: "© Pebble Beach Company",
          creator: { "@type": "Person", name: p.name },
          contentLocation: { "@type": "Place", name: "Pebble Beach, CA" },
          acquireLicensePage: `https://${SITE.domain}/contact/`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#images`,
        name: `${p.name} — Pebble Beach Photography`,
        numberOfItems: p.images.length,
        itemListElement: p.images.map((img, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: img.caption,
          image: `https://${SITE.domain}${img.src}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` },
          { "@type": "ListItem", position: 2, name: "Photography", item: `https://${SITE.domain}/photography/` },
          { "@type": "ListItem", position: 3, name: p.name, item: canonicalUrl },
        ],
      },
    ],
  };

  const subjects = Array.from(new Set(p.images.map((img) => img.subject)));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />

      <main className="flex-1">
        <section className="border-b border-[#e3ddcf] bg-white px-6 py-14 md:px-14 md:py-16">
          <nav className="mb-6 font-ui text-[12px] text-[#8a8a6e]">
            <Link href="/photography/" className="hover:text-ink">Photography</Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{p.name}</span>
          </nav>
          <h1 className="font-display text-[32px] font-bold text-ink md:text-[44px]">
            {p.name}
          </h1>
          {p.worksFor && (
            <div className="mt-1 font-ui text-[13px] text-[#8a8a6e]">{p.worksFor}</div>
          )}
          <p className="mt-4 max-w-[700px] font-body text-[15px] leading-relaxed text-[#5a564e]">
            {p.bio}
          </p>
          <div className="mt-4 inline-block rounded-full border border-[#e3ddcf] bg-[#f4f0e7] px-4 py-1.5 font-ui text-[12px] font-semibold text-[#5a564e]">
            Credit: {p.creditLine}
          </div>
        </section>

        {subjects.map((subject) => {
          const subjectImages = p.images.filter((img) => img.subject === subject);
          return (
            <section key={subject} className="border-b border-[#e3ddcf] px-6 py-12 md:px-14 md:py-16">
              <h2 className="mb-6 font-display text-xl font-bold text-ink md:text-2xl">
                {subject}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subjectImages.map((img) => (
                  <figure key={img.src} className="overflow-hidden rounded-xl border border-[#e3ddcf]">
                    <div className="relative h-52 w-full bg-[#e8e4da]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <figcaption className="p-3">
                      <p className="font-body text-[13px] leading-snug text-[#5a564e]">
                        {img.caption}
                      </p>
                      <p className="mt-1.5 font-ui text-[10px] text-[#8a8a6e]">
                        {p.creditLine} · © Pebble Beach Company
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          );
        })}

        <section className="px-6 py-10 md:px-14">
          <Link href="/photography/" className="font-ui text-[14px] font-semibold text-ocean hover:text-ocean-dark">
            ← All photographers
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
