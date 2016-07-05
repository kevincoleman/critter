import { Component } from "@angular/core";

const template = require<string>("./chomper.html");

@Component({
  selector: "chomper",
  template: template
})

export class ChomperComponent {
    name: string =  "chomper";
    symbol: string = "#";
    level: number = 1;
    speed: number = 1;
}
