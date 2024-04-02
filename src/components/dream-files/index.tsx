'use client';

import p5 from 'p5';
import { useEffect, useRef } from 'react';

import { DreamFileSystem } from 'src/classes/DreamFileSystem';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const X_PADDING = 60;
const Y_PADDING = 60;
const MAX_ROWS = 22;

const BACKGROUND_COLOR = [20, 20, 20];

const DreamFilesCanvas = () => {
  const dreamFileSystem = new DreamFileSystem({ scale: 0.8, spacing: 36 });

  const p5Ref = useRef<HTMLDivElement | null>(null);

  const initFile = ({ fileIndex, level, isParent, sketch }: { fileIndex: number, level: number, isParent: boolean, sketch: typeof p5.prototype }) => {
    const file = dreamFileSystem.initializeFile({
      fileIndex,
      level,
      isParent,
      sketch,
    });
    dreamFileSystem.currentFile = file;
  }

  const DreamFilesSketch = (sketch: typeof p5.prototype) => {
    let lastFileFrame = 1;
    let currentFileIndex = 0;
    let currentFileLevel = 0;
    let yStart = 0;
    let font: string | object;

    sketch.preload = () => {
      font = sketch.loadFont('/fonts/VictorMono-Regular.ttf');
    };

    sketch.setup = () => {
      sketch.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      sketch.background(BACKGROUND_COLOR);
      sketch.translate(X_PADDING, Y_PADDING);
      sketch.textFont('Courier New');
      
      initFile({
        fileIndex: 0,
        level: 0,
        isParent: false,
        sketch,
      });
    };
  
    sketch.draw = () => {
      sketch.translate(X_PADDING, Y_PADDING);

      const isNewFile = lastFileFrame + dreamFileSystem.currentFile!.getLabelOrSymbolLength() + 1 === sketch.frameCount;

      if (isNewFile && currentFileIndex >= MAX_ROWS) {
        sketch.clear();
        sketch.background(BACKGROUND_COLOR);
        yStart = -(currentFileIndex - MAX_ROWS) * dreamFileSystem.spacing;
        dreamFileSystem.drawFiles({ yStart });
      }

      if (isNewFile) {
        // initialize the file
        currentFileIndex++;
        // anticipate the level of the next (+1) file
        const nextFileLevel = dreamFileSystem.getNextFileLevel({ level: currentFileLevel });
        const isParent = nextFileLevel === currentFileLevel + 1;
        initFile({
          fileIndex: currentFileIndex,
          level: currentFileLevel,
          isParent,
          sketch,
        });
        currentFileLevel = nextFileLevel;
        lastFileFrame = sketch.frameCount;
      }

      sketch.translate(0, yStart + dreamFileSystem.spacing * currentFileIndex);
      dreamFileSystem.currentFile!.drawFile();
      
      if (!isNewFile) {
        dreamFileSystem.currentFile!.drawNextLabelCharacter();
      }
    };
  };

  useEffect(() => {
    const sketch = new p5(DreamFilesSketch, p5Ref?.current ? p5Ref.current : undefined);
  }, []);

  return (
    <div ref={p5Ref}>

    </div>
  );
}

export default DreamFilesCanvas;
