import { Vector } from "./vector";
import { DisplayManager } from "./displaymanager";

/**
 * Draw a centered rectangle on the screen.
 * @param centerVec
 * @param width
 * @param height
 * @param fillStyle
 * @param strokeStyle
 * @param lineWidth
 */
export function centeredRect(
  centerVec: Vector,
  width: number,
  height: number,
  fillStyle: string | CanvasGradient | CanvasPattern = "gray",
  strokeStyle: string | CanvasGradient | CanvasPattern = "white",
  lineWidth: number = 0
) {
  const context = DisplayManager.getContext();
  context.save();
  context.lineWidth = lineWidth;
  context.strokeStyle = strokeStyle;
  context.fillStyle = fillStyle;
  const cornerVec = centerVec.sub(new Vector(width / 2, height / 2));
  context.rect(cornerVec.x, cornerVec.y, width, height);
  context.fill();
  context.stroke();
  context.restore();
}
