import { motion } from 'motion/react'
import { duration, easeBezier, chartInView } from '@/lib/motion'
import { useInViewOnce } from '@/lib/useInViewOnce'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { ValueLabel } from '@/components/viz'
import { color } from '@/styles/tokens'
import type { SolutionTarget } from '@/content/case'

/**
 * TargetMeter (04 §4.13, 02 §7.2, Chapter 05). One solution front's present->goal
 * meter on a horizontal 0->scaleMax track.
 *
 *  - kind 'climb': the current `from` segment fills first in red/amber (red for
 *    low starts, amber for moderate), then the projected gain to `target`
 *    animates out as a TEAL dashed / ghosted extension, so present and goal are
 *    both legible. Milestone ticks sit at each milestone value, labeled with its
 *    `.at`. The current and target values are called out as mono ValueLabels.
 *  - kind 'hold': the current value fills TEAL and a dashed FLOOR line marks the
 *    line to defend (e.g. "floor 90") — the read is "keep above 90".
 *
 * Choreography (once ~28% in view): the from-segment scales in from its left
 * origin, THEN the teal projection extends toward target. Reduced motion renders
 * both segments in their final static state (Framer honors the OS flag; the
 * sequencing delays collapse to 0).
 *
 * Light-surface block (paper / Panel): plum-ink text, a paper-2 track. SVG
 * coordinates are exempt from Tailwind tokens; every fill comes from tokens.ts.
 */

/** Track geometry inside the SVG viewBox. Coords are SVG units, not Tailwind. */
const VB_W = 1000
const VB_H = 132
const TRACK_TOP = 58
const TRACK_H = 18
const TRACK_BOTTOM = TRACK_TOP + TRACK_H
const TRACK_MID = TRACK_TOP + TRACK_H / 2

const MONO = '"Space Mono", monospace'

/** A low start reads red; a moderate one reads amber (04 §4.13). */
function fromTone(value: number, scaleMax: number): string {
  return value / scaleMax < 0.4 ? color.red : color.amber
}

export function TargetMeter({ target }: { target: SolutionTarget }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(chartInView.amount)
  const reduced = useReducedMotion()

  const { kind, metric, from, milestones, floor } = target
  const scaleMax = target.scaleMax ?? 100
  const goal = target.target

  const toX = (value: number) => (value / scaleMax) * VB_W

  const fromX = toX(from)
  const goalX = toX(goal)

  // Sequence: the from-segment fills, then the projected extension follows.
  const projectionDelay = reduced ? 0 : duration.slow * 0.6

  const isHold = kind === 'hold'
  const trackFill = isHold ? color.teal : fromTone(from, scaleMax)

  const ariaLabel = isHold
    ? `${metric}: hoje em ${from}, com um piso de ${floor ?? from} a defender, numa escala de 0 a ${scaleMax}.`
    : `${metric}: hoje em ${from}, com projeção de chegar à meta de ${goal}, numa escala de 0 a ${scaleMax}.`

  return (
    <div ref={ref} className="flex flex-col gap-2">
      {/* Metric name + the current / target readout (mono ValueLabels). */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <h4 className="t-h3 text-plum-ink">{metric}</h4>
        <div className="flex items-baseline gap-1.5">
          <span className="t-mono-label text-muted">hoje</span>
          <ValueLabel tone={isHold ? 'teal' : 'red'}>{from}</ValueLabel>
          {!isHold && (
            <>
              <span aria-hidden className="t-mono-label text-muted">
                &rarr;
              </span>
              <span className="t-mono-label text-muted">meta</span>
              <ValueLabel tone="teal">{goal}</ValueLabel>
            </>
          )}
          {isHold && floor !== undefined && (
            <>
              <span aria-hidden className="t-mono-label text-muted">
                |
              </span>
              <span className="t-mono-label text-muted">piso</span>
              <ValueLabel tone="amber">{floor}</ValueLabel>
            </>
          )}
        </div>
      </div>

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="h-auto w-full"
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* The 0->scaleMax track (paper-2 inset). */}
        <rect
          x={0}
          y={TRACK_TOP}
          width={VB_W}
          height={TRACK_H}
          rx={TRACK_H / 2}
          fill={color.paper2}
        />

        {/* CLIMB: the projected gain renders as a teal ghosted/dashed extension
            from `from` to `target`, drawn behind the solid from-segment so the
            solid edge sits on top. It extends after the from-segment fills. */}
        {!isHold && goalX > fromX && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: duration.base,
              ease: easeBezier.brand,
              delay: projectionDelay,
            }}
          >
            <motion.rect
              x={fromX}
              y={TRACK_TOP}
              width={goalX - fromX}
              height={TRACK_H}
              rx={TRACK_H / 2}
              fill={color.teal}
              fillOpacity={0.16}
              stroke={color.teal}
              strokeWidth={2}
              strokeDasharray="7 6"
              strokeOpacity={0.85}
              style={{ transformOrigin: `${fromX}px ${TRACK_MID}px` }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                duration: duration.slow,
                ease: easeBezier.brand,
                delay: projectionDelay,
              }}
            />
          </motion.g>
        )}

        {/* The current value fills first, from the left origin. Red/amber for a
            climb start, teal for a hold (the value we are defending). */}
        <motion.rect
          x={0}
          y={TRACK_TOP}
          width={fromX}
          height={TRACK_H}
          rx={TRACK_H / 2}
          fill={trackFill}
          style={{ transformOrigin: `0px ${TRACK_MID}px` }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: duration.slow, ease: easeBezier.brand }}
        />

        {/* CLIMB: milestone ticks at each milestone value, labeled with its .at. */}
        {!isHold &&
          milestones.map((m, i) => {
            const mx = toX(m.value)
            return (
              <motion.g
                key={`${m.value}-${m.at}`}
                initial={{ opacity: 0, y: -10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{
                  duration: duration.base,
                  ease: easeBezier.brand,
                  delay: reduced ? 0 : projectionDelay + duration.base * 0.4 + i * 0.12,
                }}
              >
                <rect
                  x={mx - 1.5}
                  y={TRACK_TOP - 8}
                  width={3}
                  height={TRACK_H + 16}
                  rx={1.5}
                  fill={color.teal}
                />
                <circle cx={mx} cy={TRACK_TOP - 8} r={4.5} fill={color.teal} />
                <text
                  x={mx}
                  y={TRACK_BOTTOM + 26}
                  textAnchor="middle"
                  fill={color.teal}
                  fontFamily={MONO}
                  fontSize={20}
                  fontWeight={700}
                >
                  {m.value}
                </text>
                <text
                  x={mx}
                  y={TRACK_BOTTOM + 44}
                  textAnchor="middle"
                  fill={color.muted}
                  fontFamily={MONO}
                  fontSize={14}
                  letterSpacing={1}
                >
                  {m.at.toUpperCase()}
                </text>
              </motion.g>
            )
          })}

        {/* CLIMB: the target marker at the end of the projection. */}
        {!isHold && (
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{
              duration: duration.base,
              ease: easeBezier.brand,
              delay: reduced ? 0 : projectionDelay + duration.slow * 0.7,
            }}
          >
            <rect
              x={goalX - 2}
              y={TRACK_TOP - 10}
              width={4}
              height={TRACK_H + 20}
              rx={2}
              fill={color.teal}
            />
            <text
              x={goalX}
              y={TRACK_TOP - 16}
              textAnchor="middle"
              fill={color.teal}
              fontFamily={MONO}
              fontSize={14}
              fontWeight={700}
              letterSpacing={1}
            >
              META
            </text>
          </motion.g>
        )}

        {/* HOLD: a dashed floor line to defend, labeled "floor N". The teal fill
            above it carries the "keep above" read. */}
        {isHold && floor !== undefined && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: duration.base,
              ease: easeBezier.brand,
              delay: projectionDelay,
            }}
          >
            <line
              x1={toX(floor)}
              x2={toX(floor)}
              y1={TRACK_TOP - 14}
              y2={TRACK_BOTTOM + 14}
              stroke={color.amber}
              strokeWidth={2.5}
              strokeDasharray="6 5"
            />
            <text
              x={toX(floor)}
              y={TRACK_TOP - 20}
              textAnchor="middle"
              fill={color.amber}
              fontFamily={MONO}
              fontSize={14}
              fontWeight={700}
              letterSpacing={1}
            >
              {`PISO ${floor}`}
            </text>
            <text
              x={toX(floor)}
              y={TRACK_BOTTOM + 32}
              textAnchor="middle"
              fill={color.muted}
              fontFamily={MONO}
              fontSize={14}
              letterSpacing={1}
            >
              MANTER ACIMA
            </text>
          </motion.g>
        )}
      </svg>
    </div>
  )
}
