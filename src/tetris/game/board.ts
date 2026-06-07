import { Color } from "./color";
import { Piece } from "./piece";

const fillArray = <T>(size: number, thing: () => T): T[] =>
  new Array(size).fill(thing).map((f) => f());

export class Board {
  private tiles: (Color | null)[][];

  constructor(
    private width: number,
    private height: number,
  ) {
    this.tiles = fillArray(this.height, () =>
      fillArray(this.width, () => null),
    );
  }

  public checkCollision(row: number, column: number) {
    if (row >= this.height) return true;
    if (column < 0 || column >= this.width) return true;
    return this.tiles[row][column] !== null;
  }

  public isRowFull(row: number) {
    return this.tiles[row].every((t) => t !== null);
  }

  public removeRow(row: number) {
    this.tiles.splice(row, 1);
    this.tiles.unshift(fillArray(this.width, () => null));
  }

  public setRow(rowIndex: number, row: (Color | null)[]) {
    this.tiles[rowIndex] = row;
  }

  public set(row: number, column: number, tile: Color | null) {
    this.tiles[row][column] = tile;
  }

  public getTiles() {
    return this.tiles;
  }

  public withPiece(piece: Piece) {
    const board = this.copy();
    for (const [rowIndex, tileRow] of piece.pieces.entries()) {
      for (const [tileIndex, isTileThere] of tileRow.entries()) {
        if (isTileThere) {
          board.set(
            rowIndex + piece.point.y,
            tileIndex + piece.point.x,
            piece.color,
          );
        }
      }
    }

    return board;
  }

  public copy() {
    const newBoard = new Board(this.width, this.height);
    for (let i = 0; i < this.height; i++)
      newBoard.setRow(i, [...this.tiles[i]]);
    return newBoard;
  }
}
