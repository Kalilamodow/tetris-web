import { Piece } from "./piece";
import { Point } from "./point";

export interface Command {
  execute(piece: Piece): void;
}

export class MoveLeftCommand implements Command {
  execute(piece: Piece) {
    piece.point.move(new Point(-1, 0));
  }
}

export class MoveRightCommand implements Command {
  execute(piece: Piece) {
    piece.point.move(new Point(1, 0));
  }
}

export class MoveDownCommand implements Command {
  execute(piece: Piece) {
    piece.point.move(new Point(0, 1));
  }
}
