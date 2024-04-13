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
    const bb_ = { x: bb.x + s, y: bb.y + s, z: bb.z + s }; // back bottom

    return { ct, cb, lt, rt, lb, rb, bt: bt_ , bb: bb_ };
  }

  draw() {
    const { color } = this;
    const { sketch } = this.grid;
    const { ct, cb, lt, rt, lb, rb, bt, bb } = this.corners;
    const { d, l, r } = this.drawingProperties.borders;

    const lighter = color.hsl.lightness + 10;
    const lightest = color.hsl.lightness + 20;
    const darkest = Math.max(color.hsl.lightness - 50, 0);

    // this.sketch.noStroke();
    sketch.stroke(color.hsl.hue, color.hsl.lightness, darkest);    

    // right side
    sketch.fill(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
    sketch.quad(rb.x, rb.y, rb.z, rt.x, rt.y, rt.z, bt.x, bt.y, bt.z, bb.x, bb.y, bb.z);

    // back
    sketch.fill(color.hsl.hue, color.hsl.saturation, lighter);
    sketch.quad(lb.x, lb.y, lb.z, bb.x, bb.y, bb.z, bt.x, bt.y, bt.z, lt.x, lt.y, lt.z);

    // bottom
    sketch.fill(color.hsl.hue, color.hsl.saturation, lightest);
    sketch.quad(bb.x, bb.y, bb.z, lb.x, lb.y, lb.z, cb.x, cb.y, cb.z, rb.x, rb.y, rb.z);

    // left side
    sketch.fill(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
    sketch.quad(lb.x, lb.y, lb.z, lt.x, lt.y, lt.z, ct.x, ct.y, ct.z, cb.x, cb.y, cb.z);

    // front
    sketch.fill(color.hsl.hue, color.hsl.saturation, lighter);
    sketch.quad(rb.x, rb.y, rb.z, cb.x, cb.y, cb.z, ct.x, ct.y, ct.z, rt.x, rt.y, rt.z);

    // top
    sketch.fill(color.hsl.hue, color.hsl.saturation, lightest);
    sketch.quad(bt.x, bt.y, bt.z, lt.x, lt.y, lt.z, ct.x, ct.y, ct.z, rt.x, rt.y, rt.z);

    sketch.strokeCap(p5.ROUND);
    sketch.stroke(color.hsl.hue, color.hsl.lightness, darkest);
    sketch.strokeWeight(1);

    // d ? this.drawSplitLine({start: ct, end: cb, startBreak: d.startBreak, endBreak: d.endBreak }) : this.sketch.line(ct.x, ct.y, ct.z, cb.x, cb.y, cb.z);
    // l ? this.drawSplitLine({start: lt, end: ct, startBreak: l.startBreak, endBreak: l.endBreak }) : this.sketch.line(lt.x, lt.y, lt.z, ct.x, ct.y, ct.z);
    // r ? this.drawSplitLine({start: ct, end: rt, startBreak: r.startBreak, endBreak: r.endBreak }) : this.sketch.line(ct.x, ct.y, ct.z, rt.x, rt.y, rt.z);

    // border stroke
    sketch.strokeWeight(2);
    sketch.noFill();
    sketch.beginShape();
    sketch.vertex(lb.x, lb.y, lb.z);
    sketch.vertex(lt.x, lt.y, lt.z);
    sketch.vertex(bt.x, bt.y, bt.z);
    sketch.vertex(rt.x, rt.y, rt.z);
    sketch.vertex(rb.x, rb.y, rb.z);
    sketch.vertex(cb.x, cb.y, cb.z);
    sketch.vertex(lb.x, lb.y, lb.z);
    sketch.endShape();
  }

  rotateInPlace() {
    const angle = p5.radians(3);
    const { center } = this;

    Object.entries(this.corners).forEach(([_, value]) => {
      const x = (center.x - value.x) * Math.cos(angle) - (center.z - value.z) * Math.sin(angle);
      const z = (center.x - value.x) * Math.sin(angle) + (center.z - value.z) * Math.cos(angle); 

      value.x = center.x - x;
      value.z = center.z - z;
    });
  }
}

export default PixelOrthoCube;