import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A running-clock stopwatch for the teleprompter. Counts UP in seconds from 0,
 * matching the script's "relógio (tempo corrido)". Time is accumulated against
 * `performance.now()` so it stays accurate regardless of the tick rate, and the
 * displayed value refreshes a few times per second.
 *
 * Controls: start / pause / toggle / reset / seek(absolute seconds).
 */
export interface Stopwatch {
  /** Elapsed seconds (fractional). */
  elapsed: number
  running: boolean
  start: () => void
  pause: () => void
  toggle: () => void
  reset: () => void
  /** Jump the clock to an absolute second offset (kept >= 0). */
  seek: (seconds: number) => void
}

export function useStopwatch(): Stopwatch {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)

  // Accumulated seconds at the moment the clock was last started/seeked, and the
  // performance.now() baseline it counts from. Refs so the rAF loop reads fresh
  // values without re-subscribing.
  const baseRef = useRef(0)
  const startedAtRef = useRef(0)
  const runningRef = useRef(false)
  const rafRef = useRef<number>()

  const tick = useCallback(() => {
    if (!runningRef.current) return
    const now = performance.now()
    setElapsed(baseRef.current + (now - startedAtRef.current) / 1000)
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const start = useCallback(() => {
    if (runningRef.current) return
    runningRef.current = true
    startedAtRef.current = performance.now()
    setRunning(true)
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const pause = useCallback(() => {
    if (!runningRef.current) return
    baseRef.current += (performance.now() - startedAtRef.current) / 1000
    runningRef.current = false
    setRunning(false)
    setElapsed(baseRef.current)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  const toggle = useCallback(() => {
    if (runningRef.current) pause()
    else start()
  }, [pause, start])

  const reset = useCallback(() => {
    runningRef.current = false
    setRunning(false)
    baseRef.current = 0
    setElapsed(0)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  const seek = useCallback((seconds: number) => {
    const next = Math.max(0, seconds)
    baseRef.current = next
    startedAtRef.current = performance.now()
    setElapsed(next)
  }, [])

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  return { elapsed, running, start, pause, toggle, reset, seek }
}
