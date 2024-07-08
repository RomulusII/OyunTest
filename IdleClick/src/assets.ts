import { Assets, ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
  bundles: [
    {
      name: "bundleName",
      assets: {
        "Clampy the clamp": "./clampy.png",
        "another image": "./monster.png",
        background: "./background-long.jpg",
        mothership: "./mothership.png",
        lasergun: "./lasergun.png",
        bullet: "./bullet.png",
        button: "./button.png",
        fighter1: "./fighter1.png",
      },
    },
    {
      name: "another bundle",
      assets: {},
    },
  ],
};

// remember the assets manifest we created before? You need to import it here
async function initializeLoader(): Promise<void> {
  // This promise won't return any value, will just take time to finish.
  // Make sure you don't use Assets before this or you will get a warning and it won't work!
  await Assets.init({ manifest: manifest });

  // let's extract the bundle ids. This is a bit of js black magic
  const bundleIds = manifest.bundles.map((bundle) => bundle.name);

  // we download ALL our bundles and wait for them
  await Assets.loadBundle(bundleIds);

  // Code ends when all bundles are loaded!
}

// Remember to call it and remember it returns a promise
initializeLoader().then(() => {
  // ALL your assets are ready!
});
