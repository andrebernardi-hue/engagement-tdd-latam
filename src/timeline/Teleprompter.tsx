import { useCallback, useEffect, useState } from 'react'

import { SEGMENTS, TOTAL_SECONDS, activeIndex, fmt } from './segments'
import { useStopwatch } from './useStopwatch'

/**
 * Teleprompter (hidden /timeline.html).
 *
 * A fullscreen, black-and-white presenter view for the 25-minute talk. The big
 * running clock owns the LEFT; the RIGHT shows the active beat's succinct bullets.
 * The active beat follows the clock automatically; the speaker drives it with the
 * keyboard (Space play/pause, ← → skip beats, R reset, F fullscreen) or the
 * on-screen controls.
 */
export default function Teleprompter() {
  const { elapsed, running, toggle, reset, seek } = useStopwatch()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const i = activeIndex(elapsed)
  const seg = SEGMENTS[i]
  const next = SEGMENTS[i + 1]

  const segRemaining = seg.end - elapsed
  const segProgress = Math.min(1, Math.max(0, (elapsed - seg.start) / (seg.end - seg.start)))
  const overall = Math.min(1, elapsed / TOTAL_SECONDS)
  const overtime = elapsed - TOTAL_SECONDS
  const ending = running && segRemaining <= 10 && elapsed < TOTAL_SECONDS

  // Skip to the previous beat (or restart the current one if we're past its start).
  const prevBeat = useCallback(() => {
    if (elapsed - seg.start > 3 || i === 0) seek(seg.start)
    else seek(SEGMENTS[i - 1].start)
  }, [elapsed, i, seg.start, seek])

  // Skip to the next beat (or jump to the end on the last beat).
  const nextBeat = useCallback(() => {
    seek(next ? next.start : TOTAL_SECONDS)
  }, [next, seek])

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void document.documentElement.requestFullscreen()
  }, [])

  // Keep the button label in sync when fullscreen is toggled or exited (e.g. via Esc).
  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    document.addEventListener('webkitfullscreenchange', onChange)
    return () => {
      document.removeEventListener('fullscreenchange', onChange)
      document.removeEventListener('webkitfullscreenchange', onChange)
    }
  }, [])

  // Keyboard transport. Buttons keep focus off so Space doesn't double-fire.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault()
          toggle()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextBeat()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prevBeat()
          break
        case 'KeyR':
          reset()
          break
        case 'KeyF':
          toggleFullscreen()
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle, nextBeat, prevBeat, reset, toggleFullscreen])

  return (
    <div className="tp">
      <main className="tp__grid">
        {/* LEFT — the running clock, front and centre. */}
        <section className="tp__left">
          <p className="tp__bloco">{seg.blocoLabel}</p>

          <div className={`tp__clock${running ? '' : ' is-paused'}`}>
            <time className="tp__elapsed">{fmt(elapsed)}</time>
            <span className="tp__total">/ {fmt(TOTAL_SECONDS)}</span>
          </div>

          <div className="tp__bar tp__bar--overall" aria-hidden>
            <span style={{ transform: `scaleX(${overall})` }} />
          </div>

          <div className={`tp__seg-remaining${ending ? ' is-ending' : ''}`}>
            <span className="tp__seg-remaining-num">{fmt(Math.max(0, segRemaining))}</span>
            <span className="tp__seg-remaining-label">restam neste bloco</span>
          </div>
          <div className="tp__bar tp__bar--seg" aria-hidden>
            <span style={{ transform: `scaleX(${segProgress})` }} />
          </div>

          {overtime > 0 && <p className="tp__overtime">+{fmt(overtime)} acima de 25:00</p>}

          <div className="tp__controls">
            <button type="button" className="tp__btn" onClick={prevBeat} aria-label="Bloco anterior">
              ‹
            </button>
            <button type="button" className="tp__btn tp__btn--wide" onClick={toggle}>
              {running ? 'Pausar' : 'Iniciar'}
            </button>
            <button type="button" className="tp__btn" onClick={nextBeat} aria-label="Próximo bloco">
              ›
            </button>
            <button type="button" className="tp__btn" onClick={reset} aria-label="Zerar">
              ↺
            </button>
          </div>

          <button
            type="button"
            className="tp__btn tp__btn--fs"
            onClick={toggleFullscreen}
            aria-pressed={isFullscreen}
          >
            {isFullscreen ? '⤢ Sair da tela cheia' : '⛶ Entrar em tela cheia'}
          </button>

          <p className="tp__hint">
            <kbd>Espaço</kbd> iniciar/pausar &nbsp;·&nbsp; <kbd>←</kbd> <kbd>→</kbd> blocos
            &nbsp;·&nbsp; <kbd>R</kbd> zerar &nbsp;·&nbsp; <kbd>F</kbd> tela cheia
          </p>
        </section>

        {/* RIGHT — the active beat's succinct bullets. */}
        <section className="tp__right">
          {seg.alarm && <p className="tp__alarm">⏱ {seg.alarm}</p>}

          <header className="tp__head">
            <p className="tp__range">
              {fmt(seg.start)}–{fmt(seg.end)}
              {seg.cut && <span className="tp__cut">corte se faltar tempo</span>}
            </p>
            <h1 className="tp__title">{seg.title}</h1>
            {seg.screen && <p className="tp__screen">Na tela · {seg.screen}</p>}
          </header>

          <ul className="tp__bullets">
            {seg.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          {next && (
            <footer className="tp__next">
              A seguir · {next.title} <span>· {fmt(next.start)}</span>
            </footer>
          )}
        </section>
      </main>
    </div>
  )
}
