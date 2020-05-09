import {Directive, TemplateRef} from '@angular/core';
import {AcceptState} from '../state/accept-state';

@Directive({
  selector: 'ng-template[appAccept]'
})
export class AcceptDirective {
  
  constructor(
    acceptTemplate: TemplateRef<any>,
    state: AcceptState
  ) {
    state.template = acceptTemplate;
  }
}
