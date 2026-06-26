// Hero field — fragment shader.
//
// Concept (04 §3): a slow living field embodying dilution. A dense, saturated
// core (lime + teal over plum.deep) sits at one OFF-CENTER node and disperses
// outward into the paper background, as if a concentrated identity diffuses
// into a vast neutral body. Organic, quiet, never busy.
//
// Technique: layered 2D simplex noise (fractal, 3 octaves) warps a radial
// field. The radius drives a four-stop gradient blend
//   plum.deep (base) -> teal (mid) -> lime.bright (hi)  ... then dissolved
// into paper toward the edges by a soft radial mask. uScroll (0..1) pushes the
// node and the dissolve further out as the user scrolls away from the hero,
// reinforcing the metaphor. All animation is driven by uTime at low frequency.

precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform float uScroll;     // 0 at rest, 1 fully scrolled out — disperses the field
uniform vec2  uResolution; // canvas size in device px (for aspect correction)

uniform vec3 uColorBase;   // plum.deep
uniform vec3 uColorMid;    // teal
uniform vec3 uColorHi;     // lime.bright
uniform vec3 uColorPaper;  // paper

// ---------------------------------------------------------------------------
// 2D simplex noise — Ashima / Stefan Gustavson, self-contained (no includes).
// Returns roughly [-1, 1].
// ---------------------------------------------------------------------------
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                          + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                          dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x  = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Fractal (fBm) — three octaves of simplex, gently drifting.
float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 3; i++) {
    sum += amp * snoise(p * freq);
    freq *= 2.0;
    amp *= 0.5;
  }
  return sum;
}

void main() {
  // Aspect-correct UVs centered at the off-center node so the field reads as a
  // circular bloom rather than an ellipse on wide viewports.
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = vUv;
  uv.x *= aspect;

  // Node on the RIGHT side of the scene (the thesis text sits on the left). It
  // wanders slowly over time so the field feels alive, then drifts toward the
  // upper-right as the user scrolls out.
  vec2 node = vec2(0.74 * aspect, 0.50);
  node += vec2(sin(uTime * 0.13) * 0.05, cos(uTime * 0.10) * 0.06);
  node += normalize(vec2(0.5, 0.4)) * uScroll * 0.24;

  vec2 d = uv - node;

  // Living, low-frequency animation. Two layers of warp at different scales so
  // the field breathes organically.
  float t = uTime * 0.11;
  vec2 warp = vec2(
    fbm(uv * 1.6 + vec2(t, -t * 0.7)),
    fbm(uv * 1.6 + vec2(-t * 0.8 + 4.2, t + 1.7))
  );

  // Radius from the node, perturbed by the warp so the boundary is irregular
  // and visibly in motion.
  float radius = length(d) + warp.x * 0.22 + warp.y * 0.06;

  // A second, finer noise field adds texture inside the core.
  float grain = fbm(uv * 3.1 + warp * 0.5 + t * 0.5);

  // Concentration falls off with radius; scroll widens the falloff (disperses).
  float spread = mix(0.34, 0.62, uScroll);
  float core = 1.0 - smoothstep(0.0, spread, radius);

  // Soft two-tone bloom (low contrast): a lavender body with a faint sage
  // interleave modulated by grain, lifting to a pale rim glow near the core.
  // All stops are light tints close to paper, so the field reads as a gentle
  // wash and keeps dark headline text legible over it.
  vec3 field = uColorBase; // plum mist (soft lavender)
  float sage = smoothstep(0.1, 0.95, core) * (0.32 + 0.30 * grain);
  field = mix(field, uColorMid, clamp(sage, 0.0, 1.0)); // faint sage accent
  float hiMix = smoothstep(0.6, 1.0, core) * 0.55;
  field = mix(field, uColorHi, clamp(hiMix, 0.0, 1.0)); // pale lift at the core

  // Soft radial mask: dissolve the whole field into paper toward the edges.
  // The mask edge is feathered by the warp so it never reads as a ring. Capped
  // below 1 so even the core stays a translucent wash, not a solid blob.
  float mask = 1.0 - smoothstep(spread * 0.5, spread * 1.6, radius);
  mask *= mix(0.88, 0.28, uScroll); // gentle presence; fades as user scrolls out
  mask = clamp(mask + warp.y * 0.04, 0.0, 1.0);

  vec3 col = mix(uColorPaper, field, mask);

  // A faint, very slow luminance shimmer keeps the surface alive at rest.
  col += (grain * 0.008) * mask;

  gl_FragColor = vec4(col, 1.0);
}
