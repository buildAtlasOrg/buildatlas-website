"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import BorderGlow from "./BorderGlow";
import GridPattern from "./GridPattern";
import PillButton from "./PillButton";
import { SectionDivider, SectionIntro, SectionShell } from "./Section";

const views = [
  {
    id: "graph",
    label: "Graph",
    title: "See the run as a dependency map.",
    body: "Start with structure, then drill into the failing step.",
    content: [
      ["install", "done"],
      ["lint", "done"],
      ["auth contract", "failed"],
      ["package", "blocked"],
      ["deploy", "blocked"],
    ],
  },
  {
    id: "timeline",
    label: "Timeline",
    title: "Trace what happened in order.",
    body: "Sequence helps show which step actually caused the stop.",
    content: [
      ["00:06", "Config loaded"],
      ["00:24", "Install finished"],
      ["00:35", "Lint passed"],
      ["01:18", "Auth contract failed"],
    ],
  },
  {
    id: "summary",
    label: "Summary",
    title: "Leave the next engineer with context.",
    body: "A short summary helps the team continue without retelling the incident.",
    content: [
      ["Issue", "Auth contract mismatch"],
      ["Impact", "Package and deploy blocked"],
      ["Next step", "Update contract fixture"],
    ],
  },
] as const;

export default function ProductPreview() {
  const [activeId, setActiveId] = useState<(typeof views)[number]["id"]>("graph");
  const activeView = views.find((view) => view.id === activeId)!;

  return (
    <SectionShell id="product">
      <SectionDivider />

      <SectionIntro
        eyebrow="Product"
        title="One clear view of a failed run."
        description="The key context stays in one place: the failing step, what led to it, and what it blocked."
        className="max-w-3xl"
      />

      <BorderGlow
        className="mt-8"
        edgeSensitivity={26}
        glowColor="248 100 73"
        backgroundColor="rgba(255, 255, 255, 0.94)"
        borderRadius={0}
        glowRadius={30}
        glowIntensity={0.7}
        coneSpread={18}
        colors={["#3f18ff", "#6d57ff", "#9ab8ff"]}
        fillOpacity={0.16}
      >
        <div className="relative overflow-hidden p-5 sm:p-6">
          <GridPattern className="pointer-events-none absolute inset-0 opacity-20" cellSize={32} />
          <div className="relative z-10 flex flex-wrap gap-2 border-b border-[color:var(--line)] pb-4">
            {views.map((view) => {
              const active = view.id === activeId;

              return (
                <PillButton
                  key={view.id}
                  label={view.label}
                  onClick={() => setActiveId(view.id)}
                  size="sm"
                  selected={active}
                />
              );
            })}
          </div>

          <div className="border-glow relative z-10 mt-6 border border-[color:var(--signal)] bg-white p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                  <div>
                    <p className="eyebrow">{activeView.label}</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
                      {activeView.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--ink-soft)]">
                      {activeView.body}
                    </p>
                  </div>

                  <div className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
                    {activeView.content.map(([left, right]) => (
                      <div
                        key={left}
                        className="flex items-center justify-between gap-4 bg-[rgba(245,241,234,0.55)] px-4 py-3"
                      >
                        <span className="text-sm font-medium text-[color:var(--ink)]">{left}</span>
                        <span className="text-sm text-[color:var(--ink-soft)]">{right}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </BorderGlow>
    </SectionShell>
  );
}
