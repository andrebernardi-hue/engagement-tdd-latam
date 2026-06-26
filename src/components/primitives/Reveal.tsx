import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import {
  inViewOnce,
  revealVariants,
  staggerContainer,
  REVEAL_RISE,
  revealTransition,
} from '@/lib/motion'

/**
 * The default content reveal (02 §6, 04 §1): rise 22px + fade, base duration,
 * brand easing, once at 12% in view. This is the only place that choreography
 * is defined; chapters wrap blocks in <Reveal> instead of re-authoring it.
 *
 * Framer Motion respects reduced motion automatically when the OS flag is set
 * (it drops transform/opacity tweens), so content renders in its final state.
 */
export function Reveal({
  children,
  className,
  as = 'div',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
  delay?: number
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={
        delay
          ? {
              hidden: { opacity: 0, y: REVEAL_RISE },
              visible: {
                opacity: 1,
                y: 0,
                transition: { ...revealTransition, delay },
              },
            }
          : revealVariants
      }
    >
      {children}
    </MotionTag>
  )
}

/**
 * A group whose direct <Reveal.Item> children stagger their reveals. Use for
 * lists, card grids, and KPI strips.
 */
export function RevealGroup({
  children,
  className,
  amount,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  amount?: number
  as?: 'div' | 'ul' | 'ol'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={staggerContainer(amount)}
    >
      {children}
    </MotionTag>
  )
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag className={className} variants={revealVariants}>
      {children}
    </MotionTag>
  )
}
