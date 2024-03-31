import { prototype as p5 } from 'p5';
import { SPIRAL_DIRECTION, SPIRAL_FUNCTION, Spiral, SpiralDirection } from './Spiral';
import { PETAL_STYLE, PETAL_STYLES, Petal } from '@/constants/flowers';

const PETAL_RADIUS_RANDOMNESS = 0.03;
const PETAL_WIDTH_RANDOMNESS = 1;
const PETAL_TAPER_RANDOMNESS = 0.2;
const PETAL_THETA_RANDOMNESS = 0.05;

const SPIRAL_INDEX_RADIUS_COEFFICIENT = 0.08;
const SPIRAL_INDEX_THETA_COEFFICIENT = 0.5;
const SPIRAL_INDEX_WIDTH_COEFFICIENT = 0.0;

export type FlowerConfig = {
  directions: Array<SpiralDirection>;
  k: number;
  spiralFn: SPIRAL_FUNCTION;
  seedDiameter: number;
  numberOfSeedSpirals: number;
  numberOfPetals: number;
  numberOfPetalSpirals: number;
  petalWidthCoefficient: number;
  petalControlStart: number; // between 0 and 1, sets the start of the bezier control lines
  petalTaper: number; // between 0 and 1, sets the length of the bezier control lines
  petalStyle: PETAL_STYLES;
  innerRadius: number;
  colors?: Array<Array<number>>;
};

const COLORS = [
  [15, 164, 219],
  [255, 139, 224],
  [243, 255, 108],
  [107, 255, 253],
  [107, 255, 124]
];

export type SeedFunctionParams = {
  x: number,
  y: number,
  i: number,
  sketch: typeof p5,
};

export type SeedFunction = ({x, y, sketch}: SeedFunctionParams) => void;

export class Flower {
  config: FlowerConfig;
  radius: number;
  spirals: Array<Spiral>;
  petals: Array<Petal>;

  constructor({config, radius}: {config: FlowerConfig, radius: number }) {
    this.config = config;
    this.radius = radius;
    this.petals = [];

    this.spirals = Array.from(Array(this.config.numberOfSeedSpirals).keys()).map((i) => {
      return new Spiral({
        k: this.config.k,
        a: 10,
        maxRadius: this.config.innerRadius * this.radius,
        spiralFn: this.config.spiralFn,
        rotation: ((p5.PI * 2) / this.config.numberOfSeedSpirals) * i,
        direction: SPIRAL_DIRECTION.clockwise,
        spokeFn: this.seed.bind(this),
      })
    });

    const spiralIndexes = Array.from(Array(this.config.numberOfPetalSpirals).keys());
    const petalIndexes = Array.from(Array(this.config.numberOfPetals).keys());

    this.petals = spiralIndexes.flatMap((spiralIndex) => { // each spiral
      return petalIndexes.map((i) => { // each petal
        const innerRadius = this.radius * this.config.innerRadius; // radius of the middle seed part

        const randomizedRadius = this.getRandomRadius(spiralIndex);
        const numberOfPetals = this.config.numberOfPetals;
        const extraRotation = 2 * p5.PI / numberOfPetals * spiralIndex * SPIRAL_INDEX_THETA_COEFFICIENT; // additional rotation based on spiralIndex

        const theta = ((p5.PI * 2) / numberOfPetals) * i + extraRotation + (Math.random() * (Math.random() > 0.5 ? PETAL_THETA_RANDOMNESS : -PETAL_THETA_RANDOMNESS));
        const perpendicularToTheta = theta + p5.PI / 2;
        
        const xOuter = randomizedRadius * Math.cos(2 * p5.PI * i / numberOfPetals + extraRotation); // outer point of petal
        const yOuter = randomizedRadius * Math.sin(2 * p5.PI * i / numberOfPetals + extraRotation);

        const xInner = innerRadius * p5.cos(theta); // inner point of petal
        const yInner = innerRadius * p5.sin(theta);
        
        const xControl = xOuter - ((randomizedRadius - innerRadius) * this.config.petalControlStart) * p5.cos(theta); // starting point for bezier control
        const yControl = yOuter - ((randomizedRadius - innerRadius) * this.config.petalControlStart) * p5.sin(theta);
        
        const petalWidth = this.getRandomPetalWidth(randomizedRadius, spiralIndex);
        const petalTaper = this.getRandomPetalTaper(randomizedRadius);

        const color = this.config.colors
        ? this.config.colors[spiralIndex]
        : COLORS[Math.floor(Math.random() * COLORS.length)];
  

        // bezier control points
        const b1c1 = {
          x: xControl - (petalWidth * petalTaper * p5.cos(perpendicularToTheta)),
          y: yControl - (petalWidth * petalTaper * p5.sin(perpendicularToTheta)),
        };
        const b2c1 = {
          x: xControl + (petalWidth * petalTaper * p5.cos(perpendicularToTheta)),
          y: yControl + (petalWidth * petalTaper * p5.sin(perpendicularToTheta)),
        };
        const b1c2 = {
          x: b1c1.x - (randomizedRadius * petalTaper * p5.cos(theta)),
          y: b1c1.y - (randomizedRadius * petalTaper * p5.sin(theta)),
        };
        const b2c2 = {
          x: b2c1.x - (randomizedRadius * petalTaper * p5.cos(theta)),
          y: b2c1.y - (randomizedRadius * petalTaper * p5.sin(theta)),
        };

        return {
          outer: {x: xOuter, y: yOuter},
          inner: {x: xInner, y: yInner},
          theta,
          b1c1,
          b2c1,
          b1c2,
          b2c2,
          color,
        }
      });
    });
  }

  build(sketch: typeof p5) {
    this.petals.forEach((petal) => {
      sketch.fill(petal.color[0], petal.color[1], petal.color[2]);
      if (this.config.petalStyle === PETAL_STYLE.rounded) this.petalRounded(sketch, petal);
      if (this.config.petalStyle === PETAL_STYLE.pointed) this.petalPointed(sketch, petal);
    });
  }

  draw(sketch: typeof p5) {
    this.middleSeeds(sketch);
  }

  middleSeeds(sketch: typeof p5) {
    this.spirals.forEach((spiral) => spiral.build(sketch));
  }

  petalRounded(sketch: typeof p5, petal: Petal) {
    sketch.bezier(petal.outer.x, petal.outer.y, petal.b1c1.x, petal.b1c1.y, petal.b1c2.x, petal.b1c2.y, petal.inner.x, petal.inner.y);
    sketch.bezier(petal.outer.x, petal.outer.y, petal.b2c1.x, petal.b2c1.y, petal.b2c2.x, petal.b2c2.y, petal.inner.x, petal.inner.y);
  }

  petalPointed(sketch: typeof p5, petal: Petal) {
    sketch.bezier(petal.inner.x, petal.outer.y, petal.b1c1.x, petal.b1c1.y, petal.b1c2.x, petal.b1c2.y, petal.outer.x, petal.outer.y);
    sketch.bezier(petal.inner.x, petal.outer.y, petal.b2c1.x, petal.b2c1.y, petal.b2c2.x, petal.b2c2.y, petal.outer.x, petal.outer.y);
  }

  seed({x, y, i, sketch}: SeedFunctionParams) {
    // const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    // sketch.fill(color[0], color[1], color[2]);
    sketch.circle(x, y, this.config.seedDiameter * i * 0.01);
  }

  getRandomRadius(spiralIndex: number) {
    const randomnessRange = 1 + Math.random() * (Math.random() > 0.5 ? PETAL_RADIUS_RANDOMNESS : -PETAL_RADIUS_RANDOMNESS);
    return this.radius - (this.radius * spiralIndex * SPIRAL_INDEX_RADIUS_COEFFICIENT) * randomnessRange;
  }

  getRandomPetalWidth(radius: number, spiralIndex: number) {
    const randomnessRange = PETAL_WIDTH_RANDOMNESS - 1;
    const spiralIndexCoefficient = (spiralIndex * radius * SPIRAL_INDEX_WIDTH_COEFFICIENT); // width gets bigger as the radius goes down
    if (Math.random() > 0.5) return this.config.petalWidthCoefficient * radius + spiralIndexCoefficient - Math.random() * randomnessRange;
    return this.config.petalWidthCoefficient * radius + spiralIndexCoefficient +  Math.random() * randomnessRange;
  }

  getRandomPetalTaper(radius: number) {
    return this.config.petalTaper;
    // if (Math.random() > 0.5) return this.config.petalTaper + Math.random() * PETAL_TAPER_RANDOMNESS;
    // return this.config.petalTaper - Math.random() * PETAL_TAPER_RANDOMNESS;
  }
}
