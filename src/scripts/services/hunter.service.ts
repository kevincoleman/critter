// Core
import { Injectable }
  from "@angular/core";

import { MapService }
  from "./map.service";

import { Space }
  from "../models";

@Injectable()
export class HunterService {

  public positionX: number = 6;
  public positionY: number = 6;
  public gridPositionX: number = 6;
  public gridPositionY: number = 6;

  constructor(
    private mapService: MapService
  ) { }

  // moves hunter & shifts the map when necessary
  public go(direction) {
    switch (direction) {
      case "up":
        if (this.isNavigable(this.positionX, this.positionY - 1)
        ) {
          if (this.gridPositionY < 4) {
            this.mapService.addRowOnTop();
            this.mapService.current.positionY++;
          } else {
            this.gridPositionY--;
          }
          this.positionY--;
        }
        break;
      case "down":
        if (this.isNavigable(this.positionX, this.positionY + 1)
        ) {
          if (this.gridPositionY > 12) {
            this.mapService.addRowOnBottom();
            this.mapService.current.positionY--;
          } else {
            this.gridPositionY++;
          }
          this.positionY++;
        }
        break;
      case "left":
        if (this.isNavigable(this.positionX - 1, this.positionY)
        ) {
          if (this.positionX === 2) {
            this.mapService.addColumnOnLeft();
            this.mapService.current.positionX++;
          } else {
            this.gridPositionX--;
          }
          this.positionX--;
        }
        break;
      case "right":
        if (this.isNavigable(this.positionX + 1, this.positionY)
        ) {
          if (this.positionX === 15) {
            this.mapService.addColumnOnRight();
            this.mapService.current.positionX--;
          } else {
            this.gridPositionX++;
          }
          this.positionX++;
        }
        break;
    }
    this.mapService.updateFog(this.positionX, this.positionY);
  }

  // gets anything within taxicab distance 3 of the hunter
  get surroundings(): Space[] {
    let surroundings = this.mapService.current.data.filter((space) => {
      return this.mapService.taxicab(
        this.mapService.getSpace(this.positionX, this.positionY),
        space
      ) <= 3;
    });
    return surroundings;
  }

  // checks if the space is navigable (could be random)
  isNavigable(positionX, positionY) {
    let space = this.mapService.getSpace(positionX, positionY);
    if (space !== null) {
      let roll = Math.random();
      return (roll < space.navigable);
    } else {
      return false;
    }
  }

}
