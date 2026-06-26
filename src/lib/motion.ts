/**
 * Shared motion tokens and presets (02-DESIGN-SYSTEM §6, 04-MOTION-DATAVIZ §1).
 *
 * Every duration and easing lives here. Components and timelines import these
 * constants instead of hardcoding values, so the choreography stays calibrated.
 * Framer Motion reads numeric seconds + cubic-bezier arrays; GSAP reads seconds
 * + named eases or the same bezier via CustomEase.
 */

import type { Variants, Transition } from 'motion/react'

/** Durations in seconds. */
export const duration = {
  quick: 0.2,
  base: 0.7,
  slow: 1.0,
  count: 1.4,
} as const

/** Cubic-bezier control points, shared by CSS, GSAP, and Framer. */
export const easeBezier = {
  brand: [0.2, 0.7, 0.2, 1] as const,
  expoOut: [0.16, 1, 0.3, 1] as const,
}

/** GSAP CustomEase strings (registered once in ScrollProvider). */
export const gsapEase = {
  brand: 'brand', // registered name; falls back to power2.out if unavailable
  expoOut: 'expo.out',
  linear: 'none',
} as const

/** Stagger between grouped items, in seconds (60-90ms). */
export const stagger = {
  tight: 0.06,
  base: 0.075,
  loose: 0.09,
} as const

/** The default content reveal: rise 22px + fade, base duration, brand ease. */
export const REVEAL_RISE = 22

export const revealTransition: Transition = {
  duration: duration.base,
  ease: easeBezier.brand,
}

/** Framer variants for the standard block reveal, triggered once in view. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_RISE },
  visible: { opacity: 1, y: 0, transition: revealTransition },
}

/** Container variant that staggers its children's reveals. */
export function staggerContainer(amount: number = stagger.base): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: amount } },
  }
}

/** Standard whileInView viewport config: fire once at 12% visibility. */
export const inViewOnce = { once: true, amount: 0.12 } as const

/** Charts animate once when ~28% in view (04 §4). */
export const chartInView = { once: true, amount: 0.28 } as const

/** Count-up duration, in ms, for number tickers. */
export const COUNT_MS = duration.count * 1000
