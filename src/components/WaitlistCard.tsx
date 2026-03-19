"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import BorderGlow from "./BorderGlow";
import PillButton from "./PillButton";

type WaitlistCardProps = {
  className?: string;
};

export default function WaitlistCard({ className = "" }: WaitlistCardProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!email || loading) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/.netlify/functions/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          typeof payload.error === "string" ? payload.error : "Request failed",
        );
      }

      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <BorderGlow
      className={["rounded-[50px]", className].filter(Boolean).join(" ")}
      backgroundColor="var(--surface)"
      fillOpacity={0.14}
    >
      <div className="rounded-[50px] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[0_16px_40px_var(--shadow-strong)] sm:p-6">
        <p className="detail-label">Waitlist</p>
        <h2 className="mt-4 text-[clamp(1.65rem,2.4vw,2.25rem)] font-semibold tracking-[-0.045em] text-[color:var(--ink)]">
          Want early access?
        </h2>
        <p className="mt-3 text-sm leading-7 text-[color:var(--ink-soft)]">
          Drop your email below and we&apos;ll reach out when BuildAtlas opens up.
        </p>

        {error ? (
          <p className="mt-3 text-sm text-[color:var(--ember)]">
            {error}
          </p>
        ) : null}

        {submitted ? (
          <div className="border-glow mt-6 border border-[color:var(--signal)] bg-[color:var(--signal-soft)] px-4 py-4">
            <div className="flex items-center gap-3 text-[color:var(--signal)]">
              <CheckCircle2 className="h-5 w-5" />
              <p className="text-sm font-semibold">You&apos;re on the list.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              placeholder="you@company.com"
              className="field-input"
            />
            <PillButton
              label={loading ? "Joining..." : "Join waitlist"}
              type="submit"
              disabled={loading}
              className="w-full"
            />
          </form>
        )}
      </div>
    </BorderGlow>
  );
}
