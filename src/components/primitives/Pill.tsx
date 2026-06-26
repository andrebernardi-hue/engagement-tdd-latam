import { type ReactNode } from 'react'
import { tv } from 'tailwind-variants'
import { cn } from '@/lib/cn'

/**
 * Pill (02 §7.1) — a prominent status tag, the bolder sibling of Chip. Same tag
 * DNA (rounded-pill, leading accent dot, mono) but tinted and outlined for
 * emphasis: `win` (teal) for assets to protect, `alert` (red) for urgencies,
 * `default` (plum) for neutral. The translucent tinted ground + bright accent
 * text are tuned to pop on the dark closing scene and meet WCAG AA there
 * (teal.2 7:1, red.soft 6:1, white 16:1 on plum.deep). Color is never the only
 * signal — the dot and the label text carry meaning too.
 */
const pill = tv({
  base: 'inline-flex items-center gap-1.5 rounded-pill border px-2 py-1 font-mono text-monovalue font-bold',
  variants: {
    variant: {
      default: 'border-plum-mist/30 bg-plum/20 text-white',
      win: 'border-teal/40 bg-teal/15 text-teal-2',
      alert: 'border-red/40 bg-red/15 text-red-soft',
    },
  },
  defaultVariants: { variant: 'default' },
})

const dot = {
  default: 'bg-plum-mist',
  win: 'bg-teal-2',
  alert: 'bg-red-soft',
} as const

export function Pill({
  children,
  variant = 'default',
  className,
}: {
  children: ReactNode
  variant?: 'default' | 'win' | 'alert'
  className?: string
}) {
  return (
    <span className={cn(pill({ variant }), className)}>
      <span aria-hidden className={cn('size-1 shrink-0 rounded-pill', dot[variant])} />
      {children}
    </span>
  )
}
