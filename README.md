# BuildAtlas Website

A modern, production-quality landing page for BuildAtlas — a CI/CD pipeline visualization tool that helps developers debug faster.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icons

## Design System

### Brand Colors
- Primary Blue: `#2563EB`
- Hover Blue: `#1D4ED8`
- Accent Blue: `#60A5FA`

### Light Mode
- Background: `#FFFFFF`
- Surface: `#F9FAFB`
- Text: `#111827`
- Secondary Text: `#6B7280`
- Border: `#E5E7EB`

### Dark Mode
- Background: `#0F172A`
- Surface: `#1E293B`
- Text: `#E5E7EB`
- Secondary Text: `#94A3B8`
- Border: `#334155`

### Status Colors (Pipeline Visualization)
- Success: `#22C55E`
- Failure: `#EF4444`
- Running: `#F59E0B`
- Pending: `#64748B`

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and design tokens
│   ├── layout.tsx       # Root layout with theme support
│   └── page.tsx         # Landing page
├── components/
│   ├── Navbar.tsx       # Navigation with theme toggle
│   ├── Hero.tsx         # Hero section with CTA
│   ├── PipelineGraph.tsx # Interactive pipeline visualization
│   ├── Problem.tsx      # Pain points section
│   ├── Solution.tsx     # Product benefits
│   ├── Features.tsx     # Feature cards
│   ├── HowItWorks.tsx   # Step-by-step guide
│   ├── ProductPreview.tsx # Dashboard mockup
│   ├── CTA.tsx          # Waitlist signup form
│   ├── Footer.tsx       # Site footer
│   └── ThemeToggle.tsx  # Light/dark mode toggle
```

## Deployment

The site is configured for deployment on Netlify with serverless functions for the waitlist signup.

## License

MIT
