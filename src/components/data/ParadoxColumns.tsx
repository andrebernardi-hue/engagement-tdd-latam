import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { useInViewOnce } from '@/lib/useInViewOnce'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { duration, easeBezier, stagger, revealTransition, REVEAL_RISE } from '@/lib/motion'
import { type Tone } from '@/components/viz'
import { MetricBar } from '@/components/data/MetricBar'
import { paradox, type MetricItem } from '@/content/case'
import { problem } from '@/content/copy'

/**
 * ParadoxColumns (04 §4.7) — the emotional peak of the diagnosis, on the
 * inverted scene.
 *
 * Two columns side by side: the immediate team is strong (teal, bars near full)
 * and the institution is weak (red, bars low). The choreography is the point:
 * the strong column reveals and fills first, holds a beat, then the weak column
 * reveals and drops — making the gap between micro trust and macro distrust
 * physical. The bridge line fades in below to name what the drop means.
 *
 * DARK ART DIRECTION: titles and the bridge read white; the left accent edges
 * glow (teal2 / red.soft) instead of going dark; the MetricBars use onDark, so
 * the fills are the strong/negative hues over a translucent track with light
 * labels and AA-on-plum readouts (teal2 / red.soft). The strong-then-weak reveal
 * sequence is preserved.
 *
 * Reduced motion: both columns render filled and the bridge is visible, with no
 * sequencing.
 */

/** Beat between the strong column settling and the weak column starting (ms). */
const COLUMN_BEAT_MS = 450

type ParadoxSide = (typeof paradox)['strong']

function ParadoxColumn({
  side,
  tone,
  valueTone,
  active,
}: {
  side: ParadoxSide
  tone: Tone
  valueTone: Tone
  active: boolean
}) {
  const accent = tone === 'teal' ? 'border-teal-2' : 'border-red-soft'
  return (
    <div className={cn('flex flex-col gap-2.5 border-l-2 pl-3', accent)}>
      <h4 className="t-h3 text-white">{side.title}</h4>
      <div className="flex flex-col gap-2.5">
        {side.items.map((item: MetricItem, i) => (
          <MetricBar
            key={item.label}
            label={item.label}
            value={item.value}
            tone={tone}
            valueTone={valueTone}
            onDark
            worst={item.worst}
            active={active}
            delay={i * stagger.loose}
          />
        ))}
      </div>
    </div>
  )
}

export function ParadoxColumns({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion()
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.28)

  // Gate the weak column behind a beat so the drop reads after the strong
  // column has settled. Under reduced motion there is no sequencing.
  const [weakActive, setWeakActive] = useState(false)

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) {
      setWeakActive(true)
      return
    }
    const id = window.setTimeout(() => setWeakActive(true), COLUMN_BEAT_MS)
    return () => window.clearTimeout(id)
  }, [inView, reducedMotion])

  // The bridge appears after both columns have had their beat. With motion, a
  // small delay past the weak column's start lets the drop land first.
  const bridgeDelay = reducedMotion ? 0 : COLUMN_BEAT_MS / 1000 + duration.slow * 0.5

  return (
    <div ref={ref} className={cn('flex flex-col gap-5', className)}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: REVEAL_RISE }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={revealTransition}
        >
          <ParadoxColumn
            side={paradox.strong}
            tone="teal"
            valueTone="teal2"
            active={inView}
          />
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: REVEAL_RISE }}
          animate={weakActive ? { opacity: 1, y: 0 } : undefined}
          transition={revealTransition}
        >
          <ParadoxColumn
            side={paradox.weak}
            tone="red"
            valueTone="redSoft"
            active={weakActive}
          />
        </motion.div>
      </div>

      <motion.p
        className="t-lead text-white"
        initial={reducedMotion ? false : { opacity: 0, y: REVEAL_RISE }}
        animate={weakActive ? { opacity: 1, y: 0 } : undefined}
        transition={{ ...revealTransition, ease: easeBezier.brand, delay: bridgeDelay }}
      >
        {problem.paradoxBridge}
      </motion.p>
    </div>
  )
}
