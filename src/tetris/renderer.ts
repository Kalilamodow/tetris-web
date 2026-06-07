import { Color } from "./game/board/color";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

export class BoardRenderer {
  private ctx: CanvasRenderingContext2D;

  private width: number;
  private height: number;

  private tileWidth: number;
  private tileHeight: number;

  constructor(private canvas: HTMLCanvasElement) {
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

  public render(tiles: (Color | null)[][]) {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.drawGrid();

    for (const [rowIndex, row] of tiles.entries()) {
      for (const [tileIndex, tile] of row.entries()) {
        if (tile === null) continue;
        this.drawTile(tileIndex, rowIndex, tile);
      }
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
