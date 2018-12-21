import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-intro-modal',
  templateUrl: './intro-modal.component.html',
  styleUrls: ['./intro-modal.component.scss']
})
export class IntroModalComponent {

  @Input()
  private content: string;

  @Input()
  private title: string;

  constructor(public activeModal: NgbActiveModal) {
  }

}
