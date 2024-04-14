precision mediump float;
// uniform vec3 color;

varying lowp vec3 vColor;

void main() {
  gl_FragColor = vec4(vColor, 1.0); // 1.0 is our alpha;
}
