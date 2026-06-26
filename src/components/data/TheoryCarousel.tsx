import { Carousel } from '@/components/primitives'
import { TheoryCard } from './TheoryCard'
import { type TheoryCard as TheoryCardData } from '@/content/copy'

/**
 * TheoryCarousel (Chapter 04) — the six framework lenses as a full-bleed peeking
 * deck. A thin wrapper over the shared Carousel: fixed-height slides (every lens
 * the same size) rendered as poster TheoryCards, with the previous / next lenses
 * peeking to the viewport edges.
 */
const STAGE_HEIGHT = 'clamp(24rem, 58vh, 32rem)'

export function TheoryCarousel({
  cards,
  className,
}: {
  cards: TheoryCardData[]
  className?: string
}) {
  return (
    <Carousel
      className={className}
      items={cards}
      getKey={(card) => card.id}
      itemLabel={(card, i) => `Lente ${i + 1} de ${cards.length}: ${card.title}`}
      ariaLabel="Seis lentes teóricas sobre a operação sob tensão"
      stageHeight={STAGE_HEIGHT}
      cardVw={0.66}
      maxCard={1180}
      prevLabel="Anterior"
      nextLabel="Próximo"
      renderItem={(card, i) => (
        <TheoryCard card={card} index={i} total={cards.length} className="h-full" />
      )}
    />
  )
}
