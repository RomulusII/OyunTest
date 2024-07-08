import ResourceBag from "./ResourceBag";

class Technology {
  public name: string;
  public description: string;
  public cost: ResourceBag;
  public unlocked: boolean;
  public icon: string;
  public requiredTech: Technology[] = [];
  public productionBase: ResourceBag;
  public productionMultiplicator: ResourceBag;
  public constructor(
    name: string,
    description: string,
    cost: ResourceBag,
    unlocked: boolean,
    icon: string,
    productionBenefit: ResourceBag,
    productionMultiplicator: ResourceBag,
    requiredTech: Technology[] = []
  ) {
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.unlocked = unlocked;
    this.icon = icon;
    this.productionBase = productionBenefit;
    this.productionMultiplicator = productionMultiplicator;
    this.requiredTech = requiredTech;
  }

  public ResearchTime(): number {
    return (
      this.cost.food +
      this.cost.wood * 3 +
      this.cost.stone * 20 +
      this.cost.iron * 50 +
      this.cost.gold * 100
    );
  }
}

export default Technology;
