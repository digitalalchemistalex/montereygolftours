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
      <section className="relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-[#16242c] px-6 pb-6 md:min-h-[340px] md:px-14 md:pb-8">
        <Image src="/art/faq-hero.svg" alt="" fill priority className="object-cover" />
        <Header />
        <div className="relative z-10">
          <h1 className="sr-only">Frequently asked questions</h1>
          <p className="max-w-[600px] rounded-lg bg-[rgba(255,255,255,.55)] px-4 py-2 font-body text-base leading-relaxed text-[#2A2620] backdrop-blur-sm md:text-lg">
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
