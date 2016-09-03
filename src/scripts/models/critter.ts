export class Critter {
  constructor (
    public name: string = "",
    public level: number,
    public likelihood: number,
    public speed: number,
    public positionX: number,
    public positionY: number
  ) {}
}
