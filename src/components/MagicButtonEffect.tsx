"use client";

import {
  type CSSProperties,
  type FocusEventHandler,
  type HTMLAttributes,
  type MouseEventHandler,
  type PointerEventHandler,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import styles from "./MagicButtonEffect.module.css";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 800;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;

type MagicButtonEffectProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
  clickEffect?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  magnetismStrength?: number;
};

function createParticle(glowColor: string, width: number, height: number) {
  const particle = document.createElement("span");
  particle.className = styles.particle;
  particle.style.left = `${Math.random() * width}px`;
  particle.style.top = `${Math.random() * height}px`;
  particle.style.setProperty("--magic-glow-color", glowColor);
  return particle;
}

export default function MagicButtonEffect({
  children,
  className,
  style,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableTilt = false,
  enableMagnetism = false,
  magnetismStrength = 0.05,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  onClick,
  onFocusCapture,
  onBlurCapture,
  ...rest
}: MagicButtonEffectProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLSpanElement | null>(null);
  const isHoveredRef = useRef(false);
  const particlesRef = useRef<HTMLSpanElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const [shouldDisableAnimations, setShouldDisableAnimations] = useState(disableAnimations);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncDisabledState = () => {
      setShouldDisableAnimations(
        disableAnimations || window.innerWidth <= MOBILE_BREAKPOINT || reducedMotionQuery.matches,
      );
    };

    syncDisabledState();
    window.addEventListener("resize", syncDisabledState);
    reducedMotionQuery.addEventListener("change", syncDisabledState);

    return () => {
      window.removeEventListener("resize", syncDisabledState);
      reducedMotionQuery.removeEventListener("change", syncDisabledState);
    };
  }, [disableAnimations]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
    timeoutsRef.current = [];

    particlesRef.current.forEach((particle) => {
      gsap.killTweensOf(particle);
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.24,
        ease: "back.in(1.6)",
        onComplete: () => particle.remove(),
      });
    });

    particlesRef.current = [];
  }, []);

  useEffect(() => clearParticles, [clearParticles]);

  const updateGlowPosition = useCallback(
    (clientX: number, clientY: number) => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const rect = root.getBoundingClientRect();
      const relativeX = ((clientX - rect.left) / rect.width) * 100;
      const relativeY = ((clientY - rect.top) / rect.height) * 100;

      root.style.setProperty("--magic-glow-x", `${relativeX}%`);
      root.style.setProperty("--magic-glow-y", `${relativeY}%`);
      root.style.setProperty("--magic-glow-radius", `${spotlightRadius}px`);

      gsap.to(root, {
        "--magic-glow-intensity": 1,
        duration: 0.16,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (!enableMagnetism && !enableTilt) {
        return;
      }

      const pointerX = clientX - rect.left;
      const pointerY = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const motionProps: Record<string, number | string> = {
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      };

      if (enableMagnetism) {
        motionProps.x = (pointerX - centerX) * magnetismStrength;
        motionProps.y = (pointerY - centerY) * magnetismStrength;
      }

      if (enableTilt) {
        motionProps.rotateX = ((pointerY - centerY) / centerY) * -10;
        motionProps.rotateY = ((pointerX - centerX) / centerX) * 10;
        motionProps.transformPerspective = 1000;
      }

      gsap.to(root, motionProps);
    },
    [enableMagnetism, enableTilt, magnetismStrength, spotlightRadius],
  );

  const fadeEffectOut = useCallback(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    gsap.to(root, {
      "--magic-glow-intensity": 0,
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.28,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  const spawnParticles = useCallback(() => {
    if (shouldDisableAnimations || !enableStars || !overlayRef.current || !rootRef.current) {
      return;
    }

    const { width, height } = rootRef.current.getBoundingClientRect();

    for (let index = 0; index < particleCount; index += 1) {
      const timeout = window.setTimeout(() => {
        if (!isHoveredRef.current || !overlayRef.current) {
          return;
        }

        const particle = createParticle(glowColor, width, height);
        overlayRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.fromTo(
          particle,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.24, ease: "back.out(1.7)" },
        );

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 64,
          y: (Math.random() - 0.5) * 64,
          rotation: Math.random() * 360,
          duration: 1.8 + Math.random() * 1.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(particle, {
          opacity: 0.2 + Math.random() * 0.4,
          duration: 1.1 + Math.random() * 0.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 70);

      timeoutsRef.current.push(timeout);
    }
  }, [enableStars, glowColor, particleCount, shouldDisableAnimations]);

  const triggerRipple = useCallback(
    (clientX: number, clientY: number) => {
      if (shouldDisableAnimations || !clickEffect || !overlayRef.current || !rootRef.current) {
        return;
      }

      const rect = rootRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement("span");
      ripple.className = styles.ripple;
      ripple.style.left = `${x - maxDistance}px`;
      ripple.style.top = `${y - maxDistance}px`;
      ripple.style.width = `${maxDistance * 2}px`;
      ripple.style.height = `${maxDistance * 2}px`;
      ripple.style.setProperty("--magic-glow-color", glowColor);
      overlayRef.current.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    },
    [clickEffect, glowColor, shouldDisableAnimations],
  );

  const handlePointerEnter: PointerEventHandler<HTMLDivElement> = (event) => {
    onPointerEnter?.(event);

    if (shouldDisableAnimations) {
      return;
    }

    isHoveredRef.current = true;
    updateGlowPosition(event.clientX, event.clientY);
    spawnParticles();
  };

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    onPointerMove?.(event);

    if (shouldDisableAnimations) {
      return;
    }

    updateGlowPosition(event.clientX, event.clientY);
  };

  const handlePointerLeave: PointerEventHandler<HTMLDivElement> = (event) => {
    onPointerLeave?.(event);

    isHoveredRef.current = false;
    clearParticles();
    fadeEffectOut();
  };

  const handleFocusCapture: FocusEventHandler<HTMLDivElement> = (event) => {
    onFocusCapture?.(event);

    if (shouldDisableAnimations || !rootRef.current) {
      return;
    }

    rootRef.current.style.setProperty("--magic-glow-x", "50%");
    rootRef.current.style.setProperty("--magic-glow-y", "50%");
    rootRef.current.style.setProperty("--magic-glow-radius", `${spotlightRadius}px`);

    gsap.to(rootRef.current, {
      "--magic-glow-intensity": 0.85,
      duration: 0.16,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleBlurCapture: FocusEventHandler<HTMLDivElement> = (event) => {
    onBlurCapture?.(event);

    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }

    isHoveredRef.current = false;
    clearParticles();
    fadeEffectOut();
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    onClick?.(event);
    triggerRipple(event.clientX, event.clientY);
  };

  const cssVars = {
    ...(style as CSSProperties),
    "--magic-glow-color": glowColor,
    "--magic-glow-radius": `${spotlightRadius}px`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={cn(
        styles.shell,
        !enableSpotlight && styles.disableSpotlight,
        !enableBorderGlow && styles.disableBorderGlow,
        shouldDisableAnimations && styles.disableAnimations,
        className,
      )}
      style={cssVars}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      onClick={handleClick}
      {...rest}
    >
      <span ref={overlayRef} aria-hidden="true" className={styles.overlay} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
