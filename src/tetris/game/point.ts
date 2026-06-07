export class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}

  public is(other: Point) {
    return this.x === other.x && this.y === other.y;
  }

  public move(by: Point) {
    this.x += by.x;
    this.y += by.y;
  }
}
