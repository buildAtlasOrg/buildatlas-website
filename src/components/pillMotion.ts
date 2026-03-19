import { gsap } from "gsap";

type BuildPillTimelineOptions = {
  pill: HTMLElement;
  circle: HTMLElement;
  label: HTMLElement;
  hoverLabel: HTMLElement;
  ease: string;
};

export function buildPillTimeline({
  pill,
  circle,
  label,
  hoverLabel,
  ease,
}: BuildPillTimelineOptions) {
  const rect = pill.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const overscan = Math.max(18, Math.ceil(height * 0.5));
  const radius = (width * width * 0.25 + height * height) / (2 * height);
  const diameter = Math.ceil(radius * 2) + overscan * 2;
  const delta =
    Math.ceil(radius - Math.sqrt(Math.max(0, radius * radius - (width * width) / 4))) +
    overscan;
  const originY = diameter - delta;

  circle.style.width = `${diameter}px`;
  circle.style.height = `${diameter}px`;
  circle.style.bottom = `-${delta}px`;

  gsap.set(circle, {
    xPercent: -50,
    scale: 0,
    transformOrigin: `50% ${originY}px`,
  });

  gsap.set(label, { y: 0 });
  gsap.set(hoverLabel, { y: height + 12, opacity: 0 });

  const timeline = gsap.timeline({ paused: true });

  timeline.to(
    circle,
    {
      scale: 1.45,
      xPercent: -50,
      duration: 2,
      ease,
      overwrite: "auto",
    },
    0,
  );

  timeline.to(
    label,
    {
      y: -(height + 8),
      duration: 2,
      ease,
      overwrite: "auto",
    },
    0,
  );

  timeline.to(
    hoverLabel,
    {
      y: 0,
      opacity: 1,
      duration: 2,
      ease,
      overwrite: "auto",
    },
    0,
  );

  return timeline;
}
