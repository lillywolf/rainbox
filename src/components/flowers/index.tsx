'use client';

import p5 from 'p5';
import { useEffect, useRef } from 'react';

import { DahliaConfig, FLOWERS } from '@/constants/flowers';
import { Flower } from 'src/classes/Flower';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const Flowers = () => {
  const p5Ref = useRef<HTMLDivElement | null>(null);
  
  const FlowersSketch = (sketch: typeof p5.prototype) => {
    let lastFrame = 0;
    const flower = new Flower({config: DahliaConfig, radius: 150 + Math.random() * 50});

    sketch.setup = () => {
      sketch.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      sketch.background(41, 41, 41);
      sketch.stroke(0);
      sketch.fill(100, 100, 100);
    };

    sketch.draw = () => {
      sketch.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
      if (lastFrame === 0) {
        flower.build(sketch);
      }
      if (lastFrame % 10 === 0 && lastFrame < 2000) {
          // sketch.translate(Math.random() * CANVAS_WIDTH, Math.random() * CANVAS_HEIGHT); // pick a random spot on the board
          // const flower = new Flower({config: FLOWERS[Math.floor(Math.random() * FLOWERS.length)], radius: 10 + Math.random() * 30});
        flower.draw(sketch);
      }
      lastFrame++;
    };      
    
    // spiral.buildLogarithmic(sketch);
  };

  useEffect(() => {
    const sketch = new p5(FlowersSketch, p5Ref?.current ? p5Ref.current : undefined);
  }, []);

  return (
    <div ref={p5Ref}>

    </div>
  );
};

export default Flowers;
