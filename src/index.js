import * as Phaser from "phaser";
import HotSeatGameScene from "./scenes/HotSeatGameScene.js";
import GameVsAiScene from "./scenes/GameVsAiScene.js";
import EndScene from "./scenes/EndScene.js";
import BeginScene from "./scenes/BeginScene.js";

export default function run() {
  // Function to get the current window size
  const getWindowSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  // Initial window size
  const { width, height } = getWindowSize();

  const config = {
    type: Phaser.AUTO,
    parent: "screen", // ID of the target div
    width: width,
    height: height,
    scene: [BeginScene, GameVsAiScene, HotSeatGameScene, EndScene],
    scale: {
      mode: Phaser.Scale.RESIZE, // This scale mode will resize the canvas to fit the parent size
      parent: "screen",
      width: "100%",
      height: "100%",
    },
    physics: {
      default: "matter",
      matter: {
        debug: false,
      },
    },
  };

  const game = new Phaser.Game(config);

  // Listen for window resize events to update the game size
  window.addEventListener("resize", () => {
    const { width, height } = getWindowSize();
    game.scale.resize(width, height);
  });
}
