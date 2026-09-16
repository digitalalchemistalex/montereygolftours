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
      <section className="relative flex min-h-[420px] flex-col justify-end bg-[#16242c] px-6 pb-10 md:min-h-[520px] md:px-14 md:pb-12">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.4) 0%, rgba(22,36,44,.82) 100%)" }}
        />
        <Header />
        <div className="relative z-10 pt-44 md:pt-32">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]">
            Privacy Policy
          </h1>
        </div>
      </section>

      <main className="flex-1 px-6 py-14 md:px-14 md:py-20">
        <div className="mx-auto max-w-[720px] space-y-8 font-body text-[15px] leading-relaxed text-[#4a463f]">

          <p className="text-[13px] text-[#8a857a]">Last updated: September 2026</p>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">Information we collect</h2>
            <p className="mt-2">
              When you submit a quote request, we collect your name, email address,
              phone number (if provided), group size, travel dates, budget range,
              course preferences, and any message you include. This information is
              used only to prepare and follow up on your trip quote.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">Analytics</h2>
            <p className="mt-2">
              This site uses Google Analytics 4 (GA4) via Google Tag Manager to
              understand how visitors use the site. GA4 collects anonymized data
              including pages visited, time on site, device type, and general
              geographic region (country/state level). We do not collect precise
              location data. GA4 data is processed by Google under their{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean underline hover:text-ocean-dark"
              >
                Privacy Policy
              </a>
              . IP anonymization is enabled. You can opt out of Google Analytics
              tracking by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean underline hover:text-ocean-dark"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">How we use your information</h2>
            <p className="mt-2">
              We use information you submit to respond to your trip inquiry and
              plan your itinerary. We do not sell, rent, or share your personal
              information with third parties for their own marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">Data storage</h2>
            <p className="mt-2">
              Quote form submissions are stored securely in our database and are
              accessible only to Monterey Golf Tours staff. Email correspondence
              is handled via Resend, a transactional email provider.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">California residents — Your privacy rights (CCPA)</h2>
            <p className="mt-2">
              If you are a California resident, you have the following rights under
              the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>The right to know what personal information we collect and how it is used</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to opt out of the sale or sharing of your personal information</li>
              <li>The right to non-discrimination for exercising your privacy rights</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal information. The analytics data collected
              via Google Analytics is used solely for understanding site performance
              and is not sold to third parties. To exercise your rights or request
              deletion of your data, contact us at{" "}
              <a href={`mailto:${SITE.email}`} className="text-ocean underline hover:text-ocean-dark">
                {SITE.email}
              </a>
              .
            </p>
          </div>

          <div id="do-not-sell">
            <h2 className="font-display text-xl font-bold text-ink">Do Not Sell or Share My Personal Information</h2>
            <p className="mt-2">
              Monterey Golf Tours does not sell or share your personal information
              with third parties for cross-context behavioral advertising. If you
              have questions or wish to exercise your opt-out rights, contact us at{" "}
              <a href={`mailto:${SITE.email}`} className="text-ocean underline hover:text-ocean-dark">
                {SITE.email}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">Contact</h2>
            <p className="mt-2">
              Questions about this policy:{" "}
              <a href={`mailto:${SITE.email}`} className="text-ocean underline hover:text-ocean-dark">
                {SITE.email}
              </a>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
