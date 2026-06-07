import { BoardManager } from "./game/board";
import {
  MoveDownCommand,
  MoveLeftCommand,
  MoveRightCommand,
} from "./game/board/commands";
import { BoardRenderer } from "./renderer";

interface GameElements {
  canvas: HTMLCanvasElement;
  buttons: {
    turnLeft: HTMLButtonElement;
    turnRight: HTMLButtonElement;
    left: HTMLButtonElement;
    right: HTMLButtonElement;
    down: HTMLButtonElement;
  };
}

export function startGame(elements: GameElements) {
  const renderer = new BoardRenderer(elements.canvas);
  const board = new BoardManager(renderer);
  renderer.attachBoard(board);

  elements.buttons.left.onclick = () => board.execute(new MoveLeftCommand());
  elements.buttons.right.onclick = () => board.execute(new MoveRightCommand());
  elements.buttons.down.onclick = () => board.execute(new MoveDownCommand());

  board.tick();
  setInterval(() => board.tick(), 1000);
}
