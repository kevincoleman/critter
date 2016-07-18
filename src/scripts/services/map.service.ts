// Core
import { Injectable }
  from "@angular/core";
import { Map }
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
    let newMap: Map = new Map([], 0, 0, 16, 16 );
    for (let i = 0; i < 256; i++) {
      let newSpace = this.spaceService.generate(
        (i % 16) + 1,           // positionX
        Math.floor(i / 16) + 1  // positionY
      );
      newMap.data = [ ...newMap.data, newSpace ];
    }
    return newMap;
  }

  getSpace(positionX, positionY) {
    let space = this.current.data.filter((space) => {
      return space.positionX === positionX && space.positionY === positionY;
    });

    if (space.length === 0 || space === undefined) {
      return null;
    } else {
      return space;
    };
  }

}
