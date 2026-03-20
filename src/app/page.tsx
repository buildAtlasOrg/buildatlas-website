import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ProductPreview from "@/components/ProductPreview";
import PipelineGraph from "@/components/PipelineGraph";
import Footer from "@/components/Footer";
import ThemedGalaxyBackdrop from "@/components/ThemedGalaxyBackdrop";

export default function Home() {
  return (
    <main id="top" className="relative isolate">
      <ThemedGalaxyBackdrop />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ProductPreview />
        <section className="relative py-14 sm:py-16 lg:py-20">
          <div className="shell">
            <PipelineGraph />
          </div>
        </section>
        <HowItWorks />
        <Footer />
      </div>
    </main>
  );
}
