// Core
import { RouterConfig,
         provideRouter, }
  from "@angular/router";

// Route Components
import { HomeComponent }
  from "../home/home.component";

const routes: RouterConfig = [
  {
    path        : "home",
    component   : HomeComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
