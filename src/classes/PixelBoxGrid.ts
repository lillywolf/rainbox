import { prototype as p5 } from 'p5';
import type p5Type from 'p5';
import { mat3 } from "gl-matrix";

import { Point3D } from "@/types/geometry";
import { ColorScheme, PINKY_FIELD, WHITE } from '@/constants/colors';
import { getRandomEntryFromObject, getRandomValueFromArray } from '@/utils/array';
import { ColorID, Color } from '../constants/colors';
import PixelCube from './PixelCube';

const DEFAULT_TILES = 10;
const DEFAULT_TILE_DIMENSION = 20;
const DEFAULT_COLOR_SCHEME = PINKY_FIELD;
const DEFAULT_GRID_ORIENTATION = { alpha: toRadians(-35.264), beta: toRadians(45) }; // arcsin(tan 30°), 45°

enum RotationMatrix {
  'alpha' = 'alpha',
  'beta' = 'beta',
}

type GridOrientation = {
  alpha: number;
  beta: number;
}

export type PixelBoxGridParams = {
  sketch: typeof p5;
  shader?: p5Type.Shader;
  gl?: WebGL2RenderingContext;
  program?: WebGLProgram;
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
  sketch;
  shader;
  gl;
  program;
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
    sketch,
    shader,
    gl,
    program,
    scale = 1,
    xTiles = DEFAULT_TILES,
    yTiles = DEFAULT_TILES,
    zTiles = DEFAULT_TILES,
    tileDimension = DEFAULT_TILE_DIMENSION,
    gridOrientation = DEFAULT_GRID_ORIENTATION,
    colorScheme = DEFAULT_COLOR_SCHEME,
    spacing = 0,
  }: PixelBoxGridParams) {
    this.sketch = sketch;
    this.shader = shader;
    this.gl = gl;
    this.program = program;
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

    sketch.colorMode(p5.HSL);

    this.rotationMatrix = this.createRotationMatrices();
    this.grid = [];
    this.sortedGrid = [];
  }

  setProgram(program: WebGLProgram) {
    this.program = program;
  }

  buildGrid() {
    this.setRotation();

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

  setRotation() {
    this.sketch.rotateX(this.gridOrientation.alpha);
    this.sketch.rotateY(this.gridOrientation.beta);
  }

  drawGrid() {
    this.grid.flat(3).forEach((gridCube: GridCube) => {
      const { cube: { bottom, top } } = gridCube;
      this.sketch.stroke('black');
      this.sketch.quad(bottom.l.x, bottom.l.y, bottom.l.z, bottom.b.x, bottom.b.y, bottom.b.z, bottom.r.x, bottom.r.y, bottom.r.z, bottom.t.x, bottom.t.y, bottom.t.z);
      this.sketch.quad(top.l.x, top.l.y, top.l.z, top.b.x, top.b.y, top.b.z, top.r.x, top.r.y, top.r.z, top.t.x, top.t.y, top.t.z);
    });
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

    const neighbors = this.getNeighborsInFrontOfGridEntry(gridEntry);

    if (neighbors.length === 3) {
      console.log("Is hidden by neighbors, skip draw");
      return;
    };

    this.drawCubes();

    // const allEntriesAfter = this.sortedGrid.slice(index);

    // allEntriesAfter.forEach((entry) => {
    //   if (entry.metadata.occupied) {
    //     entry.cube.draw();
    //   }
    // });
  }

  drawCubes() {
    this.getSortedGrid().forEach((entry) => {
      if (entry.metadata.occupied) {
        entry.cube.rotateInPlace();
        entry.cube.drawGL();
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

  createRotationMatrices() {
    const { alpha, beta } = this.gridOrientation;

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
      ]
    };

    const result = createEmpty3DMatrix();
    const alphaMatrix = matrices[RotationMatrix.alpha];
    const betaMatrix = matrices[RotationMatrix.beta];

    mat3.multiply(result, toFloat32(alphaMatrix), toFloat32(betaMatrix));

    return result;
  }

  getPoint2D(pt3D: Point3D) {
    const pt2D = createEmpty3DMatrix();
    mat3.multiply(pt2D, this.rotationMatrix, new Float32Array([pt3D.x, pt3D.y, pt3D.z]));

    return { x: pt2D[0], y: pt2D[4] };
  }
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
