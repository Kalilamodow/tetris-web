import { Color } from "../common/color";
import { Tiles } from "../common/tiles";

const TILE_BORDER_THICKNESS = 4;

export function drawTiles(
  ctx: CanvasRenderingContext2D,
  tiles: Tiles,
  size: {
    width: number;
    height: number;
  },
) {
  for (const [rowIndex, row] of tiles.getTiles().entries()) {
    for (const [tileIndex, tile] of row.entries()) {
      if (tile === null) continue;
      drawTile(ctx, tileIndex, rowIndex, tile, size);
    }
  }
}

function drawTile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: Color,
  tileDimensions: {
    width: number;
    height: number;
  },
) {
  ctx.fillStyle = color.rgb;
  ctx.fillRect(
    x * tileDimensions.width,
    y * tileDimensions.height,
    tileDimensions.width,
    tileDimensions.height,
  );

  // inset borders (optimization is boring)

  // top
  ctx.fillStyle = "#fff";
  trapezoid(
    ctx,
    [x * tileDimensions.width, y * tileDimensions.height], // top-left
    [(x + 1) * tileDimensions.width, y * tileDimensions.height], // top-right
    [
      // bottom-right
      (x + 1) * tileDimensions.width - TILE_BORDER_THICKNESS,
      y * tileDimensions.height + TILE_BORDER_THICKNESS,
    ],
    [
      // bottom-left
      x * tileDimensions.width + TILE_BORDER_THICKNESS,
      y * tileDimensions.height + TILE_BORDER_THICKNESS,
    ],
  );

  // left
  ctx.fillStyle = "#0001";
  trapezoid(
    ctx,
    [x * tileDimensions.width, y * tileDimensions.height], // top-left
    [
      // top-right
      x * tileDimensions.width + TILE_BORDER_THICKNESS,
      y * tileDimensions.height + TILE_BORDER_THICKNESS,
    ],
    [
      // bottom-right
      x * tileDimensions.width + TILE_BORDER_THICKNESS,
      (y + 1) * tileDimensions.height - TILE_BORDER_THICKNESS,
    ],
    [
      // bottom-left
      x * tileDimensions.width,
      (y + 1) * tileDimensions.height,
    ],
  );

  // right
  ctx.fillStyle = "#0001";
  trapezoid(
    ctx,
    [
      // top-left
      (x + 1) * tileDimensions.width - TILE_BORDER_THICKNESS,
      y * tileDimensions.height + TILE_BORDER_THICKNESS,
    ],
    [
      // top-right
      (x + 1) * tileDimensions.width,
      y * tileDimensions.height,
    ],
    [
      // bottom-right
      (x + 1) * tileDimensions.width,
      (y + 1) * tileDimensions.height,
    ],
    [
      // bottom-left
      (x + 1) * tileDimensions.width - TILE_BORDER_THICKNESS,
      (y + 1) * tileDimensions.height - TILE_BORDER_THICKNESS,
    ],
  );

  // bottom
  ctx.fillStyle = "#0004";
  trapezoid(
    ctx,
    [
      // top-left
      x * tileDimensions.width + TILE_BORDER_THICKNESS,
      (y + 1) * tileDimensions.height - TILE_BORDER_THICKNESS,
    ],
    [
      // top-right
      (x + 1) * tileDimensions.width - TILE_BORDER_THICKNESS,
      (y + 1) * tileDimensions.height - TILE_BORDER_THICKNESS,
    ],
    [
      // bottom-right
      (x + 1) * tileDimensions.width,
      (y + 1) * tileDimensions.height,
    ],
    [
      // bottom-left
      x * tileDimensions.width,
      (y + 1) * tileDimensions.height,
    ],
  );
}

function trapezoid(
  ctx: CanvasRenderingContext2D,
  a: [number, number],
  b: [number, number],
  c: [number, number],
  d: [number, number],
) {
  ctx.beginPath();
  ctx.moveTo(a[0], a[1]);
  ctx.lineTo(b[0], b[1]);
  ctx.lineTo(c[0], c[1]);
  ctx.lineTo(d[0], d[1]);
  ctx.closePath();
  ctx.fill();
}
