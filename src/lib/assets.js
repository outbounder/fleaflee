// lib/assets.js
const gameSceneAssets = {
  images: [
    // { name: "shape-characters", path: "img/shape-characters.png" },
    {
      name: "tree",
      path: "img/kenney_shape-characters/PNG/Default/tile_background_tree_large.png",
    },
  ],
  sounds: [
    { name: "jump", path: "sfx/sound_of_a_jumping_frog_1.wav" },
    {
      name: "fleasHit",
      path: "sfx/sound_of_fleas_hitting_each_other_funky_1_sec_4.wav",
    },
  ],
};

export const preloadGameSceneAssets = (scene) => {
  gameSceneAssets.images.forEach((asset) => {
    scene.load.image(asset.name, asset.path);
  });

  gameSceneAssets.sounds.forEach((asset) => {
    scene.load.audio(asset.name, [asset.path]);
  });

  // Load the texture atlas
  scene.load.atlasXML({
    key: "shape-characters",
    textureURL:
      "img/kenney_shape-characters/Spritesheet/spritesheet_default.png",
    atlasURL: "img/kenney_shape-characters/Spritesheet/spritesheet_default.xml",
  });
};
