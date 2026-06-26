import { useEffect, useRef } from 'react'
import { CHAPTERS } from '@/content/chapters'
import { useActiveChapter } from './useActiveChapter'
import { useScrollTo } from './ScrollProvider'

/**
 * Keyboard chapter navigation. Arrow keys (and PageUp/PageDown) step between
 * chapters one at a time, scrolling there via the smooth-scroll provider so the
 * motion is the same gentle Lenis glide as clicking a pillar or rail node.
 *
 *  - Down / Right / PageDown → next chapter
 *  - Up / Left / PageUp      → previous chapter
 *
 * Guards: ignores key repeats while typing in a field or contentEditable, and
 * ignores modifier combos (so browser shortcuts still work). A ref tracks the
 * target index so rapid presses advance correctly before the scroll-spy catches
 * up. Under reduced motion the provider's scrollTo falls back to an instant jump.
 */
export function useChapterKeys() {
  const { activeIndex } = useActiveChapter()
  const scrollTo = useScrollTo()
  const idxRef = useRef(activeIndex)

  useEffect(() => {
    idxRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return
      const t = e.target as HTMLElement | null
      if (
        t &&
        (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))
      ) {
        return
      }

      let dir = 0
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        dir = 1
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        dir = -1
      } else {
        return
      }

      const next = Math.min(CHAPTERS.length - 1, Math.max(0, idxRef.current + dir))
      if (next !== idxRef.current) {
        e.preventDefault()
        idxRef.current = next
        scrollTo(CHAPTERS[next].id)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [scrollTo])
}
