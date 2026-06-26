import { useCallback, useState } from 'react'
import { Carousel } from '@/components/primitives'
import { DebateCard } from './DebateCard'
import { type DebateCard as DebateCardData } from '@/content/copy'

/**
 * DebateCarousel (Chapter 06) — the four debate prompts as a full-bleed peeking
 * deck of poster cards. A thin wrapper over the shared Carousel that owns the
 * one-open-at-a-time disclosure state.
 *
 * No `stageHeight`: slides size to their content, so the active card grows when
 * its lenses are revealed while the neighbors keep peeking at collapsed height.
 * `openIndex` tracks which card is open; navigating away (onActiveChange)
 * collapses it, and only the active card is interactive — a peeking neighbor's
 * toggle is inert and the card stays closed.
 */
export function DebateCarousel({
  cards,
  className,
}: {
  cards: DebateCardData[]
  className?: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Collapse any open card whenever the carousel pages to a new slide.
  const handleActiveChange = useCallback(() => setOpenIndex(null), [])

  return (
    <Carousel
      className={className}
      items={cards}
      getKey={(card) => card.num}
      itemLabel={(card, i) => `Pergunta ${i + 1} de ${cards.length}: ${card.theme}`}
      ariaLabel="Quatro perguntas para abrir o debate"
      cardVw={0.6}
      maxCard={1180}
      prevLabel="Anterior"
      nextLabel="Próximo"
      onActiveChange={handleActiveChange}
      renderItem={(card, i, isActive) => (
        <DebateCard
          card={card}
          index={i}
          total={cards.length}
          open={isActive && openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          interactive={isActive}
        />
      )}
    />
  )
}
