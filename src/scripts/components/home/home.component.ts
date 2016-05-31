// Core
import {  Component} from "@angular/core";

import {  Critter         } from "../../services/critters/critter";
import {  CritterService  } from "../../services/critters/critters.service";

const template  = require<string>("./home.html");
const styles    = require<string>("./home.scss");

@Component({
  selector:   "home",
  template:   template,
  styles:     [ styles ],
  providers:  [
    CritterService
  ]
})

export class HomeComponent {

  activeCritters: Critter[];

  constructor (
    private critterService: CritterService
  ) {
    this.activeCritters = critterService.getCritters();
  }

}
