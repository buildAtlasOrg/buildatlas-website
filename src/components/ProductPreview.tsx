"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock, Play, GitBranch, Calendar, User, Timer, MoreHorizontal, Search, Bell, Settings } from "lucide-react";

interface PipelineNode {
  id: string;
  name: string;
  status: "success" | "fail" | "running" | "pending";
  duration: string;
  x: number;
  y: number;
}

const nodes: PipelineNode[] = [
  { id: "1", name: "Install Dependencies", status: "success", duration: "12s", x: 50, y: 80 },
  { id: "2", name: "Lint", status: "success", duration: "8s", x: 250, y: 40 },
  { id: "3", name: "Unit Tests", status: "success", duration: "45s", x: 250, y: 120 },
  { id: "4", name: "Integration Tests", status: "fail", duration: "1m 23s", x: 450, y: 80 },
  { id: "5", name: "Build", status: "pending", duration: "—", x: 650, y: 40 },
  { id: "6", name: "Deploy Staging", status: "pending", duration: "—", x: 650, y: 120 },
  { id: "7", name: "Deploy Production", status: "pending", duration: "—", x: 850, y: 80 },
];

const connections = [
  { from: "1", to: "2" },
  { from: "1", to: "3" },
  { from: "2", to: "4" },
  { from: "3", to: "4" },
  { from: "4", to: "5" },
  { from: "4", to: "6" },
  { from: "5", to: "7" },
  { from: "6", to: "7" },
];

const statusConfig = {
  success: { bg: "bg-status-success", ring: "ring-status-success/20", icon: CheckCircle2 },
  fail: { bg: "bg-status-failure", ring: "ring-status-failure/30", icon: XCircle },
  running: { bg: "bg-status-running", ring: "ring-status-running/20", icon: Play },
  pending: { bg: "bg-status-pending", ring: "ring-status-pending/20", icon: Clock },
};

export default function ProductPreview() {
  return (
    <section id="preview" className="relative py-28 sm:py-36">
      <div className="section-divider" />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-500/5 via-purple-500/5 to-cyan-500/5 blur-[100px] dark:from-brand-500/10 dark:via-purple-500/10 dark:to-cyan-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="label-badge">
            <Play className="h-3.5 w-3.5 text-brand-400" />
            Product Preview
          </span>
          <h2 className="heading-lg mt-6 text-balance">
            See Your Pipelines Like Never Before
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-light-text-secondary dark:text-dark-text-secondary">
            A real-time dashboard that shows every stage, dependency, and failure in your CI/CD pipelines.
          </p>
        </motion.div>

        {/* Product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <div className="relative overflow-hidden rounded-2xl border border-light-border bg-white shadow-2xl shadow-brand-500/5 dark:border-dark-border dark:bg-dark-bg dark:shadow-none">
            {/* Window chrome */}
            <div className="flex items-center justify-between border-b border-light-border bg-light-surface px-4 py-3 dark:border-dark-border dark:bg-dark-surface">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-status-failure/80" />
                <div className="h-3 w-3 rounded-full bg-status-running/80" />
                <div className="h-3 w-3 rounded-full bg-status-success/80" />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-light-border bg-white px-3 py-1.5 dark:border-dark-border dark:bg-dark-surface">
                <Search className="h-3.5 w-3.5 text-light-text-secondary dark:text-dark-text-secondary" />
                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Search pipelines...</span>
              </div>
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
                <Settings className="h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
                <div className="h-6 w-6 rounded-full bg-brand-500" />
              </div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="hidden w-56 shrink-0 border-r border-light-border bg-light-surface/50 p-4 dark:border-dark-border dark:bg-dark-surface md:block">
                <div className="space-y-1">
                  {["Dashboard", "Pipelines", "Settings"].map((item, i) => (
                    <div
                      key={item}
                      className={`rounded-lg px-3 py-2 text-sm ${
                        i === 1
                          ? "bg-brand-500/10 font-medium text-brand-600 dark:text-brand-400"
                          : "text-light-text-secondary dark:text-dark-text-secondary"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-light-text-secondary dark:text-dark-text-secondary">Recent</p>
                  {["deploy-pipeline", "test-suite", "nightly-build"].map((name, i) => (
                    <div
                      key={name}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                        i === 0 ? "bg-white dark:bg-dark-surface" : ""
                      } text-light-text-secondary dark:text-dark-text-secondary`}
                    >
                      <span className={`h-2 w-2 rounded-full ${i === 0 ? "bg-status-failure" : i === 1 ? "bg-status-success" : "bg-status-running"}`} />
                      {name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-6">
                {/* Pipeline header */}
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
                        deploy-pipeline
                      </h3>
                      <span className="rounded bg-status-failure/10 px-2 py-0.5 text-xs font-medium text-status-failure">
                        Failed
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      <span className="flex items-center gap-1.5">
                        <GitBranch className="h-3.5 w-3.5" /> main
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" /> john.doe
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> 2 minutes ago
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Timer className="h-3.5 w-3.5" /> 2m 28s
                      </span>
                    </div>
                  </div>
                  <button className="rounded-lg border border-light-border px-3 py-1.5 text-sm text-light-text-secondary transition-colors hover:bg-light-surface dark:border-dark-border dark:text-dark-text-secondary dark:hover:bg-dark-surface">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                {/* Pipeline graph visualization */}
                <div className="relative h-[220px] rounded-xl border border-light-border bg-light-surface p-4 dark:border-dark-border dark:bg-dark-bg">
                  {/* SVG for connections */}
                  <svg className="absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 10 3.5, 0 7"
                          className="fill-light-border dark:fill-dark-border"
                        />
                      </marker>
                    </defs>
                    {connections.map((conn, i) => {
                      const fromNode = nodes.find((n) => n.id === conn.from)!;
                      const toNode = nodes.find((n) => n.id === conn.to)!;
                      const isPending = toNode.status === "pending";
                      return (
                        <motion.line
                          key={i}
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                          x1={fromNode.x + 70}
                          y1={fromNode.y + 20}
                          x2={toNode.x - 10}
                          y2={toNode.y + 20}
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray={isPending ? "4 2" : "none"}
                          className="text-light-border dark:text-dark-border"
                          markerEnd="url(#arrowhead)"
                        />
                      );
                    })}
                  </svg>

                  {/* Nodes */}
                  {nodes.map((node, i) => {
                    const config = statusConfig[node.status];
                    const Icon = config.icon;
                    return (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                        className={`absolute flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm transition-transform hover:scale-105 dark:bg-dark-surface ${
                          node.status === "fail"
                            ? "border-status-failure/30 ring-2 ring-status-failure/10"
                            : "border-light-border dark:border-dark-border"
                        }`}
                        style={{ left: node.x, top: node.y }}
                      >
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full ${config.bg}`}>
                          <Icon className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-light-text dark:text-dark-text whitespace-nowrap">
                            {node.name}
                          </p>
                          <p className="text-[10px] text-light-text-secondary dark:text-dark-text-secondary">
                            {node.duration}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Error details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-4 rounded-lg border border-status-failure/20 bg-status-failure/5 p-4"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-status-failure">
                    <XCircle className="h-4 w-4" />
                    Integration Tests Failed
                  </div>
                  <pre className="mt-2 overflow-x-auto font-mono text-xs text-status-failure/80">
{`Error: Expected response status 200, received 401
    at AuthService.test.ts:42:15
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`}
                  </pre>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
