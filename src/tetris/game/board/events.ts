import { Tiles } from "./tiles";

export type BoardEvents = {
  completedRow: (row: number) => void;
  boardUpdated: (tiles: Tiles) => void;
};
