"use client";

import { motion } from "framer-motion";
import { Bug, Download, Eye, GitBranch } from "lucide-react";
import BorderGlow from "./BorderGlow";
import { SectionDivider, SectionIntro, SectionShell } from "./Section";

const steps = [
  {
    number: "01",
    icon: GitBranch,
    title: "Connect Your Repository",
    body: "Link your GitHub, GitLab, or Bitbucket repo in one click. We support all major Git providers.",
    tileClassName:
      "bg-[linear-gradient(180deg,var(--step-one-start)_0%,var(--step-one-end)_100%)] text-white shadow-[0_18px_36px_var(--step-one-shadow)]",
  },
  {
    number: "02",
    icon: Download,
    title: "Import Pipeline Data",
    body: "BuildAtlas automatically reads your CI configuration files and workflow definitions.",
    tileClassName:
      "bg-[linear-gradient(180deg,var(--step-two-start)_0%,var(--step-two-end)_100%)] text-white shadow-[0_18px_36px_var(--step-two-shadow)]",
  },
  {
    number: "03",
    icon: Eye,
    title: "View the Visual Graph",
    body: "See your entire pipeline as an interactive, zoomable map with real-time status updates.",
    tileClassName:
      "bg-[linear-gradient(180deg,var(--step-three-start)_0%,var(--step-three-end)_100%)] text-white shadow-[0_18px_36px_var(--step-three-shadow)]",
  },
  {
    number: "04",
    icon: Bug,
    title: "Debug Failures Faster",
    body: "Click any failing node to jump straight to logs and errors. No more endless scrolling.",
    tileClassName:
      "bg-[linear-gradient(180deg,var(--step-four-start)_0%,var(--step-four-end)_100%)] text-white shadow-[0_18px_36px_var(--step-four-shadow)]",
  },
] as const;

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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <BorderGlow
                className="h-full w-full rounded-[40px]"
                backgroundColor="var(--surface)"
                fillOpacity={0.15}
              >
                <div className="relative flex h-full flex-col rounded-[40px] border border-[color:var(--line)] bg-[color:var(--surface)] px-5 pb-7 pt-6 shadow-[0_16px_36px_var(--shadow-soft)] backdrop-blur-md">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-[18px] ${step.tileClassName}`}
                    >
                      <step.icon className="h-7 w-7" strokeWidth={2.1} />
                    </div>

                    <div className="relative mt-5 flex w-full items-center justify-center">
                      <span
                        aria-hidden="true"
                        className="hidden h-px flex-1 bg-[color:var(--line)] lg:block"
                      />
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--midnight)] text-[11px] font-bold tracking-[0.02em] text-white">
                        {step.number}
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden h-px flex-1 bg-[color:var(--line)] lg:block"
                      />
                    </div>
                  </div>

                  <div className="mt-7">
                    <h3 className="text-[clamp(1.35rem,2vw,1.9rem)] font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-[color:var(--ink-soft)]">
                      {step.body}
                    </p>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
