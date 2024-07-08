import { BuildingTypeEnum } from "./BuildingTypeEnum";
import ResourceBag from "./ResourceBag";

export class BuildingType {
  public buildingTypeEnum: BuildingTypeEnum;
  public name: string;
  public description: string;
  public cost: ResourceBag;
  public productionPerMin: ResourceBag;
  public productionBuf: ResourceBag;
  public workerNeeds: ResourceBag;
  public maxLevel: number;
  public unlocked: boolean;
  public maxWorkers: number;
  public icon: string;
  public buildable: boolean = true;

  public constructor(
    buildingTypeEnum: BuildingTypeEnum,
    name: string,
    description: string,
    cost: ResourceBag,
    productionPerMin: ResourceBag,
    productionBuf: ResourceBag,
    workerNeeds: ResourceBag,
    maxLevel: number,
    unlocked: boolean,
    icon: string,
    maxWorkers: number
  ) {
    this.buildingTypeEnum = buildingTypeEnum;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.productionPerMin = productionPerMin;
    this.productionBuf = productionBuf;
    this.workerNeeds = workerNeeds;
    this.maxLevel = maxLevel;
    this.unlocked = unlocked;
    this.maxWorkers = maxWorkers;
    this.icon = icon;
  }
}

export default BuildingType;
