"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

type WaitlistCardProps = {
  className?: string;
};

const WAITLIST_ENDPOINT =
  process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? "";

export default function WaitlistCard({ className = "" }: WaitlistCardProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!email || loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const contentType = response.headers.get("content-type") ?? "";
      const payload = contentType.includes("application/json")
        ? await response.json().catch(() => ({}))
        : {};

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "Waitlist backend not configured. Set the NEXT_PUBLIC_WAITLIST_ENDPOINT environment variable.",
          );
        }
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
    <div className={className}>
      {error ? (
        <p className="mb-4 text-sm text-[color:var(--ember)]">{error}</p>
      ) : null}

      {submitted ? (
        <div className="flex items-center gap-3 border-t border-[color:var(--line)] pt-6 text-[color:var(--signal)]">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <p className="text-sm font-semibold">You&apos;re on the list. We&apos;ll be in touch.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="you@company.com"
            className="flex-1 border-b border-[color:var(--line-strong)] bg-transparent py-3 text-base text-[color:var(--ink)] outline-none transition-colors placeholder:text-[color:var(--ink-soft)] focus:border-[color:var(--signal)]"
          />
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 bg-[color:var(--signal)] px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {loading ? "Joining..." : "Join waitlist"}
          </button>
        </form>
      )}
    </div>
  );
}
