import * as Phaser from "phaser";

export default class Face {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;

    // Add eyes to the player
    this.eyes = this.scene.add.image(
      this.player.x,
      this.player.y,
      "shape-characters",
      "face_a.png"
    );
    this.eyes.setScale(0.25);
    this.eyes.setDepth(this.player.depth + 1); // Ensure eyes appear in front of player
  }

  angry() {
    // Switch the face to 'face_e.png' for 3 seconds
    this.eyes.setTexture("shape-characters", "face_g.png");
    this.scene.time.delayedCall(3000, () => {
      this.eyes.setTexture("shape-characters", "face_a.png");
    });
  }

  happy() {
    // Switch the face to 'face_e.png' for 3 seconds
    this.eyes.setTexture("shape-characters", "face_c.png");
    this.scene.time.delayedCall(3000, () => {
      this.eyes.setTexture("shape-characters", "face_a.png");
    });
  }

  update() {
    // Update the position of the eyes to follow the player
    this.eyes.setPosition(this.player.x, this.player.y);
  }
}
