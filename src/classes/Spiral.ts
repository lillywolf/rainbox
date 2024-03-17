import { prototype as p5 } from 'p5';

export enum SPIRAL_FUNCTION {
  'logarithmic' = 'logarithmic',
  'fibonacci' = 'fibonacci',
  'theodorus' = 'theodorus',
}

export enum SPIRAL_DIRECTION {
  'clockwise' = 'clockwise',
  'counterclockwise' = 'counterclockwise',
}

export type SpiralFunction = SPIRAL_FUNCTION.fibonacci | SPIRAL_FUNCTION.logarithmic | SPIRAL_FUNCTION.theodorus;

export type SpiralDirection = SPIRAL_DIRECTION.clockwise | SPIRAL_DIRECTION.counterclockwise;

type SpokeFunction = ({ x, y, i, sketch }: { x: number, y: number, i: number, sketch: typeof p5 }) => void;

export class Spiral {
  a; // distance from origin along the x-axis
  k; // tightness of successive rotations
  phi; // angle in radians
  rotation;
  spiralFn;
  spokeFn;
  radius;
  maxRadius;
  direction;
  spokeCount;
  color;

  constructor({
    k,
    spokeFn,
    a = 10,
    maxRadius = 0,
    rotation = 0,
    direction = SPIRAL_DIRECTION.clockwise,
    spiralFn = SPIRAL_FUNCTION.logarithmic,
    color = [255, 255, 255],
  }: {
    k: number,
    spokeFn: SpokeFunction,
    a?: number,
    maxRadius?: number,
    rotation?: number,
    startPhi?: number,
    direction?: SpiralDirection,
    spiralFn?: SpiralFunction,
    color?: Array<number>
  }) {
    this.a = a;
    this.radius = 0;
    this.maxRadius = maxRadius;
    this.rotation = rotation;
    this.phi = 0;
    this.k = k;
    this.spiralFn = spiralFn;
    this.spokeFn = spokeFn;
    this.direction = direction;
    this.spokeCount = 0;
    this.color = color;
  }

  build(sketch: typeof p5) {
    switch (this.spiralFn) {
      case SPIRAL_FUNCTION.logarithmic:
        this.buildLogarithmic(sketch);
      case SPIRAL_FUNCTION.fibonacci:
        this.buildFibonacci(sketch);
      case SPIRAL_FUNCTION.theodorus:
        this.buildThoedorus(sketch);
      default:
        this.buildLogarithmic(sketch);
    }
  }

  buildLogarithmic(sketch: typeof p5) {
    // sketch.rotate(this.rotation);
    this.spokeCount++;
    // this.phi = Math.atan2(this.y, this.x);
    this.radius = this.a * Math.pow(Math.E, this.k * this.phi);

    const x = this.radius * sketch.cos(this.phi);
    const y = this.radius * sketch.sin(this.phi);

    // rotate
    const xRotated = x * sketch.cos(this.rotation) - y * sketch.sin(this.rotation);
    const yRotated = y * sketch.cos(this.rotation) + x * sketch.sin(this.rotation);

    console.log(">>> maxRadius", this.maxRadius);

    if (this.maxRadius && (Math.pow(Math.abs(xRotated), 2) + Math.pow(Math.abs(yRotated), 2) > Math.pow(this.maxRadius, 2))) return;

    console.log(">>> xRotated", xRotated);
    console.log(">>> yRotated", yRotated);

    this.spokeFn({x: xRotated, y: yRotated, i: this.spokeCount, sketch});
    this.phi = this.phi + (this.direction === SPIRAL_DIRECTION.clockwise ? 0.1 : -0.1);
  }

  buildFibonacci(sketch: typeof p5) {

  }

  buildThoedorus(sketch: typeof p5) {
    
  }
};