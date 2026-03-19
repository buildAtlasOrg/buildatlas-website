"use client";

import { motion } from "framer-motion";
import BrandMark from "./BrandMark";
import PillNav from "./PillNav";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Example graph", href: "#graph-preview" },
  { label: "How to use", href: "#how-it-works" },
  { label: "Product", href: "#product" },
  { label: "Waitlist", href: "#cta" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4 sm:pt-5">
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="shell"
      >
        <PillNav
          logo={<BrandMark className="h-7 w-9" />}
          brandLabel="BuildAtlas"
          brandHref="#"
          items={links}
          trailingAction={
            <ThemeToggle
              size="sm"
              baseColor="var(--ink)"
              pillColor="var(--paper)"
              hoveredPillTextColor="var(--paper)"
              pillTextColor="var(--ink)"
            />
          }
          mobileTrailingAction={
            <ThemeToggle
              fullWidth
              baseColor="var(--ink)"
              pillColor="var(--paper)"
              hoveredPillTextColor="var(--paper)"
              pillTextColor="var(--ink)"
            />
          }
          baseColor="var(--ink)"
          pillColor="var(--paper)"
          hoveredPillTextColor="var(--paper)"
          pillTextColor="var(--ink)"
        />
      </motion.div>
    </header>
  );
}
