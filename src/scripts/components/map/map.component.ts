// Core
import { Component }
  from "@angular/core";

import { HunterComponent }
  from "../hunter/hunter.component";
import { ChomperComponent }
  from "../critters/chomper/chomper.component";

import { HunterService, MapService }
  from "../../services";

const template  = require<string>("./map.html");
const styles    = require<string>("./map.scss");

@Component({
  selector:   "map",
  template:   template,
  styles:     [ styles ],
  directives: [
    ChomperComponent,
    HunterComponent
  ]
})

export class MapComponent {

  constructor (
    public mapService: MapService,
    public hunterService: HunterService
  ) { }

}
