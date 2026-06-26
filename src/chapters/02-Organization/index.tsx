import { CHAPTERS } from '@/content/chapters'
import { organization } from '@/content/copy'
import { offices } from '@/content/case'
import {
  SectionShell,
  SectionHead,
  DividerLabel,
  Panel,
  Chip,
  Reveal,
  RevealGroup,
  RevealItem,
} from '@/components/primitives'
import { RingNest, Timeline, StatCardGrid } from '@/components/data'

/**
 * Chapter 02 · The Organization (paper scene).
 *
 * Establishes the context: a 41-person Design LATAM cell nested inside a global
 * body of 140,000. Three editorial blocks fill the viewport with strong rhythm:
 *
 *  A · Structure — the intro prose and the LATAM office scope (mono chip row)
 *      sit beside the RingNest dilution visual, with ringCaption beneath it.
 *  B · Timeline — the three integrations (2021 / 2022 / 2025), the
 *      timelineBody prose paired with the drawing Timeline.
 *  C · Financial health — the financialsBody prose, the StatCardGrid count-ups,
 *      and the closing line that pivots the case from money to people.
 *
 * All copy comes from `organization`, all data from the data components' own
 * sources. Motion is delegated to <Reveal> / <RevealGroup> and to the data
 * components, which animate themselves in view.
 */

const chapter = CHAPTERS.find((c) => c.id === 'organization')!

export default function Organization() {
  return (
    <SectionShell id={chapter.id} tone="paper" labelledBy="organization-head">
      <div className="flex flex-col gap-8">
        <SectionHead
          id="organization-head"
          num={chapter.num}
          eyebrow={organization.eyebrow}
          title={organization.headline}
          tone="paper"
        />

        {/* Block A — structure: intro + office scope beside the RingNest. */}
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Reveal>
              <p className="t-lead max-w-content text-plum-ink">
                {organization.intro}
              </p>
            </Reveal>

            <RevealGroup
              as="ul"
              className="flex flex-wrap items-center gap-1"
              amount={0.4}
            >
              <RevealItem as="li">
                <span className="t-mono-label font-bold text-muted">
                  4 escritórios · 3 países
                </span>
              </RevealItem>
              {offices.map((office) => (
                <RevealItem as="li" key={office.city}>
                  <Chip tone={office.joined ? 'lime' : 'plum'}>
                    {office.city} · {office.code}
                    {office.joined ? ` · ${office.joined}` : ''}
                  </Chip>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal className="flex flex-col gap-2">
            <RingNest />
            <p className="t-body text-muted">{organization.ringCaption}</p>
          </Reveal>
        </div>

        {/* Block B — timeline: three integrations and the scale-up cost. */}
        <div className="flex flex-col gap-4">
          <Reveal>
            <DividerLabel>Linha do tempo · Três integrações</DividerLabel>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <p className="t-body max-w-content text-plum-ink">
                {organization.timelineBody}
              </p>
            </Reveal>
            <Reveal>
              <Panel tone="card" pad="lg">
                <Timeline />
              </Panel>
            </Reveal>
          </div>
        </div>

        {/* Block C — financial health: the numbers, then the people pivot. */}
        <div className="flex flex-col gap-4">
          <Reveal>
            <DividerLabel>Saúde financeira</DividerLabel>
          </Reveal>
          <Reveal>
            <p className="t-body max-w-content text-plum-ink">
              {organization.financialsBody}
            </p>
          </Reveal>

          <StatCardGrid />

          <Reveal>
            <p className="t-h3 max-w-content text-plum-ink">
              {organization.financialsClosing}
            </p>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  )
}
