import { prototype as p5 } from 'p5';
import type p5Type from 'p5';

import { Color, hslToRgb } from "@/constants/colors";
import { Point3D } from "@/types/geometry";
import { position, toRGB } from '@/utils/gl';
import { PixelBoxGrid } from './PixelBoxGrid';

export type GridSquare = {
  t: Point3D;
  r: Point3D;
  b: Point3D;
  l: Point3D;
}

export type LineProperties = {
  startBreak: Point3D;
  endBreak: Point3D;
}

export type DrawingProperties = {
  borders: {
    r?: LineProperties;
    l?: LineProperties;
    d?: LineProperties;
  }
}

export type Corners = {
  ct: Point3D;
  cb: Point3D;
  lt: Point3D;
  lb: Point3D;
  rt: Point3D;
  rb: Point3D;
  bt: Point3D;
  bb: Point3D;
}

export type PixelCubeParams = {
  index: { xIndex: number; yIndex: number; zIndex: number };
  top: GridSquare;
  bottom: GridSquare;
  center: Point3D;
  color: Color;
  spacing?: number;
  grid: PixelBoxGrid;
}

class PixelCube {
  index;
  bottom;
  top;
  center;
  color;
  grid;
  spacing;
  drawingProperties: DrawingProperties;
  corners: Corners;

  constructor({
    index,
    top,
    bottom,
    center,
    color,
    grid,
    spacing = 0,
  }: PixelCubeParams) {
    this.index = index;
    this.bottom = bottom;
    this.top = top;
    this.center = center;
    this.color = color;
    this.grid = grid;
    this.spacing = spacing;
    this.drawingProperties = { borders: {} };

    this.corners = this.initializeCorners();
    this.initializeDrawingProperties();
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

  initializeDrawingProperties() {
    const s = this.spacing;
    const { sketch } = this.grid;
    const { cb, ct, rt, lt } = this.corners;

    if (!sketch) {
      console.error('No sketch found!');
      return;
    }

    this.drawingProperties.borders.d = getLineBreakValues(cb, ct, sketch);
    this.drawingProperties.borders.l = getLineBreakValues(lt, ct, sketch);
    this.drawingProperties.borders.r = getLineBreakValues(ct, rt, sketch);
  }

  quadGL({ vertices, indices, color }: { vertices: Array<number>, indices: Array<number>, color: [number, number, number] }) {
    if (!this.grid.gl) {
      console.error("No gl defined for quadGL");
      return;
    }

    if (!this.grid.program) {
      console.error("No program defined for quadGL");
      return;
    }

    const { gl } = this.grid;
    const { program } = this.grid;

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    console.log(">>> vertices", new Float32Array(vertices));

    // const indexBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);

    const colorLocation = gl.getUniformLocation(program, 'color');
    gl.uniform3fv(colorLocation, new Float32Array(toRGB(color)));

    // gl.enable(gl.DEPTH_TEST);

    gl.drawArrays(gl.TRIANGLES, 0, 4);

    // gl.drawElements(gl.TRIANGLES, 2, gl.UNSIGNED_SHORT, 0);
  }

  drawGL() {
    if (!this.grid.gl) {
      console.error("No gl defined for drawGL");
      return;
    }

    if (!this.grid.program) {
      console.error("No program defined for drawGL");
      return;
    }

    const { color } = this;
    const dimensions = this.grid.getDimensions();

    const lighter = color.hsl.lightness + 10;
    const lightest = color.hsl.lightness + 20;

    const darkestColorRgb = hslToRgb({ h: color.hsl.hue, s: color.hsl.saturation, l: color.hsl.lightness });
    const lighterColorRgb = hslToRgb({ h: color.hsl.hue, s: color.hsl.saturation, l: lighter });
    const lightestColorRgb = hslToRgb({ h: color.hsl.hue, s: color.hsl.saturation, l: lightest });

    const { ct, cb, lt, rt, rb, lb, bt, bb } = Object.entries(this.corners).reduce((acc, [ key, value ]) => {
      return {
        ...acc,
        [key]: position(value, dimensions),
      }
    }, {} as Corners);

    const indices = [3, 2, 1, 3, 2, 1];

    this.quadGL({
      vertices: [rb.x, rb.y, rb.z, bb.x, bb.y, bb.z, bt.x, bt.y, bt.z, rt.x, rt.y, rt.z],
      indices,
      color: darkestColorRgb,
    });

    this.quadGL({
      vertices: [bt.x, bt.y, bt.z, bb.x, bb.y, bb.z, lb.x, lb.y, lb.z, lt.x, lt.y, lt.z],
      indices,
      color: lighterColorRgb,
    });

    this.quadGL({
      vertices: [lb.x, lb.y, lb.z, cb.x, cb.y, cb.z, rb.x, rb.y, rb.z, bb.x, bb.y, bb.z],
      indices,
      color: lightestColorRgb,
    });

    // right side
    // this.shader.setUniform('color', toRGB(darkestColorRgb));
    // // this.shader.setUniform('corners', [rb.x, rb.y, rb.z, bb.x, bb.y, bb.z, bt.x, bt.y, bt.z, rt.x, rt.y, rt.z]);

    // // back side
    // this.shader.setUniform('color', toRGB(lighterColorRgb));
    // this.shader.setUniform('corners', [bt.x, bt.y, bt.z, bb.x, bb.y, bb.z, lb.x, lb.y, lb.z, lt.x, lt.y, lt.z]);

    // // bottom side
    // this.shader.setUniform('color', toRGB(lightestColorRgb));
    // this.shader.setUniform('corners', [lb.x, lb.y, lb.z, cb.x, cb.y, cb.z, rb.x, rb.y, rb.z, bb.x, bb.y, bb.z]);

    // // left side
    // this.shader.setUniform('color', toRGB(darkestColorRgb));
    // this.shader.setUniform('corners', [lb.x, lb.y, lb.z, cb.x, cb.y, cb.z, ct.x, ct.y, ct.z, lt.x, lt.y, lt.z]);

    // // front side
    // this.shader.setUniform('color', toRGB(lightestColorRgb));
    // this.shader.setUniform('corners', [ct.x, ct.y, ct.z, cb.x, cb.y, cb.z, rb.x, rb.y, rb.z, rt.x, rt.y, rt.z]);

    // // top side
    // this.shader.setUniform('color', toRGB(lightestColorRgb));
    // this.shader.setUniform('corners', [lt.x, lt.y, lt.z, ct.x, ct.y, ct.z, rt.x, rt.y, rt.z, bt.x, bt.y, bt.z]);
  }

  draw() {
    const { color } = this;
    const { sketch } = this.grid;
    const { d, l, r  } = this.drawingProperties.borders;
    const { ct, cb, lt, rt, rb, lb, bt, bb } = this.corners;

    const lighter = color.hsl.lightness + 10;
    const lightest = color.hsl.lightness + 20;
    const darkest = Math.max(color.hsl.lightness - 50, 0);

    if (!sketch) {
      console.error('No sketch found for draw');
      return;
    }

    // this.sketch.noStroke();
    sketch.stroke(color.hsl.hue, color.hsl.lightness, darkest);

    // right 
    sketch.fill(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
    sketch.quad(rb.x, rb.y, rb.z, bb.x, bb.y, bb.z, bt.x, bt.y, bt.z, rt.x, rt.y, rt.z);

    // back
    sketch.fill(color.hsl.hue, color.hsl.saturation, lighter);
    sketch.quad(bt.x, bt.y, bt.z, bb.x, bb.y, bb.z, lb.x, lb.y, lb.z, lt.x, lt.y, lt.z);

    // bottom
    sketch.fill(color.hsl.hue, color.hsl.saturation, lightest);
    sketch.quad(lb.x, lb.y, lb.z, cb.x, cb.y, cb.z, rb.x, rb.y, rb.z, bb.x, bb.y, bb.z);

    // left
    sketch.fill(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
    sketch.quad(lb.x, lb.y, lb.z, cb.x, cb.y, cb.z, ct.x, ct.y, ct.z, lt.x, lt.y, lt.z);

    // front
    sketch.fill(color.hsl.hue, color.hsl.saturation, lighter);
    sketch.quad(ct.x, ct.y, ct.z, cb.x, cb.y, cb.z, rb.x, rb.y, rb.z, rt.x, rt.y, rt.z);

    // top
    sketch.fill(color.hsl.hue, color.hsl.saturation, lightest);
    sketch.quad(lt.x, lt.y, lt.z, ct.x, ct.y, ct.z, rt.x, rt.y, rt.z, bt.x, bt.y, bt.z);

    sketch.strokeCap(p5.ROUND);
    sketch.stroke(color.hsl.hue, color.hsl.lightness, darkest);
    sketch.strokeWeight(1);

    // d ? this.drawSplitLine({start: ct, end: cb, startBreak: d.startBreak, endBreak: d.endBreak }) : this.sketch.line(ct.x, ct.y, ct.z, cb.x, cb.y, cb.z);
    // l ? this.drawSplitLine({start: lt, end: ct, startBreak: l.startBreak, endBreak: l.endBreak }) : this.sketch.line(lt.x, lt.y, lt.z, ct.x, ct.y, ct.z);
    // r ? this.drawSplitLine({start: ct, end: rt, startBreak: r.startBreak, endBreak: r.endBreak }) : this.sketch.line(ct.x, ct.y, ct.z, rt.x, rt.y, rt.z);
  }

  drawSplitLine({ start, end, startBreak, endBreak }: { start: Point3D, end: Point3D, startBreak: Point3D, endBreak: Point3D }) {
    const { sketch } = this.grid;
    
    if (!sketch) {
      console.error('No sketch found for drawSplitLine');
      return;
    }

    sketch.line(start.x, start.y, start.z, startBreak.x, startBreak.y, startBreak.z);
    sketch.line(endBreak.x, endBreak.y, endBreak.z, end.x, end.y, end.z);
  }

  rotateInPlace() {
    const angle = p5.radians(3);
    const { center } = this;

    Object.entries(this.corners).forEach(([key, value]) => {
      const x = (center.x - value.x) * Math.cos(angle) - (center.z - value.z) * Math.sin(angle);
      const z = (center.x - value.x) * Math.sin(angle) + (center.z - value.z) * Math.cos(angle); 

      value.x = center.x - x;
      value.z = center.z - z;
    });
  }
}

function getLineBreakValues(start: Point3D, end: Point3D, sketch: typeof p5) {
  if (Math.random() < 0) {
    const vector = {x: end.x - start.x, y: end.y - start.y, z: end.z - start.z};
    const length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2));
    const normalized = {x: (end.x - start.x)/length, y: (end.y - start.y)/length, z: (end.z - start.z)/length};

    const distanceFromStart = Math.random() * length;
    const startBreak = {x: start.x + distanceFromStart * normalized.x, y: start.y + distanceFromStart * normalized.y, z: start.z + distanceFromStart * normalized.z};
    const distanceFromEnd = Math.random() * (length - distanceFromStart);
    const endBreak = {x: end.x - distanceFromEnd * normalized.x, y: end.y - distanceFromEnd * normalized.y, z: end.z - distanceFromEnd * normalized.z};

    return { startBreak, endBreak };
  }
}

export default PixelCube;