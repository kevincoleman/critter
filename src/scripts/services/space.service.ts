// Core
import { Injectable } from "@angular/core";
import { Space } from "../models";

@Injectable()
export class SpaceService {

  private _types = [
    {type: "water", likelihood: .06, navigable: 1 },
    {type: "rock", likelihood: .18, navigable: 0 },
    {type: "snow", likelihood: .02, navigable: 1 }
  ];

  get typesTotal(): number {
    let total = 1;
    this._types.forEach((type) => {
      total = total + type.likelihood;
    });
    return total;
  }

  generate(positionX, positionY) {
    let space: Space = {
      type: "blank",
      positionX: positionX,
      positionY: positionY,
      navigable: 1
    };
    // roll against each type’s likelihood
    let type = this._types
      .sort( () => { return .5 - Math.random(); })
      .find( (type) => {
        return Math.random() < (type.likelihood / this.typesTotal);
      });
    // check for blank and return
    if (type === undefined) {
      space.type = "blank";
      return space;
    } else {
      space.type = type.type;
      space.navigable = type.navigable;
      return space;
    }
  }
}
