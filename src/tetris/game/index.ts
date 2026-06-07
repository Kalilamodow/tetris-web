import { Board } from "./board";
import { BoardRenderer } from "./boardrenderer";
import { Color } from "./color";
import { Point } from "./point";
import { randomPiece, Piece } from "./piece";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

export class Game {
  private currentPiece: Piece | null;
  private activeTiles: Board;

  constructor(private renderer: BoardRenderer) {
    this.activeTiles = new Board(BOARD_WIDTH, BOARD_HEIGHT);
    this.currentPiece = null;
  }

  public tick() {
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

    this.renderer.render(
      this.currentPiece
        ? this.activeTiles.withPiece(this.currentPiece).getTiles()
        : this.activeTiles.getTiles(),
    );
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
