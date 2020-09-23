import {Component, Input, OnInit} from '@angular/core';
import {DonateApiService} from '../../api/donate-api-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DonateMessageInfoComponent} from '../donate-message-info/donate-message-info.component';
import {DonateMessage} from '../model/DonateMessage';

@Component({
  selector: 'app-donate-message',
  templateUrl: './donate-message.component.html',
  styleUrls: ['./donate-message.component.scss']
})
export class DonateMessageComponent implements OnInit {

  @Input()
  public message: DonateMessage;

  @Input()
  public info = false;

  @Input()
  public head = false;

  isLoad = false;

  constructor(
    private donateApi: DonateApiService,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    if (this.message != null) {
      this.isLoad = true;
    }
  }

  messageInfo() {
    this.modalService.open(DonateMessageInfoComponent, {'centered': true});
  }
}
