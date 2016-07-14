// Core
import { Component }
  from "@angular/core";
import { RouteConfig,
         Router,
         ROUTER_PROVIDERS,
         ROUTER_DIRECTIVES }
  from "@angular/router-deprecated";

// Template Directives
import { HomeComponent }
  from "../home/home.component";

// Services
import { HunterService, MapService, SpaceService }
  from "../../services";

// import { Space }
//   from "../../models";

const template  = require<string>("./app.html");
const styles    = require<string>("./app.scss");

@Component({
  selector:   "app",
  template:   template,
  styles:     [ styles ],
  providers:  [
    ROUTER_PROVIDERS,
    HunterService,
    MapService,
    SpaceService
  ],
  directives: [
    ROUTER_DIRECTIVES,
  ]
})
@RouteConfig([
  {
    path        : "/",
    component   : HomeComponent,
    name        : "Home",
    useAsDefault: true
  }
])
export class AppComponent {
  currentPath: string;

  constructor (
    router: Router
  ) {
    router.subscribe(value => this.currentPath = value);
  }
}
