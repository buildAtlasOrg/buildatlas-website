# BuildAtlas — Marketing Site

Next.js 15 static site deployed on Netlify. App Router, TypeScript, Tailwind CSS.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, `output: "export"`) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | Framer Motion, OGL (WebGL) |
| Pipeline graph | `@xyflow/react` |
| Deployment | Netlify (static + Functions) |
| Waitlist backend | Supabase + Resend |

---

## Project structure

```
src/
├── app/
│   ├── globals.css           Design tokens, component classes, scrollbar styles
│   ├── layout.tsx            Root layout, IBM Plex fonts, forced dark mode
│   ├── page.tsx              Page composition
│   └── demo/
│       └── page.tsx          Interactive demo page
└── components/
    ├── Navbar.tsx            Fixed header, primary nav
    ├── Hero.tsx              Headline, CTAs, stats, waitlist card
    ├── ProductPreview.tsx    Inline SVG app mockup
    ├── Problem.tsx           Pain point cards
    ├── Features.tsx          Capability rows with visuals
    ├── HowItWorks.tsx        Four-step explainer
    ├── Founder.tsx           Founder profile
    ├── WaitlistCard.tsx      Email form, Netlify function POST
    ├── PipelineGraph.tsx     @xyflow/react graph (landing page)
    ├── BorderGlow.tsx        Proximity-glow border effect
    ├── Section.tsx           SectionShell / SectionIntro / SectionDivider
    ├── ThemedGalaxyBackdrop.tsx  WebGL galaxy background via OGL
    └── demo/
        ├── DemoApp.tsx       Full-screen demo UI
        ├── PipelineFlow.tsx  Custom SVG DAG renderer (no external deps)
        └── mockData.ts       Static fixture data
netlify/
└── functions/
    └── waitlist.mjs          Email handler — validates, upserts Supabase, Resend notify
```

---

## Design system

Tokens defined in `globals.css` under `:root.dark`. Dark-only — no light mode. Tailwind `dark:` prefix is not used.

| Token | Value | Role |
|---|---|---|
| `--signal` | `#8a76ff` | Primary accent |
| `--ink` | `#edf2ff` | Primary text |
| `--ink-soft` | `#aab5d2` | Secondary text |
| `--surface` | `rgba(14,20,38,0.9)` | Card backgrounds |
| `--line` | `rgba(124,143,184,0.28)` | Borders |
| `--ember` | `#ff9a96` | Error / warning |
| `--success` | `#4ade80` | Success states |

---

## Waitlist function

`POST /.netlify/functions/waitlist` — `Content-Type: application/json`

```json
{ "email": "user@example.com" }
```

1. Validates email format
2. Upserts into Supabase (duplicates return `200`)
3. Sends notification via Resend (skipped if env vars absent)

---

## Deployment

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `out` |
| Functions directory | `netlify/functions` |
