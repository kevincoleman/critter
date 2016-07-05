// Core
import { Injectable } from "@angular/core";

import { Critter } from "../models";

@Injectable()
export class CritterService {
  getCritters() {
    return Critter;
  }
}
