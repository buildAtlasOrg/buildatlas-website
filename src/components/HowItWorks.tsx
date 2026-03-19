"use client";

import { motion } from "framer-motion";
import { Cable, FileCode2, Radar, Send } from "lucide-react";
import BorderGlow from "./BorderGlow";
import { SectionDivider, SectionIntro, SectionShell } from "./Section";

const steps = [
  {
    number: "01",
    icon: Cable,
    title: "Connect the repository",
    body: "Point BuildAtlas at the repo and CI provider your team already uses.",
  },
  {
    number: "02",
    icon: FileCode2,
    title: "Read pipeline structure",
    body: "The system ingests workflow shape, stage order, dependencies, and metadata.",
  },
  {
    number: "03",
    icon: Radar,
    title: "Expose live incidents as maps",
    body: "Failures appear with their dependency trail, blocked work, and the surrounding context.",
  },
  {
    number: "04",
    icon: Send,
    title: "Share the exact handoff",
    body: "Teams can move faster because the incident stays readable after ownership changes.",
  },
];

export default function HowItWorks() {
  return (
    <SectionShell id="how-it-works">
      <SectionDivider />

      <SectionIntro
        title="The setup is short because the real work begins after the first failure."
        description="BuildAtlas is meant to enter the team’s existing CI flow quickly, then stay useful every time an incident needs a map."
        className="max-w-3xl"
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative h-full"
          >
            <BorderGlow
              className="h-full rounded-[50px]"
              backgroundColor="var(--surface-soft)"
              fillOpacity={0.12}
            >
              <div className="flex h-full flex-col rounded-[50px] border border-[color:var(--line)] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--line-strong)]">
                    {step.number}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--signal-soft)] text-[color:var(--signal)]">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>

                <p className="mt-8 text-xl font-semibold tracking-[-0.03em] text-[color:var(--ink)]">
                  {step.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--ink-soft)]">{step.body}</p>
              </div>
            </BorderGlow>

            {index < steps.length - 1 ? (
              <div className="pointer-events-none absolute right-[-0.7rem] top-14 hidden h-px w-6 bg-[color:var(--line)] lg:block" />
            ) : null}
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
