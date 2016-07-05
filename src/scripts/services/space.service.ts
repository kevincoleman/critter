// Core
import { Injectable } from "@angular/core";
import { Space } from "../models";


@Injectable()
export class SpaceService {

  constructor(
    public spaces: Space[]
  ) {
    this.generate();
  }

  all() {
    return this.spaces;
  }

  generate() {
    for (let i = 0; i < 512; i++) {
      this.spaces.push(new Space(32, 32, 0, 0));
    }
  }
}
