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
  const renderer = new BoardRenderer(elements.canvas)
  const board = new BoardManager(renderer);
  renderer.attachBoard(board);

  elements.buttons.tick.onclick = () => board.tick();

  elements.buttons.left.onclick = () => board.execute(new MoveLeftCommand());
  elements.buttons.right.onclick = () => board.execute(new MoveRightCommand());
}
