import { Tiles } from "../common/tiles";
import { Piece } from "./piece";

export type BoardEvents = {
  completedRows: (rows: number[]) => void;
  boardUpdated: (tiles: Tiles) => void;
  nextPieceUpdated: (piece: Piece) => void;
};
