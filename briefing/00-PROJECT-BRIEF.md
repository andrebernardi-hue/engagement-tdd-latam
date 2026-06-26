# 00 · Project Brief: TELUS Design LATAM Engagement Case (Interactive Presentation)

> This is the north star. Read it first and return to it whenever a decision feels ambiguous. Every other brief in this folder serves the intent described here. If a later document ever contradicts this one, this one wins, except on matters of source-of-truth content, where the rule in section 6 applies.

---

## 1. What we are building

A single-page web application that presents an academic case study as an interactive, scroll-driven narrative. It is a graduate-level Strategic People Management (Gestão Estratégica de Pessoas) assignment about an engagement crisis inside the Design LATAM operation of TELUS Digital, the operation that began as the Poatek software boutique.

The app replaces a slide deck. It is the artifact the author presents live to a class and a professor. It must read as a rigorous diagnosis and intervention plan, and it must feel like a top-tier interactive site (FWA / Awwwards caliber): real motion design, shader-grade visuals, rich data visualization, and a layout that uses the entire viewport.

The build will be executed in Claude Code with the `ux-ui-pro-max` skill installed. These briefs are the input to that build.

---

## 2. Why it exists (do not lose this)

The assignment brief (the course `enunciado`) requires a field-research diagnosis of one organization across its people-management structure and processes, culminating in a recommendation that can go as far as proposing organizational change. The required report structure is fixed:

1. Introduction
2. Organization description (sector, headcount, revenue)
3. Central problem identification (problem description + the data and facts around it)
4. Analysis of the central problem through theoretical frameworks
5. Proposed solution to the central problem

The live presentation format is also fixed: no `.ppt` slides allowed, roughly 10 minutes of company + diagnosis + central problem, 5 minutes of group discussion, 10 minutes of plenary. The written report has a hard limit of 8 pages, Arial 12, 1.5 line spacing, and already exists as the authoritative `Caso TELUS - GEP v3 (revisado).docx`.

The app is the presentation layer for that report. The reason it must be excellent is twofold: it is graded under academic rigor, and it doubles as a proof artifact of the author's design and systems-thinking craft. The narrative cannot drift from the report, and the theory cannot be sloppy. Visual ambition never overrides factual fidelity.

---

## 3. Audience and tone

Primary audience: a graduate Strategic People Management class and the professor grading it. Secondary audience: the author's professional peers who may see this as a portfolio-grade piece.

Voice: the content is written in the author's voice (see `03-CONTENT.md`, which already carries the calibrated copy). The register is direct, structured, and precise. Claims are grounded in a model, a metric, or a named source. No decorative language, no hedging, no em-dashes, and no "not X, but Y" antithesis constructions. State what things are. The tone is warm and energetic in delivery, analytical in structure.

All UI strings, code, comments, and copy ship in English (US). The underlying case is Brazilian and multilingual, but this build is English-only.

---

## 4. The narrative arc (chapter map)

The app follows the assignment's required structure as its primary spine, plus an opening and a discussion chapter that support the live session. Each chapter is one anchored destination.

- **00 · Opening (Hero).** The one-line thesis and the headline numbers. A boutique of about 100 people became a 41-person cell inside a global body of more than 140,000, and the 2025 engagement reading shows the cost of that dilution.
- **01 · Introduction.** What Strategic People Management is here, the scope (Design LATAM, not Brazil alone), and the claim the rest of the app will defend.
- **02 · The Organization.** Sector, headcount nesting (140k to 41), the acquisition timeline (2021 to 2025), and the financial health that proves the problem is about people.
- **03 · The Central Problem.** Engagement at 40 against a Scorecard target of 80, the methodological honesty note, the Say/Stay/Strive reading, the micro-strong / macro-weak paradox, the dimension-level data, employee verbatims, and the leadership-message tension.
- **04 · Analysis Through Frameworks.** Six theoretical lenses, each tied to a specific class: Careers, Performance Evaluation, Training & Development, Attraction & Selection, Organizational Culture, and Competencies.
- **05 · Proposed Solution.** Five intervention fronts, each with proposed, calibratable targets tied to Pulsecheck indicators, plus the phased rollout.
- **06 · Discussion.** Four debate questions, each with two opposing lenses, to drive the live group discussion and plenary.
- **Close.** Assets to protect, the number-one urgency, and the source note.

The right-side step rail walks the viewer through these chapters one at a time. The top pillar nav anchors the high-level story and lets the viewer jump.

---

## 5. Non-negotiable product requirements

- **Web only, Chrome on Windows, desktop-first.** Optimize for a large desktop viewport in Chrome on Windows. Graceful behavior at smaller widths is welcome but not the priority. No native or mobile-app concerns.
- **Full viewport.** Sections own the whole screen. The layout is built around 100vw / 100vh scenes, not a centered text column. See `02-DESIGN-SYSTEM.md` for the shell.
- **Excellent performance.** Target a steady 60fps on scroll and interaction on a mid-range Windows laptop. Shaders and heavy visuals must be GPU-friendly, lazy-loaded, and degrade under `prefers-reduced-motion`. Performance budget lives in `01-TECH-SETUP.md`.
- **Motion graphics done well.** Motion is choreography, not decoration. Every animation earns its place by guiding attention or revealing structure. Reference quality: FWA / Awwwards, with shaders and scroll-linked motion.
- **Rich data visualization.** The case is data-heavy. The dataviz is a first-class citizen, specified in `04-MOTION-DATAVIZ.md`.
- **Top storytelling pillars with anchors.** A persistent top navigation exposes the narrative pillars and anchors to each chapter.
- **Right-side step slider.** A vertical stepper on the right edge tracks progress chapter by chapter and lets the viewer move step by step.
- **Global styles, well calibrated, no one-offs.** Everything is driven by design tokens and shared components. Arbitrary, inline, one-off styling is prohibited. This is a governance rule, enforced as described in `02-DESIGN-SYSTEM.md`.

---

## 6. Source of truth and content fidelity (critical)

Three sources exist. They rank in this order:

1. **`Caso TELUS - GEP v3 (revisado).docx`** is the authoritative content and theory. Where anything conflicts, v3 wins.
2. **`case-engajamento-telus-design_v4.html`** is the content base for structure, data, copy fragments, palette, and component ideas. Reuse its data and its visual DNA, but correct it to match v3.
3. **`Contexto do Caso TELUS (dados corrigidos).md`** and **`Referencias academicas - Caso TELUS.md`** are supporting context and the citation backbone.

The HTML predates the v3 corrections. The following reconciliations are mandatory. Apply v3 everywhere:

- **Scope.** It is the **Design LATAM operation**, not "the Brazilian operation." Four offices, three countries: Porto Alegre and São Paulo (Brazil), Buenos Aires (Argentina), and Guatemala City. Buenos Aires and Guatemala City joined in 2025. Regional heterogeneity stays visible.
- **The 80 target is real.** Engagement of 40 is read against the official **2025 Scorecard target of 80**, so the result is half the formal target. Do not present 80 as an invented benchmark ceiling. The benchmark bands (lower 0 to 60, moderate 60 to 77, top 77 to 100) are a separate, additional reference.
- **Methodological honesty stays in.** Small sample (20 of 41), a 2024-to-2025 methodology change that blocks clean historical comparison, and exclusions. Then the corroboration: a follow-up workshop with all 41 members validated that the sentiment was shared by the large majority. Triangulation of survey plus listening is the point.
- **Careers (Aula 7).** Use **Protean Career (Hall)** and **Psychological Contract (Schein)**, and you may cite **Dutra** on career preferences. **Do not attribute "career anchor" to the classes.** The HTML theory card that says "âncora de carreira" and "Y/W" is outdated. The career ladder in place is referred to as **Y** (already implemented); the real gap is capability for scale.
- **Performance (Aula 6).** Anchor in **Sustainable Performance (the what plus the how)**, the **9-box Performance x Potential matrix**, and **Learning Agility (Lombardo & Eichinger, 2000)**.
- **Training & Development (Aula 5).** Anchor "we did not measure impact" in **Kirkpatrick (1975, four levels)** and **Phillips ROI**. Keep **Andragogy (Knowles, 1975; Kolb, 1984)** and **Mentoring**.
- **Attraction & Selection (Aula 3).** The class concept is **Company Attractants (Richard L. Daft)**. EVP and Employer Branding are market vocabulary that should be tied explicitly to Daft's "attractants." You may cite **Windolf (1986)** recruitment-strategy typology.
- **Culture (Aula 2).** **Schein's three levels (artifacts, espoused values, basic assumptions), read through Fleury.**
- **Competencies (Aula 2).** **Prahalad & Hamel core competences** at the organizational level (the Poatek distinctive competences were digital-product excellence and consultative client intimacy), and **Fleury / Zarifian** at the individual level. The competency-and-leveling framework is currently being built, which is itself part of the problem.
- **Say/Stay/Strive is the survey's model**, associated with Aon Hewitt / Kincentric. It is not a course framework. **Psychological safety is Edmondson**, not a course framework. **Change management has no formal framework in the course**, so framing it as the critical failure is a reading of the case, supported by Wood Jr (1995) and the GE case from Aula 6. Label these as what they are.

When in doubt about a number or a claim, open the v3 docx and match it exactly. The numbers in `03-CONTENT.md` were transcribed from v3 and the HTML data layer; treat that file as the consolidated, corrected data source for the build.

---

## 7. Success criteria

The build is successful when:

- A viewer can move through all chapters via the right step rail and the top pillars, and every chapter fills the viewport with a coherent scene.
- Every required assignment section (Introduction, Organization, Central Problem with data, Analysis through frameworks, Proposed Solution) is present and unmistakable.
- Every number and every framework attribution matches v3. No "career anchor," correct Daft framing, correct 80 target, correct LATAM scope.
- Motion runs at 60fps in Chrome on Windows, degrades cleanly under reduced motion, and never blocks reading.
- Styling is fully tokenized. A reviewer can change one token and see it propagate. There are no one-off color or spacing values in components.
- The copy reads in the author's voice: direct, sourced, no em-dashes, no antithesis framing.

---

## 8. Document index

- **`00-PROJECT-BRIEF.md`** (this file): intent, scope, narrative arc, fidelity rules, success criteria.
- **`01-TECH-SETUP.md`**: stack, scaffolding, dependencies, configuration, performance budget, file structure, commands.
- **`02-DESIGN-SYSTEM.md`**: tokens, layout shell (top pillars + right step rail + full-viewport scenes), component inventory, motion principles, accessibility, the no-one-offs rule.
- **`03-CONTENT.md`**: chapter-by-chapter copy in the author's voice, exact data, and per-chapter dataviz and theory mapping, all aligned to v3.
- **`04-MOTION-DATAVIZ.md`**: motion choreography, shader concepts, scroll interactions, and a full spec for each data visualization.

Build order recommendation: scaffold from `01`, lay down tokens and the shell from `02`, wire content as typed data from `03`, then layer motion and dataviz from `04`. Keep all case data in one typed content module so the code never drifts from v3.
