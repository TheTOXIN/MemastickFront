import { Component } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PushService} from '../../services/push-service';
import {LocalStorageService} from '../../services/local-storage-service';

@Component({
  selector: 'app-push-request-modal',
  templateUrl: './push-request-modal.component.html',
  styleUrls: ['./push-request-modal.component.scss']
})
export class PushRequestModalComponent {

  constructor(
    public activeModal: NgbActiveModal,
    public pushService: PushService,
    private storageService: LocalStorageService
  ) {

  }

  request() {
    this.close();
    this.pushService.requester();
  }

  close() {
    this.storageService.setPushAsk(true);
    this.activeModal.dismiss('Cross click');
  }
}
