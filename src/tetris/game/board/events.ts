import { Tiles } from "../common/tiles";

export type BoardEvents = {
  completedRow: (row: number) => void;
  boardUpdated: (tiles: Tiles) => void;
};
