// entities/HUD.js
import * as Phaser from "phaser";
import { gameTime } from "../lib/constants.js";

export default class HUD {
  constructor(scene) {
    this.scene = scene;
    this.initScoreTexts();
    this.scene.events.on("scoreUpdated", this.updateScore, this);

    this.timeLeft = this.scene.add.text(
      this.scene.cameras.main.width / 2 - 90,
      16,
      `Time: ${gameTime}`,
      {
        fontSize: "42px",
        fill: "#000",
      }
    );
    this.scene.events.on("timeUpdated", this.updateTime, this);
  }

  initScoreTexts() {
    this.scoreTextPlayer1 = this.scene.add.text(16, 16, "Player 1 Score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    const scoreTextPlayer2X = this.scene.cameras.main.width - 350; // Adjust based on the width of the text or desired margin

    this.scoreTextPlayer2 = this.scene.add.text(
      scoreTextPlayer2X,
      16,
      "Player 2 Score: 0",
      {
        fontSize: "32px",
        fill: "#0F0",
      }
    );
  }

  updateScore(player1Score, player2Score) {
    this.scoreTextPlayer1.setText("Player 1 Score: " + player1Score);
    this.scoreTextPlayer2.setText("Player 2 Score: " + player2Score);
  }

  updateTime(time) {
    this.timeLeft.setText("Time: " + time);
  }

  removeListeners() {
    this.scene.events.off("scoreUpdated", this.updateScore, this);
    this.scene.events.off("timeUpdated", this.updateTime, this);
  }
}
