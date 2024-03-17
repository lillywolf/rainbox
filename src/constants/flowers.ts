import { Point } from '@/types/geometry';
import { FlowerConfig } from 'src/classes/Flower';
import { SPIRAL_DIRECTION, SPIRAL_FUNCTION } from 'src/classes/Spiral';

export type Petal = {
  outer: Point;
  inner: Point;
  theta: number;
  b1c1: Point;
  b2c1: Point;
  b1c2: Point;
  b2c2: Point;
};

const COLORS = [
  [15, 164, 219],
  [255, 139, 224],
  [243, 255, 108],
  [107, 255, 253],
  [107, 255, 124]
];

export enum PETAL_STYLE {
  'rounded' = 'rounded',
  'pointed' = 'pointed',
}

export type PETAL_STYLES = PETAL_STYLE.rounded | PETAL_STYLE.pointed;

export const SunflowerConfig: FlowerConfig = {
  directions: [SPIRAL_DIRECTION.clockwise, SPIRAL_DIRECTION.counterclockwise],
  k: 0.4,
  spiralFn: SPIRAL_FUNCTION.logarithmic,
  seedDiameter: 10,
  numberOfSeedSpirals: 34,
  numberOfPetals: 8,
  numberOfPetalSpirals: 1,
  petalWidthCoefficient: .4,
  petalControlStart: 0,
  petalTaper: 3,
  petalStyle: PETAL_STYLE.pointed,
  innerRadius: 0,
};

export const DaisyConfig: FlowerConfig = {
  directions: [SPIRAL_DIRECTION.clockwise, SPIRAL_DIRECTION.counterclockwise],
  k: 0.4,
  spiralFn: SPIRAL_FUNCTION.logarithmic,
  seedDiameter: 10,
  numberOfSeedSpirals: 34,
  numberOfPetals: 12,
  numberOfPetalSpirals: 1,
  petalWidthCoefficient: .4,
  petalTaper: 0.5,
  petalControlStart: 0,
  petalStyle: PETAL_STYLE.rounded,
  innerRadius: 0,
};
  
export const DandelionConfig: FlowerConfig = {
  directions: [SPIRAL_DIRECTION.clockwise, SPIRAL_DIRECTION.counterclockwise],
  k: 0.4,
  spiralFn: SPIRAL_FUNCTION.logarithmic,
  seedDiameter: 10,
  numberOfSeedSpirals: 34,
  numberOfPetals: 20,
  numberOfPetalSpirals: 1,
  petalWidthCoefficient: .3,
  petalControlStart: 0.2,
  petalTaper: 0.5,
  petalStyle: PETAL_STYLE.rounded,
  innerRadius: 0,
};

export const LilyConfig: FlowerConfig = {
  directions: [SPIRAL_DIRECTION.clockwise, SPIRAL_DIRECTION.counterclockwise],
  k: 0.4,
  spiralFn: SPIRAL_FUNCTION.logarithmic,
  seedDiameter: 10,
  numberOfSeedSpirals: 34,
  numberOfPetals: 5,
  numberOfPetalSpirals: 1,
  petalWidthCoefficient: .5,
  petalControlStart: 0.1,
  petalTaper: 1.5,
  petalStyle: PETAL_STYLE.pointed,
  innerRadius: 0,
};

export const DahliaConfig: FlowerConfig = {
  directions: [SPIRAL_DIRECTION.clockwise, SPIRAL_DIRECTION.counterclockwise],
  k: 0.4,
  spiralFn: SPIRAL_FUNCTION.logarithmic,
  seedDiameter: 10,
  numberOfSeedSpirals: 34,
  numberOfPetals: 16,
  numberOfPetalSpirals: 5,
  petalWidthCoefficient: 0.35,
  petalControlStart: 0.1,
  petalTaper: 0.42,
  petalStyle: PETAL_STYLE.rounded,
  innerRadius: 0.3,
};

export const FLOWERS: Array<FlowerConfig> = [
  SunflowerConfig,
  DaisyConfig,
  DandelionConfig,
  LilyConfig,
  DahliaConfig
];
  