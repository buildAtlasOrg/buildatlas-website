"use client";

import { motion } from "framer-motion";
import { LayoutGrid, AlertCircle, Zap, Clock, Sparkles, CheckCircle2 } from "lucide-react";

const benefits = [
  {
    icon: LayoutGrid,
    text: "See pipeline stages as an interactive graph",
    color: "text-brand-500",
  },
  {
    icon: AlertCircle,
    text: "Instantly identify failing jobs",
    color: "text-status-failure",
  },
  {
    icon: Zap,
    text: "Understand job dependencies at a glance",
    color: "text-brand-400",
  },
  {
    icon: Clock,
    text: "Reduce debugging time dramatically",
    color: "text-status-success",
  },
];

export default function Solution() {
  return (
    <section id="solution" className="relative py-28 sm:py-36">
      <div className="section-divider" />
      
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/5 blur-[100px] dark:bg-brand-500/10" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-badge">
              <Sparkles className="h-3.5 w-3.5 text-brand-400" />
              The Solution
            </span>
            <h2 className="heading-lg mt-6">
              BuildAtlas Makes Pipelines Clear
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
              BuildAtlas visualizes pipeline stages, shows job dependencies,
              highlights failures, and improves debugging speed — all from a
              single dashboard.
            </p>

            <ul className="mt-10 space-y-5">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={benefit.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-light-border bg-light-surface transition-colors group-hover:bg-white dark:border-dark-border dark:bg-dark-surface">
                    <benefit.icon className={`h-5 w-5 ${benefit.color}`} />
                  </span>
                  <span className="text-light-text dark:text-dark-text">{benefit.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Visual comparison */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Without BuildAtlas */}
            <div className="rounded-2xl border border-light-border bg-light-surface p-5 dark:border-dark-border dark:bg-dark-surface">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary">Without BuildAtlas</span>
                <span className="rounded bg-status-failure/10 px-2 py-0.5 text-xs font-medium text-status-failure">Confusing</span>
              </div>
              <div className="space-y-1.5 font-mono text-[11px] text-light-text-secondary dark:text-dark-text-secondary">
                <p className="opacity-50">[12:34:01] Installing dependencies...</p>
                <p className="opacity-50">[12:34:12] Running lint checks...</p>
                <p className="opacity-40">... 127 more lines ...</p>
                <p className="text-status-failure">[12:34:47] Error somewhere</p>
              </div>
            </div>

            {/* With BuildAtlas */}
            <div className="rounded-2xl border border-brand-500/30 bg-brand-500/5 p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-brand-600 dark:text-brand-400">With BuildAtlas</span>
                <span className="rounded bg-status-success/10 px-2 py-0.5 text-xs font-medium text-status-success">Clear</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { name: "install-deps", status: "success", time: "12s" },
                  { name: "lint", status: "success", time: "8s" },
                  { name: "test-suite", status: "fail", time: "43s", error: "auth.test.ts:42" },
                  { name: "build", status: "pending", time: "—" },
                ].map((step, i) => (
                  <div key={step.name} className="flex items-center gap-3">
                    {i > 0 && (
                      <div className="ml-1.5 h-4 w-px bg-light-border dark:bg-dark-border" style={{ marginTop: -20, marginBottom: 4 }} />
                    )}
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full ${
                      step.status === "success" ? "bg-status-success" :
                      step.status === "fail" ? "bg-status-failure" : "bg-status-pending"
                    }`}>
                      {step.status === "success" && <CheckCircle2 className="h-3 w-3 text-white" />}
                      {step.status === "fail" && <AlertCircle className="h-3 w-3 text-white" />}
                    </div>
                    <span className={`text-sm ${
                      step.status === "fail" ? "text-status-failure font-medium" :
                      step.status === "pending" ? "text-status-pending" : "text-light-text dark:text-dark-text"
                    }`}>{step.name}</span>
                    <span className="ml-auto font-mono text-xs text-light-text-secondary dark:text-dark-text-secondary">{step.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
