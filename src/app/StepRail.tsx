import { useRef } from 'react'
import { cn } from '@/lib/cn'
import { CHAPTERS } from '@/content/chapters'
import { useActiveChapter } from './useActiveChapter'
import { useScrollProgress, useScrollTo } from './ScrollProvider'

/**
 * Right-edge step rail (02-DESIGN-SYSTEM §5.3, 04 §2) — the "slider no canto
 * direito" André specified. A vertical stepper pinned to the right edge and
 * vertically centered, with one node per chapter connected by a line.
 *
 * Node state comes from the shared useActiveChapter scroll-spy (so PillarNav and
 * StepRail never disagree): the ACTIVE node is filled plum and enlarged,
 * COMPLETED nodes are filled at lower emphasis (teal), and UPCOMING nodes are
 * outlined. A subtle plum progress fill runs along the connecting line to show
 * position within the whole story — its scaleY is driven by useScrollProgress
 * straight to a ref (transform-origin top, no React state) to stay at 60fps.
 *
 * Each node reveals its chapter label as a mono chip to its left on hover, and
 * clicking a node scrolls to that chapter via useScrollTo. The lime focus ring
 * is handled globally (index.css).
 */
export function StepRail() {
  const { activeIndex } = useActiveChapter()
  const scrollTo = useScrollTo()
  const fillRef = useRef<HTMLSpanElement>(null)

  // Drive the connecting-line progress fill straight to the DOM. The callback
  // fires per scroll event; we only write a transform, never setState.
  useScrollProgress((progress) => {
    const el = fillRef.current
    if (el) el.style.transform = `scaleY(${Math.max(0, Math.min(1, progress))})`
  })

  return (
    <nav
      aria-label="Progresso dos capítulos"
      className="fixed right-0 top-1/2 z-rail hidden -translate-y-1/2 pr-3 lg:block"
    >
      <ol className="relative flex flex-col items-center gap-3">
        {/* Connecting line: static track + plum progress fill, behind the nodes.
            Spans node-center to node-center via symmetric vertical insets. */}
        <span
          aria-hidden
          className="bg-line pointer-events-none absolute inset-y-2 left-1/2 w-px -translate-x-1/2"
        >
          <span
            ref={fillRef}
            className="absolute inset-0 origin-top scale-y-0 bg-plum"
          />
        </span>

        {CHAPTERS.map((chapter, i) => {
          const isActive = i === activeIndex
          const isCompleted = i < activeIndex

          return (
            <li key={chapter.id} className="relative flex items-center">
              <button
                type="button"
                aria-label={`${chapter.num} ${chapter.label}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => scrollTo(chapter.id)}
                className="group relative flex items-center"
              >
                {/* Hover label chip, to the LEFT of the node. */}
                <span
                  className={cn(
                    't-mono-label glass glass-plum pointer-events-none absolute right-3 whitespace-nowrap rounded-pill px-1.5 py-0.5 text-plum-ink',
                    'translate-x-1 opacity-0 transition-all duration-quick ease-brand',
                    'group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100',
                    isActive && 'text-plum',
                  )}
                >
                  {chapter.label}
                </span>

                {/* The node dot. A fixed-size hit target wraps a dot that scales
                    and recolors per state over duration-quick. */}
                <span className="flex size-2.5 items-center justify-center">
                  <span
                    className={cn(
                      'block rounded-pill border transition-all duration-quick ease-brand',
                      isActive &&
                        'size-1.5 scale-110 border-plum bg-plum',
                      isCompleted &&
                        'size-1 border-teal bg-teal group-hover:border-plum',
                      !isActive &&
                        !isCompleted &&
                        'size-1 border-strong bg-transparent group-hover:border-plum',
                    )}
                  />
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
