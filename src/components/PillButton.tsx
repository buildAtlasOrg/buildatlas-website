"use client";

import {
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type MouseEventHandler,
  useEffect,
  useRef,
} from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { buildPillTimeline } from "./pillMotion";
import styles from "./PillButton.module.css";

type PillButtonProps = {
  label: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
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
  ease = "power2.easeOut",
  baseColor = "var(--ink)",
  pillColor = "var(--paper)",
  hoveredPillTextColor = "var(--paper)",
  pillTextColor = "var(--ink)",
  size = "md",
  fullWidth = false,
  selected = false,
  disabled = false,
  ariaLabel,
  onClick,
}: PillButtonProps) {
  const pillRef = useRef<HTMLElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const hoverLabelRef = useRef<HTMLSpanElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-100, 100], [-16, 16]), {
    stiffness: 140,
    damping: 12,
  });
  const translateX = useSpring(useTransform(x, [-100, 100], [-18, 18]), {
    stiffness: 140,
    damping: 12,
  });

  useEffect(() => {
    if (selected || disabled) {
      timelineRef.current?.kill();
      tweenRef.current?.kill();
      return;
    }

    const pill = pillRef.current;
    const circle = circleRef.current;
    const labelNode = labelRef.current;
    const hoverLabelNode = hoverLabelRef.current;

    if (!pill || !circle || !labelNode || !hoverLabelNode) {
      return;
    }

    const layout = () => {
      timelineRef.current?.kill();
      tweenRef.current?.kill();
      timelineRef.current = buildPillTimeline({
        pill,
        circle,
        label: labelNode,
        hoverLabel: hoverLabelNode,
        ease,
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready.then(layout).catch(() => {});

    return () => {
      window.removeEventListener("resize", layout);
      timelineRef.current?.kill();
      tweenRef.current?.kill();
    };
  }, [disabled, ease, label, selected]);

  const handleEnter = () => {
    if (selected || disabled || !timelineRef.current) {
      return;
    }

    tweenRef.current?.kill();
    tweenRef.current = timelineRef.current.tweenTo(timelineRef.current.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = () => {
    if (selected || disabled || !timelineRef.current) {
      return;
    }

    tweenRef.current?.kill();
    tweenRef.current = timelineRef.current.tweenTo(0, {
      duration: 0.22,
      ease,
      overwrite: "auto",
    });
  };

  const handleMouseMove = (
    event: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - bounds.left - bounds.width / 2);
  };

  const handleFocus = () => {
    x.set(0);
    handleEnter();
  };

  const componentStyle: CSSProperties & Record<string, string> = {
    "--base": baseColor,
    "--pill-bg": pillColor,
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

  // If tooltips come back later, reintroduce the old popup markup here and
  // wire it to `handleEnter` / `handleLeave` so the shared motion stays intact.
  const content = (
    <>
      <span ref={circleRef} className={styles.circle} aria-hidden="true" />
      <span className={styles.stack}>
        <span ref={labelRef} className={styles.label}>
          {label}
        </span>
        <span ref={hoverLabelRef} className={styles.hoverLabel} aria-hidden="true">
          {label}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <span className={cn(styles.wrapper, fullWidth ? styles.wrapperFullWidth : "")}>
        <a
          ref={(element) => {
            pillRef.current = element;
          }}
          href={href}
          aria-label={ariaLabel ?? label}
          aria-current={selected ? "page" : undefined}
          className={classes}
          style={componentStyle}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleLeave}
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
        ref={(element) => {
          pillRef.current = element;
        }}
        type={type}
        aria-label={ariaLabel ?? label}
        aria-pressed={selected || undefined}
        disabled={disabled}
        className={classes}
        style={componentStyle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleLeave}
        onClick={onClick}
      >
        {content}
      </button>
    </span>
  );
}
