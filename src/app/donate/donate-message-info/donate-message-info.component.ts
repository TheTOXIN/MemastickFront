import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {DONAT} from '../../app.constants';
import {GlobalConst} from '../../consts/GlobalConst';

@Component({
  selector: 'app-donate-message-info-modal',
  templateUrl: './donate-message-info.component.html',
  styleUrls: ['./donate-message-info.component.scss']
})
export class DonateMessageInfoComponent implements OnInit {

  readonly donateHref = DONAT;
  readonly cost = GlobalConst.DONATE_MESG + 'руб';

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  toMessages() {
    this.router.navigateByUrl('/donate/messages');
    this.close();
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }
}
