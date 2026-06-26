import { MetricBar } from '@/components/data/MetricBar'
import { Reveal, RevealGroup, RevealItem } from '@/components/primitives'
import { useInViewOnce } from '@/lib/useInViewOnce'
import { stagger } from '@/lib/motion'
import { distribution, type DistributionSlice } from '@/content/case'
import { problem } from '@/content/copy'
import { type Tone } from '@/components/viz'

/**
 * DistributionBars (04 §4.5, Chapter 03). The 2025 engagement mix as four
 * horizontal bars on the inverted diagnosis scene. Bars fill from the left,
 * staggered top to bottom, once the block is ~28% in view. The caption below
 * reinforces the read — 60% passive or disengaged, 1 in 4 highly engaged.
 *
 * DARK ART DIRECTION: every row reads light-on-plum via MetricBar's onDark mode
 * (translucent track, white label). The data tone drives a harmonized fill, and
 * the readout uses an AA-on-plum tone (positive teal2, warning amber, negative
 * red.soft) so the numbers stay legible. Built on the shared MetricBar /
 * AnimatedBar engine; no second bar here.
 */

/** Data tone -> { fill on dark, readout tone on dark } (AA on plum.deep). */
const DARK_TONE: Record<DistributionSlice['tone'], { fill: Tone; value: Tone }> = {
  teal: { fill: 'teal2', value: 'teal2' },
  teal2: { fill: 'teal', value: 'teal2' },
  amber: { fill: 'amber', value: 'amber' },
  red: { fill: 'red', value: 'redSoft' },
}

export function DistributionBars() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.28)

  return (
    <div ref={ref}>
      <RevealGroup className="flex flex-col gap-2.5" amount={stagger.loose}>
        {distribution.map((slice, i) => {
          const dark = DARK_TONE[slice.tone]
          return (
            <RevealItem key={slice.label}>
              <MetricBar
                label={slice.label}
                value={slice.value}
                tone={dark.fill}
                valueTone={dark.value}
                onDark
                active={inView}
                delay={i * stagger.loose}
              />
            </RevealItem>
          )
        })}
      </RevealGroup>

      <Reveal delay={distribution.length * stagger.loose}>
        <p className="t-body mt-3 text-white opacity-70">{problem.distributionCaption}</p>
      </Reveal>
    </div>
  )
}
