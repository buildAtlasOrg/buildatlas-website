"use client";

import { Background, BackgroundVariant, MarkerType, ReactFlow, type Edge } from "@xyflow/react";
import { ArrowUpRight, GitBranch, PackageOpen, ShieldAlert, TimerReset } from "lucide-react";
import BorderGlow from "./BorderGlow";
import PipelineFlowNode, {
  type PipelineFlowNodeData,
  type PipelineFlowNodeType,
} from "./PipelineFlowNode";
import flowStyles from "./PipelineFlow.module.css";

const nodeTypes = {
  pipelineJob: PipelineFlowNode,
};

const graphTheme = {
  borderGlow: {
    backgroundColor: "var(--panel)",
    fillOpacity: 0.18,
  },
  fitView: {
    padding: 0.08,
    minZoom: 0.76,
    maxZoom: 1,
  },
} as const;

const runMeta = [
  { label: "Branch", value: "main" },
  { label: "Commit", value: "a18c4b2" },
  { label: "Trigger", value: "pull_request" },
  { label: "Jobs", value: "9 total, 1 failed, 4 blocked" },
] as const;

const nodes: PipelineFlowNodeType[] = [
  {
    id: "install",
    type: "pipelineJob",
    position: { x: 24, y: 124 },
    data: {
      stage: "Setup",
      label: "Install Dependencies",
      duration: "12s",
      detail: "npm ci, cache restored",
      status: "success",
      width: 220,
    },
  },
  {
    id: "lint",
    type: "pipelineJob",
    position: { x: 300, y: 20 },
    data: {
      stage: "Checks",
      label: "Lint",
      duration: "8s",
      detail: "eslint",
      status: "success",
      width: 132,
    },
  },
  {
    id: "unit",
    type: "pipelineJob",
    position: { x: 300, y: 124 },
    data: {
      stage: "Checks",
      label: "Unit Tests",
      duration: "45s",
      detail: "214 passing",
      status: "success",
      width: 154,
    },
  },
  {
    id: "types",
    type: "pipelineJob",
    position: { x: 300, y: 228 },
    data: {
      stage: "Checks",
      label: "Typecheck",
      duration: "11s",
      detail: "tsc --noEmit",
      status: "success",
      width: 156,
    },
  },
  {
    id: "integration",
    type: "pipelineJob",
    position: { x: 594, y: 124 },
    data: {
      stage: "Verify",
      label: "Integration Tests",
      duration: "1m 23s",
      detail: "auth-contract.spec.ts failed",
      status: "failed",
      width: 238,
    },
  },
  {
    id: "build-web",
    type: "pipelineJob",
    position: { x: 930, y: 44 },
    data: {
      stage: "Build",
      label: "Build Web Artifact",
      duration: "blocked",
      detail: "waiting on test gate",
      status: "blocked",
      width: 186,
    },
  },
  {
    id: "build-worker",
    type: "pipelineJob",
    position: { x: 930, y: 168 },
    data: {
      stage: "Build",
      label: "Build Worker Image",
      duration: "blocked",
      detail: "docker publish paused",
      status: "blocked",
      width: 194,
    },
  },
  {
    id: "deploy-staging",
    type: "pipelineJob",
    position: { x: 1218, y: 76 },
    data: {
      stage: "Deploy",
      label: "Deploy Staging",
      duration: "queued",
      detail: "awaiting both artifacts",
      status: "blocked",
      width: 184,
    },
  },
  {
    id: "deploy-production",
    type: "pipelineJob",
    position: { x: 1218, y: 198 },
    data: {
      stage: "Release",
      label: "Deploy Production",
      duration: "blocked",
      detail: "approval gate locked",
      status: "blocked",
      width: 196,
    },
  },
];

const edgeStyles = {
  default: {
    stroke: "rgba(148, 163, 184, 0.45)",
    strokeWidth: 2,
  },
  failed: {
    stroke: "rgba(239, 68, 68, 0.38)",
    strokeWidth: 2,
    strokeDasharray: "7 5",
  },
  blocked: {
    stroke: "rgba(100, 116, 139, 0.42)",
    strokeWidth: 2,
    strokeDasharray: "6 4",
  },
} as const;

function createEdge(
  source: string,
  target: string,
  tone: keyof typeof edgeStyles = "default",
): Edge {
  const style = edgeStyles[tone];

  return {
    id: `${source}-${target}`,
    source,
    target,
    type: "smoothstep",
    animated: tone === "failed",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 18,
      height: 18,
      color: style.stroke,
    },
    style,
  };
}

const edges: Edge[] = [
  createEdge("install", "lint"),
  createEdge("install", "unit"),
  createEdge("install", "types"),
  createEdge("lint", "integration"),
  createEdge("unit", "integration"),
  createEdge("types", "integration"),
  createEdge("integration", "build-web", "failed"),
  createEdge("integration", "build-worker", "failed"),
  createEdge("build-web", "deploy-staging", "blocked"),
  createEdge("build-worker", "deploy-staging", "blocked"),
  createEdge("build-web", "deploy-production", "blocked"),
  createEdge("build-worker", "deploy-production", "blocked"),
  createEdge("deploy-staging", "deploy-production", "blocked"),
];

export default function PipelineGraph() {
  return (
    <BorderGlow className="min-h-[24rem] rounded-[50px]" borderRadius={50} {...graphTheme.borderGlow}>
      <div
        id="graph-preview"
        className="relative min-h-[24rem] scroll-mt-16 overflow-hidden rounded-[50px] p-5 sm:scroll-mt-20 sm:p-6"
      >
        <div className="relative z-10 flex items-center justify-between border-b border-[color:var(--line)] pb-4">
          <div>
            <p className="eyebrow">Pipeline view</p>
            <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[color:var(--ink)]">
              Demo Repo
            </p>
          </div>
          <span className="border-glow border border-[color:var(--failure-strong)] bg-[color:var(--failure-soft)] px-3 py-1.5 text-sm font-medium text-[color:var(--failure-ink)]">
            Failed after 1m 23s
          </span>
        </div>

        <div className="relative z-10 mt-4 flex flex-wrap gap-2 border-b border-[color:var(--line)] pb-4">
          {runMeta.map((item) => (
            <span
              key={item.label}
              className="border-glow inline-flex items-center gap-2 border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 py-1.5 text-xs text-[color:var(--ink-soft)]"
            >
              <span className="font-medium text-[color:var(--ink)]">{item.label}</span>
              <span>{item.value}</span>
            </span>
          ))}
        </div>

        <div className="relative z-10 mt-5 grid gap-5 lg:grid-cols-[1.55fr_0.45fr]">
          <div className={flowStyles.shell}>
            <div className={flowStyles.flow}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={graphTheme.fitView}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                preventScrolling={false}
                proOptions={{ hideAttribution: true }}
              >
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={20}
                  size={1}
                  color="var(--flow-dot)"
                />
              </ReactFlow>
            </div>
          </div>

          <div className="border-t border-[color:var(--line)] pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
            <div className="space-y-4">
              <div>
                <p className="detail-label">Failure reason</p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--ink-soft)]">
                  Integration tests stopped on the auth contract suite after a fixture
                  mismatch. Downstream build and deploy jobs inherited the block
                  automatically.
                </p>
              </div>

              <div className="border-t border-[color:var(--line)] pt-4">
                <div className="flex items-center gap-3 text-sm text-[color:var(--ink)]">
                  <GitBranch className="h-4 w-4 text-[color:var(--signal)]" />
                  Parallel checks fan out from setup and converge on the failing gate
                </div>
              </div>

              <div className="border-t border-[color:var(--line)] pt-4">
                <div className="flex items-center gap-3 text-sm text-[color:var(--ink)]">
                  <TimerReset className="h-4 w-4 text-[rgb(22,163,74)]" />
                  Each node keeps duration, stage, and the most useful execution detail
                </div>
              </div>

              <div className="border-t border-[color:var(--line)] pt-4">
                <div className="flex items-center gap-3 text-sm text-[color:var(--ink)]">
                  <PackageOpen className="h-4 w-4 text-[color:var(--moss)]" />
                  Artifact builds and deploy environments stay visible even when blocked
                </div>
              </div>

              <div className="border-t border-[color:var(--line)] pt-4">
                <div className="flex items-center gap-3 text-sm text-[color:var(--ink)]">
                  <ShieldAlert className="h-4 w-4 text-[rgb(239,68,68)]" />
                  Approval and release gates stay attached to the upstream dependency path
                </div>
              </div>

              <div className="pt-4">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--signal)]">
                  Swap this preview for your live pipeline data
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BorderGlow>
  );
}
