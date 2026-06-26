import { SectionShell, SectionHead, Panel, DividerLabel, Reveal } from '@/components/primitives'
import {
  BenchmarkScale,
  DistributionBars,
  CaveatPanel,
  SayStayStrive,
  ParadoxColumns,
  DivergingBars,
} from '@/components/data'
import { QuoteCarousel } from '@/components/data/QuoteCarousel'
import { problem } from '@/content/copy'

/**
 * Chapter 03 · The Central Problem (tone: invert) — a cohesive DARK diagnosis.
 *
 * The diagnosis is a single dark scene (plum.deep). Every chart sits on the same
 * dark glass surface (Panel tone="invert" = .glass-dark, white text), with the
 * same corner radius, the same inner padding (p-4), and the same reading column
 * (max-w-content) so the stacked charts align and the data glows instead of
 * clashing. Major blocks are separated by an inverted DividerLabel; prose reads
 * white (statement at full strength, supporting passages at opacity-80).
 *
 * Order (03-CONTENT Ch.03, art-direction layout):
 *   1. problem.statement                 — the central problem, in prose
 *   2. BenchmarkScale                     — engagement 40 vs the 80 target (hero)
 *   3. DistributionBars                   — the engagement mix (own caption)
 *   4. problem.changeMgmtBody             — the change-management reading
 *   5. SayStayStrive                      — Say/Stay/Strive item rows (own caption)
 *   6. problem.paradoxBody + ParadoxColumns — the micro/macro paradox, the peak
 *   7. DivergingBars                      — the 12-dimension analytical view
 *   8. CaveatPanel (intro = methodologyBody) — methodological honesty, sober
 *
 * The leadership-tension section has been removed. The employee verbatims read
 * as poster-style pull-quotes woven into the field (QuoteCarousel, the shared
 * peeking carousel) so the scene stays one cohesive dark register; CaveatPanel
 * renders its own dark surface and is placed directly.
 */
export default function Problem() {
  return (
    <SectionShell id="problem" tone="invert" labelledBy="problem-head">
      {/* One reading column so prose and every chart card align. */}
      <div className="mx-auto flex max-w-content flex-col gap-8">
        {/* Chapter header — inverted register. */}
        <SectionHead
          id="problem-head"
          num="03"
          eyebrow={problem.eyebrow}
          title={problem.headline}
          tone="invert"
        />

        {/* (1) The central problem, stated — full-strength white lead. */}
        <Reveal>
          <p className="t-lead text-white">{problem.statement}</p>
        </Reveal>

        {/* (2) BenchmarkScale — the hero stat: "half the target". */}
        <DividerLabel tone="invert">O número contra a meta</DividerLabel>
        <Reveal>
          <Panel tone="invert" pad="lg">
            <BenchmarkScale />
          </Panel>
        </Reveal>

        {/* (3) DistributionBars — the engagement mix (renders its own caption). */}
        <DividerLabel tone="invert">Como o time se divide</DividerLabel>
        <Reveal>
          <Panel tone="invert" pad="lg">
            <DistributionBars />
          </Panel>
        </Reveal>

        {/* (4) The change-management reading — the axis of failure. */}
        <DividerLabel tone="invert">O eixo da falha</DividerLabel>
        <Reveal>
          <p className="t-body text-white opacity-80">{problem.changeMgmtBody}</p>
        </Reveal>

        {/* (5) Say / Stay / Strive item rows (renders its own caption). */}
        <Reveal>
          <Panel tone="invert" pad="lg">
            <SayStayStrive />
          </Panel>
        </Reveal>

        {/* (6) The paradox — the emotional peak. Body prose, then the columns. */}
        <DividerLabel tone="invert">O paradoxo</DividerLabel>
        <Reveal>
          <p className="t-body text-white opacity-80">{problem.paradoxBody}</p>
        </Reveal>
        <Reveal>
          <Panel tone="invert" pad="lg">
            <ParadoxColumns />
          </Panel>
        </Reveal>

        {/* (7) DivergingBars — the 12-dimension chart (renders its own caption). */}
        <DividerLabel tone="invert">Dimensão a dimensão</DividerLabel>
        <Reveal>
          <Panel tone="invert" pad="lg">
            <DivergingBars />
          </Panel>
        </Reveal>

        {/* (8) The human voice — employee verbatims as poster-style pull-quotes
            woven into the dark scene (shared peeking carousel). */}
        <DividerLabel tone="invert">Nas palavras deles</DividerLabel>
        <QuoteCarousel />

        {/* (9) Methodological honesty — one clean dark panel, intro + caveats. */}
        <DividerLabel tone="invert">Leia com honestidade</DividerLabel>
        <CaveatPanel intro={problem.methodologyBody} />
      </div>
    </SectionShell>
  )
}
