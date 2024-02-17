// entities/player.js
import * as Phaser from "phaser";

export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, type) {
    const textureName = `flea0${type}`;
    super(scene.matter.world, x, y, textureName, null, {
      label: "player",
    });

    this.scene.add.existing(this); // Add the sprite to the scene

    this.type = type;
    this.chargeLevel = 0;
    this.isCharging = false;
    this.isJumping = false;
    this.chargeDirection = "right";
    this.maxJumpSpeed = 0.06; // Adjusted for Matter.js force application
    this.scheduledForce = null; // used as buffer to apply force
    this.lastScoreTime = 0; // used to prevent multiple scoring

    // Use the texture's frame to set the sprite's scale properly
    const texture = this.scene.textures.get(textureName);
    this.setScale(0.75); // Adjust the scale based on the texture size

    // Set the origin to the bottom center if necessary to ensure the player lands on their feet
    this.setOrigin(0.5, 1);

    // Optionally, adjust the body size if the default is not appropriate
    this.setRectangle(texture.width, texture.height, {
      label: "player",
    });
    this.setFixedRotation(); // Prevent body from rotating
  }

  startCharge(direction) {
    if (this.isJumping) return;
    this.isCharging = true;
    this.chargeDirection = direction;
    this.chargeLevel = 0;
    this.flipX = direction === "right";
  }

  charge() {
    if (!this.isCharging || this.isJumping) return;
    this.chargeLevel = Math.min(this.chargeLevel + 0.0005, this.maxJumpSpeed);
    const chargePercentage = this.chargeLevel / this.maxJumpSpeed;

    // Change texture based on charge level
    if (chargePercentage >= 0.6) {
      this.setTexture(`flea2${this.type}`);
    } else if (chargePercentage >= 0.3) {
      this.setTexture(`flea1${this.type}`);
    }
  }

  jump() {
    if (!this.isCharging) return;
    const jumpDirection = this.chargeDirection === "left" ? -1 : 1;
    this.applyForce({
      x: jumpDirection * this.chargeLevel,
      y: -this.chargeLevel,
    });
    this.setTexture(`flea-j${this.type}`);
    this.isCharging = false;
    this.chargeLevel = 0;
    this.isJumping = true;
  }

  land() {
    this.isJumping = false;
    this.chargeLevel = 0;
    this.setTexture(`flea0${this.type}`); // Reset to normal state
  }

  scheduleForce(force) {
    this.scheduledForce = force;
  }

  update() {
    if (this.scheduledForce) {
      this.applyForce(this.scheduledForce);
      this.scheduledForce = null;
    }
    if (this.isCharging) this.charge();
  }
}
