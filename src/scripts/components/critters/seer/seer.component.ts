import { Component } from "@angular/core";

const template = require<string>("./seer.html");

@Component({
  selector: "seer",
  template: template
})

export class SeerComponent {
    name: string =  "seer";
    symbol: string = "ø";
    level: number = 5;
    speed: number = 4;
}
