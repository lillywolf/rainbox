'use client';

import p5 from 'p5';
import { useEffect, useRef } from 'react';

import { DreamFileSystem } from 'src/classes/DreamFileSystem';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const FILE_MARGIN = 28;
const X_PADDING = 60;
const Y_PADDING = 40;
const MAX_ROWS = 25;

const BACKGROUND_COLOR = [20, 20, 20];
const TEXT_COLOR = [255, 255, 255];

const DreamFilesCanvas = () => {
  const dreamFileSystem = new DreamFileSystem({ scale: 0.8 });

  const p5Ref = useRef<HTMLDivElement | null>(null);

  const DreamFilesSketch = (sketch: typeof p5.prototype) => {
    let totalFileFrames = 1;
    let currentFileIndex = 0;
    let currentFileLevel = 0;
    let nextFileLevel = 0;
    let font: string | object;

    sketch.preload = () => {
      font = sketch.loadFont('/fonts/VictorMono-Regular.ttf');
    };

    sketch.setup = () => {
      sketch.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      sketch.background(BACKGROUND_COLOR);
      sketch.translate(X_PADDING, Y_PADDING);
      sketch.textFont(font);
    };
  
    sketch.draw = () => {
      sketch.translate(X_PADDING, Y_PADDING + FILE_MARGIN * currentFileIndex);
      // print the file icon
      if (sketch.frameCount === totalFileFrames && currentFileIndex < MAX_ROWS) {
        nextFileLevel = dreamFileSystem.getNextFileLevel({ level: currentFileLevel });
        const file = dreamFileSystem.initializeFile({
          fileIndex: currentFileIndex,
          level: currentFileLevel,
          isParent: nextFileLevel === currentFileLevel + 1
        });
        dreamFileSystem.currentFile = file;
        dreamFileSystem.drawFile({
          sketch,
          colors: {
            backgroundColor: BACKGROUND_COLOR,
            textColor: TEXT_COLOR,
          },
        });
        // initialize the label
        dreamFileSystem.initializeLabel({
          sketch,
          colors: {
            backgroundColor: BACKGROUND_COLOR,
            textColor: TEXT_COLOR,
          },
        });
        currentFileLevel = nextFileLevel;
      }
      const fileLabelLength = dreamFileSystem.getLabelLength();
      // print the next character in the label
      if (sketch.frameCount < totalFileFrames + fileLabelLength && currentFileIndex < MAX_ROWS) {
        dreamFileSystem.drawNextLabelCharacter({ sketch });
      }
      if (sketch.frameCount === totalFileFrames + fileLabelLength - 1 && currentFileIndex < MAX_ROWS) {
        // set up variables for next file
        totalFileFrames += fileLabelLength;
        currentFileIndex++;
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
