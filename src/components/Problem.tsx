"use client";

import { motion } from "framer-motion";
import { ScrollText, Link2, Timer, AlertTriangle } from "lucide-react";

const painPoints = [
  {
    icon: ScrollText,
    title: "Endless Log Scrolling",
    description: "Searching through hundreds of lines to find a single error",
  },
  {
    icon: Link2,
    title: "Hidden Dependencies",
    description: "Job relationships are buried in YAML configuration files",
  },
  {
    icon: Timer,
    title: "Slow Debugging Cycles",
    description: "Minutes lost trying to understand pipeline failures",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative py-28 sm:py-36">
      <div className="section-divider" />
      
      <div className="mx-auto max-w-4xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="label-badge">
            <AlertTriangle className="h-3.5 w-3.5 text-status-running" />
            The Problem
          </span>
          <h2 className="heading-lg mt-6 text-balance">
            CI Pipelines Are Hard to Understand
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
            Modern CI/CD pipelines contain many jobs and dependencies. When
            something fails, developers dig through logs and multiple steps
            just to locate the problem.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
            This slows down debugging and wastes valuable development time.
          </p>
        </motion.div>

        {/* Pain points grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-premium group text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-status-failure/20 bg-status-failure/10 text-status-failure transition-colors group-hover:bg-status-failure/15">
                <point.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-light-text dark:text-dark-text">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual representation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-2xl border border-light-border bg-light-surface p-6 dark:border-dark-border dark:bg-dark-surface"
        >
          <div className="flex items-center gap-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
            <div className="h-2 w-2 rounded-full bg-status-failure animate-pulse" />
            <span className="font-mono">build-failed.log</span>
          </div>
          <div className="mt-4 space-y-1.5 font-mono text-xs text-light-text-secondary dark:text-dark-text-secondary">
            <p className="opacity-40">[12:34:01] Installing dependencies...</p>
            <p className="opacity-40">[12:34:12] Running lint checks...</p>
            <p className="opacity-40">[12:34:18] Starting test suite...</p>
            <p className="opacity-50">[12:34:45] ...</p>
            <p className="opacity-50">[12:34:46] ...</p>
            <p className="opacity-60">[12:34:47] Running auth.test.ts</p>
            <p className="text-status-failure">{'>'} Error: Expected 200 but received 401</p>
            <p className="text-status-failure">{'>'} at AuthService.test.ts:42:15</p>
            <p className="opacity-40">[12:34:48] Pipeline failed</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
