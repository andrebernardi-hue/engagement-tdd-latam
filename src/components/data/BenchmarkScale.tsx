import { motion } from 'motion/react'
import { engagement } from '@/content/case'
import { duration, easeBezier, stagger, chartInView } from '@/lib/motion'
import { useInViewOnce } from '@/lib/useInViewOnce'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { useCountUp } from '@/lib/useCountUp'
import { formatGap } from '@/lib/format'
import { ValueLabel } from '@/components/viz'
import { color } from '@/styles/tokens'

/**
 * BenchmarkScale (04 §4.4, 02 §7.2) — the section's hero stat, redrawn for the
 * inverted diagnosis scene. The 0-100 engagement scale that must make "half the
 * target" unmissable: a banded track, a bright result tick at 40, a distinct
 * lime-bright Target marker at 80, and a faint connecting span between them
 * labeled with the gap (-40).
 *
 * DARK ART DIRECTION (Chapter 03): everything reads light-on-plum. The big "40"
 * headline is red.soft (the negative read, AA on plum.deep); the target is
 * lime.bright (the goal / focal accent); supporting copy is white/70. The three
 * bands keep their semantics (lower red, moderate amber, top plum) but are
 * rendered at reduced opacity/saturation so they harmonize with the dark ground
 * instead of clashing — the near-invisible plum "top" band is lifted to a light
 * lavender (plumMist) so it stays legible. Track, axis text and tick labels are
 * faint white. SVG fills are built from token hexes (governance §9 exempts SVG
 * attributes), so no raw hex enters a className.
 *
 * Choreography (once ~28% in view): bands wipe in left->right (scaleX, left
 * origin, staggered), THEN the 40 result tick drops in, THEN the 80 target
 * marker, so the gap reads as a deliberate sequence. The large "40" counts up.
 * Reduced motion renders the final static state.
 */

/** Maps a 0-100 engagement value to the SVG x coordinate (viewBox width 1000). */
const SCALE_W = 1000
const toX = (value: number) => (value / 100) * SCALE_W

/** Vertical geometry inside the SVG viewBox. */
const VB_H = 188
const BAND_TOP = 96
const BAND_H = 26
const BAND_BOTTOM = BAND_TOP + BAND_H

/**
 * Tone -> dark-harmonized band fill. Built from token hexes via rgba() so the
 * bands sit on plum.deep without clashing: red and amber drop to ~0.82 alpha,
 * and the unreadable deep-plum "top" band is voiced as light lavender (plumMist).
 */
function rgba(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `rgba(${r},${g},${b},${a})`
}
const bandFill: Record<'red' | 'amber' | 'plum', string> = {
  red: rgba(color.red, 0.82),
  amber: rgba(color.amber, 0.82),
  plum: rgba(color.plumMist, 0.5),
}

/** Faint-white tints for the dark scene (track, axis text, hairlines). */
const TRACK_BG = rgba(color.white, 0.08)
const AXIS_TEXT = rgba(color.white, 0.6)
const GAP_PILL_BG = rgba(color.plumDeep, 0.85)
const MONO = '"Space Mono", monospace'

export function BenchmarkScale() {
  const { overall, scorecardTarget, bands } = engagement
  const { ref, inView } = useInViewOnce<HTMLDivElement>(chartInView.amount)
  const reduced = useReducedMotion()

  const count = useCountUp(overall, inView)
  const gap = overall - scorecardTarget // -40

  // Sequence delays: bands wipe first, then the result tick, then the target.
  const bandWipe = duration.base
  const resultDelay = reduced ? 0 : bandWipe + stagger.loose
  const targetDelay = reduced ? 0 : resultDelay + duration.base * 0.45

  const resultX = toX(overall)
  const targetX = toX(scorecardTarget)

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {/* Headline: the result counts up in red.soft, framed against the target. */}
      <div className="flex flex-wrap items-end gap-x-5 gap-y-1.5">
        <div className="flex flex-col">
          <span className="t-mono-label text-white opacity-70">
            Engajamento Pulsecheck 2025
          </span>
          <span
            className="t-bigstat text-red-soft"
            aria-label={`${overall} por cento favorável`}
          >
            {count}
          </span>
        </div>
        <div className="flex items-center gap-1.5 pb-2.5">
          <span className="t-mono-label text-white opacity-70">Meta do Scorecard</span>
          {/* No `tone` here: the className token wins, so the stat reads in the
              same lime.bright as the SVG target marker (an inline tone style
              would otherwise override it with lime DEFAULT). */}
          <ValueLabel size="stat" className="text-lime-bright">
            {scorecardTarget}
          </ValueLabel>
          <span className="t-mono-value glass-tag rounded-pill px-1.5 py-0.5 text-red-soft">
            {formatGap(gap)}
          </span>
        </div>
      </div>

      {/* The banded 0-100 scale. SVG coords are exempt from Tailwind tokens; all
          fills come from tokens.ts. role=img with a descriptive label. */}
      <svg
        viewBox={`0 0 ${SCALE_W} ${VB_H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Benchmark global de engajamento, de 0 a 100. O resultado é ${overall}, na faixa inferior, exatamente metade da meta do Scorecard de ${scorecardTarget}. Gap de ${gap}.`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Track inset (faint white) behind the bands for a seated look. */}
        <rect
          x={0}
          y={BAND_TOP - 4}
          width={SCALE_W}
          height={BAND_H + 8}
          rx={8}
          fill={TRACK_BG}
        />

        {/* Bands wipe in left->right, staggered, from a left origin. */}
        {bands.map((band, i) => {
          const x = toX(band.from)
          const w = toX(band.to) - toX(band.from)
          const last = i === bands.length - 1
          return (
            <motion.rect
              key={band.label}
              x={x}
              y={BAND_TOP}
              width={w}
              height={BAND_H}
              rx={i === 0 ? 6 : last ? 6 : 0}
              fill={bandFill[band.tone]}
              style={{ transformOrigin: `${x}px ${BAND_TOP + BAND_H / 2}px` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{
                duration: duration.base,
                ease: easeBezier.brand,
                delay: reduced ? 0 : i * stagger.loose,
              }}
            />
          )
        })}

        {/* Band scale labels under the track (mono, faint white). */}
        {bands.map((band) => (
          <text
            key={`lbl-${band.label}`}
            x={toX((band.from + band.to) / 2)}
            y={BAND_BOTTOM + 22}
            textAnchor="middle"
            fill={AXIS_TEXT}
            fontFamily={MONO}
            fontSize={13}
            letterSpacing={1}
          >
            {band.label.toUpperCase()}
          </text>
        ))}

        {/* Faint connecting span between result and target, dramatizing the gap.
            The dashed measure line BREAKS around the centered label so nothing
            overlaps; end caps make it read as a measured interval. Reveals with
            the target marker so the sequence builds to it. */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: duration.base,
            ease: easeBezier.brand,
            delay: targetDelay,
          }}
        >
          {(() => {
            const spanY = BAND_TOP - 24
            const midX = (resultX + targetX) / 2
            const half = 70 // label half-width; the dashed line stops here
            return (
              <>
                {/* Dashed line, split left + right of the label. */}
                <line
                  x1={resultX}
                  x2={midX - half}
                  y1={spanY}
                  y2={spanY}
                  stroke={color.redSoft}
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  strokeOpacity={0.75}
                />
                <line
                  x1={midX + half}
                  x2={targetX}
                  y1={spanY}
                  y2={spanY}
                  stroke={color.redSoft}
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  strokeOpacity={0.75}
                />
                {/* End caps. */}
                <line x1={resultX} x2={resultX} y1={spanY - 6} y2={spanY + 6} stroke={color.redSoft} strokeWidth={1.5} strokeOpacity={0.75} />
                <line x1={targetX} x2={targetX} y1={spanY - 6} y2={spanY + 6} stroke={color.redSoft} strokeWidth={1.5} strokeOpacity={0.75} />
                {/* Centered label, no box — the line break gives it clean air. */}
                <text
                  x={midX}
                  y={spanY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={color.redSoft}
                  fontFamily={MONO}
                  fontSize={14}
                  fontWeight={700}
                >
                  {`${formatGap(gap)} vs meta`}
                </text>
              </>
            )
          })()}
        </motion.g>

        {/* Result tick: a solid bright mark that DROPS in after the bands. */}
        <motion.g
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{
            duration: duration.base,
            ease: easeBezier.brand,
            delay: resultDelay,
          }}
        >
          <rect
            x={resultX - 1.5}
            y={BAND_TOP - 8}
            width={3}
            height={BAND_H + 16}
            rx={1.5}
            fill={color.white}
          />
          <circle cx={resultX} cy={BAND_TOP - 8} r={5} fill={color.white} />
          <text
            x={resultX}
            y={BAND_BOTTOM + 44}
            textAnchor="middle"
            fill={color.white}
            fontFamily={MONO}
            fontSize={18}
            fontWeight={700}
          >
            {overall}
          </text>
        </motion.g>

        {/* Target marker: a distinct NOTCHED, lime-bright marker, dropping in last. */}
        <motion.g
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{
            duration: duration.base,
            ease: easeBezier.brand,
            delay: targetDelay,
          }}
        >
          {/* Notched / outlined stem so it differs from the solid result tick. */}
          <rect
            x={targetX - 2}
            y={BAND_TOP - 8}
            width={4}
            height={BAND_H + 16}
            rx={2}
            fill={GAP_PILL_BG}
            stroke={color.limeBright}
            strokeWidth={1.5}
          />
          {/* Downward-notched flag head. */}
          <path
            d={`M ${targetX - 11} ${BAND_TOP - 30}
                H ${targetX + 11}
                V ${BAND_TOP - 16}
                L ${targetX} ${BAND_TOP - 8}
                L ${targetX - 11} ${BAND_TOP - 16}
                Z`}
            fill={GAP_PILL_BG}
            stroke={color.limeBright}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <text
            x={targetX}
            y={BAND_TOP - 19}
            textAnchor="middle"
            fill={color.limeBright}
            fontFamily={MONO}
            fontSize={11}
            fontWeight={700}
          >
            {scorecardTarget}
          </text>
          <text
            x={targetX}
            y={BAND_BOTTOM + 44}
            textAnchor="middle"
            fill={color.limeBright}
            fontFamily={MONO}
            fontSize={13}
            fontWeight={700}
            letterSpacing={1}
          >
            META
          </text>
        </motion.g>
      </svg>

      <p className="t-body text-white opacity-80">
        Em {overall}, o resultado fica na faixa inferior do benchmark. Metade dos{' '}
        {scorecardTarget} que o Scorecard 2025 definiu.
      </p>
    </div>
  )
}
