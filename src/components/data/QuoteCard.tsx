import { Panel, RevealGroup, RevealItem } from '@/components/primitives'
import { cn } from '@/lib/cn'
import { verbatims, type Verbatim } from '@/content/copy'

/**
 * Employee verbatim card (04 §4.9, 02 §7.2). One quote inside a Panel: a large
 * quotation glyph (decorative, aria-hidden), the quote body in italic, and a
 * mono source tag. `onDark` re-grounds the card for the inverted diagnosis scene
 * (Chapter 03): dark glass, white quote text, and bright-on-dark accents that
 * meet WCAG AA (teal.2 / lime.bright / white). On light scenes the positive tag
 * uses the accessible teal.text.
 *
 * Semantics: each card is a <figure>; the body is the <blockquote> and the tag
 * is its <figcaption>, so screen readers announce the quote and its source.
 */
export function QuoteCard({
  tag,
  text,
  tone,
  onDark = false,
}: Verbatim & { onDark?: boolean }) {
  const positive = tone === 'positive'
  return (
    <Panel
      tone={onDark ? 'invert' : 'card'}
      tint={onDark ? undefined : positive ? 'teal' : 'plum'}
      pad="lg"
      className="flex h-full flex-col gap-2"
    >
      <figure className="flex h-full flex-col gap-2">
        <span
          aria-hidden
          className={cn(
            't-stat block select-none leading-none',
            onDark
              ? positive
                ? 'text-lime-bright'
                : 'text-teal-2'
              : positive
                ? 'text-lime-text'
                : 'text-lime',
          )}
        >
          &ldquo;
        </span>
        <blockquote
          className={cn(
            't-body flex-1 italic',
            onDark ? 'text-white opacity-90' : 'text-plum-ink',
          )}
        >
          {text}
        </blockquote>
        <figcaption
          className={cn(
            't-mono-label not-italic',
            onDark
              ? positive
                ? 'text-teal-2'
                : 'text-white opacity-70'
              : positive
                ? 'text-teal-text'
                : 'text-muted',
          )}
        >
          {tag}
        </figcaption>
      </figure>
    </Panel>
  )
}

/**
 * The four verbatims in a responsive grid (1 column, 2 from md), staggered into
 * view via the shared RevealGroup/RevealItem so the cards rise in sequence.
 * `onDark` passes through to each card for the inverted diagnosis scene.
 */
export function QuoteGrid({
  className,
  onDark = false,
}: {
  className?: string
  onDark?: boolean
}) {
  return (
    <RevealGroup className={cn('grid grid-cols-1 gap-3 md:grid-cols-2', className)}>
      {verbatims.map((quote) => (
        <RevealItem key={quote.text} className="h-full">
          <QuoteCard {...quote} onDark={onDark} />
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

/**
 * QuoteSlide — the verbatim re-cut as an INTEGRATED, poster-style pull-quote for
 * the dark diagnosis carousel (Chapter 03). Not a glass card: no surface, no
 * border. The quote reads as typography woven into the plum.deep field —
 *
 *   - an oversized decorative quotation glyph bled off the top-left as a graphic
 *     (text-numeral, faint, lime.bright for the positive voice / teal.2 otherwise);
 *   - a faint poster index numeral bled off the top-right, for art-direction
 *     consistency with PosterCard;
 *   - the quote typeset large and italic (t-h3, white) on a comfortable measure;
 *   - a mono source tag (teal.2 for positive, white-70 otherwise).
 *
 * All light-on-dark and WCAG AA on plum.deep (white 16:1, teal.2 7:1). It is a
 * <figure> (blockquote + figcaption) so the quote and its source are announced
 * together. The Carousel dims and aria-hides neighbours, so this stays clean;
 * `index` only feeds the decorative corner numeral.
 */
export function QuoteSlide({
  tag,
  text,
  tone,
  index,
}: Verbatim & { index: number }) {
  const positive = tone === 'positive'
  const numeral = String(index + 1).padStart(2, '0')
  return (
    <figure className="relative flex h-full flex-col justify-center px-3 py-5 md:px-8 lg:px-12">
      {/* Oversized opening-quote glyph, bled off the top-left as a graphic. */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -left-3 -top-8 select-none font-display text-numeral font-bold leading-none opacity-20',
          positive ? 'text-lime-bright' : 'text-teal-2',
        )}
      >
        &ldquo;
      </span>

      {/* Faint poster index numeral, bled off the top-right (PosterCard echo). */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-numeral font-bold leading-none text-plum-mist opacity-10"
      >
        {numeral}
      </span>

      <blockquote className="relative z-10 max-w-content text-balance">
        <p className="t-h3 italic text-white md:text-h2">{text}</p>
      </blockquote>

      <figcaption
        className={cn(
          't-mono-label relative z-10 mt-3',
          positive ? 'text-teal-2' : 'text-white opacity-70',
        )}
      >
        {tag}
      </figcaption>
    </figure>
  )
}
