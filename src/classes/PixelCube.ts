import { Color, hslToRgb } from "@/constants/colors";
import { Point3D } from "@/types/geometry";
import { PixelBoxGrid, toRadians } from "./PixelBoxGrid";
import { toRGB } from "@/utils/gl";

export type GridSquare = {
  t: Point3D;
  r: Point3D;
  b: Point3D;
  l: Point3D;
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
  corners: Corners;
  faceColors: number[];

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

    this.corners = this.initializeCorners();
    this.faceColors = [];
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

  setFaceColors() {
    const { color } = this;

    const lighter = color.hsl.lightness + 10;
    const lightest = color.hsl.lightness + 20;

    const darkestColorRgb = hslToRgb({ h: color.hsl.hue, s: color.hsl.saturation, l: color.hsl.lightness });
    const lighterColorRgb = hslToRgb({ h: color.hsl.hue, s: color.hsl.saturation, l: lighter });
    const lightestColorRgb = hslToRgb({ h: color.hsl.hue, s: color.hsl.saturation, l: lightest });

    const colors = [toRGB(darkestColorRgb), toRGB(lighterColorRgb), toRGB(lightestColorRgb), toRGB(darkestColorRgb), toRGB(lighterColorRgb), toRGB(lightestColorRgb)];
    this.faceColors = colors.reduce((acc, c) => acc.concat(c, c, c, c), [] as Array<number>);
  }

  draw() {}

  rotateInPlace() {
    const angle = toRadians(3);
    const { center } = this;

    Object.entries(this.corners).forEach(([key, value]) => {
      const x = (center.x - value.x) * Math.cos(angle) - (center.z - value.z) * Math.sin(angle);
      const z = (center.x - value.x) * Math.sin(angle) + (center.z - value.z) * Math.cos(angle); 

      value.x = center.x - x;
      value.z = center.z - z;
    });
  }
}

export default PixelCube;