export const fragmentShader = `
varying vec3 vertexNormal;

uniform float atmOpacity;
uniform float atmPowFactor;
uniform float atmMultiplier;

void main() {
  float intensity = atmOpacity - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
  vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, atmPowFactor) * atmMultiplier;
  gl_FragColor = vec4(atmosphere, 1.0);
}
`
