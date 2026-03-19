"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PillNav from "./PillNav";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Demo", href: "#graph-preview" },
  { label: "How to use", href: "#how-it-works" },
  { label: "Product", href: "#product" },
  { label: "Waitlist", href: "#waitlist" },
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
          logo={
            <Image
              src="/default.png"
              alt=""
              width={96}
              height={96}
              className="h-16 w-16 object-contain"
              priority
            />
          }
          brandLabel="BuildAtlas"
          brandHref={null}
          showBrandText={false}
          items={links}
          trailingAction={
            <ThemeToggle
              size="sm"
              baseColor="var(--chrome)"
              pillColor="var(--surface-strong)"
              hoveredPillTextColor="var(--paper)"
              pillTextColor="var(--ink)"
            />
          }
          mobileTrailingAction={
            <ThemeToggle
              fullWidth
              baseColor="var(--chrome)"
              pillColor="var(--surface-strong)"
              hoveredPillTextColor="var(--paper)"
              pillTextColor="var(--ink)"
            />
          }
          baseColor="var(--chrome)"
          pillColor="var(--surface-strong)"
          hoveredPillTextColor="var(--paper)"
          pillTextColor="var(--ink)"
        />
      </motion.div>
    </header>
  );
}
