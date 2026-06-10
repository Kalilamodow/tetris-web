import { Board } from "../board";
import { Tiles } from "../common/tiles";
import { drawTiles } from "./tiles";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

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

    drawTiles(this.ctx, this.currentTiles, {
      width: this.tileWidth,
      height: this.tileHeight,
    });

    for (const row of this.highlightedRows) {
      this.ctx.fillStyle = "#fff8";
      this.ctx.fillRect(0, row * this.tileHeight, this.width, this.tileHeight);
    }
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
