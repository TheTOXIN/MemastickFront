import {Component, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IntroModalComponent} from '../intro-modal/intro-modal.component';

@Component({
  selector: 'app-open-intro-modal',
  templateUrl: './open-intro-modal.component.html',
  styleUrls: ['./open-intro-modal.component.scss']
})
export class OpenIntroModalComponent {

  constructor(private modalService: NgbModal) {
  }

  @Input()
  private content: string;

  @Input()
  private title: string;

  open() {
    const modalRef = this.modalService.open(IntroModalComponent);
    modalRef.componentInstance.content = this.content;
    modalRef.componentInstance.title = this.title;
  }

}
