import { cn } from '@/lib/cn'

/**
 * The chapter-opening eyebrow (02 §3): a short teal rule followed by a mono
 * uppercase label. Tone-aware for accessibility (WCAG AA): on light scenes the
 * label uses the darker `teal.text` (via .t-eyebrow, 5:1 on paper); on inverted
 * scenes it uses the brighter `teal.2` which is legible on plum.deep (7:1).
 */
export function Eyebrow({
  children,
  tone = 'paper',
  className,
}: {
  children: React.ReactNode
  tone?: 'paper' | 'invert'
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span
        aria-hidden
        className={cn('h-px w-4', tone === 'invert' ? 'bg-teal-2' : 'bg-teal')}
      />
      <span className={cn('t-eyebrow', tone === 'invert' && 'text-teal-2')}>
        {children}
      </span>
    </span>
  )
}
