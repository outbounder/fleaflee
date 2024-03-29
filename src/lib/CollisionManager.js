// lib/CollisionManager.js

export default class CollisionManager {
  constructor(scene, scoreState, flagsManager) {
    this.scene = scene;
    this.scoreState = scoreState;
    this.flagsManager = flagsManager;

    // Load score sound and flag hit sound
    this.scoreSound = this.scene.sound.add("fleasHit");
    this.flagHitSound = this.scene.sound.add("flagHit");
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

  setupCollisions() {
    this.scene.matter.world.on("collisionstart", (event) => {
      event.pairs.forEach((pair) => {
        this.handleCollision(pair);
      });
    });
  }
  handleCollision(pair) {
    const { bodyA, bodyB } = pair;

    // Check if both objects involved are players
    if (bodyA.label === "player" && bodyB.label === "player") {
      // Ensure we're working with the GameObjects, which should have the 'label' property
      const gameObjectA = bodyA.gameObject;
      const gameObjectB = bodyB.gameObject;

      // Ensure we're not dealing with the same player object
      if (gameObjectA !== gameObjectB) {
        this.determineScorerAndBounce(gameObjectA, gameObjectB);
        this.scoreSound.play();
        return; // Exit early to avoid further checks
      }
    }

    // Handle collisions with "solid" objects for the original player
    let player, other;
    if (bodyA.label === "player") {
      player = bodyA.gameObject;
      other = bodyB;
    } else if (bodyB && bodyB.label === "player") {
      player = bodyB.gameObject;
      other = bodyA;
    }

    if (
      player &&
      other &&
      (other.label === "platform" ||
        other.label === "worldborder" ||
        other.label === "worldfloor" ||
        other.label === "worldceiling" ||
        other.label === "flag")
    ) {
      if (other.label === "worldceiling") {
        player.scheduleForce({ x: 0, y: 0.0005 });
      } else if (other.label === "worldborder") {
        if (other.position.x > player.x) {
          player.scheduleForce({ x: -0.0005, y: 0 });
        } else {
          player.scheduleForce({ x: 0.0005, y: 0 });
        }
      } else if (other.label === "flag") {
        this.scoreState.addScore(player.type);
        console.log(`${player.type} scores!`);
        this.flagsManager.removeFlag(other.gameObject); // Remove the flag once collided
        this.flagHitSound.play(); // Play flag hit sound
      } else {
        player.land(); // Resets the player's state as needed
      }
    }
  }

  determineScorerAndBounce(player1, player2) {
    const currentTime = Date.now();
    // Determine which player is on top
    const playerOnTop = player1.y < player2.y ? player1 : player2;
    const playerOnBottom = playerOnTop === player1 ? player2 : player1;
    if (currentTime - playerOnTop.lastScoreTime > 1000) {
      const scorer = playerOnTop;
      this.scoreState.addScore(scorer.type);
      console.log(`${scorer.type} scores!`);

      playerOnTop.lastScoreTime = currentTime;
      playerOnTop.face.happy(); // Make the player on top happy
      playerOnBottom.face.angry(); // Make the player on bottom angry
      playerOnBottom.hand.fist(); // Make the player on top happy
    }
    playerOnTop.scheduleForce({ x: 0, y: -0.005 });
  }
}
