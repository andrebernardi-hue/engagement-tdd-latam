# 01 · Technical Setup and Configuration

> The goal of this document is a clean, fast, maintainable foundation for an FWA-grade single-page experience. Set this up exactly before writing any feature code. The design tokens defined here and in `02-DESIGN-SYSTEM.md` are the single styling source. No ad-hoc styling.

---

## 1. Stack decision and rationale

- **Build tool: Vite.** Fast dev server, native ESM, simple production builds, first-class React and GLSL support.
- **Framework: React 18 + TypeScript.** Type safety matters here because all case data is typed and must not drift from the v3 report.
- **Styling: Tailwind CSS v3.4 with a token-driven config.** Tailwind is the utility layer, but every value comes from the theme tokens, not arbitrary classes. Arbitrary values (`w-[437px]`) are disallowed by lint. Component-level composition uses small, shared, variant-based primitives (see `02`).
- **Animation: GSAP 3 + ScrollTrigger for scroll choreography, and Framer Motion (`motion`) for component-level enter/exit and gestures.** GSAP owns the timeline-based, scroll-linked sequences (pinning, scrubbing, staged reveals). Framer Motion owns declarative component transitions and layout animations. Do not duplicate the same animation in both systems.
- **Smooth scroll: Lenis.** Drives the buttery scroll feel and provides a single scroll source that ScrollTrigger subscribes to. Respect `prefers-reduced-motion` by disabling smoothing.
- **Shaders / WebGL: React Three Fiber (`@react-three/fiber`) + `@react-three/drei`, with custom GLSL.** Used for the hero background and section ambient fields only. Keep WebGL surfaces few, large, and lazy-loaded. A lightweight alternative (`OGL`) is acceptable if R3F proves heavy, but standardize on one.
- **Data visualization: D3 (`d3-scale`, `d3-shape`, `d3-array`, `d3-interpolate`) rendered through React-controlled SVG.** This gives full control over the bespoke charts (diverging bars, ring nest, Say/Stay/Strive, dimension bars) with token-driven styling. Do not pull in a heavy charting library that imposes its own look. Recharts is acceptable only if a quick standard chart is needed; the signature charts are custom.
- **Fonts, self-hosted: Space Grotesk (display), Inter (body), Space Mono (labels/mono).** Self-host via `@fontsource` to avoid render-blocking external requests and layout shift.

If any library choice is revisited, update this file so it stays the single source of truth for the stack.

---

## 2. Scaffolding commands

```bash
# 1. Create the app
npm create vite@latest telus-case -- --template react-ts
cd telus-case

# 2. Core animation + scroll
npm i gsap lenis motion

# 3. WebGL / shaders
npm i three @react-three/fiber @react-three/drei

# 4. Data viz
npm i d3-scale d3-shape d3-array d3-interpolate d3-format
npm i -D @types/d3-scale @types/d3-shape @types/d3-array

# 5. Styling
npm i -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# 6. Self-hosted fonts
npm i @fontsource/space-grotesk @fontsource/inter @fontsource/space-mono

# 7. Tooling
npm i -D eslint prettier eslint-plugin-tailwindcss @typescript-eslint/eslint-plugin @typescript-eslint/parser clsx tailwind-variants
```

`clsx` and `tailwind-variants` support the variant-based component pattern from `02`.

---

## 3. File and folder structure

```
src/
  main.tsx                 # entry; imports fonts + global css; mounts <App/>
  App.tsx                  # composes the shell + chapters in order
  index.css                # Tailwind layers + @layer base/components/utilities only

  app/
    Shell.tsx              # full-viewport layout: PillarNav (top) + StepRail (right) + <main>
    PillarNav.tsx          # top storytelling pillars w/ anchors
    StepRail.tsx           # right-side vertical stepper/slider
    ScrollProvider.tsx     # Lenis + GSAP ScrollTrigger bootstrap, reduced-motion aware
    useActiveChapter.ts    # scroll-spy hook shared by PillarNav and StepRail

  chapters/
    00-Hero/
    01-Intro/
    02-Organization/
    03-Problem/
    04-Analysis/
    05-Solution/
    06-Discussion/
    Close/
      index.tsx            # each chapter is a self-contained <section> scene

  components/              # shared, tokenized, variant-based primitives ONLY
    primitives/            # Button, Tag, Eyebrow, ChapterNum, SectionShell, Panel...
    data/                  # StatCard, MetricBar, DivergingBars, RingNest, Timeline,
                           # SayStayStrive, QuoteCard, TheoryCard, DebateCard,
                           # CaveatPanel, TensionPanel, TargetMeter, DistributionBars
    viz/                   # low-level SVG + d3 helpers (Axis, Track, AnimatedBar)

  webgl/
    HeroField.tsx          # R3F canvas wrapper (lazy)
    shaders/               # *.glsl (vertex/fragment), imported as strings

  content/
    case.ts                # ALL case data, typed, transcribed from v3 (single source)
    chapters.ts            # chapter metadata: id, label, pillar, order
    copy.ts                # all prose strings (author voice), English-US

  styles/
    tokens.ts              # TS mirror of design tokens for JS/WebGL/d3 consumers
  lib/
    motion.ts              # shared GSAP/Framer presets (durations, easings)
    format.ts              # number/percent formatting helpers
```

Rule: **case data and copy live only in `content/`.** Components receive typed props. This is what keeps the build aligned to v3 and prevents number drift. A reviewer changing a stat edits one file.

---

## 4. Tailwind config (token-driven)

`tailwind.config.js` defines the entire visual vocabulary. Components consume these names, never raw hex or px. Full token values and semantics are in `02-DESIGN-SYSTEM.md`; this is the wiring.

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Replace the defaults so stray values are impossible to use accidentally.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      plum:      { DEFAULT: '#4B286D', deep: '#2A1640', ink: '#1C1426' },
      paper:     { DEFAULT: '#F2F1EB', 2: '#EAE8DF', card: '#FBFAF6' },
      lime:      { DEFAULT: '#7FBF2E', bright: '#8CD211' },
      teal:      { DEFAULT: '#1E9E72', 2: '#3FBE8A' },
      red:       { DEFAULT: '#C53A2B', soft: '#E08A7E' },
      muted:     '#6A6275',
      white:     '#FFFFFF',
    },
    fontFamily: {
      display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      body:    ['Inter', 'system-ui', 'sans-serif'],
      mono:    ['"Space Mono"', 'monospace'],
    },
    extend: {
      borderColor:   { line: 'rgba(28,20,38,.12)', strong: 'rgba(28,20,38,.22)' },
      boxShadow:     { card: '0 1px 0 rgba(28,20,38,.04), 0 18px 40px -28px rgba(42,22,64,.45)' },
      borderRadius:  { card: '16px', pill: '999px' },
      transitionTimingFunction: { brand: 'cubic-bezier(.2,.7,.2,1)' },
      maxWidth:      { content: '1120px' },
    },
  },
  plugins: [],
}
```

Keep `src/styles/tokens.ts` as a TypeScript mirror of these values so WebGL and d3 read the same numbers. The two must never diverge; if you change a color, change both, or derive one from the other.

---

## 5. Performance budget and tactics

Target: sustained 60fps scroll and interaction in Chrome on a mid-range Windows laptop. Initial load under 2.5s on a typical connection. Lighthouse Performance 90+ on desktop.

Tactics:

- **One WebGL context.** A single hero canvas, plus at most one ambient field reused across sections via a fixed, behind-content canvas. Never one canvas per section.
- **Lazy-load WebGL and heavy chapters.** `React.lazy` the hero field and any chapter not in the first viewport. Suspense fallback is a static gradient that matches the shader's base colors, so there is no visual pop.
- **Animate only `transform` and `opacity`.** No animating layout properties (width, top, left) in scroll-linked work. Diverging-bar widths animate via `transform: scaleX` with a transform-origin, not width, where possible; if width animation is unavoidable for a chart, gate it behind an in-view trigger and run it once.
- **`will-change` sparingly,** applied just before an animation and removed after.
- **ScrollTrigger via Lenis.** Subscribe ScrollTrigger to Lenis's scroll, call `ScrollTrigger.refresh()` after layout settles and on resize. Use `invalidateOnRefresh` for responsive timelines.
- **`prefers-reduced-motion`.** A single `useReducedMotion` source disables Lenis smoothing, converts scrubbed timelines to instant in-view reveals, freezes shaders to a static frame, and replaces count-ups with final values. Every motion system reads this one flag.
- **Throttle scroll work.** No per-frame React state updates from scroll. Scroll-spy uses IntersectionObserver, not scroll listeners. Progress indicators update via direct DOM/ref writes or GSAP, not React re-renders.
- **Cap device pixel ratio** for the WebGL canvas at `Math.min(devicePixelRatio, 2)` to protect fill rate on high-DPI Windows displays.
- **Pause offscreen work.** Stop the shader render loop and any rAF when the canvas is not visible (IntersectionObserver on the canvas wrapper).
- **Fonts.** Self-hosted, `font-display: swap`, preloaded for the three families. Define metrics-matched fallbacks to avoid layout shift.

---

## 6. Build, scripts, and quality gates

`package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\""
  }
}
```

ESLint must enforce the no-one-offs rule:

- Enable `eslint-plugin-tailwindcss` with `no-arbitrary-value` style discipline. Flag arbitrary Tailwind values so one-off pixel and hex values cannot enter components.
- TypeScript `strict: true`. No `any` in content or component prop types.
- Prettier with no semicolon/style debates; one config, applied on save.

`vite.config.ts` notes:

- Add the React plugin and a GLSL import plugin (`vite-plugin-glsl`) so shaders import as strings.
- Configure manual chunks so `three`/R3F land in their own chunk, separate from the main bundle.

```bash
npm i -D vite-plugin-glsl
```

---

## 7. Bootstrapping order for the build

1. Scaffold (section 2), wire Tailwind config (section 4), self-host fonts, drop tokens into `tokens.ts`.
2. Build `Shell`, `PillarNav`, `StepRail`, `ScrollProvider` from `02-DESIGN-SYSTEM.md`. Verify full-viewport scenes scroll and the rail/pillars track active chapter with placeholder sections.
3. Transcribe all case data and copy into `content/` from `03-CONTENT.md` (which is already aligned to v3). Type everything.
4. Build the shared data components in `components/data/` against that typed content.
5. Layer motion and shaders per `04-MOTION-DATAVIZ.md`, last, so performance regressions are easy to attribute.
6. Run the verification checklist in `02` section on governance, plus a reduced-motion pass and a Lighthouse pass, before calling it done.
