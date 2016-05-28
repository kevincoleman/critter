import { Directive } from "@angular/core";

@Directive({
  selector: "[href]",
  inputs  : [ "href" ],
  host    : { "(click)": "clickHandler($event)" }
})
export class LinkToAnchorDirective {
  href: string;

  clickHandler(event: Event) {
    if (this.href.startsWith("#")) {
      event.preventDefault();
      document.location.hash = this.href.replace("#", "");
    }
  }
}
