// Core
import { Component }
  from "@angular/core";
import { ROUTER_DIRECTIVES }
  from "@angular/router";

// Hotkeys
import { HotkeysService, Hotkey }
  from "angular2-hotkeys";

// Models
import { Space }
  from "../../models";

// Services
import { CritterService, HunterService, MapService, SpaceService }
  from "../../services";

const template  = require<string>("./app.html");
const styles    = require<string>("./app.scss");

@Component({
  selector:   "app",
  template:   template,
  styles:     [ styles ],
  providers:  [
    CritterService,
    HotkeysService,
    HunterService,
    MapService,
    SpaceService
  ],
  directives: [
    ROUTER_DIRECTIVES
  ]
})


export class AppComponent {

  constructor(
    private _hotkeysService:  HotkeysService,
    private critterService:   CritterService,
    private hunterService:    HunterService,
    private mapService:       MapService,
    private spaceService:     SpaceService
  ) {

    this.update(
      this.hunterService.surroundings,
      [this.hunterService.positionX, this.hunterService.positionY]
    );

    this._hotkeysService.add(
        new Hotkey(["up", "k"], (event: KeyboardEvent): boolean => {
        this.processMovement([0, -1]);
        return false;
      })
    );
    this._hotkeysService.add(
        new Hotkey(["down", "j"], (event: KeyboardEvent): boolean => {
        this.processMovement([0, 1]);
        return false;
      })
    );
    this._hotkeysService.add(
      new Hotkey(["left", "h"], (event: KeyboardEvent): boolean => {
        this.processMovement([-1, 0]);
        return false;
      })
    );
    this._hotkeysService.add(
        new Hotkey(["right", "l"], (event: KeyboardEvent): boolean => {
        this.processMovement([1, 0]);
        return false;
      })
    );
  }

  processMovement(direction): void {
    this.hunterService.go(direction);
    this.update(
      this.hunterService.surroundings,
      [this.hunterService.positionX, this.hunterService.positionY]
    );
    this.hunterService.updateHotZone();

    this.hunterService.surroundings.forEach(space => {
      this.critterService.critters.forEach(critter => {
        if (critter.positionX === space.positionX &&
            critter.positionY === space.positionY) {
              critter.visible = true;
            }
      });
    });
    // this.debug();
  };


  // one loop, to minimize number of iterative loops over the map
  update(changedSpaces: Space[], hunterXY: number[]) {

    // limit scope to immediate surroundings
    this.mapService.nearby = this.mapService.current.data.filter(
      (space) => {
        space.visible = false;
        return this.mapService.taxicab(
          hunterXY,
          [space.positionX, space.positionY]
        ) <= 4;
      }
    );
    this.mapService.nearby.forEach((space) => {
      changedSpaces.forEach((changedSpace) => {

        // generate a new space if user finds edge
        if (this.mapService.getSpace(
            changedSpace.positionX,
            changedSpace.positionY
          ) === null) {
          this.mapService.current.data = [
            ...this.mapService.current.data,
            this.spaceService.generate(
              changedSpace.positionX,
              changedSpace.positionY
            )
          ];
        } else {
          // set nearby spaces to visible
          if (this.mapService.taxicab(
            hunterXY,
            [space.positionX, space.positionY]
          ) < 3) {
            space.visible = true;
          }
        }
      });
    });
  }

}
