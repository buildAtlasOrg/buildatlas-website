"use client";

type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "h-10 w-14" }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 126 82"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <ellipse
        cx="58"
        cy="39"
        rx="49"
        ry="27"
        transform="rotate(-18 58 39)"
        stroke="var(--signal)"
        strokeWidth="3"
        opacity="0.95"
      />
      <ellipse
        cx="65"
        cy="39"
        rx="44"
        ry="22"
        transform="rotate(24 65 39)"
        stroke="var(--signal)"
        strokeWidth="2.4"
        opacity="0.55"
      />

      {[
        [18, 54],
        [30, 22],
        [45, 38],
        [56, 22],
        [56, 54],
        [70, 38],
        [82, 22],
        [82, 54],
        [95, 22],
      ].map(([cx, cy], index) => (
        <circle key={`${cx}-${cy}-${index}`} cx={cx} cy={cy} r="7.8" fill="var(--signal)" />
      ))}
    </svg>
  );
}
