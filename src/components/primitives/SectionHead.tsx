import { type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Eyebrow } from './Eyebrow'
import { ChapterNum } from './ChapterNum'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

/**
 * The chapter header (02 §7.1, 04 §2): chapter number, eyebrow, H2 title, and
 * an optional lead. Entrance staggers the lines up by ~70ms. The heading gets a
 * stable id so the SectionShell can reference it via aria-labelledby.
 *
 * Pass tone="invert" on dark scenes so the title and lead read in white.
 */
export function SectionHead({
  id,
  num,
  eyebrow,
  title,
  lead,
  tone = 'paper',
  align = 'left',
  className,
}: {
  /** Heading id, matching the SectionShell's labelledBy. */
  id: string
  num?: string
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  tone?: 'paper' | 'invert'
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <RevealGroup
      amount={0.07}
      className={cn(
        'flex flex-col gap-1.5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {num && (
        <RevealItem>
          <ChapterNum tone={tone}>{num}</ChapterNum>
        </RevealItem>
      )}
      <RevealItem>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </RevealItem>
      <RevealItem>
        <h2
          id={id}
          className={cn('t-h2 max-w-content', tone === 'invert' && 'text-white')}
        >
          {title}
        </h2>
      </RevealItem>
      {lead && (
        <RevealItem>
          <p
            className={cn(
              't-lead max-w-content',
              tone === 'invert' && 'text-white opacity-80',
            )}
          >
            {lead}
          </p>
        </RevealItem>
      )}
    </RevealGroup>
  )
}

/** A standalone eyebrow + reveal, when a sub-block needs a labelled divider. */
export function BlockHead({
  eyebrow,
  title,
  tone = 'paper',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  tone?: 'paper' | 'invert'
  className?: string
}) {
  return (
    <Reveal className={cn('flex flex-col gap-1', className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h3 className={cn('t-h3', tone === 'invert' && 'text-white')}>{title}</h3>
    </Reveal>
  )
}
