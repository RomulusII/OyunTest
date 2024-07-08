import { Container, Sprite, Text, TextStyle } from "pixi.js";
import { IScene } from "../manager";
import Building from "./Building";
import Technology from "./Technology";
import ResourceBag from "./ResourceBag";
import BuildingCatalog from "./BuildingCatalog";
import { round1, round2 } from "../helper";
import BuildingType from "./BuildingType";
import { BuildingTypeEnum } from "./BuildingTypeEnum";
import { CityPeople } from "./CityPeople";
import { ProductionPriority } from "./ProductionPriority";

class IdleCity extends Container implements IScene {
  foodPerClick = 1;

  // Resources
  public resourceBag: ResourceBag;
  public productionSum: ResourceBag = ResourceBag.createBag(0);
  public productionPriority: ProductionPriority = new ProductionPriority();

  private cityPeople: CityPeople = new CityPeople();

  // Buildings
  public buildings: Building[] = [];

  // Technologies
  public technologies: Technology[] = [];

  private foodText: Text;
  private peopleText: Text;
  private buildingsText: Text;

  private createPersonButton: Sprite;
  private createBuildingButtons: Sprite[] = [];

  // constructor
  constructor() {
    super();

    this.resourceBag = ResourceBag.createBag(100, 0, 0, 0, 0);

    this.createBuildings();

    this.cityPeople.people = 1;

    this.foodText = this.createText(`Food: ${this.resourceBag.food}`, 0, 0);
    this.peopleText = this.createText(
      `People: ${this.cityPeople.people}`,
      200,
      0
    );
    this.buildingsText = this.createText(`Farms: `, 400);

    this.createPersonButton = this.createButton(
      "Create Person",
      120,
      this.handleCreatePersonButtonClick.bind(this)
    );

    BuildingCatalog.buildings.forEach((building) => {
      this.createBuildingButton(
        building.buildingTypeEnum,
        160 + building.buildingTypeEnum * 20
      );
    });

    this.buildings.forEach((building) => {
      this.increaseBuildingButton(
        building,
        160 + building.buildingType.buildingTypeEnum * 20
      );
    });

    this.addChild(
      this.foodText,
      this.peopleText,
      this.buildingsText,
      this.createPersonButton
    );

    this.createBuildingButtons.forEach((buildingButton) => {
      this.addChild(buildingButton);
    });
  }

  createBuildings() {
    // create all buildings
    BuildingCatalog.buildings.forEach((buildingType) => {
      var building = new Building(buildingType);
      this.buildings.push(building);
    });

    this.buildings[BuildingTypeEnum.wilderness].size = 100;
    this.buildings[BuildingTypeEnum.warehouse].size = 1;
  }

  private handleCreatePersonButtonClick(): void {
    console.log("handleCreatePersonButtonClick");
    if (this.resourceBag.food >= this.cityPeople.foodToCreatePerson) {
      this.resourceBag.food -= this.cityPeople.foodToCreatePerson;
      this.cityPeople.people++;
    }
  }

  private createBuildingButton(
    buildingTypeEnum: BuildingTypeEnum,
    y: number
  ): void {
    var buildingType = BuildingCatalog.buildings[buildingTypeEnum];
    this.createBuildingButtons[buildingTypeEnum] = this.createButton(
      `Create ${buildingType.name} ${buildingType.cost.ToString()}`,
      y,
      this.handleCreateBuildingButtonClick.bind(
        this,
        BuildingCatalog.buildings[buildingTypeEnum]
      )
    );
  }

  // create building button
  private handleCreateBuildingButtonClick(buildingType: BuildingType): void {
    this.createBuilding(buildingType);
  }

  // can create building
  private canCreateBuilding(buildingType: BuildingType): boolean {
    return this.resourceBag.IsEnough(buildingType.cost);
  }

  private increaseBuildingButton(building: Building, y: number): void {
    this.createBuildingButtons[building.buildingType.buildingTypeEnum] =
      this.createButton(
        `Increase ${
          building.buildingType.name
        } ${building.buildingType.cost.ToString()}`,
        y,
        this.handleIncreaseBuildingButtonClick.bind(this, building)
      );
  }

  private handleIncreaseBuildingButtonClick(building: Building): void {
    this.increaseSize(building);
  }

  private increaseSize(building: Building) {
    console.log("increaseSize", building.buildingType.name);
    building.increaseSize(this.resourceBag);
  }

  private createBuilding(buildingType: BuildingType) {
    console.log("createBuilding", buildingType.name);
    if (this.canCreateBuilding(buildingType)) {
      this.resourceBag.Subtract(buildingType.cost);
      this.buildings.push(new Building(buildingType));
    }
  }

  private createText(text: string, x: number, y: number = 0): Text {
    const style = new TextStyle({ fontSize: 14 });
    const newText = new Text(text, style);
    newText.x = x;
    newText.y = y;
    return newText;
  }

  private createButton(
    text: string,
    y: number,
    onClick: (buildingType: BuildingTypeEnum) => void
  ): Sprite {
    const button = new Sprite();
    button.tint = 0x333333;
    button.interactive = true;
    button.on("pointerdown", onClick.bind(this, BuildingTypeEnum.farm));

    const buttonText = new Text(text, {
      fontSize: 10,
      fill: 0xffffff,
    });

    button.addChild(buttonText);

    button.x = 10;
    button.y = y;

    // create borders of button
    const border = new Sprite();
    border.width = 50;
    border.height = 20;
    border.tint = 0x000000;
    border.x = 1;
    border.y = 1;
    button.addChild(border);

    return button;
  }

  private capWarehouse() {
    var cap = 0;

    this.buildings.forEach((building) => {
      if (building.buildingType.buildingTypeEnum == BuildingTypeEnum.warehouse)
        cap += building.getWarehouseCapacity();
    });

    this.resourceBag.food = Math.min(this.resourceBag.food, cap);
    this.resourceBag.wood = Math.min(this.resourceBag.wood, cap);
    this.resourceBag.stone = Math.min(this.resourceBag.stone, cap);
    this.resourceBag.iron = Math.min(this.resourceBag.iron, cap);
    this.resourceBag.gold = Math.min(this.resourceBag.gold, cap);
    this.resourceBag.tools = Math.min(this.resourceBag.tools, cap);
  }

  public GetActiveWorkers(): number {
    var activeWorkers: number = 0;
    this.buildings.forEach((building) => {
      activeWorkers += building.activeWorkers;
    });
    return activeWorkers;
  }

  public GetIdleVillagers(): number {
    return this.cityPeople.people - this.GetActiveWorkers();
  }

  public AssignWorkers(): void {
    this.buildings.forEach((building) => {
      building.AssignWorkers(this.GetIdleVillagers());
    });
  }

  public update(framesPassed: number): void {
    this.AssignWorkers();
    this.UpdateProductionSum();

    this.resourceBag.Add(this.productionSum, framesPassed);

    this.resourceBag.food -=
      this.cityPeople.GetFoodConsumption() * framesPassed;

    this.cityPeople.people += this.getPopGrowth() * framesPassed;

    this.capWarehouse();
    this.foodText.text = this.ResToString(this.productionSum);

    this.peopleText.text = `People: ${Math.trunc(
      this.cityPeople.people
    )} Idle: ${Math.trunc(this.cityPeople.IdleVillagers())}`;

    this.buildingsText.text = this.getBuildingsInfo();
  }

  public ResToString = (curProduction: ResourceBag): string => {
    // resources rounded to no decimal places
    return `Food: ${Math.round(this.resourceBag.food)} (+${round2(
      curProduction.food * 60
    )} - ${round1(this.cityPeople.GetFoodConsumption() * 60)}) 
Wood: ${Math.round(this.resourceBag.wood)} (+${round2(
      curProduction.wood * 60
    )}) 
Stone: ${Math.round(this.resourceBag.stone)} (+${round2(
      curProduction.stone * 60
    )}) 
Iron: ${Math.round(this.resourceBag.iron)} (+${round2(
      curProduction.iron * 60
    )}) 
Gold: ${Math.round(this.resourceBag.gold)} (+${round2(curProduction.gold * 60)})
Tools: ${Math.round(this.resourceBag.tools)} (+${round2(
      curProduction.tools * 60
    )})`;
  };

  private UpdateProductionSum(): void {
    this.productionSum = ResourceBag.createBag(0);
    this.buildings.forEach((building) => {
      var production = this.getBuildingProduction(building);
      this.productionSum.Add(production);
    });
  }

  private getBuildingProduction(building: Building): ResourceBag {
    var rslt = building.getProduction();
    return rslt;
  }

  private getBuildingsInfo(): string {
    var result = "";
    this.buildings.forEach((building) => {
      result += building.getInfo() + "\n";
    });
    return result;
  }

  private getMaxPopSupported(): number {
    var foodSupport = this.cityPeople.GetMaxPopSupportedByFood(
      this.productionSum.food
    );
    var housingSupport = 100;
    this.buildings.forEach((building) => {
      housingSupport += building.getHousing();
    });

    return Math.min(foodSupport, housingSupport);
  }

  private getPopGrowth(): number {
    var popGrowthRate = this.cityPeople.GetPopGrowthRate();
    var poplimit = this.getMaxPopSupported();
    var maxGrow = poplimit - this.cityPeople.people;
    var popGrowth = maxGrow * popGrowthRate;
    return popGrowth;
  }
}

export default IdleCity;
