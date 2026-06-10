import { Color } from "../common/color";
import { Point } from "./point";
import { randomChoice } from "./utils";

import { Tiles } from "../common/tiles";
import * as matrixRotation from "./matrix_rotation";

export class Piece {
  public constructor(
    public point: Point,
    public pieces: boolean[][],
    public color: Color,
  ) {}

  public static template(pieces: boolean[][], color: Color) {
    return (point: Point) => new Piece(point, pieces, color);
  }

  public at(point: Point) {
    return new Piece(point, this.pieces, this.color);
  }

  public asTiles() {
    const tiles = new Tiles(this.pieces[0].length, this.pieces.length);
    for (const [rowIndex, row] of this.pieces.entries()) {
      tiles.setRow(
        rowIndex,
        row.map((exists) => (exists ? this.color : null)),
      );
    }

    return tiles;
  }

  public rotateClockwise() {
    this.pieces = matrixRotation.rotateClockwise(this.pieces);
  }

  public rotateCounterClockwise() {
    this.pieces = matrixRotation.rotateCounterClockwise(this.pieces);
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
  // 2x2
  SMASHBOY: Piece.template(
    [
      [true, true],
      [true, true],
    ],
    Color.YELLOW,
  ),
  // L
  ORANGE_RICKY: Piece.template(
    [
      [false, false, true],
      [true, true, true],
    ],
    Color.ORANGE,
  ),
  // reverse L
  BLUE_RICKY: Piece.template(
    [
      [true, false, false],
      [true, true, true],
    ],
    Color.BLUE,
  ),
  // Line
  HERO: Piece.template([[true, true, true, true]], Color.CYAN),
  // S
  RHODE_ISLAND_Z: Piece.template(
    [
      [false, true, true],
      [true, true, false],
    ],
    Color.GREEN,
  ),
  // Z
  CLEVELAND_Z: Piece.template(
    [
      [true, true, false],
      [false, true, true],
    ],
    Color.RED,
  ),
  // T
  TEEWEE: Piece.template(
    [
      [false, true, false],
      [true, true, true],
    ],
    Color.PURPLE,
  ),
} as const;

export function randomPiece() {
  const keys = Object.keys(PIECE_TEMPLATES) as (keyof typeof PIECE_TEMPLATES)[];
  return PIECE_TEMPLATES[randomChoice(keys)];
}
