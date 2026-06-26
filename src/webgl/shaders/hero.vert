// Hero field — vertex shader.
// A full-bleed plane: we only need to forward the plane UVs (0..1) to the
// fragment stage. Geometry is a unit plane scaled to fill the viewport in JS,
// so no projection math is required here beyond the standard MVP transform.

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
