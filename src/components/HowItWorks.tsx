"use client";

import { motion } from "framer-motion";
import { GitPullRequest, Download, Eye, Bug, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect Your Repository",
    description: "Link your GitHub, GitLab, or Bitbucket repo in one click. We support all major Git providers.",
    icon: GitPullRequest,
    color: "from-brand-500 to-brand-700",
  },
  {
    number: "02",
    title: "Import Pipeline Data",
    description: "BuildAtlas automatically reads your CI configuration files and workflow definitions.",
    icon: Download,
    color: "from-brand-400 to-brand-600",
  },
  {
    number: "03",
    title: "View the Visual Graph",
    description: "See your entire pipeline as an interactive, zoomable map with real-time status updates.",
    icon: Eye,
    color: "from-status-success to-teal-500",
  },
  {
    number: "04",
    title: "Debug Failures Faster",
    description: "Click any failing node to jump straight to logs and errors. No more endless scrolling.",
    icon: Bug,
    color: "from-status-running to-status-failure",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 sm:py-36">
      <div className="section-divider" />
      
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-500/5 to-transparent blur-[80px] dark:from-brand-500/10" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="label-badge">
            <ArrowRight className="h-3.5 w-3.5 text-brand-400" />
            How It Works
          </span>
          <h2 className="heading-lg mt-6 text-balance">
            From Repo to Visual Map in Seconds
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-light-text-secondary dark:text-dark-text-secondary">
            Get started in minutes. No complex setup, no configuration headaches.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute left-1/2 top-8 hidden h-px w-full bg-gradient-to-r from-light-border via-light-border to-transparent dark:from-dark-border dark:via-dark-border lg:block" />
              )}
              
              {/* Step number with gradient background */}
              <div className="relative mx-auto mb-6">
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <step.icon className="h-7 w-7 text-white" />
                </div>
                <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-light-text font-mono text-xs font-bold text-white dark:border-dark-bg dark:bg-dark-text dark:text-dark-bg">
                  {step.number}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
