import { Color } from "./color";
import { Point } from "./point";
import { randomChoice } from "./utils";

export class Piece {
  public constructor(
    public point: Point,
    public pieces: boolean[][],
    public color: Color,
  ) {}

  public static template(pieces: boolean[][]) {
    return (point: Point, color: Color) => new Piece(point, pieces, color);
  }

  public at(point: Point) {
    return new Piece(point, this.pieces, this.color);
  }
}

export const PIECE_TEMPLATES = {
  SQUARE: Piece.template([
    [true, true],
    [true, true],
  ]),
  L: Piece.template([
    [true, false],
    [true, false],
    [true, true],
  ]),
} as const;

export function randomPiece() {
  const keys = Object.keys(PIECE_TEMPLATES) as (keyof typeof PIECE_TEMPLATES)[];
  return PIECE_TEMPLATES[randomChoice(keys)];
}
