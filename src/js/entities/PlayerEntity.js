import * as me from "melonjs";
import game from "../game.js";

class PlayerEntity extends me.Entity {
  constructor(x, y, settings) {
    super(x, y, {
      image: me.loader.getImage(settings.image), // Default image
      width: 32,
      height: 22,
    });

    // Initialize properties
    this.settings = settings;
    this.body.gravity = 0.98;
    this.maxJump = -25; // Max jump speed
    this.jumpCharge = 0; // Initial jump charge
    this.maxCharge = 25; // Max charge time to reach full jump power
    this.body.vel.set(0, 5); // Set initial velocity
    this.body.maxVel.set(25, 25); // Set max velocity
    this.score = 0;
    this.isCharging = false;
    this.isJumping = false;
    this.facingRight = false;
    // Track last key status to detect key release
    this.lastLeftStatus = false;
    this.lastRightStatus = false;

    // Bind keys for movement
    me.input.bindKey(
      me.input.KEY[settings.leftKey],
      settings.name + "left",
      true
    );
    me.input.bindKey(
      me.input.KEY[settings.rightKey],
      settings.name + "right",
      true
    );

    this.alwaysUpdate = true;
    this.body.collisionType = me.collision.types.PLAYER_OBJECT;
    // Set a collision mask to determine what this entity collides with
    this.body.setCollisionMask(
      me.collision.types.WORLD_SHAPE | me.collision.types.PLAYER_OBJECT
    );
    this.body.addShape(new me.Rect(0, 0, this.width, this.height));
    this.anchorPoint.x = 0.5;
    this.anchorPoint.y = 0.5;
  }

  update(dt) {
    // Prevent the player from moving beyond the left edge of the screen
    if (this.pos.x < 0) {
      this.pos.x = 0;
    }

    // Prevent the player from moving beyond the right edge of the screen
    // Assume `me.game.viewport.width` gives the width of the viewport/screen
    if (this.pos.x + this.width > me.game.viewport.width) {
      this.pos.x = me.game.viewport.width - this.width;
    }

    // Prevent the player from moving beyond the top edge of the screen (if applicable)
    if (this.pos.y < 0) {
      this.pos.y = 0;
    }

    // Prevent the player from moving beyond the bottom edge of the screen
    // Assume `me.game.viewport.height` gives the height of the viewport/screen
    if (this.pos.y + this.height > me.game.viewport.height) {
      this.pos.y = me.game.viewport.height - this.height;
    }

    if (!this.isJumping) {
      if (me.input.keyStatus(this.settings.name + "left")) {
        // Key press state handling for jump charging
        this.facingRight = false;
        this.isCharging = true;
      } else if (me.input.keyStatus(this.settings.name + "right")) {
        this.facingRight = true;
        this.isCharging = true;
      }

      // Detect key release to trigger jump
      if (
        !me.input.keyStatus(this.settings.name + "left") &&
        this.lastLeftStatus &&
        this.isCharging
      ) {
        this.isCharging = false;
        this.jump();
      }
      if (
        !me.input.keyStatus(this.settings.name + "right") &&
        this.lastRightStatus &&
        this.isCharging
      ) {
        this.isCharging = false;
        this.jump();
      }
    }

    // Update last key status for the next frame
    this.lastLeftStatus = me.input.keyStatus(this.settings.name + "left");
    this.lastRightStatus = me.input.keyStatus(this.settings.name + "right");

    if (this.isCharging) {
      this.jumpCharge += dt * 0.05;
      this.jumpCharge = Math.min(this.jumpCharge, this.maxCharge);
    }

    this.updateSprite();

    return super.update(dt);
  }

  jump() {
    let chargeRatio = this.jumpCharge / this.maxCharge;
    let jumpVelocity = this.maxJump * chargeRatio;
    this.body.vel.y = jumpVelocity;
    this.body.vel.x = this.facingRight ? -jumpVelocity : jumpVelocity;
    this.isJumping = true;
    this.jumpCharge = 0;
    this.isCharging = false;
  }

  updateSprite() {
    let spriteImage = "flea0" + this.settings.name; // Default
    if (this.isJumping) {
      spriteImage = "flea-j" + this.settings.name;
    } else if (this.jumpCharge >= 0.6 * this.maxCharge) {
      spriteImage = "flea2" + this.settings.name;
    } else if (this.jumpCharge >= 0.25 * this.maxCharge) {
      spriteImage = "flea1" + this.settings.name;
    }

    this.renderable.image = me.loader.getImage(spriteImage);
    if (this.facingRight) {
      this.renderable.flipX(true);
    } else {
      this.renderable.flipX(false);
    }
  }

  onCollision(response, other) {
    if (other.body.collisionType === me.collision.types.WORLD_SHAPE) {
      this.isJumping = false;
      this.body.vel.y = 0;
      this.body.vel.x = 0;
      this.pos.sub(response.overlapV);
    }
    if (other.body.collisionType === me.collision.types.PLAYER_OBJECT) {
      // Reset vertical movement on collision with the ground
      this.body.force.set(response.overlapV.x * 2, response.overlapV.y * 2);
      if (response.overlapV.y > 0 && !other.isJumping) {
        this.body.vel.y = -1 * response.overlapV.y * 2;
        if (this.settings.name === "p1") {
          game.data.score.player1 += 1;
        } else {
          game.data.score.player2 += 1;
        }
      }
      this.pos.sub(response.overlapV);
    }
    return false;
  }

  onDestroyEvent() {
    me.input.unbindKey(me.input.KEY[this.leftKey]);
    me.input.unbindKey(me.input.KEY[this.rightKey]);
  }
}

export default PlayerEntity;
