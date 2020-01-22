import { DisplayManager } from "./src/displaymanager";
import { Vector } from "./src/vector";
import { Grid } from "./src/grid";

DisplayManager.run();
const vec = new Vector(123, 456);
console.log(vec);
console.log(" " + vec);

const grid = new Grid(5, 5, (i, j) => i + j);
console.log(grid);

const gridVec = new Grid(3, 3, (i, j) => new Vector(i, j));
console.log(gridVec);

grid.griderate((g, i, j) => {
  console.log(g[i][j]);
});
