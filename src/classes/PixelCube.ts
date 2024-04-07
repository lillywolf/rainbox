import { prototype as p5 } from 'p5';

import { Color } from "@/constants/colors";
import { Point3D } from "@/types/geometry";

type GridSquare = {
  t: Point3D;
  r: Point3D;
  b: Point3D;
  l: Point3D;
}

type LineProperties = {
  startBreak: Point3D;
  endBreak: Point3D;
}

type DrawingProperties = {
  borders: {
    r?: LineProperties;
    l?: LineProperties;
    d?: LineProperties;
  }
}

type Corners = {
  ct: Point3D;
  cb: Point3D;
  lt: Point3D;
  lb: Point3D;
  rt: Point3D;
  rb: Point3D;
  bt: Point3D;
  bb?: Point3D;
}

export type PixelCubeParams = {
  index: { xIndex: number; yIndex: number; zIndex: number };
  top: GridSquare;
  bottom: GridSquare;
  color: Color;
  spacing?: number;
  sketch: typeof p5;
}

class PixelCube {
  index;
  bottom;
  top;
  color;
  sketch;
  spacing;
  drawingProperties: DrawingProperties;
  corners: Corners;

  constructor({
    index,
    top,
    bottom,
    color,
    sketch,
    spacing = 0,
  }: PixelCubeParams) {
    this.index = index;
    this.bottom = bottom;
    this.top = top;
    this.color = color;
    this.sketch = sketch;
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

    return { ct, cb, lt, rt, lb, rb, bt: bt_ };
  }

  initializeDrawingProperties() {
    const s = this.spacing;
    const { cb, ct, rt, lt } = this.corners;

    this.drawingProperties.borders.d = getLineBreakValues(cb, ct, this.sketch);
    this.drawingProperties.borders.l = getLineBreakValues(lt, ct, this.sketch);
    this.drawingProperties.borders.r = getLineBreakValues(ct, rt, this.sketch);
  }

  draw() {
    const { color } = this;
    const { d, l, r  } = this.drawingProperties.borders;
    const { ct, cb, lt, rt, rb, lb, bt, bb } = this.corners;

    const lighter = color.hsl.lightness + 10;
    const lightest = color.hsl.lightness + 20;
    const darkest = Math.max(color.hsl.lightness - 50, 0);

    // this.sketch.noStroke();
    this.sketch.stroke(color.hsl.hue, color.hsl.lightness, darkest);

    // left side
    this.sketch.fill(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
    this.sketch.quad(lb.x, lb.y, lb.z, cb.x, cb.y, cb.z, ct.x, ct.y, ct.z, lt.x, lt.y, lt.z);

    // front
    this.sketch.fill(color.hsl.hue, color.hsl.saturation, lighter);
    this.sketch.quad(ct.x, ct.y, ct.z, cb.x, cb.y, cb.z, rb.x, rb.y, rb.z, rt.x, rt.y, rt.z);

    // top
    this.sketch.fill(color.hsl.hue, color.hsl.saturation, lightest);
    this.sketch.quad(lt.x, lt.y, lt.z, ct.x, ct.y, ct.z, rt.x, rt.y, rt.z, bt.x, bt.y, bt.z);

    this.sketch.strokeCap(p5.ROUND);
    this.sketch.stroke(color.hsl.hue, color.hsl.lightness, darkest);
    this.sketch.strokeWeight(1);

    d ? this.drawSplitLine({start: ct, end: cb, startBreak: d.startBreak, endBreak: d.endBreak }) : this.sketch.line(ct.x, ct.y, ct.z, cb.x, cb.y, cb.z);
    l ? this.drawSplitLine({start: lt, end: ct, startBreak: l.startBreak, endBreak: l.endBreak }) : this.sketch.line(lt.x, lt.y, lt.z, ct.x, ct.y, ct.z);
    r ? this.drawSplitLine({start: ct, end: rt, startBreak: r.startBreak, endBreak: r.endBreak }) : this.sketch.line(ct.x, ct.y, ct.z, rt.x, rt.y, rt.z);
  }

  drawSplitLine({ start, end, startBreak, endBreak }: { start: Point3D, end: Point3D, startBreak: Point3D, endBreak: Point3D }) {
      this.sketch.line(start.x, start.y, start.z, startBreak.x, startBreak.y, startBreak.z);
      this.sketch.line(endBreak.x, endBreak.y, endBreak.z, end.x, end.y, end.z);
  }
}

function getLineBreakValues(start: Point3D, end: Point3D, sketch: typeof p5) {
  if (Math.random() < 0.3) {
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