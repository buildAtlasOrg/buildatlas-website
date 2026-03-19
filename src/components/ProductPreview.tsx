"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import BorderGlow from "./BorderGlow";
import GridPattern from "./GridPattern";
import PillButton from "./PillButton";
import { SectionDivider, SectionShell } from "./Section";

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

function ProductPreviewPanel({
  view,
}: {
  view: (typeof views)[number];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      <div>
        <p className="eyebrow">{view.label}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
          {view.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[color:var(--ink-soft)]">
          {view.body}
        </p>
      </div>

      <div className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
        {view.content.map(([left, right]) => (
          <div
            key={left}
            className="flex items-center justify-between gap-4 bg-[color:var(--surface-muted)] px-4 py-3"
          >
            <span className="text-sm font-medium text-[color:var(--ink)]">{left}</span>
            <span className="text-sm text-[color:var(--ink-soft)]">{right}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductPreview() {
  const [activeId, setActiveId] = useState<(typeof views)[number]["id"]>("graph");
  const [panelMinHeight, setPanelMinHeight] = useState(0);
  const measureRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const activeView = views.find((view) => view.id === activeId)!;

  useLayoutEffect(() => {
    const updatePanelMinHeight = () => {
      const nextMinHeight = views.reduce((maxHeight, view) => {
        const measuredHeight = measureRefs.current[view.id]?.offsetHeight ?? 0;
        return Math.max(maxHeight, measuredHeight);
      }, 0);

      if (nextMinHeight > 0) {
        setPanelMinHeight(nextMinHeight);
      }
    };

    updatePanelMinHeight();

    const observer = new ResizeObserver(updatePanelMinHeight);
    views.forEach((view) => {
      const element = measureRefs.current[view.id];

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <SectionShell id="product">
      <SectionDivider />

      <BorderGlow
        className="rounded-[50px]"
        backgroundColor="var(--panel)"
        fillOpacity={0.16}
      >
        <div className="relative overflow-hidden rounded-[50px] p-5 sm:p-6">
          <GridPattern className="pointer-events-none absolute inset-0 opacity-20" cellSize={32} />
          <div className="relative z-10 flex flex-wrap gap-2 border-b border-[color:var(--line)] pb-4">
            {views.map((view) => {
              const active = view.id === activeId;

              return (
                <BorderGlow
                  key={view.id}
                  className="rounded-full"
                  backgroundColor="var(--surface-soft)"
                  edgeSensitivity={14}
                  glowRadius={18}
                  glowIntensity={0.85}
                  coneSpread={18}
                  colors={["#3f18ff", "#6d57ff", "#9ab8ff"]}
                  fillOpacity={0.16}
                >
                  <PillButton
                    label={view.label}
                    onClick={() => setActiveId(view.id)}
                    size="sm"
                    selected={active}
                  />
                </BorderGlow>
              );
            })}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-5 right-5 top-0 -z-10 invisible sm:left-6 sm:right-6"
          >
            {views.map((view) => (
              <div
                key={`measure-${view.id}`}
                ref={(element) => {
                  measureRefs.current[view.id] = element;
                }}
                className="border-glow border border-[color:var(--signal)] bg-[color:var(--surface-strong)] p-5"
              >
                <ProductPreviewPanel view={view} />
              </div>
            ))}
          </div>

          <motion.div
            className="border-glow relative z-10 mt-6 overflow-hidden border border-[color:var(--signal)] bg-[color:var(--surface-strong)] p-5"
            style={panelMinHeight > 0 ? { minHeight: `${panelMinHeight}px` } : undefined}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeView.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ProductPreviewPanel view={activeView} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </BorderGlow>
    </SectionShell>
  );
}
