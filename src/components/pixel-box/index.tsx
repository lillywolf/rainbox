'use client';

import p5 from 'p5';

import { FUN_PRIMARIES, GRASSY_FIELD, HARD_CANDY, MEADOW_FLOWERS, PINKY_FIELD } from '@/constants/colors';
import { getRandomValueFromArray } from '@/utils/array';
import { useEffect, useRef } from 'react';
import { PixelBoxGridP5 } from 'src/classes/PixelBoxGridP5';
import PixelBoxOrthoGridP5 from 'src/classes/PixelBoxOrthoGridP5';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 1200;
const COLOR_SCHEMES = [PINKY_FIELD, FUN_PRIMARIES, MEADOW_FLOWERS, GRASSY_FIELD, HARD_CANDY];

const PixelBoxCanvas = () => {
  const p5Ref = useRef<HTMLDivElement | null>(null);

  const PixelBoxSketch = (sketch: typeof p5.prototype) => {
    let grid: PixelBoxGridP5;
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

      grid = new PixelBoxGridP5({
        sketch,
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
  }

  useEffect(() => {
    const sketch = new p5(PixelBoxSketch, p5Ref?.current ? p5Ref.current : undefined);
  }, []);

  return (
    <div ref={p5Ref}>

    </div>
  ); 
}

export default PixelBoxCanvas;
