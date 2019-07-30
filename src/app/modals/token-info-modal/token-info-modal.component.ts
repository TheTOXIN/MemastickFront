import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenData} from '../../model/TokenData';

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
