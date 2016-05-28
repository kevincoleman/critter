import { ComponentRef } from "@angular/core";
import { bootstrap    } from "@angular/platform-browser-dynamic";
import { hotModuleReplacement } from "angular2-hmr";

import { AppComponent } from "./components/app/app.component";

/*
 * Vendors
 *
 * For vendors for example jQuery, Lodash, angular2-jwt just import them
 * anywhere in your app. You can also import them in vendors to ensure that
 * they are bundled in one file. Also see custom-typings.d.ts as you also need
 * to do `typings install x` where `x` is your module
 */

export function main(): Promise<ComponentRef<AppComponent>> {
  // NOTE: Any custom override providers given here are not automatically made
  // available to your components. They are simply overrides for the platform
  // injector’s default set of providers (see BROWSER_APP_PROVIDERS).
  return bootstrap(AppComponent, [])
    .catch(err => console.error(err));
}

/*
 * Hot Module Reload
 * experimental
 */
if (HMR === true) {
  // activate hot module reload
  hotModuleReplacement(main, module);
} else {
  // bootstrap when documetn is ready
  document.addEventListener("DOMContentLoaded", main);
}
