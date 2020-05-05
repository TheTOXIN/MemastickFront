import {Component, Input, OnInit} from '@angular/core';
import {DonaterApiService} from '../../api/donater-api-service';
import {DonaterMessage} from '../../model/donaters/DonaterMessage';
import {DonaterMessageInfoModalComponent} from '../../modals/donater-message-info-modal/donater-message-info-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {StorageService} from '../../services/storage-service';

@Component({
  selector: 'app-donater-message',
  templateUrl: './donater-message.component.html',
  styleUrls: ['./donater-message.component.scss']
})
export class DonaterMessageComponent implements OnInit {

  isLoad = true;

  @Input()
  public donater: DonaterMessage;

  @Input()
  public info = false;

  constructor(
    private donaterApi: DonaterApiService,
    private modalService: NgbModal,
    private storage: StorageService
  ) {

  }

  ngOnInit() {
    if (this.donater == null) {
      this.initRandom();
    } else {
      this.isLoad = false;
    }
  }

  initRandom() {
    const donaterMessage = this.storage.getDonaterMessage();

    if (donaterMessage == null) {
      this.donaterApi.randomMessage().subscribe(data => {
        this.donater = data;
        this.isLoad = false;
        this.storage.setDonaterMessage(data);
      });
    } else {
      this.donater = donaterMessage;
      this.isLoad = false;
    }
  }

  messageInfo() {
    this.modalService.open(DonaterMessageInfoModalComponent, {'centered': true});
  }
}
