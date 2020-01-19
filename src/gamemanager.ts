export namespace GameManager {
  console.log("running game manager");
  let drawingCanvas: HTMLCanvasElement;
  let drawingContext: CanvasRenderingContext2D;
  let displayCanvas: HTMLCanvasElement;
  let displayContext: CanvasRenderingContext2D;

  /**
   * Starts the game manager and sets up the canvas.
   * @param drawingWidth width of the drawing canvas
   * @param drawingHeight height of the drawing canvas
   * @param displayWidth width of the display canvas
   * @param displayHeight height of the display canvas
   * @param fullscreenKey key to enter fullscreen
   * @param gameDivId ID of the div to add the canvas to
   */
  export function run(
    drawingWidth = 1920,
    drawingHeight = 1080,
    displayWidth = 960,
    displayHeight = 540,
    fullscreenKey = "F",
    gameDivId = "gamediv"
  ) {
    // Set up the drawing canvas.
    drawingCanvas = document.createElement("canvas");
    drawingContext = drawingCanvas.getContext("2d");
    drawingContext.imageSmoothingEnabled = false;
    drawingCanvas.width = drawingWidth;
    drawingCanvas.height = drawingHeight;

    // Set up the display canvas onto which the drawing canvas is copied.
    displayCanvas = document.createElement("canvas");
    displayContext = drawingCanvas.getContext("2d");
    displayContext.imageSmoothingEnabled = false;
    displayCanvas.width = displayWidth;
    displayCanvas.height = displayHeight;

    // For handling exiting fullscreen.
    const exitHandler = () => {
      if (document.fullscreenElement === null) {
        displayCanvas.width = displayWidth;
        displayCanvas.height = displayHeight;
      }
    };

    displayCanvas.addEventListener("fullscreenchange", exitHandler, false);

    // For changing into fullscreen.
    const enterFullscreen = () => {
      if (displayCanvas.requestFullscreen) {
        displayCanvas.width = drawingWidth;
        displayCanvas.height = drawingHeight;
        displayCanvas.requestFullscreen();
      } else {
        throw new Error("no request fullscreen function");
      }
    };

    document.addEventListener("keydown", e => {
      const code = e.keyCode;
      const key = String.fromCharCode(code);
      if (key == "F") {
        enterFullscreen();
      }
    });

    // Add display to div.
    const displayDiv = document.getElementById(gameDivId);
    displayDiv.appendChild(displayCanvas);
  }
}
