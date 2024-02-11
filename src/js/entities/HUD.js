import * as me from "melonjs";
import game from "../game.js";

class HUD extends me.Container {
  constructor() {
    // call the constructor
    super();

    // persistent across level change
    this.isPersistent = true;

    // Use screen coordinates
    this.floating = true;

    // make sure our object is always draw first
    this.z = Infinity;

    // give a name
    this.name = "HUD";

    // add our child score object at position
    this.player1Score = new me.Text(50, 50, {
      font: "Arial",
      text: "player1",
      size: 16,
      fillStyle: "#FF0000",
    });
    this.player2Score = new me.Text(me.game.viewport.width - 130, 50, {
      font: "Arial",
      text: "player2",
      size: 16,
      fillStyle: "#FF0000",
    });

    this.addChild(this.player1Score);
    this.addChild(this.player2Score);
  }
  update(dt) {
    this.player1Score.setText("player1: " + game.data.score.player1);
    this.player2Score.setText("player2: " + game.data.score.player2);
    return super.update(dt);
  }
}

export default HUD;
