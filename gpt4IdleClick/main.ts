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
  private food: number;
  private people: number;
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

    this.food = 0;
    this.people = 0;
    this.farms = 1;
    this.farmProduction = 1;

    this.foodText = this.createText(`Food: ${this.food}`);
    this.peopleText = this.createText(`People: ${this.people}`, 40);
    this.farmsText = this.createText(`Farms: ${this.farms}`, 80);

    this.createPersonButton = this.createButton(
      "Create Person",
      120,
      this.handleCreatePersonButtonClick.bind(this)
    );

    this.app.stage.addChild(
      this.foodText,
      this.peopleText,
      this.farmsText,
      this.createPersonButton
    );

    this.app.ticker.add(this.update.bind(this));
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

  private onClickFarm() {
    console.log("onClickFarm");
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
      fontSize: 18,
      fill: 0xffffff,
    });
    buttonText.anchor.set(0.5);
    buttonText.x = button.width / 2;
    buttonText.y = button.height / 2;
    button.addChild(buttonText);

    button.x = 10;
    button.y = y;

    return button;
  }
}

// Initialize the game
new Game();
