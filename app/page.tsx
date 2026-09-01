import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import Hero from "@/components/Hero";
import HeroCentered from "@/components/HeroCentered";
import Configurator from "@/components/Configurator";
import PebbleBeachSection from "@/components/PebbleBeachSection";
import Courses from "@/components/Courses";
import Packages from "@/components/Packages";
import Itinerary from "@/components/Itinerary";
import Hotels from "@/components/Hotels";
import LocalIntel from "@/components/LocalIntel";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://montereygolftours.com/",
  },
};

const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://montereygolftours.com/#webpage",
      url: "https://montereygolftours.com/",
      name: "Monterey Golf Tours — Private Group Golf Trips on the Monterey Peninsula",
      description: "Plan a private group golf trip to the Monterey Peninsula. Courses, lodging, and tee times handled end to end.",
      isPartOf: { "@id": "https://montereygolftours.com/#website" },
      about: { "@id": "https://montereygolftours.com/#organization" },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".speakable-summary", "#speakable-summary"],
      },
    },
    {
      "@type": "TravelAgency",
      "@id": "https://montereygolftours.com/#travelagency",
      name: "Monterey Golf Tours",
      url: "https://montereygolftours.com",
      description: "Custom Monterey Peninsula golf trips planned end to end. Tee times, lodging, and logistics for groups of 2–300 players. IAGTO-contracted partner with Pebble Beach Resorts®.",
      telephone: "(888) 584-8232",
      email: "info@montereygolftours.com",
      priceRange: "$$$$",
      areaServed: {
        "@type": "Place",
        name: "Monterey Peninsula, California",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "2700 Mill St Suite 800",
        addressLocality: "Reno",
        addressRegion: "NV",
        postalCode: "89502",
        addressCountry: "US",
      },
      founder: {
        "@type": "Person",
        name: "Sean Schaeffer",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <main className="flex-1">
        {/* HeroCentered = new large-logo, PBC-mood-inspired hero (Raza trial, Aug 2026).
            To revert: swap <HeroCentered /> back to <Hero />, both kept in the codebase. */}
        <HeroCentered />
        <Configurator />
        <PebbleBeachSection />
        <Courses />
        <Packages />
        <Itinerary />
        <Hotels />
        <LocalIntel />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

