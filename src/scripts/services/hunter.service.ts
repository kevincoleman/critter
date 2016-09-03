// Core
import { Injectable }
  from "@angular/core";

import { MapService }
  from "./map.service";

import { CritterService }
  from "./critter.service";

import { Space }
  from "../models";

@Injectable()
export class HunterService {

  public positionX: number = 3;
  public positionY: number = 3;
  public gridPositionX: number = 3;
  public gridPositionY: number = 3;
  public surroundings: Space[] = []; // only what is visible (taxicab <= 3)
  public hotZone: Space[] = []; // directly adjecent (taxicab <= 1)

  constructor(
    private critterService: CritterService,
    private mapService: MapService
  ) {
    this.initSurroundings();
    this.initHotZone();
    this.mapService.update(
      this.surroundings,
      [this.positionX, this.positionY]
    );
  }

  // moves hunter & shifts the map when necessary
  public go(direction): void {
    if (
      this.mapService.isNavigable(
        this.mapService.getSpace(
          this.positionX + direction[0],
          this.positionY + direction[1],
          this.hotZone
        )
      )
    ) {
      if (
        // near the edge and...
        (this.gridPositionY < 4 && direction[1] === -1) || // going up
        (this.gridPositionX < 4 && direction[0] === -1) || // going left
        (this.gridPositionY > 12 && direction[1] === 1) || // going down
        (this.gridPositionX > 12 && direction[0] === 1)    // going right
      ) {
        this.mapService.current.positionX =
          this.mapService.current.positionX - direction[0];
        this.mapService.current.positionY =
          this.mapService.current.positionY - direction[1];
      } else {
        this.gridPositionX = this.gridPositionX + direction[0];
        this.gridPositionY = this.gridPositionY + direction[1];
      }
      this.positionX = this.positionX + direction[0];
      this.positionY = this.positionY + direction[1];
      this.surroundings.forEach(
        space => {
          space.positionX = space.positionX + direction[0];
          space.positionY = space.positionY + direction[1];
          return;
        }
      );
      this.hotZone.forEach(
        space => {
          space.positionX = space.positionX + direction[0];
          space.positionY = space.positionY + direction[1];
          return;
        }
      );
      this.critterService.processMoves();
    }

    this.mapService.update(
      this.surroundings,
      [this.positionX, this.positionY]
    );

    this.updateHotZone();
    // this.debug();
  }

  debug(): void {
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

  initSurroundings(): void {
    this.mapService.current.data.forEach((space) => {
      if (this.mapService.taxicab(
        [3, 3],
        [space.positionX, space.positionY]
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

  initHotZone(): void {
    this.surroundings.forEach((space) => {
      if (this.mapService.taxicab(
        [3, 3],
        [space.positionX, space.positionY]
      ) <= 1) {
        this.hotZone = [
          ...this.hotZone,
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

  updateHotZone(): void {
    this.hotZone.forEach(space => {
      let match = this.mapService.getSpace(
        space.positionX,
        space.positionY,
        this.mapService.nearby);
      space.navigable = match.navigable;
    });
  }

  get hunterX(): number {
    return this.gridPositionX - this.mapService.current.positionX;
  }

  get hunterY(): number {
    return this.gridPositionY - this.mapService.current.positionY;
  }
}
