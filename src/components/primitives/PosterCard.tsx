import { type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Eyebrow } from './Eyebrow'

/**
 * PosterCard — the shared graphic-design poster card used by the analysis
 * carousel lenses and the solution fronts. One consistent art-directed skeleton:
 *
 *  - an oversized, faint index numeral bled off the top-right corner (graphic);
 *  - a teal mono Eyebrow + an optional mono counter on the header row;
 *  - a TWO-COLUMN body: the title on the left, the copy on the right;
 *  - an optional full-width footer (framework chips, a target meter, etc.).
 *
 * Frosted plum glass surface, no top-border accent. Plum-ink text on light glass
 * (WCAG AA; the Eyebrow handles teal-as-text accessibly). The card fills its
 * parent height (`h-full`); when the parent constrains height (the carousel
 * stage) the copy column scrolls, so every card stays the same size.
 */
export function PosterCard({
  numeral,
  eyebrow,
  counter,
  title,
  body,
  footer,
  className,
}: {
  /** The big faint corner numeral, e.g. "01" or "5.1". */
  numeral: string
  eyebrow: string
  /** Small mono progress label, e.g. "01 / 06". */
  counter?: string
  title: ReactNode
  body: ReactNode
  /** Full-width foot: chips, a meter, etc. */
  footer?: ReactNode
  className?: string
}) {
  return (
    <article
      className={cn(
        'glass glass-plum relative flex h-full flex-col overflow-hidden rounded-card',
        className,
      )}
    >
      {/* Oversized faint poster numeral, bled off the top-right as a graphic. */}
      <span
        aria-hidden
        className="text-numeral pointer-events-none absolute -right-4 -top-8 select-none font-display font-bold text-plum-mist opacity-25"
      >
        {numeral}
      </span>

      <div className="relative z-10 flex h-full flex-col gap-3 p-5 lg:p-6">
        <div className="flex items-center justify-between gap-2">
          <Eyebrow>{eyebrow}</Eyebrow>
          {counter && (
            <span className="t-mono-label shrink-0 text-muted" aria-hidden>
              {counter}
            </span>
          )}
        </div>

        {/* Two columns: title left, copy right (stacks on narrow widths). */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-5">
          <div className="md:col-span-2">
            {typeof title === 'string' ? (
              <h3 className="t-h2 text-balance text-plum-ink">{title}</h3>
            ) : (
              title
            )}
          </div>
          <div className="min-h-0 md:col-span-3 md:overflow-y-auto md:pr-1">
            {typeof body === 'string' ? (
              <p className="t-body text-plum-ink">{body}</p>
            ) : (
              body
            )}
          </div>
        </div>

        {footer && <div className="border-t border-line pt-3">{footer}</div>}
      </div>
    </article>
  )
}
