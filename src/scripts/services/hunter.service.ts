// Core
import { Injectable }
  from "@angular/core";

import { MapService }
  from "./map.service";

@Injectable()
export class HunterService {

  public positionX: number = 6;
  public positionY: number = 6;

  isNavigable(positionX, positionY) {
    let space = this.mapService.getSpace(positionX, positionY);
    if (space !== null) {
      let roll = Math.random();
      return (roll < space[0].navigable);
    } else {
      return false;
    }
  }

  public go(direction) {
    switch (direction) {
      case "up":
        if (this.isNavigable(
          this.positionX,
          this.positionY - 1)
        ) {
          this.positionY--;
        }
        break;
      case "down":
        if (this.isNavigable(
          this.positionX,
          this.positionY + 1)
        ) {
          this.positionY++;
        }
        break;
      case "left":
        if (this.isNavigable(
          this.positionX - 1,
          this.positionY)
        ) {
          this.positionX--;
        }
        break;
      case "right":
        if (this.isNavigable(
          this.positionX + 1,
          this.positionY)
        ) {
          this.positionX++;
        }
        break;
    }
  }

  get location(): number[] {
    return [ this.positionX, this.positionY ];
  }

  constructor(
    private mapService: MapService
  ) {
    this.isNavigable(1, 1);
  }

}
