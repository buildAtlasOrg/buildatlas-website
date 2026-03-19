import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Galaxy from "@/components/Galaxy";
import HowItWorks from "@/components/HowItWorks";
import ProductPreview from "@/components/ProductPreview";
import PipelineGraph from "@/components/PipelineGraph";
import Footer from "@/components/Footer";

function PageGalaxyBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Galaxy
        className="absolute inset-0 h-full w-full"
        transparent
        mouseInteraction={false}
        mouseRepulsion
        density={0.4}
        glowIntensity={0.2}
        saturation={0.1}
        hueShift={140}
        starScale={0.78}
        twinkleIntensity={0.2}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={0.7}
      />
    </div>
  );
}

export default function Home() {
  return (
    <main id="top" className="relative isolate">
      <PageGalaxyBackdrop />
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
