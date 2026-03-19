"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import BrandMark from "./BrandMark";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/buildAtlasOrg" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/buildatlas/" },
  { icon: Mail, label: "Email", href: "mailto:hello@buildatlas.dev" },
];

export default function Footer() {
  return (
    <footer className="pb-6">
      <div className="shell">
        <div className="flex flex-col gap-4 border-t border-[color:var(--line)] py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BrandMark className="h-9 w-12" />
            <div>
              <p className="brand-wordmark text-base">BuildAtlas</p>
              <p className="text-sm text-[color:var(--ink-soft)]">
                Clearer context for failed CI runs.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="inline-flex items-center gap-2 text-sm text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
              >
                <social.icon className="h-4 w-4" />
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
