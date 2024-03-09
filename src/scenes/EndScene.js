import * as Phaser from "phaser";

export default class EndScene extends Phaser.Scene {
  constructor() {
    super("EndScene");
  }

  init(data) {
    this.winnerText = data.winner;
    this.nextScene = data.nextScene;
  }

  create() {
    // Display the winner text
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 100, // Adjusted for spacing
        this.winnerText,
        {
          fontSize: "32px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5, 0.5);

    // Delay key press listener activation for 3 seconds
    this.time.delayedCall(850, () => {
      // Instruction text for playing again
      this.add
        .text(
          this.cameras.main.centerX,
          this.cameras.main.centerY, // Positioned below the winner text
          "Press any key to play again",
          {
            fontSize: "20px",
            fill: "#FFF",
          }
        )
        .setOrigin(0.5, 0.5);
      this.input.keyboard.on("keydown", () => {
        // You can directly start the GameScene, or go to the BeginScene if you have one
        this.scene.start(this.nextScene);
      });
    });
  }
}
