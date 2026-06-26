import { motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { duration, easeBezier, REVEAL_RISE } from '@/lib/motion'
import { useInViewOnce } from '@/lib/useInViewOnce'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { acquisitionTimeline } from '@/content/case'

/**
 * Acquisition timeline (04 §4.2, 02 §7.2). A vertical line with three dots
 * (2021 / 2022 / 2025); each row shows year (mono, plum), title (h3), and a
 * one-line muted description to the right of its dot.
 *
 * Entrance (once at ~28% in view): the connecting line draws top -> bottom via
 * `scaleY` 0 -> 1 from origin top over `slow`. Dots pop in (scale 0 -> 1)
 * staggered to match the moment the drawing line reaches each row, and the text
 * beside each row reveals on the same cadence. The 2025 dot is emphasized
 * (larger, filled lime) as "the year with the most change"; others fill plum.
 *
 * Reduced motion: the line, dots, and text render in their final state with no
 * sequencing (Framer drops the transform tweens, and we skip the timed delays).
 */
export function Timeline({ className }: { className?: string }) {
  const { ref, inView } = useInViewOnce<HTMLOListElement>(0.28)
  const reduced = useReducedMotion()
  const active = inView || reduced

  const count = acquisitionTimeline.length

  return (
    <ol ref={ref} className={cn('relative flex flex-col gap-5', className)}>
      {/* Vertical rail track + the line that draws top -> bottom. */}
      <span
        aria-hidden
        className="bg-line pointer-events-none absolute inset-y-1.5 left-1.5 w-px -translate-x-1/2"
      >
        <motion.span
          className="absolute inset-0 block w-full origin-top bg-plum"
          initial={{ scaleY: 0 }}
          animate={active ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: duration.slow, ease: easeBezier.brand }}
        />
      </span>

      {acquisitionTimeline.map((event, i) => {
        // Stagger each dot/text to land as the drawing line passes its row.
        const progress = count > 1 ? i / (count - 1) : 0
        const delay = reduced ? 0 : duration.slow * progress
        const emphasized = event.emphasis === true

        return (
          <li key={event.year} className="relative flex gap-2.5">
            {/* Dot, sized to overlay the rail; pops in as the line arrives. */}
            <span className="relative flex w-3 shrink-0 justify-center pt-0.5">
              <motion.span
                aria-hidden
                className={cn(
                  'block rounded-pill ring-1 ring-paper-card',
                  emphasized ? 'size-2 bg-lime' : 'size-1.5 bg-plum',
                )}
                initial={{ scale: 0 }}
                animate={active ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: duration.quick, ease: easeBezier.expoOut, delay }}
              />
            </span>

            {/* Text block, revealed beside the dot on the same cadence. */}
            <motion.div
              className="flex min-w-0 flex-col gap-0.5 pb-1"
              initial={{ opacity: 0, y: REVEAL_RISE }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: REVEAL_RISE }}
              transition={{ duration: duration.base, ease: easeBezier.brand, delay }}
            >
              <span className="t-mono-value text-plum">{event.year}</span>
              <h3 className="t-h3 text-plum-ink">{event.title}</h3>
              <p className="t-body text-muted">{event.description}</p>
            </motion.div>
          </li>
        )
      })}
    </ol>
  )
}
