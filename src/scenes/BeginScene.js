import * as Phaser from "phaser";

export default class BeginScene extends Phaser.Scene {
  constructor() {
    super("BeginScene");
  }

  preload() {
    this.load.image("fleafleeTitle", "img/title.png");
  }

  create() {
    this.cameras.main.backgroundColor.setTo(245, 229, 200);

    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 100,
        "fleafleeTitle"
      )
      .setOrigin(0.5, 0.5)
      .setScale(0.5);

    // Button 1: Game vs AI
    const button1 = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 150,
        "Press 1 for game vs AI",
        { font: "18px Arial", fill: "#000" }
      )
      .setOrigin(0.5, 0.5)
      .setInteractive();

    button1.on("pointerdown", () => {
      this.startGameVsAI();
    });

    // Button 2: Hot Seat Game of Two
    const button2 = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 200,
        "Press 2 for hot seat game of two",
        { font: "18px Arial", fill: "#000" }
      )
      .setOrigin(0.5, 0.5)
      .setInteractive();

    button2.on("pointerdown", () => {
      this.startHotSeatGame();
    });

    // Key press event
    this.input.keyboard.on("keydown", (event) => {
      if (event.key === "1") {
        this.startGameVsAI();
      } else if (event.key === "2") {
        this.startHotSeatGame();
      }
    });
  }

  startGameVsAI() {
    // Start the game vs AI
    this.scene.start("GameVsAiScene");
  }

  startHotSeatGame() {
    // Start the hot seat game
    this.scene.start("HotSeatGameScene");
  }
}
