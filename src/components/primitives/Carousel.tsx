import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { animate, motion, useMotionValue, type PanInfo } from 'motion/react'
import { cn } from '@/lib/cn'
import { Button } from './Button'
import { duration, easeBezier } from '@/lib/motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * Carousel — the single peeking-carousel engine (one implementation per pattern,
 * 02 §9). The active item is centered and the previous / next items peek in from
 * the left and right; the stage is full-bleed (100vw) so the peek reaches the
 * viewport edges. Drive it by drag/swipe, Prev/Next buttons, or dots; a mono
 * "03 / 06" counter reports progress.
 *
 * Item widths are measured (ResizeObserver) for responsiveness. Pass a
 * `stageHeight` for a fixed-height deck (every slide identical, e.g. the theory
 * lenses); omit it for variable-height slides that size to their content (e.g.
 * an expandable debate card grows the stage). Motion is transform/opacity only,
 * expo-out, ~0.6s.
 *
 * Keyboard: the app's global Arrow keys jump *chapters*; this never adds a window
 * listener. The viewport is focusable and handles ArrowLeft/Right only while
 * focused, calling stopPropagation() so it does not bubble to the chapter nav.
 * Reduced motion: drag off, the track jumps instantly, all slides reachable via
 * buttons/dots. `renderItem` receives `isActive` so a slide can disable its own
 * interactions while it is a peeking neighbor; `onActiveChange` fires on every
 * page change (e.g. to collapse an expanded card when navigating away).
 */
const GAP = 24 // px — matches gap-3 (spacing token 3 = 24px)
const expoOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

export interface CarouselProps<T> {
  items: T[]
  getKey: (item: T, index: number) => string
  renderItem: (item: T, index: number, isActive: boolean) => ReactNode
  itemLabel: (item: T, index: number) => string
  ariaLabel: string
  /** Card width as a fraction of the viewport (default 0.7). */
  cardVw?: number
  /** Card width cap in px (default 1180). */
  maxCard?: number
  /** Fixed slide height (e.g. 'clamp(...)'); omit for content-sized slides. */
  stageHeight?: string
  /** Fires whenever the active index changes (and on mount). */
  onActiveChange?: (index: number) => void
  /** Control styling: 'paper' (dark controls) or 'invert' (light controls for dark scenes). */
  tone?: 'paper' | 'invert'
  prevLabel?: string
  nextLabel?: string
  className?: string
}

export function Carousel<T>({
  items,
  getKey,
  renderItem,
  itemLabel,
  ariaLabel,
  cardVw = 0.7,
  maxCard = 1180,
  stageHeight,
  onActiveChange,
  tone = 'paper',
  prevLabel = 'Anterior',
  nextLabel = 'Próximo',
  className,
}: CarouselProps<T>) {
  const invert = tone === 'invert'
  const reduceMotion = useReducedMotion()
  const baseId = useId()
  const [page, setPage] = useState(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [metrics, setMetrics] = useState({ w: 0, card: 0 })
  const x = useMotionValue(0)
  const inited = useRef(false)

  const count = items.length
  const slot = metrics.card + GAP
  const centerX = metrics.w / 2 - metrics.card / 2
  const offsetFor = useCallback((i: number) => centerX - i * slot, [centerX, slot])

  useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      const card = Math.min(maxCard, Math.round(w * cardVw))
      setMetrics({ w, card })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [cardVw, maxCard])

  useEffect(() => {
    if (metrics.w === 0) return
    const target = offsetFor(page)
    if (reduceMotion || !inited.current) {
      x.set(target)
      inited.current = true
      return
    }
    const controls = animate(x, target, { duration: 0.6, ease: expoOut })
    return () => controls.stop()
  }, [page, metrics.w, offsetFor, reduceMotion, x])

  useEffect(() => {
    onActiveChange?.(page)
  }, [page, onActiveChange])

  const paginate = useCallback(
    (next: number) => setPage(Math.max(0, Math.min(count - 1, next))),
    [count],
  )
  const goPrev = useCallback(() => paginate(page - 1), [paginate, page])
  const goNext = useCallback(() => paginate(page + 1), [paginate, page])

  const onDragEnd = useCallback(
    (_event: unknown, info: PanInfo) => {
      if (metrics.w === 0) return
      const projected = x.get() + info.velocity.x * 0.2
      paginate(Math.round((centerX - projected) / slot))
    },
    [centerX, slot, paginate, x, metrics.w],
  )

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.stopPropagation()
      event.preventDefault()
      if (event.key === 'ArrowRight') goNext()
      else goPrev()
    },
    [goNext, goPrev],
  )

  const numeral = String(page + 1).padStart(2, '0')
  const total = String(count).padStart(2, '0')

  return (
    <div
      className={cn('flex flex-col gap-4', className)}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        ref={viewportRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-live={reduceMotion ? 'polite' : 'off'}
        className="full-bleed relative overflow-hidden"
      >
        <motion.ul
          className="flex items-start gap-3 px-3"
          style={{ x }}
          drag={reduceMotion ? false : 'x'}
          dragConstraints={{ left: offsetFor(count - 1), right: offsetFor(0) }}
          dragElastic={0.12}
          onDragEnd={reduceMotion ? undefined : onDragEnd}
        >
          {items.map((item, i) => {
            const isActive = i === page
            return (
              <motion.li
                key={getKey(item, i)}
                className={cn(
                  'shrink-0',
                  reduceMotion ? '' : 'cursor-grab active:cursor-grabbing',
                )}
                style={{ width: metrics.card || undefined, height: stageHeight }}
                animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.94 }}
                transition={{ duration: duration.base, ease: easeBezier.brand }}
                role="group"
                aria-roledescription="slide"
                aria-label={itemLabel(item, i)}
                aria-hidden={isActive ? undefined : true}
              >
                {renderItem(item, i, isActive)}
              </motion.li>
            )
          })}
        </motion.ul>
      </div>

      <div className="mx-auto flex w-full max-w-content items-center justify-between gap-3">
        <Button
          variant={invert ? 'outlineDark' : 'outline'}
          onClick={goPrev}
          disabled={page === 0}
          aria-label={prevLabel}
        >
          <span aria-hidden>{'←'}</span>
          <span aria-hidden>{prevLabel}</span>
        </Button>

        <div className="flex flex-col items-center gap-1.5">
          <span
            className={cn('t-mono-value', invert ? 'text-white' : 'text-plum')}
            aria-hidden
          >
            {numeral} / {total}
          </span>
          <ul className="flex items-center gap-1" role="group" aria-label="Escolher um slide">
            {items.map((item, i) => {
              const selected = i === page
              return (
                <li key={getKey(item, i)}>
                  <button
                    type="button"
                    id={`${baseId}-dot-${i}`}
                    aria-current={selected ? 'true' : undefined}
                    aria-label={itemLabel(item, i)}
                    onClick={() => paginate(i)}
                    className={cn(
                      'h-1 rounded-pill transition-all duration-quick ease-brand',
                      selected
                        ? invert
                          ? 'w-3 bg-white'
                          : 'w-3 bg-plum'
                        : invert
                          ? 'w-1 bg-white/40 hover:bg-white'
                          : 'w-1 bg-plum-mist hover:bg-plum',
                    )}
                  />
                </li>
              )
            })}
          </ul>
        </div>

        <Button
          variant={invert ? 'outlineDark' : 'outline'}
          onClick={goNext}
          disabled={page === count - 1}
          aria-label={nextLabel}
        >
          <span aria-hidden>{nextLabel}</span>
          <span aria-hidden>{'→'}</span>
        </Button>
      </div>
    </div>
  )
}
