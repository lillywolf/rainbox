import { ColorScheme, PINKY_FIELD, WHITE } from '@/constants/colors';
import { getRandomEntryFromObject, getRandomValueFromArray } from '@/utils/array';
import { ColorID, Color } from '../constants/colors';
import PixelCube from './PixelCube';
import { mat3, mat4 } from "gl-matrix";

const DEFAULT_TILES = 10;
const DEFAULT_TILE_DIMENSION = 20;
const DEFAULT_COLOR_SCHEME = PINKY_FIELD;
const DEFAULT_GRID_ORIENTATION = { alpha: toRadians(-35.264), beta: toRadians(45), theta: toRadians(0) }; // arcsin(tan 30°), 45°

export enum RotationMatrix {
  'alpha' = 'alpha',
  'beta' = 'beta',
  'theta' = 'theta',
}

export type GridOrientation = {
  alpha: number;
  beta: number;
  theta: number;
}

export type PixelBoxGridParams = {
  scale?: number;
  xTiles?: number;
  yTiles?: number;
  zTiles?: number; 
  tileDimension?: number;
  gridOrientation?: GridOrientation;
  colorScheme?: ColorScheme;
  spacing?: number;
};

export type GridCube = {
  cube: PixelCube,
  metadata: {
    occupied?: boolean
  }
};

export class PixelBoxGrid {
  scale;
  xTiles;
  yTiles;
  zTiles;
  tileDimension;
  gridOrientation;
  rotationMatrix;
  grid: GridCube[][][];
  colorScheme;
  sortedGrid: GridCube[];
  spacing: number;

  xu;
  yu;
  zu;

  constructor({
    scale = 1,
    xTiles = DEFAULT_TILES,
    yTiles = DEFAULT_TILES,
    zTiles = DEFAULT_TILES,
    tileDimension = DEFAULT_TILE_DIMENSION,
    gridOrientation = DEFAULT_GRID_ORIENTATION,
    colorScheme = DEFAULT_COLOR_SCHEME,
    spacing = 0,
  }: PixelBoxGridParams) {
    this.scale = scale;
    this.xTiles = xTiles;
    this.yTiles = yTiles;
    this.zTiles = zTiles;
    this.tileDimension = tileDimension || DEFAULT_TILE_DIMENSION;
    this.gridOrientation = gridOrientation;
    this.colorScheme = colorScheme;
    this.spacing = spacing;

    this.xu = this.scale * this.tileDimension;
    this.yu = this.scale * this.tileDimension;
    this.zu = this.scale * this.tileDimension;

    this.rotationMatrix = this.createRotationMatrix();
    this.grid = [];
    this.sortedGrid = [];
  }

  getDimensions() {
    return {
      x: this.xu * this.xTiles,
      y: this.yu * this.yTiles,
      z: this.zu * this.zTiles,
    }
  }

  buildGrid() {
    const { xu, yu, zu } = this;

    for (let x = 0; x < this.xTiles; x++) {
      this.grid.push([]);

      for (let y = 0; y < this.yTiles; y++) {
        this.grid[x].push([]);

        for (let z = 0; z < this.zTiles; z++) {
          const cxu = x * xu;
          const cyu = y * yu;
          const czu = z * zu;

          const bottom = {
            b: { x: cxu, y: cyu, z: czu },
            l: { x: cxu + xu, y: cyu, z: czu },
            t: { x: cxu + xu, y: cyu + yu, z: czu },
            r: { x: cxu, y: cyu + yu, z: czu }
          };
          const top = {
            b: { x: cxu, y: cyu, z: czu + zu },
            l: { x: cxu + xu, y: cyu, z: czu + zu },
            t: { x: cxu + xu, y: cyu + yu, z: czu + zu },
            r: { x: cxu, y: cyu + yu, z: czu + zu }
          };
          const center = { x: cxu + xu / 2, y: cyu + yu / 2, z: czu + zu/2 };
          
          this.grid[x][y].push({
            cube: new PixelCube({
              bottom,
              top,
              center,
              index: { xIndex: x, yIndex: y, zIndex: z },
              color: WHITE,
              spacing: this.spacing,
              grid: this,
            }),
            metadata: {
              occupied: false,
            }
          });
        }
      }
    }
  }

  reset() {
    this.sortedGrid = new Array(this.xTiles * this.yTiles * this.zTiles).fill(0);
  }

  getRandomUnoccupiedGridEntry() {
    const index = this.getRandomGridIndex();

    if (index < 0) {
      console.log("grid is full!")
      return;
    }

    const gridEntry = this.getGridEntryForIndex(index);

    if (!gridEntry) {
      console.error(`No entry found for index ${index}`);
      return;
    }

    if (gridEntry.metadata.occupied) {
      console.error(`Index already occupied by cube! ${index}`);
      return;
    }

    gridEntry.metadata.occupied = true;

    return gridEntry;
  }

  drawCubeAtGridEntry(gridEntry: GridCube) {
    const index = this.getIndexForGridEntry(gridEntry);

    this.sortedGrid[index] = gridEntry;
    this.setCubeColor(gridEntry.cube);

    this.drawCubes();
  }

  drawCubes() {
    this.getSortedGrid().forEach((entry) => {
      if (entry.metadata.occupied) {
        entry.cube.rotateInPlace();
        entry.cube.draw();
      }
    });
  }

  setCubeColor(cube: PixelCube) {
    const [_, color] = getRandomEntryFromObject<[ColorID, Color]>(this.colorScheme);
    cube.color = color;
  }

  getGridEntryForIndex(index: number) {
    const x = this.xTiles - Math.floor(index / (this.zTiles * this.yTiles)) - 1;
    const y = this.yTiles - Math.floor(index / this.zTiles) % this.yTiles - 1;
    const z = index % this.zTiles;

    if (x < 0 || y < 0) {
      console.log(`Index ${index} not found in grid`);
      return;
    }

    return this.grid[x][y][z];
  }

  getIndexForGridEntry(gridEntry: GridCube) {
    return gridEntry.cube.index.zIndex + (this.yTiles - gridEntry.cube.index.yIndex - 1) * this.zTiles + (this.xTiles - gridEntry.cube.index.xIndex - 1) * this.zTiles * this.yTiles;
  }

  getRandomGridIndex() {
    const unoccupiedFlatMap = this.grid.flat(3).filter((entry) => !entry.metadata.occupied);

    if (!unoccupiedFlatMap.length) {
      console.log("grid is full!");
      return -1;
    }

    return this.getIndexForGridEntry(getRandomValueFromArray(unoccupiedFlatMap));
  }

  getRandomGridEntry() {
    const unoccupiedFlatMap = this.grid.flat(3).filter((entry) => !entry.metadata.occupied);

    if (!unoccupiedFlatMap.length) {
      console.log("grid is full!");
      return;
    }

    return getRandomValueFromArray(unoccupiedFlatMap);
  }

  getNeighborsInFrontOfGridEntry(gridEntry: GridCube) {
    const neighbors: GridCube[] = [];
    const { cube } = gridEntry;

    if (cube.index.xIndex > 0) {
      const neighbor = this.grid[cube.index.xIndex - 1][cube.index.yIndex][cube.index.zIndex];
      if (neighbor.metadata.occupied) neighbors.push(neighbor);
    }
    if (cube.index.yIndex > 0){
      const neighbor = this.grid[cube.index.xIndex][cube.index.yIndex - 1][cube.index.zIndex];
      if (neighbor.metadata.occupied) neighbors.push(neighbor);
    }
    if (cube.index.zIndex < this.zTiles - 1) {
      const neighbor = this.grid[cube.index.xIndex][cube.index.yIndex][cube.index.zIndex + 1];
      if (neighbor.metadata.occupied) neighbors.push(neighbor);
    }

    return neighbors;
  }

  getSortedGrid() {
    return this.grid.flat(3).sort((a, b) => {
      return a.cube.index.zIndex - b.cube.index.zIndex === 0
        ? a.cube.index.yIndex - b.cube.index.yIndex === 0
          ? a.cube.index.xIndex - b.cube.index.xIndex
          : a.cube.index.yIndex - b.cube.index.yIndex
        : a.cube.index.zIndex - b.cube.index.zIndex
    });
  }

  createRotationMatrix() {
    const { alpha, beta, theta } = this.gridOrientation;

    const matrices = {
      [RotationMatrix.alpha]: [
        [1, 0, 0],
        [0, Math.cos(alpha), Math.sin(alpha)],
        [0, -Math.sin(alpha), Math.cos(alpha)],
      ],
      [RotationMatrix.beta]: [
        [Math.cos(beta), 0, -Math.sin(beta)],
        [0, 1, 0],
        [Math.sin(beta), 0, Math.cos(beta)],
      ],
      [RotationMatrix.theta]: [
        [Math.cos(theta), -Math.sin(theta), 0],
        [Math.sin(theta), Math.cos(theta), 0],
        [0, 0, 1],
      ]
    };

    const result = mat3.create();

    const alphaMatrix = matrices[RotationMatrix.alpha];
    const betaMatrix = matrices[RotationMatrix.beta];
    const thetaMatrix = matrices[RotationMatrix.theta];

    mat3.multiply(result, mat3.multiply(mat3.create(), toFloat32(alphaMatrix), toFloat32(betaMatrix)), toFloat32(thetaMatrix));

    return mat4.fromValues(result[0], result[1], result[2], 0, result[3], result[4], result[5], 0, result[6], result[7], result[8], 0, 0, 0, 0, 1);
  }

  // getPoint2D(pt3D: Point3D) {
  //   const pt2D = createEmpty3DMatrix();
  //   mat3.multiply(pt2D, this.rotationMatrix, new Float32Array([pt3D.x, pt3D.y, pt3D.z]));

  //   return { x: pt2D[0], y: pt2D[4] };
  // }
}

export function toRadians(degrees: number) {
  return Math.PI * degrees/180;
}

export function toFloat32(array2d: number[][]) {
  return new Float32Array(array2d.flat(2));
}

export function createEmpty3DMatrix() {
  return new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

export function createEmpty4DMatrix() {
  return new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}
