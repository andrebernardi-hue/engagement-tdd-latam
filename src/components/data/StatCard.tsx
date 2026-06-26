import { cn } from '@/lib/cn'
import { useCountUp } from '@/lib/useCountUp'
import { useInViewOnce } from '@/lib/useInViewOnce'
import { formatDecimal } from '@/lib/format'
import { Panel, RevealGroup, RevealItem } from '@/components/primitives'
import { financials, type FinancialStat } from '@/content/case'

/**
 * StatCard — a single financial headline stat (02 §7.2, 04 §4.3).
 *
 * The big number counts up from zero to its target over the `count` duration
 * with cubic ease-out (via useCountUp), formatted as `prefix + value + suffix`
 * with the data's decimal precision. Variant drives the number color: `teal`
 * for the "healthy" stats (revenue, new clients), `plum` for the rest. The
 * label sits muted below it; the sub-note is mono lime-as-text.
 *
 * The card is a light card-tone Panel. The `active` flag (gated by the grid's
 * in-view state) starts the count-up; under reduced motion useCountUp renders
 * the final value immediately.
 */
export function StatCard({
  stat,
  active,
}: {
  stat: FinancialStat
  active: boolean
}) {
  const { value, prefix = '', suffix = '', decimals = 0, label, sub, variant } = stat

  const current = useCountUp(value, active, { decimals })
  // pt-BR decimal comma on the count-up display (e.g. "2,8", "13,7").
  const display = `${prefix}${formatDecimal(current, decimals)}${suffix}`

  return (
    <Panel
      tone="card"
      tint={variant === 'teal' ? 'teal' : 'plum'}
      pad="lg"
      className="flex h-full flex-col gap-1.5"
    >
      <span
        className={cn(
          't-stat tabular-nums leading-none',
          variant === 'teal' ? 'text-teal' : 'text-plum',
        )}
      >
        {display}
      </span>
      <span className="t-body text-muted">{label}</span>
      <span className="t-mono-label mt-auto text-lime-text">{sub}</span>
    </Panel>
  )
}

/**
 * StatCardGrid — renders every financial stat from the case data as a
 * responsive grid (2 columns on small, 4 on large). The whole grid shares one
 * in-view trigger: the count-ups fire once when ~28% of the grid is visible,
 * and the cards' reveals stagger via RevealGroup / RevealItem.
 */
export function StatCardGrid({ className }: { className?: string }) {
  const { ref, inView } = useInViewOnce(0.28)

  return (
    <div ref={ref} className={className}>
      <RevealGroup className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {financials.map((stat) => (
          <RevealItem key={stat.id} className="h-full">
            <StatCard stat={stat} active={inView} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  )
}
