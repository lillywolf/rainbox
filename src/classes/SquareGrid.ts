type GridCoordinateParams = {
  q: number;
  r: number;
  s?: string;
}

type SquareGridParams = {
  minQ: number;
  maxQ: number;
  minR: number;
  maxR: number;
  scale: number;
};

export class SquareGrid {
  scale;
  minQ;
  maxQ;
  minR;
  maxR;
  dimensionQ;
  dimensionR;
  tiles: Tile[][];
  
  constructor({minQ, maxQ, minR, maxR, scale = 1}: SquareGridParams) {
    this.scale = scale;
    this.minQ = minQ;
    this.minR = minR;
    this.maxQ = maxQ;
    this.maxR = maxR;
    this.dimensionQ = (this.maxQ - this.minQ) / this.scale;
    this.dimensionR = (this.maxR - this.minR) / this.scale;
    this.tiles = this.rectangularShape();
  }

  neighbors(tile: Tile) {
    const { q, r } = tile;

    return [
      ... r >= 1 ? [this.tiles[q][r - 1]] : [],
      ... q >= 1 ? [this.tiles[q - 1][r]] : [],
      ... (r < this.maxR - 1) ? [this.tiles[q][r + 1]] : [],
      ... (q < this.maxQ - 1) ? [this.tiles[q + 1][r]] : [],
      ... r >= 1 && q >= 1 ? [this.tiles[q - 1][r - 1]] : [],
      ... q >= 1 && (r < this.maxR - 1) ? [this.tiles[q - 1][r + 1]] : [],
      ... (q < this.maxQ - 1) && r >= 1 ? [this.tiles[q + 1][r - 1]] : [],
      ... (q < this.maxQ - 1) && (r < this.maxR - 1) ? [this.tiles[q + 1][r + 1]] : [],
    ];
  }

  rectangularShape() {
    let tiles: Tile[][] = [...Array(this.dimensionQ)].map(() => []);

    for (let q = this.minQ; q < this.maxQ; q++) {
      for (let r = this.minR; r < this.maxR; r++) {
        tiles[q].push(new Tile({ q, r }));
      }
    }
    return tiles;
  }

  oneDimensionalArray() {
    return this.tiles.flatMap((value) => value);
  }
}

export class GridCoordinate {
  q: number;
  r: number;
  s: string;
  metadata: any;

  constructor({ q, r, s = '' }: GridCoordinateParams) {
    this.q = q;
    this.r = r;
    this.s = s;
    this.metadata = {};
  }

  get label() {
    const { q, r, s } = this;

    return `${ q },${ r }${ s ? ',' : '' }${ s }`;
  }

  get key() {
    return `GridCoordinate:${ this.label }`;
  }

  toString() {
    return this.label;
  }
}

export class Tile extends GridCoordinate {
  type = 'Tile'
}
