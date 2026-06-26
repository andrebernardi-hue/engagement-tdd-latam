# 02 · Design System: Tokens, Shell, Components, Governance

> Everything visible is built from tokens and shared components. This is the rule André set: globally calibrated styles, no one-offs. This document defines the vocabulary and the layout shell, then the component inventory that consumes them. If a screen needs a value that is not a token, add the token, do not inline the value.

---

## 1. Design language

The aesthetic is editorial and precise, with a TELUS brand foundation: a warm paper background, deep plum as the primary, and lime and teal as the energy and "healthy" accents, with a single red reserved for negative gaps and urgency. Display type is geometric (Space Grotesk), body is neutral and legible (Inter), and labels and numbers use a monospace (Space Mono) for a data-instrument feel. The result should read as a confident analytical document that happens to move beautifully, not as a flashy site with text bolted on.

Motion is structural. It reveals hierarchy, draws the eye to the number that matters, and makes the dilution-to-recovery arc feel physical. It never spins for its own sake.

---

## 2. Color tokens and semantics

Base palette (mirror in `tailwind.config.js` and `tokens.ts`):

| Token | Hex | Use |
|---|---|---|
| `plum.DEFAULT` | `#4B286D` | Primary brand, primary data fill, active nav |
| `plum.deep` | `#2A1640` | Dark panels, inverted scenes, depth |
| `plum.ink` | `#1C1426` | Base text on paper |
| `paper.DEFAULT` | `#F2F1EB` | Page background |
| `paper.2` | `#EAE8DF` | Track backgrounds, insets |
| `paper.card` | `#FBFAF6` | Card surfaces |
| `lime.DEFAULT` | `#7FBF2E` | Energy accent, highlights, selection |
| `lime.bright` | `#8CD211` | Hover/emphasis on lime |
| `teal.DEFAULT` | `#1E9E72` | "Healthy" / positive, strong-asset data |
| `teal.2` | `#3FBE8A` | Secondary positive |
| `red.DEFAULT` | `#C53A2B` | Negative gaps, urgency, worst-item |
| `red.soft` | `#E08A7E` | Muted negative |
| `muted` | `#6A6275` | Secondary text, captions |

Line and shadow: `line` `rgba(28,20,38,.12)`, `line-strong` `rgba(28,20,38,.22)`, shadow `card` as defined in tech setup.

Semantic mapping (use these names in components, not raw colors):

- `--c-positive` to `teal`, `--c-positive-2` to `teal.2`
- `--c-negative` to `red`, `--c-warning` to `#E4B53C` (add as token `amber` if used by the benchmark band)
- `--c-primary` to `plum`, `--c-accent` to `lime`
- Surfaces: `--surface-page` paper, `--surface-card` paper.card, `--surface-invert` plum.deep

Benchmark band gradient (engagement scale): lower 0 to 60 in `red`, moderate 60 to 77 in `amber`, top 77 to 100 in `plum`. Register `amber #E4B53C` as a token so this is not a one-off.

Contrast: text on paper uses `plum.ink`. Text on `plum.deep` uses white at full or 0.8 opacity. Never put `muted` text on `plum.deep`. Verify all combinations meet WCAG AA (see section 8).

---

## 3. Typography scale

Families: `display` Space Grotesk, `body` Inter, `mono` Space Mono.

Define a fixed, fluid scale with `clamp()` and expose as tokens / utility classes. Do not invent sizes per component.

| Role | Family | Size (clamp) | Weight | Tracking / leading |
|---|---|---|---|---|
| Hero | display | `clamp(2.6rem, 8.4vw, 6.4rem)` | 700 | -0.02em / 1.04 |
| H2 (chapter title) | display | `clamp(1.9rem, 5vw, 3.1rem)` | 700 | -0.02em / 1.06 |
| H3 (block title) | display | `1.15rem` | 600 | -0.01em / 1.2 |
| Lead | body | `clamp(1.05rem, 2.4vw, 1.3rem)` | 400 | 1.55, color `muted` |
| Body | body | `1rem` | 400 | 1.55 |
| Eyebrow | mono | `12px` | 700 | 0.18em uppercase, color `teal` |
| Chapter number | mono | `13px` | 700 | color `plum`, opacity .55 |
| Stat number | display | `clamp(1.9rem, 4.4vw, 2.7rem)` | 700 | 1.0 |
| Big stat | display | `clamp(3.4rem, 12vw, 5.4rem)` | 700 | 1.0 |
| Mono label / value | mono | `11px`-`13px` | 600-700 | as needed |

Eyebrow pattern: a short mono uppercase label preceded by a 26px teal rule, used to open every chapter, paired with the chapter number.

---

## 4. Spacing, radius, layout primitives

- **Spacing scale (8pt base):** 4, 8, 12, 16, 18, 24, 30, 38, 46, 64, 92. Expose as tokens. Section vertical rhythm uses 92 desktop, 64 tight.
- **Radius:** `card` 16px, smaller chips 6 to 9px, `pill` 999px.
- **Max content width:** 1120px for reading blocks, but scenes themselves span the full viewport; the 1120 column is centered inside a full-bleed scene.
- **Borders:** 1px `line` default, 1px `line-strong` for emphasis, 1.5px for ring outlines.
- **Shadow:** the single `card` shadow token. No bespoke shadows.

---

## 5. The layout shell (this is the signature structure)

Three persistent layers wrap all chapters. Build them first.

### 5.1 Full-viewport scenes
Each chapter renders as a `SectionShell`: a `min-h-screen w-screen` scene with a centered 1120px content column. Scenes may be light (paper) or inverted (plum.deep) to punctuate the arc. The hero, the problem reveal, and the closing diagnosis are candidates for inverted or shader-backed scenes. Use scroll snapping at the scene level only if it does not fight the GSAP scrubbed sequences; prefer free scroll with strong in-scene pinning where a chapter has staged reveals.

### 5.2 Top pillar navigation (`PillarNav`)
A persistent top bar exposing the storytelling pillars as anchors. Pillars map to chapters:

`00 Opening · 01 Introduction · 02 Organization · 03 Problem · 04 Analysis · 05 Solution · 06 Discussion`

Behavior: sticky at top, condenses on scroll (height and background shift after the hero). The active pillar is highlighted by scroll-spy. Clicking a pillar smooth-scrolls (via Lenis) to that chapter. On the hero it can be near-transparent; on content scenes it gains a paper backdrop with a hairline `line` border. Keep labels mono, uppercase, small. A thin top progress bar (plum) reads total scroll progress.

### 5.3 Right-side step rail (`StepRail`)
A vertical stepper pinned to the right edge, vertically centered, that walks the viewer through the chapters one step at a time. This is the "slider no canto direito" André specified.

- One node per chapter, in order, connected by a vertical line.
- The active node is filled plum and enlarged; completed nodes are filled at lower emphasis; upcoming nodes are outlined.
- Each node reveals its chapter label on hover (mono chip to the left of the node).
- A subtle progress fill runs along the connecting line to show position within the whole story.
- Up and down affordances (or the nodes themselves) let the viewer jump step by step; clicking a node scrolls to that chapter.
- Hidden under a narrow width threshold, but since this is desktop Chrome on Windows, it is effectively always present.

`PillarNav` and `StepRail` share one `useActiveChapter` scroll-spy hook (IntersectionObserver based) so they never disagree.

---

## 6. Motion tokens and principles

Expose motion as tokens in `lib/motion.ts`. Do not hardcode durations or easings in components.

- **Durations:** `quick` 0.2s, `base` 0.7s, `slow` 1.0s, `count` 1.4s.
- **Easings:** `brand` `cubic-bezier(.2,.7,.2,1)` for reveals and bar fills; `expoOut` for hero and large moves; linear only for the top progress bar.
- **Reveal:** elements rise 22px and fade in over `base` with `brand`, triggered once when 12% in view. This is the default for content blocks.
- **Stagger:** grouped items stagger by 60 to 90ms.
- **Count-up:** numbers ease from 0 to target over `count` with cubic ease-out; under reduced motion they render final immediately.
- **Bar fills:** widths/scales animate over `slow` with `brand`, once, when in view.
- **Scrubbed sequences:** the hero dilution metaphor and the problem reveal are scroll-linked via GSAP ScrollTrigger; everything scrubbed must also have a static, readable end state for reduced motion.

Principle: motion guides attention to one focal element per scene. If two things move for attention at once, cut one.

---

## 7. Component inventory

All components are typed, variant-based (use `tailwind-variants`), and consume tokens only. Group as below.

### 7.1 Primitives (`components/primitives/`)
- `SectionShell` (props: `tone: 'paper' | 'invert' | 'shader'`, `id`, children): full-viewport scene wrapper with the centered column.
- `Eyebrow` (teal rule + mono label), `ChapterNum`, `SectionHead` (chapter num + eyebrow + H2 + lead).
- `Panel` (card surface, `line` border, `card` shadow, `card` radius), `Tag`/`Chip`, `Pill` (variants: `default | win | alert`), `DividerLabel` (mono uppercase section divider).
- `Button`/`Toggle` (for any chart mode switches), focus-visible ring in `lime`.

### 7.2 Data components (`components/data/`)
Each maps to a specific case visualization. Specs and data in `03-CONTENT.md` and `04-MOTION-DATAVIZ.md`.

- `StatCard` (big number, label, sub-note; variants `plum | teal`) for financial and headline stats.
- `RingNest`: concentric rings showing 140k to 41 dilution; innermost (Design LATAM 41) is the lime focal ring.
- `Timeline`: vertical acquisition timeline 2021 / 2022 / 2025.
- `BenchmarkScale`: the 0 to 100 engagement scale with the three bands and the 40 marker, plus the 80 target marker.
- `DistributionBars`: engaged / passive / disengaged distribution.
- `ParadoxColumns`: two columns, strong (teal) vs weak (red), each a list of `MetricBar`.
- `MetricBar`: labeled horizontal bar with mono value; variants `positive | negative | primary`.
- `SayStayStrive`: categorized rows (SAY / STAY / STRIVE) with favorable bar and gap value.
- `DivergingBars`: the 12-dimension chart with a center axis and signed gaps, with a mode toggle (favorable % / gap vs company / gap vs LATAM).
- `QuoteCard`: employee verbatim with source tag.
- `CaveatPanel`: dashed-border methodological-honesty block with a corroboration note.
- `TensionPanel`: inverted top with the leadership quote, paper bottom with the "point of attention."
- `TheoryCard`: framework lens card: class label (eyebrow), title, body, framework chips.
- `TargetMeter`: current value to target with milestone marker (for the solution metas).
- `DebateCard`: expandable card with question and two opposing lenses (A positive, B critical) plus a data footnote.

### 7.3 Viz helpers (`components/viz/`)
Low-level, reusable SVG building blocks: `Track`, `AnimatedBar`, `Axis`, `CenterAxis`, `ValueLabel`. These hold the d3 scale logic and the in-view animation, so the data components stay declarative.

Reuse is mandatory: `MetricBar` powers the paradox columns, the distribution, and any simple bar. `DivergingBars` and `SayStayStrive` are the only bespoke chart engines. Do not write a fourth bar implementation.

---

## 8. Accessibility

- **Reduced motion:** one `useReducedMotion` flag governs all systems (section 6 and tech setup section 5). Verified by toggling the OS setting.
- **Contrast:** all text/background pairs meet WCAG AA. Validate plum.ink on paper, white on plum.deep, teal and red values where used as text (use the darker `#5a8a14` for lime-as-text, as the source HTML does, never lime on paper for text).
- **Focus:** visible `lime` focus ring on all interactive elements (pillars, step nodes, toggles, debate cards).
- **Semantics:** chapters are `<section>` with `aria-labelledby`; nav is `<nav aria-label>`; debate cards use native `<details>`/`<summary>` so they work without JS and are keyboard-operable.
- **Motion safety:** nothing flashes; shader motion is slow and low-contrast.

---

## 9. Governance: the no-one-offs rule (enforced)

This is non-negotiable and is how the build stays calibrated.

1. **No raw values in components.** No hex, no px, no bespoke easing inside a component. Everything references a token (Tailwind class backed by the theme, or a `tokens.ts` constant for JS/d3/WebGL).
2. **No arbitrary Tailwind values.** `eslint-plugin-tailwindcss` flags `[...]` arbitrary values. If you need one, it means a token is missing: add the token.
3. **One implementation per pattern.** Bars, cards, section heads, and nav exist once and are reused with variants. A second copy is a bug.
4. **Tokens have a single home.** `tailwind.config.js` for CSS, `tokens.ts` for JS, kept in sync. Motion presets live in `lib/motion.ts`. Copy and data live in `content/`.
5. **Review gate before done:** run `npm run lint` clean, grep the `components/` tree for hex/px literals and arbitrary values (should return nothing), confirm a single token change (for example, swap `plum.DEFAULT`) visibly propagates across the app, run a reduced-motion pass, and run a desktop Lighthouse pass (Performance 90+, Accessibility 95+).
