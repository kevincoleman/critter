import { Space }
  from "./space";

export class Map {
  constructor(
    public data: Space[],
    public positionX: number,
    public positionY: number,
    public width: number,
    public height: number
  ) {};
}
