import { useEffect, useState } from 'react'
import { CHAPTERS } from '@/content/chapters'

/**
 * Shared scroll-spy (02-DESIGN-SYSTEM §5.3, 04 §2). PillarNav and StepRail both
 * read this one hook so they can never disagree on the active chapter. Uses a
 * single IntersectionObserver with a viewport-midline rootMargin (never a
 * scroll listener, per perf budget 01 §5); React state changes only when the
 * active chapter changes, which is infrequent.
 */
export function useActiveChapter(): { activeId: string; activeIndex: number } {
  const [activeId, setActiveId] = useState<string>(CHAPTERS[0].id)

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (sections.length === 0) return

    // A section is "active" while it straddles the viewport midline.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id) setActiveId(id)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const activeIndex = Math.max(
    0,
    CHAPTERS.findIndex((c) => c.id === activeId),
  )
  return { activeId, activeIndex }
}
