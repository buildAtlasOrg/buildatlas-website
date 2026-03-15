"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Zap, Shield, Clock } from "lucide-react";

const benefits = [
  { icon: Zap, text: "Early access to new features" },
  { icon: Shield, text: "Priority support" },
  { icon: Clock, text: "Free during beta" },
];

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/.netlify/functions/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="cta" className="relative py-28 sm:py-36">
      <div className="section-divider" />

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-500/10 via-purple-500/10 to-cyan-500/10 blur-[100px] dark:from-brand-500/20 dark:via-purple-500/15 dark:to-cyan-500/15" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="label-badge">
            <Sparkles className="h-3.5 w-3.5 text-brand-400" />
            Join the Waitlist
          </span>
          
          <h2 className="heading-lg mt-6 text-balance">
            Debug CI Pipelines Faster
          </h2>
          
          <p className="mx-auto mt-6 max-w-xl text-lg text-light-text-secondary dark:text-dark-text-secondary">
            Join the waitlist and be the first to try BuildAtlas when we launch. 
            Early access members get exclusive benefits.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto mt-10 max-w-md rounded-2xl border border-status-success/30 bg-status-success/10 p-8"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-status-success/20">
              <CheckCircle2 className="h-7 w-7 text-status-success" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-status-success">
              You&apos;re on the list!
            </h3>
            <p className="mt-2 text-status-success/80">
              We&apos;ll be in touch soon with early access details.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-light-border bg-white px-5 py-4 text-base text-light-text placeholder-light-text-secondary outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:placeholder-dark-text-secondary dark:focus:border-brand-400 dark:focus:ring-brand-400/10"
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Joining...
                  </span>
                ) : (
                  <>
                    Join the Waitlist
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-sm text-status-failure"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}

            {/* Benefits */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {benefits.map((benefit) => (
                <span key={benefit.text} className="flex items-center gap-2">
                  <benefit.icon className="h-4 w-4 text-brand-400" />
                  {benefit.text}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
