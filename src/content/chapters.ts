/**
 * Chapter metadata: the narrative spine (00-PROJECT-BRIEF §4).
 * PillarNav and StepRail both render from this single ordered list, so they can
 * never disagree on order, label, or anchor id.
 */

export type ChapterTone = 'paper' | 'invert' | 'shader'

export interface Chapter {
  /** DOM id / scroll anchor. */
  id: string
  /** Two-digit prefix shown in the rail and nav. */
  num: string
  /** Short label for the pillar nav and rail chip. */
  label: string
  /** Background register for the scene. */
  tone: ChapterTone
  /** Order index, 0-based. */
  order: number
}

export const CHAPTERS: Chapter[] = [
  { id: 'hero', num: '00', label: 'Abertura', tone: 'shader', order: 0 },
  { id: 'intro', num: '01', label: 'Introdução', tone: 'paper', order: 1 },
  { id: 'organization', num: '02', label: 'Organização', tone: 'paper', order: 2 },
  { id: 'problem', num: '03', label: 'O Problema', tone: 'invert', order: 3 },
  { id: 'analysis', num: '04', label: 'Análise', tone: 'paper', order: 4 },
  { id: 'solution', num: '05', label: 'Solução', tone: 'paper', order: 5 },
  { id: 'discussion', num: '06', label: 'Discussão', tone: 'paper', order: 6 },
  { id: 'close', num: '—', label: 'Encerramento', tone: 'invert', order: 7 },
]

/** The pillars exposed in the top nav (the named story chapters, 00-06). */
export const PILLARS = CHAPTERS.filter((c) => c.id !== 'close')

export const CHAPTER_IDS = CHAPTERS.map((c) => c.id)
export type ChapterId = (typeof CHAPTERS)[number]['id']
