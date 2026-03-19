# BuildAtlas Website

Marketing site for BuildAtlas, a CI/CD pipeline visualization product. The site is built with Next.js App Router, exported as a static site, and includes a waitlist form backed by a Netlify function.

## What is in the site

- Responsive landing page with animated hero, product preview, pipeline graph, and footer
- Light and dark mode with persisted theme preference
- Interactive product preview with Graph, Timeline, and Summary tabs
- Demo pipeline visualization built with `@xyflow/react`
- Background galaxy effect built with OGL
- Waitlist signup flow that stores emails via a Netlify function

## Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- `@xyflow/react`
- OGL
- Netlify Functions

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
```

## Environment variables

The site can run without extra env vars for basic UI work, but these are used by the app:

```bash
# Used for metadataBase and canonical asset resolution
NEXT_PUBLIC_SITE_URL=

# Optional override for the waitlist POST target in local/dev environments
NEXT_PUBLIC_WAITLIST_ENDPOINT=

# Netlify waitlist function
SUPABASE_URL=
SUPABASE_ANON_KEY=
WAITLIST_NOTIFY_TO=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

Notes:

- `NEXT_PUBLIC_SITE_URL` is preferred for production metadata.
- If you are running the frontend outside Netlify function routing, set `NEXT_PUBLIC_WAITLIST_ENDPOINT`.
- The waitlist notification email is skipped when `RESEND_API_KEY` or `RESEND_FROM_EMAIL` is missing.

## Build and deployment

This project is configured to export a static site:

- `next.config.js` uses `output: "export"`
- Netlify publishes the generated `out/` directory
- Netlify functions live in `netlify/functions/`

Netlify config:

- Build command: `npm run build`
- Publish directory: `out`
- Functions directory: `netlify/functions`

## Project structure

```text
src/
  app/
    globals.css        Global tokens and shared styles
    layout.tsx         Root layout, metadata, theme bootstrapping
    page.tsx           Page composition and section order
  components/
    Navbar.tsx         Header, navigation, theme toggle
    Hero.tsx           Hero copy and waitlist card
    ProductPreview.tsx Interactive tabbed product preview
    PipelineGraph.tsx  Demo CI/CD graph section
    HowItWorks.tsx     Four-step explainer section
    WaitlistCard.tsx   Waitlist form UI
    ThemeToggle.tsx    Theme persistence and toggle behavior
    Galaxy.tsx         Background canvas effect
    BorderGlow.tsx     Shared glow treatment
netlify/
  functions/
    waitlist.mjs       Waitlist handler
public/
  BuildAtlas-Banner.png
  BuildAtlas-BannerDark.png
  other static assets
```

## Waitlist flow

The waitlist form posts JSON to the configured endpoint with this shape:

```json
{
  "email": "you@example.com"
}
```

The Netlify function:

- validates the email
- inserts it into Supabase
- treats duplicate signups as a successful response
- optionally sends a notification email via Resend

## Current status

The site builds successfully with:

```bash
npm run build
```
