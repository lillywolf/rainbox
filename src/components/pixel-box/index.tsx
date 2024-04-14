'use client';

import { FUN_PRIMARIES, GRASSY_FIELD, HARD_CANDY, MEADOW_FLOWERS, PINKY_FIELD } from '@/constants/colors';
import { getRandomValueFromArray } from '@/utils/array';
import p5 from 'p5';
import { RefObject, useEffect, useRef } from 'react';
import { PixelBoxGrid } from 'src/classes/PixelBoxGrid';
import PixelBoxOrthoGrid from 'src/classes/PixelBoxOrthoGrid';
import { createProgram, createShader } from './gl';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 1200;
const COLOR_SCHEMES = [PINKY_FIELD, FUN_PRIMARIES, MEADOW_FLOWERS, GRASSY_FIELD, HARD_CANDY];

const PixelBoxCanvas = () => {
  const p5Ref = useRef<HTMLDivElement | null>(null);

  const PixelBoxSketch = (sketch: typeof p5.prototype) => {
    let grid: PixelBoxGrid;
    let program: WebGLProgram;
    let fragmentShader: WebGLShader;
    let vertexShader: WebGLShader; 
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

      // const gl = getGL(p5Ref)!;

      grid = new PixelBoxGrid({
        sketch,
        gl: sketch.drawingContext,
        program,
        vertexShader,
        fragmentShader,
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

      // use with perspective grid
      // sketch.translate(-CANVAS_WIDTH/2 + 200, -CANVAS_HEIGHT/2 + 200);

      grid.setRotation();

      let gridEntry;
      if (sketch.frameCount % 10 === 0) {
        gridEntry = grid.getRandomUnoccupiedGridEntry();
      }

      // const gridEntry = grid.getGridEntryForIndex(sketch.frameCount - 1);

      if (!gridEntry) {
        if (sketch.frameCount % 10 === 0) {
          console.log(`No grid index found for frame ${sketch.frameCount}`);
        }
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
    
      vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSourceJSON)!;
      fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSourceJSON)!;
      program = createProgram(gl, vertexShader, fragmentShader)!;

      gl.useProgram(program);

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

function getGL(ref: RefObject<HTMLDivElement>) {
  const canvas = ref.current?.getElementsByClassName('p5Canvas')[0] as HTMLCanvasElement;
  return canvas.getContext('webgl2');
}

export default PixelBoxCanvas;
