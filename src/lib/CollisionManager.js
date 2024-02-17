// lib/CollisionManager.js

export default class CollisionManager {
  constructor(scene, scoreState) {
    this.scene = scene;
    this.scoreState = scoreState;
  }

  setupBounds() {
    const { width, height } = this.scene.scale;
    this.createBoundary(width / 2, -100, width * 2, 200, "worldceiling"); // Top
    this.createBoundary(-100, height / 2, 200, height, "worldborder"); // Left
    this.createBoundary(width + 100, height / 2, 200, height, "worldborder"); // Right
    this.createBoundary(width / 2, height + 100, width * 2, 200, "worldfloor"); // Bottom
  }

  createBoundary(x, y, width, height, label) {
    this.scene.matter.add.rectangle(x, y, width, height, {
      isStatic: true,
      label,
    });
  }

  setupCollisions(player) {
    this.scene.matter.world.on("collisionstart", (event) => {
      event.pairs.forEach((pair) => {
        this.handleCollision(pair, player);
      });
    });
  }
  handleCollision(pair, player) {
    const { bodyA, bodyB } = pair;

    // Ensure we're working with the GameObjects, which should have the 'label' property
    const gameObjectA = bodyA.gameObject;
    const gameObjectB = bodyB.gameObject;

    // Check if both objects involved are players
    if (
      gameObjectA &&
      gameObjectB &&
      bodyA.label === "player" &&
      bodyB.label === "player"
    ) {
      // Ensure we're not dealing with the same player object
      if (gameObjectA !== gameObjectB) {
        this.determineScorerAndBounce(gameObjectA, gameObjectB);
        return; // Exit early to avoid further checks
      }
    }

    // Handle collisions with "solid" objects for the original player
    const otherBody = bodyA.gameObject === player ? bodyB : bodyA;
    if (
      otherBody &&
      (otherBody.label === "platform" ||
        otherBody.label === "worldborder" ||
        otherBody.label === "worldfloor" ||
        otherBody.label === "worldceiling")
    ) {
      if (otherBody.label === "worldborder") {
        if (otherBody.position.x > player.x) {
          player.scheduleForce({ x: -0.0005, y: 0 });
        } else {
          player.scheduleForce({ x: 0.0005, y: 0 });
        }
      } else {
        player.land(); // Resets the player's state as needed
      }
    }
  }

  determineScorerAndBounce(player1, player2) {
    const currentTime = Date.now();
    // Determine which player is on top
    const playerOnTop = player1.y < player2.y ? player1 : player2;
    if (currentTime - playerOnTop.lastScoreTime > 1000) {
      const scorer = playerOnTop === player1 ? "player1" : "player2";
      this.scoreState.addScore(scorer);
      console.log(`${scorer} scores!`);

      playerOnTop.lastScoreTime = currentTime;
    }
    playerOnTop.scheduleForce({ x: 0, y: -0.005 });
  }
}
