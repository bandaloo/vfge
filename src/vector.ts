import { clamp } from "./helpers";

export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns the distance to another point squared.
   * @param v point to measure distance to
   */
  dist2(v: Vector) {
    return Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2);
  }

  /**
   * Returns the distance to another point.
   * @param v point to measure distance to
   */
  dist(v: Vector) {
    return Math.sqrt(this.dist2(v));
  }

  /**
   * Returns the magnitude squared.
   */
  mag2() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  /**
   * Returns the magnitude.
   */
  mag() {
    return Math.sqrt(this.mag2());
  }

  /**
   * Scales the x component of vector by first argument and y component by
   * second argument. If only one argument is passed in, it is simple scalar
   * multiplication.
   * @param sx scale in x direction
   * @param sy scale in y direction
   */
  scale(sx: number, sy = sx) {
    return new Vector(this.x * sx, this.y * sy);
  }

  /**
   * Adds another vector to this vector and returns a new vector.
   * @param v vector to add
   */
  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  /**
   * Subtracts another vector from this vector and returns a new vector.
   * @param v vector to subtract
   */
  sub(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  /**
   * Returns the dot product of this vector and another vector.
   * @param v vector to dot
   */
  dot(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Returns a normalized vector. Throws an error when trying to normalize the
   * zero vector.
   */
  norm0() {
    if (this.x === 0 && this.y === 0) {
      throw new Error("can't normalize the zero vector");
    }
    return this.scale(1 / this.dist(new Vector(0, 0)));
  }

  /**
   * Returns a normalized vector, or the zero vector if the zero vector is
   * passed in.
   */
  norm() {
    if (this.x === 0 && this.y === 0) {
      return this;
    }
    return this.scale(1 / this.dist(new Vector(0, 0)));
  }

  midpoint(v: Vector) {
    return new Vector((this.x + v.x) / 2, (this.y + v.y) / 2);
  }

  /**
   * Returns point between two points normalized from 0 to 1.
   * @param v target point
   * @param s how far to go between to points (between 0 and 1)
   */
  partway(v: Vector, s: number) {
    return this.add(v.sub(this).scale(s));
  }

  /**
   * Finds the shortest connecting vector to a line segment defined by the two
   * given endpoints.
   * @param a the first endpoint of the line segment
   * @param b the last endpoint of the line segment
   */
  closestVecToSeg(a: Vector, b: Vector) {
    let length2 = a.dist2(b);
    if (length2 === 0) {
      return a;
    }
    const t = clamp(this.sub(a).dot(b.sub(a)) / length2, 0, 1);
    const c = b
      .sub(a)
      .scale(t)
      .add(a);
    return c;
  }

  /**
   * Finds the distance to a line segment defined by the two given endpoints.
   * @param a the first endpoint of the line segment
   * @param b the last endpoint of the line segement
   */
  distToSeg(a: Vector, b: Vector) {
    return this.dist(this.closestVecToSeg(a, b));
  }

  /**
   * Returns true if the vector is the zero vector and false otherwise.
   */
  isZeroVec() {
    return this.x === 0 && this.y === 0;
  }

  /**
   * Returns a string representing this vector.
   */
  toString() {
    return `<${this.x}, ${this.y}>`;
  }
}
