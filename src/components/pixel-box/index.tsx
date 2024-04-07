'use client';

import { FUN_PRIMARIES, GRASSY_FIELD, HARD_CANDY, MEADOW_FLOWERS, PINKY_FIELD } from '@/constants/colors';
import { getRandomValueFromArray } from '@/utils/array';
import p5 from 'p5';
import { useEffect, useRef } from 'react';
import { PixelBoxGrid } from 'src/classes/PixelBoxGrid';
import PixelBoxOrthoGrid from 'src/classes/PixelBoxOrthoGrid';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 1200;
const COLOR_SCHEMES = [PINKY_FIELD, FUN_PRIMARIES, MEADOW_FLOWERS, GRASSY_FIELD, HARD_CANDY];

const PixelBoxCanvas = () => {
  const p5Ref = useRef<HTMLDivElement | null>(null);

  const PixelBoxSketch = (sketch: typeof p5.prototype) => {
    let grid: PixelBoxGrid;
    let fov = Math.PI/3;
    let cameraDistance = (CANVAS_HEIGHT/2)/(Math.tan(fov/2));

    sketch.setup = () => {
      sketch.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p5.prototype.WEBGL);
      sketch.perspective(fov, CANVAS_WIDTH/CANVAS_HEIGHT, cameraDistance/10, cameraDistance*10);
      sketch.translate(0, -CANVAS_HEIGHT/2);
      sketch.background(255);
      sketch.noFill();

      grid = new PixelBoxGrid({
        sketch,
        tileDimension: 36,
        colorScheme: getRandomValueFromArray(COLOR_SCHEMES),
        spacing: 14,
        xTiles: 8,
        yTiles: 8,
        zTiles: 8,
      });
      grid.buildGrid();
      
      // sketch.frameRate(10);
    };

    sketch.draw = () => {
      sketch.translate(-CANVAS_WIDTH/2 + 200, -CANVAS_HEIGHT/2 + 200);
      console.log(">>> frameCount", sketch.frameCount)

      grid.setRotation();

      const gridEntry = grid.getRandomUnoccupiedGridEntry();

      // const gridEntry = grid.getGridEntryForIndex(sketch.frameCount - 1);

      if (!gridEntry) {
        console.log(`No grid index found for frame ${sketch.frameCount}`);
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
