import { SimpleChange } from "@angular/core";

export interface IChanges {
  [propName: string]: SimpleChange;
}
