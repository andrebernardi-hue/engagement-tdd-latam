import {
  Reveal,
  SectionHead,
  SectionShell,
  DividerLabel,
} from '@/components/primitives'
import { DebateCarousel } from '@/components/data/DebateCarousel'
import { discussion, debateCards } from '@/content/copy'

/**
 * Chapter 06 · Discussion (paper scene).
 *
 * Closes the diagnosis by handing the room five real tensions instead of a
 * verdict. The SectionHead opens with the chapter number and headline; the
 * intro sets the rule ("there is no single answer"); the five debates ride a
 * full-bleed peeking CAROUSEL of poster cards. Each card leads with its question
 * (large and legible) and expands in place to reveal the two opposing lenses and
 * the data footnote — the chapter's primary motion. The carousel owns the
 * one-open-at-a-time state, so paging away collapses any open card.
 */
export default function Discussion() {
  return (
    <SectionShell id="discussion" tone="paper" labelledBy="discussion-head">
      <div className="flex flex-col gap-6">
        <SectionHead
          id="discussion-head"
          num="05"
          eyebrow={discussion.eyebrow}
          title={discussion.headline}
          tone="paper"
        />

        <Reveal>
          <p className="t-lead max-w-content text-muted">{discussion.intro}</p>
        </Reveal>

        <div className="flex flex-col gap-3">
          <DividerLabel>Os cinco debates</DividerLabel>
          <DebateCarousel cards={debateCards} />
        </div>
      </div>
    </SectionShell>
  )
}
