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
      1,           // positionY
      false
    ),
    new Critter("chomper", 1, .5, .2, 8, 4, false ),
    new Critter("chomper", 1, .5, .2, 2, 4, false ),
    new Critter("chomper", 1, .5, .2, 4, 5, false ),
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
        let directions: number[][] = [[0, -1], [1, 0], [0, 1], [-1, 0]];
        let direction: number[] = directions[Math.floor(Math.random() * 4)];
        let newCoordinates: number[] = [
          critter.positionX + direction[0],
          critter.positionY + direction[1]
        ];
        if (
          this.critters.filter(critter => {
            return critter.positionX === newCoordinates[0] &&
                   critter.positionY === newCoordinates[1];
          }
        ).length <= 0) {
          this.go(critter, direction);
        }
      }
    });
  }
}
