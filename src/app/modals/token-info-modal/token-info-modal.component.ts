import {Component, Input} from '@angular/core';
import {TokenData} from '../../model/TokenData';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-token-info-modal',
  templateUrl: './token-info-modal.component.html',
  styleUrls: ['./token-info-modal.component.scss']
})
export class TokenInfoModalComponent {

  @Input()
  public token: TokenData;

  constructor(public activeModal: NgbActiveModal) {
  }

}
