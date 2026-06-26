import { useState, type FormEvent, type ReactNode } from 'react'
import { Button } from '@/components/primitives/Button'
import { cn } from '@/lib/cn'

/** The passkey that unlocks the experience. */
const PASSKEY = 'insper-2026!'
/** sessionStorage flag so an unlock survives refreshes within the same tab session. */
const UNLOCKED_KEY = 'telus-case:unlocked'

/**
 * A client-side gate. While locked, only the centered passkey form is rendered —
 * the chapter content never mounts, so nothing is readable in the DOM until the
 * correct passkey is entered.
 *
 * Note: this is a soft lock for a static front-end. The content still ships in
 * the JS bundle, so it deters casual viewers but is not server-grade security.
 */
export function PasskeyGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(UNLOCKED_KEY) === '1',
  )
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return <>{children}</>

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (value === PASSKEY) {
      sessionStorage.setItem(UNLOCKED_KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
    }
  }

  return (
    <main className="bloom-paper flex min-h-screen items-center justify-center bg-paper px-6">
      <form
        onSubmit={handleSubmit}
        className="glass glass-plum w-full max-w-sm rounded-2xl p-8"
      >
        <label htmlFor="passkey" className="t-mono-label block text-center text-plum">
          insert passkey
        </label>
        <input
          id="passkey"
          type="password"
          autoFocus
          autoComplete="off"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError(false)
          }}
          aria-invalid={error}
          className={cn(
            'mt-5 w-full rounded-lg border bg-paper-card px-4 py-3 text-center font-mono text-body text-plum-ink',
            'outline-none transition-colors',
            error ? 'border-red' : 'border-line focus:border-plum',
          )}
        />
        {error && (
          <p className="mt-3 text-center font-mono text-eyebrow text-red">
            Incorrect passkey
          </p>
        )}
        <Button type="submit" variant="solid" className="mt-5 w-full">
          Enter
        </Button>
      </form>
    </main>
  )
}
