import { cn } from '@/lib/cn'
import { toneColor, type Tone } from './colors'

/**
 * Mono value label (02 §3, §7.3). Renders a number/string in the mono value
 * style, optionally tinted by a tone. Used by every chart for its readouts so
 * values look identical across the app.
 */
export function ValueLabel({
  children,
  tone,
  size = 'value',
  className,
}: {
  children: React.ReactNode
  tone?: Tone
  size?: 'label' | 'value' | 'stat'
  className?: string
}) {
  return (
    <span
      className={cn(
        size === 'label' && 't-mono-label',
        size === 'value' && 't-mono-value',
        size === 'stat' && 't-stat font-mono',
        className,
      )}
      style={tone ? { color: toneColor[tone] } : undefined}
    >
      {children}
    </span>
  )
}
