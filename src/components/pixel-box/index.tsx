'use client';

import { FUN_PRIMARIES, GRASSY_FIELD, HARD_CANDY, MEADOW_FLOWERS, PINKY_FIELD } from '@/constants/colors';
import { getRandomValueFromArray } from '@/utils/array';
import p5 from 'p5';
import { RefObject, useEffect, useRef } from 'react';
import { PixelBoxGrid } from 'src/classes/PixelBoxGrid';
import PixelBoxOrthoGrid from 'src/classes/PixelBoxOrthoGrid';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 1200;
const COLOR_SCHEMES = [PINKY_FIELD, FUN_PRIMARIES, MEADOW_FLOWERS, GRASSY_FIELD, HARD_CANDY];

const PixelBoxCanvas = () => {
  const p5Ref = useRef<HTMLDivElement | null>(null);

  const PixelBoxSketch = (sketch: typeof p5.prototype) => {
    let grid: PixelBoxGrid;
    let program: WebGLProgram;
    let fov = Math.PI/3;
    let cameraDistance = (CANVAS_HEIGHT/2)/(Math.tan(fov/2));

    sketch.preload = () => {

    }

    sketch.setup = () => {
      sketch.pixelDensity(1);

      sketch.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p5.prototype.WEBGL);
      sketch.perspective(fov, CANVAS_WIDTH/CANVAS_HEIGHT, cameraDistance/10, cameraDistance*10);
      sketch.background(255);

      initGL(p5Ref);

      const gl = getGL(p5Ref)!;

      grid = new PixelBoxGrid({
        sketch,
        gl,
        program,
        tileDimension: 50,
        colorScheme: getRandomValueFromArray(COLOR_SCHEMES),
        spacing: 8,
        xTiles: 5,
        yTiles: 5,
        zTiles: 5,
      });
      grid.buildGrid();
      
      sketch.frameRate(10);
    };

    sketch.draw = () => {
      sketch.clear();
      console.log(">>> frameCount", sketch.frameCount);

      // use with perspective grid
      // sketch.translate(-CANVAS_WIDTH/2 + 200, -CANVAS_HEIGHT/2 + 200);

      grid.setRotation();

      let gridEntry;
      if (sketch.frameCount % 10 === 0) {
        gridEntry = grid.getRandomUnoccupiedGridEntry();
      }

      // const gridEntry = grid.getGridEntryForIndex(sketch.frameCount - 1);

      if (!gridEntry) {
        console.log(`No grid index found for frame ${sketch.frameCount}`);
        grid.drawCubes();
        return;
      }

      // grid.setCubeColor(gridEntry.cube);
      // gridEntry.cube.draw();

      grid.drawCubeAtGridEntry(gridEntry);
    }

    async function initGL(ref: RefObject<HTMLDivElement>) {
      const gl = getGL(ref);
    
      if (!gl) {
        console.error(`No GL context found`);
        return;
      };
    
      const vertexSource = await fetch('/box/pixel-box/api/shader/shader.vert');
      const vertexSourceJSON = await vertexSource.json();
      const fragmentSource = await fetch('/box/pixel-box/api/shader/shader.frag');
      const fragmentSourceJSON = await fragmentSource.json();
    
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSourceJSON)!;
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSourceJSON)!;
    
      const program = createProgram(gl, vertexShader, fragmentShader)!;

      grid.setProgram(program);
    }
  }

  useEffect(() => {
    const sketch = new p5(PixelBoxSketch, p5Ref?.current ? p5Ref.current : undefined);
  }, []);

  return (
    <div ref={p5Ref}>

    </div>
  ); 
}

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader!, source);
  gl.compileShader(shader!);
  var success = gl.getShaderParameter(shader!, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader!));
  // gl.deleteShader(shader);
}

function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram();
  console.log(">>>> program", program)

  if (!program) {
    console.error("No program created for gl");
    return;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  console.log(">>>> vertexShader", vertexShader)

  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  console.log(">>>> success", success)

  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  // gl.deleteProgram(program);
}

function getGL(ref: RefObject<HTMLDivElement>) {
  const canvas = ref.current?.getElementsByClassName('p5Canvas')[0] as HTMLCanvasElement;
  return canvas.getContext('webgl2');
}

export default PixelBoxCanvas;
