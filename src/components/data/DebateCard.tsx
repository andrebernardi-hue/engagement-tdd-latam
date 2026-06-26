import { useId } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { Eyebrow } from '@/components/primitives'
import { duration, easeBezier } from '@/lib/motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { type DebateCard as DebateCardData } from '@/content/copy'

/**
 * DebateCard — a poster-style, EXPANDABLE debate prompt (02 §7.2, 04 §4.14).
 * One of the four Chapter 06 tensions: a big legible question with two opposing
 * lenses and the data footnote that anchors the argument.
 *
 * The card matches the PosterCard art direction (oversized faint corner numeral,
 * teal Eyebrow, frosted plum glass) but stays a disclosure: a real <button>
 * toggle flips aria-expanded and reveals a region (height + opacity) holding
 * Lens A (teal) / Lens B (red) / a dashed-top footnote.
 *
 * It is CONTROLLED so the carousel governs it: `open` mirrors the carousel's
 * active+open state, `onToggle` flips it, and `interactive` is false while the
 * card is a peeking neighbor — then the toggle is inert and the card stays
 * collapsed. Motion is duration.quick/base on easeBezier.brand; reduced motion
 * collapses/expands instantly.
 */
export function DebateCard({
  card,
  index,
  total,
  open,
  onToggle,
  interactive,
  className,
}: {
  card: DebateCardData
  /** Zero-based position, for the big corner numeral. */
  index: number
  total: number
  /** Controlled open state (carousel-governed). */
  open: boolean
  onToggle: () => void
  /** False while this card is a peeking neighbor: toggle is inert. */
  interactive: boolean
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const contentId = useId()
  const numeral = String(index + 1).padStart(2, '0')

  const revealTween = { duration: duration.base, ease: easeBezier.brand }
  const chevronTween = { duration: duration.quick, ease: easeBezier.brand }

  return (
    <article
      className={cn(
        'glass glass-plum relative flex flex-col overflow-hidden rounded-card',
        interactive && 'glass-hover',
        open && 'border-plum',
        className,
      )}
    >
      {/* Oversized faint poster numeral, bled off the top-right as a graphic. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-numeral font-bold text-plum-mist opacity-25"
      >
        {numeral}
      </span>

      <div className="relative z-10 flex flex-col gap-3 p-5 lg:p-6">
        <div className="flex items-center justify-between gap-2">
          <Eyebrow>{card.theme}</Eyebrow>
          <span className="t-mono-label shrink-0 text-muted" aria-hidden>
            {numeral} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* The question is the hero: large and unmistakably legible. */}
        <h3 className="t-h2 text-balance text-plum-ink">{card.question}</h3>

        <button
          type="button"
          onClick={onToggle}
          disabled={!interactive}
          aria-expanded={open}
          aria-controls={contentId}
          className={cn(
            'inline-flex w-fit items-center gap-1.5 rounded-pill font-mono text-monovalue font-bold uppercase text-plum-ink',
            'transition-colors duration-quick ease-brand disabled:opacity-40',
            interactive && 'hover:text-plum',
          )}
        >
          <span>{open ? 'Ocultar as duas lentes' : 'Ver as duas lentes'}</span>
          <motion.span
            aria-hidden
            className="flex items-center justify-center"
            animate={{ rotate: open ? 90 : 0 }}
            transition={reduceMotion ? { duration: 0 } : chevronTween}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6.5 4l5 5-5 5" />
            </svg>
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={contentId}
              key="content"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : revealTween}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-3 pt-1 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <span className="t-mono-value text-teal-text">{card.lensA.label}</span>
                  <p className="t-body text-plum-ink">{card.lensA.text}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="t-mono-value text-red">{card.lensB.label}</span>
                  <p className="t-body text-plum-ink">{card.lensB.text}</p>
                </div>
              </div>

              <p className="t-mono-label mt-3 border-t border-dashed border-strong pt-2 text-muted">
                {card.footnote}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  )
}
