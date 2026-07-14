// Positions are computed and written on the CPU every frame (see ParticleSystem.tsx), so the
// vertex shader here only needs to size the point sprite by distance; the fragment shader
// draws a soft circular dot using the per-particle color/size attributes.

export const particleVertexShader = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;

  uniform float uPixelRatio;

  varying vec3 vColor;

  void main() {
    vColor = aColor;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float sizeAttenuation = 9.0 / max(-mvPosition.z, 0.001);
    gl_PointSize = aSize * sizeAttenuation * uPixelRatio;
    gl_Position = projectionMatrix * mvPosition;
  }
`

export const particleFragmentShader = /* glsl */ `
  uniform float uOpacity;

  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.05, d);
    if (alpha < 0.02) discard;

    gl_FragColor = vec4(vColor, alpha * uOpacity);
  }
`
