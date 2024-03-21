import * as Phaser from "phaser";

export default class Trail {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.trail = []; // Array to hold the trail of circles
  }

  update() {
    // Add a texture to the trail array at the player's current position
    let trailTexture = this.scene.add.image(
      this.player.x,
      this.player.y,
      "shape-characters",
      `${this.player.type}_body_square.png`
    );
    trailTexture.setDepth(this.player.depth - 1); // Ensure appear behind player
    trailTexture.setScale(this.player.scaleX * 0.5, this.player.scaleY * 0.5); // Set the scale of the trail to match the player's scale
    this.trail.push(trailTexture);

    // Decay the trail by removing the oldest texture and fading out the remaining ones
    if (this.trail.length > 10) {
      this.trail.shift().destroy();
    }
    this.trail
      .slice()
      .reverse()
      .forEach((trail, index) => {
        trail.alpha = (this.trail.length - index) / this.trail.length; // Fade out the trail in reverse
      });
  }
}
