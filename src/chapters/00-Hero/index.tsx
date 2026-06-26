import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

import { SectionShell, Eyebrow, Reveal, RevealGroup, RevealItem } from '@/components/primitives'
import { hero } from '@/content/copy'
import { heroKpis } from '@/content/case'
import { useCountUp } from '@/lib/useCountUp'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { formatInt } from '@/lib/format'
import { easeBezier, duration } from '@/lib/motion'
import eucalyptus from '@/assets/flora/eucalyptus.png'

/**
 * Chapter 00 · Opening (Hero).
 *
 * A full-viewport scene built around the TELUS Digital "Digital Flora": the
 * Eucalyptus plant (the generic brand plant) sits on the right, bleeding off the
 * edge, with the one-line thesis on the left. The "140 mil" in the headline
 * settles with a subtle count-up; a KPI strip and a pulsing scroll cue anchor
 * the bottom.
 */

/** Split token inside hero.headline that gets the count-up treatment. The
 * pt-BR headline reads "140 mil"; the counter ticks to 140 and the " mil" word
 * is kept as a suffix so the count-up stays legible. */
const COUNT_TOKEN = '140 mil'
const COUNT_TARGET = 140
const COUNT_SUFFIX = ' mil'

/** The headline with the headcount number replaced by a settling counter. */
function Headline({ id }: { id: string }): JSX.Element {
  const { ref, inView } = useMountedInView()
  const value = useCountUp(COUNT_TARGET, inView, { durationMs: duration.count * 1000 })

  // Split into the two sentences so "E a identidade…" starts on its own line
  // below the count-up. The count token lives in the first sentence.
  const period = hero.headline.indexOf('. ')
  const first = period >= 0 ? hero.headline.slice(0, period + 1) : hero.headline
  const second = period >= 0 ? hero.headline.slice(period + 2) : ''
  const [before, after] = first.split(COUNT_TOKEN)

  return (
    <h1 id={id} ref={ref} className="t-hero max-w-content text-plum-ink">
      <span className="block">
        {before}
        <span className="tabular-nums text-plum" aria-label={COUNT_TOKEN}>
          <span aria-hidden>
            {formatInt(value)}
            {COUNT_SUFFIX}
          </span>
        </span>
        {after}
      </span>
      {second && <span className="block">{second}</span>}
    </h1>
  )
}

/** True once mounted, so the count-up runs immediately at the top of the page. */
function useMountedInView(): { ref: React.RefObject<HTMLHeadingElement>; inView: boolean } {
  const ref = useRef<HTMLHeadingElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    setInView(true)
  }, [])
  return { ref, inView }
}

/** A single "LABEL value" mono pair in the bottom KPI strip. */
function KpiItem({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <span className="inline-flex items-baseline gap-1">
      <span className="t-mono-label text-muted">{label}</span>
      <span className="t-mono-value text-plum-ink">{value}</span>
    </span>
  )
}

/** A faint middot separating KPI pairs. */
function Dot(): JSX.Element {
  return (
    <span aria-hidden className="t-mono-value text-muted opacity-40">
      ·
    </span>
  )
}

/** The bottom scroll cue: a mono label and a gently pulsing chevron. */
function ScrollCue(): JSX.Element {
  const reduced = useReducedMotion()
  return (
    <div className="flex flex-col items-center gap-1 text-plum-ink">
      <span className="t-mono-label text-muted">Role</span>
      <motion.span
        aria-hidden
        className="block size-2 border-b border-r border-strong"
        style={{ rotate: 45 }}
        initial={false}
        animate={reduced ? undefined : { y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.8,
          ease: easeBezier.brand,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
    </div>
  )
}

export default function Hero(): JSX.Element {
  // Digital Flora: the Eucalyptus plant as a FIXED background on the right, so it
  // stays put while the content scrolls over it. The opaque sections that follow
  // scroll up and cover it, so it reads only behind the hero. Shown from lg up.
  const backdrop = (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 right-0 z-0 hidden w-1/2 lg:block xl:w-2/5"
    >
      <img
        src={eucalyptus}
        alt=""
        className="size-full object-cover object-left"
      />
    </div>
  )

  return (
    <SectionShell id="hero" tone="shader" labelledBy="hero-head" backdrop={backdrop}>
      <div className="relative z-10 flex flex-col gap-5">
        {/* Thesis: eyebrow, headline, lead — at the regular content width, with
            the plant living behind as a fixed background. */}
        <RevealGroup amount={0.07} className="flex max-w-content flex-col gap-2">
          <RevealItem>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </RevealItem>
          <RevealItem>
            <Headline id="hero-head" />
          </RevealItem>
          <RevealItem>
            <p className="t-lead max-w-content text-plum-ink opacity-80">{hero.lead}</p>
          </RevealItem>
        </RevealGroup>

        {/* Headline numbers as a mono KPI strip, near the bottom of the scene. */}
        <Reveal delay={0.2}>
          <div className="flex max-w-content flex-wrap items-baseline gap-2 border-t border-line pt-2">
            {heroKpis.map((kpi, i) => (
              <span key={kpi.label} className="inline-flex items-baseline gap-2">
                {i > 0 && <Dot />}
                <KpiItem label={kpi.label} value={kpi.value} />
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Scroll cue pinned to the bottom-center of the scene. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center">
        <ScrollCue />
      </div>
    </SectionShell>
  )
}
