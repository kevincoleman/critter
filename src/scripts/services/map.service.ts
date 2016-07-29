// Core
import { Injectable }
  from "@angular/core";
import { Map, Space }
  from "../models";
import { SpaceService }
  from "./space.service";

@Injectable()
export class MapService {

  public current: Map;

  constructor(
    private spaceService: SpaceService
  ) {
    this.current = this.generate();
  }

  generate() {
    let newMap: Map = new Map(
      [], // data
      0,  // positionX
      0,  // positionY
      5, // width
      5, // height
      1,  // lowestX
      1,  // lowestY
      5, // highestX
      5  // highestY
    );
    for (let i = 0; i < (newMap.width * newMap.height); i++) {
      let newSpace = this.spaceService.generate(
        (i % newMap.width) + 1,           // positionX
        Math.floor(i / newMap.height) + 1 // positionY
      );
      if (
        this.taxicab(
          newSpace,
          new Space(null, 3, 3, null, null, null)
        ) <= 3
      ) {
        newMap.data = [ ...newMap.data, newSpace ];
      }
    }

    // make sure our hero is on a navigable spot
    newMap.data[10].type = this.spaceService.types[0].type;
    newMap.data[10].navigable = this.spaceService.types[0].navigable;

    return newMap;
  }

  // to minimize number of iterative loops over the map
  update(changedSpaces: Space[], hunterXY: number[]) {
    this.current.data.forEach((space) => {
      changedSpaces.forEach((changedSpace) => {
        // generate a new space if user finds edge
        if (this.getSpace(
            changedSpace.positionX,
            changedSpace.positionY
          ) === null) {
          this.current.data = [
            ...this.current.data,
            this.spaceService.generate(
              changedSpace.positionX,
              changedSpace.positionY
            )
          ];
        }
        if (
          changedSpace.positionX === space.positionX &&
          changedSpace.positionY === space.positionY
        ) {
          space.visible = true;
        } else {
          if (this.taxicab(
            space,
            new Space(null, hunterXY[0], hunterXY[1], null, null, null)
          ) > 3) {
            space.visible = false;
          };
        }
      });
    });
  }

  getSpace(positionX, positionY) {
    let space: Space[] = this.current.data.filter((space) => {
      return space.positionX === positionX && space.positionY === positionY;
    });

    if (space.length === 0 || space === undefined) {
      return null;
    } else {
      return space[0];
    };
  }

  // finds distance between two spaces
  taxicab(spaceA: Space, spaceB: Space) {
    let distance: number = 0;
    distance = distance + Math.abs(spaceA.positionX - spaceB.positionX);
    distance = distance + Math.abs(spaceA.positionY - spaceB.positionY);
    return distance;
  }
}
