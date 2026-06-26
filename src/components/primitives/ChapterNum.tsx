import { cn } from '@/lib/cn'

/**
 * The two-digit chapter number (02 §3): mono, plum, low opacity. Sits above the
 * eyebrow in a SectionHead. On inverted scenes pass tone="invert" so it reads
 * against plum.deep.
 */
export function ChapterNum({
  children,
  tone = 'paper',
  className,
}: {
  children: React.ReactNode
  tone?: 'paper' | 'invert'
  className?: string
}) {
  return (
    <span
      className={cn(
        't-chapternum',
        tone === 'invert' ? 'text-white opacity-60' : 'text-plum opacity-60',
        className,
      )}
    >
      {children}
    </span>
  )
}
