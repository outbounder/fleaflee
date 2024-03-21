// lib/ScoreState.js
export default class ScoreState {
  constructor(scene, players) {
    this.scene = scene;
    this.scores = {};
    this.players = players;
    players.forEach((player) => {
      this.scores[player.type] = 0;
    });
  }

  addScore(playerType) {
    this.scores[playerType]++;
    // Emit an event with the updated scores
    this.scene.events.emit("scoreUpdated", this.scores);
  }

  getScores() {
    return this.scores;
  }
}
