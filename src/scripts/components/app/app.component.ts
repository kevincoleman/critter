// Core
import { Component }
  from "@angular/core";
import { ROUTER_DIRECTIVES }
  from "@angular/router";

// Hotkeys
import { HotkeysService, Hotkey }
  from "angular2-hotkeys";

// Services
import { HunterService, MapService, SpaceService }
  from "../../services";

const template  = require<string>("./app.html");
const styles    = require<string>("./app.scss");

@Component({
  selector:   "app",
  template:   template,
  styles:     [ styles ],
  providers:  [
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
    private _hotkeysService: HotkeysService,
    private _hunterService: HunterService
  ) {
    this._hotkeysService.add(
        new Hotkey("up", (event: KeyboardEvent): boolean => {
        this._hunterService.go("up");
        return false;
      })
    );
    this._hotkeysService.add(
        new Hotkey("down", (event: KeyboardEvent): boolean => {
        this._hunterService.go("down");
        return false;
      })
    );
    this._hotkeysService.add(
      new Hotkey("left", (event: KeyboardEvent): boolean => {
        this._hunterService.go("left");
        return false;
      })
    );
    this._hotkeysService.add(
        new Hotkey("right", (event: KeyboardEvent): boolean => {
        this._hunterService.go("right");
        return false;
      })
    );
  }

}
