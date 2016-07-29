import { Critter }
  from "./critter";

export class Space {
  constructor(
    public type: string,
    public positionX: number,
    public positionY: number,
    public navigable: number,
    public visible: boolean,
    public critter?: Critter
  ) {};
}
