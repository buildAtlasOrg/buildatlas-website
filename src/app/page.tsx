import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductPreview from "@/components/ProductPreview";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Founder from "@/components/Founder";
import Footer from "@/components/Footer";
import ThemedGalaxyBackdrop from "@/components/ThemedGalaxyBackdrop";
import WaitlistCard from "@/components/WaitlistCard";

export default function Home() {
  return (
    <main id="top" className="relative isolate">
      <ThemedGalaxyBackdrop />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ProductPreview />
        <Problem />
        <Features />
        <HowItWorks />
        <Founder />

        {/* Bottom waitlist CTA */}
        <section id="waitlist" className="relative py-20 sm:py-24 lg:py-28">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[color:var(--line)]/70" />
          <div className="shell">
            <div className="mx-auto max-w-lg text-center">
              <p className="eyebrow">Early access</p>
              <h2 className="section-heading mx-auto mt-5 max-w-[18ch] text-center">
                Be the first to use BuildAtlas.
              </h2>
              <p className="section-copy mx-auto mt-5 max-w-[40ch] text-center">
                We&apos;re opening access to early teams now. Drop your email and
                we&apos;ll reach out when your spot is ready.
              </p>
              <div className="mt-10">
                <WaitlistCard />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
