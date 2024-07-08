import { ProfessionType } from "./ProfessionType";

export class Profession {
  public type: ProfessionType;
  public count: number;
  public max: number;

  public constructor(type: ProfessionType, count: number, max: number) {
    this.type = type;
    this.count = count;
    this.max = max;
  }
}

export default Profession;
