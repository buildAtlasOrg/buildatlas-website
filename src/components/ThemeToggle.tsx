"use client";

import { useEffect, useState } from "react";
import PillButton from "./PillButton";

type ThemeToggleProps = {
  fullWidth?: boolean;
  size?: "sm" | "md";
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
};

export default function ThemeToggle({
  fullWidth = false,
  size = "sm",
  baseColor = "var(--chrome)",
  pillColor = "var(--surface-strong)",
  hoveredPillTextColor = "var(--paper)",
  pillTextColor = "var(--ink)",
}: ThemeToggleProps) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (nextDark: boolean) => {
      setDark(nextDark);
      document.documentElement.classList.toggle("dark", nextDark);
      document.documentElement.style.colorScheme = nextDark ? "dark" : "light";
    };

    const getActiveTheme = () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark") {
        return true;
      }

      if (storedTheme === "light") {
        return false;
      }

      return mediaQuery.matches;
    };

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) {
        return;
      }

      applyTheme(event.matches);
    };

    applyTheme(getActiveTheme());
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  function toggle() {
    const next = !(dark ?? false);
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <PillButton
      label={dark ? "Light mode" : dark === null ? "Theme" : "Dark mode"}
      ariaLabel={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      size={size}
      fullWidth={fullWidth}
      baseColor={baseColor}
      pillColor={pillColor}
      hoveredPillTextColor={hoveredPillTextColor}
      pillTextColor={pillTextColor}
    />
  );
}
