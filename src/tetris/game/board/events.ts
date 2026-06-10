import { Tiles } from "../common/tiles";

export type BoardEvents = {
  completedRows: (rows: number[]) => void;
  boardUpdated: (tiles: Tiles) => void;
};
