import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      boxShadow: {
        panel: "0 24px 60px rgba(24, 33, 42, 0.08)",
        float: "0 18px 40px rgba(17, 28, 37, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
