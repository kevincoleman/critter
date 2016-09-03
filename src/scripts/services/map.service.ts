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
  public nearby: Space[]; // an instanced filtered set of current.data

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
      5,  // width
      5,  // height
      1,  // lowestX
      1,  // lowestY
      5,  // highestX
      5   // highestY
    );
    for (let i = 0; i < (newMap.width * newMap.height); i++) {
      let newSpace = this.spaceService.generate(
        (i % newMap.width) + 1,           // positionX
        Math.floor(i / newMap.height) + 1 // positionY
      );
      if (
        this.taxicab(
          [newSpace.positionX, newSpace.positionY],
          [3, 3]
        ) <= 3
      ) {
        newMap.data = [ ...newMap.data, newSpace ];
      }
    }

    // make sure our hero is on a navigable spot
    newMap.data[10].type = this.spaceService.types[0].type;
    newMap.data[10].navigable = this.spaceService.types[0].navigable;

    // set “nearby” spaces (taxicab <= 4)
    this.nearby = newMap.data.filter(
      (space) => {
        space.visible = false;
        return this.taxicab([3, 3], [space.positionX, space.positionY]) <= 4;
      }
    );
    return newMap;
  }

  // to minimize number of iterative loops over the map
  update(changedSpaces: Space[], hunterXY: number[]) {

    // limit scope to immediate surroundings
    this.nearby = this.current.data.filter(
      (space) => {
        space.visible = false;
        return this.taxicab(hunterXY, [space.positionX, space.positionY]) <= 4;
      }
    );
    this.nearby.forEach((space) => {
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
        } else {
          // set nearby spaces to visible
          if (this.taxicab(hunterXY, [space.positionX, space.positionY]) < 3) {
            space.visible = true;
          }
        }
      });
    });
  }

  // expensive; supply a limited spaceSet when possible
  getSpace(
    positionX: number,
    positionY: number,
    spaceSet?: Space[]
  ): Space {
    let spaces: Space[];
    let found: Space;

    if (spaceSet !== undefined) {
      spaces = spaceSet;
    } else {
      spaces = this.current.data;
    }

    found = spaces.filter((space) => {
      return space.positionX === positionX && space.positionY === positionY;
    })[0];

    if (found) {
      return found; // returns space or null
    } else {
      return null;
    }
  }

  // finds distance between two spaces
  taxicab(spaceA: number[], spaceB: number[]) {
    let distance: number = 0;
    distance = distance + Math.abs(spaceA[0] - spaceB[0]);
    distance = distance + Math.abs(spaceA[1] - spaceB[1]);
    return distance;
  }

  // checks if the space is navigable (on this try)
  isNavigable(space: Space) {
    if (space === null) {
      return null;
    } else {
      let roll = Math.random();
      return (roll < space.navigable);
    }
  }
}
