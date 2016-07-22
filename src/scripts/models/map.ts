import { Space }
  from "./space";

export class Map {
  constructor(
    public data: Space[],
    public positionX: number,
    public positionY: number,
    public width: number,
    public height: number,
    public lowestX: number,
    public lowestY: number,
    public highestX: number,
    public highestY: number
  ) {};
}
