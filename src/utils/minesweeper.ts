import { DifficultyConfig } from "@/constants/minesweeper";
import { SquareGrid, type Tile } from "src/classes/SquareGrid";
import { DIFFICULTY_CONFIG } from '../constants/minesweeper';
import { Symbol } from "@/symbols/minesweeper";

const DIFFICULTY_TO_MINES = {
  [DIFFICULTY_CONFIG.easy]: 10,
  [DIFFICULTY_CONFIG.intermediate]: 40,
  [DIFFICULTY_CONFIG.advanced]: 99,
  [DIFFICULTY_CONFIG.expert]: 300,
};

export type MinesweeperTile = Tile & {
  metadata: {
    mine: boolean;
    count: number;
  }
}

export const getWeightedSymbol = (library: Symbol[]): string => {
  const weightedSymbols = library.reduce((acc, symbol) => {
    return [...acc, ...(Array(symbol.weight).fill(symbol.text))];
  }, [] as any[]);

  return weightedSymbols[Math.floor(Math.random() * weightedSymbols.length)];
};

export const buildSquareGrid = ({ dimension }: { dimension: number }): SquareGrid => {
  const squareGrid = new SquareGrid({ 
    scale: 1,
    minQ: 0,
    maxQ: dimension,
    minR: 0,
    maxR: dimension
  });

  squareGrid.oneDimensionalArray().forEach((tile) => {
    tile.metadata = {
      mine: false,
      count: 0
    };
  });

  return squareGrid;
}

export const placeMines = ({ grid, difficulty }: { grid: SquareGrid, difficulty: DifficultyConfig }) => {
  const oneDimensionalArray = grid.oneDimensionalArray();
  const prefilledArray = oneDimensionalArray.map((_, i) => i);

  return [...Array(DIFFICULTY_TO_MINES[difficulty])].map(() => {
    const mineIndex = prefilledArray[Math.floor(Math.random() * prefilledArray.length)];
    const mineQ = Math.floor(mineIndex / grid.dimensionR);
    const mineR = mineIndex % grid.dimensionR;
  
    grid.tiles[mineQ][mineR].metadata.mine = true;

    prefilledArray.splice(mineIndex, 1);
  
    return mineIndex;
  });
};

export const setMineCounts = ({ grid }: { grid: SquareGrid }) => {
  for (let q = grid.minQ; q < grid.maxQ; q++) {
    for (let r = grid.minR; r < grid.maxR; r++) {
      const tile = grid.tiles[q][r];

      const neighbors: Tile[] = grid.neighbors(tile);
    
      const count = neighbors.reduce((total, neighbor) => {  
        if (neighbor.r < grid.minR || neighbor.q < grid.minQ) {
          console.error(`Neighbor is not in grid: ${neighbor}`);
        }
    
        if (neighbor.r >= grid.maxR || neighbor.q >= grid.maxQ) {
          console.error(`Neighbor is not in grid: ${neighbor}`);
        }
  
        return total + (neighbor.metadata.mine ? 1 : 0);
      }, 0);
  
      tile.metadata.count = count;
    }
  }
};
