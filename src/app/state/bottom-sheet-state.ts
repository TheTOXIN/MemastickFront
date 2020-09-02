import {Injectable, TemplateRef} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {BottomSheetOptions} from '../options/bottom-sheet-options';

@Injectable()
export class BottomSheetState {

  modal: NgbModalRef;
  template: TemplateRef<any>;
  options: BottomSheetOptions;
}
