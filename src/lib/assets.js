// lib/assets.js
const gameSceneAssets = {
  images: [
    { name: "flea-jp1", path: "img/flea-jp1.png" },
    { name: "flea-jp2", path: "img/flea-jp2.png" },
    { name: "flea0p1", path: "img/flea0p1.png" },
    { name: "flea0p2", path: "img/flea0p2.png" },
    { name: "flea1p1", path: "img/flea1p1.png" },
    { name: "flea1p2", path: "img/flea1p2.png" },
    { name: "flea2p1", path: "img/flea2p1.png" },
    { name: "flea2p2", path: "img/flea2p2.png" },
    { name: "platform", path: "img/platform.png" },
  ],
};

export const preloadGameSceneAssets = (scene) => {
  gameSceneAssets.images.forEach((asset) => {
    scene.load.image(asset.name, asset.path);
  });
};
