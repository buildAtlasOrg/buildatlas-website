"use client";

import { motion } from "framer-motion";
import { AlertCircle, GitBranch, MessageSquareText } from "lucide-react";
import { SectionDivider, SectionIntro, SectionShell } from "./Section";

const items = [
  {
    icon: AlertCircle,
    title: "Find the failing step faster",
    body: "The broken part of the run should be obvious without reading hundreds of lines first.",
  },
  {
    icon: GitBranch,
    title: "Keep the dependency path visible",
    body: "It is easier to debug when you can see what led into the failure and what it blocked next.",
  },
  {
    icon: MessageSquareText,
    title: "Make handoff easier",
    body: "The next engineer should inherit a readable summary, not a screenshot and a guess.",
  },
];

export default function Problem() {
  return (
    <SectionShell id="problem">
      <SectionDivider />

      <SectionIntro
        eyebrow="Why it helps"
        title="Less time reconstructing the run."
        description="Most teams spend the first part of a CI failure figuring out what happened. BuildAtlas shortens that step."
        className="max-w-3xl"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="note-card"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--line-strong)]">
                0{index + 1}
              </span>
              <item.icon className="h-4 w-4 text-[color:var(--signal)]" />
            </div>
            <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink)]">
              {item.title}
            </p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--ink-soft)]">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
