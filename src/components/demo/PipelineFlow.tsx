"use client";

import { useMemo } from "react";
import { Job, JobStatus } from "./mockData";

interface Props {
  jobs: Job[];
  selectedJobId: string | null;
  onJobClick: (job: Job) => void;
}

const NODE_W = 164;
const NODE_H = 62;
const COL_GAP = 76;
const ROW_GAP = 18;
const PAD_X = 48;
const PAD_Y = 40;

function computeLayout(jobs: Job[]) {
  const depths: Record<string, number> = {};

  function depth(id: string): number {
    if (depths[id] !== undefined) return depths[id];
    const job = jobs.find((j) => j.id === id);
    if (!job || job.needs.length === 0) return (depths[id] = 0);
    depths[id] = Math.max(...job.needs.map(depth)) + 1;
    return depths[id];
  }
  jobs.forEach((j) => depth(j.id));

  const cols: string[][] = [];
  jobs.forEach((j) => {
    const d = depths[j.id];
    if (!cols[d]) cols[d] = [];
    cols[d].push(j.id);
  });

  const maxRows = Math.max(...cols.map((c) => c.length));
  const maxColH = maxRows * (NODE_H + ROW_GAP) - ROW_GAP;

  const pos: Record<string, { x: number; y: number }> = {};
  cols.forEach((col, ci) => {
    const colH = col.length * (NODE_H + ROW_GAP) - ROW_GAP;
    const startY = PAD_Y + (maxColH - colH) / 2;
    col.forEach((id, ri) => {
      pos[id] = {
        x: PAD_X + ci * (NODE_W + COL_GAP),
        y: startY + ri * (NODE_H + ROW_GAP),
      };
    });
  });

  return {
    pos,
    svgW: PAD_X * 2 + cols.length * NODE_W + (cols.length - 1) * COL_GAP,
    svgH: PAD_Y * 2 + maxColH,
  };
}

const STATUS_STYLE: Record<JobStatus, { bg: string; border: string; label: string; glow: string }> = {
  success:     { bg: "#0a1f14", border: "#10b98166", label: "#34d399", glow: "" },
  failure:     { bg: "#1a0a0a", border: "#ef444488", label: "#f87171", glow: "0 0 14px 2px rgba(239,68,68,0.18)" },
  in_progress: { bg: "#1a1500", border: "#f59e0b66", label: "#fbbf24", glow: "" },
  pending:     { bg: "#0d1117",  border: "#ffffff14", label: "#6b7280", glow: "" },
  skipped:     { bg: "#0d1117",  border: "#ffffff08", label: "#374151", glow: "" },
};

const EDGE_COLOR: Record<JobStatus, string> = {
  success:     "#10b981",
  failure:     "#ef4444",
  in_progress: "#f59e0b",
  pending:     "#1f2937",
  skipped:     "#1a1f2e",
};

const DURATION_COLOR: Record<JobStatus, string> = {
  success:     "#10b981",
  failure:     "#ef4444",
  in_progress: "#f59e0b",
  pending:     "#374151",
  skipped:     "#1f2937",
};

function StatusIcon({ status }: { status: JobStatus }) {
  if (status === "success")
    return (
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  if (status === "failure")
    return (
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  if (status === "in_progress")
    return (
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="animate-spin">
        <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="4" opacity="0.2" />
        <path fill="#f59e0b" opacity="0.8" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
      </svg>
    );
  if (status === "skipped")
    return (
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#374151" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
      </svg>
    );
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#4b5563" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" fill="#4b5563" />
    </svg>
  );
}

export default function PipelineFlow({ jobs, selectedJobId, onJobClick }: Props) {
  const { pos, svgW, svgH } = useMemo(() => computeLayout(jobs), [jobs]);

  const edges = useMemo(() => {
    const out: Array<{ key: string; d: string; color: string; dashed: boolean }> = [];
    jobs.forEach((job) => {
      const to = pos[job.id];
      if (!to) return;
      job.needs.forEach((needId) => {
        const from = pos[needId];
        if (!from) return;
        const x1 = from.x + NODE_W;
        const y1 = from.y + NODE_H / 2;
        const x2 = to.x;
        const y2 = to.y + NODE_H / 2;
        const cx = (x1 + x2) / 2;
        const dashed = job.status === "pending" || job.status === "skipped";
        const needJob = jobs.find((j) => j.id === needId)!;
        const color = dashed ? "#1f2937" : EDGE_COLOR[needJob.status] ?? "#374151";
        out.push({ key: `${needId}->${job.id}`, d: `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`, color, dashed });
      });
    });
    return out;
  }, [jobs, pos]);

  const canvasW = Math.max(svgW, 400);
  const canvasH = Math.max(svgH, 300);

  return (
    <div
      className="relative h-full w-full overflow-auto"
      style={{
        backgroundColor: "#080b10",
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
    >
      <div style={{ position: "relative", width: canvasW, height: canvasH, minWidth: "100%", minHeight: "100%" }}>
        <svg
          style={{ position: "absolute", inset: 0, overflow: "visible" }}
          width={canvasW}
          height={canvasH}
        >
          <defs>
            <marker id="arr-ok" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0,8 3,0 6" fill="#10b981" opacity="0.7" />
            </marker>
            <marker id="arr-fail" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0,8 3,0 6" fill="#ef4444" opacity="0.7" />
            </marker>
            <marker id="arr-dim" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0,8 3,0 6" fill="#1f2937" />
            </marker>
          </defs>
          {edges.map((e) => {
            const mid = e.color === "#10b981" ? "arr-ok" : e.color === "#ef4444" ? "arr-fail" : "arr-dim";
            return (
              <path
                key={e.key}
                d={e.d}
                fill="none"
                stroke={e.color}
                strokeWidth={e.dashed ? 1.5 : 2}
                strokeDasharray={e.dashed ? "5 4" : undefined}
                strokeOpacity={e.dashed ? 0.25 : 0.65}
                markerEnd={`url(#${mid})`}
              />
            );
          })}
        </svg>

        {jobs.map((job) => {
          const p = pos[job.id];
          if (!p) return null;
          const isSelected = selectedJobId === job.id;
          const s = STATUS_STYLE[job.status];
          const isDimmed = job.status === "skipped" || job.status === "pending";
          const barW = job.durationSeconds > 0
            ? Math.min(100, Math.round((job.durationSeconds / 120) * 100))
            : 0;

          return (
            <button
              key={job.id}
              onClick={() => onJobClick(job)}
              style={{
                position: "absolute",
                left: p.x,
                top: p.y,
                width: NODE_W,
                height: NODE_H,
                backgroundColor: s.bg,
                border: `1px solid ${s.border.split(" ")[0]}`,
                boxShadow: isSelected
                  ? `0 0 0 2px rgba(255,255,255,0.15), ${s.glow || ""}`
                  : s.glow || undefined,
                borderRadius: 12,
                opacity: isDimmed ? 0.45 : 1,
                overflow: "hidden",
                cursor: "pointer",
                padding: "10px 12px 8px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                transition: "transform 0.12s, box-shadow 0.12s, opacity 0.12s",
                transform: isSelected ? "scale(1.04)" : undefined,
              }}
              onMouseEnter={(e) => {
                if (!isSelected) (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                if (!isSelected) (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
                <StatusIcon status={job.status} />
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: s.label,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: 1.3,
                }}>
                  {job.name}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "monospace", fontSize: 9, color: "#4b5563" }}>
                  {job.duration}
                </span>
                {job.steps.length > 0 && (
                  <span style={{ fontSize: 9, color: "#374151" }}>
                    {job.steps.length} steps
                  </span>
                )}
              </div>

              {barW > 0 && (
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: 2,
                  width: `${barW}%`,
                  backgroundColor: DURATION_COLOR[job.status],
                  opacity: 0.5,
                  borderRadius: "0 0 0 12px",
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
