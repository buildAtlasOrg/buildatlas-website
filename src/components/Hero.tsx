"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import WaitlistCard from "./WaitlistCard";

const stats = [
  { value: "< 30s", label: "to find root cause" },
  { value: "GitHub Actions", label: "native support" },
  { value: "Free", label: "during early access" },
];

export default function Hero() {
  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32">
      <div className="shell">
        <div className="relative z-10 grid gap-12 pt-4 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,26rem)] lg:items-start lg:gap-16">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="eyebrow"
            >
              Early access — now open
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="hero-heading mt-5"
            >
              Stop reading logs.{" "}
              <span className="text-[color:var(--signal)]">
                Start reading maps.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="mt-6 max-w-[52ch] text-[1.1rem] leading-8 text-[color:var(--ink-soft)]"
            >
              BuildAtlas transforms GitHub Actions failures into interactive
              visual pipeline maps — so your team finds the root cause in
              seconds, not hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/demo"
                className="button-primary rounded-full px-7 py-3.5 text-[0.95rem] font-semibold"
              >
                Try Live Demo →
              </Link>
              <a
                href="#waitlist"
                className="button-secondary rounded-full px-7 py-3.5 text-[0.95rem] font-semibold"
              >
                Join Early Access
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-12 flex flex-wrap items-center gap-8 border-t border-[color:var(--line)] pt-8"
            >
              {stats.map(({ value, label }) => (
                <div key={value}>
                  <p className="text-[1.4rem] font-semibold tracking-[-0.04em] text-[color:var(--signal)]">
                    {value}
                  </p>
                  <p className="mt-0.5 text-xs text-[color:var(--ink-soft)]">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            id="waitlist"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="w-full max-w-md lg:justify-self-end lg:pt-2"
          >
            <WaitlistCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
