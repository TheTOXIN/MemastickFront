import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {DONAT} from '../../app.constants';

@Component({
  selector: 'app-donater-message-info-modal',
  templateUrl: './donater-message-info-modal.component.html',
  styleUrls: ['./donater-message-info-modal.component.scss']
})
export class DonaterMessageInfoModalComponent implements OnInit {

  public donatHref = DONAT;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  toDonaters() {
    this.router.navigateByUrl('/donaters/rating');
    this.close();
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }
}
