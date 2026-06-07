import { startGame } from "./tetris";
import { getButton, getElementById } from "./utils";

function main() {
  getButton("play-btn").addEventListener("click", () => {
    getElementById("home").hidden = true;
    getElementById("game").hidden = false;
    startGame({
      canvas: getElementById<HTMLCanvasElement>("canvas"),
      buttons: {
        left: getButton("left-btn"),
        right: getButton("right-btn"),
        turnLeft: getButton("turn-left-btn"),
        turnRight: getButton("turn-right-btn"),
        down: getButton("down-btn"),
      },
    });
  });
}

main();
