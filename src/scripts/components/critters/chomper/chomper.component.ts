import { Component }
  from "@angular/core";

import { HunterService, MapService }
  from "../../../services";

const template = require<string>("./chomper.html");
const styles =   require<string>("./chomper.scss");

@Component({
  selector: "chomper",
  template: template,
  styles: [ styles ]
})

export class ChomperComponent {

  public positionX: number;
  public positionY: number;
  public opacity: number;

  constructor(
    private hunterService: HunterService,
    private mapService: MapService
  ) { }

}
