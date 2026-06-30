import Hero from "@/components/Hero";
import Configurator from "@/components/Configurator";
import FitFinder from "@/components/FitFinder";
import Courses from "@/components/Courses";
import Itinerary from "@/components/Itinerary";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Configurator />
        <FitFinder />
        <Courses />
        <Itinerary />
      </main>
      <Footer />
    </>
  );
}
