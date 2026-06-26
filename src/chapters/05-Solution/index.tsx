import { useMemo } from 'react'
import {
  SectionShell,
  SectionHead,
  Panel,
  PosterCard,
  DividerLabel,
  Reveal,
  RevealGroup,
  RevealItem,
} from '@/components/primitives'
import { TargetMeter } from '@/components/data'
import { solution, solutionFronts, rolloutPhases } from '@/content/copy'
import { solutionTargets, type SolutionTarget } from '@/content/case'
import { CHAPTERS } from '@/content/chapters'

/**
 * Chapter 05 · Proposed Solution (tone 'paper').
 *
 * A Human-Capital Sustainment Plan on five fronts. Each front is a Panel with
 * its id + title, body, and the matching TargetMeter (joined by frontId). The
 * first four fronts sit in a two-column grid; front 5.5 (the consolidating
 * engagement-recovery front) spans full width with a plum accent because it
 * rolls every other target into the overall-engagement meter. A compact stepped
 * rollout strip (Now -> Next weeks -> Early January -> 2026) follows, then the
 * closing paragraph in the full measure.
 */

const chapter = CHAPTERS.find((c) => c.id === 'solution')!

export default function Solution() {
  // Join the prose fronts (copy) to their numeric targets (case) by frontId.
  const targetByFront = useMemo(() => {
    const map = new Map<string, SolutionTarget>()
    for (const t of solutionTargets) map.set(t.frontId, t)
    return map
  }, [])

  return (
    <SectionShell id={chapter.id} tone="paper" labelledBy="solution-head">
      <div className="flex flex-col gap-8">
        <SectionHead
          id="solution-head"
          num={chapter.num}
          eyebrow={solution.eyebrow}
          title={solution.headline}
          lead={solution.intro}
          tone="paper"
        />

        {/* The five fronts, each a full-width poster card: a big index numeral,
            the front id as eyebrow, the title on the left, the body on the right,
            and its TargetMeter in the foot. */}
        <div className="flex flex-col gap-4">
          <Reveal>
            <DividerLabel>Cinco frentes</DividerLabel>
          </Reveal>

          <RevealGroup amount={0.1} className="flex flex-col gap-4">
            {solutionFronts.map((front, i) => {
              const target = targetByFront.get(front.id)
              return (
                <RevealItem key={front.id}>
                  <PosterCard
                    numeral={String(i + 1).padStart(2, '0')}
                    eyebrow={`Frente ${front.id}`}
                    title={front.title}
                    body={front.body}
                    footer={target ? <TargetMeter target={target} /> : undefined}
                  />
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>

        {/* Rollout phasing: a stepped strip across the four moments. */}
        <div className="flex flex-col gap-3">
          <Reveal>
            <DividerLabel>Implementação</DividerLabel>
          </Reveal>

          <RevealGroup
            amount={0.12}
            className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4"
          >
            {rolloutPhases.map((phase, i) => (
              <RevealItem key={phase.when} className="h-full">
                <Panel tone="inset" className="flex h-full flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="t-mono-label text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="t-mono-value text-plum">{phase.when}</span>
                  </div>
                  <p className="t-body text-plum-ink">{phase.text}</p>
                </Panel>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Closing: the strong final paragraph in the full measure. */}
        <Reveal>
          <p className="t-lead max-w-content text-plum-ink">{solution.closing}</p>
        </Reveal>
      </div>
    </SectionShell>
  )
}
