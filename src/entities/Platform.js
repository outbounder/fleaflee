import * as Phaser from "phaser";

export default class PlatformEntity extends Phaser.Physics.Matter.Image {
  constructor(scene, x, y, texture, frame, width, height, angle = 0) {
    super(scene.matter.world, x, y, texture, frame);

    // Add the sprite to the scene
    scene.add.existing(this);

    // Set the label
    this.body.label = "platform";

    // Resize the sprite and update its physics body
    this.resizePlatform(width, height);

    // Make the object static
    this.setStatic(true);

    // Set the angle of the platform, now including the rotation of the physics body
    this.setPlatformAngle(angle);
  }

  resizePlatform(width, height) {
    // Resize the sprite
    this.setDisplaySize(width, height);

    // Remove the existing physics body
    this.scene.matter.world.remove(this.body);

    // Create a new physics body with the new size
    const newBody = Phaser.Physics.Matter.Matter.Bodies.rectangle(
      this.x,
      this.y,
      width,
      height
    );
    newBody.label = "platform";

    // Set the new body to the sprite
    this.setExistingBody(newBody);
    this.setStatic(true); // Ensure the new body is also static
  }

  setPlatformAngle(angle) {
    this.setAngle(angle);

    // Apply the rotation to the physics body as well
    Phaser.Physics.Matter.Matter.Body.setAngle(
      this.body,
      Phaser.Math.DegToRad(angle)
    );
  }
}
