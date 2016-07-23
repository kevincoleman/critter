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
      16, // width
      16, // height
      1,  // lowestX
      1,  // lowestY
      16, // highestX
      16  // highestY
    );
    for (let i = 0; i < 256; i++) {
      let newSpace = this.spaceService.generate(
        (i % 16) + 1,           // positionX
        Math.floor(i / 16) + 1  // positionY
      );
      newMap.data = [ ...newMap.data, newSpace ];
    }

    // make sure our hero is on a navigable spot
    newMap.data[85].type = this.spaceService.types[0].type;
    newMap.data[85].navigable = this.spaceService.types[0].navigable;

    return newMap;
  }

  // to minimize number of iterative loops over the map
  update(changedSpaces: Space[]) {
    this.current.data.forEach((space) => {
      changedSpaces.forEach((changedSpace) => {
        if (
          changedSpace.positionX === space.positionX &&
          changedSpace.positionY === space.positionY
        ) {
          space.clarity = 1;
        } else {
          this.growFoggy(space);
        }
      });
    });
  }

  // let the spaces fade gradually
  growFoggy(space) {
    if (space.clarity > .3) {
      space.clarity = space.clarity - .0005;
    }
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

  taxicab(spaceA: Space, spaceB: Space) {
    let distance: number = 0;
    distance = distance + Math.abs(spaceA.positionX - spaceB.positionX);
    distance = distance + Math.abs(spaceA.positionY - spaceB.positionY);
    return distance;
  }

  addRowOnTop() {
    this.current.positionY--;
    let newPositionY = this.current.data[0].positionY - 1;
    let newRow: Space[] = [];
    for (let i: number = 1; i <= this.current.width; i++) {
      newRow = [
        ...newRow,
        this.spaceService.generate(i, newPositionY)
      ];
    }
    this.current.data = [
      ...newRow,
      ...this.current.data
    ];
    this.current.height++;
  }

  addRowOnBottom() {
    for (let i = 0; i < this.current.width; i++) {
      this.current.data = [
        ...this.current.data,
        this.spaceService.generate(i + 1, this.current.height + 1)
      ];
    }
    this.current.height++;
  }

  addColumnOnLeft() {
    this.current.positionX--;
    let x = 0;
    for (let i = 1; i <= this.current.height; i++) {
      this.current.data.splice(x, 0,
        this.spaceService.generate(this.current.lowestX - 1, i)
      );
      x = x + this.current.width + 1;
    }
    this.current.lowestX--;
    this.current.width++;
  }

  addColumnOnRight() {
    for (let i = 1; i <= this.current.height; i++) {
      this.current.data.splice((this.current.width * i) + i - 1, 0,
        this.spaceService.generate(this.current.width + 1, i)
      );
    }
    this.current.width++;
  }

  get width(): number {
    return this.current.width;
  }

}
