import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Monterey Golf Tours",
  description:
    "Common questions about planning a Monterey Peninsula golf trip — group sizes, Pebble Beach Resorts® access, timing, and how the quote process works.",
  alternates: {
    canonical: `https://${SITE.domain}/faq/`,
  },
};

export default function FAQPage() {
  return (
    <>
      <section className="relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-[#16242c] px-6 pb-10 md:min-h-[340px] md:px-14 md:pb-12">
        <Image src="/art/faq-hero.svg" alt="" fill priority className="object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(30,30,38,.1) 0%, rgba(30,30,38,.55) 100%)" }}
        />
        <Header />
        <div className="relative z-10">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-ink md:text-[48px]">
            Frequently asked questions
          </h1>
          <p className="mt-3 max-w-[600px] font-body text-base leading-relaxed text-[#3a362e] md:text-lg">
            Common questions about planning a Monterey Peninsula golf trip.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
