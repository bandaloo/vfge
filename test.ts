import { GameManager } from "./src/gamemanager.js";
import { Vector } from "./src/vector.js";
import { Grid } from "./src/grid.js";

GameManager.run();
const vec = new Vector(123, 456);
console.log(vec);
console.log(" " + vec);

const grid = new Grid(5, 5, (i, j) => i + j);
console.log(grid);

const gridVec = new Grid(3, 3, (i, j) => new Vector(i, j));
console.log(gridVec);
