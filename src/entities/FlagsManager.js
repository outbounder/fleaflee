import * as Phaser from "phaser";
import FlagEntity from "./Flag.js";

export default class FlagsManager {
  constructor(scene) {
    this.scene = scene;
    this.values = [];
  }

  toArray() {
    return this.values;
  }

  createFlags(count = 10) {
    for (let i = 0; i < count; i++) {
      const x = Phaser.Math.Between(100, this.scene.cameras.main.width - 100);
      const y = Phaser.Math.Between(100, this.scene.cameras.main.height - 100);

      // Create a FlagEntity for each flag
      const flag = new FlagEntity(
        this.scene,
        x,
        y,
        "shape-characters",
        "tile_coin.png"
      );
      this.values.push(flag);
    }
  }

  removeFlag(flag) {
    const index = this.values.indexOf(flag);
    if (index > -1) {
      this.values.splice(index, 1);
      flag.destroy();
    }
  }
}
