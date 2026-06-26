import { CHAPTERS } from '@/content/chapters'
import { close } from '@/content/copy'
import { closeAssets, closeUrgency } from '@/content/case'
import {
  SectionShell,
  SectionHead,
  Panel,
  Pill,
  Reveal,
  RevealGroup,
  RevealItem,
} from '@/components/primitives'

/**
 * Close — the calm closing diagnosis that bookends the dilution-to-recovery
 * arc. An inverted scene (plum.deep) holding two groups: the assets worth
 * protecting (win pills) and the number-one urgency (alert pills), then a final
 * settle line and the source attribution footer.
 *
 * All copy comes from @/content/copy (`close`) and all data from
 * @/content/case (`closeAssets`, `closeUrgency`). Nothing is hardcoded.
 */

const CHAPTER = CHAPTERS.find((c) => c.id === 'close')!

export default function Close() {
  return (
    <SectionShell id={CHAPTER.id} tone="invert" labelledBy="close-head">
      <div className="flex flex-col gap-8">
        <SectionHead
          id="close-head"
          num={CHAPTER.num}
          eyebrow={CHAPTER.label}
          title="O que se sustenta, e o que corrigir primeiro."
          lead="A base mais difícil de construir, a confiança no gestor e nos colegas, ainda está de pé. É dela que o resto se reconstrói."
          tone="invert"
        />

        {/* The two diagnosis groups, side by side: protect what works, fix what hurts. */}
        <RevealGroup
          amount={0.12}
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
        >
          {/* Assets to protect */}
          <RevealItem>
            <Panel tone="invert" pad="lg" className="h-full">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-eyebrow font-bold uppercase tracking-eyebrow text-teal-2">
                    {close.assetsLabel}
                  </span>
                  <p className="t-mono-label text-white opacity-70">Manter acima da linha</p>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {closeAssets.map((asset) => (
                    <li key={asset} className="flex">
                      <Pill variant="win">{asset}</Pill>
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>
          </RevealItem>

          {/* Number-one urgency */}
          <RevealItem>
            <Panel tone="invert" pad="lg" className="h-full">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-eyebrow font-bold uppercase tracking-eyebrow text-red-soft">
                    {close.urgencyLabel}
                  </span>
                  <p className="t-mono-label text-white opacity-70">Agir aqui primeiro</p>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {closeUrgency.map((item) => (
                    <li key={item} className="flex">
                      <Pill variant="alert">{item}</Pill>
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>
          </RevealItem>
        </RevealGroup>

        {/* Final calm settle. */}
        <Reveal delay={0.15}>
          <p className="t-lead max-w-content text-white opacity-80">
            De cento e vinte para 140 mil, a identidade se diluiu. A volta está
            em reconstruir o vínculo com a instituição e tratar pessoas como o
            ativo central da mudança.
          </p>
        </Reveal>

        {/* Source / attribution footer. */}
        <Reveal delay={0.3}>
          <p className="t-mono-label max-w-content text-white opacity-70">
            {close.sourceNote}
          </p>
        </Reveal>
      </div>
    </SectionShell>
  )
}
