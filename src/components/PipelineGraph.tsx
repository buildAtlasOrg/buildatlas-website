"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Clock, GitBranch } from "lucide-react";

type StageStatus = "success" | "fail" | "running" | "pending";

interface Stage {
  name: string;
  status: StageStatus;
  duration: string;
}

const stages: Stage[] = [
  { name: "Install Dependencies", status: "success", duration: "12s" },
  { name: "Lint & Format", status: "success", duration: "8s" },
  { name: "Run Tests", status: "fail", duration: "43s" },
  { name: "Build", status: "pending", duration: "—" },
  { name: "Deploy to Prod", status: "pending", duration: "—" },
];

const statusConfig = {
  success: {
    bg: "bg-status-success/10",
    border: "border-status-success/30",
    text: "text-status-success",
    dot: "bg-status-success",
    icon: CheckCircle2,
  },
  fail: {
    bg: "bg-status-failure/10",
    border: "border-status-failure/50 ring-2 ring-status-failure/20",
    text: "text-status-failure",
    dot: "bg-status-failure",
    icon: XCircle,
  },
  running: {
    bg: "bg-status-running/10",
    border: "border-status-running/30",
    text: "text-status-running",
    dot: "bg-status-running animate-pulse",
    icon: Loader2,
  },
  pending: {
    bg: "bg-light-surface dark:bg-dark-surface",
    border: "border-light-border dark:border-dark-border",
    text: "text-status-pending",
    dot: "bg-status-pending",
    icon: Clock,
  },
};

export default function PipelineGraph() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative rounded-2xl border border-light-border bg-white p-6 shadow-card dark:border-dark-border dark:bg-dark-surface sm:p-8"
    >
      {/* Window chrome */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-status-failure/80" />
          <div className="h-3 w-3 rounded-full bg-status-running/80" />
          <div className="h-3 w-3 rounded-full bg-status-success/80" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <GitBranch className="h-3.5 w-3.5 text-light-text-secondary dark:text-dark-text-secondary" />
            <span className="font-mono text-xs text-light-text-secondary dark:text-dark-text-secondary">main</span>
          </div>
          <div className="h-4 w-px bg-light-border dark:bg-dark-border" />
          <span className="font-mono text-xs text-light-text-secondary dark:text-dark-text-secondary">
            deploy-pipeline.yml
          </span>
          <span className="rounded bg-status-failure/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-status-failure">
            FAILED
          </span>
        </div>
      </div>

      {/* Pipeline stages */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {stages.map((stage, i) => {
          const config = statusConfig[stage.status];
          const Icon = config.icon;
          
          return (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex items-center gap-3 sm:gap-4"
            >
              <div
                className={`group relative rounded-xl border px-4 py-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-soft cursor-pointer ${config.bg} ${config.border}`}
              >
                {/* Status indicator dot */}
                <div className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full ${config.dot}`} />
                
                {/* Content */}
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${config.text} ${stage.status === "running" ? "animate-spin" : ""}`} />
                  <div className="text-left">
                    <p className={`text-xs font-semibold sm:text-sm ${config.text}`}>
                      {stage.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-light-text-secondary dark:text-dark-text-secondary">
                      {stage.duration}
                    </p>
                  </div>
                </div>
                
                {/* Error message for failed stage */}
                {stage.status === "fail" && (
                  <div className="mt-2 rounded bg-status-failure/10 px-2 py-1">
                    <p className="font-mono text-[10px] text-status-failure">
                      Error: assertion failed in auth.test.ts:42
                    </p>
                  </div>
                )}
              </div>

              {/* Connector arrow */}
              {i < stages.length - 1 && (
                <motion.svg
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  width="32"
                  height="12"
                  viewBox="0 0 32 12"
                  className="shrink-0 text-light-border dark:text-dark-border"
                >
                  <line
                    x1="0"
                    y1="6"
                    x2="24"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={stage.status === "pending" ? "4 2" : "none"}
                  />
                  <polygon points="24,1 32,6 24,11" fill="currentColor" />
                </motion.svg>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-light-border pt-6 text-xs text-light-text-secondary dark:border-dark-border dark:text-dark-text-secondary sm:gap-6">
        {[
          { status: "success", label: "Passed" },
          { status: "fail", label: "Failed" },
          { status: "running", label: "Running" },
          { status: "pending", label: "Pending" },
        ].map(({ status, label }) => (
          <span key={status} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${statusConfig[status as StageStatus].dot}`} />
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
