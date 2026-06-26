import { motion } from 'motion/react'
import { tv } from 'tailwind-variants'
import { cn } from '@/lib/cn'
import { duration, easeBezier } from '@/lib/motion'
import { toneColor, type Tone } from './colors'

/**
 * The single horizontal-bar engine (02 §7.3). An HTML track with a fill that
 * animates `scaleX` from a fixed origin (GPU-friendly, perf §5) once `active`
 * is true. MetricBar, DistributionBars, and SayStayStrive all build on this; do
 * not write a second bar implementation.
 *
 * `value` is interpreted against `max` (default 100). `originRight` flips the
 * grow direction for diverging negatives. Under reduced motion Framer renders
 * the final scale immediately.
 *
 * `onDark` re-grounds the bar for the inverted diagnosis scene (Chapter 03):
 * the track becomes a translucent-light well instead of the light paper-2 inset,
 * so it reads on a plum.deep card. The fill colour still comes from `tone`;
 * callers pass the dark-palette tones (teal2 / redSoft / amber / lime). For the
 * neutral/primary case an explicit `fillColor` (built from a token hex by the
 * caller) paints a light lavender/white fill. Track colours live in inline
 * styles, which are exempt from the no-arbitrary-value rule (02 §9).
 */
const trackTv = tv({
  base: 'relative w-full overflow-hidden rounded-pill',
  variants: {
    height: {
      sm: 'h-0.5',
      md: 'h-1',
      lg: 'h-1.5',
    },
    /** Track ground: light inset on paper, translucent well on dark. */
    surface: {
      paper: 'bg-paper-2',
      dark: 'bg-transparent',
    },
  },
  defaultVariants: { height: 'md', surface: 'paper' },
})

/** Translucent-white track well for the inverted scene (white at ~12%). */
const DARK_TRACK_BG = 'rgba(255,255,255,0.12)'

export interface AnimatedBarProps {
  value: number
  max?: number
  tone: Tone
  height?: 'sm' | 'md' | 'lg'
  active: boolean
  delay?: number
  originRight?: boolean
  /** Render on a dark card: translucent-light track instead of paper-2. */
  onDark?: boolean
  /**
   * Optional explicit fill colour, for the neutral/primary case on dark where
   * no semantic tone fits (pass a token hex, e.g. color.plumMist). Overrides
   * the tone fill. Inline style, so it is exempt from the token-class rule.
   */
  fillColor?: string
  className?: string
  trackClassName?: string
}

export function AnimatedBar({
  value,
  max = 100,
  tone,
  height,
  active,
  delay = 0,
  originRight = false,
  onDark = false,
  fillColor,
  className,
  trackClassName,
}: AnimatedBarProps) {
  const scale = Math.max(0, Math.min(1, value / max))
  return (
    <div
      className={cn(
        trackTv({ height, surface: onDark ? 'dark' : 'paper' }),
        trackClassName,
      )}
      style={onDark ? { backgroundColor: DARK_TRACK_BG } : undefined}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <motion.span
        aria-hidden
        className={cn('absolute inset-y-0 left-0 block w-full rounded-pill', className)}
        style={{
          backgroundColor: fillColor ?? toneColor[tone],
          transformOrigin: originRight ? 'right' : 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: scale } : { scaleX: 0 }}
        transition={{ duration: duration.slow, ease: easeBezier.brand, delay }}
      />
    </div>
  )
}
