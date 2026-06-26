import { SectionShell, SectionHead, DividerLabel, Reveal } from '@/components/primitives'
import { TheoryCarousel } from '@/components/data/TheoryCarousel'
import { analysis, theoryCards } from '@/content/copy'
import { CHAPTERS } from '@/content/chapters'

/**
 * Chapter 04 · Analysis Through Frameworks (paper scene).
 *
 * The diagnostic spine of the case: the operation under strain read through six
 * course frameworks (Aulas 2, 3, 5, 6, 7). Each lens is a poster `TheoryCard`,
 * and instead of a static grid the six lenses are now a swipeable deck the
 * viewer flips through one at a time via drag, Prev/Next, and position dots
 * (`TheoryCarousel`). It is imported directly, not through the data barrel.
 *
 * Copy and framework attributions come verbatim from `@/content/copy`; no number
 * or quote is restated here.
 */
const chapter = CHAPTERS.find((c) => c.id === 'analysis')!

export default function Analysis() {
  return (
    <SectionShell id={chapter.id} tone="paper" labelledBy="analysis-head">
      <div className="flex flex-col gap-6">
        <SectionHead
          id="analysis-head"
          num={chapter.num}
          eyebrow={analysis.eyebrow}
          title={analysis.headline}
          lead="Cada dor da operação mapeia para uma lente do curso de Gestão Estratégica de Pessoas. Juntas, as seis apontam uma raiz: uma cultura de boutique cobrada para operar em escala global antes de reancorar pessoas, carreiras e competências."
          tone="paper"
        />

        <Reveal>
          <DividerLabel>Seis lentes · Aulas 2, 3, 5, 6, 7</DividerLabel>
        </Reveal>

        <Reveal className="w-full">
          <TheoryCarousel cards={theoryCards} />
        </Reveal>
      </div>
    </SectionShell>
  )
}
