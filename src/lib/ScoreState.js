// lib/ScoreState.js
export default class ScoreState {
  constructor(scene) {
    this.scene = scene;
    this.player1Score = 0;
    this.player2Score = 0;
  }

  addScore(playerId) {
    if (playerId === "player1") {
      this.player1Score++;
    } else if (playerId === "player2") {
      this.player2Score++;
    }
    // Emit an event with the updated scores
    this.scene.events.emit(
      "scoreUpdated",
      this.player1Score,
      this.player2Score
    );
  }

  getScores() {
    return { player1Score: this.player1Score, player2Score: this.player2Score };
  }
}
