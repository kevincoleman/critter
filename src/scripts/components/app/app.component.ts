// Core
import { Component }
  from "@angular/core";
import { ROUTER_DIRECTIVES }
  from "@angular/router";

// Services
import { HunterService, MapService, SpaceService }
  from "../../services";

// import { Space }
//   from "../../models";

const template  = require<string>("./app.html");
const styles    = require<string>("./app.scss");

@Component({
  selector:   "app",
  template:   template,
  styles:     [ styles ],
  providers:  [
    HunterService,
    MapService,
    SpaceService
  ],
  directives: [
    ROUTER_DIRECTIVES
  ]
})


export class AppComponent { }
