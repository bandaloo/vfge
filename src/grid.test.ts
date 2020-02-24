import { Grid } from "./grid";
import { Vector } from "./vector";

// grid contents:
// 0 1
// 1 2
// 2 3
const grid23 = new Grid(2, 3, (i, j) => i + j);
const grid23Wrap = new Grid(2, 3, (i, j) => i + j, true);

// grid contents:
// (nothing)
const grid00 = new Grid(0, 0, () => {});

// grid contents
// <0, 0> <1, 0>
// <0, 1> <1, 1>
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

describe("contents", () => {
  it("checks the contents of grid of numbers", () => {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        expect(grid23.getCell(i, j)).toEqual(i + j);
      }
    }
  });

  it("checks the contents of grid of vectors", () => {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        expect(gridVec.getCell(i, j)).toEqual(new Vector(i, j));
      }
    }
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

describe("indexing", () => {
  it("underindexes row position and throws", () => {
    expect(() => {
      grid23.getCell(-1, 0);
    }).toThrow(RangeError);
  });

  it("overindexes row position and throws", () => {
    expect(() => {
      grid23.getCell(2, 0);
    }).toThrow(RangeError);
  });

  it("underindexes column position and throws", () => {
    expect(() => {
      grid23.getCell(0, -1);
    }).toThrow(RangeError);
  });

  it("overindexes column position and throws", () => {
    expect(() => {
      grid23.getCell(0, 3);
    }).toThrow(RangeError);
  });

  it("underindexes row position and wraps", () => {
    expect(() => {
      expect(grid23Wrap.getCell(-1, 0)).toEqual(1);
    });
  });

  it("overindexes row position and wraps", () => {
    expect(() => {
      expect(grid23Wrap.getCell(2, 0)).toEqual(0);
    });
  });

  it("underindexes column position and wraps", () => {
    expect(() => {
      expect(grid23Wrap.getCell(0, -1)).toEqual(2);
    });
  });

  it("overindex column position and wraps", () => {
    expect(() => {
      expect(grid23Wrap.getCell(0, 2)).toEqual(0);
    });
  });
});
