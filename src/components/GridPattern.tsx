"use client";

import { motion } from "framer-motion";
import { useId } from "react";

type GridPatternProps = {
  className?: string;
  cellSize?: number;
};

const highlights = [
  { x: 1, y: 1, delay: 0.2 },
  { x: 5, y: 3, delay: 1 },
  { x: 8, y: 5, delay: 1.8 },
];

export default function GridPattern({
  className,
  cellSize = 28,
}: GridPatternProps) {
  const patternId = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 320 240"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={patternId}
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
            fill="none"
            stroke="rgba(24, 33, 42, 0.10)"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${patternId})`} />

      {highlights.map((item) => (
        <motion.rect
          key={`${item.x}-${item.y}`}
          x={item.x * cellSize}
          y={item.y * cellSize}
          width={cellSize}
          height={cellSize}
          fill="rgba(25, 101, 109, 0.12)"
          animate={{ opacity: [0.15, 0.55, 0.15] }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: item.delay,
          }}
        />
      ))}
    </svg>
  );
}
