import { useEffect, useRef, useState } from 'react'
import { COUNT_MS } from './motion'
import { easeOutCubic, lerp } from './format'
import { useReducedMotion } from './useReducedMotion'

/**
 * Count-up ticker (02 §6, 04 §4.3). Eases from 0 (or `from`) to `to` over the
 * `count` duration with cubic ease-out, driven by rAF, when `active` is true.
 * Under reduced motion it returns the final value immediately. Animation runs
 * outside React state per frame only through this hook's own setState, which is
 * acceptable for a single number; charts use transform-based fills instead.
 */
export function useCountUp(
  to: number,
  active: boolean,
  options: { from?: number; durationMs?: number; decimals?: number } = {},
): number {
  const { from = 0, durationMs = COUNT_MS, decimals = 0 } = options
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced ? to : from)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (reduced) {
      setValue(to)
      return
    }
    if (!active) return

    const factor = Math.pow(10, decimals)
    const round = (n: number) => Math.round(n * factor) / factor

    function tick(now: number) {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const t = Math.min(1, elapsed / durationMs)
      setValue(round(lerp(from, to, easeOutCubic(t))))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      startRef.current = null
    }
  }, [to, active, from, durationMs, decimals, reduced])

  return value
}
