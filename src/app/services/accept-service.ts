import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AcceptState} from '../state/accept-state';
import {AcceptOptions} from '../options/accept-options';

@Injectable()
export class AcceptService {

  constructor(
    private modal: NgbModal,
    private state: AcceptState
  ) {

  }

  accept(options: AcceptOptions): Promise<any> {
    this.state.options = options;
    this.state.modal = this.modal.open(this.state.template, {windowClass: 'accept-modal-content'});
    return this.state.modal.result;
  }
}
