import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AcceptDirective} from './accept-directive';
import {DropZoneDirective} from './drop-zone.directive';
import {ScrollableDirective} from './scrollable.directive';
import {CardDirective} from './card.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AcceptDirective,
    DropZoneDirective,
    ScrollableDirective,
    CardDirective
  ],
  exports: [
    AcceptDirective,
    DropZoneDirective,
    ScrollableDirective,
    CardDirective
  ]
})
export class DirectivesModule {

}
