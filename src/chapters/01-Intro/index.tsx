import { motion } from 'motion/react'
import { duration, easeBezier, stagger } from '@/lib/motion'
import { useInViewOnce } from '@/lib/useInViewOnce'
import { useReducedMotion } from '@/lib/useReducedMotion'
import {
  SectionShell,
  SectionHead,
  DividerLabel,
  Reveal,
} from '@/components/primitives'
import { intro } from '@/content/copy'

/**
 * Chapter 01 · Introduction (paper tone).
 *
 * Quiet, reading-first scene. The SectionHead states the chapter thesis, then
 * the two `intro.body` paragraphs sit in a readable 1120 measure: the first as
 * a `t-lead` (the discipline claim), the second as `t-body` (scope + the route
 * through the frameworks).
 *
 * The foreshadow: the four `intro.frameworkNames` render as a row, each with a
 * teal underline that draws left -> right on reveal (a motion.span scaleX from
 * origin-left). This ties the four named lenses to the analysis chapter (04)
 * that will pay them off. Reduced motion renders the underlines drawn, with no
 * sequencing (04 §5: "the four framework names underline-animate").
 */
export default function Intro() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.28)
  const reduced = useReducedMotion()
  const active = inView || reduced

  return (
    <SectionShell id="intro" tone="paper" labelledBy="intro-head">
      <SectionHead
        id="intro-head"
        num="01"
        eyebrow={intro.eyebrow}
        title={intro.headline}
      />

      {/* The two body paragraphs, in a readable measure. */}
      <div className="mt-5 grid gap-3 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p className="t-lead max-w-content text-plum-ink">{intro.body[0]}</p>
        </Reveal>
        <Reveal className="md:col-span-5" delay={stagger.loose}>
          <p className="t-body max-w-content text-muted">{intro.body[1]}</p>
        </Reveal>
      </div>

      {/* Foreshadow of Chapter 04: the four framework lenses, each underlined. */}
      <div ref={ref} className="mt-8 flex flex-col gap-3">
        <Reveal>
          <DividerLabel>As quatro lentes · retomadas em 04</DividerLabel>
        </Reveal>

        <ul className="flex flex-col gap-2.5 md:flex-row md:flex-wrap md:items-end md:gap-6">
          {intro.frameworkNames.map((name, i) => (
            <li key={name} className="relative inline-flex flex-col">
              <motion.span
                className="t-h3 inline-block pb-1 text-plum-ink"
                initial={{ opacity: 0, y: 22 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{
                  duration: duration.base,
                  ease: easeBezier.brand,
                  delay: reduced ? 0 : i * stagger.loose,
                }}
              >
                {name}
              </motion.span>
              <motion.span
                aria-hidden
                className="block h-0.5 origin-left rounded-pill bg-teal"
                initial={{ scaleX: 0 }}
                animate={active ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                  duration: duration.slow,
                  ease: easeBezier.brand,
                  delay: reduced ? 0 : duration.quick + i * stagger.loose,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}
