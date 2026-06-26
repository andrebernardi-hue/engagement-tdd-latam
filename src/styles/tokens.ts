/**
 * TypeScript mirror of the design tokens defined in `tailwind.config.js`.
 *
 * This is the single source of truth for any JS/TS consumer that cannot read a
 * Tailwind class: d3 scales, SVG fills, and WebGL/GLSL uniforms. If a value
 * changes here it must change in `tailwind.config.js` too (02-DESIGN-SYSTEM §9,
 * 01-TECH-SETUP §4). Never inline a hex or px literal in a component; import it
 * from here instead.
 */

export const color = {
  plum: '#4B286D',
  plumDeep: '#2A1640',
  plumInk: '#1C1426',
  /** Soft lavender haze: the hero field bloom and plum-tinted glass. */
  plumMist: '#C9B6DB',
  paper: '#F2F1EB',
  paper2: '#EAE8DF',
  paperCard: '#FBFAF6',
  lime: '#7FBF2E',
  limeBright: '#8CD211',
  /** Lime is illegible as text on paper; this darker tone meets WCAG AA (4.7:1). */
  limeText: '#4C770F',
  teal: '#1E9E72',
  teal2: '#3FBE8A',
  /** Teal #1E9E72 fails AA as text on paper (3.0:1); this darker tone passes (5.0:1). */
  tealText: '#147552',
  /** Soft sage haze: the hero field cool accent and teal-tinted glass. */
  tealMist: '#BCD9CC',
  red: '#C53A2B',
  redSoft: '#E08A7E',
  amber: '#E4B53C',
  muted: '#6A6275',
  white: '#FFFFFF',
} as const

/** Semantic aliases. Components reference meaning, not raw hue (02 §2). */
export const semantic = {
  primary: color.plum,
  accent: color.lime,
  positive: color.teal,
  positive2: color.teal2,
  negative: color.red,
  negativeSoft: color.redSoft,
  warning: color.amber,
  surfacePage: color.paper,
  surfaceCard: color.paperCard,
  surfaceInvert: color.plumDeep,
  textOnPaper: color.plumInk,
  textMuted: color.muted,
} as const

export const line = {
  default: 'rgba(28,20,38,.12)',
  strong: 'rgba(28,20,38,.22)',
} as const

/** Engagement benchmark bands, 0-100 (02 §2, 03-CONTENT). */
export const benchmarkBands = [
  { from: 0, to: 60, label: 'Lower', color: color.red },
  { from: 60, to: 77, label: 'Moderate', color: color.amber },
  { from: 77, to: 100, label: 'Top', color: color.plum },
] as const

/** 8pt spacing scale, in px (02 §4). */
export const space = {
  0: 0,
  0.5: 4,
  1: 8,
  1.5: 12,
  2: 16,
  2.5: 18,
  3: 24,
  4: 30,
  5: 38,
  6: 46,
  8: 64,
  12: 92,
} as const

export const radius = {
  chip: 7,
  card: 16,
  pill: 999,
} as const

export const font = {
  display: '"Space Grotesk", Inter, sans-serif',
  body: 'Inter, system-ui, sans-serif',
  mono: '"Space Mono", monospace',
} as const

export type ColorToken = keyof typeof color
