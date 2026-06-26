import { color } from '@/styles/tokens'

/**
 * Maps the semantic tone names used in case.ts to concrete hex values for SVG
 * fills and inline transform colors. This is the only bridge from data tone
 * strings to color; components never hardcode a hex (02 §9). Values come from
 * the token module, so a token change propagates here too.
 */
export type Tone =
  | 'plum'
  | 'plumDeep'
  | 'teal'
  | 'teal2'
  | 'red'
  | 'redSoft'
  | 'amber'
  | 'lime'
  | 'limeText'
  | 'muted'

export const toneColor: Record<Tone, string> = {
  plum: color.plum,
  plumDeep: color.plumDeep,
  teal: color.teal,
  teal2: color.teal2,
  red: color.red,
  redSoft: color.redSoft,
  amber: color.amber,
  lime: color.lime,
  limeText: color.limeText,
  muted: color.muted,
}

/**
 * Threshold coloring for a favorable % (04 §4.8): under 50 red, 50-65 a muted
 * plum tone, over 65 plum. Returned as a Tone for consistency.
 */
export function favorableTone(value: number): Tone {
  if (value < 50) return 'red'
  if (value <= 65) return 'muted'
  return 'plum'
}

/** Sign tone for a gap value: positive teal, negative red, zero muted. */
export function gapTone(value: number): Tone {
  if (value > 0) return 'teal'
  if (value < 0) return 'red'
  return 'muted'
}
