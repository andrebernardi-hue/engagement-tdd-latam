import { type ReactNode, forwardRef } from 'react'
import { tv } from 'tailwind-variants'
import { cn } from '@/lib/cn'

/**
 * The card surface (02 §7.1), rendered as frosted glass (the interface's glass
 * language; see index.css .glass*). The single card implementation; everything
 * that needs a surface composes this with variants instead of restyling.
 *
 *  - tone 'card'   → tinted frosted glass with a hover lift (the default).
 *  - tone 'inset'  → a subtler glass well for nested tracks / sub-panels.
 *  - tone 'invert' → a dark frosted panel (white text) for dark-on-dark.
 *  - tone 'ghost'  → no surface, just radius + hairline border.
 *  - tint 'plum'   → the primary, "permeating" plum tint (default).
 *  - tint 'teal'   → a healthy/positive green tint.
 *  - tint 'neutral'→ untinted frosted glass.
 */
const panel = tv({
  base: 'rounded-card',
  variants: {
    tone: {
      card: 'glass glass-hover',
      inset: 'glass-inset',
      invert: 'glass glass-dark text-white',
      ghost: 'border border-line bg-transparent',
    },
    tint: {
      plum: '',
      teal: '',
      neutral: '',
    },
    pad: {
      none: '',
      sm: 'p-2',
      md: 'p-3',
      lg: 'p-4',
      xl: 'p-5',
    },
    /** A colored top accent border (02 §7.2 TheoryCard, etc.). */
    accent: {
      none: '',
      plum: 'border-t-2 border-t-plum',
      teal: 'border-t-2 border-t-teal',
      red: 'border-t-2 border-t-red',
      lime: 'border-t-2 border-t-lime',
    },
  },
  compoundVariants: [
    // Tints apply only to the glass surfaces (not ghost).
    { tone: 'card', tint: 'plum', class: 'glass-plum' },
    { tone: 'card', tint: 'teal', class: 'glass-teal' },
    { tone: 'inset', tint: 'plum', class: 'glass-plum' },
    { tone: 'inset', tint: 'teal', class: 'glass-teal' },
  ],
  defaultVariants: { tone: 'card', tint: 'plum', pad: 'md', accent: 'none' },
})

export interface PanelProps {
  tone?: 'card' | 'inset' | 'invert' | 'ghost'
  tint?: 'plum' | 'teal' | 'neutral'
  pad?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  accent?: 'none' | 'plum' | 'teal' | 'red' | 'lime'
  className?: string
  children: ReactNode
}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { tone, tint, pad, accent, className, children },
  ref,
) {
  return (
    <div ref={ref} className={cn(panel({ tone, tint, pad, accent }), className)}>
      {children}
    </div>
  )
})
