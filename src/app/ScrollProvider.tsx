import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import Snap from 'lenis/snap'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { CHAPTERS } from '@/content/chapters'

gsap.registerPlugin(ScrollTrigger)

/**
 * The single scroll source (01-TECH-SETUP §5, 04 §2). Lenis drives smooth
 * scroll; GSAP ScrollTrigger subscribes to it so timeline-scrubs and the
 * scroll-spy share one source of truth. Under reduced motion, smoothing is
 * disabled entirely and anchor jumps become instant.
 *
 * Consumers:
 *  - useScrollTo() for anchor navigation (PillarNav, StepRail).
 *  - useScrollProgress(cb) to read 0..1 progress per scroll event WITHOUT a
 *    React re-render (the top progress bar and rail line fill write to refs).
 */
interface ScrollContextValue {
  lenis: Lenis | null
  scrollTo: (target: string | number, offset?: number) => void
  /** Subscribe to scroll progress; returns an unsubscribe fn. */
  onProgress: (cb: (progress: number) => void) => () => void
}

const ScrollContext = createContext<ScrollContextValue | null>(null)

/**
 * Expo-out easing: a fast, decisive start that settles cleanly. Used for both
 * wheel smoothing and anchor/keyboard jumps so a "slide change" feels crisp and
 * performative rather than slow (ui-animation: full-viewport move, ~0.8s).
 */
const expoOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

/** Duration (s) for an anchor / keyboard jump between chapters. */
const JUMP_DURATION = 0.85

function windowProgress(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return max > 0 ? window.scrollY / max : 0
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const subscribers = useRef(new Set<(p: number) => void>())

  useEffect(() => {
    const emit = (p: number) => subscribers.current.forEach((cb) => cb(p))

    // Reduced motion: no Lenis smoothing. Track native scroll for progress and
    // keep ScrollTrigger working off the native scroller.
    if (reduced) {
      const onScroll = () => emit(windowProgress())
      window.addEventListener('scroll', onScroll, { passive: true })
      ScrollTrigger.refresh()
      emit(windowProgress())
      return () => window.removeEventListener('scroll', onScroll)
    }

    const instance = new Lenis({
      duration: 0.9,
      easing: expoOut,
      smoothWheel: true,
    })
    setLenis(instance)

    instance.on('scroll', (e: { progress: number }) => {
      ScrollTrigger.update()
      emit(typeof e?.progress === 'number' ? e.progress : instance.progress ?? 0)
    })

    const raf = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Proximity snap: when the user stops scrolling near a section boundary, the
    // section's top snaps to the viewport top — a catchy "settle" that makes the
    // deck feel like slides, without trapping scroll inside the tall sections
    // (proximity only engages near a boundary, not mid-section).
    const snap = new Snap(instance, {
      type: 'proximity',
      duration: 0.6,
      easing: expoOut,
    })
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) snap.addElement(el, { align: ['start'] })
    })

    // Settle layout, then recalc triggers (handles font/async layout shifts).
    const settle = window.setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      window.clearTimeout(settle)
      snap.destroy()
      gsap.ticker.remove(raf)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  // Keep triggers correct on resize.
  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const value: ScrollContextValue = {
    lenis,
    scrollTo: (target, offset = 0) => {
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: JUMP_DURATION, easing: expoOut })
      } else {
        const el =
          typeof target === 'string' ? document.querySelector(target) : null
        if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
        else if (typeof target === 'number') window.scrollTo({ top: target })
      }
    },
    onProgress: (cb) => {
      subscribers.current.add(cb)
      return () => subscribers.current.delete(cb)
    },
  }

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}

export function useScroll(): ScrollContextValue {
  const ctx = useContext(ScrollContext)
  if (!ctx) throw new Error('useScroll must be used within ScrollProvider')
  return ctx
}

/** Convenience: scroll to a chapter id (prefixes '#'). */
export function useScrollTo(): (id: string) => void {
  const { scrollTo } = useScroll()
  return (id: string) => scrollTo(`#${id}`)
}

/**
 * Subscribe to scroll progress (0..1). The callback fires per scroll event;
 * write to a ref/DOM inside it, do not call setState, to keep 60fps.
 */
export function useScrollProgress(cb: (progress: number) => void): void {
  const { onProgress } = useScroll()
  const cbRef = useRef(cb)
  cbRef.current = cb
  useEffect(() => onProgress((p) => cbRef.current(p)), [onProgress])
}
