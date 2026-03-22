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

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {pains.map((item, i) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.45, delay: i * 0.09 }}
            className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-7 py-7 backdrop-blur-md"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--signal)]">
              {item.number}
            </p>
            <h3 className="mt-4 text-[1.15rem] font-semibold tracking-[-0.035em] text-[color:var(--ink)]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--ink-soft)]">
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
