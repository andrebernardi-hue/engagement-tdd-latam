import { useEffect, useRef, useState } from 'react'

/**
 * Fires once when an element crosses a visibility threshold, via
 * IntersectionObserver (never a scroll listener, per perf budget 01 §5).
 * Returns a ref to attach and a boolean that flips true once and stays true.
 * Used by charts and reveals to trigger their one-shot animation.
 */
export function useInViewOnce<T extends Element = HTMLDivElement>(
  amount = 0.25,
): { ref: React.RefObject<T>; inView: boolean } {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: amount },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [amount, inView])

  return { ref, inView }
}
