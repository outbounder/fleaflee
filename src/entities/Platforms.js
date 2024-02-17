// entities/Platforms.js
import * as Phaser from "phaser";

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
      const width = Phaser.Math.FloatBetween(50, 200); // Adjust width based on your game's design
      const height = Phaser.Math.FloatBetween(10, 30); // Adjust height based on your game's design
      const rotation = Phaser.Math.FloatBetween(-0.25, 0.25); // Rotation in radians

      // Create a static Matter rectangle for each platform
      const platform = this.scene.matter.add.rectangle(x, y, width, height, {
        isStatic: true,
        angle: rotation,
        label: "platform",
      });
      this.values.push(platform);

      // Optionally, if you have a texture for the platform, you can create a Phaser GameObject and link it to the Matter body
      const platformSprite = this.scene.add
        .sprite(x, y, "platform")
        .setOrigin(0.5, 0.5);
      platformSprite.setScale(
        width / platformSprite.width,
        height / platformSprite.height
      ); // Scale sprite to match the body's size
      platformSprite.setRotation(rotation);
      this.scene.matter.add.gameObject(platformSprite, platform);
    }
  }
}
