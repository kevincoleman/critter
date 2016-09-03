// Core
import { Injectable }
  from "@angular/core";

import { MapService }
  from "./map.service";

import { Critter }
  from "../models";

@Injectable()
export class CritterService {

  public critters: Critter[] = [
    new Critter(
      "chomper",  // name
      1,          // level
      .5,         // likelihood
      .2,         // speed
      -2,          // positionX
      1           // positionY
    ),
    new Critter(
      "chomper",  // name
      1,          // level
      .5,         // likelihood
      .2,         // speed
      8,          // positionX
      4           // positionY
    ),
    new Critter(
      "chomper",  // name
      1,          // level
      .5,         // likelihood
      .2,         // speed
      4,          // positionX
      5           // positionY
    ),
    new Critter(
      "chomper",  // name
      1,          // level
      .5,         // likelihood
      .2,         // speed
      2,          // positionX
      4           // positionY
    )
  ];

  constructor(
    private mapService: MapService
  ) { }

  processMoves(): void {
    this.randomlyMove();
  }

  public go(critter, direction): void {
    if (
      this.mapService.isNavigable(
        this.mapService.getSpace(
          critter.positionX + direction[0],
          critter.positionY + direction[1]
        )
      )
    ) {
      critter.positionX = critter.positionX + direction[0];
      critter.positionY = critter.positionY + direction[1];
    }
  }

  randomlyMove(): void {
    this.critters.forEach(critter => {
      if (Math.random() <= critter.speed) {
        let directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
        let direction = Math.floor(Math.random() * 4);
        this.go(critter, directions[direction]);
      }
    });
  }
}
