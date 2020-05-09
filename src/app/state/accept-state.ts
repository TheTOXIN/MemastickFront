import {Injectable, TemplateRef} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AcceptOptions} from '../options/accept-options';

@Injectable()
export class AcceptState {

  options: AcceptOptions;
  modal: NgbModalRef;
  template: TemplateRef<any>;
}
