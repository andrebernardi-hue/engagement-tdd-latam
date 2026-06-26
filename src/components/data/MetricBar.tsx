import { cn } from '@/lib/cn'
import { AnimatedBar, ValueLabel, type Tone } from '@/components/viz'

/**
 * Labeled horizontal bar with a mono value (02 §7.2). The reusable bar row that
 * powers ParadoxColumns, DistributionBars, and any simple bar. It is built on
 * the single AnimatedBar engine, so there is one bar implementation in the app.
 *
 * `tone` carries the semantic color of the FILL from the data. `worst` marks the
 * survey's worst item with a small dot before the label.
 *
 * `onDark` re-grounds the row for the inverted diagnosis scene (Chapter 03):
 * the label and worst-dot turn light, the track becomes a translucent well, and
 * the readout uses `valueTone` (a light-on-dark tone such as teal2 / redSoft /
 * amber) which the caller supplies so text stays WCAG-AA on plum.deep. `fillColor`
 * lets the neutral case paint a light lavender/white fill from a token hex.
 * The legacy `invert` prop is kept as an alias for `onDark`.
 */
export function MetricBar({
  label,
  value,
  tone,
  active,
  delay = 0,
  max = 100,
  worst = false,
  invert = false,
  onDark = false,
  valueTone,
  fillColor,
  className,
}: {
  label: string
  value: number
  tone: Tone
  active: boolean
  delay?: number
  max?: number
  worst?: boolean
  /** Legacy alias for `onDark`: render the label in white. */
  invert?: boolean
  /** Full dark treatment: light label, translucent track, light readout. */
  onDark?: boolean
  /** Readout tone on dark (defaults to the fill `tone`). */
  valueTone?: Tone
  /** Optional explicit fill colour for the neutral case (token hex). */
  fillColor?: string
  className?: string
}) {
  const dark = onDark || invert
  return (
    <div className={cn('flex flex-col gap-0.5', className)}>
      <div className="flex items-baseline justify-between gap-1.5">
        <span
          className={cn(
            't-body flex items-center gap-1',
            dark ? 'text-white opacity-90' : 'text-plum-ink',
          )}
        >
          {worst && (
            <span
              aria-hidden
              className={cn(
                'inline-block size-0.5 rounded-pill',
                dark ? 'bg-red-soft' : 'bg-red',
              )}
            />
          )}
          <span className="leading-tight">{label}</span>
        </span>
        <ValueLabel tone={valueTone ?? tone}>{value}</ValueLabel>
      </div>
      <AnimatedBar
        value={value}
        max={max}
        tone={tone}
        active={active}
        delay={delay}
        onDark={dark}
        fillColor={fillColor}
      />
    </div>
  )
}
