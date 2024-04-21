import { hslToRgb } from "@/constants/colors";
import { createColorBuffer, createIndexPositionBuffer, createVertexPositionBuffer, position, setVertexColorAttribute, setVertexPositionAttribute, toRGB } from '@/utils/gl';
import { PixelBoxGridGL } from './PixelBoxGridGL';
import { ProgramInfo } from "@/components/pixel-box/gl";
import PixelCube, { Corners, PixelCubeParams } from "./PixelCube";
import p5 from "p5";

export type PixelCubeGLParams =  PixelCubeParams & {
  grid: PixelBoxGridGL;
}

class PixelCubeGL extends PixelCube {
  grid;

  constructor({
    ...params
  }: PixelCubeGLParams) {
    super(params);

    this.grid = params.grid;
  }

  initializeCorners() {
    const s = this.spacing;
    const { r: br, t: bt, l: bl, b: bb } = this.bottom;
    const { r: tr, t: tt, l: tl, b: tb } = this.top;

    const ct = { x: tb.x + s, y: tb.y + s, z: tb.z - s }; // center top
    const cb = { x: tr.x + s, y: tr.y - s, z: tr.z - s }; // center bottom
    const lt = { x: bb.x + s, y: bb.y + s, z: bb.z + s }; // left top
    const rt = { x: tl.x - s, y: tl.y + s, z: tl.z - s }; // right top
    const lb = { x: br.x + s, y: br.y - s, z: br.z + s }; // left bottom
    const rb = { x: tt.x - s, y: tt.y - s, z: tt.z - s }; // right bottom
    const bt_ = { x: bl.x - s, y: bl.y + s, z: bl.z + s }; // back top
    const bb_ = { x: bt.x - s, y: bt.y - s, z: bt.z + s }; // back bottom

    return { ct, cb, lt, rt, lb, rb, bt: bt_, bb: bb_ };
  }

  boxGL({ vertices, colors }: { vertices: number[][], colors: Array<number> }) {
    const { gl, programInfo } = this.grid;
    
    // create a buffer with length 48f
    const vertexBuffer = createVertexPositionBuffer({ vertices: vertices.flat(), gl });
    const colorBuffer = createColorBuffer({ colors, gl });

    if (!vertexBuffer) {
      console.error('Failed to create vertex buffer');
      return;
    }

    if (!colorBuffer) {
      console.error('Failed to create color buffer');
      return;
    }
    
    const indices = [
      0, 1, 2, 0, 2, 3,
      4, 5, 6, 4, 6, 7,
      8, 9, 10, 8, 10, 11,
      12, 13, 14, 12, 14, 15,
      16, 17, 18, 16, 18, 19,
      20, 21, 22, 20, 22, 23,
    ];

    const indexBuffer = createIndexPositionBuffer({ indices, gl });

    setVertexPositionAttribute({ buffer: vertexBuffer, programInfo, gl });
    setVertexColorAttribute({ buffer: colorBuffer, programInfo, gl });

    // const colorLocation = gl.getUniformLocation(programInfo.program, 'color');
    // gl.uniform3fv(colorLocation, new Float32Array(toRGB(colors[0])));
    // gl.drawArrays(gl.TRIANGLES, 0, 4);

    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
  }

  getVertexData() {
    const dimensions = this.grid.getDimensions();
    
    const { ct, cb, lt, rt, rb, lb, bt, bb } = Object.entries(this.corners).reduce((acc, [ key, value ]) => {
      return {
        ...acc,
        [key]: position(value, dimensions),
      }
    }, {} as Corners);

    const verticesRight = [rb.x, rb.y, rb.z, bb.x, bb.y, bb.z, bt.x, bt.y, bt.z, rt.x, rt.y, rt.z];
    const verticesBack = [bt.x, bt.y, bt.z, bb.x, bb.y, bb.z, lb.x, lb.y, lb.z, lt.x, lt.y, lt.z];
    const verticesBottom = [lb.x, lb.y, lb.z, cb.x, cb.y, cb.z, rb.x, rb.y, rb.z, bb.x, bb.y, bb.z];
    const verticesLeft = [lb.x, lb.y, lb.z, cb.x, cb.y, cb.z, ct.x, ct.y, ct.z, lt.x, lt.y, lt.z];
    const verticesFront = [ct.x, ct.y, ct.z, cb.x, cb.y, cb.z, rb.x, rb.y, rb.z, rt.x, rt.y, rt.z];
    const verticesTop = [lt.x, lt.y, lt.z, ct.x, ct.y, ct.z, rt.x, rt.y, rt.z, bt.x, bt.y, bt.z];

    return [verticesRight, verticesBack, verticesBottom, verticesLeft, verticesFront, verticesTop];
  }

  getIndexData({ cubeIndex }: { cubeIndex: number }) {
    let i = cubeIndex * 24;
    return new Array(6).fill(0).map((_, k) => {
      const indices = [i, i + 1, i + 2, i, i + 2, i + 3];
      i += 4;
      return indices;
    }).flat();
  }

  rotateInPlace() {
    const angle = p5.prototype.radians(3);
    const { center } = this;

    Object.entries(this.corners).forEach(([key, value]) => {
      const x = (center.x - value.x) * Math.cos(angle) - (center.z - value.z) * Math.sin(angle);
      const z = (center.x - value.x) * Math.sin(angle) + (center.z - value.z) * Math.cos(angle); 

      value.x = center.x - x;
      value.z = center.z - z;
    });
  }
}

export default PixelCubeGL;