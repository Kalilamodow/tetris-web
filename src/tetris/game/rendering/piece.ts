import { Piece } from "../board/piece";
import { drawTiles } from "./tiles";

export class PieceRenderer {
  private ctx: CanvasRenderingContext2D;

  private width: number;
  private height: number;
  private tileSize: number;

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) {
      alert("Failed to create canvas context");
      throw "Failed to create canvas context";
    }
    this.ctx = context;

    this.width = canvas.width;
    this.height = canvas.height;

    this.tileSize = this.height / 3;
  }

  public render(piece: Piece) {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.width, this.height);

    const tiles = piece.asTiles();
    drawTiles(this.ctx, tiles, { width: this.tileSize, height: this.tileSize });
  }

  public use<EvtName extends string>(
    evt: EvtName,
    emitter: { on: (event: EvtName, handler: (piece: Piece) => void) => void },
  ) {
    emitter.on(evt, (p) => this.render(p));
  }
}
