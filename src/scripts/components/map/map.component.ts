// Core
import { Component }
  from "@angular/core";

import { HunterComponent }
  from "../hunter/hunter.component";

import { HunterService, MapService }
  from "../../services";

const template  = require<string>("./map.html");
const styles    = require<string>("./map.scss");

@Component({
  selector:   "map",
  template:   template,
  styles:     [ styles ],
  directives: [
    HunterComponent
  ]
})

export class MapComponent {

  public hunterX = () => {
    return this.hunterService.location[0] * 32 - 32;
  };
  public hunterY = () => {
    return this.hunterService.location[1] * 32 - 32;
  };

  constructor (
    public mapService: MapService,
    public hunterService: HunterService
  ) { }

}
