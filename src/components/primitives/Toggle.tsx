import { tv } from 'tailwind-variants'
import { cn } from '@/lib/cn'

/**
 * Segmented toggle group (02 §7.1) for chart mode switches, e.g. the
 * DivergingBars Favorable% / Gap-vs-Company / Gap-vs-LATAM selector. Fully
 * keyboard-operable with a lime focus ring; the active option is filled plum.
 */
const option = tv({
  base: 'rounded-pill px-2 py-0.5 font-mono text-monolabel font-bold uppercase transition-colors duration-quick ease-brand',
  variants: {
    active: {
      true: 'bg-plum text-white',
      false: 'text-muted hover:text-plum-ink',
    },
  },
})

export interface ToggleOption<T extends string> {
  id: T
  label: string
}

export function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: {
  options: ToggleOption<T>[]
  value: T
  onChange: (id: T) => void
  ariaLabel: string
  className?: string
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-pill border border-line bg-paper-2 p-0.5',
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.id === value
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={option({ active })}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
