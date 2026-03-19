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
  baseColor = "var(--ink)",
  pillColor = "var(--paper)",
  hoveredPillTextColor = "var(--paper)",
  pillTextColor = "var(--ink)",
}: ThemeToggleProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <PillButton
      label={dark ? "Light mode" : "Dark mode"}
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
