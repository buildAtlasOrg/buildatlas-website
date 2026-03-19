"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type IncidentItem = {
  label: string;
  title: string;
  detail: string;
};

type IncidentTapeProps = {
  items: IncidentItem[];
  className?: string;
};

export default function IncidentTape({ items, className }: IncidentTapeProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || items.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [items.length, reduceMotion]);

  return (
    <div className={className}>
      <div className="flex items-center justify-between border-b border-[color:var(--line)]/70 px-5 py-4">
        <div>
          <p className="eyebrow">Current Incident</p>
          <p className="mt-1 text-sm text-[color:var(--ink-soft)]">
            The work usually starts where the build ended.
          </p>
        </div>
        <div className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
          Live feed
        </div>
      </div>

      <div className="space-y-2 p-4">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={item.label}
              animate={{
                opacity: isActive ? 1 : 0.55,
                y: isActive ? -2 : 0,
                scale: isActive ? 1 : 0.985,
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-[20px] border px-4 py-4 ${
                isActive
                  ? "border-[color:var(--midnight)] bg-[color:var(--midnight)] text-[color:var(--paper)]"
                  : "border-[color:var(--line)] bg-[color:var(--surface-soft)] text-[color:var(--ink)]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                      isActive ? "text-[color:var(--paper)]/70" : "text-[color:var(--ink-soft)]"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="mt-2 text-base font-semibold leading-tight">{item.title}</p>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      isActive ? "text-[color:var(--paper)]/70" : "text-[color:var(--ink-soft)]"
                    }`}
                  >
                    {item.detail}
                  </p>
                </div>

                <div
                  className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                    isActive ? "bg-[color:var(--signal)]" : "bg-[color:var(--line-strong)]"
                  }`}
                />
              </div>

              {isActive && !reduceMotion ? (
                <motion.div
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-[color:var(--signal)]"
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2.3, ease: "linear" }}
                />
              ) : null}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
