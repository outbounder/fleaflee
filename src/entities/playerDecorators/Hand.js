import * as Phaser from "phaser";

export default class Hand {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.state = null;

    // Add hand to the player
    this.hand = this.scene.add.image(
      this.player.x,
      this.player.y,
      "shape-characters",
      `${this.player.type}_hand_point.png`
    );
    this.hand.setScale(0.5);
    this.hand.setDepth(this.player.depth + 1); // Ensure hand appears in front of player
    this.hand.setVisible(false); // Initially, the hand is hidden
    this.hand.setAngle(45); // Rotate the hand by 45 degrees
  }

  // Method to change the hand state to 'fist'
  fist() {
    this.hand.setTexture(
      "shape-characters",
      `${this.player.type}_hand_closed.png`
    );
    this.showHandTemporarily();
  }
  fistDown() {
    this.state = "down";
    this.hand.setTexture(
      "shape-characters",
      `${this.player.type}_hand_closed.png`
    );
    this.hand.setAngle(-90); // Rotate the hand by 45 degrees
    this.showHandTemporarily();
  }

  // Method to change the hand state to 'wave'
  wave() {
    this.hand.setTexture(
      "shape-characters",
      `${this.player.type}_hand_peace.png`
    );
    this.showHandTemporarily();
  }

  hide() {
    this.hand.setVisible(false);
    this.state = null;
    this.hand.setAngle(45); // Rotate the hand by 45 degrees
  }

  showHandTemporarily() {
    this.hand.setPosition(this.player.x + 25, this.player.y);
    this.hand.setVisible(true);
    this.scene.time.delayedCall(3000, () => {
      this.hide();
    });
  }

  update() {
    // Update the position of the hand to follow the player
    if (this.hand.visible) {
      if (this.state === "down") {
        this.hand.setPosition(this.player.x + 15, this.player.y + 10);
      } else {
        this.hand.setPosition(this.player.x + 25, this.player.y);
      }
    }
  }
}
