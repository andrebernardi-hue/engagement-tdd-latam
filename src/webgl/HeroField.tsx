/**
 * HeroField — the signature hero shader (04 §3, 01-TECH-SETUP §5).
 *
 * A single full-bleed plane with a custom fragment shader: a slow living field
 * that embodies dilution — a dense saturated core (lime + teal over plum.deep)
 * concentrated at one off-center node, dispersing outward into the paper
 * background. uScroll disperses it further as the user scrolls out of the hero.
 *
 * Performance contract:
 *   - One WebGL context only.
 *   - DPR capped at 2 via <Canvas dpr={[1, 2]}>.
 *   - Render loop pauses when offscreen (IntersectionObserver -> frameloop).
 *   - Reduced motion: a single static frame, no animation.
 *
 * Lazy-loaded by the hero chapter via React.lazy (default export). The named
 * `HeroFallback` is the matching CSS-gradient Suspense fallback so there is no
 * visual pop on hydration.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { color } from '@/styles/tokens'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { cn } from '@/lib/cn'

import vertexShader from './shaders/hero.vert'
import fragmentShader from './shaders/hero.frag'

/** A single static uTime value used for the frozen reduced-motion frame. */
const STATIC_TIME = 12.0

interface FieldPlaneProps {
  progressRef?: React.MutableRefObject<number>
  reducedMotion: boolean
}

/**
 * The shader plane. Scaled every frame to exactly fill the orthographic
 * viewport, so it stays full-bleed across any aspect ratio or resize. All
 * per-frame work writes to uniform refs — never to React state.
 */
function FieldPlane({ progressRef, reducedMotion }: FieldPlaneProps): JSX.Element {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const { size, viewport, invalidate } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: reducedMotion ? STATIC_TIME : 0 },
      uScroll: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(size.width, size.height),
      },
      // Soft, low-contrast palette that blends into paper (no dark blob, no
      // harsh green): a lavender body, a faint sage accent, a pale lift at the
      // core. Highlight is a token-derived pale lavender (mist lerped to paper).
      uColorBase: { value: new THREE.Color(color.plumMist) },
      uColorMid: { value: new THREE.Color(color.tealMist) },
      uColorHi: {
        value: new THREE.Color(color.plumMist).lerp(new THREE.Color(color.paper), 0.5),
      },
      uColorPaper: { value: new THREE.Color(color.paper) },
    }),
    // Colors and the static-frame seed are stable; resolution is updated in an
    // effect below so we intentionally build this once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reducedMotion],
  )

  // Keep resolution uniform in sync with canvas size (aspect correction).
  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height)
    invalidate()
  }, [size.width, size.height, uniforms, invalidate])

  // Fill the orthographic viewport with the plane.
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(viewport.width, viewport.height, 1)
    }
    invalidate()
  }, [viewport.width, viewport.height, invalidate])

  useFrame((state) => {
    const material = materialRef.current
    if (!material) return

    if (!reducedMotion) {
      // Low-frequency drift driven by the clock (seconds).
      material.uniforms.uTime.value = state.clock.elapsedTime
    }

    // Read scroll progress from the ref (0..1); never via React state.
    const progress = progressRef?.current ?? 0
    material.uniforms.uScroll.value = THREE.MathUtils.clamp(progress, 0, 1)
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

export interface HeroFieldProps {
  /**
   * Scroll-out progress, 0..1. Read inside useFrame to feed uScroll so the
   * field disperses as the hero leaves the viewport. Updated outside React.
   */
  progressRef?: React.MutableRefObject<number>
  className?: string
}

/**
 * HeroField — R3F canvas wrapper. Full-bleed, orthographic, single context.
 */
export default function HeroField({ progressRef, className }: HeroFieldProps): JSX.Element {
  const reducedMotion = useReducedMotion()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)

  // Pause the render loop when the canvas is offscreen (perf, 01 §5). With
  // reduced motion we never run the loop continuously — a single demand frame
  // is enough for the frozen static field.
  useEffect(() => {
    const node = wrapperRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const frameloop: 'always' | 'demand' | 'never' = reducedMotion
    ? 'demand'
    : inView
      ? 'always'
      : 'never'

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={cn('absolute inset-0 size-full', className)}
    >
      <Canvas
        dpr={[1, 2]}
        frameloop={frameloop}
        orthographic
        camera={{ position: [0, 0, 1], near: 0.1, far: 10, zoom: 1 }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <FieldPlane progressRef={progressRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}

/**
 * HeroFallback — static CSS radial-gradient Suspense fallback using the SAME
 * soft stops (pale lavender -> plum mist -> sage -> paper) as the shader, so the
 * lazy canvas swaps in without a visual pop. Inline hexes come from tokens.
 */
export function HeroFallback({ className }: { className?: string }): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0 size-full', className)}
      style={{
        backgroundColor: color.paper,
        backgroundImage: `radial-gradient(95% 85% at 40% 55%, ${color.plumMist} 0%, ${color.tealMist} 34%, ${color.paper} 72%)`,
      }}
    />
  )
}
