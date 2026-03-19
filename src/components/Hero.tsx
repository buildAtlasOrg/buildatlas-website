"use client";

import { motion } from "framer-motion";
import StaggeredText from "./StaggeredText";
import WaitlistCard from "./WaitlistCard";

const heroPoints = [
  "BuildAtlas is a developer tool that helps engineering teams visualize and understand their CI/CD pipelines.",
  "By transforming complex build workflows into clear pipeline maps, BuildAtlas enables developers to quickly identify failures, trace dependencies, and debug builds faster.",
  "Our mission is to make CI/CD systems easier to understand, monitor, and optimize for modern software teams.",
];

export default function Hero() {
  return (
    <section className="relative pt-24 sm:pt-28">
      <div className="shell">
        <div className="relative z-10 grid gap-10 pt-4 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,26rem)] lg:items-start lg:gap-12">
          <div className="max-w-3xl">
            <StaggeredText
              as="h1"
              text="See where your pipeline broke."
              className="hero-heading max-w-[11ch]"
              blur={false}
              delay={0.05}
              duration={0.45}
            />

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 max-w-2xl space-y-3"
            >
              {heroPoints.map((point) => (
                <li key={point} className="text-base leading-8 text-[color:var(--ink)]">
                  {point}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            id="waitlist"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="w-full max-w-md lg:justify-self-end lg:pt-2"
          >
            <WaitlistCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
