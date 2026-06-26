import { cn } from '@/lib/cn'
import { formatGap } from '@/lib/format'
import { stagger } from '@/lib/motion'
import { useInViewOnce } from '@/lib/useInViewOnce'
import { Chip } from '@/components/primitives'
import { AnimatedBar, ValueLabel } from '@/components/viz'
import { sayStayStriveItems, type SssCategory } from '@/content/case'
import { problem } from '@/content/copy'
import { color } from '@/styles/tokens'

/**
 * SayStayStrive (04 §4.6, Chapter 03) on the inverted diagnosis scene. Six
 * survey rows grouped by the Say / Stay / Strive category, each with the
 * favorable bar, the mono favorable number, and the gap right-aligned. Rows
 * arrive ordered favorable-descending from content, so the read slides from Say
 * to Stay/Strive.
 *
 * DARK ART DIRECTION: every chip is one consistent dark frosted pill (invert
 * tone), colour-coded by category through an AA-on-plum text tone — SAY white,
 * STAY teal2, STRIVE lime.bright. Question text is white/80. The favorable bar
 * is the primary/neutral read, so it fills in a light lavender (plumMist) over a
 * translucent track, with a white readout; the gap is red.soft. Bars fill
 * staggered top to bottom once ~28% in view, on the shared AnimatedBar engine.
 */

/** Category -> chip text tone on dark (the dark pill ground is shared). */
const CATEGORY_TEXT: Record<SssCategory, string> = {
  SAY: 'text-white',
  STAY: 'text-teal-2',
  STRIVE: 'text-lime-bright',
}

export function SayStayStrive({ className }: { className?: string }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.28)

  return (
    <div ref={ref} className={cn('flex flex-col gap-3', className)}>
      <ul className="flex flex-col gap-2.5">
        {sayStayStriveItems.map((item, i) => (
          <li
            key={item.question}
            className="grid grid-cols-12 items-center gap-x-2 gap-y-1"
          >
            {/* Category chip — shared dark pill, category-tinted text. */}
            <div className="col-span-3 sm:col-span-2">
              <Chip tone="invert" className={CATEGORY_TEXT[item.category]}>
                {item.category}
              </Chip>
            </div>

            {/* Question */}
            <p className="t-body col-span-9 leading-tight text-white opacity-80 sm:col-span-4">
              {item.question}
            </p>

            {/* Favorable bar — primary/neutral light fill on a translucent track. */}
            <div className="col-span-9 flex items-center gap-1.5 sm:col-span-4">
              <AnimatedBar
                value={item.value}
                tone="plum"
                fillColor={color.plumMist}
                onDark
                active={inView}
                delay={i * stagger.loose}
                trackClassName="flex-1"
              />
              <ValueLabel className="w-4 text-right tabular-nums text-white">
                {item.value}
              </ValueLabel>
            </div>

            {/* Signed gap, right-aligned in red.soft */}
            <div className="col-span-3 text-right sm:col-span-2">
              <ValueLabel tone="redSoft" className="tabular-nums">
                {formatGap(item.gap)}
              </ValueLabel>
            </div>
          </li>
        ))}
      </ul>

      <p className="t-body text-white opacity-70">{problem.sayStayStriveCaption}</p>
    </div>
  )
}
