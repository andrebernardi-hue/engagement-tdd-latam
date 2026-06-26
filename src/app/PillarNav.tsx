import { useRef } from 'react'
import { PILLARS } from '@/content/chapters'
import { useActiveChapter } from '@/app/useActiveChapter'
import { useScrollTo, useScrollProgress } from '@/app/ScrollProvider'
import { cn } from '@/lib/cn'

/**
 * PillarNav — persistent top navigation (02-DESIGN-SYSTEM §5.2, 04 §2).
 *
 * A sticky, full-width bar that exposes the storytelling pillars (PILLARS) as
 * anchors. It is near-transparent over the hero and condenses on every content
 * scene: it gains a translucent paper backdrop with a hairline bottom border
 * and reduces height. The active pillar is highlighted via the shared scroll-spy
 * (useActiveChapter); clicking smooth-scrolls there via Lenis (useScrollTo).
 *
 * A thin plum progress bar pinned at the very top reads total scroll progress.
 * It is driven outside React: useScrollProgress writes scaleX straight to a
 * ref'd element's style on every scroll event, so the 60fps budget is never
 * spent on re-renders. transform-origin is left so the bar grows rightward.
 *
 * Motion: only transform/opacity animate. The condense transition uses the
 * brand ease over the quick duration. Reduced motion is handled globally (the
 * index.css brake) and by the shared scroll/spy hooks.
 */
export function PillarNav() {
  const { activeId } = useActiveChapter()
  const scrollTo = useScrollTo()
  const progressRef = useRef<HTMLDivElement>(null)

  // Write progress straight to the DOM — no React state, no re-render.
  useScrollProgress((p) => {
    const el = progressRef.current
    if (el) el.style.transform = `scaleX(${Math.min(Math.max(p, 0), 1)})`
  })

  const condensed = activeId !== 'hero'

  return (
    <>
      {/* Thin top progress bar (plum). h-0.5 = 4px (spec allows ~3px). */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-progress h-0.5 bg-paper-2"
      >
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-plum"
        />
      </div>

      <nav
        aria-label="Capítulos"
        className={cn(
          'fixed inset-x-0 top-0 z-nav flex w-full items-center justify-between gap-3',
          'px-3 transition-all duration-quick ease-brand',
          condensed
            ? 'glass-bar h-8'
            : 'h-12 border-b border-transparent bg-transparent',
        )}
      >
        {/* Wordmark (text only, no logo asset). */}
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          aria-label="Voltar à abertura"
          className="t-mono-label shrink-0 font-bold tracking-eyebrow text-plum"
        >
          TELUS&nbsp;&middot;&nbsp;Design&nbsp;LATAM
        </button>

        <ul className="flex items-center gap-0.5 sm:gap-1.5">
          {PILLARS.map((pillar) => {
            const isActive = pillar.id === activeId
            return (
              <li key={pillar.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(pillar.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    't-mono-label relative inline-flex items-center gap-0.5 px-1 py-0.5',
                    'transition-colors duration-quick ease-brand',
                    isActive
                      ? 'font-bold text-plum'
                      : 'text-muted hover:text-plum-ink',
                  )}
                >
                  {/* Active dot — the focal mark, in lime. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'size-0.5 shrink-0 rounded-pill bg-lime transition-transform duration-quick ease-brand',
                      isActive ? 'scale-100' : 'scale-0',
                    )}
                  />
                  <span className="hidden sm:inline">{pillar.num}</span>
                  <span>{pillar.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
