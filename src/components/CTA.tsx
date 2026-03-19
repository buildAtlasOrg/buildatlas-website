"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import BorderGlow from "./BorderGlow";
import PillButton from "./PillButton";
import { SectionDivider, SectionShell } from "./Section";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!email || loading) {
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/.netlify/functions/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
      setEmail("");
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SectionShell id="cta" className="pb-14">
      <SectionDivider />

      <div className="grid gap-8 border-y border-[color:var(--line)] py-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-10">
        <div className="flex flex-col justify-center">
          <p className="eyebrow">Waitlist</p>
          <h2 className="section-heading mt-5 max-w-[14ch]">Want early access?</h2>
          <p className="section-copy mt-5 max-w-xl">
            Join the waitlist and we&apos;ll reach out as BuildAtlas opens to more teams.
          </p>

          {error ? (
            <p className="mt-3 text-sm text-[color:var(--ember)]">
              Something went wrong. Please try again.
            </p>
          ) : null}
          <p className="detail-label mt-8">Preview the signup experience</p>
        </div>

        <BorderGlow
          className="min-h-[28rem] lg:min-h-[38rem]"
          edgeSensitivity={24}
          glowColor="248 100 73"
          backgroundColor="rgba(255, 255, 255, 0.94)"
          borderRadius={0}
          glowRadius={30}
          glowIntensity={0.7}
          coneSpread={18}
          colors={["#3f18ff", "#6d57ff", "#9ab8ff"]}
          fillOpacity={0.16}
        >
          <div className="relative flex h-full min-h-[28rem] flex-col overflow-hidden lg:min-h-[38rem]">
            <div className="relative z-10 flex items-center justify-between border-b border-[color:var(--line)] px-5 py-4 sm:px-6">
              <div>
                <p className="eyebrow">Preview</p>
                <p className="mt-2 text-sm text-[color:var(--ink-soft)]">Waitlist signup</p>
              </div>
            </div>

            <div className="relative flex flex-1 items-center justify-center p-4 sm:p-6 lg:items-start lg:justify-end lg:px-10 lg:pt-12">
              <div className="w-full max-w-md border border-[rgba(63,24,255,0.12)] bg-[rgba(255,255,255,0.92)] px-4 py-4 shadow-[0_16px_40px_rgba(6,6,6,0.12)] sm:px-5 sm:py-5">
                <p className="detail-label">Waitlist</p>
                <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
                  Drop your email below and we&apos;ll reach out when BuildAtlas opens up.
                </p>

                {submitted ? (
                  <div className="border-glow mt-4 border border-[color:var(--signal)] bg-[color:var(--signal-soft)] px-4 py-4">
                    <div className="flex items-center gap-3 text-[color:var(--signal)]">
                      <CheckCircle2 className="h-5 w-5" />
                      <p className="text-sm font-semibold">You&apos;re on the list.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
                    <input
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
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
            </div>
          </div>
        </BorderGlow>
      </div>
    </SectionShell>
  );
}
