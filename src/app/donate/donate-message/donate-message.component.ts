import {Component, Input, OnInit} from '@angular/core';
import {DonateApiService} from '../../api/donate-api-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DonateMessageInfoModalComponent} from '../donate-message-info-modal/donate-message-info-modal.component';
import {DonateMessage} from '../model/DonateMessage';

@Component({
  selector: 'app-donate-message',
  templateUrl: './donate-message.component.html',
  styleUrls: ['./donate-message.component.scss']
})
export class DonateMessageComponent implements OnInit {

  isLoad = true;

  @Input()
  public donate: DonateMessage;

  @Input()
  public info = false;

  constructor(
    private donateApi: DonateApiService,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    if (this.donate == null) {
      this.initRandom();
    } else {
      this.isLoad = false;
    }
  }

  initRandom() {
    // if (donateMessage == null) {
    //   this.donateApi.randomMessage().subscribe(data => {
    //     this.donate = data;
    //     this.isLoad = false;
    //     this.storage.setDonateMessage(data);
    //   });
    // } else {
    //   this.donate = donateMessage;
    //   this.isLoad = false;
    // }
  }

  messageInfo() {
    this.modalService.open(DonateMessageInfoModalComponent, {'centered': true});
  }
}
