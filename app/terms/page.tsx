import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use | Monterey Golf Tours",
  description: "Terms governing use of the Monterey Golf Tours website and services.",
  alternates: {
    canonical: `https://${SITE.domain}/terms/`,
  },
};

export default function TermsPage() {
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
            Terms of Use
          </h1>
        </div>
      </section>

      <main className="flex-1 px-6 py-14 md:px-14 md:py-20">
        <div className="mx-auto max-w-[720px] space-y-6">
          <p className="rounded-lg border border-[#e8b876] bg-[#fdf3e2] px-4 py-3 font-body text-[13px] leading-relaxed text-[#6a5528]">
            Draft placeholder — this page has not been reviewed by legal counsel. Confirm
            the terms below reflect actual business practices before this page goes live.
          </p>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">About this site</h2>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-[#4a463f]">
              montereygolftours.com is operated by Monterey Golf Tours, a golf trip
              planning service founded by Sean Schaeffer. By using this site, you agree
              to these terms.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">What we do</h2>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-[#4a463f]">
              We plan custom multi-day golf trips on the Monterey Peninsula, coordinating
              course tee times, lodging, and logistics. Pricing shown on this site is
              estimated and subject to change based on course, hotel, and date
              availability at the time of booking. A custom quote is required before any
              trip is confirmed.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">Trademarks</h2>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-[#4a463f]">
              Pebble Beach®, Pebble Beach Resorts®, Pebble Beach Golf Links®, The Links at
              Spanish Bay™, Spyglass Hill® Golf Course, Del Monte Golf Course®, and their
              underlying distinctive images are trademarks, service marks, and trade
              dress of Pebble Beach Company. Used with permission.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">Accuracy of information</h2>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-[#4a463f]">
              We work to keep course, hotel, and pricing information accurate and
              up to date, but details can change. Always confirm current rates and
              availability at the time of booking.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">Contact us</h2>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-[#4a463f]">
              Questions about these terms can be directed to {SITE.email ?? "our contact page"}.
            </p>
          </div>

          <p className="font-body text-[13px] text-[#8a857a]">
            Last updated: June 2026.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
