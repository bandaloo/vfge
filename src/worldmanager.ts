import { Entity } from "./entity";
import { inPlaceFilter } from "./helpers";

export namespace WorldManager {
  const DELTA_TIME_CAP = 200;

  const updateTime = 1000 / 240; // Run game logic (not drawing) at 240 FPS.
  let previousTime = 0;
  let overTime = 0;
  let totalTime = 0;

  /**
   * Update the last position in order to prepare for the tweening step.
   * @param entities list of entities to update last position of
   */
  function prepareTween(entities: Entity[]) {
    for (let i = 0; i < entities.length; i++) {
      entities[i].lastPos = entities[i].pos;
    }
  }

  /**
   * Set the drawing position based on the amount of time left in a frame.
   * @param entities list of entities to tween
   * @param timeLeft time used for tweening
   */
  function performTween(entities: Entity[], timeLeft: number) {
    for (const entity of entities) {
      entity.drawPos = entity.lastPos.partway(
        entity.pos,
        (updateTime + timeLeft) / updateTime
      );
    }
  }

  function gameStepEntities(entities: Entity[]) {
    for (const entity of entities) {
      entity.action();
    }
  }

  function physicsStepEntities(entities: Entity[]) {
    for (const entity of entities) {
      entity.step();
    }
  }

  function ageStepEntities(entities: Entity[]) {
    for (const entity of entities) {
      entity.lifetime--;
      if (entity.lifetime <= 0) {
        entity.deleteMe = true;
      }
    }
  }

  /**
   * Destroys every entity that needs to be deleted.
   * @param entities entity list to filter from
   */
  function destroyEntities(entities: Entity[]) {
    inPlaceFilter<Entity>(
      entities,
      entity => entity.lifetime > 0 && !entity.deleteMe,
      entity => entity.destroy()
    );
  }

  const gameEntities = new Array<Entity>();

  function stepGame() {
    // Let all entities take their actions.
    gameStepEntities(gameEntities);
    // Run a physics step on the world.
    physicsStepEntities(gameEntities);
    // Age all the entities.
    ageStepEntities(gameEntities);
    // Delete the entities that should be deleted.
    destroyEntities(gameEntities);
  }

  export function update(currentTime = updateTime) {
    let deltaTime = currentTime - previousTime;
    // This is so the engine doesn't get stuck running too many game steps.
    if (deltaTime > DELTA_TIME_CAP) {
      deltaTime = DELTA_TIME_CAP;
    }

    totalTime += deltaTime;
    let timeLeft = deltaTime - overTime;

    // Run multiple game update steps based on the amount of time left.
    while (timeLeft > 0) {
      if (timeLeft <= this.updateTime) {
        prepareTween(gameEntities);
      }
      stepGame();
      timeLeft -= updateTime;
      // Reaching this line means one game step has passed.
    }

    // Set all the tweened vectors to the draw positions.
    performTween(gameEntities, timeLeft);
    overTime = -timeLeft;

    // TODO draw game

    // Increase the time.
    this.previousTime = currentTime;
    requestAnimationFrame(this.update.bind(this));
  }

  function getTotalTime() {
    return totalTime;
  }
}
