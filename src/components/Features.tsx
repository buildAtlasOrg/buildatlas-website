"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CircleDot, FileText, Route } from "lucide-react";
import { SectionDivider, SectionIntro, SectionShell } from "./Section";

type CapabilityType = "triage" | "trace" | "handoff";

const capabilities: {
  label: string;
  title: string;
  body: string;
  bullets: string[];
  type: CapabilityType;
}[] = [
  {
    label: "Triage view",
    title: "See the failure, the branch, and the blocked work in one glance.",
    body: "BuildAtlas keeps the useful context above the fold so the team can orient before diving into details.",
    bullets: [
      "Failure stays attached to the stage that caused it",
      "Branch, owner, and duration remain visible while you debug",
      "Blocked stages are part of the story, not hidden fallout",
    ],
    type: "triage",
  },
  {
    label: "Dependency trace",
    title: "Follow the exact path from upstream change to downstream break.",
    body: "Instead of jumping between logs and config files, the workspace makes dependencies readable as a system.",
    bullets: [
      "Track fan-out across jobs and environments",
      "Pinpoint where the transition stopped making sense",
      "Understand impact before rerunning the whole build",
    ],
    type: "trace",
  },
  {
    label: "Incident handoff",
    title: "Turn a pipeline failure into context another engineer can inherit.",
    body: "The best debugging tools also reduce explanation work. BuildAtlas keeps the narrative with the build.",
    bullets: [
      "Summaries stay grounded in the exact failure path",
      "The next engineer starts from a map, not chat fragments",
      "Context survives after ownership changes",
    ],
    type: "handoff",
  },
];

function CapabilityVisual({ type }: { type: CapabilityType }) {
  if (type === "triage") {
    return (
      <div className="overflow-hidden border border-[color:var(--line)] bg-[color:var(--midnight)] p-5">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[color:var(--paper)]/40">
          <span>Pipeline glance</span>
          <span>auth release</span>
        </div>
        <div className="mt-5 space-y-2.5">
          {[
            ["resolve config", "ok", "bg-[color:var(--success)]"],
            ["install toolchain", "ok", "bg-[color:var(--success)]"],
            ["auth contract", "fail", "bg-[color:var(--ember)]"],
            ["promote staging", "blocked", "bg-white/20"],
          ].map(([label, status, color]) => (
            <div
              key={label}
              className="flex items-center justify-between border border-white/[0.06] bg-white/[0.04] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${color}`} />
                <span className="text-sm font-medium text-[color:var(--paper)]/80">{label}</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--paper)]/40">
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "trace") {
    return (
      <div className="overflow-hidden border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
          <Route className="h-3.5 w-3.5 text-[color:var(--signal)]" />
          dependency trail
        </div>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
          {[
            ["service schema", "changed upstream"],
            ["auth contract", "mismatch found"],
            ["integration run", "stopped here"],
          ].map(([title, state]) => (
            <div
              key={title}
              className="border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-4"
            >
              <p className="text-sm font-semibold tracking-[-0.02em] text-[color:var(--ink)]">{title}</p>
              <p className="mt-1.5 text-xs leading-5 text-[color:var(--ink-soft)]">{state}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]/50">
          <span>upstream</span>
          <span>transition</span>
          <span>downstream</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
          <FileText className="h-3.5 w-3.5 text-[color:var(--ember)]" />
          handoff note
        </div>
        <span className="border border-[color:var(--line)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">
          shareable
        </span>
      </div>
      <div className="mt-4 border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-5 py-5">
        <p className="text-base font-semibold leading-snug tracking-[-0.025em] text-[color:var(--ink)]">
          Contract drift blocked staging promotion after lint and install completed.
        </p>
        <p className="mt-3 text-sm leading-[1.75] text-[color:var(--ink-soft)]">
          The break starts in the auth contract and propagates into the integration run. No release packaging work started downstream.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["branch main", "owner release", "impact staging + package"].map((tag) => (
            <span
              key={tag}
              className="border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--ink-soft)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CapabilityRow({
  capability,
  index,
}: {
  capability: (typeof capabilities)[number];
  index: number;
}) {
  const reverse = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`grid gap-10 border-t border-[color:var(--line)] pt-12 lg:grid-cols-2 lg:items-center lg:gap-16 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Text */}
      <div>
        <p className="eyebrow">{capability.label}</p>
        <h3 className="mt-4 text-[clamp(1.75rem,2.8vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[color:var(--ink)]">
          {capability.title}
        </h3>
        <p className="mt-4 max-w-[44ch] text-sm leading-[1.9] text-[color:var(--ink-soft)]">
          {capability.body}
        </p>

        <ul className="mt-6 space-y-3">
          {capability.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <CircleDot className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[color:var(--signal)]" />
              <span className="text-sm leading-[1.75] text-[color:var(--ink-soft)]">{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--ink)] transition-colors hover:text-[color:var(--signal)]">
          Read the incident faster
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Visual */}
      <CapabilityVisual type={capability.type} />
    </motion.div>
  );
}

export default function Features() {
  return (
    <SectionShell id="features">
      <SectionDivider />

      <SectionIntro
        eyebrow="What changes in practice"
        title="The product is useful because it changes how teams move through an incident."
        description="BuildAtlas is not another place to watch builds run. It is a better sequence for understanding what just happened."
        className="max-w-3xl"
      />

      <div className="mt-14 space-y-0">
        {capabilities.map((capability, index) => (
          <CapabilityRow key={capability.label} capability={capability} index={index} />
        ))}
      </div>
    </SectionShell>
  );
}
