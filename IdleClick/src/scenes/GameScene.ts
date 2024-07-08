import { Container, FederatedPointerEvent, Sprite, Text } from "pixi.js";
import { IScene, Manager } from "../manager";
import IdleCity from "../city/idleCity";

export class Inputs {
  public IsDownFire: boolean = false;
  // public IsDownKeyA: boolean;
  // public IsDownKeyS: boolean;
  // public IsDownKeyD: boolean;
  // public IsDownKeyW: boolean;
}

class GameLayer extends Container implements IScene {
  public posX: number = 0;
  public velocityX: number = 0;
  public posZ: number;

  constructor(posZ: number) {
    super();
    this.posZ = posZ;
  }

  update(framesPassed: number): void {
    this.posX += this.velocityX * framesPassed;
    // console.log("gamelayer posx " + this.posX + ", z" + this.posZ);
  }
}

export class GameScene extends Container implements IScene {
  public Layer1: GameLayer;
  // public Layer2: GameLayer;

  private clampy: Sprite;
  // private background: Sprite;

  //public clickCity: ClickCity = new ClickCity();
  public resourcesText: Text = new Text();
  public idleCity: IdleCity = new IdleCity();
  public bottomInfo: Text = new Text("Basic text in pixi");
  constructor() {
    super();

    this.Layer1 = new GameLayer(1);
    this.Layer1.width = 800;
    this.Layer1.height = 400;

    this.clampy = Sprite.from("Clampy the clamp");

    this.clampy.anchor.set(0.5);
    this.clampy.x = Manager.width / 2;
    this.clampy.y = Manager.height / 2;
    this.clampy.width = 50;
    this.clampy.height = 50;

    this.Layer1.addChild(this.clampy);
    this.addChild(this.Layer1);

    this.interactive = true;

    // this.resourcesText = new Text("Resources", {
    //   fill: "red",
    //   fontSize: 10,
    //   align: "center",
    //   stroke: "black",
    //   fontFamily: "Courier New",
    //   strokeThickness: 1,
    // });

    this.bottomInfo.x = 20;
    this.bottomInfo.y = 600;

    this.Layer1.addChild(this.bottomInfo);

    this.Layer1.addChild(this.resourcesText);

    this.Layer1.addChild(this.idleCity);

    this.on("mousemove", (event: FederatedPointerEvent) => {
      console.log("Sprite mousemove! " + event.global.x);
    });

    this.on("touchmove", (event: FederatedPointerEvent) => {
      console.log("Sprite touchmove! " + event.global.x);
    });

    this.on("pointerdown", (event: FederatedPointerEvent) => {
      // Do something in response to the pointer tap
      console.log("Sprite was tapped! " + event.global.x);
      //this.motherShip.Lasergun.Fire();
    });

    this.on("pointerup", () => {
      console.log("pointerup! ");
    });
  }

  private ratio: number = 0;
  public resize(): void {
    Manager.initialize;
    if (this.ratio == 0)
      this.ratio = Manager.gameScene.width / Manager.gameScene.height;

    var w = window.innerWidth;
    var h = window.innerHeight;

    console.log("resize w:" + w + " h:" + h);

    Manager._width = w;
    Manager._height = h;

    Manager.gameScene.height = h;
    Manager.gameScene.width = h * this.ratio;
    console.log(
      "gamescene ratio: " +
        this.ratio +
        " w:" +
        Manager.gameScene.width +
        " h:" +
        Manager.gameScene.height
    );
  }

  private firstUpdate: boolean = false;

  public update(framesPassed: number): void {
    //this.clickCity.update(framesPassed);
    //this.resourcesText.text = "Resources: " + this.clickCity.getResources();

    // Lets move clampy!
    if (!this.firstUpdate) {
      this.resize();
      this.firstUpdate = true;
    }

    this.Layer1.update(framesPassed);
    this.idleCity.update(framesPassed);
    // this.Layer2.update(framesPassed);
    // this.x = this.CameraX;

    //console.log("cam: " + this.CameraX + " a " + Keyboard.keyA);

    if (this.clampy.x > Manager.width) {
      this.clampy.x = Manager.width;
    }

    if (this.clampy.x < 0) {
      this.clampy.x = 0;
    }
  }
}
