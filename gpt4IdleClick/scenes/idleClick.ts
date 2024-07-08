// main.ts

import * as PIXI from "pixi.js";

// Game constants
const screenWidth = 800;
const screenHeight = 600;
const foodPerClick = 1;
const foodToCreatePerson = 10;
const foodToUpgradeFarm = 10;
const farmUpgradeMultiplier = 1.5;

class Game {
  private app: PIXI.Application;

  // food
  private food: number;
  // wood
  private wood: number;
  // people
  private people: number;

  // farmers
  private farmers: number;

  // gatherers
  private gatherers: number;

  // woodcutters
  private woodcutters: number;

  // hunters
  private hunters: number;

  // builders
  private builders: number;

  // warriors
  private warriors: number;

  // miners
  private miners: number;

  // blacksmiths
  private blacksmiths: number;

  // traders
  private traders: number;

  // explorers
  private explorers: number;

  // scientists
  private scientists: number;

  // inventors
  private inventors: number;

  // engineers
  private engineers: number;

  // merchants
  private merchants: number;
  handleCreateFarmerButton: PIXI.Sprite;
  createFarmerButton: PIXI.Sprite;

  // method idle villagers
  private idleVillagers(): number {
    return (
      this.people -
      this.farmers -
      this.gatherers -
      this.woodcutters -
      this.hunters -
      this.builders -
      this.warriors -
      this.miners -
      this.blacksmiths -
      this.traders -
      this.explorers -
      this.scientists -
      this.inventors -
      this.engineers -
      this.merchants
    );
  }

  // farms
  private farms: number;
  private farmProduction: number;
  private foodText: PIXI.Text;
  private peopleText: PIXI.Text;
  private farmsText: PIXI.Text;
  private createPersonButton: PIXI.Sprite;

  constructor() {
    this.app = new PIXI.Application({
      width: screenWidth,
      height: screenHeight,
      backgroundColor: 0x1099bb,
    });
    document.body.appendChild(this.app.view);

    this.food = 100;
    this.people = 1;
    this.farms = 1;
    this.farmProduction = 0.1;

    this.foodText = this.createText(`Food: ${this.food}`);
    this.peopleText = this.createText(`People: ${this.people}`, 40);
    this.farmsText = this.createText(`Farms: ${this.farms}`, 80);

    // create the button for creating farmer
    this.createFarmerButton = this.createButton(
      "Assign Farmer",
      160,
      this.handleAssignFarmerButtonClick.bind(this)
    );

    this.createPersonButton = this.createButton(
      "Create Person",
      120,
      this.handleCreatePersonButtonClick.bind(this)
    );

    this.app.stage.addChild(
      this.foodText,
      this.peopleText,
      this.farmsText,
      this.createPersonButton,
      this.createFarmerButton
    );

    this.app.ticker.add(this.update.bind(this));
  }

  private handleAssignFarmerButtonClick(): void {
    console.log("handleAssignFarmerButtonClick");
  }
  private handleCreatePersonButtonClick(): void {
    console.log("handleCreatePersonButtonClick");
    if (this.food >= foodToCreatePerson) {
      this.food -= foodToCreatePerson;
      this.people++;
    }
  }

  private update(delta: number): void {
    this.food += (this.farmProduction * this.people * delta) / 60;
    this.foodText.text = `Food: ${Math.floor(this.food)}`;
    this.peopleText.text = `People: ${this.people}`;
    this.farmsText.text = `Farms: ${this.farms}`;
  }

  private createText(text: string, y: number = 0): PIXI.Text {
    const newText = new PIXI.Text(text, {
      fontSize: 24,
      fill: 0xffffff,
    });
    newText.x = 10;
    newText.y = y;
    return newText;
  }

  private createButton(
    text: string,
    y: number,
    onClick: () => void
  ): PIXI.Sprite {
    const button = new PIXI.Sprite(PIXI.Texture.WHITE);
    button.width = 150;
    button.height = 40;
    button.tint = 0x333333;
    button.interactive = true;
    button.buttonMode = true;
    button.on("pointerdown", onClick);

    const buttonText = new PIXI.Text(text, {
      fontSize: 10,
      fill: 0xffffff,
    });

    button.addChild(buttonText);
    buttonText.anchor.set(0.5);
    buttonText.x = button.width / 2;
    buttonText.y = button.height / 2;

    button.x = 10;
    button.y = y;

    return button;
  }
}

// Initialize the game
new Game();
