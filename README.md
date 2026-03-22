# BuildAtlas — Marketing Site

The public-facing website for [BuildAtlas](https://buildatlas.io) — a developer tool that transforms GitHub Actions failures into interactive visual pipeline maps.

Built with Next.js 15, deployed on Netlify, and optimized for fast static delivery.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | Framer Motion, OGL (WebGL galaxy) |
| Pipeline demo | `@xyflow/react` |
| Deployment | Netlify (static + Functions) |
| Waitlist backend | Supabase + Resend |

---

## Project structure

```
src/
├── app/
│   ├── globals.css          Design tokens, shared utilities, scrollbar styles
│   ├── layout.tsx           Root layout, fonts (IBM Plex Sans/Mono), metadata
│   ├── page.tsx             Page composition — section order and imports
│   └── demo/
│       └── page.tsx         Interactive pipeline demo page
├── components/
│   ├── Navbar.tsx           Fixed header, primary navigation
│   ├── Hero.tsx             Hero headline, CTAs, stats bar, waitlist card
│   ├── ProductPreview.tsx   SVG browser-chrome app mockup
│   ├── Problem.tsx          Pain point cards (3-up grid)
│   ├── Features.tsx         Capability deep-dives (alternating rows)
│   ├── HowItWorks.tsx       Four-step explainer with mini previews
│   ├── Founder.tsx          Founder profile and contact links
│   ├── WaitlistCard.tsx     Email signup form with success/error states
│   ├── PipelineGraph.tsx    Landing page pipeline graph (@xyflow/react)
│   ├── BorderGlow.tsx       Proximity-glow border effect
│   ├── PillButton.tsx       Shared pill-style button
│   ├── Section.tsx          SectionShell, SectionIntro, SectionDivider helpers
│   ├── ThemedGalaxyBackdrop.tsx  Animated WebGL galaxy background
│   └── demo/
│       ├── DemoApp.tsx      Full-screen interactive demo application
│       ├── PipelineFlow.tsx Custom SVG DAG pipeline renderer (no reactflow)
│       └── mockData.ts      Static pipeline run fixture data
netlify/
└── functions/
    └── waitlist.mjs         Waitlist handler — validates, inserts, notifies
public/
├── BuildAtlas-BannerDark.png
├── BuildAtlas-Full.png
└── BuildAtlas-Logo.png
```

---

## Deployment

The site exports as a fully static build:

- `next.config.js` sets `output: "export"` — all pages pre-rendered at build time
- Netlify publishes the `out/` directory
- Netlify Functions handle the waitlist POST at `/.netlify/functions/waitlist`

**Netlify settings:**

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `out` |
| Functions directory | `netlify/functions` |

---

## Waitlist flow

The signup form posts to the configured endpoint:

```json
POST /.netlify/functions/waitlist
Content-Type: application/json

{ "email": "you@company.com" }
```

The function:
1. Validates the email format
2. Upserts into Supabase (duplicate signups return success)
3. Sends a notification email via Resend (skipped if `RESEND_API_KEY` is absent)

---

## Design system

All visual tokens are defined as CSS custom properties in `globals.css` under `:root.dark`. The site is **dark-only** — no light mode toggle. Key tokens:

| Token | Value | Use |
|---|---|---|
| `--signal` | `#8a76ff` | Primary accent (purple) |
| `--ink` | `#edf2ff` | Primary text |
| `--ink-soft` | `#aab5d2` | Secondary text |
| `--surface` | `rgba(14,20,38,0.9)` | Card backgrounds |
| `--line` | `rgba(124,143,184,0.28)` | Borders and dividers |

Tailwind dark mode is **not** used — all theming is done via CSS variables.

---

## License

Copyright © 2025 BuildAtlas. All rights reserved.
