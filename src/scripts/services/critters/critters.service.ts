// Core
import {  Injectable  } from "@angular/core";

import {  Critters    } from "./critters";

@Injectable()
export class CritterService {
  getCritters() {
    return Critters;
  }
}
