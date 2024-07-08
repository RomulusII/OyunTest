import ResourceBag from "./ResourceBag";

export class ProductionPriority {
  public productionPrio: ResourceBag = ResourceBag.createBag(5, 2, 1, 1, 1, 1);

  public productionRates: ResourceBag = ResourceBag.createBag(1);

  constructor() {
    this.RefreshProductionRatio();
  }

  public RefreshProductionRatio(): void {
    var totalProduction = this.totalProduction();

    this.productionRates.food = this.productionPrio.food / totalProduction;
    this.productionRates.wood = this.productionPrio.wood / totalProduction;
    this.productionRates.stone = this.productionPrio.stone / totalProduction;
    this.productionRates.iron = this.productionPrio.iron / totalProduction;
    this.productionRates.gold = this.productionPrio.gold / totalProduction;
    this.productionRates.tools = this.productionPrio.tools / totalProduction;
  }

  private totalProduction(): number {
    return (
      this.productionPrio.food +
      this.productionPrio.wood +
      this.productionPrio.stone +
      this.productionPrio.iron +
      this.productionPrio.gold +
      this.productionPrio.tools
    );
  }
}
