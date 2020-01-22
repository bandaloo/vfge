export class Grid<T> {
  private width: number;
  private height: number;
  private cells: T[][];

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
      this.cells[i] = new Array<T>(height);
      for (let j = 0; j < height; j++) {
        this.cells[i][j] = fill(i, j);
      }
    }
  }

  /**
   * Returns the dimensions of the grid.
   */
  get dimensions() {
    return { width: this.width, height: this.height };
  }

  inbounds(i: number, j: number) {
    return i > 0 && i < this.width && j > 0 && j < this.height;
  }

  /**
   * Act on each cell of the grid with a function.
   * @param func function to act on each cell of the grid
   */
  griderate(func: (arg0: Grid<T>, arg1: number, arg2: number) => void) {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        func(this, i, j);
      }
    }
  }

  /**
   * Gets the element at the specified position.
   * @param i cell horizontal position
   * @param j cell vertical position
   */
  getCell(i: number, j: number) {
    // TODO do boundary checking
    return this.cells[i][j];
  }

  /**
   * Sets the element at the specified position.
   * @param i cell horizontal position
   * @param j cell vertical position
   * @param element
   */
  setCell(i: number, j: number, element: T) {
    this.cells[i][j] = element;
  }
}
