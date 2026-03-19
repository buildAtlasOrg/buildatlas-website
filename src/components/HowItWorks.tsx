"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BorderGlow from "./BorderGlow";
import { SectionDivider, SectionIntro, SectionShell } from "./Section";

const steps = [
  {
    title: "Connect Your Repository",
    body: "Link your GitHub, GitLab, or Bitbucket repo in one click. BuildAtlas plugs into the tools your team already uses.",
    action: "Connect repo",
    preview: "repo",
  },
  {
    title: "Import Pipeline Data",
    body: "BuildAtlas reads your workflow files, pipeline config, and job definitions so the structure is ready before anyone digs through logs.",
    action: "Import config",
    preview: "import",
  },
  {
    title: "View the Visual Graph",
    body: "See the run as a clean dependency map, follow what ran first, and understand how each job connects to the next.",
    action: "Open graph",
    preview: "graph",
  },
  {
    title: "Debug Failures Faster",
    body: "Jump straight to the broken job, inspect the failure context, and see which downstream work was blocked by the same issue.",
    action: "Inspect failure",
    preview: "debug",
  },
] as const;

type StepPreviewKind = (typeof steps)[number]["preview"];

const miniPanelClass =
  "rounded-[1.35rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] shadow-[0_14px_30px_var(--shadow-soft)]";

const miniBadgeClass =
  "rounded-full border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--ink-soft)]";

function RepoPreview() {
  return (
    <div className="mx-auto w-full max-w-[15rem]">
      <div className={`mx-auto flex w-fit flex-wrap items-center justify-center gap-2 px-3 py-2 ${miniPanelClass}`}>
        <span className={miniBadgeClass}>GitHub</span>
        <span className={miniBadgeClass}>GitLab</span>
        <span className={miniBadgeClass}>Bitbucket</span>
      </div>

      <div className={`mt-4 p-4 ${miniPanelClass}`}>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--success)]" />
          <span className="text-sm font-medium text-[color:var(--ink-soft)]">
            Repository connected
          </span>
        </div>

        <div className="mt-4 rounded-[1rem] bg-[color:var(--surface-soft)] px-4 py-3 text-left">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
            Source
          </p>
          <p className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
            acme/web-app
          </p>
        </div>
      </div>
    </div>
  );
}

function ImportPreview() {
  return (
    <div className="mx-auto w-full max-w-[16rem]">
      <div className={`p-3 ${miniPanelClass}`}>
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
          <span>CI sources</span>
          <span>3 files</span>
        </div>

        <div className="mt-3 space-y-2">
          {[
            [".github/workflows/build.yml", "GitHub"],
            ["pipeline.yml", "Buildkite"],
            [".gitlab-ci.yml", "GitLab"],
          ].map(([name, label]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-[1rem] bg-[color:var(--surface-soft)] px-3 py-2"
            >
              <span className="truncate pr-3 text-sm text-[color:var(--ink)]">{name}</span>
              <span className={miniBadgeClass}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[1.35fr_0.8fr] gap-3">
        <div className={`p-3 ${miniPanelClass}`}>
          <p className="text-xs text-[color:var(--ink-soft)]">Jobs discovered</p>
          <div className="mt-3 h-2 rounded-full bg-[color:var(--surface-soft)]">
            <div className="h-full w-[74%] rounded-full bg-[color:var(--signal)]" />
          </div>
        </div>

        <div className={`flex flex-col justify-end p-3 ${miniPanelClass}`}>
          <p className="text-2xl font-semibold tracking-[-0.05em] text-[color:var(--ink)]">18</p>
          <p className="text-xs text-[color:var(--ink-soft)]">pipeline nodes</p>
        </div>
      </div>
    </div>
  );
}

function GraphPreview() {
  return (
    <div className={`relative mx-auto h-44 w-full max-w-[16rem] overflow-hidden p-4 ${miniPanelClass}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 240 176"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <path d="M48 48 H116" stroke="var(--line-strong)" strokeWidth="2" />
        <path d="M124 48 H190" stroke="var(--line-strong)" strokeWidth="2" />
        <path d="M116 48 V118" stroke="var(--line-strong)" strokeWidth="2" />
        <path d="M124 48 V118" stroke="var(--line-strong)" strokeWidth="2" />
        <path d="M48 118 H116" stroke="var(--line-strong)" strokeWidth="2" />
        <path d="M124 118 H190" stroke="var(--line-strong)" strokeWidth="2" />
      </svg>

      {[
        { label: "lint", className: "left-5 top-7", tone: "bg-[color:var(--signal)]" },
        {
          label: "test",
          className: "left-[6.8rem] top-7",
          tone: "bg-[color:var(--success)]",
        },
        {
          label: "build",
          className: "right-5 top-7",
          tone: "bg-[color:var(--moss)]",
        },
        {
          label: "auth",
          className: "left-[6.8rem] bottom-7",
          tone: "bg-[color:var(--ember)]",
        },
        {
          label: "deploy",
          className: "right-5 bottom-7",
          tone: "bg-[color:var(--signal-strong)]",
        },
      ].map((node) => (
        <div key={node.label} className={`absolute ${node.className}`}>
          <div className="flex flex-col items-center gap-2">
            <span className={`h-3.5 w-3.5 rounded-full ${node.tone}`} />
            <span className="text-xs font-medium text-[color:var(--ink-soft)]">{node.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function DebugPreview() {
  return (
    <div className="mx-auto w-full max-w-[16rem]">
      <div className={`p-3 ${miniPanelClass}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
              Failing job
            </p>
            <p className="mt-1 text-base font-semibold tracking-[-0.03em] text-[color:var(--ink)]">
              auth-contract
            </p>
          </div>
          <span className="rounded-full bg-[color:var(--failure-strong)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--failure-ink)]">
            failed
          </span>
        </div>

        <div className="mt-4 space-y-2 rounded-[1rem] bg-[color:var(--surface-soft)] px-3 py-3">
          <div className="h-2 rounded-full bg-[color:var(--failure-strong)]" />
          <div className="h-2 w-[84%] rounded-full bg-[color:var(--line)]" />
          <div className="h-2 w-[62%] rounded-full bg-[color:var(--line)]" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className={`p-3 ${miniPanelClass}`}>
          <p className="text-2xl font-semibold tracking-[-0.05em] text-[color:var(--ink)]">2</p>
          <p className="text-xs text-[color:var(--ink-soft)]">blocked jobs</p>
        </div>
        <div className={`p-3 ${miniPanelClass}`}>
          <p className="text-2xl font-semibold tracking-[-0.05em] text-[color:var(--ink)]">1</p>
          <p className="text-xs text-[color:var(--ink-soft)]">root cause</p>
        </div>
      </div>
    </div>
  );
}

function StepPreview({ kind }: { kind: StepPreviewKind }) {
  switch (kind) {
    case "repo":
      return <RepoPreview />;
    case "import":
      return <ImportPreview />;
    case "graph":
      return <GraphPreview />;
    case "debug":
      return <DebugPreview />;
    default:
      return null;
  }
}

export default function HowItWorks() {
  return (
    <SectionShell id="how-it-works">
      <SectionDivider />

      <SectionIntro
        title="See how BuildAtlas makes failed pipelines easier to understand."
        description="BuildAtlas connects to your repository, reads pipeline structure, surfaces failures as maps, and preserves the context your team needs to debug and hand work off clearly."
        className="max-w-4xl"
      />

      <div className="relative mt-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative z-10"
            >
              <BorderGlow
                className="h-full w-full rounded-[2rem]"
                backgroundColor="var(--surface)"
                fillOpacity={0.12}
              >
                <article className="flex h-full min-h-[31rem] flex-col rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-6 py-6 shadow-[0_18px_36px_var(--shadow-soft)] backdrop-blur-md sm:px-7">
                  <div>
                    <h3 className="text-[clamp(1.45rem,2vw,2rem)] font-semibold tracking-[-0.05em] text-[color:var(--ink)]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[20ch] text-[1.05rem] leading-8 text-[color:var(--ink-soft)]">
                      {step.body}
                    </p>
                  </div>

                  <div className="flex flex-1 items-center justify-center py-8">
                    <StepPreview kind={step.preview} />
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-2 text-[0.98rem] font-semibold text-[color:var(--ink)]">
                    <span>{step.action}</span>
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </div>
                </article>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
