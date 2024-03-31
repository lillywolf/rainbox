import { Point } from '@/types/geometry';
import { prototype as p5 } from 'p5';

type DreamFileSystemParams = {
  scale?: number;
}

const FILE_HEIGHT_DEFAULT = 24;
const FILE_BUTTON_HEIGHT_DEFAULT = 10;
const FILE_WIDTH_DEFAULT = 28;
const TEXT_SIZE_DEFAULT = 13;
const BUTTON_INDENT_DEFAULT = -20;
const FILE_INDENT_DEFAULT = 32;
const FILE_TEXT_MARGIN_DEFAULT = 12;
const LABEL_BOTTOM_PADDING_DEFAULT = 3;

const FILE_LEVEL_CHILD_PROBABILITY: Record<number, number> = {
  0: 0.3,
  1: 0.3,
  2: 0.25,
  3: 0.15,
};

export type Files = Array<File>;

export type File = {
  index: number;
  label: Label;
  level: number;
  isParent: boolean;
  animation?: {
    characterIndex: number,
    characterX: number;
  }
};

enum Symbol {
  'cloud' = 'cloud',
}

type Label = {
  text?: string;
  symbol?: Symbol;
  drawSymbol?: Function;
  fillColor?: Array<number>;
  numberOfSymbols?: number;
  levelMinimum?: number;
  levelMaximum?: number;
};

export enum COLORS {
  white = 'white',
  'transparent' = 'transparent',
  'light-pink' = 'light-pink',
  'dark-gray' = 'dark-gray',
  'light-gray' = 'light-gray',
  'cloud-gray' = 'cloud-gray',
  'almost-black' = 'almost-black',
  black = 'black',
};

export const COLOR_CODES: Record<COLORS, Array<number>> = {
  white: [255, 255, 255, 255],
  'transparent': [255, 255, 255, 0],
  'light-pink': [204, 150, 193],
  'dark-gray': [51, 51, 51],
  'light-gray': [119, 119, 119],
  'cloud-gray': [206, 206, 206],
  'almost-black': [17, 17, 17],
  black: [0, 0, 0],
};

export const SYMBOLS: Record<Symbol, { max: number, colors: Array<COLORS>, transparentFill: boolean }> = {
  [Symbol.cloud]: {
    max: 4,
    colors: [COLORS['light-pink'], COLORS.transparent, COLORS['cloud-gray']],
    transparentFill: true,
  }
};

export class DreamFileSystem {
  scale;
  currentFile: File | null;
  files: Files;

  constructor({ scale = 1 }: DreamFileSystemParams) {
    this.scale = scale;
    this.currentFile = null;
    this.files = [];
  }

  LABELS: Array<Label> = [
    { text: `... does anybody hear me ?` },
    { text: `............................ until the pain wears off` },
    { text: `..`, levelMinimum: 1 },
    { text: `............... hi, hello, hi` },
    { text: `gn gn gn gn` },
    { text: `??` },
    { text: `things` },
    { text: `.`, levelMaximum: 0 },
    { text: `..............................................................` },
    { text: '', symbol: Symbol.cloud, drawSymbol: this.drawCloud.bind(this) }
  ];

  getLabel() {
    if (!this.currentFile) throw new Error(`No label found for undefined file`);

    return this.currentFile?.label;
  }

  getLabelLength() {
    if (this.currentFile?.label.symbol) return this.currentFile?.label.numberOfSymbols || 1;

    if (!this.currentFile?.label.text) throw new Error(`No label found for undefined file`);

    return this.currentFile?.label.text.length;
  }

  initializeFile({ fileIndex, level, isParent }: { fileIndex: number, level: number, isParent: boolean }) {
    const file: File = {
      index: fileIndex,
      level,
      label: this.LABELS[Math.floor(Math.random() * this.LABELS.length)],
      isParent
    };
    this.files.push(file);
    return file;
  }

  getNextFileLevel({ level }: { level: number }) {
    const randomValue = Math.random();

    if (randomValue < FILE_LEVEL_CHILD_PROBABILITY[level]) return level + 1;
    if (level > 0 && randomValue > 0.75) return level - (Math.ceil(Math.random() * (level)));
    return level;
  }

  drawFile({
    sketch,
    colors,
  }: {
    sketch: typeof p5;
    colors: { textColor: Array<number>, backgroundColor: Array<number> };
  }) {
    if (!this.currentFile) return;

    const filePixels = this.currentFile.isParent ? OPEN_FILE_PIXELS : FILE_PIXELS;
    const buttonPixels = this.currentFile.isParent ? MINUS : PLUS;
    
    Object.entries(filePixels).forEach(([color, points], i) => {
      points.forEach((point) => {
        this.drawPixelBox({
          point: { x: point.x * this.scale + this.currentFile!.level * FILE_INDENT_DEFAULT * this.scale, y: point.y * this.scale },
          sideLength: this.scale,
          color: COLOR_CODES[color as COLORS],
          sketch
        });
      });
    });
    Object.entries(buttonPixels).forEach(([color, points], i) => {
      points.forEach((point) => {
        this.drawPixelBox({
          point: { x: point.x * this.scale + this.currentFile!.level * FILE_INDENT_DEFAULT * this.scale + BUTTON_INDENT_DEFAULT * this.scale, y: point.y * this.scale + ((FILE_HEIGHT_DEFAULT - FILE_BUTTON_HEIGHT_DEFAULT) * this.scale / 2) },
          sideLength: this.scale,
          color: COLOR_CODES[color as COLORS],
          sketch
        });
      });
    });
  }

  initializeLabel({
    sketch,
    colors,
  }: {
    sketch: typeof p5;
    colors: { textColor: Array<number>, backgroundColor: Array<number> };
  }) {
    if (!this.currentFile) return;

    if (this.currentFile.label.symbol) {
      const symbol = SYMBOLS[this.currentFile.label.symbol];
      this.currentFile.label.numberOfSymbols = Math.ceil(Math.random() * symbol.max);
      this.currentFile.label.fillColor = COLOR_CODES[symbol.colors[Math.floor(Math.random() * symbol.colors.length)]];
    }

    if (this.currentFile.label.text) {
      sketch.noStroke();
      sketch.fill(colors.textColor);
      sketch.textSize(TEXT_SIZE_DEFAULT * this.scale);
    }

    this.currentFile.animation = {
      characterIndex: 0,
      characterX: FILE_WIDTH_DEFAULT * this.scale + this.currentFile.level * FILE_INDENT_DEFAULT * this.scale + FILE_TEXT_MARGIN_DEFAULT * this.scale,
    }
  }

  drawPixelBox({ point, sideLength, color, sketch }: { point: Point, sideLength: number, color: Array<number>, sketch: typeof p5 }) {
    sketch.noStroke();
    sketch.fill(color);
    sketch.square(point.x, point.y, sideLength);
  }

  drawNextLabelCharacter({ sketch }: { sketch: typeof p5 }) {
    if (!this.currentFile || !this.currentFile.animation) return;

    sketch.translate(this.currentFile.animation.characterX, -LABEL_BOTTOM_PADDING_DEFAULT * this.scale);

    if (this.currentFile.label.drawSymbol) {
      const width = this.currentFile.label.drawSymbol({ sketch });
      this.currentFile.animation.characterIndex++;
      this.currentFile.animation.characterX += width;
    }

    if (this.currentFile.label.text) {
      const char = Array.from(this.currentFile.label.text)[this.currentFile?.animation?.characterIndex];
      sketch.text(char, 0, this.scale * FILE_HEIGHT_DEFAULT);
      this.currentFile.animation.characterIndex++;
      this.currentFile.animation.characterX += sketch.textWidth(char);
    }
  }

  drawCloud({ sketch }: { sketch: typeof p5  }) {
    sketch.translate(0, (FILE_HEIGHT_DEFAULT - 18) * this.scale);

    // fill in the cloud
    sketch.fill(this.currentFile?.label.fillColor!);
    sketch.noStroke();
    sketch.circle(5 * this.scale, 14.5 * this.scale, 7 * this.scale);
    sketch.circle(9 * this.scale, 9.5 * this.scale, 8 * this.scale);
    sketch.circle(17 * this.scale, 8 * this.scale, 12 * this.scale);
    sketch.circle(22 * this.scale, 13 * this.scale, 10 * this.scale);    
    sketch.stroke(this.currentFile!.label.fillColor!);
    sketch.rect(5 * this.scale, 12 * this.scale, 17.5 * this.scale, 5.5 * this.scale)

    sketch.stroke('white');
    sketch.strokeWeight(this.scale);
    sketch.arc(5 * this.scale, 14.5 * this.scale, 7 * this.scale, 7 * this.scale, sketch.HALF_PI, sketch.PI + sketch.HALF_PI);
    sketch.arc(9 * this.scale, 9.5 * this.scale, 8 * this.scale, 8 * this.scale, sketch.PI * 8/9, sketch.PI + sketch.PI * 2/3);
    sketch.arc(17 * this.scale, 8 * this.scale, 12 * this.scale, 12 * this.scale, sketch.PI + sketch.PI * 1/10, sketch.TWO_PI);
    sketch.arc(22 * this.scale, 13 * this.scale, 10 * this.scale, 10 * this.scale, sketch.PI + sketch.PI * 9/16, sketch.TWO_PI + sketch.HALF_PI);
    sketch.line(22.5 * this.scale, 18 * this.scale, 5 * this.scale, 18 * this.scale);
    
    return 36 * this.scale;
  }
}

const FILE_PIXELS: Record<string, Array<Point>> = {
  [COLORS.white]: [
    {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 7, y: 0}, {x: 8, y: 0}, {x: 9, y: 0}, {x: 10, y: 0},
    {x: 1, y: 1}, {x: 11, y: 1},
    {x: 0, y: 2}, {x: 12, y: 2}, {x: 13, y: 2}, {x: 14, y: 2}, {x: 15, y: 2}, {x: 16, y: 2}, {x: 17, y: 2}, {x: 18, y: 2}, {x: 19, y: 2}, {x: 20, y: 2}, {x: 21, y: 2}, {x: 22, y: 2}, {x: 23, y: 2}, {x: 24, y: 2}, {x: 25, y: 2}, {x: 26, y: 2},
    {x: 0, y: 3}, {x: 27, y: 3},
    {x: 0, y: 4}, {x: 28, y: 4},
    {x: 0, y: 5}, {x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}, {x: 8, y: 5}, {x: 9, y: 5}, {x: 10, y: 5}, {x: 11, y: 5}, {x: 12, y: 5}, {x: 13, y: 5}, {x: 14, y: 5}, {x: 15, y: 5}, {x: 16, y: 5}, {x: 17, y: 5}, {x: 18, y: 5}, {x: 19, y: 5}, {x: 20, y: 5}, {x: 21, y: 5}, {x: 22, y: 5}, {x: 23, y: 5}, {x: 24, y: 5}, {x: 25, y: 5}, {x: 28, y: 5},
    {x: 0, y: 6}, {x: 2, y: 6}, {x: 26, y: 6}, {x: 28, y: 6},
    {x: 0, y: 7}, {x: 1, y: 7}, {x: 27, y: 7}, {x: 28, y: 7},
    {x: 0, y: 8}, {x: 28, y: 8},
    {x: 0, y: 9}, {x: 28, y: 9},
    {x: 0, y: 10}, {x: 28, y: 10},
    {x: 0, y: 11}, {x: 28, y: 11},
    {x: 0, y: 12}, {x: 28, y: 12},
    {x: 0, y: 13}, {x: 28, y: 13},
    {x: 0, y: 14}, {x: 28, y: 14},
    {x: 0, y: 15}, {x: 28, y: 15},
    {x: 0, y: 16}, {x: 28, y: 16},
    {x: 0, y: 17}, {x: 28, y: 17},
    {x: 0, y: 18}, {x: 28, y: 18},
    {x: 0, y: 19}, {x: 28, y: 19},
    {x: 0, y: 20}, {x: 28, y: 20},
    {x: 0, y: 21}, {x: 28, y: 21},
    {x: 0, y: 22}, {x: 28, y: 22},
    {x: 1, y: 23}, {x: 27, y: 23},
    {x: 2, y: 24}, {x: 3, y: 24}, {x: 4, y: 24}, {x: 5, y: 24}, {x: 6, y: 24}, {x: 7, y: 24}, {x: 8, y: 24}, {x: 9, y: 24}, {x: 10, y: 24}, {x: 11, y: 24}, {x: 12, y: 24}, {x: 13, y: 24}, {x: 14, y: 24}, {x: 15, y: 24}, {x: 16, y: 24}, {x: 17, y: 24}, {x: 18, y: 24}, {x: 19, y: 24}, {x: 20, y: 24}, {x: 21, y: 24}, {x: 22, y: 24}, {x: 23, y: 24}, {x: 24, y: 24}, {x: 25, y: 24}, {x: 26, y: 24},
  ],
  [COLORS['dark-gray']]: [
    {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}, {x: 7, y: 1}, {x: 8, y: 1}, {x: 9, y: 1}, {x: 10, y: 1},
    {x: 1, y: 2}, {x: 11, y: 2},
    {x: 1, y: 3}, {x: 12, y: 3}, {x: 13, y: 3}, {x: 14, y: 3}, {x: 15, y: 3}, {x: 16, y: 3}, {x: 17, y: 3}, {x: 18, y: 3}, {x: 19, y: 3}, {x: 20, y: 3}, {x: 21, y: 3}, {x: 22, y: 3}, {x: 23, y: 3}, {x: 24, y: 3}, {x: 25, y: 3}, {x: 26, y: 3},
    {x: 1, y: 4}, {x: 27, y: 4},
    {x: 3, y: 6}, {x: 4, y: 6}, {x: 5, y: 6}, {x: 6, y: 6}, {x: 7, y: 6}, {x: 8, y: 6}, {x: 9, y: 6}, {x: 10, y: 6}, {x: 11, y: 6}, {x: 12, y: 6}, {x: 13, y: 6}, {x: 14, y: 6}, {x: 15, y: 6}, {x: 16, y: 6}, {x: 17, y: 6}, {x: 18, y: 6}, {x: 19, y: 6}, {x: 20, y: 6}, {x: 21, y: 6}, {x: 22, y: 6}, {x: 23, y: 6}, {x: 24, y: 6}, {x: 25, y: 6},
  ],
  [COLORS['light-gray']]: [
    {x: 2, y: 4}, {x: 3, y: 4}, {x: 4, y: 4}, {x: 5, y: 4}, {x: 6, y: 4}, {x: 7, y: 4}, {x: 8, y: 4}, {x: 9, y: 4}, {x: 10, y: 4}, {x: 11, y: 4}, {x: 12, y: 4}, {x: 13, y: 4}, {x: 14, y: 4}, {x: 15, y: 4}, {x: 16, y: 4}, {x: 17, y: 4}, {x: 18, y: 4}, {x: 19, y: 4}, {x: 20, y: 4}, {x: 21, y: 4}, {x: 22, y: 4}, {x: 23, y: 4}, {x: 24, y: 4}, {x: 25, y: 4}, {x: 26, y: 4},
    {x: 1, y: 5}, {x: 2, y: 5}, {x: 26, y: 5}, {x: 27, y: 5},
    {x: 1, y: 6}, {x: 27, y: 6},
  ],
  [COLORS.black]: [
    {x: 27, y: 8},
    {x: 27, y: 9},
    {x: 27, y: 10},
    {x: 27, y: 11},
    {x: 27, y: 12},
    {x: 27, y: 13},
    {x: 27, y: 14},
    {x: 27, y: 15},
    {x: 27, y: 16},
    {x: 27, y: 17},
    {x: 27, y: 18},
    {x: 27, y: 19},
    {x: 27, y: 20},
    {x: 27, y: 21},
    {x: 26, y: 22}, {x: 27, y: 22},
    {x: 2, y: 23}, {x: 3, y: 23}, {x: 4, y: 23}, {x: 5, y: 23}, {x: 6, y: 23}, {x: 7, y: 23}, {x: 8, y: 23}, {x: 9, y: 23}, {x: 10, y: 23}, {x: 11, y: 23}, {x: 12, y: 23}, {x: 13, y: 23}, {x: 14, y: 23}, {x: 15, y: 23}, {x: 16, y: 23}, {x: 17, y: 23}, {x: 18, y: 23}, {x: 19, y: 23}, {x: 20, y: 23}, {x: 21, y: 23}, {x: 22, y: 23}, {x: 23, y: 23}, {x: 24, y: 23}, {x: 25, y: 23}, {x: 26, y: 23},
  ],
};

const OPEN_FILE_PIXELS: Record<string, Array<Point>> = {
  [COLORS.white]: [
    {x: 18, y: 0}, {x: 19, y: 0}, {x: 20, y: 0}, {x: 21, y: 0}, {x: 22, y: 0}, {x: 23, y: 0}, {x: 24, y: 0}, {x: 25, y: 0}, {x: 26, y: 0}, 
    {x: 17, y: 1}, {x: 27, y: 1},
    {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}, {x: 5, y: 2}, {x: 6, y: 2}, {x: 7, y: 2}, {x: 8, y: 2}, {x: 9, y: 2}, {x: 10, y: 2}, {x: 9, y: 2}, {x: 10, y: 2}, {x: 11, y: 2}, {x: 12, y: 2}, {x: 13, y: 2}, {x: 14, y: 2}, {x: 15, y: 2}, {x: 16, y: 2}, {x: 28, y: 2},
    {x: 1, y: 3}, {x: 28, y: 3},
    {x: 0, y: 4}, {x: 28, y: 4},
    {x: 0, y: 5}, {x: 28, y: 5},
    {x: 0, y: 6}, {x: 28, y: 6},
    {x: 0, y: 7}, {x: 28, y: 7},
    {x: 0, y: 8}, {x: 5, y: 8}, {x: 6, y: 8}, {x: 7, y: 8}, {x: 8, y: 8}, {x: 9, y: 8}, {x: 10, y: 8}, {x: 11, y: 8}, {x: 12, y: 8}, {x: 13, y: 8}, {x: 14, y: 8}, {x: 15, y: 8}, {x: 16, y: 8}, {x: 17, y: 8}, {x: 18, y: 8}, {x: 19, y: 8}, {x: 20, y: 8}, {x: 21, y: 8}, {x: 22, y: 8}, {x: 23, y: 8}, {x: 24, y: 8}, {x: 25, y: 8}, {x: 26, y: 8}, {x: 27, y: 8}, {x: 28, y: 8},
    {x: 0, y: 9}, {x: 4, y: 9}, {x: 29, y: 9},
    {x: 0, y: 10}, {x: 4, y: 10}, {x: 29, y: 10},
    {x: 0, y: 11}, {x: 4, y: 11}, {x: 29, y: 11},
    {x: 0, y: 12}, {x: 4, y: 12}, {x: 29, y: 12},
    {x: 0, y: 13}, {x: 3, y: 13}, {x: 28, y: 13},
    {x: 0, y: 14}, {x: 3, y: 14}, {x: 28, y: 14},
    {x: 0, y: 15}, {x: 3, y: 15}, {x: 28, y: 15},
    {x: 0, y: 16}, {x: 2, y: 16}, {x: 27, y: 16},
    {x: 0, y: 17}, {x: 2, y: 17}, {x: 27, y: 17},
    {x: 0, y: 18}, {x: 2, y: 18}, {x: 27, y: 18},
    {x: 0, y: 19}, {x: 2, y: 19}, {x: 27, y: 19},
    {x: 0, y: 20}, {x: 1, y: 20}, {x: 26, y: 20},
    {x: 0, y: 21}, {x: 1, y: 21}, {x: 26, y: 21},
    {x: 0, y: 22}, {x: 1, y: 22}, {x: 26, y: 22},
    {x: 1, y: 23}, {x: 2, y: 23}, {x: 3, y: 23}, {x: 4, y: 23}, {x: 5, y: 23}, {x: 6, y: 23}, {x: 7, y: 23}, {x: 8, y: 23}, {x: 9, y: 23}, {x: 10, y: 23}, {x: 11, y: 23}, {x: 12, y: 23}, {x: 13, y: 23}, {x: 14, y: 23}, {x: 15, y: 23}, {x: 16, y: 23}, {x: 17, y: 23}, {x: 18, y: 23}, {x: 19, y: 23}, {x: 20, y: 23}, {x: 21, y: 23}, {x: 22, y: 23}, {x: 23, y: 23}, {x: 24, y: 23}, {x: 25, y: 23}, {x: 26, y: 23},
  ],
  [COLORS['almost-black']]: [
    {x: 18, y: 1}, {x: 19, y: 1}, {x: 20, y: 1}, {x: 21, y: 1}, {x: 22, y: 1}, {x: 23, y: 1}, {x: 24, y: 1}, {x: 25, y: 1}, {x: 26, y: 1}, 
    {x: 17, y: 2}, {x: 27, y: 2},
    {x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y: 3}, {x: 6, y: 3}, {x: 7, y: 3}, {x: 8, y: 3}, {x: 9, y: 3}, {x: 10, y: 3}, {x: 9, y: 3}, {x: 10, y: 3}, {x: 11, y: 3}, {x: 12, y: 3}, {x: 13, y: 3}, {x: 14, y: 3}, {x: 27, y: 3},
    {x: 1, y: 4}, {x: 27, y: 4},
    {x: 1, y: 5}, {x: 27, y: 5},
    {x: 1, y: 6}, {x: 27, y: 6},
    {x: 1, y: 7},
    {x: 1, y: 8},
    {x: 1, y: 9},
    {x: 1, y: 10}, {x: 28, y: 10},
    {x: 1, y: 11}, {x: 28, y: 11},
    {x: 1, y: 12}, {x: 28, y: 12},
    {x: 1, y: 13}, {x: 27, y: 13},
    {x: 1, y: 14}, {x: 27, y: 14},
    {x: 1, y: 15}, {x: 27, y: 15},
    {x: 1, y: 16}, {x: 26, y: 16},
    {x: 1, y: 17}, {x: 26, y: 17},
    {x: 1, y: 18}, {x: 26, y: 18},
    {x: 1, y: 19}, {x: 26, y: 19},
    {x: 25, y: 20},
  ]
};

const PLUS: Record<string, Array<Point>> = {
  [COLORS.white]: [
    {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 7, y: 0}, {x: 8, y: 0}, {x: 9, y: 0},
    {x: 0, y: 1}, {x: 10, y: 1},
    {x: 0, y: 2}, {x: 10, y: 2},
    {x: 0, y: 3}, {x: 5, y: 3}, {x: 10, y: 3},
    {x: 0, y: 4}, {x: 5, y: 4}, {x: 10, y: 4},
    {x: 0, y: 5}, {x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}, {x: 10, y: 5},
    {x: 0, y: 6}, {x: 5, y: 6}, {x: 10, y: 6},
    {x: 0, y: 7}, {x: 5, y: 7}, {x: 10, y: 7},
    {x: 0, y: 8}, {x: 10, y: 8},
    {x: 0, y: 9}, {x: 10, y: 9},
    {x: 1, y: 10}, {x: 2, y: 10}, {x: 3, y: 10}, {x: 4, y: 10}, {x: 5, y: 10}, {x: 6, y: 10}, {x: 7, y: 10}, {x: 8, y: 10}, {x: 9, y: 10},
  ]
}

const MINUS: Record<string, Array<Point>> = {
  [COLORS.white]: [
    {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 7, y: 0}, {x: 8, y: 0}, {x: 9, y: 0},
    {x: 0, y: 1}, {x: 10, y: 1},
    {x: 0, y: 2}, {x: 10, y: 2},
    {x: 0, y: 3}, {x: 10, y: 3},
    {x: 0, y: 4}, {x: 10, y: 4},
    {x: 0, y: 5}, {x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}, {x: 10, y: 5},
    {x: 0, y: 6}, {x: 10, y: 6},
    {x: 0, y: 7}, {x: 10, y: 7},
    {x: 0, y: 8}, {x: 10, y: 8},
    {x: 0, y: 9}, {x: 10, y: 9},
    {x: 1, y: 10}, {x: 2, y: 10}, {x: 3, y: 10}, {x: 4, y: 10}, {x: 5, y: 10}, {x: 6, y: 10}, {x: 7, y: 10}, {x: 8, y: 10}, {x: 9, y: 10},
  ]
}
