# 04 · Motion, Shaders, and Data Visualization

> Motion is choreography. Each effect earns its place by guiding attention or revealing structure. Everything here must run at 60fps in Chrome on Windows and degrade cleanly under `prefers-reduced-motion`. All colors and easings come from tokens (`02-DESIGN-SYSTEM.md`). All data comes from `content/case.ts` (`03-CONTENT.md`).

---

## 1. Motion principles (recap, binding)

- One focal motion per scene. If two things compete for attention, cut one.
- Scroll-linked sequences use GSAP ScrollTrigger bound to Lenis. Component enter/exit and gestures use Framer Motion. Never both for the same element.
- Every scrubbed sequence has a static, readable end state for reduced motion.
- Animate `transform` and `opacity` only. Bars prefer `scaleX` from a fixed origin over animating width.
- Reveals: rise 22px, fade in, `base` duration, `brand` easing, once at 12% in view.
- Reduced motion: smoothing off, scrubs become instant in-view reveals, shaders freeze to a static frame, count-ups show final values.

---

## 2. Global scroll and transitions

- **Lenis smooth scroll** drives the page. Top progress bar (plum, 3px) reads total progress, updated outside React.
- **Scene transitions:** as a new full-viewport scene enters, its `SectionHead` reveals (eyebrow rule draws left to right over `quick`, then chapter number, title, and lead stagger up by 70ms). Inverted scenes (problem reveal, closing diagnosis) cross-fade their background from paper to `plum.deep` as they pin.
- **Pillar nav and step rail** update active state via shared IntersectionObserver. The step rail's connecting-line fill grows as chapters complete. Node transitions over `quick`.
- **Anchor jumps:** clicking a pillar or step node triggers a Lenis `scrollTo` with `brand`/`expoOut` easing.

---

## 3. Hero shader (signature visual)

Concept: a slow, living field that embodies dilution. A dense, saturated core (lime and teal over plum) disperses outward into the paper background, as if a concentrated identity is diffusing into a vast neutral body. It should feel organic and quiet, never busy.

Implementation:
- React Three Fiber, a single full-bleed plane with a custom fragment shader (GLSL, imported as a string via `vite-plugin-glsl`).
- Technique: layered simplex/curl noise driving a gradient blend across three brand stops (`plum.deep` base, `teal` mid, `lime.bright` highlight), with a soft radial mask that concentrates color toward one off-center node and dissolves toward the edges into `paper`.
- Animate a `uTime` uniform slowly (low frequency) for drift. Optional `uScroll` uniform lets the field disperse further as the user scrolls out of the hero, reinforcing the metaphor.
- Cap DPR at 2. Pause the render loop when the canvas is offscreen (IntersectionObserver). Lazy-load the canvas; Suspense fallback is a CSS radial-gradient using the same stops so there is no pop.
- Reduced motion: render a single static frame (freeze `uTime`).

Headline number play: the word "140,000" can count up from 100 on first paint (or animate 100 then jump scale to 140k), using the count-up util. Keep it subtle; the shader is the star.

Optional ambient field: a much fainter version of the same shader, fixed behind content on the inverted scenes only (problem, closing), at low opacity. Reuse the same canvas/material; do not add a second WebGL context.

---

## 4. Data visualization specs

Shared behavior: each chart animates once when 25 to 30% in view, using `slow` + `brand`. Values are mono. Positive uses `teal`, negative uses `red`, primary uses `plum`. Build on the `viz/` helpers so animation and scales are shared.

### 4.1 RingNest (Chapter 02)
- Five concentric rings: TELUS ~140k (outer) to Design LATAM 41 (inner focal, lime with a soft glow ring).
- Each ring labeled with entity and headcount (mono chip).
- Entrance: rings scale in from the outside inward, staggered 80ms, so the eye lands last on the 41 core. On hover, a ring lifts its border to `plum`.
- Reduced motion: render final, no stagger.
- Data: structure nesting from the global data layer.

### 4.2 Timeline (Chapter 02)
- Vertical line with three dots (2021, 2022, 2025), each with year (mono, plum), title, and one-line description.
- Entrance: line draws top to bottom (`scaleY` from origin top), dots pop in as the line passes them, text reveals beside each.
- 2025 dot emphasized (it is "the year with the most change").

### 4.3 StatCards (Chapter 02)
- Four cards, count-up numbers (`count` duration, ease-out cubic). Variants: revenue and new-clients in `teal`, others in `plum`.
- Format: US$ 2.8B (1 decimal), US$ 714M, 13.7%, 60+. Sub-notes in `lime.bright` mono.
- Reduced motion: final values immediately.

### 4.4 BenchmarkScale (Chapter 03)
- Horizontal 0 to 100 bar split into three bands: 0 to 60 `red`, 60 to 77 `amber`, 77 to 100 `plum`.
- Two markers: the result at 40 (solid ink tick with "40" label) and the Scorecard target at 80 (distinct marker, labeled "Target 80").
- The large "40" headline counts up beside or above the scale.
- Entrance: bands wipe in left to right, then the 40 marker drops in, then the 80 target marker, so the gap reads as a sequence.
- This is the chart that must make "half the target" obvious. Consider a faint connecting span between 40 and 80 labeled with the gap.

### 4.5 DistributionBars (Chapter 03)
- Four rows: highly engaged 25 (`teal`), moderately 15 (`teal.2`), passive 40 (`amber`), actively disengaged 20 (`red`).
- Horizontal bars fill from left, staggered. Caption reinforces "60% passive or disengaged, 1 in 4 highly engaged."

### 4.6 SayStayStrive (Chapter 03)
- Six rows grouped by category chip (SAY plum, STAY teal, STRIVE lime-dark `#5a8a14`).
- Each row: question text, a favorable bar (`plum` fill on `paper.2` track) animating to its value, the mono favorable number, and the gap in `red` right-aligned.
- Order rows by favorable descending to show the slide from Say to Stay/Strive.
- Entrance: bars fill staggered top to bottom.

### 4.7 ParadoxColumns (Chapter 03, emotional peak of the diagnosis)
- Two columns side by side. Left "strong, the immediate team" with a `teal` left border; right "weak, the institution" with a `red` left border.
- Each column holds four `MetricBar`s with the values from the global data layer.
- Choreography: reveal the strong column first and let it fill to high values (teal, near full), hold a beat, then reveal the weak column filling to low values (red). The visual drop between the two columns is the point. Then the bridge line fades in below.
- Reduced motion: both columns render filled, bridge line visible, no sequencing.

### 4.8 DivergingBars (Chapter 03, optional advanced)
- 12 dimension rows. A center vertical axis. In "favorable %" mode, bars grow right from the left edge, colored by threshold (under 50 `red`, 50 to 65 a muted plum, over 65 `plum`). In "gap" modes, bars diverge from the center axis: negative left in `red`, positive right in `teal`, scaled against a max gap of 34. Null values render a muted dash.
- A toggle group (`Toggle` primitive) switches modes: Favorable % / Gap vs Company / Gap vs LATAM. Transition bars between modes with a `base` tween (interpolate position and width).
- Keep this optional. Include it only if Chapter 03 still breathes; it adds analytical credibility but is dense.

### 4.9 QuoteCards (Chapter 03)
- Responsive grid of four cards, large lime quotation glyph, italic body, mono source tag.
- Entrance: staggered reveal. Subtle parallax on the glyph is acceptable but optional.

### 4.10 CaveatPanel (Chapter 03)
- Dashed `line-strong` border, faint plum tint background, an asterisk mark in `red`.
- Four list items with a `red` minus marker, then a divider and the corroboration note with a `teal` "However:" lead-in.
- Calm reveal, no flashy motion. This block signals rigor; let it feel sober.

### 4.11 TensionPanel (Chapter 03)
- Inverted top (`plum.deep`, white text) with the large leadership quote, the highlighted phrase in `lime.bright`, and the context paragraph at 0.8 white.
- Paper bottom with a `red` mono "point of attention" label and the caution paragraph.
- Entrance: top reveals first, bottom slides up after a short beat.

### 4.12 TheoryCards (Chapter 04)
- Six cards (or staged scenes), each with a `plum` top border, class eyebrow in `teal`, display title, body, and framework chips.
- Entrance: staggered reveal in reading order 4.1 to 4.6. Consider a horizontal pinned scroll or a stepped vertical sequence so each lens gets a beat. If pinned-horizontal, ensure reduced motion falls back to a normal vertical stack.

### 4.13 TargetMeter (Chapter 05)
- A horizontal track showing current value, a milestone marker, and the target. Example: Strive at 30 now, arrow toward 50 at 12 months. The engagement headline meter shows 40 now, 60 milestone, 80 target.
- The "from" fills in `red`/`amber`, the projected gain to target renders as a `teal` dashed or ghosted extension, so present and goal are both legible.
- Entrance: current value fills, then the projected extension animates toward the target.
- Reduced motion: render both segments statically.

### 4.14 DebateCards (Chapter 06)
- Native `<details>`/`<summary>`. Collapsed: number chip, theme label (mono, teal), the question (display). Expanding reveals Lens A (`teal` label) and Lens B (`red` label) and a dashed-top data footnote.
- Open/close animates height and opacity over `quick` with `brand`. Chevron rotates 90 degrees. Open card gains a `plum` border and the `card` shadow.

---

## 5. Per-chapter motion summary

- **00 Hero:** shader field drifts; headline numbers settle; scroll cue pulses; on scroll-out the field disperses (uScroll).
- **01 Introduction:** quiet SectionHead reveal; the four framework names underline-animate to foreshadow Chapter 04.
- **02 Organization:** RingNest staggers inward to the 41 core; Timeline line draws; StatCards count up.
- **03 Problem:** scene cross-fades to a darker register; BenchmarkScale sequences 40 then 80; ParadoxColumns runs the strong-then-weak drop as the emotional peak; SayStayStrive and dimension bars fill; CaveatPanel stays sober; TensionPanel reveals top then bottom.
- **04 Analysis:** six lenses reveal in order, ideally with a stepped or pinned cadence so each gets attention.
- **05 Solution:** five fronts reveal as a sequence; TargetMeters animate present-to-goal; optional rollout timeline draws.
- **06 Discussion:** debate cards invite interaction; expanding is the primary motion.
- **Close:** assets and urgency pills reveal; a final calm settle. Optional faint reuse of the hero shader to bookend the dilution-to-recovery arc.

---

## 6. Reduced-motion and performance checklist (run before done)

- Toggle OS reduced motion: smoothing off, shaders frozen, count-ups final, scrubbed sequences become instant in-view reveals, all content fully readable.
- 60fps check on scroll through every chapter in Chrome on Windows (DevTools performance, no long frames).
- Single WebGL context confirmed; canvas pauses offscreen; DPR capped at 2.
- No layout-property animation in scroll-linked work; bars use transform where possible.
- Lighthouse desktop: Performance 90+, Accessibility 95+.
