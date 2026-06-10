import { Board } from "../board";
import { Color } from "../common/color";
import { Tiles } from "../common/tiles";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const TILE_BORDER_THICKNESS = 4;

export class BoardRenderer {
  private ctx: CanvasRenderingContext2D;

  private width: number;
  private height: number;

  private tileWidth: number;
  private tileHeight: number;

  private currentTiles: Tiles | null;
  private highlightedRows: number[]; // for when rows are completed

  constructor(canvas: HTMLCanvasElement) {
    this.currentTiles = null;
    this.highlightedRows = [];

    const context = canvas.getContext("2d");
    if (!context) {
      alert("Failed to create canvas context");
      throw "Failed to create canvas context";
    }
    this.ctx = context;

    this.width = canvas.width;
    this.height = canvas.height;

    this.tileWidth = this.width / BOARD_WIDTH;
    this.tileHeight = this.height / BOARD_HEIGHT;
  }

  public attachBoard(board: Board) {
    board.on("boardUpdated", (tiles) => this.render(tiles));

    board.on("completedRows", (rows) => {
      this.highlightedRows = rows;
      this.render();
      setTimeout(() => {
        this.highlightedRows = [];
        this.render();
      }, 500);
    });
  }

  public render(): void;
  public render(tiles: Tiles): void;

  public render(tiles?: Tiles) {
    if (tiles) this.currentTiles = tiles;

    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.drawGrid();

    if (!this.currentTiles) {
      console.warn("renderer: attempted to render with no tiles");
      return;
    }

    for (const [rowIndex, row] of this.currentTiles.getTiles().entries()) {
      for (const [tileIndex, tile] of row.entries()) {
        if (tile === null) continue;
        this.drawTile(tileIndex, rowIndex, tile);
      }
    }

    for (const row of this.highlightedRows) {
      this.ctx.fillStyle = "#fff8";
      this.ctx.fillRect(0, row * this.tileHeight, this.width, this.tileHeight);
    }
  }

  private drawTile(x: number, y: number, color: Color) {
    this.ctx.fillStyle = color.rgb;
    this.ctx.fillRect(
      x * this.tileWidth,
      y * this.tileHeight,
      this.tileWidth,
      this.tileHeight,
    );

    // inset borders (optimization is boring)

    // top
    this.ctx.fillStyle = "#fff";
    this.trapezoid(
      [x * this.tileWidth, y * this.tileHeight], // top-left
      [(x + 1) * this.tileWidth, y * this.tileHeight], // top-right
      [
        // bottom-right
        (x + 1) * this.tileWidth - TILE_BORDER_THICKNESS,
        y * this.tileHeight + TILE_BORDER_THICKNESS,
      ],
      [
        // bottom-left
        x * this.tileWidth + TILE_BORDER_THICKNESS,
        y * this.tileHeight + TILE_BORDER_THICKNESS,
      ],
    );

    // left
    this.ctx.fillStyle = "#0001";
    this.trapezoid(
      [x * this.tileWidth, y * this.tileHeight], // top-left
      [
        // top-right
        x * this.tileWidth + TILE_BORDER_THICKNESS,
        y * this.tileHeight + TILE_BORDER_THICKNESS,
      ],
      [
        // bottom-right
        x * this.tileWidth + TILE_BORDER_THICKNESS,
        (y + 1) * this.tileHeight - TILE_BORDER_THICKNESS,
      ],
      [
        // bottom-left
        x * this.tileWidth,
        (y + 1) * this.tileHeight,
      ],
    );

    // right
    this.ctx.fillStyle = "#0001";
    this.trapezoid(
      [
        // top-left
        (x + 1) * this.tileWidth - TILE_BORDER_THICKNESS,
        y * this.tileHeight + TILE_BORDER_THICKNESS,
      ],
      [
        // top-right
        (x + 1) * this.tileWidth,
        y * this.tileHeight,
      ],
      [
        // bottom-right
        (x + 1) * this.tileWidth,
        (y + 1) * this.tileHeight,
      ],
      [
        // bottom-left
        (x + 1) * this.tileWidth - TILE_BORDER_THICKNESS,
        (y + 1) * this.tileHeight - TILE_BORDER_THICKNESS,
      ],
    );

    // bottom
    this.ctx.fillStyle = "#0004";
    this.trapezoid(
      [
        // top-left
        x * this.tileWidth + TILE_BORDER_THICKNESS,
        (y + 1) * this.tileHeight - TILE_BORDER_THICKNESS,
      ],
      [
        // top-right
        (x + 1) * this.tileWidth - TILE_BORDER_THICKNESS,
        (y + 1) * this.tileHeight - TILE_BORDER_THICKNESS,
      ],
      [
        // bottom-right
        (x + 1) * this.tileWidth,
        (y + 1) * this.tileHeight,
      ],
      [
        // bottom-left
        x * this.tileWidth,
        (y + 1) * this.tileHeight,
      ],
    );
  }

  private trapezoid(
    a: [number, number],
    b: [number, number],
    c: [number, number],
    d: [number, number],
  ) {
    this.ctx.beginPath();
    this.ctx.moveTo(a[0], a[1]);
    this.ctx.lineTo(b[0], b[1]);
    this.ctx.lineTo(c[0], c[1]);
    this.ctx.lineTo(d[0], d[1]);
    this.ctx.closePath();
    this.ctx.fill();
  }

  private drawGrid() {
    this.ctx.strokeStyle = "#fff";
    for (let i = 1; i < BOARD_WIDTH; i++) {
      const x = i * this.tileWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    for (let i = 1; i < BOARD_HEIGHT; i++) {
      const y = i * this.tileHeight;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
  }
}
