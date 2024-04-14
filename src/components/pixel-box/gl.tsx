'use client';

import { FUN_PRIMARIES, GRASSY_FIELD, HARD_CANDY, MEADOW_FLOWERS, PINKY_FIELD } from '@/constants/colors';
import { getRandomValueFromArray } from '@/utils/array';
import { RefObject, useEffect, useRef } from 'react';
import { PixelBoxGridGL } from 'src/classes/PixelBoxGridGL';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 1200;
const COLOR_SCHEMES = [PINKY_FIELD, FUN_PRIMARIES, MEADOW_FLOWERS, GRASSY_FIELD, HARD_CANDY];

export type ProgramInfo = {
  program: WebGLProgram;
  attribLocations: Record<string, number>;
  uniformLocations: Record<string, WebGLUniformLocation | null>;
}

const PixelBoxGLCanvas = () => {
  const glRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<PixelBoxGridGL | null>(null);

  let programInfo: ProgramInfo;
  let fragmentShader: WebGLShader;
  let vertexShader: WebGLShader;
  let gl: WebGL2RenderingContext;
  let frameCount = 0;

  async function initGL() {  
    const vertexSource = await fetch('/box/pixel-box/api/shader/shader.vert');
    const vertexSourceJSON = await vertexSource.json();
    const fragmentSource = await fetch('/box/pixel-box/api/shader/shader.frag');
    const fragmentSourceJSON = await fragmentSource.json();
  
    vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSourceJSON)!;
    fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSourceJSON)!;
    const program = createProgram(gl, vertexShader, fragmentShader)!;

    programInfo = {
      program,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(program, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix'),
      },
    };
  }

  async function init() {
    const glFromRef = getGL(glRef);

    if (!glFromRef) {
      console.error(`No GL context found`);
      return;
    };

    gl = glFromRef;

    await initGL();

    gridRef.current = new PixelBoxGridGL({
      gl,
      programInfo: programInfo,
      tileDimension: 100,
      colorScheme: getRandomValueFromArray(COLOR_SCHEMES),
      spacing: 8,
      xTiles: 5,
      yTiles: 5,
      zTiles: 5,
    });

    gridRef.current.initGL();
    gridRef.current.buildGrid();
  }

  useEffect(() => {
    init().then(() => {
      draw();
    });
  }, []);

  function draw() {
    frameCount++;

    const grid = gridRef.current;

    if (!grid) return;

    if (frameCount % 10 === 0) {
      const gridEntry = grid.getRandomUnoccupiedGridEntry();
      if (!gridEntry) {
        console.log(`No grid index found for frame ${frameCount}`);
        return;
      }
      grid.drawCubeAtGridEntry(gridEntry);
    }

    grid.drawCubes();  
  }

  setInterval(() => {
    draw();
  }, 30);

  return (
    <div ref={glRef}>
      <canvas id='glcanvas' width={ CANVAS_WIDTH } height={ CANVAS_HEIGHT }></canvas>
    </div>
  ); 
}

export function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader!, source);
  gl.compileShader(shader!);
  const success = gl.getShaderParameter(shader!, gl.COMPILE_STATUS);

  if (success) return shader;

  console.log(gl.getShaderInfoLog(shader!));
  gl.deleteShader(shader);
}

export function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram();

  if (!program) {
    console.error('No program created for gl');
    return;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (success) return program;

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function getGL(ref: RefObject<HTMLDivElement>) {
  const canvas = ref.current?.querySelector('#glcanvas') as HTMLCanvasElement;

  return canvas.getContext('webgl2');
}

export default PixelBoxGLCanvas;
