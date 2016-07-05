import { Component } from "@angular/core";

const template = require<string>("./snaker.html");

@Component({
  selector: "snaker",
  template: template
})

export class SnakerComponent {
    name: string =  "snaker";
    symbol: string = "§";
    level: number = 2;
    speed: number = 3;
}
