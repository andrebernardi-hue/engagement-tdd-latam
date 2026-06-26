import { useState } from 'react'
import { scaleLinear } from 'd3-scale'
import { formatGap, formatPct } from '@/lib/format'
import { AnimatedRect, CenterAxis, NullDash, ValueLabel, type Tone } from '@/components/viz'
import { ToggleGroup } from '@/components/primitives'
import { useInViewOnce } from '@/lib/useInViewOnce'
import { stagger } from '@/lib/motion'
import {
  dimensions,
  dimensionModes,
  DIMENSION_MAX_GAP,
  type DimensionMode,
  type DimensionScore,
} from '@/content/case'
import { problem } from '@/content/copy'
import { color } from '@/styles/tokens'

/**
 * DivergingBars (04 §4.8) — the 12-dimension chart, the densest analytical view
 * of the diagnosis, drawn for the inverted scene. A mode toggle switches between
 * three readings of the same rows:
 *
 *  - 'favorable': bars grow right from the left edge across a 0→100 domain,
 *    coloured by threshold (dark palette below).
 *  - 'vsCompany' / 'vsLatam': bars diverge from a center axis, negatives left,
 *    positives right, scaled symmetrically against the largest absolute gap
 *    (±DIMENSION_MAX_GAP). Nulls render a faint dash + "n/a".
 *
 * DARK ART DIRECTION: dimension labels are white/80; the center axis and null
 * dash are faint white (Svg onDark); the muddy paper row hairlines are dropped
 * for clean vertical rhythm. Threshold/sign colour stays meaningful but is voiced
 * for plum.deep — fills use teal (strong/positive) / red (weak/negative) / a
 * light lavender (neutral mid band), and the mono readouts use AA-on-plum text
 * tokens (teal2 / red.soft / amber-free white). Bars use AnimatedRect, which
 * reveals once in view and tweens x/width on a mode change.
 */

/* SVG plotting geometry (viewBox units; not Tailwind, so px literals are fine
 * here — only className spacing must be tokens). */
const PLOT_W = 320
const ROW_H = 26
const BAR_H = 12
const PAD_X = 18
const PLOT_LEFT = PAD_X
const PLOT_RIGHT = PLOT_W - PAD_X
const CENTER_X = PLOT_W / 2

/** Favorable mode: 0 → 100 maps across the full plotting width, left-anchored. */
const favorableScale = scaleLinear().domain([0, 100]).range([PLOT_LEFT, PLOT_RIGHT])

/** Gap modes: −MAX → +MAX maps symmetrically about the center axis. */
const gapScale = scaleLinear()
  .domain([-DIMENSION_MAX_GAP, DIMENSION_MAX_GAP])
  .range([PLOT_LEFT, PLOT_RIGHT])

interface RowGeometry {
  /** Left edge of the bar in plot units. */
  x: number
  /** Bar width in plot units. */
  width: number
  /** Origin the bar grows from before/while animating in. */
  originX: number
}

function geometryFor(score: DimensionScore, mode: DimensionMode): RowGeometry | null {
  if (mode === 'favorable') {
    const end = favorableScale(score.favorable)
    return { x: PLOT_LEFT, width: Math.max(0, end - PLOT_LEFT), originX: PLOT_LEFT }
  }
  const value = mode === 'vsCompany' ? score.vsCompany : score.vsLatam
  if (value === null) return null
  const end = gapScale(value)
  const x = Math.min(CENTER_X, end)
  return { x, width: Math.abs(end - CENTER_X), originX: CENTER_X }
}

/**
 * Per-row colour on dark: a fill (token-tone or an explicit lavender hex for the
 * neutral mid band) plus an AA-on-plum readout text class.
 */
interface RowColor {
  fillTone: Tone
  /** Explicit fill hex (token) when no semantic tone fits (mid favorable band). */
  fillColor?: string
  /** Tailwind text token for the mono readout. */
  textClass: string
}

function favorableColorDark(value: number): RowColor {
  if (value < 50) return { fillTone: 'red', textClass: 'text-red-soft' }
  if (value <= 65) return { fillTone: 'plum', fillColor: color.plumMist, textClass: 'text-white' }
  return { fillTone: 'teal', textClass: 'text-teal-2' }
}

function gapColorDark(value: number): RowColor {
  if (value > 0) return { fillTone: 'teal', textClass: 'text-teal-2' }
  if (value < 0) return { fillTone: 'red', textClass: 'text-red-soft' }
  return { fillTone: 'plum', fillColor: color.plumMist, textClass: 'text-white' }
}

export function DivergingBars() {
  const [mode, setMode] = useState<DimensionMode>('favorable')
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.28)

  const isGap = mode !== 'favorable'

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="t-mono-label text-white opacity-70">
          Dimensões de engajamento · {dimensions.length}
        </span>
        <ToggleGroup<DimensionMode>
          options={dimensionModes}
          value={mode}
          onChange={setMode}
          ariaLabel="Modo do gráfico de dimensões"
        />
      </div>

      <div className="flex flex-col gap-0.5">
        {dimensions.map((score, i) => {
          const geo = geometryFor(score, mode)
          const value =
            mode === 'favorable'
              ? score.favorable
              : mode === 'vsCompany'
                ? score.vsCompany
                : score.vsLatam
          const rowColor =
            mode === 'favorable'
              ? favorableColorDark(score.favorable)
              : gapColorDark(value ?? 0)
          const isNull = isGap && value === null
          const delay = i * stagger.tight

          return (
            <div
              key={score.dimension}
              className="grid grid-cols-3 items-center gap-3 py-0.5"
            >
              <span className="t-mono-label col-span-1 truncate text-white opacity-80">
                {score.dimension}
              </span>

              <div className="col-span-2 flex items-center gap-1.5">
                <svg
                  viewBox={`0 0 ${PLOT_W} ${ROW_H}`}
                  className="h-3 w-full overflow-visible"
                  role="img"
                  aria-label={
                    isNull
                      ? `${score.dimension}: indisponível`
                      : isGap
                        ? `${score.dimension}: gap ${formatGap(value as number)}`
                        : `${score.dimension}: ${formatPct(score.favorable)} por cento favorável`
                  }
                >
                  {isGap && (
                    <CenterAxis x={CENTER_X} top={2} bottom={ROW_H - 2} strong onDark />
                  )}
                  {isNull && <NullDash x={CENTER_X + 3} y={ROW_H / 2} onDark />}
                  {geo && !isNull && (
                    <AnimatedRect
                      x={geo.x}
                      y={(ROW_H - BAR_H) / 2}
                      width={geo.width}
                      height={BAR_H}
                      originX={geo.originX}
                      tone={rowColor.fillTone}
                      fillColor={rowColor.fillColor}
                      active={inView}
                      delay={delay}
                    />
                  )}
                </svg>

                <span className="w-5 shrink-0 text-right">
                  {isNull ? (
                    <ValueLabel size="label" className="text-white opacity-60">
                      n/a
                    </ValueLabel>
                  ) : isGap ? (
                    <ValueLabel className={rowColor.textClass}>
                      {formatGap(value as number)}
                    </ValueLabel>
                  ) : (
                    <ValueLabel className={rowColor.textClass}>
                      {formatPct(score.favorable)}
                    </ValueLabel>
                  )}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <p className="t-body text-white opacity-70">{problem.dimensionCaption}</p>
    </div>
  )
}
