import {Component, Input, OnInit} from '@angular/core';
import {DonateApiService} from '../../api/donate-api-service';
import {DonateMessage} from '../../model/donate/DonateMessage';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {StorageService} from '../../services/storage-service';
import {DonateMessageInfoModalComponent} from '../donate-message-info-modal/donate-message-info-modal.component';

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
    private modalService: NgbModal,
    private storage: StorageService
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
    const donateMessage = this.storage.getDonateMessage();

    if (donateMessage == null) {
      this.donateApi.randomMessage().subscribe(data => {
        this.donate = data;
        this.isLoad = false;
        this.storage.setDonateMessage(data);
      });
    } else {
      this.donate = donateMessage;
      this.isLoad = false;
    }
  }

  messageInfo() {
    this.modalService.open(DonateMessageInfoModalComponent, {'centered': true});
  }
}
