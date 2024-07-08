import ResourceBag from "./ResourceBag";

// Profession
export class ProfessionType {
  public name: string;
  public description: string;

  public needs: ResourceBag;

  public produces: ResourceBag;

  public constructor(
    name: string,
    description: string,
    needs: ResourceBag,
    produces: ResourceBag
  ) {
    this.name = name;
    this.description = description;
    this.needs = needs;
    this.produces = produces;
  }
}

export default ProfessionType;
