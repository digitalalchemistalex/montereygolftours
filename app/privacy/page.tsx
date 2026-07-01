import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Monterey Golf Tours",
  description: "How Monterey Golf Tours collects, uses, and protects your information.",
  alternates: {
    canonical: `https://${SITE.domain}/privacy/`,
  },
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
        </div>
      </section>

      <main className="flex-1 px-6 py-14 md:px-14 md:py-20">
        <div className="mx-auto max-w-[720px] space-y-6">
          <p className="rounded-lg border border-[#e8b876] bg-[#fdf3e2] px-4 py-3 font-body text-[13px] leading-relaxed text-[#6a5528]">
            Draft placeholder — this page has not been reviewed by legal counsel. Confirm
            the details below reflect actual data practices before this page goes live.
          </p>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">Information we collect</h2>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-[#4a463f]">
              When you submit a quote request through this site, we collect your name,
              email address, phone number (if provided), group size, travel dates,
              budget range, course preferences, and any message you include. This
              information is used only to prepare and follow up on your trip quote.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">How we use it</h2>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-[#4a463f]">
              We use the information you submit to contact you about your trip request
              and to plan your itinerary. We do not sell your personal information to
              third parties.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">Data storage</h2>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-[#4a463f]">
              Quote form submissions are stored securely in our database and are
              accessible only to Monterey Golf Tours staff.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">Contact us</h2>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-[#4a463f]">
              Questions about this policy can be directed to {SITE.email ?? "our contact page"}.
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
