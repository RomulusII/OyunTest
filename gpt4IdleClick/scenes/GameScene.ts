import { Container, FederatedPointerEvent, IPointData, Sprite } from "pixi.js";
import { IScene, Keyboard, Manager } from "../Manager";

class GameObject {
  public sprite: Sprite;

  constructor(spriteName: string, x: number, y: number, angle: number) {
    this.sprite = Sprite.from(spriteName);
    this.sprite.x = x;
    this.sprite.angle = angle;
    this.sprite.y = y;
  }
}

class MovingObject extends GameObject {
  public velocity: number;
  public direction: number;
  public range: number;

  public startx: number;
  public starty: number;
  constructor(
    spriteName: string,
    x: number,
    y: number,
    angle: number,
    velocity: number,
    direction: number,
    range: number
  ) {
    super(spriteName, x, y, angle);
    this.velocity = velocity;
    this.direction = direction;
    this.startx = x;
    this.starty = y;
    this.range = range;
  }

  public Move(framesPassed: number): boolean {
    this.sprite.x +=
      this.velocity * framesPassed * Math.cos(this.sprite.rotation);
    this.sprite.y +=
      this.velocity * framesPassed * Math.sin(this.sprite.rotation);

    let distance = Math.sqrt(
      Math.pow(this.sprite.x - this.startx, 2) +
        Math.pow(this.sprite.y - this.starty, 2)
    );

    // console.log(
    //   // "barrel: x:" +
    //   //   this.sprite.x +
    //   //   " y:" +
    //   // this.sprite.y +
    //   //   "\nangle: " +
    //   //   this.sprite.angle +
    //   //   "\nrot: " +
    //   //   this.sprite.rotation +
    //   //   "\nsin: " +
    //   //   Math.sin(this.sprite.rotation) +
    //   //   "\ncos:" +
    //   //   Math.cos(this.sprite.rotation) +
    //   "\n(" +
    //     this.sprite.x +
    //     ", " +
    //     this.sprite.y +
    //     ")\n(" +
    //     this.startx +
    //     ", " +
    //     this.starty +
    //     ") \ndistance: " +
    //     distance
    // );

    return distance < this.range;
  }
}

class Bullet extends MovingObject {
  constructor(gun: Gun) {
    let pos = gun.GetBarrelPos();
    let angle =
      gun.sprite.angle + Math.random() * gun.accuracy - gun.accuracy / 2;
    super("bullet", pos.x, pos.y, angle, gun.bulletVelocity, angle, gun.range);

    this.sprite.anchor.set(0.3, 0.5);
  }

  public static Fire(gun: Gun) {
    const newBullet = new Bullet(gun);
    newBullet.sprite.width = gun.bulletVelocity * 3;
    newBullet.sprite.height = newBullet.sprite.height / 2;
    Manager.gameScene.bullets.push(newBullet);
    Manager.gameScene.Layer1.addChild(newBullet.sprite);
    //console.log(Manager.sounds.LaserFire);
    Manager.sounds.LaserFire.volume = 200 / (Manager.gameScene.CameraX - 100);
    Manager.sounds.LaserFire.play();
    // console.log(
    //   "fire x: " +
    //     newBullet.sprite.x +
    //     ", y: " +
    //     newBullet.sprite.y +
    //     " L:" +
    //     Manager.gameScene.bullets.length +
    //     " g " +
    //     gun.sprite.x
    // );
  }
}

// class Coordinate {
//   public x: number;
//   public y: number;
//   constructor(x: number, y: number) {
//     this.x = x;
//     this.y = y;
//   }
// }

class Gun {
  public sprite: Sprite;
  public bulletVelocity: number = 100;
  public lastFiredDate: number = 0;
  public fireRate: number = 300;
  public accuracy: number = 0;
  public range: number = 50000;
  constructor() {
    this.sprite = Sprite.from("lasergun");
    this.sprite.width = this.sprite.width / 8;
    this.sprite.height = this.sprite.height / 8;
    this.sprite.anchor.set(0.15, 0.57);
  }

  public Fire(): void {
    Bullet.Fire(this);
    this.lastFiredDate = Date.now();
  }

  public CanFire(): boolean {
    //console.log("n: " + Date.now() + " l: " + this.lastFiredDate);
    return Date.now() - this.lastFiredDate > this.fireRate;
  }

  public GetBarrelPos(): IPointData {
    let xx = this.sprite.x + this.sprite.width * Math.cos(this.sprite.rotation);
    let yy = this.sprite.y + this.sprite.width * Math.sin(this.sprite.rotation);
    //console.log("Barrel x: " + xx + ", y: " + yy);
    var pos: IPointData = { x: xx, y: yy };
    // var gPos = this.sprite.toGlobal(pos);
    // console.log("Barrel x: " + xx + ", y: " + yy);
    // console.log("Barrel-global x: " + gPos.x + ", y: " + gPos.y);

    return pos;
  }

  public aimGun(x: number, y: number) {
    if (this.sprite.parent == null) return;
    var pos: IPointData = { x: this.sprite.x, y: this.sprite.y };
    var gPos = this.sprite.parent.toGlobal(pos);

    const dx = x - gPos.x;
    const dy = y - gPos.y;

    console.log(
      "target x: " + x + "y:" + y + "\ngun x:" + gPos.x + " y:" + gPos.y
    );
    // console.log("mouse x: " + x + ", y: " + y);
    // console.log("pos x: " + pos.x + ", y: " + pos.y);
    // console.log("gPos x: " + gPos.x + ", y: " + gPos.y);

    this.sprite.rotation = Math.atan2(dy, dx);
  }
}

class Ship extends MovingObject {
  public mainGun: Gun;
  public target: Container | null = null;
  constructor() {
    super("fighter1", 2000, 300, 180, 0, 90, 200);
    this.mainGun = new Gun();
    this.mainGun.fireRate = 2000;
    this.sprite.addChild(this.mainGun.sprite);
  }

  public selectTarget() {
    this.target = Manager.gameScene.motherShip;

    this.mainGun.aimGun(this.target.x, this.target.y);
  }

  public update() {
    //console.log("ship update");

    this.selectTarget();
    if (this.mainGun.CanFire()) this.mainGun.Fire();
  }
}

class Mothership extends Container {
  private sprite: Sprite;
  public Lasergun: Gun;
  constructor() {
    super();
    this.sprite = Sprite.from("mothership");
    this.Lasergun = new Gun(); // Sprite.from("lasergun");
    console.log("mothership lasergun " + Manager.gameScene);
    this.addChild(this.sprite);

    //Manager.gameScene.addChild(this.Lasergun.sprite)
    //this.addChild(this.Lasergun.sprite);
    this.sprite.anchor.set(0.5, 0.5);

    this.width = this.width / 8;
    this.height = this.height / 8;
    this.x = 400;
    this.y = 200;

    this.Lasergun.sprite.x = this.x + 0;
    this.Lasergun.sprite.y = this.y - 30;
  }
}

class Inputs {
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
    this.x = this.posX + Manager.gameScene.CameraX / this.posZ;
    // console.log("gamelayer posx " + this.posX + ", z" + this.posZ);
  }
}

export class GameScene extends Container implements IScene {
  public Layer1: GameLayer;
  public Layer2: GameLayer;

  private clampy: Sprite;
  private background: Sprite;
  private clampyVelocity: number;
  public motherShip: Mothership;
  public Inputs: Inputs = new Inputs();
  public CameraX: number = 0;

  public enemyShip: Ship;
  // private cameraDeltaX: number;

  public bullets: Bullet[] = [];

  constructor() {
    super();
    this.CameraX = 0;
    //this.x = this.CameraX;

    this.Layer2 = new GameLayer(10);
    this.Layer1 = new GameLayer(1);

    this.addChild(this.Layer2);
    this.addChild(this.Layer1);

    this.motherShip = new Mothership();

    this.clampy = Sprite.from("Clampy the clamp");
    this.background = Sprite.from("background");

    this.clampy.anchor.set(0.5);
    this.clampy.x = Manager.width / 2;
    this.clampy.y = Manager.height / 2;
    this.clampy.width = 50;
    this.clampy.height = 50;

    this.Layer1.addChild(this.motherShip);
    this.Layer1.addChild(this.motherShip.Lasergun.sprite);
    this.Layer1.addChild(this.clampy);
    this.enemyShip = new Ship();

    this.Layer1.addChild(this.enemyShip.sprite);

    this.Layer2.addChild(this.background);

    this.clampyVelocity = 2;
    this.interactive = true;

    this.on("mousemove", (event: FederatedPointerEvent) => {
      this.motherShip.Lasergun.aimGun(event.x, event.y);
    });

    this.on("touchmove", (event: FederatedPointerEvent) => {
      this.motherShip.Lasergun.aimGun(event.x, event.y);
    });

    this.on("pointerdown", (event: FederatedPointerEvent) => {
      // Do something in response to the pointer tap
      //console.log("Sprite was tapped! " + event.data.global.x);
      //this.motherShip.Lasergun.Fire();
      this.motherShip.Lasergun.aimGun(event.x, event.y);
      this.Inputs.IsDownFire = true;
    });

    this.on("pointerup", () => {
      this.Inputs.IsDownFire = false;
    });

    //this.resize();
  }

  private cameraVelocity: number = 0;
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
    // Manager._height = h;
    // Manager._width = h * ratio;
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
    // Lets move clampy!
    if (!this.firstUpdate) {
      this.resize();
      this.firstUpdate = true;
    }
    this.clampy.x += this.clampyVelocity * framesPassed;

    this.background.x -= 0.05;

    if (Keyboard.keyA) this.cameraVelocity += 1;
    if (Keyboard.keyD) this.cameraVelocity -= 1;

    if (!Keyboard.keyA && !Keyboard.keyD)
      this.cameraVelocity = this.cameraVelocity / 1.2;
    if (Math.abs(this.cameraVelocity) > 100)
      this.cameraVelocity = 100 * Math.sign(this.cameraVelocity);
    if (Math.abs(this.cameraVelocity) < 1) this.cameraVelocity = 0;

    this.CameraX += this.cameraVelocity;

    if (this.CameraX > 0) {
      this.CameraX = 0;
      this.cameraVelocity = 0;
    }

    this.Layer1.update(framesPassed);
    this.Layer2.update(framesPassed);
    // this.x = this.CameraX;

    //console.log("cam: " + this.CameraX + " a " + Keyboard.keyA);

    if (this.clampy.x > Manager.width) {
      this.clampy.x = Manager.width;
      this.clampyVelocity = -this.clampyVelocity;
    }

    if (this.clampy.x < 0) {
      this.clampy.x = 0;
      this.clampyVelocity = -this.clampyVelocity;
    }

    let deadBullets = [];

    for (let i: number = 0; i < this.bullets.length; i++) {
      let bullet = this.bullets[i];
      //console.log("update " + i + " bullets.len" + this.bullets.length);
      if (!bullet.Move(framesPassed)) {
        deadBullets.push(i);
      }
    }

    for (let i: number = deadBullets.length - 1; i >= 0; i--) {
      {
        let bullet = this.bullets[deadBullets[i]];

        // console.log(
        //   "remove" +
        //     deadBullets.length +
        //     " i:" +
        //     i +
        //     " deadBullets[i]" +
        //     deadBullets[i] +
        //     "bullet " +
        //     bullet +
        //     " bullets:" +
        //     this.bullets
        // );
        bullet.sprite.parent.removeChild(bullet.sprite);

        this.bullets.splice(deadBullets[i], 1);
      }
    }

    if (this.Inputs.IsDownFire && this.motherShip.Lasergun.CanFire())
      this.motherShip.Lasergun.Fire();

    if (this.enemyShip != null) this.enemyShip.update();
  }
}
