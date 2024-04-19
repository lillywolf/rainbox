import { mat3, mat4 } from "gl-matrix";

import { WHITE } from '@/constants/colors';
import PixelCubeGL from "./PixelCubeGL";
import { ProgramInfo } from "@/components/pixel-box/gl";
import { createPerspectiveMatrix, position } from "@/utils/gl";
import { GridSquare } from "./PixelCube";
import { PixelBoxGrid, PixelBoxGridParams, RotationMatrix, toFloat32, toRadians } from "./PixelBoxGrid";

const DEFAULT_GRID_ORIENTATION = { alpha: toRadians(-35.264), beta: toRadians(45), theta: toRadians(0) }; // arcsin(tan 30°), 45°

const GL_PADDING = 1;

export type PixelBoxGridGLParams = PixelBoxGridParams & {
  gl: WebGL2RenderingContext;
  programInfo: ProgramInfo;
};

export type GridCubeGL = {
  cube: PixelCubeGL,
  metadata: {
    occupied?: boolean
  }
};

export class PixelBoxGridGL extends PixelBoxGrid {
  gl;
  grid: GridCubeGL[][][];
  programInfo;
  rotationMatrix;

  constructor({
    gl,
    programInfo,
    ...params
  }: PixelBoxGridGLParams) {
    super(params);

    this.gl = gl;
    this.programInfo = programInfo;

    this.xu = this.scale * this.tileDimension;
    this.yu = this.scale * this.tileDimension;
    this.zu = this.scale * this.tileDimension;

    this.grid = [];
    this.rotationMatrix = this.createRotationMatrix();
  }

  setProgramInfo(programInfo: ProgramInfo) {
    this.programInfo = programInfo;
  }

  clearGL() {
    const { gl } = this;

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
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
    return {
      x: dimensions.x * GL_PADDING,
      y: dimensions.y * GL_PADDING,
      z: dimensions.z * GL_PADDING
    };
  }

  drawCubeAtGridEntry(gridEntry: GridCubeGL) {
    const index = this.getIndexForGridEntry(gridEntry);

    this.sortedGrid[index] = gridEntry;
    this.setCubeColor(gridEntry.cube);
  }

  initGL() {
    const { gl, programInfo } = this;

    const projectionMatrix = mat4.create();
    const perspectiveMatrix = createPerspectiveMatrix({
      fieldOfViewInRadians: Math.PI/3,
      aspectRatio: 1,
      near: 1,
      far: 5,
    });

    // mat4.rotateX(projectionMatrix, perspectiveMatrix, this.gridOrientation.alpha);
    // mat4.rotateY(projectionMatrix, perspectiveMatrix, this.gridOrientation.beta);
    mat4.multiply(projectionMatrix, this.rotationMatrix, perspectiveMatrix);

    const modelViewMatrix = mat4.create();
    mat4.translate(
      modelViewMatrix,
      modelViewMatrix,
      [-0.5, -0.5, -2.5]
    );

    console.log(">>> modelViewMatrix", modelViewMatrix)

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

  drawCubes() {
    this.clearGL();

    this.getSortedGrid().forEach((entry) => {
      if (entry.metadata.occupied) {
        entry.cube.rotateInPlace();
        entry.cube.drawGL();
      }
    });
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
}
