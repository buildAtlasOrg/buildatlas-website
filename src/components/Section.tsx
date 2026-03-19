"use client";

import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionShell({ id, className, children }: SectionShellProps) {
  return (
    <section id={id} className={`relative py-14 sm:py-16 lg:py-20 ${className ?? ""}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionIntroProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`${alignment} ${className ?? ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-heading mt-5 max-w-[16ch]">{title}</h2>
      {description ? (
        <p className={`section-copy mt-5 max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function SectionDivider() {
  return <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[color:var(--line)]/70" />;
}
