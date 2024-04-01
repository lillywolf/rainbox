import { prototype as p5 } from 'p5';

import { COLORS, COLOR_CODES, FILE_PIXELS, MINUS, OPEN_FILE_PIXELS, PLUS } from "@/constants/dreamfiles";
import { Point } from '@/types/geometry';

enum Symbol {
  'cloud' = 'cloud',
}

type SymbolData = {
  id: Symbol,
  fillColor: Array<number>;
  draw: DrawFunction;
  howMany: number;
  width: number;
  height: number;
}

type FileLabel = {
  text: string;
  fillColor?: Array<number>;
  levelMinimum?: number;
  levelMaximum?: number;
};

type AnimationData = {
  characterIndex: number,
  characterX: number;
};

const LABELS: Array<FileLabel> = [
  { text: `... does anybody hear me ?` },
  { text: `............................ until the pain wears off` },
  { text: `..`, levelMinimum: 1 },
  { text: `............... hi, hello, hi` },
  { text: `gn gn gn gn` },
  { text: `??` },
  { text: `things` },
  { text: `.`, levelMaximum: 0 },
  { text: `..............................................................` },
];

type DrawFunction = ({
  scale,
  sketch,
  symbol,
  start,
}: {
  scale: number;
  sketch: typeof p5,
  symbol: SymbolData,
  start: Point,
}) => void;

export const drawCloud: DrawFunction = ({ symbol, start, scale, sketch }) => {
  // fill in the cloud
  sketch.fill(symbol.fillColor);
  sketch.noStroke();
  sketch.circle(start.x + 5 * scale, start.y + 14.5 * scale, 7 * scale);
  sketch.circle(start.x + 9 * scale, start.y + 9.5 * scale, 8 * scale);
  sketch.circle(start.x + 17 * scale, start.y + 8 * scale, 12 * scale);
  sketch.circle(start.x + 22 * scale, start.y + 13 * scale, 10 * scale);    
  sketch.stroke(symbol.fillColor);
  sketch.rect(start.x + 5 * scale, start.y + 12 * scale, 17.5 * scale, 5.5 * scale)

  sketch.stroke('white');
  sketch.strokeWeight(scale);
  sketch.arc(start.x + 5 * scale, start.y + 14.5 * scale, 7 * scale, 7 * scale, sketch.HALF_PI, sketch.PI + sketch.HALF_PI);
  sketch.arc(start.x + 9 * scale, start.y + 9.5 * scale, 8 * scale, 8 * scale, sketch.PI * 8/9, sketch.PI + sketch.PI * 2/3);
  sketch.arc(start.x + 17 * scale, start.y + 8 * scale, 12 * scale, 12 * scale, sketch.PI + sketch.PI * 1/10, sketch.TWO_PI);
  sketch.arc(start.x + 22 * scale, start.y + 13 * scale, 10 * scale, 10 * scale, sketch.PI + sketch.PI * 9/16, sketch.TWO_PI + sketch.HALF_PI);
  sketch.line(start.x + 22.5 * scale, start.y + 18 * scale, start.x + 5 * scale, start.y + 18 * scale);  
}

export const SYMBOLS: Record<Symbol, { max: number, width: number, height: number, colors: Array<COLORS>, draw: DrawFunction }> = {
  [Symbol.cloud]: {
    max: 4,
    colors: [COLORS['light-pink'], COLORS.transparent, COLORS['cloud-gray']],
    width: 36,
    height: 18,
    draw: drawCloud,
  }
};

const HEIGHT_DEFAULT = 24;
const WIDTH_DEFAULT = 28;
const SPACING_DEFAULT = 12;
const TEXT_SIZE_DEFAULT = 13;
const LABEL_BOTTOM_PADDING_DEFAULT = 3;
const LEVEL_INDENT_DEFAULT = 32;
const LABEL_INDENT_DEFAULT = 12;
const BUTTON_HEIGHT_DEFAULT = 10;
const BUTTON_INDENT_DEFAULT = -20;

export class DreamFile {
  scale;
  height;
  width;
  spacing;
  index;
  level;
  isParent;
  textSize;
  textColor;
  symbol?: SymbolData;
  label?;
  labelIndent;
  levelIndent;
  animationData: AnimationData;
  useSymbol: boolean;
  sketch;

  constructor({
    scale = 1,
    height = HEIGHT_DEFAULT,
    width = WIDTH_DEFAULT,
    spacing = SPACING_DEFAULT,
    index,
    level,
    isParent,
    textColor = COLORS.white,
    sketch
  }: {
    scale?: number;
    height?: number;
    width?: number;
    spacing?: number;
    index: number;
    level: number;
    isParent: boolean;
    textColor?: COLORS;
    sketch: typeof p5;
  }) {
    this.scale = scale;
    this.height = height * scale;
    this.width = width * scale;
    this.spacing = spacing * scale;
    this.index = index;
    this.level = level;
    this.isParent = isParent;
    this.textSize = TEXT_SIZE_DEFAULT * scale;
    this.textColor = textColor;
    this.labelIndent = LABEL_INDENT_DEFAULT * scale;
    this.levelIndent = this.level * LEVEL_INDENT_DEFAULT * scale;
    this.animationData = {
      characterIndex: 0,
      characterX: 0,
    };
    this.sketch = sketch;

    this.sketch.textSize(this.textSize);

    this.label = LABELS[Math.floor(Math.random() * LABELS.length)];
    
    this.setSymbol();
    this.useSymbol = Math.random() < 0.2;
  }

  setSymbol() {
    const symbol = SYMBOLS[Symbol.cloud];

    this.symbol = {
      id: Symbol.cloud,
      howMany: Math.ceil(Math.random() * symbol.max),
      draw: symbol.draw,
      fillColor: COLOR_CODES[symbol.colors[Math.floor(Math.random() * symbol.colors.length)]],
      width: symbol.width * this.scale,
      height: symbol.height * this.scale,
    };
  }

  getLabel() {
    return this.label;
  }

  getLabelLength() {
    return this.label?.text?.length || 0;
  }

  getLabelOrSymbolLength() {
    if (this.useSymbol && this.symbol) return this.symbol.howMany || 1;
    if (!this.useSymbol && this.label) return this.label.text.length;
    return 0;
  }

  drawSymbolOrLabel({ y = 0 }: { y?: number } = {}) {
    const bottomY = this.scale * -LABEL_BOTTOM_PADDING_DEFAULT;

    if (this.useSymbol && this.symbol) {
      this.drawSymbols({ y });
    }

    if (!this.useSymbol && this.label) {
      this.sketch.text(this.label.text, this.width + this.levelIndent + this.labelIndent, this.height + bottomY + y);
    }
  }

  initializeLabel() {
    this.sketch.noStroke();
    this.sketch.fill(this.textColor);
  }

  drawNextLabelCharacter() {
    const bottomY = this.scale * -LABEL_BOTTOM_PADDING_DEFAULT;

    if (this.useSymbol && this.symbol) {
      this.symbol.draw({
        start: { x: this.width + this.levelIndent + this.labelIndent + this.animationData.characterX, y: (this.height - this.symbol.height) / 2 },
        scale: this.scale,
        symbol: this.symbol,
        sketch: this.sketch
      });
      this.animationData.characterX += this.symbol.width;
    }

    if (!this.useSymbol && this.label) {
      const char = Array.from(this.label.text)[this.animationData.characterIndex];
      this.sketch.text(char, this.width + this.levelIndent + this.labelIndent + this.animationData.characterX, this.height + bottomY);
      this.animationData.characterX += this.sketch.textWidth(char);
    }

    this.animationData.characterIndex++;
  }

  drawSymbols({ y = 0 }: { y?: number } = {}) {
    if (!this.symbol) throw new Error(`Cannot call drawSymbols on a file with no drawSymbol function`);

    for (let i = 0; i < this.symbol.howMany; i++) {
      this.symbol.draw({
        start: { x: this.width + this.levelIndent + this.labelIndent + this.symbol.width * i, y: (this.height - this.symbol.height) / 2 + y },
        scale: this.scale,
        sketch: this.sketch,
        symbol: this.symbol,
      });
    }
  }

  drawFile({ y = 0 }: { y?: number } = {}) {
    const filePixels = this.isParent ? OPEN_FILE_PIXELS : FILE_PIXELS;
    const buttonPixels = this.isParent ? MINUS : PLUS;
    
    Object.entries(filePixels).forEach(([color, points]) => {
      points.forEach((point) => {
        this.drawPixelBox({
          point: { x: point.x * this.scale + this.levelIndent, y: point.y * this.scale + y },
          sideLength: this.scale,
          color: COLOR_CODES[color as COLORS]
        });
      });
    });
    Object.entries(buttonPixels).forEach(([color, points]) => {
      points.forEach((point) => {
        this.drawPixelBox({
          point: {
            x: point.x * this.scale + this.levelIndent + BUTTON_INDENT_DEFAULT * this.scale,
            y: point.y * this.scale + this.height / 2 - BUTTON_HEIGHT_DEFAULT * this.scale / 2 + y,
          },
          sideLength: this.scale,
          color: COLOR_CODES[color as COLORS],
        });
      });
    });
  }

  drawPixelBox({ point, sideLength, color }: { point: Point, sideLength: number, color: Array<number> }) {
    this.sketch.noStroke();
    this.sketch.fill(color);
    this.sketch.square(point.x, point.y, sideLength);
  }
}
