import { Carousel } from '@/components/primitives'
import { verbatims, type Verbatim } from '@/content/copy'
import { QuoteSlide } from './QuoteCard'

/**
 * QuoteCarousel — the four employee verbatims as poster-style pull-quotes in the
 * shared peeking Carousel, for the dark diagnosis scene (Chapter 03, "In their
 * words"). Reuses the single carousel engine; it never builds its own track.
 *
 * The quotes are short, so the deck runs at a fixed `stageHeight` — every slide
 * is the same height and the peeking neighbours align cleanly. Slides are wide
 * (cardVw 0.6, capped) so the large italic quote breathes. `QuoteSlide` renders
 * each verbatim as integrated typography on the plum.deep field (no card box);
 * the Carousel dims and aria-hides the neighbours automatically.
 */
export function QuoteCarousel() {
  return (
    <Carousel<Verbatim>
      items={verbatims}
      getKey={(quote) => quote.text}
      itemLabel={(_quote, i) => `Citação ${i + 1} de ${verbatims.length}`}
      ariaLabel="Falas dos colaboradores no diagnóstico"
      cardVw={0.66}
      maxCard={1180}
      stageHeight="clamp(24rem, 58vh, 32rem)"
      tone="invert"
      prevLabel="Anterior"
      nextLabel="Próximo"
      renderItem={(quote, i) => <QuoteSlide {...quote} index={i} />}
    />
  )
}
