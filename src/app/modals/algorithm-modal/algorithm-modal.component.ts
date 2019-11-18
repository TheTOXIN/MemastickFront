import { Component } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ValidConst} from '../../consts/ValidConst';

@Component({
  selector: 'app-algorithm-modal',
  templateUrl: './algorithm-modal.component.html',
  styleUrls: ['./algorithm-modal.component.scss']
})
export class AlgorithmModalComponent {

  constants = ValidConst;

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }
}
