// Core
import {  Component } from "@angular/core";

// Template Directives


const template  = require<string>("./home.html");
const styles    = require<string>("./home.scss");

@Component({
  selector:   "home",
  template:   template,
  styles:     [ styles ]
})

export class HomeComponent {

  constructor () {}

}
