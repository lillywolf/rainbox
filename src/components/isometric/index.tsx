'use client';

import p5 from 'p5';
import { useEffect, useRef } from 'react';
import { Cube, IsometricGrid } from 'src/classes/IsometricGrid';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const IsometricCanvas = () => {
  const grid = new IsometricGrid({
    minX: 0,
    maxX: 20,
    minY: 0,
    maxY: 20,
    xDimension: 16,
  });

  const p5Ref = useRef<HTMLDivElement | null>(null);

  const IsometricSketch = (sketch: typeof p5.prototype) => {
    let lastFrame = 0;

    grid.build();

    const { cubes, unavailableCubes } = grid.getInitialCube();

    sketch.setup = () => {
      sketch.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p5.prototype.WEBGL);
      sketch.background(255);
      sketch.noFill();
      sketch.frameRate(5);
      grid.drawCubeFilledIn({ cube: cubes[0], sketch });
    };
  
    sketch.draw = () => {
      if (cubes.length < 500) {
        cubes.forEach((cube) => {
          const neighbor = grid.getNeighborCube({ cube, unavailableCubes });
          if (!neighbor) return;
          cubes.push(neighbor);
        });
        cubes.sort((a, b) => {
          return a.yIndex - b.yIndex === 0
            ? a.zIndex - b.zIndex === 0
              ? a.xIndex - b.xIndex
              : a.zIndex - b.zIndex
            : a.yIndex - b.yIndex
        });
        cubes.forEach((cube) => {
          grid.drawCubeOutline({ cube, sketch });
          grid.drawCubeFilledIn({ cube, sketch });
        });
      }
      lastFrame++;
    };
  };

  useEffect(() => {
    const sketch = new p5(IsometricSketch, p5Ref?.current ? p5Ref.current : undefined);
  }, []);

  return (
    <div ref={p5Ref}>

    </div>
  );
};

export default IsometricCanvas;
