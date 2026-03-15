"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/buildAtlasOrg", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/buildatlas/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@buildatlas.dev", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-light-border dark:border-dark-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-500/25">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">BuildAtlas</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
              Visualize and debug CI/CD pipelines instantly. Map your pipelines, understand dependencies, and fix failures faster.
            </p>
            
            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-light-border text-light-text-secondary transition-colors hover:border-brand-500/30 hover:text-brand-600 dark:border-dark-border dark:text-dark-text-secondary dark:hover:border-brand-400/30 dark:hover:text-brand-400"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-light-text dark:text-dark-text">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-light-text-secondary transition-colors hover:text-brand-600 dark:text-dark-text-secondary dark:hover:text-brand-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-light-border pt-8 dark:border-dark-border sm:flex-row">
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            &copy; {new Date().getFullYear()} BuildAtlas. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <a href="#" className="transition-colors hover:text-brand-600 dark:hover:text-brand-400">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-brand-600 dark:hover:text-brand-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
