import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AcceptDirective} from './accept-directive';
import {DropZoneDirective} from './drop-zone.directive';
import {ScrollableDirective} from './scrollable.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AcceptDirective,
    DropZoneDirective,
    ScrollableDirective
  ],
  exports: [
    AcceptDirective,
    DropZoneDirective,
    ScrollableDirective
  ]
})
export class DirectivesModule {

}
