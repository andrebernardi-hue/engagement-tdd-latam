import { color } from '@/styles/tokens'

/**
 * Pure-CSS stand-in for the hero shader (04-MOTION-DATAVIZ §3, perf §5). Lives
 * in its own module with NO three.js import, so it can be imported statically as
 * the Suspense fallback while <HeroField/> stays in the lazy WebGL chunk. The
 * radial-gradient uses the same brand stops as the shader, so there is no pop
 * when the canvas swaps in.
 */
export function HeroFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(120% 120% at 32% 38%, ${color.limeBright} 0%, ${color.teal} 24%, ${color.plumDeep} 58%, ${color.paper} 100%)`,
      }}
    />
  )
}
