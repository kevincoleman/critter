// Core
import { Injectable }
  from "@angular/core";
import { Map }
  from "../models";
import { SpaceService }
  from "./space.service";

@Injectable()
export class MapService {

  constructor(
    private spaceService: SpaceService
  ) { }

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

}
