"use client";

import { useEffect, useState } from "react";
import Galaxy from "./Galaxy";

export default function ThemedGalaxyBackdrop() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains("dark"));

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const galaxyTone = isDarkMode
    ? {
        hueShift: 140,
        saturation: 0.1,
        glowIntensity: 0.2,
        tintColor: [1, 1, 1] as [number, number, number],
        tintStrength: 0,
      }
    : {
        hueShift: 248,
        saturation: 0.16,
        glowIntensity: 0.16,
        tintColor: [0.88, 0.9, 1] as [number, number, number],
        tintStrength: 0.86,
      };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Galaxy
        className="absolute inset-0 h-full w-full"
        transparent
        mouseInteraction={false}
        mouseRepulsion
        density={0.4}
        starScale={0.78}
        twinkleIntensity={0.2}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={0.7}
        {...galaxyTone}
      />
    </div>
  );
}
