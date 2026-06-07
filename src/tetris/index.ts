import { Game } from "./game";
import { Board } from "./game/board";
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
  const game = new Game(new BoardRenderer(elements.canvas));
  elements.buttons.tick.onclick = () => game.tick();
}
