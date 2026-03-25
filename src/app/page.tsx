import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductPreview from "@/components/ProductPreview";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Founder from "@/components/Founder";
import Footer from "@/components/Footer";
import WaitlistCard from "@/components/WaitlistCard";

export default function Home() {
  return (
    <main id="top" className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <ProductPreview />
      <Problem />
      <Features />
      <HowItWorks />
      <Founder />

      {/* Waitlist CTA */}
      <section id="waitlist" className="relative py-24 sm:py-32 lg:py-40">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[color:var(--line)]" />
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Early access</p>
            <h2 className="mt-5 text-[clamp(2.8rem,6vw,5.2rem)] font-semibold leading-[1.0] tracking-[-0.055em] text-[color:var(--ink)]">
              Be the first to use BuildAtlas.
            </h2>
            <p className="section-copy mt-7 max-w-[48ch]">
              We&apos;re opening access to early teams now. Drop your email and
              we&apos;ll reach out when your spot is ready.
            </p>
            <div className="mt-10 max-w-lg">
              <WaitlistCard />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
