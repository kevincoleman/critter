// Core
import { Injectable } from "@angular/core";
import { Space } from "../models";

@Injectable()
export class SpaceService {

  public map: Space[] = [];
  private _types = [
    {type: "water", likelihood: .06},
    {type: "rock", likelihood: .18},
    {type: "snow", likelihood: .02}
  ];

  constructor() {
    this.generateMap();
  }

  get typesTotal(): number {
    let total = 1;
    this._types.forEach((type) => {
      total = total + type.likelihood;
    });
    return total;
  }

  generateMap() {
    for (let i = 0; i < 256; i++) {
      let newSpace = this.generate();
      newSpace.positionx = (i % 16) + 1;
      newSpace.positiony = Math.floor(i / 16) + 1;
      this.map = [ ...this.map, newSpace ];
    }
  }

  generate() {
    let space: Space = {
      type: "blank",
      positionx: null,
      positiony: null
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
      return space;
    }
  }
}
