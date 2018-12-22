import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IntroModalComponent} from '../../shared/intro-modal/intro-modal.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  dokenzShow(qote: string) {
    const modalRef = this.modalService.open(IntroModalComponent);
    modalRef.componentInstance.content = qote;
    modalRef.componentInstance.title = 'МЕМ == ГЕН';
  }
}
