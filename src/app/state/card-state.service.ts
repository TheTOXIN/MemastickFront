import {Injectable, TemplateRef} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CardOptions} from '../options/card-options';

@Injectable()
export class CardState {

  modal: NgbModalRef;
  template: TemplateRef<any>;
  options: CardOptions;
}
