import { Directive,
         ElementRef,
         Input } from "@angular/core";
import { IChanges } from "../support/changes.interface";

@Directive({
  selector: "[ag-focus]"
})
export class Focus {
  @Input("ag-focus") hasFocus: boolean;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }

  ngOnChanges(changes: IChanges): void {
    if (changes["hasFocus"] && changes["hasFocus"].currentValue === true) {
      setTimeout(
        () => { this.elementRef.nativeElement.focus(); },
        0
      );
    }
  }
}
