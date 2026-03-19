"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import PillButton from "./PillButton";
import styles from "./PillNav.module.css";

type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

type PillNavProps = {
  logo: ReactNode;
  logoAlt?: string;
  brandLabel?: string;
  brandHref?: string | null;
  showBrandText?: boolean;
  items: PillNavItem[];
  trailingAction?: ReactNode;
  mobileTrailingAction?: ReactNode;
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
};

export default function PillNav({
  logo,
  brandLabel = "BuildAtlas",
  brandHref = null,
  showBrandText = true,
  items,
  trailingAction,
  mobileTrailingAction,
  activeHref,
  className = "",
  ease = "power2.easeOut",
  baseColor = "var(--chrome)",
  pillColor = "var(--surface-strong)",
  hoveredPillTextColor = "var(--paper)",
  pillTextColor = "var(--ink)",
  initialLoadAnimation = true,
}: PillNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const brandRef = useRef<HTMLElement | null>(null);
  const logoShellRef = useRef<HTMLSpanElement | null>(null);
  const brandTweenRef = useRef<gsap.core.Tween | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);

    if (hamburgerRef.current) {
      const lines = hamburgerRef.current.querySelectorAll("[data-pill-line]");
      gsap.to(lines[0], { rotation: 0, y: -3, duration: 0.3, ease });
      gsap.to(lines[1], { rotation: 0, y: 3, duration: 0.3, ease });
    }

    if (!mobileMenuRef.current) {
      return;
    }

    gsap.to(mobileMenuRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.18,
      ease,
      overwrite: "auto",
      onComplete: () => {
        if (mobileMenuRef.current) {
          gsap.set(mobileMenuRef.current, { visibility: "hidden" });
        }
      },
    });
  };

  useEffect(() => {
    const menu = mobileMenuRef.current;

    if (menu) {
      gsap.set(menu, { visibility: "hidden", opacity: 0, y: 10 });
    }

    if (!initialLoadAnimation) {
      return;
    }

    if (brandRef.current) {
      brandTweenRef.current?.kill();
      gsap.set(brandRef.current, { scale: 0.92, opacity: 0 });
      brandTweenRef.current = gsap.to(brandRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease,
      });
    }

    if (navItemsRef.current) {
      gsap.set(navItemsRef.current, { width: 0, overflow: "hidden", opacity: 0 });
      gsap.to(navItemsRef.current, {
        width: "auto",
        opacity: 1,
        duration: 0.55,
        ease,
        clearProps: "overflow",
      });
    }

    return () => {
      brandTweenRef.current?.kill();
      logoTweenRef.current?.kill();
    };
  }, [ease, initialLoadAnimation]);

  const handleLogoEnter = () => {
    if (!logoShellRef.current) {
      return;
    }

    logoTweenRef.current?.kill();
    gsap.set(logoShellRef.current, { rotate: 0 });
    logoTweenRef.current = gsap.to(logoShellRef.current, {
      rotate: 360,
      duration: 0.24,
      ease,
      overwrite: "auto",
    });
  };

  const toggleMobileMenu = () => {
    const nextState = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextState);

    if (hamburgerRef.current) {
      const lines = hamburgerRef.current.querySelectorAll("[data-pill-line]");

      if (nextState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: -3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 3, duration: 0.3, ease });
      }
    }

    if (!mobileMenuRef.current) {
      return;
    }

    if (nextState) {
      gsap.set(mobileMenuRef.current, { visibility: "visible" });
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease,
          overwrite: "auto",
        },
      );
      return;
    }

    closeMobileMenu();
  };

  const cssVars: CSSProperties & Record<string, string> = {
    "--base": baseColor,
    "--pill-bg": pillColor,
    "--hover-text": hoveredPillTextColor,
    "--pill-text": pillTextColor,
  };

  return (
    <div className={styles.container}>
      <nav
        className={[styles.nav, className].filter(Boolean).join(" ")}
        aria-label="Primary"
        style={cssVars}
      >
        {brandHref ? (
          <a
            ref={(element) => {
              brandRef.current = element;
            }}
            href={brandHref}
            className={styles.brand}
            aria-label={brandLabel}
            onMouseEnter={handleLogoEnter}
          >
            <span ref={logoShellRef} className={styles.logoShell} aria-hidden="true">
              {logo}
            </span>
            {showBrandText ? <span className={styles.brandText}>{brandLabel}</span> : null}
          </a>
        ) : (
          <div
            ref={(element) => {
              brandRef.current = element;
            }}
            className={styles.brand}
            aria-label={brandLabel}
          >
            <span ref={logoShellRef} className={styles.logoShell} aria-hidden="true">
              {logo}
            </span>
            {showBrandText ? <span className={styles.brandText}>{brandLabel}</span> : null}
          </div>
        )}

        <div className={[styles.desktopGroup, styles.desktopOnly].join(" ")}>
          <div ref={navItemsRef} className={styles.items}>
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.href} className={styles.item}>
                  <PillButton
                    label={item.label}
                    href={item.href}
                    ariaLabel={item.ariaLabel}
                    selected={activeHref === item.href}
                    baseColor={baseColor}
                    pillColor={pillColor}
                    hoveredPillTextColor={hoveredPillTextColor}
                    pillTextColor={pillTextColor}
                    size="sm"
                  />
                </li>
              ))}
              {trailingAction ? <li className={styles.item}>{trailingAction}</li> : null}
            </ul>
          </div>
        </div>

        <button
          ref={hamburgerRef}
          type="button"
          className={[styles.menuButton, styles.mobileOnly].join(" ")}
          aria-label="Toggle menu"
          onClick={toggleMobileMenu}
        >
          <span className={styles.menuIcon}>
            <span data-pill-line className={styles.menuLine} />
            <span data-pill-line className={styles.menuLine} />
          </span>
        </button>
      </nav>

      <div ref={mobileMenuRef} className={[styles.mobileMenu, styles.mobileOnly].join(" ")}>
        <ul className={styles.mobileList}>
          {items.map((item) => (
            <li key={`mobile-${item.href}`}>
              <PillButton
                label={item.label}
                href={item.href}
                ariaLabel={item.ariaLabel}
                selected={activeHref === item.href}
                baseColor={baseColor}
                pillColor={pillColor}
                hoveredPillTextColor={hoveredPillTextColor}
                pillTextColor={pillTextColor}
                onClick={closeMobileMenu}
                fullWidth
              />
            </li>
          ))}
          {mobileTrailingAction ? <li>{mobileTrailingAction}</li> : null}
        </ul>
      </div>
    </div>
  );
}
