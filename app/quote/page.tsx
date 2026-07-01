import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Custom Golf Trip Quote | Monterey Golf Tours",
  description:
    "Tell us your group size, dates, and budget, and we'll put together a custom Monterey Peninsula golf trip quote within 24 hours.",
  alternates: {
    canonical: `https://${SITE.domain}/quote/`,
  },
};

export default function QuotePage() {
  return (
    <>
      <section className="relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-[#16242c] px-6 pb-10 md:min-h-[320px] md:px-14 md:pb-12">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.4) 0%, rgba(22,36,44,.82) 100%)" }}
        />
        <Header />
        <div className="relative z-10 pt-20 md:pt-0">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]">
            Get a custom golf trip quote
          </h1>
          <p className="mt-3 max-w-[600px] font-body text-base leading-relaxed text-[rgba(250,246,238,.85)] md:text-lg">
            Tell us about your group and we&apos;ll put together a trip — courses, lodging,
            and a price range — within 24 hours.
          </p>
        </div>
      </section>

      <main className="flex-1 px-6 py-10 md:px-14 md:py-12">
        <div className="mx-auto max-w-[760px]">
          <QuoteForm />
          <p className="mt-6 text-center font-body text-[13px] text-[#8a857a]">
            Prefer to talk it through? Call us at{" "}
            <a href={SITE.phoneHref} className="text-ocean">
              {SITE.phone}
            </a>
            .
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
