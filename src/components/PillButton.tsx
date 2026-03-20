"use client";

import { type CSSProperties, type MouseEventHandler } from "react";
import { cn } from "@/lib/utils";
import styles from "./PillButton.module.css";

type PillButtonProps = {
  label: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  size?: "sm" | "md";
  fullWidth?: boolean;
  selected?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

export default function PillButton({
  label,
  href,
  type = "button",
  className = "",
  baseColor = "var(--chrome)",
  pillColor = "var(--surface-strong)",
  hoveredPillColor = "var(--base)",
  hoveredPillTextColor = "var(--paper)",
  pillTextColor = "var(--ink)",
  size = "md",
  fullWidth = false,
  selected = false,
  disabled = false,
  ariaLabel,
  onClick,
}: PillButtonProps) {
  const componentStyle: CSSProperties & Record<string, string> = {
    "--base": baseColor,
    "--pill-bg": pillColor,
    "--pill-hover-bg": hoveredPillColor,
    "--hover-text": hoveredPillTextColor,
    "--pill-text": pillTextColor,
  };

  const classes = cn(
    styles.pill,
    size === "sm" ? styles.small : styles.medium,
    fullWidth ? styles.fullWidth : "",
    selected ? styles.selected : "",
    disabled ? styles.disabled : "",
    className,
  );

  const content = <span className={styles.label}>{label}</span>;

  if (href) {
    return (
      <span className={cn(styles.wrapper, fullWidth ? styles.wrapperFullWidth : "")}>
        <a
          href={href}
          aria-label={ariaLabel ?? label}
          aria-current={selected ? "page" : undefined}
          className={classes}
          style={componentStyle}
          onClick={disabled ? (event) => event.preventDefault() : onClick}
        >
          {content}
        </a>
      </span>
    );
  }

  return (
    <span className={cn(styles.wrapper, fullWidth ? styles.wrapperFullWidth : "")}>
      <button
        type={type}
        aria-label={ariaLabel ?? label}
        aria-pressed={selected || undefined}
        disabled={disabled}
        className={classes}
        style={componentStyle}
        onClick={onClick}
      >
        {content}
      </button>
    </span>
  );
}
