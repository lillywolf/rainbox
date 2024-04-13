attribute vec3 aPosition;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

uniform float corners[12];

void main() {
  // GLuint vbo;
  // glGenBuffers(1, &vbo);
  // glBindBuffer(GL_ARRAY_BUFFER, vbo);
  // glBufferData(GL_ARRAY_BUFFER, 12, corners, GL_STATIC_DRAW);

  // GLuint vao;
  // glGenVertexArrays(1, &vao);
  // glBindVertexArray(vao);

  // GLuint ebo;
  // glGenBuffers(1, &ebo);

  // GLuint elements[] = {
  //   0, 1, 2,
  //   2, 3, 4,
  //   4, 5, 6,
  //   6, 7, 0
  // };

  // glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, ebo);
  // glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(elements), elements, GL_STATIC_DRAW);

  // glDrawElements(GL_TRIANGLES, 12, GL_UNSIGNED_INT, 0);

  vec4 positionVec4 = vec4(aPosition, 1.0);
  
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
