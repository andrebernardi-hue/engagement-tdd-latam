import { cn } from '@/lib/cn'

/**
 * A mono uppercase section divider (02 §7.1): a label with a hairline rule
 * extending to fill the row. Used to separate sub-blocks within a chapter.
 */
export function DividerLabel({
  children,
  tone = 'paper',
  className,
}: {
  children: React.ReactNode
  tone?: 'paper' | 'invert'
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span
        className={cn(
          't-mono-label font-bold',
          tone === 'invert' ? 'text-white opacity-70' : 'text-muted',
        )}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          'h-px flex-1',
          tone === 'invert' ? 'bg-white opacity-20' : 'bg-line',
        )}
      />
    </div>
  )
}
