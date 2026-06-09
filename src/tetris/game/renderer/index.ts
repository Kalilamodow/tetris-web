import { Board } from "../board";
import { Color } from "../common/color";
import { Tiles } from "../common/tiles";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

export class BoardRenderer {
  private ctx: CanvasRenderingContext2D;

  private width: number;
  private height: number;

  private tileWidth: number;
  private tileHeight: number;

  private currentTiles: Tiles | null;
  private highlightedRow: number | null; // for when rows are completed

  constructor(canvas: HTMLCanvasElement) {
    this.currentTiles = null;
    this.highlightedRow = null;

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

    board.on("completedRow", (row: number) => {
      this.highlightedRow = row;
      this.render();
      setTimeout(() => {
        this.highlightedRow = null;
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

    if (this.highlightedRow) {
      this.ctx.fillStyle = "#fff8";
      this.ctx.fillRect(
        0,
        this.highlightedRow * this.tileHeight,
        this.width,
        this.tileHeight,
      );
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
