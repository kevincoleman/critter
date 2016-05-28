// For vendors for example jQuery, Lodash, angular2-jwt just import them here
// unless you plan on chunking vendors files for async loading. You would need
// to import the async loaded vendors at the entry point of the async loaded
// file. Also see custom-typings.d.ts as you also need to run
// `typings install x` where `x` is your module

require("faker/lib");

/* tslint:disable:max-line-length */
// import "!imports?this=>window!exports?window.Modernizr!foundation-sites/js/vendor/modernizr";
/* tslint:enable */

import "@angular/platform-browser";
import "@angular/core";
import "@angular/common";
import "@angular/http";
import "@angular/router-deprecated";
