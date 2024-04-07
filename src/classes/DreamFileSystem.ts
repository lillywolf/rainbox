import { prototype as p5 } from 'p5';
import { DreamFile, FILE_TYPES } from './DreamFile';

type DreamFileSystemParams = {
  scale?: number;
  spacing?: number;
}

export const FILE_HEIGHT_DEFAULT = 24;
export const SPACING_DEFAULT = 12;

const FILE_LEVEL_CHILD_PROBABILITY: Record<number, number> = {
  0: 0.35,
  1: 0.3,
  2: 0.25,
  3: 0.2,
  4: 0.15,
  5: 0.1,
  6: 0.05,
  7: 0.03,
  8: 0.01
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

  initializeFile({ fileIndex, level, isParent, type, sketch }: { fileIndex: number; level: number; isParent: boolean; type: FILE_TYPES; sketch: typeof p5; }) {
    const file = new DreamFile({
      index: fileIndex,
      level,
      isParent,
      type,
      sketch,
      scale: this.scale,
      spacing: this.spacing,
    });
    this.files.push(file);

    return file;
  }

  getNextFileLevel({ level, type }: { level: number, type: FILE_TYPES }) {
    if (type === FILE_TYPES.file) {
      if (Math.random() < 0.5) return { type: FILE_TYPES.file, level };
      return { type: FILE_TYPES.folder, level: level - 1 - (Math.ceil(Math.random() * (level - 1))) };
    }

    const randomValue = Math.random();
    if (randomValue < FILE_LEVEL_CHILD_PROBABILITY[level]) {
      if (Math.random() < 0.25) return { type: FILE_TYPES.file, level: level + 1 };
      return { type: FILE_TYPES.folder, level: level + 1 };
    }
    if (level > 0 && randomValue > 0.75) {
      return { type: FILE_TYPES.folder, level: level - (Math.ceil(Math.random() * (level))) };
    }

    return { type, level };
  }

  drawFiles({ yStart }: { yStart: number }) {
    this.files.forEach((file, i) => {
      file.drawFile({ y: yStart + i * this.spacing });
      file.drawSymbolOrLabel({ y: yStart + i * this.spacing });
    });
  }
}
