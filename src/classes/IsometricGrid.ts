import { prototype as p5 } from 'p5';

import { Point } from '@/types/geometry';

const BASE_DIMENSION = 30;
const Z_INDEX_MAX = 10;

const COLORS = [
  [15, 164, 219],
  [255, 139, 224],
  [243, 255, 108],
  [107, 255, 253],
  [107, 255, 124]
];

type GridParams = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  scale?: number;
  xDimension?: number;
};

type Tile = {
  center?: Point;
  left: Point;
  top: Point;
  right: Point;
  bottom: Point;
  xIndex: number;
  yIndex: number;
  zIndex: number;
};

type FrontTile = {
  topLeft: Point;
  bottomLeft: Point;
  topRight: Point;
  bottomRight: Point;
};

export type Cube = {
  topTile?: Tile;
  bottomTile?: Tile;
  frontTile?: FrontTile;
  backTile?: FrontTile;
  leftTile?: FrontTile;
  rightTile?: FrontTile;
  xIndex: number;
  yIndex: number;
  zIndex: number;
  fillColor?: Array<number>;
  strokeColor?: Array<number>;
};

export class IsometricGrid {
  scale;
  minX;
  maxX;
  minY;
  maxY;
  tiles: Array<Array<Tile>>;
  cubes: Array<Array<Array<Cube>>>;
  xDimension;
  yDimension;

  constructor({minX, maxX, minY, maxY, xDimension = BASE_DIMENSION, scale = 1}: GridParams) {
    this.scale = scale;
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.xDimension = xDimension;
    this.yDimension = xDimension * p5.tan(p5.PI * 0.17) * 2;
    this.tiles = [...Array(this.maxY - this.minY)].fill([...Array(this.maxX - this.minX).fill(null)]);
    this.cubes = this.initializeCubesMap();
    console.log(">>> this.tiles", this.tiles)
  }

  initializeCubesMap() {
    return [...Array(this.maxY - this.minY)]
      .map((_, y) => [...Array(this.maxX - this.minX)]
        .map((_, x) => [...Array(Z_INDEX_MAX)]
          .map((_, z) => {
            return { xIndex: x, yIndex: y, zIndex: z };
          })
        )
      );
  }

  initializeEmptyCubesMap() {
    return [...Array(this.maxY - this.minY)]
      .map((_, y) => [...Array(this.maxX - this.minX)]
        .map((_, x) => [...Array(Z_INDEX_MAX)
          .map((_, z) => {
            return null;
          })
        ])
      );
  }

  build() {
    for (let y = this.minY; y < this.maxY; y++) {
      const xTiles = [];
      for (let x = this.minX; x < this.maxX; x++) {
        const top = { x: (x - y) * this.xDimension, y: (y + x) * this.yDimension / 2};

        const t = this.tileFromIndex({
          xIndex: x,
          yIndex: y,
          zIndex: 0,
        });
        xTiles.push(t);
      }
      this.tiles[y] = xTiles;
    }
  }

  drawGrid(sketch: typeof p5) {
    for (let y = this.minY; y < this.maxY; y++) {
      for (let x = this.minX; x < this.maxX; x++) {
        this.drawTile(this.tiles[y][x], sketch);
      }
    }
  }

  drawTile({ left, top, right, bottom }: Tile, sketch: typeof p5) {
    sketch.quad(left.x, left.y, top.x, top.y, right.x, right.y, bottom.x, bottom.y);
  }

  drawFrontTile({ topLeft, topRight, bottomLeft, bottomRight }: FrontTile, sketch: typeof p5) {
    sketch.quad(topLeft.x, topLeft.y, topRight.x, topRight.y, bottomRight.x, bottomRight.y, bottomLeft.x, bottomLeft.y);
  }

  getInitialCube() {
    const randomTile = this.getRandomTile();
    const zIndex = this.getRandomZIndex();
    const cube = this.getCube({ xIndex: randomTile.xIndex, yIndex: randomTile.yIndex, zIndex });
    const cubesArray: Array<Cube> = [cube];
    const unavailableCubes: Array<Array<Array<Cube | null>>> = this.initializeEmptyCubesMap();

    unavailableCubes[cube.yIndex][cube.xIndex][cube.zIndex] = cube;    
    
    return { cubes: cubesArray, unavailableCubes };
  }

  getCube({ xIndex, yIndex, zIndex }: { xIndex: number, yIndex: number, zIndex: number }) {
    const bottomTile = this.tileFromIndex({ xIndex, yIndex, zIndex });
    const topTile = this.tileFromIndex({ xIndex, yIndex, zIndex: zIndex + 1 });
    const rightTile: FrontTile = {
      topLeft: topTile.bottom,
      topRight: topTile.right,
      bottomLeft: bottomTile.bottom,
      bottomRight: bottomTile.right,
    };
    const leftTile = {
      topLeft: topTile.left,
      topRight: topTile.top,
      bottomLeft: bottomTile.left,
      bottomRight: bottomTile.top,
    };
    const frontTile = {
      topLeft: topTile.left,
      topRight: topTile.bottom,
      bottomLeft: bottomTile.left,
      bottomRight: bottomTile.bottom,
    };
    const backTile = {
      topLeft: topTile.top,
      topRight: topTile.right,
      bottomLeft: bottomTile.top,
      bottomRight: bottomTile.right,
    };
    const fillColor = this.getRandom(COLORS);
    const strokeColor = this.getRandom(COLORS);

    return { topTile, bottomTile, rightTile, leftTile, frontTile, backTile, xIndex, yIndex, zIndex, fillColor, strokeColor };
  }

  drawCubeOutline({ cube, sketch }: { cube: Cube, sketch: typeof p5 }) {
    const { bottomTile, topTile } = cube;

    if (!bottomTile || !topTile) return;

    sketch.stroke(cube.strokeColor![0], cube.strokeColor![1], cube.strokeColor![2]);
    this.drawTile(bottomTile, sketch);
    this.drawTile(topTile, sketch);
    sketch.line(bottomTile.left.x, bottomTile.left.y, topTile.left.x, topTile.left.y);
    sketch.line(bottomTile.bottom.x, bottomTile.bottom.y, topTile.bottom.x, topTile.bottom.y);
    sketch.line(bottomTile.right.x, bottomTile.right.y, topTile.right.x, topTile.right.y);
    sketch.line(bottomTile.top.x, bottomTile.top.y, topTile.top.x, topTile.top.y);
  }

  drawCubeFilledIn({ cube, sketch }: { cube: Cube, sketch: typeof p5 }) {
    const { bottomTile, topTile, leftTile, rightTile, frontTile, backTile} = cube;

    if (!bottomTile || !topTile || !frontTile || !backTile || !leftTile || !rightTile) return;

    sketch.fill(cube.fillColor![0], cube.fillColor![1], cube.fillColor![2]);
    // this.drawTile(bottomTile, sketch);
    // this.drawTile(topTile, sketch);
    this.drawFrontTile(rightTile, sketch);
    // this.drawFrontTile(frontTile, sketch);
  }

  getNeighborTile({ tile }: { tile: Tile }) {
    return [
      ... tile.yIndex > 0 ? [this.tiles[tile.yIndex - 1][tile.xIndex]] : [],
      ... tile.xIndex > 0 ? [this.tiles[tile.yIndex][tile.xIndex - 1]] : [],
      ... (this.maxY > tile.yIndex) ? [this.tiles[tile.yIndex + 1][tile.xIndex]] : [],
      ... (this.maxX > tile.xIndex) ? [this.tiles[tile.yIndex][tile.xIndex + 1]] : [],
    ];
  }

  getNeighborCubes({ cube }: { cube: Cube }) {
    return [
      ... cube.yIndex > 0 ? [this.cubes[cube.yIndex - 1][cube.xIndex][cube.zIndex]] : [],
      ... cube.xIndex > 0 ? [this.cubes[cube.yIndex][cube.xIndex - 1][cube.zIndex]] : [],
      ... cube.zIndex > 0 ? [this.cubes[cube.yIndex][cube.xIndex][cube.zIndex - 1]] : [],
      ... (this.maxY > cube.yIndex + 1) ? [this.cubes[cube.yIndex + 1][cube.xIndex][cube.zIndex]] : [],
      ... (this.maxX > cube.xIndex + 1) ? [this.cubes[cube.yIndex][cube.xIndex + 1][cube.zIndex]] : [],
      ... (Z_INDEX_MAX > cube.zIndex + 1) ? [this.cubes[cube.yIndex][cube.xIndex][cube.zIndex + 1]] : [],
    ];
  }

  getRandomEmptyNeighborCube({ cube, unavailableCubes }: { cube: Cube, unavailableCubes: Array<Array<Array<Cube | null>>> }) {
    const neighbors = this.getNeighborCubes({ cube });
    const availableNeighbors = neighbors.map((n) => !unavailableCubes[n.yIndex][n.xIndex][n.zIndex] ? n : null);
    
    if (!availableNeighbors.length) return;

    return this.getRandom(availableNeighbors) as Cube;
  }

  getNeighborCube({ cube, unavailableCubes }: { cube: Cube, unavailableCubes: Array<Array<Array<Cube | null>>> }) {
    const neighbor = this.getRandomEmptyNeighborCube({ cube, unavailableCubes });

    if (!neighbor) return;

    const neighborCube = this.getCube({ xIndex: neighbor.xIndex, yIndex: neighbor.yIndex, zIndex: neighbor.zIndex });
    unavailableCubes[cube.yIndex][cube.xIndex][cube.zIndex] = neighborCube;
    
    return neighborCube;
  }

  getRandom(arr: Array<any>) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  getRandomTile() {
    const randomY = Math.floor(Math.random() * this.tiles.length);
    const randomX = Math.floor(Math.random() * this.tiles[0].length);

    return this.tiles[randomY][randomX];
  }

  getRandomZIndex() {
    return Math.floor(Math.random() * Z_INDEX_MAX);
  }

  tileFromIndex({
    yIndex,
    xIndex,
    zIndex,
  }: {
    yIndex: number,
    xIndex: number,
    zIndex: number,
  }) {
    const top = { x: (xIndex - yIndex) * this.xDimension, y: (yIndex + xIndex) * this.yDimension / 2};

    return {
      xIndex,
      yIndex,
      zIndex,
      center: {
        x: top.x,
        y: top.y + this.yDimension / 2 - zIndex * this.yDimension,
      },
      left: {
        x: top.x - this.xDimension,
        y: top.y + this.yDimension / 2 - zIndex * this.yDimension,
      },
      top: {
        x: top.x,
        y: top.y - zIndex * this.yDimension,
      },
      right: {
        x: top.x + this.xDimension,
        y: top.y + this.yDimension / 2 - zIndex * this.yDimension,
      },
      bottom: {
        x: top.x,
        y: top.y + this.yDimension - zIndex * this.yDimension,
      }
    }
  }
}
