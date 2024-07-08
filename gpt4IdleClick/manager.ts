import { Sound } from "@pixi/sound";
import { Application, DisplayObject } from "pixi.js";
import { GameScene } from "./scenes/GameScene";

export class Keyboard {
  public static keyAlt: boolean = false;
  public static keyCtrl: boolean = false;
  public static keyA: boolean = false;
  public static keyD: boolean = false;

  public static downListener(p: KeyboardEvent): void {
    if (p.altKey) this.keyAlt = true;
    if (p.ctrlKey) this.keyCtrl = true;

    if (p.code == "KeyA") this.keyA = true;
    if (p.code == "KeyD") this.keyD = true;

    // console.log("down: " + p.key);
  }
  public static upListener(p: KeyboardEvent): void {
    if (p.altKey) this.keyAlt = false;
    if (p.ctrlKey) this.keyCtrl = false;
    if (p.code == "KeyA") this.keyA = false;
    if (p.code == "KeyD") this.keyD = false;
    // console.log("up" + p.key + " a: " + this.keyA);
  }
}

export class Sounds {
  public LaserFire: Sound;

  constructor() {
    this.LaserFire = Sound.from(
      "./sound/mixkit-sci-fi-plasma-gun-power-up-1679.wav"
    );
  }
}

export class Manager {
  public static sounds: Sounds;
  private constructor() {
    /*this class is purely static. No constructor to see here*/
  }

  // Safely store variables for our game
  public static App: Application;
  private static currentScene: IScene;

  public static gameScene: GameScene;

  // Width and Height are read-only after creation (for now)
  public static _width: number;
  public static _height: number;

  // With getters but not setters, these variables become read-only
  public static get width(): number {
    return Manager._width;
  }
  public static get height(): number {
    return Manager._height;
  }

  // Use this function ONCE to start the entire machinery
  public static initialize(
    width: number,
    height: number,
    background: number
  ): void {
    Manager.sounds = new Sounds();

    // store our width and height
    Manager._width = width;
    Manager._height = height;

    // Create our pixi app
    Manager.App = new Application({
      view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: background,
      width: width,
      height: height,
    });

    // Add the ticker
    Manager.App.ticker.add(Manager.update);
  }

  // Call this function when you want to go to a new scene
  public static changeScene(newScene: IScene): void {
    // Remove and destroy old scene... if we had one..
    if (Manager.currentScene) {
      Manager.App.stage.removeChild(Manager.currentScene);
      Manager.currentScene.destroy();
    }

    // Add the new one
    Manager.currentScene = newScene;
    Manager.App.stage.addChild(Manager.currentScene);
  }

  // This update will be called by a pixi ticker and tell the scene that a tick happened
  private static update(framesPassed: number): void {
    // Let the current scene know that we updated it...
    // Just for funzies, sanity check that it exists first.
    if (Manager.currentScene) {
      Manager.currentScene.update(framesPassed);
    }

    // as I said before, I HATE the "frame passed" approach. I would rather use `Manager.app.ticker.deltaMS`
  }
}

// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
// Also, this could be in its own file...
export interface IScene extends DisplayObject {
  update(framesPassed: number): void;
}
