// entities/HUD.js
import { gameTime } from "../lib/constants.js";

export default class HUD {
  constructor(scene, players) {
    this.scene = scene;
    this.players = players;
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
    this.scoreTexts = {};
    this.players.forEach((player, index) => {
      const scoreTextX = index === 0 ? 16 : this.scene.cameras.main.width - 350; // Adjust based on the width of the text or desired margin
      this.scoreTexts[player.type] = this.scene.add.text(
        scoreTextX,
        16,
        `${player.type} Score: 0`,
        {
          fontSize: "32px",
          fill: player.type,
        }
      );
    });
  }

  updateScore(scores) {
    for (const playerType in scores) {
      this.scoreTexts[playerType].setText(
        `${playerType} Score: ${scores[playerType]}`
      );
    }
  }

  updateTime(time) {
    this.timeLeft.setText("Time: " + time);
  }

  removeListeners() {
    this.scene.events.off("scoreUpdated", this.updateScore, this);
    this.scene.events.off("timeUpdated", this.updateTime, this);
  }
}
