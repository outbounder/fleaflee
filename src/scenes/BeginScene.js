import * as Phaser from "phaser";

export default class BeginScene extends Phaser.Scene {
  constructor() {
    super("BeginScene");
  }

  preload() {
    this.load.image("fleafleeTitle", "img/title.png");
  }

  create() {
    // f5e5c8
    this.cameras.main.backgroundColor.setTo(245, 229, 200);

    // Display the title image
    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 100,
        "fleafleeTitle"
      )
      .setOrigin(0.5, 0.5)
      .setScale(0.5);

    // Display instruction text
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 200,
        "Press any key to begin",
        { font: "24px Arial", fill: "#000" }
      )
      .setOrigin(0.5, 0.5);

    // Listen for any key press to start the game
    this.input.keyboard.on("keydown", () => {
      this.scene.start("GameScene");
    });
  }
}
