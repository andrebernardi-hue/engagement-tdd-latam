import { Reveal, DividerLabel } from '@/components/primitives'
import { problem } from '@/content/copy'

/**
 * CaveatPanel (04 §4.10) — the methodological-honesty block of Chapter 03,
 * rebuilt for the inverted scene.
 *
 * The old version was a card-inside-a-card with a dotted border. This is ONE
 * clean dark glass panel (.glass-dark): a clear header ("Read honestly", a
 * red.soft marker + mono label), an optional intro paragraph (the chapter passes
 * problem.methodologyBody), the four documented limits as a tidy list under ONE
 * consistent red.soft marker, then a single divider and the corroboration note
 * led by a teal.2 "However:". Sober and rigorous, light text, no nested box.
 *
 * The motion is deliberately calm: one <Reveal>, no per-item choreography. The
 * panel renders its own surface, so the chapter places it directly (not wrapped
 * in another Panel) — that is what keeps it a single clean box.
 */
export function CaveatPanel({ intro }: { intro?: string }) {
  const { caveatItems, caveatCorroboration } = problem

  return (
    <Reveal>
      <div className="glass-dark rounded-card p-5 text-white">
        <div className="flex flex-col gap-3">
          {/* Header: a red.soft marker + mono label. */}
          <div className="flex items-center gap-1.5">
            <span aria-hidden className="size-1 rounded-chip bg-red-soft" />
            <span className="t-mono-label font-bold text-red-soft">Leia com honestidade</span>
          </div>

          {/* Optional intro prose (the chapter supplies the methodology body). */}
          {intro && <p className="t-body max-w-content text-white opacity-80">{intro}</p>}

          {/* The four documented limits, ONE consistent marker each. */}
          <ul className="flex flex-col gap-2">
            {caveatItems.map((item) => (
              <li key={item} className="flex items-baseline gap-1.5">
                <span
                  aria-hidden
                  className="t-mono-value mt-0.5 leading-none text-red-soft"
                >
                  &minus;
                </span>
                <span className="t-body leading-snug text-white opacity-90">{item}</span>
              </li>
            ))}
          </ul>

          <DividerLabel tone="invert">Corroboração</DividerLabel>

          {/* Corroboration note with a teal.2 "However:" lead-in. */}
          <p className="t-body leading-snug text-white opacity-90">
            <span className="font-bold text-teal-2">Porém:</span> {caveatCorroboration}
          </p>
        </div>
      </div>
    </Reveal>
  )
}
