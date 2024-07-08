import ResourceBag from "./ResourceBag";
import { BuildingType } from "./BuildingType";
import { BuildingTypeEnum } from "./BuildingTypeEnum";

class BuildingCatalog {
  public static farm: BuildingType = new BuildingType(
    BuildingTypeEnum.farm,
    "Farm",
    "Produces food",
    ResourceBag.createBag(100, 0),
    ResourceBag.createBag(2),
    ResourceBag.ZeroResource,
    ResourceBag.createBag(1),
    3,
    false,
    "farm",
    100
  );

  public static wilderness = new BuildingType(
    BuildingTypeEnum.wilderness,
    "Wilderness",
    "Hunting animals and gathering food, wood, stone and a little iron",
    ResourceBag.createBag(0),
    ResourceBag.createBag(1.0, 0.0, 0.0, 0.0),
    ResourceBag.ZeroResource,
    ResourceBag.createBag(1),
    1,
    true,
    "wilderness",
    10000
  );

  public static lumberjackHut = new BuildingType(
    BuildingTypeEnum.lumberjackHut,
    "Lumberjack Hut",
    "Produces wood",
    ResourceBag.createBag(200),
    ResourceBag.createBag(0, 1),
    ResourceBag.createBag(1),
    ResourceBag.ZeroResource,
    3,
    false,
    "lumberjackHut",
    100
  );

  public static quarry = new BuildingType(
    BuildingTypeEnum.quarry,
    "Quarry",
    "Produces stone",
    ResourceBag.createBag(500, 500),
    ResourceBag.createBag(0, 0, 1),
    ResourceBag.ZeroResource,
    ResourceBag.createBag(1),
    3,
    false,
    "quarry",
    100
  );

  public static ironMine = new BuildingType(
    BuildingTypeEnum.ironMine,
    "Iron Mine",
    "Produces iron",
    ResourceBag.createBag(500, 500, 200),
    ResourceBag.createBag(0, 0, 0, 1),
    ResourceBag.createBag(1),
    ResourceBag.ZeroResource,
    3,
    false,
    "ironMine",
    100
  );

  public static hunterHut = new BuildingType(
    BuildingTypeEnum.hunterHut,
    "Hunter Hut",
    "Produces food",
    ResourceBag.createBag(0, 100),
    ResourceBag.createBag(1),
    ResourceBag.ZeroResource,
    ResourceBag.createBag(1),
    3,
    false,
    "hunterHut",
    100
  );

  public static gathererHut = new BuildingType(
    BuildingTypeEnum.gathererHut,
    "Gatherer Hut",
    "Produces food, wood, stone and a little iron",
    ResourceBag.createBag(0, 100),
    ResourceBag.createBag(0.4, 0.4, 0.2, 0.02),
    ResourceBag.createBag(0),
    ResourceBag.createBag(1),
    3,
    false,
    "gathererHut",
    100
  );

  public static blacksmith = new BuildingType(
    BuildingTypeEnum.blacksmith,
    "Blacksmith",
    "Produces tools which improve production",
    ResourceBag.createBag(0, 1000, 500, 500),
    ResourceBag.createBag(0, 0, 0, 0, 0, 1),
    ResourceBag.ZeroResource,
    ResourceBag.createBag(1, 2, 4, 0, 0),
    3,
    false,
    "blacksmith",
    10
  );

  public static warehouse = new BuildingType(
    BuildingTypeEnum.warehouse,
    "Warehouse",
    "Increases storage capacity",
    ResourceBag.createBag(0, 100),
    ResourceBag.ZeroResource,
    ResourceBag.ZeroResource,
    ResourceBag.ZeroResource,
    3,
    false,
    "warehouse",
    0
  );

  public static house = new BuildingType(
    BuildingTypeEnum.house,
    "House",
    "Increases population",
    ResourceBag.createBag(0, 100),
    ResourceBag.ZeroResource,
    ResourceBag.ZeroResource,
    ResourceBag.createBag(1, 0.2, 0.1, 0, 0),
    3,
    false,
    "house",
    10
  );

  public static school = new BuildingType(
    BuildingTypeEnum.school,
    "School",
    "Increases productivity",
    ResourceBag.createBag(0, 1000, 100),
    ResourceBag.ZeroResource,
    ResourceBag.createBag(0.1, 0.1, 0.1, 0.1, 0.1, 0.1),
    ResourceBag.createBag(1),
    3,
    false,
    "school",
    10
  );

  public static barracks = new BuildingType(
    BuildingTypeEnum.barracks,
    "Barracks",
    "Trains soldiers",
    ResourceBag.createBag(0, 1000, 500, 500),
    ResourceBag.ZeroResource,
    ResourceBag.ZeroResource,
    ResourceBag.createBag(1),
    3,
    false,
    "barracks",
    100
  );

  public static workshop = new BuildingType(
    BuildingTypeEnum.workshop,
    "Workshop",
    "do nothing yet",
    ResourceBag.createBag(1000, 1000, 500, 500),
    ResourceBag.ZeroResource,
    ResourceBag.ZeroResource,
    ResourceBag.createBag(1),
    3,
    false,
    "workshop",
    10
  );

  public static buildings: BuildingType[] = [
    BuildingCatalog.wilderness,
    BuildingCatalog.house,
    BuildingCatalog.gathererHut,
    BuildingCatalog.hunterHut,
    BuildingCatalog.farm,
    BuildingCatalog.lumberjackHut,
    BuildingCatalog.ironMine,
    BuildingCatalog.quarry,
    BuildingCatalog.blacksmith,
    BuildingCatalog.school,
    BuildingCatalog.barracks,
    BuildingCatalog.warehouse,
    BuildingCatalog.workshop,
  ];

  constructor() {
    BuildingCatalog.wilderness.buildable = false;
  }
}

export default BuildingCatalog;
