"use client";

import { motion } from "framer-motion";
import { SectionDivider, SectionShell } from "./Section";

const steps = [
  {
    number: "01",
    title: "Connect Your Repository",
    body: "Link your GitHub repository in one click. BuildAtlas reads your Actions workflows and starts mapping pipeline runs immediately.",
  },
  {
    number: "02",
    title: "Import Pipeline Data",
    body: "BuildAtlas reads your workflow files, pipeline config, and job definitions so the structure is ready before anyone digs through logs.",
  },
  {
    number: "03",
    title: "View the Visual Graph",
    body: "See the run as a clean dependency map, follow what ran first, and understand how each job connects to the next.",
  },
  {
    number: "04",
    title: "Debug Failures Faster",
    body: "Jump straight to the broken job, inspect the failure context, and see which downstream work was blocked by the same issue.",
  },
] as const;

export default function HowItWorks() {
  return (
    <SectionShell id="how-it-works">
      <SectionDivider />

      <div className="max-w-4xl">
        <h2 className="section-heading max-w-[16ch]">
          See how BuildAtlas makes failed pipelines easier to understand.
        </h2>
        <p className="mt-5 max-w-[54ch] text-base leading-[1.9] text-[color:var(--ink)]">
          BuildAtlas connects to your repository, reads pipeline structure, surfaces failures as maps, and preserves the context your team needs to debug and hand work off clearly.
        </p>
      </div>

      <div className="mt-16 grid gap-0 divide-y divide-[color:var(--line)] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="py-8 pr-0 sm:py-0 sm:pr-8 lg:pr-10"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--signal)]">
              {step.number}
            </p>
            <h3 className="mt-4 text-[1.05rem] font-semibold leading-snug tracking-[-0.03em] text-[color:var(--ink)]">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-[1.85] text-[color:var(--ink-soft)]">
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
