import { hslToRgb } from "@/constants/colors";
import { position, toRGB } from '@/utils/gl';
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
    const vertexBuffer = this.createVertexPositionBuffer({ vertices: vertices.flat() });
    const colorBuffer = this.createColorBuffer({ colors });

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

    const indexBuffer = this.createIndexPositionBuffer({ indices });

    this.setVertexPositionAttribute({ buffer: vertexBuffer, programInfo });
    this.setVertexColorAttribute({ buffer: colorBuffer, programInfo });

    // const colorLocation = gl.getUniformLocation(programInfo.program, 'color');
    // gl.uniform3fv(colorLocation, new Float32Array(toRGB(colors[0])));
    // gl.drawArrays(gl.TRIANGLES, 0, 4);

    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
  }

  drawGL() {
    const { color } = this;
    const dimensions = this.grid.getDimensions();
    
    const { ct, cb, lt, rt, rb, lb, bt, bb } = Object.entries(this.corners).reduce((acc, [ key, value ]) => {
      return {
        ...acc,
        [key]: position(value, dimensions),
      }
    }, {} as Corners);

    const lighter = color.hsl.lightness + 10;
    const lightest = color.hsl.lightness + 20;

    const darkestColorRgb = hslToRgb({ h: color.hsl.hue, s: color.hsl.saturation, l: color.hsl.lightness });
    const lighterColorRgb = hslToRgb({ h: color.hsl.hue, s: color.hsl.saturation, l: lighter });
    const lightestColorRgb = hslToRgb({ h: color.hsl.hue, s: color.hsl.saturation, l: lightest });

    const verticesRight = [rb.x, rb.y, rb.z, bb.x, bb.y, bb.z, bt.x, bt.y, bt.z, rt.x, rt.y, rt.z];
    const verticesBack = [bt.x, bt.y, bt.z, bb.x, bb.y, bb.z, lb.x, lb.y, lb.z, lt.x, lt.y, lt.z];
    const verticesBottom = [lb.x, lb.y, lb.z, cb.x, cb.y, cb.z, rb.x, rb.y, rb.z, bb.x, bb.y, bb.z];
    const verticesLeft = [lb.x, lb.y, lb.z, cb.x, cb.y, cb.z, ct.x, ct.y, ct.z, lt.x, lt.y, lt.z];
    const verticesFront = [ct.x, ct.y, ct.z, cb.x, cb.y, cb.z, rb.x, rb.y, rb.z, rt.x, rt.y, rt.z];
    const verticesTop = [lt.x, lt.y, lt.z, ct.x, ct.y, ct.z, rt.x, rt.y, rt.z, bt.x, bt.y, bt.z];

    const faceColors = [toRGB(darkestColorRgb), toRGB(lighterColorRgb), toRGB(lightestColorRgb), toRGB(darkestColorRgb), toRGB(lighterColorRgb), toRGB(lightestColorRgb)];
    const colors = faceColors.reduce((acc, c) => acc.concat(c, c, c, c), [] as Array<number>);

    this.boxGL({
      vertices: [verticesRight, verticesBack, verticesBottom, verticesLeft, verticesFront, verticesTop],
      colors,
    });
  }

  createIndexPositionBuffer({ indices }: { indices: Array<number> }) {
    const { gl } = this.grid;

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    return indexBuffer;
  }

  createVertexPositionBuffer({ vertices }: { vertices: Array<number> }) {
    const { gl } = this.grid;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
    return positionBuffer;
  }

  createColorBuffer({ colors }: { colors: Array<number> }) {
    const { gl } = this.grid;

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  
    return colorBuffer;
  }

  setVertexPositionAttribute({ buffer, programInfo}: { programInfo: ProgramInfo, buffer: WebGLBuffer }) {
    const { gl } = this.grid;

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

  setVertexColorAttribute({ buffer, programInfo}: { programInfo: ProgramInfo, buffer: WebGLBuffer }) {
    const { gl } = this.grid;

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