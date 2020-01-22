import { Vector } from "./vector";

const vec12 = new Vector(1, 2);
const vec34 = new Vector(3, 4);
const northEastNormalVec = new Vector(1 / Math.sqrt(2), 1 / Math.sqrt(2));

const zeroVector = new Vector(0, 0);
const middleVector = new Vector(5, 5);
const endVector = new Vector(10, 10);
const endVectorFlat = new Vector(10, 0);
const diagonalVector = new Vector(2, -2);
const offStart = new Vector(-1, 0);
const offEnd = new Vector(10, 11);

describe("basic operations", () => {
  it("adds two vectors", () => {
    expect(vec12.add(vec34)).toEqual(new Vector(4, 6));
  });

  it("subtract two vectors", () => {
    expect(vec34.sub(vec12)).toEqual(new Vector(2, 2));
  });

  it("scales a vector", () => {
    expect(endVector.scale(2)).toEqual(new Vector(20, 20));
  });

  it("scales components of a vector separately", () => {
    expect(endVector.scale(2, 3)).toEqual(new Vector(20, 30));
  });
});

describe("dot product", () => {
  it("calcuates the dot product of two vectors", () => {
    expect(vec12.dot(vec34)).toEqual(11);
  });

  it("gets zero from dotting with the zero vector", () => {
    expect(vec12.dot(zeroVector)).toEqual(0);
  });
});

describe("distance", () => {
  it("calculates the distance", () => {
    expect(middleVector.dist(endVector)).toEqual(5 * Math.sqrt(2));
  });

  it("calcutes the distance as zero", () => {
    expect(middleVector.dist(middleVector)).toEqual(0);
  });
});

describe("normalization", () => {
  it("normalizes vector", () => {
    expect(middleVector.norm()).toEqual(northEastNormalVec);
  });

  it("attempts to normalize the zero vector and returns the zero vector", () => {
    expect(zeroVector.norm()).toEqual(zeroVector);
  });

  it("normalizes vector without throwing zero vector error", () => {
    expect(middleVector.norm0()).toEqual(northEastNormalVec);
  });

  it("attempts to normalize the zero vector and throws an error", () => {
    expect(() => {
      zeroVector.norm0();
    }).toThrow();
  });
});

describe("distance to segment", () => {
  it("should have zero distance to segment", function() {
    expect(middleVector.distToSeg(zeroVector, endVector)).toEqual(0);
  });

  it("should have zero distance to first endpoint", function() {
    expect(zeroVector.distToSeg(zeroVector, endVector)).toEqual(0);
  });

  it("should have one distance from first endpoint", function() {
    expect(offStart.distToSeg(zeroVector, endVector)).toEqual(1);
  });

  it("should have zero distance from last endpoint", function() {
    expect(endVector.distToSeg(zeroVector, endVector)).toEqual(0);
  });

  it("should have one distance from last endpoint", function() {
    expect(offEnd.distToSeg(zeroVector, endVector)).toEqual(1);
  });

  it("should have five distance from segment", function() {
    expect(middleVector.distToSeg(zeroVector, endVectorFlat)).toEqual(5);
  });
});

describe("vector to segment", () => {
  it("should be on middle of segment at same point", function() {
    expect(middleVector.closestVecToSeg(zeroVector, endVector)).toEqual(
      middleVector
    );
  });

  it("should be on first endpoint at same point", function() {
    expect(zeroVector.closestVecToSeg(zeroVector, endVector)).toEqual(
      zeroVector
    );
  });

  it("should be on first endpoint at different point", function() {
    expect(offStart.closestVecToSeg(zeroVector, endVector)).toEqual(zeroVector);
  });

  it("should be on last endpoint at same point", function() {
    expect(endVector.closestVecToSeg(zeroVector, endVector)).toEqual(endVector);
  });

  it("should be on last endpoint at different point", function() {
    expect(offEnd.closestVecToSeg(zeroVector, endVector)).toEqual(endVector);
  });

  it("should be in middle of flat segment at different point", function() {
    expect(middleVector.closestVecToSeg(zeroVector, endVectorFlat)).toEqual(
      new Vector(5, 0)
    );
  });
});
