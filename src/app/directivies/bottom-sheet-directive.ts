import {Directive, TemplateRef} from '@angular/core';
import {BottomSheetState} from '../state/bottom-sheet-state';

@Directive({
  selector: 'ng-template[appBottomSheet]'
})
export class BottomSheetDirective {

  constructor(
    bottomSheetTemplate: TemplateRef<any>,
    state: BottomSheetState
  ) {
    state.template = bottomSheetTemplate;
  }
}
