const canvasWidth = 640;
const canvasHeight = 480;
const border = 10;
const title = 50; 

const dimension = {
  canvasWidth: canvasWidth,
  canvasHeight: canvasHeight,
  arenaSizeX: canvasWidth - 2 * border,
  arenaSizeY: canvasHeight - 2 * border - title,
  minX: border,
  minY: border + title,
  maxX: canvasWidth - border,
  maxY: canvasHeight - border,
}


export {
  dimension
}