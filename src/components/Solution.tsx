"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileSearch, Network, NotebookTabs } from "lucide-react";
import { SectionDivider, SectionIntro, SectionShell } from "./Section";

const principles = [
  {
    title: "Map the build first",
    body: "Start with ordering, fan-out, and blocked work. Structure gives the incident a shape people can agree on.",
  },
  {
    title: "Keep the failing edge visible",
    body: "When the break stays pinned in context, teams stop bouncing between the graph and a dozen disconnected tabs.",
  },
  {
    title: "Turn the incident into a shareable object",
    body: "A good handoff is not a screenshot. It is a readable summary tied to the exact failure path.",
  },
];

const workspaceLenses = [
  {
    icon: Network,
    label: "Graph lens",
    title: "See every stage in relation to the others",
    copy: "The graph makes fan-out and blocked work obvious before you inspect any single log entry.",
    accent: "bg-[color:var(--signal-soft)] text-[color:var(--signal)]",
  },
  {
    icon: FileSearch,
    label: "Failure lens",
    title: "Pin the break to the exact transition",
    copy: "Focus on the edge that changed, not the flood of output that followed it.",
    accent: "bg-[color:var(--ember-soft)] text-[color:var(--ember)]",
  },
  {
    icon: NotebookTabs,
    label: "Handoff lens",
    title: "Package context so the next engineer starts ahead",
    copy: "BuildAtlas turns the incident into something legible enough to transfer without a meeting.",
    accent: "bg-white text-[color:var(--midnight)]",
  },
];

export default function Solution() {
  return (
    <SectionShell id="solution">
      <SectionDivider />

      <div className="grid gap-10 xl:grid-cols-[0.85fr_1.15fr] xl:gap-12">
        <div>
          <SectionIntro
            eyebrow="How the product thinks"
            title="BuildAtlas treats pipeline failures like a system, not a scavenger hunt."
            description="Instead of forcing teams to reconstruct the story from logs, BuildAtlas presents the incident as a connected working surface."
          />

          <div className="mt-10 space-y-4">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="note-card"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--line-strong)]">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink)]">
                      {principle.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--ink-soft)]">
                      {principle.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.65 }}
          className="panel-strong p-6 sm:p-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Workspace anatomy</p>
              <h3 className="mt-3 text-[clamp(2rem,3vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[color:var(--ink)]">
                One surface. Three useful views.
              </h3>
            </div>
            <div className="rounded-full border border-[color:var(--line)] bg-white/75 px-4 py-2 text-sm font-medium text-[color:var(--ink-soft)]">
              Built for real incident flow
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--midnight)] p-5 text-[color:var(--paper)]">
              <p className="detail-label text-[color:var(--paper)]/62">Working principle</p>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                Start wide, then narrow only when the graph tells you where to look.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  ["Fan-out visible", "No more guessing which jobs depended on the break."],
                  ["Status pinned", "Failures stay attached to the stage that caused them."],
                  ["Readable trail", "A summary survives after the incident changes hands."],
                  ["Fewer context gaps", "The story stays with the build, not in side conversations."],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                    <p className="text-sm font-semibold text-[color:var(--paper)]">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--paper)]/68">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {workspaceLenses.map((lens, index) => (
                <motion.div
                  key={lens.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
                  className="rounded-[24px] border border-[color:var(--line)] bg-white/72 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full ${lens.accent}`}>
                      <lens.icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 text-[color:var(--ink-soft)]" />
                  </div>

                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--line-strong)]">
                    {lens.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink)]">
                    {lens.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--ink-soft)]">
                    {lens.copy}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
