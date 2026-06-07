import { BoardManager } from "./game/board";
import { MoveLeftCommand, MoveRightCommand } from "./game/board/commands";
import { BoardRenderer } from "./renderer";

interface GameElements {
  canvas: HTMLCanvasElement;
  buttons: {
    turnLeft: HTMLButtonElement;
    turnRight: HTMLButtonElement;
    left: HTMLButtonElement;
    right: HTMLButtonElement;
    tick: HTMLButtonElement;
  };
}

export function startGame(elements: GameElements) {
  const game = new BoardManager(new BoardRenderer(elements.canvas));
  elements.buttons.tick.onclick = () => game.tick();

  elements.buttons.left.onclick = () => game.execute(new MoveLeftCommand());
  elements.buttons.right.onclick = () => game.execute(new MoveRightCommand());
}
