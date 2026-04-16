# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (HMR on localhost:5173)
npm run build      # Type-check + production build (outputs to dist/)
npm run lint       # ESLint
npm run preview    # Preview production build locally
```

No test suite is configured.

## Stack

- **React 19** + **TypeScript** — entry at `src/main.tsx`, root component `src/App.tsx`
- **Vite 8** — bundler and dev server
- **Tailwind CSS v4** — utility-first styling (PostCSS/autoprefixer included)
- **Framer Motion** — animations
- No router is installed yet; routing needs to be added (e.g. React Router or TanStack Router)

## What this site is

A 3-page marketing site for **InMotion Wraps** — a vehicle wraps and printing business. The goal is lead generation (get visitors to contact for a quote).

**Pages:** Home (`/`), Services (`/services`), Contact (`/contact`)

**Persistent layout:** Navbar (logo left, nav links center, "Get a Quote" CTA right) + Footer (logo, tagline, nav, phone, email, copyright)

## Design system (from BLUEPRINT.md)

| Token | Value |
|---|---|
| Background | `#0D0D0D` |
| Card/surface | `#161616` |
| Border | `#2A2A2A` |
| Accent (yellow) | `#F5C400` |
| Text primary | `#F0F0F0` |
| Text secondary | `#CCCCCC` |
| Muted text | `#888888` |

- **Display/Hero:** `Bebas Neue` 400 → `font-display`
- **Headings:** `Barlow Condensed` 600–700 → `font-heading`
- **Labels/Caps:** `Barlow Condensed` 500, uppercase, tracked → `font-heading font-medium`
- **Body/UI:** `DM Sans` 400–500 → `font-body`
- Feel: dark, bold, premium — automotive meets print studio

## Service categories

Three categories used consistently site-wide:
1. Vehicle Wraps & Fleet Graphics
2. Printing & Large Format Graphics
3. Marketing & Promotional Materials

## Forms

No backend. Use Formspree, Netlify Forms, or EmailJS for the contact form. On submit: show inline thank-you, no page redirect.

## Images

WebP format, under 200KB each. Apply `loading="lazy"` on everything below the fold. Use `object-fit: cover` on hero/section images. Real work photos only — no stock.

## Current state

`src/App.tsx` is still the default Vite scaffold. The site has not been built yet. The full spec lives in `BLUEPRINT.md`.


## Full spec
See `BLUEPRINT.md` for the complete page-by-page specification.