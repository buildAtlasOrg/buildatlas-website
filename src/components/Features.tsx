"use client";

import { motion } from "framer-motion";
import { LayoutGrid, AlertTriangle, GitBranch, Code2, Layers, Zap } from "lucide-react";

const features = [
  {
    title: "Pipeline Visualization",
    description: "Turn complex CI workflows into clear, interactive graphs that reveal structure at a glance.",
    icon: LayoutGrid,
    gradient: "from-brand-500 to-brand-700",
  },
  {
    title: "Failure Detection",
    description: "Instantly see where pipelines break. Click any failing node to jump to logs and errors.",
    icon: AlertTriangle,
    gradient: "from-status-failure to-orange-500",
  },
  {
    title: "Dependency Mapping",
    description: "Understand how jobs connect across your workflow. See what depends on what.",
    icon: GitBranch,
    gradient: "from-brand-400 to-brand-600",
  },
  {
    title: "Developer Friendly",
    description: "Built for engineers who work with CI/CD daily. Minimal UI, maximum efficiency.",
    icon: Code2,
    gradient: "from-status-success to-teal-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28 sm:py-36">
      <div className="section-divider" />
      
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-cyan-500/5 blur-[100px] dark:bg-cyan-500/10" />
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
            <Layers className="h-3.5 w-3.5 text-brand-400" />
            Features
          </span>
          <h2 className="heading-lg mt-6 text-balance">
            Everything You Need to Debug Faster
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-light-text-secondary dark:text-dark-text-secondary">
            Powerful tools designed to help you understand, debug, and optimize your CI/CD pipelines.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-light-border bg-white p-8 transition-all duration-300 hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/5 dark:border-dark-border dark:bg-dark-surface dark:hover:border-brand-400/30"
            >
              {/* Gradient hover effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className={`absolute -inset-40 rounded-full bg-gradient-to-r ${feature.gradient} opacity-[0.03] blur-3xl`} />
              </div>
              
              <div className="relative">
                <div className={`inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-3 shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-light-text dark:text-dark-text">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
