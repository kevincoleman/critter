// Core
import { Component } from "@angular/core";
import { MapComponent }
  from "../map/map.component";

const template  = require<string>("./home.html");
const styles    = require<string>("./home.scss");

@Component({
  selector:   "home",
  template:   template,
  styles:     [ styles ],
  directives: [
    MapComponent
  ]
})

export class HomeComponent {
  constructor () { }
}
