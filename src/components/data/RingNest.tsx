import { useId, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { duration, easeBezier, stagger } from '@/lib/motion'
import { useInViewOnce } from '@/lib/useInViewOnce'
import { color } from '@/styles/tokens'
import { Chip } from '@/components/primitives'
import { structureNesting, type NestRing } from '@/content/case'

/**
 * RingNest (04 §4.1, 02 §7.2) — the signature dilution visual for Chapter 02.
 *
 * Five concentric rings step from the ~140,000-person TELUS group (outer) down
 * to the 41-person Design LATAM operation (inner focal, lime with a soft glow).
 * Rings scale in from the OUTSIDE inward, staggered, so the eye lands last on
 * the 41 core. A right-side legend keyed by color carries entity + headcount.
 *
 * Light-surface block: plum-ink text, paper tracks, no SectionShell/SectionHead.
 * All data comes from `structureNesting`; all color from the token module.
 */

/* SVG geometry lives in viewBox units — these are coordinates, not Tailwind. */
const VIEW = 320
const CENTER = VIEW / 2
const OUTER_R = 150
const INNER_R = 34
const STROKE = 2
const FOCAL_STROKE = 3.5

/** Outer rings sit in muted plum tones; the focal core is lime. */
function ringColor(ring: NestRing): string {
  return ring.focal ? color.lime : color.plum
}

/**
 * Outer rings fade back so they read as containing context; each step inward
 * gains opacity, concentrating attention toward the core.
 */
function ringOpacity(index: number, total: number, focal?: boolean): number {
  if (focal) return 1
  return 0.28 + (index / (total - 1)) * 0.34
}

export function RingNest() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.28)
  const [hovered, setHovered] = useState<number | null>(null)
  const uid = useId().replace(/:/g, '')
  const glowId = `ringnest-glow-${uid}`

  const total = structureNesting.length
  // Evenly-stepped radii from outer to inner across the five rings.
  const step = (OUTER_R - INNER_R) / (total - 1)

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6"
    >
      {/* The nested rings ----------------------------------------------- */}
      <div className="relative w-full max-w-content shrink-0 md:w-1/2">
        <svg
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          className="h-auto w-full"
          role="img"
          aria-label="Anéis concêntricos mostrando o aninhamento organizacional, do grupo TELUS de cerca de 140 mil pessoas até a operação de Design da América Latina, de 41."
        >
          <defs>
            <filter
              id={glowId}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation={6} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {structureNesting.map((ring, index) => {
            const radius = OUTER_R - index * step
            const isHovered = hovered === index
            const baseOpacity = ringOpacity(index, total, ring.focal)
            // Stagger from the outside inward so the 41 core resolves last.
            const delay = index * stagger.loose

            return (
              <motion.g
                key={ring.entity}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : undefined}
                transition={{
                  duration: duration.base,
                  ease: easeBezier.brand,
                  delay,
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Focal halo: a soft, blurred lime glow behind the core ring. */}
                {ring.focal && (
                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={radius}
                    fill="none"
                    stroke={color.lime}
                    strokeWidth={FOCAL_STROKE + 3}
                    strokeOpacity={0.5}
                    filter={`url(#${glowId})`}
                  />
                )}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={radius}
                  fill="none"
                  stroke={isHovered ? color.plum : ringColor(ring)}
                  strokeWidth={ring.focal ? FOCAL_STROKE : STROKE}
                  strokeOpacity={isHovered ? 1 : baseOpacity}
                  style={{ transition: 'stroke 200ms, stroke-opacity 200ms' }}
                />
              </motion.g>
            )
          })}

          {/* Core count, anchored dead-center inside the focal ring. */}
          <motion.text
            x={CENTER}
            y={CENTER}
            textAnchor="middle"
            dominantBaseline="central"
            fill={color.limeText}
            fontFamily={'"Space Grotesk", Inter, sans-serif'}
            fontSize={26}
            fontWeight={700}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{
              duration: duration.base,
              ease: easeBezier.brand,
              delay: (total - 1) * stagger.loose + duration.quick,
            }}
          >
            41
          </motion.text>
        </svg>
      </div>

      {/* Legend keyed by ring color ------------------------------------- */}
      <ul className="flex w-full flex-col gap-1.5 md:w-1/2">
        {structureNesting.map((ring, index) => {
          const isHovered = hovered === index
          return (
            <motion.li
              key={ring.entity}
              className={cn(
                'flex items-center justify-between gap-2 rounded-chip border px-1.5 py-1 transition-colors duration-quick ease-brand',
                isHovered ? 'border-strong bg-paper-card' : 'border-line',
              )}
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{
                duration: duration.base,
                ease: easeBezier.brand,
                delay: index * stagger.loose,
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="flex items-center gap-1.5">
                <span
                  aria-hidden
                  className={cn(
                    'inline-block size-1 shrink-0 rounded-pill',
                    ring.focal ? 'bg-lime' : 'bg-plum',
                  )}
                  style={ring.focal ? undefined : { opacity: ringOpacity(index, structureNesting.length) }}
                />
                <span
                  className={cn(
                    't-body leading-tight text-plum-ink',
                    ring.focal && 'font-semibold',
                  )}
                >
                  {ring.entity}
                </span>
              </span>
              <Chip tone={ring.focal ? 'lime' : 'plum'} className="shrink-0 whitespace-nowrap">
                {ring.display}
              </Chip>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
