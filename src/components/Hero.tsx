"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

// Animated counter for stats
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / 40;
    const id = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(id); }
      else setDisplay(Math.floor(start));
    }, 18);
    return () => clearInterval(id);
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// Reveal one line from below (overflow-hidden wrapper + translate Y)
function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col justify-center pt-24 pb-16 sm:pt-28">
      <div className="shell">
        {/* Eyebrow */}
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="eyebrow"
          >
            Early access — now open
          </motion.p>
        </div>

        {/* Main heading — each line reveals independently */}
        <h1 className="mt-6 text-[clamp(3.6rem,9vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-[color:var(--ink)]">
          <RevealLine delay={0.08}>Stop reading logs.</RevealLine>
          <RevealLine delay={0.16}>
            <span className="text-[color:var(--signal)]">Start reading maps.</span>
          </RevealLine>
        </h1>

        {/* Subtitle */}
        <div className="overflow-hidden mt-8">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="max-w-[52ch] text-[1.1rem] leading-[1.85] text-[color:var(--ink-soft)]"
          >
            BuildAtlas transforms GitHub Actions failures into interactive
            visual pipeline maps — so your team finds the root cause in
            seconds, not hours.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.44, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 bg-[color:var(--signal)] px-7 py-3.5 text-[0.9rem] font-semibold text-white transition-opacity hover:opacity-80"
          >
            Try Live Demo →
          </Link>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 border border-[color:var(--line-strong)] px-7 py-3.5 text-[0.9rem] font-semibold text-[color:var(--ink)] transition-colors hover:border-[color:var(--signal)] hover:text-[color:var(--signal)]"
          >
            Join Early Access
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.56 }}
          className="mt-16 flex flex-wrap items-start gap-x-14 gap-y-6 border-t border-[color:var(--line)] pt-10"
        >
          <div>
            <p className="text-[1.3rem] font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
              &lt;&nbsp;<Counter value={30} suffix="s" />
            </p>
            <p className="mt-1 text-xs tracking-wide text-[color:var(--ink-soft)]">to find root cause</p>
          </div>
          <div>
            <p className="text-[1.3rem] font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
              GitHub Actions
            </p>
            <p className="mt-1 text-xs tracking-wide text-[color:var(--ink-soft)]">native support</p>
          </div>
          <div>
            <p className="text-[1.3rem] font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
              Free
            </p>
            <p className="mt-1 text-xs tracking-wide text-[color:var(--ink-soft)]">during early access</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
