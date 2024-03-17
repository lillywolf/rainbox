import { prototype as p5 } from "p5";

type HexagonalPoint = {
  centerX: number;
  centerY: number;
  radius: number;
}

type GridParams = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  scale?: number;
};

const BASE_DIMENSION = 30;

export class HexagonalGrid {
  scale;
  minX;
  maxX;
  minY;
  maxY;
  diameter;
  hexagonHeight;

  constructor({minX, maxX, minY, maxY, scale = 1}: GridParams) {
    this.scale = scale;
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.diameter = BASE_DIMENSION * this.scale;
    this.hexagonHeight = this.diameter * 0.5 * Math.sqrt(3);
  }

  build(sketch: typeof p5) {
    for (let y = this.minY; y < this.maxY; y++) {
      for (let x = this.minX; x < this.maxX; x++) {
        const isOdd = (x + y * (this.maxY - this.minY)) % 2 === 1;
        this.hexagon({
          centerX: x * this.diameter * 0.75,
          centerY: (y * this.hexagonHeight) + this.hexagonHeight * (isOdd ? 1 : 0.5),
          radius: this.diameter * 0.5,
        }, sketch);
      }
    }
  }

  hexagon({ centerX, centerY, radius }: HexagonalPoint, sketch: typeof p5) {
    sketch.beginShape();
    for (let a = 0; a < sketch.TAU; a += sketch.TAU/6) {
      const x = centerX + radius * sketch.cos(a);
      const y = centerY + radius * sketch.sin(a);
      sketch.vertex(x, y);
    }
    sketch.endShape(sketch.CLOSE);
  }
}
