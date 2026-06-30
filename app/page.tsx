import Hero from "@/components/Hero";
import Configurator from "@/components/Configurator";
import FitFinder from "@/components/FitFinder";
import Courses from "@/components/Courses";
import Packages from "@/components/Packages";
import Itinerary from "@/components/Itinerary";
import Hotels from "@/components/Hotels";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Configurator />
        <FitFinder />
        <Courses />
        <Packages />
        <Itinerary />
        <Hotels />
      </main>
      <Footer />
    </>
  );
}
