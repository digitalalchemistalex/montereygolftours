import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroCentered from "@/components/HeroCentered";
import Configurator from "@/components/Configurator";
import PebbleBeachSection from "@/components/PebbleBeachSection";
import Courses from "@/components/Courses";
import Footer from "@/components/Footer";

// Below-fold sections — lazy loaded to reduce initial JS bundle
const Packages  = dynamic(() => import("@/components/Packages"));
const Itinerary = dynamic(() => import("@/components/Itinerary"));
const Hotels    = dynamic(() => import("@/components/Hotels"));
const LocalIntel = dynamic(() => import("@/components/LocalIntel"));
const FAQ       = dynamic(() => import("@/components/FAQ"));

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
