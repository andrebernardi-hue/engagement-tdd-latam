/**
 * Number and string formatting helpers (01-TECH-SETUP §3).
 * Centralized so every stat renders identically across the app.
 *
 * Locale is Brazilian Portuguese (pt-BR): decimal comma, thousands point. The
 * d3 default locale is configured here so every d3-format call across the app
 * groups and decimals the pt-BR way without per-call options.
 */

import { format, formatDefaultLocale } from 'd3-format'

// pt-BR number locale: "," decimal, "." thousands. Currency is unused by the
// formatters below (prefixes like "US$ " come from the data), but d3 requires
// the field, so a neutral pair is provided.
formatDefaultLocale({
  decimal: ',',
  thousands: '.',
  grouping: [3],
  currency: ['', ''],
})

const intFmt = format(',d')

/** "140.000" — grouped integer (pt-BR thousands point). */
export function formatInt(n: number): string {
  return intFmt(Math.round(n))
}

/** "40" or "40%" — a favorable / percentage value. */
export function formatPct(n: number, withSign = false): string {
  return `${Math.round(n)}${withSign ? '%' : ''}`
}

/** "2,8" / "13,7" — a decimal with a pt-BR decimal comma. */
export function formatDecimal(n: number, decimals = 1): string {
  return format(`,.${decimals}f`)(n)
}

/** "+4" / "-34" — a signed gap value. */
export function formatGap(n: number): string {
  return n > 0 ? `+${n}` : `${n}`
}

/** Clamp a number into [min, max]. */
export function clamp(n: number, min: number, max: number): string | number {
  return Math.max(min, Math.min(max, n))
}

/** Linear-interpolate a count-up value at progress t in [0,1]. */
export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t
}

/** Cubic ease-out, for count-up tickers. */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}
