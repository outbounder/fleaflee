import * as Phaser from "phaser";
import PlatformEntity from "./Platform.js";

export default class Platforms {
  constructor(scene) {
    this.scene = scene;
    this.values = [];
  }

  toArray() {
    return this.values;
  }

  createPlatforms(count = 10) {
    for (let i = 0; i < count; i++) {
      const x = Phaser.Math.Between(100, this.scene.cameras.main.width - 100);
      const y = Phaser.Math.Between(100, this.scene.cameras.main.height - 100);
      const width = Phaser.Math.FloatBetween(50, 400); // Adjust width based on your game's design
      const height = Phaser.Math.FloatBetween(10, 30); // Adjust height based on your game's design
      const rotation = Phaser.Math.FloatBetween(-25, 25); // Rotation in radians

      // Create a PlatformEntity for each platform
      const platform = new PlatformEntity(
        this.scene,
        x,
        y,
        "shape-characters",
        "tile.png",
        width,
        height,
        rotation
      );
      this.values.push(platform);
    }
  }
}
