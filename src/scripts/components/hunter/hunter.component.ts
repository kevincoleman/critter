import { Component }
  from "@angular/core";

const template = require<string>("./hunter.html");
const styles =   require<string>("./hunter.scss");

@Component({
  selector: "hunter",
  template: template,
  styles: [ styles ]
})

export class HunterComponent { }
