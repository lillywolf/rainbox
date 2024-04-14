attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

varying lowp vec3 vColor;

void main() {
  vec4 positionVec4 = vec4(aVertexPosition, 1.0);
  
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
  vColor = aVertexColor;
}
