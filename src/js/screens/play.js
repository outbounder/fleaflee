// PlayScreen.js
import * as me from "melonjs";
import game from "../game.js"; // Adjust the path as necessary
import PlayerEntity from "../entities/PlayerEntity.js"; // Adjust the path as necessary
import GroundEntity from "../entities/GroundEntity.js";
import HUD from "../entities/HUD.js";

class PlayScreen extends me.Stage {
  onResetEvent() {
    // reset the scores
    game.data.score = { player1: 0, player2: 0 };

    // Add a white background color
    this.backgroundColor = new me.ColorLayer("background", "#FFFFFF", 0);
    me.game.world.addChild(this.backgroundColor, 0);

    let ground = new GroundEntity(
      0,
      me.video.renderer.height - 16,
      me.video.renderer.width,
      16
    );
    me.game.world.addChild(ground, 1);

    // Define player settings, including image and control keys
    const player1Settings = {
      name: "p1",
      image: "flea0p1", // Default image for player 1
      leftKey: "LEFT",
      rightKey: "RIGHT",
    };

    const player2Settings = {
      name: "p2",
      image: "flea0p2", // Default image for player 2
      leftKey: "A",
      rightKey: "D",
    };

    // Add the players with settings
    this.player1 = me.game.world.addChild(
      new PlayerEntity(100, 380, player1Settings),
      2
    );
    this.player2 = me.game.world.addChild(
      new PlayerEntity(500, 380, player2Settings),
      2
    );
    me.game.world.addChild(new HUD());
  }

  onDestroyEvent() {
    // Unbind keys (if bound inside PlayerEntity, this might not be necessary here)
    me.input.unbindKey(me.input.KEY.LEFT);
    me.input.unbindKey(me.input.KEY.RIGHT);
    me.input.unbindKey(me.input.KEY.A);
    me.input.unbindKey(me.input.KEY.D);

    // Remove players or other entities
    me.game.world.removeChild(this.player1);
    me.game.world.removeChild(this.player2);
  }
}

export default PlayScreen;
