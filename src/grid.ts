export class Grid<T> {
  private width: number;
  private height: number;
  cells: T[][];

  /**
   * Construct a grid.
   * @param width width of grid
   * @param height height of grid
   * @param fill function to fill each cell of the grid
   */
  constructor(
    width: number,
    height: number,
    fill: (arg1: number, arg2: number) => T
  ) {
    this.width = width;
    this.height = height;
    this.cells = new Array<T[]>(width);
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        this.cells[i].push(fill(i, j));
      }
    }
  }

  /**
   * Act on each cell of the grid with a function.
   * @param func function to act on each cell of the grid
   */
  griderate(func: (arg0: T[][], arg1: number, arg2: number) => void) {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        func(this.cells, i, j);
      }
    }
  }
}
