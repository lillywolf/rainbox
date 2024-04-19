import { GridCube } from "./PixelBoxGrid";
import { WHITE } from '../constants/colors';
import PixelOrthoCube from './PixelOrthoCubeP5';
import { PixelBoxGridP5, PixelBoxGridP5Params } from "./PixelBoxGridP5";

class PixelBoxOrthoGrid extends PixelBoxGridP5 {
  constructor(params: PixelBoxGridP5Params) {
    super(params);

    this.sketch.ortho();

    // this.sketch.translate(0, this.yTiles * this.yu);
  }

  setRotation(): void {
    this.sketch.rotateX(this.gridOrientation.alpha);
    this.sketch.rotateY(this.gridOrientation.beta); 
    this.sketch.rotateZ(Math.PI);
  }

  buildGrid() {
    this.setRotation();

    const { xu, yu, zu } = this;

    for (let x = 0; x < this.xTiles; x++) {
      this.grid.push([]);

      for (let y = 0; y < this.yTiles; y++) {
        this.grid[x].push([]);

        for (let z = 0; z < this.zTiles; z++) {
          const cxu = x * xu;
          const cyu = y * yu;
          const czu = z * zu;

          const bottom = {
            b: { x: cxu, y: cyu, z: czu },
            l: { x: cxu + xu, y: cyu, z: czu },
            t: { x: cxu + xu, y: cyu + yu, z: czu },
            r: { x: cxu, y: cyu + yu, z: czu }
          };
          const top = {
            b: { x: cxu, y: cyu, z: czu + zu },
            l: { x: cxu + xu, y: cyu, z: czu + zu },
            t: { x: cxu + xu, y: cyu + yu, z: czu + zu },
            r: { x: cxu, y: cyu + yu, z: czu + zu }
          };
          const center = { x: cxu + xu / 2, y: cyu + yu / 2, z: czu + zu/2 };
          
          this.grid[x][y].push({
            cube: new PixelOrthoCube({
              bottom,
              top,
              center,
              index: { xIndex: x, yIndex: y, zIndex: z },
              color: WHITE,
              spacing: this.spacing,
              grid: this,
            }),
            metadata: {
              occupied: false,
            }
          });
        }
      }
    }
  }

  getRandomUnoccupiedGridEntry() {
    const index = this.getRandomGridIndex();

    if (index < 0) {
      console.log("grid is full!")
      return;
    }

    const gridEntry = this.getGridEntryForIndex(index);

    if (!gridEntry) {
      console.error(`No entry found for index ${index}`);
      return;
    }

    if (gridEntry.metadata.occupied) {
      console.error(`Index already occupied by cube! ${index}`);
      return;
    }

    gridEntry.metadata.occupied = true;

    return gridEntry;
  }

  drawCubeAtGridEntry(gridEntry: GridCube) {
    const index = this.getIndexForGridEntry(gridEntry);

    this.sortedGrid[index] = gridEntry;
    this.setCubeColor(gridEntry.cube);

    const neighbors = this.getNeighborsInFrontOfGridEntry(gridEntry);

    if (neighbors.length === 3) {
      console.log("Is hidden by neighbors, skip draw");
      return;
    };

    const allEntriesAfter = this.sortedGrid.slice(index);

    allEntriesAfter.forEach((entry) => {
      if (entry.metadata.occupied) {
        entry.cube.rotateInPlace();
        entry.cube.draw();
      }
    });
  }

  getGridEntryForIndex(index: number) {
    const x = Math.floor(index / (this.zTiles * this.yTiles));
    const y = Math.floor(index / this.zTiles) % this.yTiles;
    const z = index % this.zTiles;

    if (x >= this.xTiles || y >= this.yTiles) {
      console.log(`Index ${index} not found in grid`);
      return;
    }

    return this.grid[x][y][z];
  }

  getIndexForGridEntry(gridEntry: GridCube) {
    return gridEntry.cube.index.zIndex + gridEntry.cube.index.yIndex * this.zTiles + gridEntry.cube.index.xIndex * this.zTiles * this.yTiles;
  }

  getSortedGrid() {
    return this.grid.flat(3).sort((a, b) => {
      return a.cube.index.yIndex - b.cube.index.yIndex === 0
        ? a.cube.index.zIndex - b.cube.index.zIndex === 0
          ? a.cube.index.xIndex - b.cube.index.xIndex
          : a.cube.index.zIndex - b.cube.index.zIndex
        : a.cube.index.yIndex - b.cube.index.yIndex
    });
  }
}

export default PixelBoxOrthoGrid;
