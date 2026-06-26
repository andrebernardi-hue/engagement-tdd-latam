import { type ReactNode, forwardRef, useRef } from 'react'
import { tv } from 'tailwind-variants'
import { cn } from '@/lib/cn'
import { useParallax } from '@/lib/useParallax'

/**
 * Full-viewport scene wrapper (02-DESIGN-SYSTEM §5.1). Every chapter renders
 * inside one: a min-h-screen w-screen scene with a centered 1120px column.
 * `tone` sets the background register; `shader` is paper-transparent so a fixed
 * WebGL/gradient layer can show through.
 *
 * The element is a <section aria-labelledby> for semantics (02 §8). Pass the id
 * of the SectionHead's heading as `labelledBy`.
 */
const shell = tv({
  base: 'relative flex min-h-screen w-full flex-col justify-center overflow-hidden',
  variants: {
    tone: {
      paper: 'bg-paper text-plum-ink',
      invert: 'bg-plum-deep text-white',
      shader: 'bg-transparent text-plum-ink',
    },
    pad: {
      // Section vertical rhythm: 92 desktop (02 §4).
      default: 'py-12',
      tight: 'py-8',
    },
  },
  defaultVariants: { tone: 'paper', pad: 'default' },
})

export interface SectionShellProps {
  id: string
  tone?: 'paper' | 'invert' | 'shader'
  pad?: 'default' | 'tight'
  labelledBy?: string
  className?: string
  /** Optional full-bleed background layer rendered behind the content column. */
  backdrop?: ReactNode
  children: ReactNode
}

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  function SectionShell(
    { id, tone, pad, labelledBy, className, backdrop, children },
    ref,
  ) {
    // Parallax depth on the ambient bloom: it drifts as the scene travels
    // through the viewport, so moving between sections reads with depth.
    const bloomRef = useRef<HTMLDivElement>(null)
    useParallax(bloomRef, { speed: 0.06 })
    return (
      <section
        ref={ref}
        id={id}
        aria-labelledby={labelledBy}
        data-chapter={id}
        data-tone={tone}
        className={cn(shell({ tone, pad }), className)}
      >
        {backdrop}
        {/* Ambient tinted bloom: gives the glass surfaces color to refract and
            ties every scene to the soft hero field. The shader scene supplies
            its own field, so it skips the bloom. */}
        {tone !== 'shader' && (
          <div
            ref={bloomRef}
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-x-0 -inset-y-12',
              tone === 'invert' ? 'bloom-invert' : 'bloom-paper',
            )}
          />
        )}
        {/* Slide frame: fills ~85% of a projector's width. Prose blocks inside
            still cap themselves at max-w-content for a readable measure. */}
        <div className="relative z-10 mx-auto w-full max-w-slide px-3 lg:px-6 xl:px-8">
          {children}
        </div>
      </section>
    )
  },
)
