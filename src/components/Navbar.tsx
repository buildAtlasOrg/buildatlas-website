"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Waitlist", href: "#waitlist" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--midnight)]/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="shell"
      >
        {/* Desktop */}
        <div className="hidden items-center justify-between gap-8 py-4 lg:flex">
          <a href="#top" aria-label="Back to top" className="block shrink-0">
            <div className="relative h-[2.6rem] w-[10.5rem]">
              <Image
                src="/BuildAtlas-BannerDark.png"
                alt="BuildAtlas"
                fill
                sizes="180px"
                className="object-contain object-left"
                priority
              />
            </div>
          </a>

          <nav aria-label="Primary" className="flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[color:var(--ink-soft)] transition-colors duration-150 hover:text-[color:var(--ink)]"
              >
                {link.label}
              </a>
            ))}
            <div className="ml-3 h-4 w-px bg-[color:var(--line-strong)]" />
            <Link
              href="/demo"
              className="ml-3 bg-[color:var(--signal)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            >
              Live Demo
            </Link>
          </nav>
        </div>

        {/* Mobile */}
        <div className="flex items-center justify-between gap-3 py-3.5 lg:hidden">
          <a
            href="#top"
            aria-label="Back to top"
            className="block"
            onClick={() => setMenuOpen(false)}
          >
            <div className="relative h-[2.3rem] w-[9.5rem]">
              <Image
                src="/BuildAtlas-BannerDark.png"
                alt="BuildAtlas"
                fill
                sizes="156px"
                className="object-contain object-left"
                priority
              />
            </div>
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center border border-[color:var(--line-strong)] text-[color:var(--ink-soft)] transition-colors hover:border-[color:var(--signal)] hover:text-[color:var(--ink)]"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              aria-label="Mobile primary"
              className="overflow-hidden border-t border-[color:var(--line)] lg:hidden"
            >
              <ul className="flex flex-col py-3">
                {links.map((link) => (
                  <li key={`m-${link.href}`}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full px-1 py-3 text-sm font-medium text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2 pb-1">
                  <Link
                    href="/demo"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center rounded-md bg-[color:var(--signal)] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Live Demo →
                  </Link>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
