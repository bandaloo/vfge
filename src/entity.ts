import { Vector } from "./vector";

export abstract class Entity {
  /** The kind of entity used for collisions and other events. */
  kind: string;

  /** The position of the entity. */
  pos: Vector;

  /** The drawn position of the entity for sub-frame interpolation. */
  drawPos: Vector;

  /** The last position of the entity for sub-frame interpolation. */
  lastPos: Vector;

  /** The velocity of the entity. */
  vel: Vector;

  /** The acceleration of the entity. */
  acc: Vector;

  /** How hard it is to accelerate as speed increases. */
  drag = 0;

  /** A vector representing the width and height of the entity. */
  dim: Vector;

  /** The depth of the entity when drawing. */
  depth = 0;

  constructor(pos: Vector, vel = new Vector(0, 0), acc = new Vector(0, 0)) {
    this.pos = pos;
    this.drawPos = pos;
    this.lastPos = pos;
    this.vel = vel;
    this.acc = acc;
  }

  /**
   * Move the entity based on velocity and acceleration.
   */
  step() {
    this.vel = this.vel.add(this.acc).scale(1 - this.drag);
    this.pos = this.pos.add(this.vel);
  }
}
