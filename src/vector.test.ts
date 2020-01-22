import { Vector } from "./vector";

it("should add two vectors", () => {
  const vec12 = new Vector(1, 2);
  const vec34 = new Vector(3, 4);
  expect(vec12.add(vec34)).toEqual(new Vector(4, 6));
});
