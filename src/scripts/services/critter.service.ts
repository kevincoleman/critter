// Core
import { Injectable }
  from "@angular/core";

import { MapService }
  from "./map.service";

import { Critter }
  from "../models";

@Injectable()
export class CritterService {

  public critters: Critter[];

  constructor(
    private mapService: MapService
  ) { }

  public go(critter, direction) {
    switch (direction) {
      case "up":
        if (
          this.mapService.isNavigable(
            this.mapService.getSpace(
              critter.positionX,
              critter.positionY - 1,
              this.mapService.nearby
            )
          )
        ) { critter.positionY--; }
        break;
      case "down":
        if (
          this.mapService.isNavigable(
            this.mapService.getSpace(
              critter.positionX,
              critter.positionY + 1,
              this.mapService.nearby
            )
          )
        ) { critter.positionY++; }
        break;
      case "left":
        if (
          this.mapService.isNavigable(
            this.mapService.getSpace(
              critter.positionX - 1,
              critter.positionY,
              this.mapService.nearby
            )
          )
        ) { critter.positionX--; }
        break;
      case "right":
        if (
          this.mapService.isNavigable(
            this.mapService.getSpace(
              critter.positionX + 1,
              critter.positionY,
              this.mapService.nearby
            )
          )
        ) { critter.positionX++; }
        break;
    }
  }
}
