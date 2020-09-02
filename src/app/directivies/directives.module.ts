import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AcceptDirective} from './accept-directive';
import {DropZoneDirective} from './drop-zone.directive';
import {ScrollableDirective} from './scrollable.directive';
import {BottomSheetDirective} from './bottom-sheet-directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AcceptDirective,
    DropZoneDirective,
    ScrollableDirective,
    BottomSheetDirective
  ],
  exports: [
    AcceptDirective,
    DropZoneDirective,
    ScrollableDirective,
    BottomSheetDirective
  ]
})
export class DirectivesModule {

}
