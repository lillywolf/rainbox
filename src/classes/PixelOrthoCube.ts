import { prototype as p5 } from 'p5';

import PixelCube, { PixelCubeParams } from './PixelCube';

class PixelOrthoCube extends PixelCube {
  constructor(params: PixelCubeParams) {
    super(params);
  }

  initializeCorners() {
    const s = this.spacing;
    const { r: br, t: bt, l: bl, b: bb } = this.bottom;
    const { r: tr, t: tt, l: tl, b: tb } = this.top;

    const ct = { x: tt.x - s, y: tt.y - s, z: tt.z - s }; // center top
    const cb = { x: tl.x - s, y: tl.y + s, z: tl.z - s }; // center bottom
    const lt = { x: bt.x - s, y: bt.y - s, z: bt.z + s}; // left top
    const rt = { x: tr.x + s, y: tr.y - s, z: tr.z - s }; // right top
    const lb = { x: bl.x - s, y: bl.y + s, z: bl.z + s }; // left bottom
    const rb = { x: tb.x + s, y: tb.y + s, z: tb.z - s }; // right bottom
    const bt_ = { x: br.x + s, y: br.y - s, z: br.z + s }; // back top

    return { ct, cb, lt, rt, lb, rb, bt: bt_ };
  }

  draw() {
    const { color } = this;
    const { ct, cb, lt, rt, lb, rb, bt } = this.corners;
    const { d, l, r } = this.drawingProperties.borders;

    const lighter = color.hsl.lightness + 10;
    const lightest = color.hsl.lightness + 20;
    const darkest = Math.max(color.hsl.lightness - 50, 0);

    this.sketch.noStroke();
        
    // left side
    this.sketch.fill(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
    this.sketch.quad(lb.x, lb.y, lb.z, lt.x, lt.y, lt.z, ct.x, ct.y, ct.z, cb.x, cb.y, cb.z);

    // front
    this.sketch.fill(color.hsl.hue, color.hsl.saturation, lighter);
    this.sketch.quad(rb.x, rb.y, rb.z, cb.x, cb.y, cb.z, ct.x, ct.y, ct.z, rt.x, rt.y, rt.z);

    // top
    this.sketch.fill(color.hsl.hue, color.hsl.saturation, lightest);
    this.sketch.quad(bt.x, bt.y, bt.z, lt.x, lt.y, lt.z, ct.x, ct.y, ct.z, rt.x, rt.y, rt.z);

    this.sketch.strokeCap(p5.ROUND);
    this.sketch.stroke(color.hsl.hue, color.hsl.lightness, darkest);
    this.sketch.strokeWeight(1);

    d ? this.drawSplitLine({start: ct, end: cb, startBreak: d.startBreak, endBreak: d.endBreak }) : this.sketch.line(ct.x, ct.y, ct.z, cb.x, cb.y, cb.z);
    l ? this.drawSplitLine({start: lt, end: ct, startBreak: l.startBreak, endBreak: l.endBreak }) : this.sketch.line(lt.x, lt.y, lt.z, ct.x, ct.y, ct.z);
    r ? this.drawSplitLine({start: ct, end: rt, startBreak: r.startBreak, endBreak: r.endBreak }) : this.sketch.line(ct.x, ct.y, ct.z, rt.x, rt.y, rt.z);

    // border stroke
    this.sketch.strokeWeight(2);
    this.sketch.noFill();
    this.sketch.beginShape();
    this.sketch.vertex(lb.x, lb.y, lb.z);
    this.sketch.vertex(lt.x, lt.y, lt.z);
    this.sketch.vertex(bt.x, bt.y, bt.z);
    this.sketch.vertex(rt.x, rt.y, rt.z);
    this.sketch.vertex(rb.x, rb.y, rb.z);
    this.sketch.vertex(cb.x, cb.y, cb.z);
    this.sketch.vertex(lb.x, lb.y, lb.z);
    this.sketch.endShape();
  }
}

export default PixelOrthoCube;