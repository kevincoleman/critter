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
  public surroundings: Space[] = [];

  constructor(
    private mapService: MapService
  ) {
    this.initSurroundings();
    this.mapService.update(this.surroundings);
  }

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
          this.surroundings.forEach((space) => {
            space.positionY--;
          });
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
          this.surroundings.forEach((space) => {
            space.positionY++;
          });
        }
        break;
      case "left":
        if (this.isNavigable(this.positionX - 1, this.positionY)
        ) {
          if (this.gridPositionX < 4) {
            this.mapService.addColumnOnLeft();
            this.mapService.current.positionX++;
          } else {
            this.gridPositionX--;
          }
          this.positionX--;
          this.surroundings.forEach((space) => {
            space.positionX--;
          });
        }
        break;
      case "right":
        if (this.isNavigable(this.positionX + 1, this.positionY)
        ) {
          if (this.gridPositionX > 12) {
            this.mapService.addColumnOnRight();
            this.mapService.current.positionX--;
          } else {
            this.gridPositionX++;
          }
          this.positionX++;
          this.surroundings.forEach((space) => {
            space.positionX++;
          });
        }
        break;
    }
    this.mapService.update(this.surroundings);
  }

  initSurroundings() {
    this.mapService.current.data.forEach((space) => {
      if (this.mapService.taxicab(
        this.mapService.getSpace(this.positionX, this.positionY),
        space
      ) <= 2) {
        this.surroundings = [
          ...this.surroundings,
          new Space(
            space.type,
            space.positionX,
            space.positionY,
            space.navigable,
            1
          )
        ];
      };
    });

    this.surroundings.forEach(space => space.clarity = 1);
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
