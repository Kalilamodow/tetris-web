import { Color } from "./color";

export interface BoardRenderer {
  render(board: (Color | null)[][]): void;
}
