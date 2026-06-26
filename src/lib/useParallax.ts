import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll-linked parallax (ui-animation): drifts an element on the Y axis as its
 * section travels through the viewport, adding depth to the section-to-section
 * transition. GSAP ScrollTrigger is bound to Lenis in ScrollProvider, so this
 * scrubs against the smooth scroll. Transform-only; `will-change` is toggled on
 * for the element's lifetime and cleared on unmount. Disabled under reduced
 * motion (the element renders static).
 *
 * `speed` is the fraction of the element's height it drifts each direction
 * (e.g. 0.06 = ±6%). Keep the element oversized (slack on top/bottom) so the
 * drift never reveals an edge. By default the element's parent is the trigger.
 */
export function useParallax(
  ref: RefObject<HTMLElement>,
  options: { speed?: number } = {},
) {
  const reduced = useReducedMotion()
  const speed = options.speed ?? 0.06

  useEffect(() => {
    const el = ref.current
    if (reduced || !el) return

    const pct = speed * 100
    el.style.willChange = 'transform'
    const tween = gsap.fromTo(
      el,
      { yPercent: -pct },
      {
        yPercent: pct,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      el.style.willChange = ''
    }
  }, [ref, reduced, speed])
}
