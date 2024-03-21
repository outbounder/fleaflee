import * as Phaser from "phaser";

export default class FlagEntity extends Phaser.Physics.Matter.Image {
  constructor(
    scene,
    x,
    y,
    texture = "shape-characters",
    frame = "tile_coin.png"
  ) {
    super(scene.matter.world, x, y, texture, frame);

    // Add the sprite to the scene
    scene.add.existing(this);

    // Set the label
    this.body.label = "flag";
    this.setScale(0.75);

    // Make the object dynamic so it can fall
    this.setStatic(false);
  }
}
