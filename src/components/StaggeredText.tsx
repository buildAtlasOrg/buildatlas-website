"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";

type SegmentBy = "words" | "chars";
type Direction = "top" | "bottom" | "left" | "right";
type ElementTag = "h1" | "h2" | "h3" | "p" | "span";

type StaggeredTextProps = {
  text: string;
  as?: ElementTag;
  className?: string;
  segmentBy?: SegmentBy;
  direction?: Direction;
  delay?: number;
  duration?: number;
  blur?: boolean;
};

const hiddenState = {
  top: { y: "0.8em" },
  bottom: { y: "-0.8em" },
  left: { x: "0.5em" },
  right: { x: "-0.5em" },
};

export default function StaggeredText({
  text,
  as = "p",
  className,
  segmentBy = "words",
  direction = "top",
  delay = 0.045,
  duration = 0.55,
  blur = true,
}: StaggeredTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const Component = as;

  const segments = useMemo(() => {
    if (segmentBy === "chars") {
      return Array.from(text);
    }

    return text.split(" ");
  }, [segmentBy, text]);

  const baseHidden = hiddenState[direction];

  return (
    <Component className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {segments.map((segment, index) => {
          const isSpace = segment === " ";

          if (segmentBy === "chars" && isSpace) {
            return <span key={`space-${index}`} className="inline-block w-[0.32em]" />;
          }

          return (
            <span key={`${segment}-${index}`} className="inline-block overflow-hidden align-top">
              <motion.span
                className="inline-block will-change-transform"
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        filter: blur ? "blur(10px)" : "blur(0px)",
                        ...baseHidden,
                      }
                }
                animate={
                  inView
                    ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
                    : reduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          filter: blur ? "blur(10px)" : "blur(0px)",
                          ...baseHidden,
                        }
                }
                transition={{
                  duration,
                  delay: index * delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {segmentBy === "words" ? `${segment}\u00A0` : segment}
              </motion.span>
            </span>
          );
        })}
      </span>
    </Component>
  );
}
