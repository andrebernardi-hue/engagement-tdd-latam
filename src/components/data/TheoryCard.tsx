import { PosterCard, Chip } from '@/components/primitives'
import { type TheoryCard as TheoryCardData } from '@/content/copy'

/**
 * Framework lens card (02 §7.2, 04 §4.12) — a poster-grade deck card for Chapter
 * 04's swipeable carousel. Built on the shared PosterCard: the class label as a
 * teal mono eyebrow, the lens title in the left column, the body in the right
 * column, the underlying frameworks as a tidy row of mono chips in the foot, and
 * a large faint "01".."06" numeral anchoring the composition.
 *
 * All six share one skeleton so they read as a single deck; they differ only by
 * content and the numeral. Static: the carousel owns all motion.
 */
export function TheoryCard({
  card,
  index,
  total = 6,
  className,
}: {
  card: TheoryCardData
  /** 0-based position in the deck; rendered as the big "01".."06" numeral. */
  index: number
  total?: number
  className?: string
}) {
  const numeral = String(index + 1).padStart(2, '0')

  return (
    <PosterCard
      className={className}
      numeral={numeral}
      eyebrow={card.classLabel}
      counter={`${numeral} / ${String(total).padStart(2, '0')}`}
      title={card.title}
      body={card.body}
      footer={
        card.chips.length > 0 ? (
          <ul className="flex flex-wrap gap-1">
            {card.chips.map((chip) => (
              <li key={chip}>
                <Chip tone="plum">{chip}</Chip>
              </li>
            ))}
          </ul>
        ) : undefined
      }
    />
  )
}
