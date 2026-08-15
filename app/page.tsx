import type { Metadata } from "next";
import Hero from "@/components/Hero";
import HeroCentered from "@/components/HeroCentered";
import Configurator from "@/components/Configurator";
import FitFinder from "@/components/FitFinder";
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

export default function Home() {
  return (
    <>
      <main className="flex-1">
        {/* HeroCentered = new large-logo, PBC-mood-inspired hero (Raza trial, Aug 2026).
            To revert: swap <HeroCentered /> back to <Hero />, both kept in the codebase. */}
        <HeroCentered />
        <Configurator />
        <FitFinder />
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
