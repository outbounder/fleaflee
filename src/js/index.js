import * as me from "melonjs";

import resources from "./resources.js";
import PlayScreen from "./screens/play.js";

/**
 *
 * Initialize the application
 */
export default function onload() {
  // init the video
  if (
    !me.video.init(800, 600, {
      parent: "screen",
      scaleMethod: "flex-width",
      renderer: me.video.WEBGL,
      preferWebGL1: false,
      depthTest: "z-buffer",
      subPixel: false,
    })
  ) {
    alert("Your browser does not support HTML5 canvas.");
    return;
  }

  // initialize the "sound engine"
  me.audio.init("mp3,ogg");

  // allow cross-origin for image/texture loading
  me.loader.crossOrigin = "anonymous";

  // set all ressources to be loaded
  me.loader.preload(resources, () => {
    // set the "Play/Ingame" Screen Object
    me.state.set(me.state.PLAY, new PlayScreen());

    // set the fade transition effect
    me.state.transition("fade", "#FFFFFF", 250);

    // switch to PLAY state
    me.state.change(me.state.PLAY);
  });
}
