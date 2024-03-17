'use client';

import p5 from 'p5';
import { useEffect, useRef } from 'react';
import { HexagonalGrid } from 'src/classes/HexagonalGrid';

const Hexagons = () => {
  const grid = new HexagonalGrid({
    minX: 1,
    maxX: 21,
    minY: 1,
    maxY: 21
  });

  const p5Ref = useRef<HTMLDivElement | null>(null);

  const HexagonalSketch = (sketch: typeof p5.prototype) => {
    sketch.setup = () => {
      sketch.createCanvas(400, 400);
      sketch.background(255);
      sketch.stroke(255, 84, 212);
      sketch.noFill();
      grid.build(sketch);
    };
  
    sketch.draw = () => {
    };
  };

  useEffect(() => {
    const sketch = new p5(HexagonalSketch, p5Ref?.current ? p5Ref.current : undefined);
  }, []);

  return (
    <div ref={p5Ref}>

    </div>
  );
};

export default Hexagons;
