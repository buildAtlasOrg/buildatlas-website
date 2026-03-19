"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagicButtonEffect from "./MagicButtonEffect";
import PillButton from "./PillButton";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Product", href: "#product" },
  { label: "Demo", href: "#graph-preview" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Waitlist", href: "#waitlist" },
];

function HeaderButtonGlow({ children }: { children: ReactNode }) {
  return (
    <MagicButtonEffect
      className="rounded-full"
      enableStars={false}
      enableSpotlight
      enableBorderGlow
      enableTilt={false}
      enableMagnetism
      clickEffect
      spotlightRadius={800}
      particleCount={12}
      glowColor="132, 0, 255"
      disableAnimations={false}
    >
      {children}
    </MagicButtonEffect>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const bannerSrc = isDarkMode ? "/BuildAtlas-BannerDark.png" : "/BuildAtlas-Banner.png";
  const desktopLogoClass = "relative h-[2.9rem] w-[11.25rem] sm:h-[3.1rem] sm:w-[12.25rem]";
  const mobileLogoClass = "relative h-[2.6rem] w-[10.25rem]";
  const bannerImageClass = "object-contain object-left";

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains("dark"));

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--surface)] backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="shell"
      >
        <div className="hidden items-center justify-between gap-6 py-4 lg:flex">
          <div className="flex min-w-0 items-center">
            <a href="#top" aria-label="Back to top" className="block">
              <div className={desktopLogoClass}>
                <Image
                  src={bannerSrc}
                  alt="BuildAtlas"
                  fill
                  sizes="224px"
                  className={bannerImageClass}
                  priority
                />
              </div>
            </a>
          </div>

          <div className="flex items-center">
            <nav aria-label="Primary">
              <ul className="flex items-center gap-6">
                {links.map((link) => (
                  <li key={link.href}>
                    <HeaderButtonGlow>
                      <PillButton
                        label={link.label}
                        href={link.href}
                        size="sm"
                        baseColor="var(--chrome)"
                        pillColor="var(--surface-strong)"
                        hoveredPillTextColor="var(--paper)"
                        pillTextColor="var(--ink)"
                      />
                    </HeaderButtonGlow>
                  </li>
                ))}
                <li>
                  <HeaderButtonGlow>
                    <ThemeToggle
                      size="sm"
                      baseColor="var(--chrome)"
                      pillColor="var(--surface-strong)"
                      hoveredPillTextColor="var(--paper)"
                      pillTextColor="var(--ink)"
                    />
                  </HeaderButtonGlow>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 py-3 lg:hidden">
          <a
            href="#top"
            aria-label="Back to top"
            className="block"
            onClick={() => setMenuOpen(false)}
          >
            <div className={mobileLogoClass}>
              <Image
                src={bannerSrc}
                alt="BuildAtlas"
                fill
                sizes="168px"
                className={bannerImageClass}
                priority
              />
            </div>
          </a>

          <div className="flex items-center gap-2">
            <HeaderButtonGlow>
              <ThemeToggle
                size="sm"
                baseColor="var(--chrome)"
                pillColor="var(--surface-strong)"
                hoveredPillTextColor="var(--paper)"
                pillTextColor="var(--ink)"
              />
            </HeaderButtonGlow>

            <HeaderButtonGlow>
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] text-[color:var(--ink)]"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </HeaderButtonGlow>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="mt-3 lg:hidden"
            >
              <nav
                aria-label="Mobile primary"
                className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-soft)] p-3 shadow-[0_18px_40px_var(--shadow-soft)] backdrop-blur-xl"
              >
                <ul className="grid gap-2">
                  {links.map((link) => (
                    <li key={`mobile-${link.href}`}>
                      <HeaderButtonGlow>
                        <PillButton
                          label={link.label}
                          href={link.href}
                          size="sm"
                          fullWidth
                          baseColor="var(--chrome)"
                          pillColor="var(--surface-strong)"
                          hoveredPillTextColor="var(--paper)"
                          pillTextColor="var(--ink)"
                          onClick={() => setMenuOpen(false)}
                        />
                      </HeaderButtonGlow>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
