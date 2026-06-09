import { Board } from "./game/board";
import {
  MoveDownCommand,
  MoveLeftCommand,
  MoveRightCommand,
  RotateClockwiseCommand,
  RotateCounterClockwiseCommand,
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
    restart: HTMLButtonElement;
  };
}

export function startGame(elements: GameElements) {
  const board = new Board();
  const renderer = new BoardRenderer(elements.canvas);
  renderer.attachBoard(board);

  elements.buttons.left.onclick = () => board.execute(new MoveLeftCommand());
  elements.buttons.right.onclick = () => board.execute(new MoveRightCommand());
  elements.buttons.down.onclick = () => board.execute(new MoveDownCommand());

  elements.buttons.turnRight.onclick = () =>
    board.execute(new RotateClockwiseCommand());
  elements.buttons.turnLeft.onclick = () =>
    board.execute(new RotateCounterClockwiseCommand());

  board.tick();
  setInterval(() => board.tick(), 1000);

  elements.buttons.restart.onclick = () => {
    board.clear();
    board.tick();
  };
}
