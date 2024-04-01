import { prototype as p5 } from 'p5';
import { DreamFile } from './DreamFile';

type DreamFileSystemParams = {
  scale?: number;
  spacing?: number;
}

export const FILE_HEIGHT_DEFAULT = 24;
export const SPACING_DEFAULT = 12;

const FILE_LEVEL_CHILD_PROBABILITY: Record<number, number> = {
  0: 0.3,
  1: 0.3,
  2: 0.25,
  3: 0.15,
};

export type Files = Array<DreamFile>;


export class DreamFileSystem {
  scale;
  spacing;
  currentFile: DreamFile | null;
  files: Files;

  constructor({ scale = 1, spacing = SPACING_DEFAULT, }: DreamFileSystemParams) {
    this.scale = scale;
    this.spacing = spacing * scale;
    this.currentFile = null;
    this.files = [];
  }

  initializeFile({ fileIndex, level, isParent, sketch }: { fileIndex: number, level: number, isParent: boolean, sketch: typeof p5 }) {
    const file = new DreamFile({
      index: fileIndex,
      level,
      isParent,
      sketch,
      scale: this.scale,
      spacing: this.spacing,
    });
    this.files.push(file);

    return file;
  }

  getNextFileLevel({ level }: { level: number }) {
    const randomValue = Math.random();

    if (randomValue < FILE_LEVEL_CHILD_PROBABILITY[level]) return level + 1;
    if (level > 0 && randomValue > 0.75) return level - (Math.ceil(Math.random() * (level)));
    return level;
  }

  drawFiles({ yStart }: { yStart: number }) {
    this.files.forEach((file, i) => {
      file.drawFile({ y: yStart + i * this.spacing });
      file.drawSymbolOrLabel({ y: yStart + i * this.spacing });
    });
  }
}
