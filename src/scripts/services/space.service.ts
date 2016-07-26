// Core
import { Injectable } from "@angular/core";
import { Critter, Space } from "../models";

@Injectable()
export class SpaceService {

  public types = [
    {type: "blank", likelihood: null, navigable: 1 },
    {type: "water", likelihood: .06, navigable: 1 },
    {type: "rock", likelihood: .18, navigable: 0 },
    {type: "snow", likelihood: .02, navigable: .6 },
    {type: "grass", likelihood: .6, navigable: 1 }
  ];

  get typesTotal(): number {
    let total = 1;
    this.types.forEach((type) => {
      total = total + type.likelihood;
    });
    return total;
  }

  generate(positionX, positionY) {
    let space: Space = new Space(
      "blank",
      positionX,
      positionY,
      1,
      0,
      new Critter("chomper", 1, .005, .2)
    );

    // roll against each type’s likelihood
    let type = this.types
      .slice(1)
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
