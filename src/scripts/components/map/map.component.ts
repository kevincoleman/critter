// Core
import { Component }
  from "@angular/core";

import { HunterComponent }
  from "../hunter/hunter.component";

import { HunterService, MapService }
  from "../../services";

import { Map }
  from "../../models";


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

  public hunterX = this.hunterService.positionX * 32;
  public hunterY = this.hunterService.positionY * 32;

  public map: Map;

  constructor (
    public mapService: MapService,
    public hunterService: HunterService
  ) {
    this.map = mapService.generate();
  }

}
