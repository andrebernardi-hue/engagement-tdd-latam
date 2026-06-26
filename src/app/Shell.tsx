import { type ReactNode } from 'react'
import { PillarNav } from './PillarNav'
import { StepRail } from './StepRail'
import { useChapterKeys } from './useChapterKeys'

/**
 * The persistent layout shell (02-DESIGN-SYSTEM §5). Three layers wrap every
 * chapter: the top PillarNav, the right-edge StepRail, and the scrollable
 * <main> that holds the full-viewport scenes. Both nav layers read the shared
 * useActiveChapter scroll-spy, so they never disagree.
 *
 * Mounted inside <ScrollProvider> (see App), so the nav/rail can use the scroll
 * context for anchor jumps and progress.
 */
export function Shell({ children }: { children: ReactNode }) {
  useChapterKeys()
  return (
    <>
      <PillarNav />
      <StepRail />
      <main id="main">{children}</main>
    </>
  )
}
