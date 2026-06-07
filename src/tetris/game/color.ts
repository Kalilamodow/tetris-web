import { randomChoice } from "./utils";

export class Color {
  constructor(public rgb: string) {}

  public static RED = new Color("#f00");
  public static ORANGE = new Color("#f80");
  public static GREEN = new Color("#0f0");
  public static BLUE = new Color("#00f");
  public static CYAN = new Color("#0ff");
  public static PURPLE = new Color("#80f");

  private static colorsArr = [
    this.RED,
    this.ORANGE,
    this.GREEN,
    this.BLUE,
    this.CYAN,
    this.PURPLE,
  ];
  public static random() {
    return randomChoice(this.colorsArr);
  }
}
