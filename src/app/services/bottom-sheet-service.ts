import {Injectable, TemplateRef} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BottomSheetState} from '../state/bottom-sheet-state';
import {BottomSheetComponent} from '../shared/bottom-sheet/bottom-sheet.component';
import {Memetick} from '../model/Memetick';
import {BottomSheetOptions} from '../options/bottom-sheet-options';

@Injectable()
export class BottomSheetService {

  constructor(
    private modal: NgbModal,
    private state: BottomSheetState
  ) {

  }

  open(options: BottomSheetOptions) {
    this.state.options = options;
    this.state.modal = this.modal.open(this.state.template, {windowClass: 'bottom-sheet-modal-content'});
  }
}
