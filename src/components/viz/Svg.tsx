import { motion } from 'motion/react'
import { duration, easeBezier } from '@/lib/motion'
import { toneColor, type Tone } from './colors'
import { color } from '@/styles/tokens'

/**
 * Low-level SVG primitives for charts that need coordinate math (DivergingBars).
 * AnimatedRect animates from a zero-width origin once `active` is true, and
 * tweens between target geometries when its props change (used for the
 * favorable/gap mode switch, 04 §4.8). Animation is on `width`/`x` here because
 * an SVG mode-transition needs both, gated to a single in-view trigger.
 *
 * `CenterAxis` and `NullDash` take an `onDark` flag so the same charts read on
 * the inverted diagnosis scene: the axis and the null dash become a faint white
 * line instead of plum-ink/muted. SVG stroke colours are built from token hexes
 * (governance §9 exempts SVG attributes from the no-arbitrary-value rule).
 */

/** Faint-white stroke for axis/grid lines on the dark scene. */
const WHITE_FAINT_STRONG = 'rgba(255,255,255,0.34)'
const WHITE_FAINT_SOFT = 'rgba(255,255,255,0.18)'

export function AnimatedRect({
  x,
  y,
  width,
  height,
  tone,
  fillColor,
  rx = 3,
  active,
  delay = 0,
  durationSec = duration.base,
  /** Origin x the bar grows from before it is active (left edge or center). */
  originX,
}: {
  x: number
  y: number
  width: number
  height: number
  tone: Tone
  /**
   * Optional explicit fill (token hex), for the dark scene's neutral threshold
   * band where no semantic tone fits. Overrides the tone fill. SVG attribute, so
   * it is exempt from the no-arbitrary-value rule (02 §9).
   */
  fillColor?: string
  rx?: number
  active: boolean
  delay?: number
  durationSec?: number
  originX: number
}) {
  return (
    <motion.rect
      y={y}
      height={height}
      rx={rx}
      fill={fillColor ?? toneColor[tone]}
      initial={{ x: originX, width: 0 }}
      animate={active ? { x, width } : { x: originX, width: 0 }}
      transition={{ duration: durationSec, ease: easeBezier.brand, delay }}
    />
  )
}

/** A vertical center/reference axis line (04 §4.8). */
export function CenterAxis({
  x,
  top,
  bottom,
  strong = false,
  onDark = false,
}: {
  x: number
  top: number
  bottom: number
  strong?: boolean
  onDark?: boolean
}) {
  const stroke = onDark
    ? strong
      ? WHITE_FAINT_STRONG
      : WHITE_FAINT_SOFT
    : strong
      ? color.plumInk
      : color.muted
  return (
    <line
      x1={x}
      x2={x}
      y1={top}
      y2={bottom}
      stroke={stroke}
      strokeWidth={strong ? 1.5 : 1}
      strokeOpacity={onDark ? 1 : strong ? 0.4 : 0.22}
    />
  )
}

/** A muted dash for null/not-available values (04 §4.8). */
export function NullDash({
  x,
  y,
  onDark = false,
}: {
  x: number
  y: number
  onDark?: boolean
}) {
  return (
    <line
      x1={x}
      x2={x + 10}
      y1={y}
      y2={y}
      stroke={onDark ? WHITE_FAINT_STRONG : color.muted}
      strokeWidth={2}
      strokeOpacity={onDark ? 1 : 0.5}
      strokeLinecap="round"
    />
  )
}
