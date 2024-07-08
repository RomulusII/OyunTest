class ResourceBag {
  public food: number = 0;
  public wood: number = 0;
  public stone: number = 0;
  public iron: number = 0;
  public gold: number = 0;

  public tools: number = 0;

  public static createBag(
    food: number,
    wood: number = 0,
    stone: number = 0,
    iron: number = 0,
    gold: number = 0,
    tools: number = 0
  ) {
    var bag = new ResourceBag();
    bag.food = food;
    bag.wood = wood;
    bag.stone = stone;
    bag.iron = iron;
    bag.gold = gold;
    bag.tools = tools;
    return bag;
  }

  public static ZeroResource = ResourceBag.createBag(0);

  public Add(other: ResourceBag, multiplier: number = 1): void {
    this.food += other.food * multiplier;
    this.wood += other.wood * multiplier;
    this.stone += other.stone * multiplier;
    this.iron += other.iron * multiplier;
    this.gold += other.gold * multiplier;
    this.tools += other.tools * multiplier;
  }

  public IsEnough(cost: ResourceBag): boolean {
    return (
      this.food >= cost.food &&
      this.wood >= cost.wood &&
      this.stone >= cost.stone &&
      this.iron >= cost.iron &&
      this.gold >= cost.gold &&
      this.tools >= cost.tools
    );
  }

  public Subtract(cost: ResourceBag): void {
    this.Add(cost, -1);
  }

  public ToString = (): string => {
    // resources rounded to no decimal places
    var rslt: string = "";
    if (this.food > 0) rslt += `F: ${Math.round(this.food)} `;
    if (this.wood > 0) rslt += `W: ${Math.round(this.wood)} `;
    if (this.stone > 0) rslt += `S: ${Math.round(this.stone)} `;
    if (this.iron > 0) rslt += `I: ${Math.round(this.iron)} `;
    if (this.gold > 0) rslt += `G: ${Math.round(this.gold)} `;
    if (this.tools > 0) rslt += `T: ${Math.round(this.tools)} `;
    return rslt;
  };
}

export default ResourceBag;
