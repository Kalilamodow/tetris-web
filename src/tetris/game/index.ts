import { Board } from "./board";
import { BoardRenderer } from "./boardrenderer";
import { Color } from "./color";
import { Point } from "./point";
import { randomPiece, Piece } from "./piece";
import { Command } from "./commands";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

export class Game {
  private currentPiece: Piece | null;
  private activeTiles: Board;
  private commandQueue: Command[];

  constructor(private renderer: BoardRenderer) {
    this.activeTiles = new Board(BOARD_WIDTH, BOARD_HEIGHT);
    this.currentPiece = null;
    this.commandQueue = [];
  }

  public tick() {
    this.removeCompletedRows();

    if (this.currentPiece === null) {
      const tileGenerator = randomPiece();
      const tile = tileGenerator(
        new Point(BOARD_WIDTH / 2, -1),
        Color.random(),
      );
      this.currentPiece = tile;
    }

    this.currentPiece.point.move(new Point(0, 1));
    if (this.checkCurrentPieceCollision()) {
      this.currentPiece.point.move(new Point(0, -1));
      this.activeTiles = this.activeTiles.withPiece(this.currentPiece);
      this.currentPiece = null;
    }

    this.rerender();
  }

  public execute(command: Command) {
    this.commandQueue.push(command);

    if (this.currentPiece != null) {
      const original = this.currentPiece.copy();
      for (const cmd of this.commandQueue) {
        cmd.execute(this.currentPiece);
      }
      if (this.checkCurrentPieceCollision()) {
        this.currentPiece = original;
      }
      this.commandQueue = [];
      this.rerender();
    }
  }

  private rerender() {
    this.renderer.render(
      this.currentPiece
        ? this.activeTiles.withPiece(this.currentPiece).getTiles()
        : this.activeTiles.getTiles(),
    );
  }

  private removeCompletedRows() {
    const start = BOARD_HEIGHT - 1;
    for (let i = start; i >= 0; i--) {
      if (this.activeTiles.isRowFull(i)) {
        this.activeTiles.removeRow(i);
        i = start;
      }
    }
  }

  private checkCurrentPieceCollision() {
    if (this.currentPiece === null) return false;

    for (const [rowIndex, row] of this.currentPiece.pieces.entries()) {
      for (const [tileIndex, tileExists] of row.entries()) {
        if (!tileExists) continue;

        const isColliding = this.activeTiles.checkCollision(
          rowIndex + this.currentPiece.point.y,
          tileIndex + this.currentPiece.point.x,
        );
        if (isColliding) return true;
      }
    }

    return false;
  }
}
