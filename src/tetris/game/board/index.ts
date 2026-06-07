import { Tiles } from "./tiles";
import { BoardRenderer } from "../../renderer";
import { Color } from "./color";
import { Point } from "./point";
import { randomPiece, Piece } from "./piece";
import { Command } from "./commands";
import { BoardEvents } from "./events";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

export class BoardManager {
  private currentPiece: Piece | null;
  private activeTiles: Tiles;
  private commandQueue: Command[];

  private handlers: {
    [T in keyof BoardEvents]: BoardEvents[T][];
  };

  constructor(private renderer: BoardRenderer) {
    this.activeTiles = new Tiles(BOARD_WIDTH, BOARD_HEIGHT);
    this.currentPiece = null;
    this.commandQueue = [];
    this.handlers = Object.create(null);
  }

  private emit<T extends keyof BoardEvents>(
    event: T,
    ...args: Parameters<BoardEvents[T]>
  ) {
    if (!this.handlers[event]) return;
    for (const handler of this.handlers[event]) {
      // typescript gives a weird error if we dont cast it
      (handler as (...args: Parameters<BoardEvents[T]>) => void)(...args);
    }
  }

  public on<T extends keyof BoardEvents>(event: T, handler: BoardEvents[T]) {
    if (!this.handlers[event]) this.handlers[event] = [];
    this.handlers[event].push(handler);
  }

  public tick() {
    this.removeCompletedRows();

    if (this.currentPiece === null) {
      this.currentPiece = this.generatePiece();
      this.currentPiece.point.move(new Point(0, -1));
    }

    this.currentPiece.point.move(new Point(0, 1));
    if (this.checkCurrentPieceCollision()) {
      this.currentPiece.point.move(new Point(0, -1));
      this.activeTiles = this.activeTiles.withPiece(this.currentPiece);
      this.currentPiece = this.generatePiece();
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

  private generatePiece() {
    const generator = randomPiece();
    const piece = generator(new Point(BOARD_WIDTH / 2, 0), Color.random());
    return piece;
  }

  private rerender() {
    this.renderer.render(
      this.currentPiece
        ? this.activeTiles.withPiece(this.currentPiece)
        : this.activeTiles,
    );
  }

  private removeCompletedRows() {
    const start = BOARD_HEIGHT - 1;
    for (let i = start; i >= 0; i--) {
      if (this.activeTiles.isRowFull(i)) {
        this.activeTiles.removeRow(i);
        this.emit("completedRow", i);
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
