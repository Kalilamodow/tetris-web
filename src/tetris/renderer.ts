import { Color } from "./game/color";

export class BoardRenderer {
  constructor(private canvas: HTMLCanvasElement) {}
  public render(tiles: (Color | null)[][]) {
    console.table(tiles);
  }
}
