import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {DONAT} from '../../app.constants';

@Component({
  selector: 'app-donate-message-info-modal',
  templateUrl: './donate-message-info.component.html',
  styleUrls: ['./donate-message-info.component.scss']
})
export class DonateMessageInfoComponent implements OnInit {

  readonly donateHref = DONAT;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  toDonate() {
    window.open(this.donateHref, '_blank');
    this.close();
  }

  toMessages() {
    this.router.navigateByUrl('/donate/messages');
    this.close();
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }
}
