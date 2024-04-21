import { ProgramInfo } from "@/components/pixel-box/gl";
import { Point3D } from "@/types/geometry";
import { mat4 } from "gl-matrix";

export const position = (pt: Point3D, dimensions: Point3D) => {
  return {
    x: toFloat({ value: pt.x, range: dimensions.x }),
    y: toFloat({ value: pt.y, range: dimensions.y }),
    z: toFloat({ value: pt.z, range: dimensions.z }),
  };
};

export const toRGB = (rgb: [number, number, number]) => {
  return [
    toFloat({ value: rgb[0], range: 255 }),
    toFloat({ value: rgb[1], range: 255 }),
    toFloat({ value: rgb[2], range: 255 }),
  ];
};

const toFloat = ({ value, range }: { value: number, range: number }) => {
  return parseFloat((value / range).toFixed(12));
};

export const projection = ({width, height, depth}: {width: number, height: number, depth: number}) => {
  // this matrix flips the y axis so 0 is at the top
  return mat4.fromValues(
    2 / width, 0, 0, 0,
    0, -2 / height, 0, 0,
    0, 0, 2 / depth, 0,
    -1, 1, 0, 1,
  );
};

export const createVertexPositionBuffer = ({ vertices, gl }: {
  vertices: Array<number>,
  gl: WebGL2RenderingContext
}) => {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  return positionBuffer;
}

export const createColorBuffer = ({ colors, gl }: {
  colors: Array<number>,
  gl: WebGL2RenderingContext
}) => {
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

export const createIndexPositionBuffer = ({ indices, gl }: {
  indices: Array<number>;
  gl: WebGL2RenderingContext;
}) => {
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  return indexBuffer;
}

export const setVertexPositionAttribute = ({ buffer, programInfo, gl }: {
  programInfo: ProgramInfo;
  buffer: WebGLBuffer;
  gl: WebGL2RenderingContext;
}) => {
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    3,
    gl.FLOAT,
    normalize,
    stride,
    offset,
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

export const setVertexColorAttribute = ({ buffer, programInfo, gl }: {
  programInfo: ProgramInfo;
  buffer: WebGLBuffer;
  gl: WebGL2RenderingContext;
}) => {
  const normalize = false; 
  const stride = 0;
  const offset = 0;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexColor,
    3,
    gl.FLOAT,
    normalize,
    stride,
    offset,
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export const createPerspectiveMatrix = ({
  fieldOfViewInRadians,
  aspectRatio,
  near,
  far,
}: {
  fieldOfViewInRadians: number;
  aspectRatio: number;
  near: number;
  far: number;
}) => {
  const f = 1.0 / Math.tan(fieldOfViewInRadians / 2);
  const rangeInv = 1 / (near - far);

  return mat4.fromValues(
    f / aspectRatio,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (near + far) * rangeInv,
    -1,
    0,
    0,
    near * far * rangeInv * 2,
    0,
  );
};
