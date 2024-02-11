// GroundEntity.js
import * as me from "melonjs";

class GroundEntity extends me.Entity {
  constructor(x, y, width, height) {
    // The settings object defines the size and the type of the entity
    const settings = {
      width: width,
      height: height,
      type: me.collision.types.WORLD_SHAPE,
    };

    // Call the parent constructor
    super(x, y, settings);

    // Make it a solid object but not affected by gravity
    this.body.collisionType = me.collision.types.WORLD_SHAPE;

    this.body.setStatic(true);
    this.body.addShape(new me.Rect(0, 0, this.width, this.height));
  }
  draw(renderer) {
    // Save the current renderer state
    renderer.save();

    // Set the fill color for the entity
    renderer.setColor("#00FF00");

    // Draw a filled rectangle with the entity's dimensions and color
    renderer.fillRect(0, 0, this.width, this.height);

    // Restore the renderer state to what it was before
    renderer.restore();
  }
}
export default GroundEntity;
