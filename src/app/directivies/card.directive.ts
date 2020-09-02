import {Directive, TemplateRef} from '@angular/core';
import {CardState} from '../state/card-state.service';

@Directive({
  selector: 'ng-template[appCard]'
})
export class CardDirective {

  constructor(
    cardTemplate: TemplateRef<any>,
    state: CardState
  ) {
    state.template = cardTemplate;
  }
}
