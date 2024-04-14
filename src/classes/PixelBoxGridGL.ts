import { mat3, mat4 } from "gl-matrix";

import { ColorScheme, PINKY_FIELD, WHITE } from '@/constants/colors';
import { getRandomEntryFromObject, getRandomValueFromArray } from '@/utils/array';
import { ColorID, Color } from '../constants/colors';
import PixelCubeGL from "./PixelCubeGL";
import { ProgramInfo } from "@/components/pixel-box/gl";
import { position } from "@/utils/gl";
import { GridSquare } from "./PixelCube";

const DEFAULT_TILES = 10;
const DEFAULT_TILE_DIMENSION = 20;
const DEFAULT_COLOR_SCHEME = PINKY_FIELD;
const DEFAULT_GRID_ORIENTATION = { alpha: toRadians(-35.264), beta: toRadians(45), theta: toRadians(0) }; // arcsin(tan 30°), 45°

enum RotationMatrix {
  'alpha' = 'alpha',
  'beta' = 'beta',
  'theta' = 'theta'
}

type GridOrientation = {
  alpha: number;
  beta: number;
  theta: number;
}

export type PixelBoxGridGLParams = {
  gl: WebGL2RenderingContext;
  programInfo: ProgramInfo;

  scale?: number;
  xTiles?: number;
  yTiles?: number;
  zTiles?: number; 
  tileDimension?: number;
  gridOrientation?: GridOrientation;
  colorScheme?: ColorScheme;
  spacing?: number;
};

export type GridCubeGL = {
  cube: PixelCubeGL,
  metadata: {
    occupied?: boolean
  }
};

export class PixelBoxGridGL {
  gl;
  programInfo;

  scale;
  xTiles;
  yTiles;
  zTiles;
  tileDimension;
  gridOrientation;
  rotationMatrix;
  grid: GridCubeGL[][][];
  colorScheme;
  sortedGrid: GridCubeGL[];
  spacing: number;

  xu;
  yu;
  zu;

  constructor({
    gl,
    programInfo,
    scale = 1,
    xTiles = DEFAULT_TILES,
    yTiles = DEFAULT_TILES,
    zTiles = DEFAULT_TILES,
    tileDimension = DEFAULT_TILE_DIMENSION,
    gridOrientation = DEFAULT_GRID_ORIENTATION,
    colorScheme = DEFAULT_COLOR_SCHEME,
    spacing = 0,
  }: PixelBoxGridGLParams) {
    this.gl = gl;
    this.programInfo = programInfo;

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

  setProgramInfo(programInfo: ProgramInfo) {
    this.programInfo = programInfo;
  }

  clearGL() {
    const { gl } = this;

    gl.clearColor(1.0, 1.0, 1.0, 1.0); // clear to black
    gl.clearDepth(1.0); // clear everything
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL); // near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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
            cube: new PixelCubeGL({
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

  drawGrid() {
    const { gl, programInfo } = this;
    const dimensions = this.getDimensions();

    this.grid.flat(3).forEach((gridCube: GridCubeGL) => {
      const { cube } = gridCube;

      const bottom = Object.entries(cube.bottom).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: position(value, dimensions),
        }
      }, {} as GridSquare);
      
      const vertexBuffer = this.createVertexPositionBuffer(
        { vertices: [bottom.l.x, bottom.l.y, bottom.l.z, bottom.b.x, bottom.b.y, bottom.b.z, bottom.r.x, bottom.r.y, bottom.r.z, bottom.t.x, bottom.t.y, bottom.t.z] }
      );

      if (!vertexBuffer) {
        console.error('Failed to create vertex buffer');
        return;
      }

      this.setVertexPositionAttribute({ buffer: vertexBuffer, programInfo });

      const colorLocation = gl.getUniformLocation(programInfo.program, 'color');
      gl.uniform3fv(colorLocation, new Float32Array([1.0, 0.0, 0.0]));

      gl.drawArrays(gl.LINE_LOOP, 0, 4);

      // sketch.quad(top.l.x, top.l.y, top.l.z, top.b.x, top.b.y, top.b.z, top.r.x, top.r.y, top.r.z, top.t.x, top.t.y, top.t.z);
    });
  }

  getDimensions() {
    const dimensions = {
      x: this.xu * this.xTiles,
      y: this.yu * this.yTiles,
      z: this.zu * this.zTiles,
    };
    return { x: dimensions.x * 1.3, y: dimensions.y * 1.3, z: dimensions.z * 1.3 }; // 1.3 is for padding
  }

  drawCubeAtGridEntry(gridEntry: GridCubeGL) {
    const index = this.getIndexForGridEntry(gridEntry);

    this.sortedGrid[index] = gridEntry;
    this.setCubeColor(gridEntry.cube);

    const neighbors = this.getNeighborsInFrontOfGridEntry(gridEntry);

    if (neighbors.length === 3) {
      console.log("is hidden by neighbors, skip draw");
      return;
    };
  }

  initGL() {
    const { gl, programInfo } = this;

    const projectionMatrix = mat4.create();
    const perspectiveMatrix = this.createPerspectiveMatrix({
      fieldOfViewInRadians: Math.PI/3,
      aspectRatio: 1, // update this later to be CANVAS_WIDTH / CANVAS_HEIGHT
      near: 1,
      far: 3 // replace with CANVAS_HEIGHT
    });

    mat4.multiply(projectionMatrix, this.rotationMatrix, perspectiveMatrix);
    // mat4.perspective(projectionMatrix, fov, aspect, zNear, zFar);

    const modelViewMatrix = mat4.create();

    mat4.translate(
      modelViewMatrix,
      modelViewMatrix,
      [0, 0, -2.0]
    ); // amount to translate

    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix,
    );
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix,
    );
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

  drawCubes() {
    this.clearGL();

    this.getSortedGrid().forEach((entry) => {
      if (entry.metadata.occupied) {
        entry.cube.rotateInPlace();
        entry.cube.drawGL();
      }
    });
  }

  setCubeColor(cube: PixelCubeGL) {
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

  getIndexForGridEntry(gridEntry: GridCubeGL) {
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

  getNeighborsInFrontOfGridEntry(gridEntry: GridCubeGL) {
    const neighbors: GridCubeGL[] = [];
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

  createVertexPositionBuffer({ vertices }: { vertices: Array<number> }) {
    const { gl } = this;

    console.log(">>> vertices", vertices);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
    return positionBuffer;
  }

  setVertexPositionAttribute({ buffer, programInfo}: { programInfo: ProgramInfo, buffer: WebGLBuffer }) {
    const { gl } = this;

    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      3,
      gl.FLOAT,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
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

  createPerspectiveMatrix({
    fieldOfViewInRadians,
    aspectRatio,
    near,
    far,
  }: {
    fieldOfViewInRadians: number;
    aspectRatio: number;
    near: number;
    far: number;
  }) {
    const f = 1.0 / Math.tan(fieldOfViewInRadians / 2);
    const rangeInv = 1 / (near - far);
  
    return mat4.fromValues(
      f / aspectRatio,
      0,
      0,
      0,
      0,
      f,
      0,
      0,
      0,
      0,
      (near + far) * rangeInv,
      -1,
      0,
      0,
      near * far * rangeInv * 2,
      0,
    );
  };
}

export function toRadians(degrees: number) {
  return Math.PI * degrees/180;
}

export function toFloat32(array2d: number[][]) {
  return new Float32Array(array2d.flat(2));
}

export function createEmpty4DMatrix() {
  return new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

export function createEmpty3DMatrix() {
  return new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

