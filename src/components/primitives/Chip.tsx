import { type ReactNode } from 'react'
import { tv } from 'tailwind-variants'
import { cn } from '@/lib/cn'

/**
 * Chip — a small mono "instrument tag" (02 §7.1) for framework labels, category
 * tags, and inline markers. The modern tag language: a fully-rounded pill on a
 * faint tinted ground (no boxy border) with a small leading accent dot, mono
 * uppercase. Light-scene tones use accessible text colors (teal.text, lime.text)
 * so labels meet WCAG AA on paper; `invert` is the dark-scene variant.
 */
const chip = tv({
  base: 'inline-flex items-center gap-1 rounded-pill px-1.5 py-0.5 font-mono text-monolabel font-bold uppercase transition-colors duration-quick ease-brand',
  variants: {
    tone: {
      neutral: 'bg-paper-2 text-plum-ink',
      plum: 'bg-plum/10 text-plum',
      teal: 'bg-teal/10 text-teal-text',
      lime: 'bg-lime/15 text-lime-text',
      red: 'bg-red/10 text-red',
      invert: 'glass-tag text-white',
    },
  },
  defaultVariants: { tone: 'neutral' },
})

const dot = {
  neutral: 'bg-muted',
  plum: 'bg-plum',
  teal: 'bg-teal',
  lime: 'bg-lime',
  red: 'bg-red',
  invert: 'bg-teal-2',
} as const

export function Chip({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: 'neutral' | 'plum' | 'teal' | 'lime' | 'red' | 'invert'
  className?: string
}) {
  return (
    <span className={cn(chip({ tone }), className)}>
      <span aria-hidden className={cn('size-0.5 shrink-0 rounded-pill', dot[tone])} />
      {children}
    </span>
  )
}
