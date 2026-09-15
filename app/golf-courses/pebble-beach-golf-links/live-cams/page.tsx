import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";
import PBGLLiveCams from "@/components/PBGLLiveCams";

const UTM =
  "utm_source=montereygolftours&utm_medium=referral&utm_campaign=live-cams&utm_content=landing-cta";

export const metadata: Metadata = {
  title:
    "Pebble Beach Golf Links Live Cam — Watch the Course Live | Monterey Golf Tours",
  description:
    "Watch Pebble Beach Golf Links live — four cameras on the 18th green, 17th green, 1st tee, and practice putting green. Then plan your own round with Monterey Golf Tours.",
  alternates: {
    canonical: `https://${SITE.domain}/golf-courses/pebble-beach-golf-links/live-cams/`,
  },
  openGraph: {
    type: "website",
    title: "Pebble Beach Golf Links Live Cams | Monterey Golf Tours",
    description:
      "Live cameras on the 18th green, 17th green, 1st tee, and putting green at Pebble Beach Golf Links. Watch, then book your round.",
    url: `https://${SITE.domain}/golf-courses/pebble-beach-golf-links/live-cams/`,
    images: [
      {
        url: `https://${SITE.domain}/images/pbc-portal/pbgl-18th-hole-aerial.jpg`,
        width: 1200,
        height: 800,
        alt: "Pebble Beach Golf Links 18th hole",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pebble Beach Golf Links Live Cams | Monterey Golf Tours",
    description:
      "Live cameras on the 18th green, 17th green, 1st tee, and putting green. Watch, then book your round.",
  },
};

export default function PBGLLiveCamsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#0f1e14]">

        {/* Breadcrumb */}
        <div className="border-b border-[rgba(250,246,238,.08)] px-6 py-3 md:px-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 font-ui text-[12px] text-[rgba(250,246,238,.45)]">
              <li><Link href="/" className="hover:text-cream">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/golf-courses/" className="hover:text-cream">Golf Courses</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/golf-courses/pebble-beach-golf-links/" className="hover:text-cream">Pebble Beach Golf Links®</Link></li>
              <li aria-hidden="true">›</li>
              <li className="text-[rgba(250,246,238,.7)]">Live Cams</li>
            </ol>
          </nav>
        </div>

        {/* Hero text — compact, no image (cams are the visual) */}
        <div className="px-6 pb-0 pt-12 md:px-14 md:pt-16">
          <div className="mb-2 flex items-center gap-3">
            <span className="inline-block rounded-full bg-gold/20 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[.12em] text-gold">
              Pebble Beach Golf Links®
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-red-600/80 px-2.5 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              <span className="font-ui text-[10px] font-bold uppercase tracking-[.06em] text-white">Live</span>
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-cream md:text-5xl">
            Watch Pebble Beach<br className="hidden md:block" /> Golf Links — live
          </h1>
          <p className="mt-4 max-w-2xl font-body text-[16px] leading-relaxed text-[rgba(250,246,238,.7)]">
            Four live cameras on the course, courtesy of Pebble Beach Resorts®. Watch the action on
            the 18th green, 17th green, 1st tee, and practice putting green — then start planning
            your own round.
          </p>
        </div>

        {/* Cam grid component */}
        <div className="mt-10">
          <PBGLLiveCams />
        </div>

        {/* CTA — play the course */}
        <section className="px-6 py-16 text-center md:px-14 md:py-20">
          <h2 className="font-display text-3xl font-bold text-cream md:text-4xl">
            Ready to play these holes yourself?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-[15px] text-[rgba(250,246,238,.65)]">
            As an IAGTO-member Authorized Pebble Beach Resorts® Golf Travel Operator, we handle
            tee times, accommodation, transfers, and everything in between. Groups of{" "}
            {SITE.minGroupSize}–{SITE.maxGroupSize} players.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/quote/"
              className="inline-block rounded-[9px] bg-gold px-8 py-4 font-ui text-[15px] font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#e6b82a]"
            >
              Get a custom quote →
            </Link>
            <Link
              href="/golf-courses/pebble-beach-golf-links/"
              className="inline-block rounded-[9px] border border-[rgba(250,246,238,.25)] px-8 py-4 font-ui text-[15px] font-semibold text-cream transition-colors hover:border-[rgba(250,246,238,.5)]"
            >
              Course details
            </Link>
          </div>
          <p className="mt-5 font-body text-[12px] text-[rgba(250,246,238,.35)]">
            Pebble Beach Golf Links® stay typically requires a 3-night minimum.{" "}
            <a
              href={`https://www.pebblebeach.com/plan-my-trip/?${UTM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[rgba(250,246,238,.6)]"
            >
              Book direct with PBR
            </a>{" "}
            for individual tee times.
          </p>
        </section>

      </main>
      <Footer />
    </>
  );
}
