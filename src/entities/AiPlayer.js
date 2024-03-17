import Player from "./Player.js";

export default class AiPlayer extends Player {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    this.scene = scene;
    this.jumpCooldown = 0;
    this.chargeCooldown = 0;
    this.aggressionLevel = 0.5; // Adjust for difficulty
    this.randomJumpThreshold = 0.6; // Chance for random jump
    this.lastUpdateTime = this.scene.time.now;
    this.gravity = this.scene.matter.world.localWorld.gravity.y;
  }

  update() {
    const currentTime = this.scene.time.now;
    const delta = currentTime - this.lastUpdateTime;
    this.lastUpdateTime = currentTime;

    // Update cooldowns
    this.jumpCooldown -= delta;
    this.chargeCooldown -= delta;

    const player = this.scene.player1;
    const playerX = player.x;
    const playerY = player.y;

    // Decide to strategically jump towards player
    if (this.jumpCooldown <= 0 && Math.random() < this.aggressionLevel) {
      this.jumpTowardsPlayer(playerX, playerY);
      this.jumpCooldown = 2000; // Cooldown before next jump
    }
    // Decide to randomly jump
    else if (
      this.jumpCooldown <= 0 &&
      Math.random() < this.randomJumpThreshold
    ) {
      this.performRandomJump();
      this.jumpCooldown = 1000; // Shorter cooldown for random jumps
    }

    super.update();
  }

  jumpTowardsPlayer(playerX, playerY) {
    const distanceX = playerX - this.x;
    const distanceY = Math.abs(this.y - playerY); // Assuming positive Y is downwards in your game
    // Calculate horizontal speed needed to reach the player
    const horizontalSpeedRequired = this.calculateHorizontalSpeed(
      distanceX,
      distanceY
    );

    // Convert horizontal speed to a charge level - this requires knowledge of how
    // charge level translates to speed in your game
    const chargeLevel = this.convertSpeedToChargeLevel(horizontalSpeedRequired);

    const direction = distanceX < 0 ? "left" : "right";
    this.startCharge(direction);
    this.chargeLevel = Math.min(chargeLevel, this.maxJumpSpeed);
    this.jump();
  }

  calculateHorizontalSpeed(distanceX, distanceY) {
    // Gravity affects the vertical motion, so we first calculate the time to reach the player vertically
    const timeToReachPlayerY = Math.sqrt((2 * distanceY) / this.gravity); // Derived from kinematic equations
    // Horizontal speed is then distance divided by time
    return Math.abs(distanceX) / timeToReachPlayerY;
  }

  convertSpeedToChargeLevel(horizontalSpeed) {
    // This conversion depends on how your game's physics work
    // For example, if charge level is directly proportional to speed:
    const proportionalityConstant = 0.01; // This needs to be adjusted based on your game
    return horizontalSpeed * proportionalityConstant;
  }

  performRandomJump() {
    const direction = Math.random() < 0.5 ? "left" : "right";
    const chargeLevel = Math.random() * this.maxJumpSpeed;

    this.startCharge(direction);
    this.chargeLevel = chargeLevel;

    // Random cooldown between 500ms and 1500ms before jumping
    const jumpDelay = 500 + Math.random() * 1000;
    this.scene.time.delayedCall(jumpDelay, () => {
      this.jump();
    });
  }
}
