import { prototype as p5 } from 'p5';
import { mat3 } from "gl-matrix";

import { Point3D } from "@/types/geometry";
import { WHITE } from '@/constants/colors';
import PixelCube from './PixelCubeP5';
import { GridCube, PixelBoxGrid, PixelBoxGridParams, RotationMatrix, createEmpty3DMatrix, toFloat32, toRadians } from './PixelBoxGrid';

const DEFAULT_GRID_ORIENTATION = { alpha: toRadians(-35.264), beta: toRadians(45) }; // arcsin(tan 30°), 45°

export type PixelBoxGridP5Params = PixelBoxGridParams & {
  sketch: typeof p5;
  vertexShader?: WebGLShader;
  fragmentShader?: WebGLShader;
};

export class PixelBoxGridP5 extends PixelBoxGrid {
  sketch;
  vertexShader;
  fragmentShader;

  constructor({
    sketch,
    vertexShader,
    fragmentShader,
    ...params
  }: PixelBoxGridP5Params) {
    super(params);

    this.sketch = sketch;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;

    sketch?.colorMode(p5.HSL);
  }

  setVertexShader(vertexShader: WebGLShader) {
    this.vertexShader = vertexShader;
  }

  setFragmentShader(fragmentShader: WebGLShader) {
    this.fragmentShader = fragmentShader;
  }

  getDimensions() {
    return {
      x: this.xu * this.xTiles,
      y: this.yu * this.yTiles,
      z: this.zu * this.zTiles,
    }
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
    const { sketch } = this;

    sketch.rotateX(this.gridOrientation.alpha);
    sketch.rotateY(this.gridOrientation.beta);
  }

  drawGrid() {
    const { sketch } = this;

    this.grid.flat(3).forEach((gridCube: GridCube) => {
      const { cube: { bottom, top } } = gridCube;
      sketch.stroke('black');
      sketch.quad(bottom.l.x, bottom.l.y, bottom.l.z, bottom.b.x, bottom.b.y, bottom.b.z, bottom.r.x, bottom.r.y, bottom.r.z, bottom.t.x, bottom.t.y, bottom.t.z);
      sketch.quad(top.l.x, top.l.y, top.l.z, top.b.x, top.b.y, top.b.z, top.r.x, top.r.y, top.r.z, top.t.x, top.t.y, top.t.z);
    });
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
  }

  drawCubes() {
    this.getSortedGrid().forEach((entry) => {
      if (entry.metadata.occupied) {
        entry.cube.rotateInPlace();
        entry.cube.draw();
      }
    });
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
}
