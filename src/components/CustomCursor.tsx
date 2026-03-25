"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, { stiffness: 600, damping: 40 });
  const springY = useSpring(y, { stiffness: 600, damping: 40 });

  // Slower follower for the ring
  const ringX = useSpring(x, { stiffness: 120, damping: 22 });
  const ringY = useSpring(y, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--signal)]"
        style={{ left: springX, top: springY }}
      />
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--signal)] opacity-30"
        style={{ left: ringX, top: ringY }}
      />
    </>
  );
}
