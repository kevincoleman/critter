// Core
import { Injectable }
  from "@angular/core";

import { MapService }
  from "./map.service";

import { Space }
  from "../models";

@Injectable()
export class HunterService {

  public positionX: number = 3;
  public positionY: number = 3;
  public gridPositionX: number = 3;
  public gridPositionY: number = 3;
  public surroundings: Space[] = [];

  constructor(
    private mapService: MapService
  ) {
    this.initSurroundings();
    this.mapService.update(
      this.surroundings,
      [this.positionX, this.positionY]
    );
  }

  // moves hunter & shifts the map when necessary
  public go(direction) {
    switch (direction) {
      case "up":
        if (this.isNavigable(this.positionX, this.positionY - 1)
        ) {
          if (this.gridPositionY < 4) {
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
          if (this.gridPositionY >= 12) {
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
          if (this.gridPositionX >= 12) {
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
    this.mapService.update(
      this.surroundings,
      [this.positionX, this.positionY]
    );
    // this.debug();
  }

  debug() {
    console.log(
      "Hunter:\n" +
      "  Map Position:    " + this.positionX, this.positionY + "\n" +
      "  Grid Position:   " + this.gridPositionX, this.gridPositionY + "\n" +
      "Map:\n" +
      "  Offset Position: " +
        this.mapService.current.positionX, this.mapService.current.positionY +
      "\n" +
      "Visible:\n" +
      "  Center:          " +
        this.surroundings[6].positionX, this.surroundings[6].positionY
    );
  }

  initSurroundings() {
    this.mapService.current.data.forEach((space) => {
      if (this.mapService.taxicab(
        [3, space.positionX],
        [3, space.positionY]
      ) <= 3) {
        this.surroundings = [
          ...this.surroundings,
          new Space(
            space.type,
            space.positionX,
            space.positionY,
            space.navigable,
            true
          )
        ];
      }
    });
  }

  get hunterX() {
    return this.gridPositionX - this.mapService.current.positionX;
  }

  get hunterY() {
    return this.gridPositionY - this.mapService.current.positionY;
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
