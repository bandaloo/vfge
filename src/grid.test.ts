import { Grid } from "./grid";
import { Vector } from "./vector";

const grid23 = new Grid(2, 3, (i, j) => i + j);
const grid00 = new Grid(0, 0, () => {});

const gridVec = new Grid(2, 2, (i, j) => new Vector(i, j));

describe("construction", () => {
  it("constructs grid with negative width and throws", () => {
    expect(() => {
      new Grid(-2, 3, () => {});
    }).toThrow(RangeError);
  });

  it("constructs grid with fractional width and throws", () => {
    expect(() => {
      new Grid(2.5, 3, () => {});
    }).toThrow(RangeError);
  });

  it("constructs grid with negative height and throws", () => {
    expect(() => {
      new Grid(2, -3, () => {});
    }).toThrow(RangeError);
  });

  it("constructs grid with fractional height and throws", () => {
    expect(() => {
      new Grid(2, 3.5, () => {});
    }).toThrow(RangeError);
  });
});

describe("iteration", () => {
  let sum = 0;
  grid23.griderate((grid, i, j) => {
    sum += grid.getCell(i, j);
  });
  it("adds the numbers up in the grid", () => {
    expect(sum).toEqual(9);
  });

  const grid1s = new Grid(2, 2, () => 1);
  const grid2s = new Grid(2, 2, () => 2);

  it("adds 1 to all elements in a grid", () => {
    expect(grid1s).not.toEqual(grid2s);
    grid1s.griderate((grid, i, j) =>
      grid.setCell(i, j, grid.getCell(i, j) + 1)
    );
    expect(grid1s).toEqual(grid2s);
  });
});

describe("dimensions", () => {
  const dimensions23 = grid23.dimensions;
  const dimensions00 = grid00.dimensions;

  it("gets dimensions of 2 x 3 grid", () => {
    expect(dimensions23).toEqual({ width: 2, height: 3 });
  });

  it("gets dimensions of 0 x 0 grid", () => {
    expect(dimensions00).toEqual({ width: 0, height: 0 });
  });
});
