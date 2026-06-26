# TELUS Design LATAM · Engagement Case

An interactive, scroll-driven presentation of a graduate Strategic People Management
(Gestão Estratégica de Pessoas) case study about an engagement crisis inside the
Design LATAM operation of TELUS Digital (the operation that began as the Poatek
software boutique). It replaces a slide deck: a single-page web app the author
presents live, built to read as a rigorous diagnosis and intervention plan.

The interface is in **Brazilian Portuguese** (the audience is in São Paulo); the
codebase and documentation are in English.

## Stack

- **Vite + React 18 + TypeScript** (strict)
- **Tailwind CSS v3**, fully token-driven (no arbitrary values; ESLint-enforced)
- **GSAP / ScrollTrigger + Lenis** for scroll choreography and proximity snap
- **Framer Motion** (`motion/react`) for component motion and the carousels
- **React Three Fiber + GLSL** for the hero shader field
- **D3** (scales/shape) for the bespoke, React-controlled SVG charts
- Self-hosted fonts: Space Grotesk (display), Inter (body), Space Mono (labels)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run lint       # ESLint (governance: no arbitrary Tailwind values)
```

## Structure

```
src/
  app/         Shell, PillarNav, StepRail, ScrollProvider, scroll-spy + keyboard nav
  chapters/    the eight full-viewport scenes (00-Hero … Close)
  components/  primitives/ (SectionShell, PosterCard, Carousel, Panel, …)
               data/       (the bespoke charts + cards)
               viz/        (low-level SVG + d3 helpers)
  content/     case.ts (data) · copy.ts (prose) · chapters.ts (nav) — single source of truth
  styles/      tokens.ts (TS mirror of the Tailwind design tokens)
  webgl/       HeroField + GLSL shaders
  lib/         motion, format, parallax, and reduced-motion / in-view / count-up hooks
```

All case data and copy live in `content/`; components receive typed props. The
design system is documented in `briefing/`.
