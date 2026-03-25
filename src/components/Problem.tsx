"use client";

import { motion } from "framer-motion";
import { SectionDivider, SectionIntro, SectionShell } from "./Section";

const pains = [
  {
    number: "01",
    title: "Hours lost to log hunting",
    body: "Engineers spend 40+ minutes on average per failed CI run — most of it scrolling raw log output to find the one line that actually matters.",
  },
  {
    number: "02",
    title: "Cascade failures go unnoticed",
    body: "A single broken job silently blocks three downstream jobs. The deploy stalls. The team waits. Nobody knows why until someone digs through the wreckage.",
  },
  {
    number: "03",
    title: "No context for handoffs",
    body: "When the build owner is unavailable, the next person starts from scratch — no shared map of what broke, what was blocked, or where to look.",
  },
];

export default function Problem() {
  return (
    <SectionShell id="problem">
      <SectionDivider />

      <SectionIntro
        eyebrow="The problem"
        title="CI/CD failures cost more than you think."
        description="Modern pipelines have dozens of jobs and thousands of log lines. The tools to understand them haven't kept up."
        className="max-w-3xl"
      />

      <div className="mt-14 divide-y divide-[color:var(--line)]">
        {pains.map((item, i) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="grid gap-6 py-10 sm:grid-cols-[5rem_1fr] sm:gap-12 lg:grid-cols-[7rem_1fr_minmax(0,36rem)]"
          >
            {/* Number */}
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--signal)] sm:pt-0.5">
              {item.number}
            </p>

            {/* Title */}
            <h3 className="text-[1.2rem] font-semibold tracking-[-0.035em] text-[color:var(--ink)] sm:pt-0 lg:pt-0.5">
              {item.title}
            </h3>

            {/* Body */}
            <p className="text-sm leading-[1.85] text-[color:var(--ink-soft)] sm:col-start-2 lg:col-start-auto">
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
