// GameScene.js
import * as Phaser from "phaser";
import { preloadGameSceneAssets } from "../lib/assets.js";
import Player from "../entities/Player.js";
import AiPlayer from "../entities/AiPlayer.js";

import Platforms from "../entities/Platforms.js";
import HUD from "../entities/HUD.js";
import PlayerCollisionManager from "../lib/CollisionManager.js";
import ScoreState from "../lib/ScoreState.js";
import { gameTime } from "../lib/constants.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameVsAiScene");
  }

  preload() {
    preloadGameSceneAssets(this);
  }

  create() {
    this.timeLeft = gameTime;
    this.events.on("shutdown", this.cleanup.bind(this));

    this.cameras.main.backgroundColor.setTo(255, 255, 255);
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0x00aa00, 1);
    graphics.strokeRect(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height
    );

    this.scoreState = new ScoreState(this);
    this.hud = new HUD(this);
    this.platforms = new Platforms(this);
    this.platforms.createPlatforms();

    // Initialize two players with type 'p1' and 'p2'
    this.player1 = new Player(this, 100, 300, "blue");
    this.player2 = new AiPlayer(this, 700, 300, "green");

    this.collisionManager = new PlayerCollisionManager(this, this.scoreState);
    this.collisionManager.setupBounds();
    this.collisionManager.setupCollisions();

    this.keys = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    // Player 1 charge and jump logic
    this.keys.left.on("down", () => this.player1.startCharge("left"));
    this.keys.right.on("down", () => this.player1.startCharge("right"));
    this.keys.left.on("up", () => this.player1.jump());
    this.keys.right.on("up", () => this.player1.jump());

    this.gameTimer = setInterval(() => {
      this.timeLeft -= 1;

      if (this.timeLeft < 0) {
        clearInterval(this.gameTimer); // Stop the timer
        this.determineWinner(); // Determine the winner and transition scenes
        return;
      }

      this.events.emit("timeUpdated", this.timeLeft);
    }, 1000);

    const { width, height } = this.scale;
    this.matter.world.setBounds(0, 0, width, height);
  }

  determineWinner() {
    const { player1Score, player2Score } = this.scoreState.getScores();

    let winner;
    if (player1Score > player2Score) {
      winner = "Player 1 Wins!";
    } else if (player2Score > player1Score) {
      winner = "Player 2 Wins!";
    } else {
      winner = "It's a Tie!";
    }

    this.scene.start("EndScene", { winner, nextScene: "GameVsAiScene" }); // Pass the winner to the EndGameScene
  }

  update() {
    // Update logic for players
    this.player1.update();
    this.player2.update();
  }

  cleanup() {
    // Remove event listeners, nullify references, etc.
    this.input.keyboard.removeAllListeners();
    this.hud.removeListeners();
    console.log("cleanup");
  }
}
