import Building from "./Building";
// import { BuildingTypeEnum } from "./BuildingTypeEnum";
// import { ProductionPriority } from "./ProductionPriority";

export class CityPeople {
  foodToCreatePerson = 10;

  popGrowthRateBase = 0.001;
  rationSize = 0.005;

  people: number = 0;
  // farmers: number = 0;
  // gatherers: number = 0;
  // woodcutters: number = 0;
  // hunters: number = 0;
  // builders: number = 0;
  // warriors: number = 0;
  // stonecutters: number = 0;
  // miners: number = 0;
  // blacksmiths: number = 0;
  // traders: number = 0;
  // explorers: number = 0;
  // scientists: number = 0;
  // inventors: number = 0;
  // engineers: number = 0;
  // merchants: number = 0;

  // method idle villagers
  public IdleVillagers(): number {
    return this.people;
    // this.farmers -
    // this.gatherers -
    // this.woodcutters -
    // this.hunters -
    // this.builders -
    // this.warriors -
    // this.miners -
    // this.blacksmiths -
    // this.traders -
    // this.explorers -
    // this.scientists -
    // this.inventors -
    // this.engineers -
    // this.merchants
  }

  public GetFoodConsumption(): number {
    return this.people * this.rationSize;
  }

  public GetPopGrowthRate(): number {
    return this.popGrowthRateBase;
  }

  public GetMaxPopSupportedByFood(cityFood: number): number {
    return cityFood / this.rationSize;
  }

  // private GetMaxBuildingWorkers(building: Building, priority: number): number {
  //   var idleVillagers = this.IdleVillagers();
  //   if (idleVillagers <= 0) idleVillagers = 0;
  //   return Math.min(
  //     building.getMaxWorkers(),
  //     idleVillagers * priority,
  //     idleVillagers
  //   );
  // }

  public AssignWorkers(buildings: Building[]): void {
    buildings.forEach((building) => {
      building.AssignWorkers(this.IdleVillagers());
    });

    // this.farmers = this.GetMaxBuildingWorkers(
    //   buildings[BuildingTypeEnum.farm],
    //   priorities.productionRates.food
    // );
    // this.gatherers = this.GetMaxBuildingWorkers(
    //   buildings[BuildingTypeEnum.gathererHut],
    //   priorities.productionRates.food
    // );
    // this.woodcutters = this.GetMaxBuildingWorkers(
    //   buildings[BuildingTypeEnum.lumberjackHut],
    //   priorities.productionRates.wood
    // );
    // this.hunters = this.GetMaxBuildingWorkers(
    //   buildings[BuildingTypeEnum.hunterHut],
    //   priorities.productionRates.food
    // );
    // this.builders = 0;
    // this.warriors = this.GetMaxBuildingWorkers(
    //   buildings[BuildingTypeEnum.barracks],
    //   0
    // );
    // this.miners = this.GetMaxBuildingWorkers(
    //   buildings[BuildingTypeEnum.ironMine],
    //   priorities.productionRates.stone
    // );
    // this.blacksmiths = this.GetMaxBuildingWorkers(
    //   buildings[BuildingTypeEnum.blacksmith],
    //   priorities.productionRates.tools
    // );
    // this.traders = 0;
    // this.explorers = 0;
    // this.scientists = this.GetMaxBuildingWorkers(
    //   buildings[BuildingTypeEnum.school],
    //   0
    // );
    // this.inventors = this.GetMaxBuildingWorkers(
    //   buildings[BuildingTypeEnum.workshop],
    //   0
    // );
    // this.engineers = 0;
    // this.merchants = 0;
  }
}
