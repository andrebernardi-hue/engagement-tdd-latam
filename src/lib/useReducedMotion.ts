import { useSyncExternalStore } from 'react'

/**
 * The single source for `prefers-reduced-motion` (01-TECH-SETUP §5, 02 §8).
 * Every motion system reads this one flag: Lenis smoothing, GSAP scrubs,
 * count-ups, shader playback, and Framer reveals. Implemented with
 * useSyncExternalStore so it stays correct across concurrent renders and never
 * causes a hydration mismatch.
 */

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {}
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

function getSnapshot(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(QUERY).matches
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
