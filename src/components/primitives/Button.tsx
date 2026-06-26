import { type ButtonHTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'
import { cn } from '@/lib/cn'

/**
 * Button primitive (02 §7.1) with a lime focus-visible ring (handled globally
 * in index.css). Used for any in-page action; nav and rail use their own
 * tailored controls. Variants cover the few button shapes the app needs.
 */
const button = tv({
  base: 'inline-flex items-center justify-center gap-1 rounded-pill font-mono text-monovalue font-bold uppercase transition-colors duration-quick ease-brand disabled:opacity-40',
  variants: {
    variant: {
      solid: 'bg-plum text-white hover:bg-plum-deep',
      outline: 'border border-strong text-plum-ink hover:bg-paper-2',
      // Outline for dark/inverted scenes: white label + hairline white border.
      outlineDark: 'border border-white/40 text-white hover:bg-white/10',
      ghost: 'text-muted hover:text-plum-ink',
    },
    size: {
      sm: 'px-1.5 py-0.5',
      md: 'px-2 py-1',
    },
  },
  defaultVariants: { variant: 'solid', size: 'md' },
})

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'outlineDark' | 'ghost'
  size?: 'sm' | 'md'
}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(button({ variant, size }), className)} {...props} />
  )
}
