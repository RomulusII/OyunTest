import BuildingCatalog from "./BuildingCatalog";
import BuildingType from "./BuildingType";
import ResourceBag from "./ResourceBag";

class Building {
  public buildingType!: BuildingType;
  public level: number = 0;
  public size: number = 0;
  public utilization: number = 1;
  public priority: number = 1;
  public speed: number = 1 / 60;
  public activeWorkers: number = 0;
  public workPriority: number = 1;

  constructor(buildingType: BuildingType) {
    this.buildingType = buildingType;
    if (this.buildingType == null) {
      throw new Error("BuildingType is null");
    }
  }

  public AssignWorkers(idleVillagers: number): number {
    if (idleVillagers <= 0) idleVillagers = 0;
    this.activeWorkers = Math.min(
      this.getMaxWorkers(),
      idleVillagers * this.workPriority,
      idleVillagers
    );

    return this.activeWorkers;
  }

  public toString(): string {
    return this.buildingType.name;
  }

  public getInfo(): string {
    return `${this.buildingType.name} S:${this.size} L:${this.level} U:${this.utilization}`;
  }

  /// <summary>
  /// Returns the cost of the building at the current level
  /// </summary>
  public runningCost(workers: number): ResourceBag {
    var cost = ResourceBag.createBag(0);
    cost.food = this.buildingType.workerNeeds.food * workers * this.utilization;
    cost.wood = this.buildingType.workerNeeds.wood * workers * this.utilization;
    cost.stone =
      this.buildingType.workerNeeds.stone * workers * this.utilization;
    cost.iron = this.buildingType.workerNeeds.iron * workers * this.utilization;
    cost.gold = this.buildingType.workerNeeds.gold * workers * this.utilization;
    return cost;
  }

  /// <summary>
  /// Calculates the production output of the building based on the number of workers,
  /// building size, and utilization rate.
  /// </summary>
  /// <param name="workers">The number of workers assigned to the building.</param>
  public getProduction(): ResourceBag {
    //var actualWorkers = Math.trunc(      Math.min(workers, this.buildingType.maxWorkers * this.size)    );

    var production = ResourceBag.createBag(0);
    production.food =
      this.buildingType.productionPerMin.food *
      this.utilization *
      this.activeWorkers *
      this.speed;
    production.wood =
      this.buildingType.productionPerMin.wood *
      this.utilization *
      this.activeWorkers *
      this.speed;
    production.stone =
      this.buildingType.productionPerMin.stone *
      this.utilization *
      this.activeWorkers *
      this.speed;
    production.iron =
      this.buildingType.productionPerMin.iron *
      this.utilization *
      this.activeWorkers *
      this.speed;
    production.gold =
      this.buildingType.productionPerMin.gold *
      this.utilization *
      this.activeWorkers *
      this.speed;
    production.tools =
      this.buildingType.productionPerMin.tools *
      this.utilization *
      this.activeWorkers *
      this.speed;

    return production;
  }

  /// <summary>
  /// Returns the housing capacity of the building
  /// </summary>
  public getHousing(): number {
    if (this.buildingType == BuildingCatalog.house) {
      return this.level ^ (2 * 10 * this.size);
    }
    return 0;
  }

  public getWarehouseCapacity(): number {
    if (this.buildingType == BuildingCatalog.warehouse) {
      return (2 ^ this.level) * 100 * this.size;
    }
    return 0;
  }

  public canIncreaseSize(cityResouce: ResourceBag): boolean {
    return cityResouce.IsEnough(this.buildingType.cost);
  }

  public increaseSize(cityResouce: ResourceBag) {
    console.log("increaseSize", this.buildingType.name);
    if (this.canIncreaseSize(cityResouce)) {
      cityResouce.Subtract(this.buildingType.cost);
      this.size += 1;
    }
  }

  getMaxWorkers() {
    return this.buildingType.maxWorkers * this.size;
  }
}

export default Building;
