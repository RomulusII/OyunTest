import ResourceBag from "./ResourceBag";
import Technology from "./Technology";

class Techtree {
  public static technologies: Technology[];
  public hunting: Technology;
  public gathering: Technology;
  public agriculture: Technology;
  public mining: Technology;
  public woodcutting: Technology;

  constructor() {
    this.hunting = new Technology(
      "Hunting",
      "Unlocks the Hunter",
      ResourceBag.createBag(0),
      true,
      "hunter.png",
      ResourceBag.createBag(1, 0, 0, 0, 0),
      ResourceBag.createBag(1, 1, 1, 1, 1),
      []
    );

    this.gathering = new Technology(
      "Gathering",
      "Unlocks the Gatherer",
      ResourceBag.createBag(0),
      true,
      "gatherer.png",
      ResourceBag.createBag(0.3, 0.2, 0.1, 0.02, 0),
      ResourceBag.createBag(1, 1, 1, 1, 1),
      []
    );

    this.agriculture = new Technology(
      "Agriculture",
      "Unlocks the Farmer",
      ResourceBag.createBag(500),
      false,
      "farmer.png",
      ResourceBag.createBag(1, 0, 0, 0, 0),
      ResourceBag.createBag(1, 1, 1, 1, 1),
      []
    );

    this.mining = new Technology(
      "Mining",
      "Unlocks the Miner",
      ResourceBag.createBag(1000),
      false,
      "miner.png",
      ResourceBag.createBag(0, 0, 1, 1, 0.1),
      ResourceBag.createBag(1, 1, 1, 1, 1),
      []
    );

    this.woodcutting = new Technology(
      "Woodcutting",
      "Unlocks the Lumberjack",
      ResourceBag.createBag(0),
      false,
      "lumberjack.png",
      ResourceBag.createBag(0, 1, 0, 0, 0),
      ResourceBag.createBag(1, 1, 1, 1, 1),
      []
    );
  }
}

export default Techtree;
