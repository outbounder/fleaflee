// entities/player.js
import * as Phaser from "phaser";
import settings from "../lib/settings.js";

import Hand from "./playerDecorators/Hand.js";
import Trail from "./playerDecorators/Trail.js";
import Face from "./playerDecorators/Face.js";

export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, type) {
    const textureName = `${type}_body_squircle.png`;
    super(scene.matter.world, x, y, "shape-characters", textureName, {
      label: "player",
    });

    this.scene.add.existing(this); // Add the sprite to the scene

    this.type = type;
    this.chargeLevel = 0;
    this.isCharging = false;
    this.isJumping = false;
    this.jumpCount = 0; // Count of jumps made
    this.chargeDirection = "right";
    this.maxJumpSpeed = 0.02; // Adjusted for Matter.js force application
    this.scheduledForce = null; // used as buffer to apply force
    this.lastScoreTime = 0; // used to prevent multiple scoring
    this.lastJumpDirection = null; // Track the last jump direction
    this.idleTime = 0; // Track the idle time of the player

    // Use the texture's frame to set the sprite's scale properly
    const texture = this.scene.textures.getFrame(
      "shape-characters",
      textureName
    );
    this.setScale(0.25); // Adjust the scale based on the texture size

    // Set the origin to the bottom center if necessary to ensure the player lands on their feet
    this.setOrigin(0.5, 1);

    // Optionally, adjust the body size if the default is not appropriate
    this.setRectangle((texture.width * 25) / 100, (texture.height * 25) / 100, {
      label: "player",
    });
    this.setFixedRotation(); // Prevent body from rotating

    // Load jump sound
    this.jumpSound = this.scene.sound.add("jump");

    // Initialize face
    this.face = new Face(scene, this);

    // Initialize trail
    this.trail = new Trail(scene, this);

    // Initialize hand
    this.hand = new Hand(scene, this);
  }

  startCharge(direction) {
    this.isCharging = true;
    this.chargeDirection = direction;
    this.chargeLevel = 0;
    this.flipX = direction === "right";
  }

  charge() {
    if (!this.isCharging) return;
    this.chargeLevel = Math.min(
      this.chargeLevel + 0.00125 * settings.getSpeedOfChargeMultiplyer(),
      this.maxJumpSpeed
    );
    const chargePercentage = this.chargeLevel / this.maxJumpSpeed;

    // Change texture based on charge level
    if (chargePercentage >= 0.6) {
      this.setTexture("shape-characters", `${this.type}_body_rhombus.png`);
    } else if (chargePercentage >= 0.3) {
      this.setTexture("shape-characters", `${this.type}_body_circle.png`);
    }
  }

  jump() {
    if (
      !this.isCharging ||
      (this.isJumping &&
        settings.getMultipleJumps() !== -1 &&
        this.jumpCount >= settings.getMultipleJumps())
    )
      return; // do not initiate jump
    console.log("JUMP", this.type);
    const jumpDirection = this.chargeDirection === "left" ? -1 : 1;
    let jumpForce = this.chargeLevel;
    if (this.lastJumpDirection === this.chargeDirection) {
      jumpForce /= 2; // Lower the jump force by 2 if jumping in the same direction
    }
    this.applyForce({
      x: jumpDirection * jumpForce,
      y: -jumpForce,
    });
    this.setTexture("shape-characters", `${this.type}_body_square.png`);
    this.isCharging = false;
    this.chargeLevel = 0;
    this.isJumping = true;
    this.jumpCount++; // Increment jump count
    this.lastJumpDirection = this.chargeDirection; // Update the last jump direction

    this.jumpSound.play();
    this.hand.hide();
  }

  land() {
    console.log("LAND", this.type);
    this.isJumping = false;
    this.chargeLevel = 0;
    this.jumpCount = 0; // Reset jump count
    this.setTexture("shape-characters", `${this.type}_body_squircle.png`); // Reset to normal state
    this.lastJumpDirection = null; // Reset the last jump direction
    this.idleTime = 0; // Reset idle time
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

    // Update trail
    this.trail.update();

    // Update the face
    this.face.update();

    // Update the hand
    this.hand.update();

    // Check if player is idle for too long
    if (!this.isJumping) {
      this.idleTime++;
      if (this.idleTime > 100) {
        // Show hand after 100 frames of idleness
        this.hand.wave();
        if (this.idleTime > 200) {
          // Hide hand after 200 frames of idleness
          this.hand.fist();
          this.idleTime = 0;
        }
      }
    }
  }
}
