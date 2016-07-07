// Core
import { Component }
  from "@angular/core";

import { SpaceService }
  from "../../services";


const template  = require<string>("./map.html");
const styles    = require<string>("./map.scss");

@Component({
  selector:   "map",
  template:   template,
  styles:     [ styles ],
  directives: []
})

export class MapComponent {

  constructor ( public spaceService: SpaceService ) { }

}
