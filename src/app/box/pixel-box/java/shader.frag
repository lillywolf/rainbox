precision mediump float;
uniform vec3 color;

void main() {
  vec3 pt = gl_FragCoord.xyz;

  gl_FragColor = vec4(color, 1.0); // 1.0 is our alpha;
}
