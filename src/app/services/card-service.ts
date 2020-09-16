import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CardState} from '../state/card-state.service';
import {CardOptions} from '../options/card-options';

@Injectable()
export class CardService {

  constructor(
    private modal: NgbModal,
    private state: CardState
  ) {

  }

  open(options: CardOptions) {
    if (this.state.modal != null) {
      this.state.modal.close();
    }

    this.state.options = options;
    this.state.modal = this.modal.open(this.state.template, {windowClass: 'card-modal-content'});
  }
}
