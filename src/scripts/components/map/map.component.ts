// Core
import { Component }
  from "@angular/core";

const template  = require<string>("./map.html");
const styles    = require<string>("./map.scss");

@Component({
  selector:   "map",
  template:   template,
  styles:     [ styles ],
  directives: []
})

export class MapComponent {

  spaces: any[] = [];

  constructor () {
    this.generateMap();
  }

  generateMap () {
    let types = [
      {type: "water", likelihood: .06},
      {type: "rock", likelihood: .18},
      {type: "snow", likelihood: .02}
    ];
    let typesTotal = 1;
    types.forEach((type) => {
      typesTotal = typesTotal + type.likelihood;
    });

    function modulate(space) {
      // roll against each type’s likelihood
      let type = types
        .sort( () => { return .5 - Math.random(); })
        .find( (type) => {
          return Math.random() < (type.likelihood / typesTotal);
        });
      // check for blank and return
      if (type === undefined) {
        space.type = "blank";
        return space;
      } else {
        space.type = type.type;
        return space;
      }
    };

    for (let i = 0; i < 256; i++) {
      let newSpace = {
        type: "blank",
        positionx: (i % 16) + 1,
        positiony: Math.floor(i / 16) + 1
      };
      this.spaces = [ ...this.spaces, modulate(newSpace) ];
    }
  }
}
