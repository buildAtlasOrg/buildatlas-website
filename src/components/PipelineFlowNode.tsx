"use client";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { AlertCircle, CheckCircle2, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./PipelineFlowNode.module.css";

export type PipelineNodeStatus = "success" | "failed" | "blocked";

export type PipelineFlowNodeData = {
  label: string;
  stage: string;
  duration: string;
  detail: string;
  status: PipelineNodeStatus;
  width?: number;
};

export type PipelineFlowNodeType = Node<PipelineFlowNodeData, "pipelineJob">;

const statusConfig = {
  success: {
    icon: CheckCircle2,
    className: styles.statusSuccess,
  },
  failed: {
    icon: AlertCircle,
    className: styles.statusFailed,
  },
  blocked: {
    icon: Clock3,
    className: styles.statusBlocked,
  },
} satisfies Record<PipelineNodeStatus, { icon: typeof CheckCircle2; className: string }>;

export default function PipelineFlowNode({ data }: NodeProps<PipelineFlowNodeType>) {
  const config = statusConfig[data.status];
  const StatusIcon = config.icon;
  const width = data.width ?? 184;

  return (
    <div
      className={cn(
        styles.node,
        data.status === "success" && styles.nodeSuccess,
        data.status === "failed" && styles.nodeFailed,
        data.status === "blocked" && styles.nodeBlocked,
      )}
      style={{ ["--node-width" as string]: `${width}px` }}
    >
      <Handle type="target" position={Position.Left} className={styles.handle} />
      <div className={styles.stage}>{data.stage}</div>
      <div className={styles.row}>
        <span className={cn(styles.statusShell, config.className)}>
          <StatusIcon className="h-4 w-4" strokeWidth={2.2} />
        </span>

        <div className={styles.copy}>
          <div className={styles.label}>{data.label}</div>
          <div className={styles.meta}>
            <span className={styles.duration}>{data.duration}</span>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.detail}>{data.detail}</span>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className={styles.handle} />
    </div>
  );
}
