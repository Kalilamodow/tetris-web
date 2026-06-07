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

  public copy() {
    return new Piece(
      this.point.copy(),
      structuredClone(this.pieces),
      this.color,
    );
  }
}

export const PIECE_TEMPLATES = {
  SMASHBOY: Piece.template([
    [true, true],
    [true, true],
  ]),
  ORANGE_RICKY: Piece.template([
    [false, false, true],
    [true, true, true],
  ]),
  BLUE_RICKY: Piece.template([
    [true, false, false],
    [true, true, true],
  ]),
  HERO: Piece.template([[true, true, true, true]]),
  RHODE_ISLAND_Z: Piece.template([
    [false, true, true],
    [true, true, false],
  ]),
  CLEVELAND_Z: Piece.template([
    [true, true, false],
    [false, true, true],
  ]),
  TEEWEE: Piece.template([
    [false, true, false],
    [true, true, true],
  ]),
} as const;

export function randomPiece() {
  const keys = Object.keys(PIECE_TEMPLATES) as (keyof typeof PIECE_TEMPLATES)[];
  return PIECE_TEMPLATES[randomChoice(keys)];
}
