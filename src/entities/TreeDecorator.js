import * as Phaser from "phaser";

export default class TreeDecorator {
  constructor(scene) {
    this.scene = scene;
  }

  decoratePlatform(platform) {
    // Assuming the platform's width is its scaled width property
    const numberOfTrees = Phaser.Math.Between(
      0,
      Math.floor(platform.displayWidth / 100)
    );

    for (let i = 0; i < numberOfTrees; i++) {
      const treeX =
        platform.x -
        platform.displayWidth / 2 +
        Phaser.Math.FloatBetween(0, platform.displayWidth);
      const treeScale = Phaser.Math.FloatBetween(0.25, 0.75);
      const tree = this.scene.add
        .image(treeX, platform.y, "tree")
        .setOrigin(0.5, 1);
      tree.setScale(treeScale);
      tree.setDepth(platform.depth - 1); // Ensure trees appear behind players
      tree.angle = platform.angle;
    }
  }
}
