"use client";

import { motion } from "framer-motion";

const items = [
  "Pipeline Visualization",
  "Root Cause Analysis",
  "GitHub Actions Native",
  "Dependency Tracing",
  "Incident Handoff",
  "Zero Config Setup",
  "Visual Debugging",
  "Team Handoffs",
];

const repeated = [...items, ...items, ...items];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-[color:var(--line)] py-3.5">
      <motion.div
        className="flex w-max gap-0"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-0 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--ink-soft)]"
          >
            {item}
            <span className="mx-8 text-[color:var(--signal)]">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
