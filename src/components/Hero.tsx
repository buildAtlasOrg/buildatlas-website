"use client";

import { motion } from "framer-motion";
import PillButton from "./PillButton";
import PipelineGraph from "./PipelineGraph";
import StaggeredText from "./StaggeredText";

const points = [
  "See the failing step immediately",
  "Keep dependencies visible",
  "Share a cleaner handoff",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28">
      <div className="shell">
        <div className="relative z-10 flex flex-col items-start pt-4">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="eyebrow"
            >
              BuildAtlas
            </motion.p>

            <StaggeredText
              as="h1"
              text="See where your pipeline broke."
              className="hero-heading mt-5 max-w-[11ch]"
              blur={false}
              delay={0.05}
              duration={0.45}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-copy mt-6 max-w-xl"
            >
              BuildAtlas maps the steps, dependencies, and blocked jobs in a failed
              CI run so your team can understand the issue before digging through logs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <PillButton
                label="Join the waitlist"
                href="#cta"
                className="w-full sm:w-auto"
              />
              <PillButton
                label="See the product"
                href="#product"
                className="w-full sm:w-auto"
              />
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-7 space-y-2.5"
            >
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-[color:var(--ink-soft)]">
                  <span className="h-2.5 w-2.5 bg-[color:var(--signal)]" />
                  {point}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative mt-10 w-full"
        >
          <PipelineGraph />
        </motion.div>
      </div>
    </section>
  );
}
