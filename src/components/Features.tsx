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
      <div className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--midnight)] p-5 text-[color:var(--paper)]">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[color:var(--paper)]/60">
          <span>Pipeline glance</span>
          <span>auth release</span>
        </div>
        <div className="mt-5 space-y-3">
          {[
            ["resolve config", "ok", "bg-[color:var(--success)]"],
            ["install toolchain", "ok", "bg-[color:var(--success)]"],
            ["auth contract", "fail", "bg-[color:var(--ember)]"],
            ["promote staging", "blocked", "bg-white/30"],
          ].map(([label, status, color]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/6 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                <span className="text-sm font-medium">{label}</span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--paper)]/62">
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
      <div className="rounded-[28px] border border-[color:var(--line)] bg-white/74 p-5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
          <Route className="h-3.5 w-3.5 text-[color:var(--signal)]" />
          dependency trail
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["service schema", "changed upstream"],
            ["auth contract", "mismatch found"],
            ["integration run", "stopped here"],
          ].map(([title, state]) => (
            <div key={title} className="rounded-[20px] border border-[color:var(--line)] bg-white px-4 py-4">
              <p className="text-sm font-semibold tracking-[-0.02em] text-[color:var(--ink)]">{title}</p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--ink-soft)]">{state}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--line-strong)]">
          <span>upstream</span>
          <span>transition</span>
          <span>downstream</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-[color:var(--line)] bg-white/74 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
          <FileText className="h-3.5 w-3.5 text-[color:var(--ember)]" />
          handoff note
        </div>
        <span className="rounded-full border border-[color:var(--line)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
          shareable
        </span>
      </div>
      <div className="mt-5 rounded-[22px] border border-[color:var(--line)] bg-[color:var(--paper)] px-5 py-5">
        <p className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink)]">
          Contract drift blocked staging promotion after lint and install completed.
        </p>
        <p className="mt-3 text-sm leading-7 text-[color:var(--ink-soft)]">
          The break starts in the auth contract and propagates into the integration run. No release packaging work started downstream.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["branch main", "owner release", "impact staging + package"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]"
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className={`grid gap-6 lg:grid-cols-2 lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      <div>
        <p className="eyebrow">{capability.label}</p>
        <h3 className="mt-4 text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1] tracking-[-0.05em] text-[color:var(--ink)]">
          {capability.title}
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--ink-soft)]">
          {capability.body}
        </p>

        <div className="mt-6 space-y-3">
          {capability.bullets.map((bullet) => (
            <div key={bullet} className="flex items-start gap-3">
              <CircleDot className="mt-1 h-4 w-4 shrink-0 text-[color:var(--signal)]" />
              <p className="text-sm leading-7 text-[color:var(--ink-soft)]">{bullet}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--ink)]">
          Read the incident faster
          <ArrowUpRight className="h-4 w-4 text-[color:var(--ink-soft)]" />
        </div>
      </div>

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

      <div className="mt-14 space-y-12">
        {capabilities.map((capability, index) => (
          <CapabilityRow key={capability.label} capability={capability} index={index} />
        ))}
      </div>
    </SectionShell>
  );
}
