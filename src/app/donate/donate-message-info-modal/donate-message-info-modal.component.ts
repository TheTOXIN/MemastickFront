import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {DONAT} from '../../app.constants';

@Component({
  selector: 'app-donate-message-info-modal',
  templateUrl: './donate-message-info-modal.component.html',
  styleUrls: ['./donate-message-info-modal.component.scss']
})
export class DonateMessageInfoModalComponent implements OnInit {

  donatHref = DONAT;
  msgsHref = '/donate';
  ratingHref = '/donate';

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  toDonaters() {
    this.router.navigateByUrl(this.ratingHref);
    this.close();
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }
}
