import { Component } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-algorithm-modal',
  templateUrl: './algorithm-modal.component.html',
  styleUrls: ['./algorithm-modal.component.scss']
})
export class AlgorithmModalComponent {

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }
}
