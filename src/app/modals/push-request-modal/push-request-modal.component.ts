import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PushService} from '../../services/push-service';
import {StorageService} from '../../services/storage-service';

@Component({
  selector: 'app-push-request-modal',
  templateUrl: './push-request-modal.component.html',
  styleUrls: ['./push-request-modal.component.scss']
})
export class PushRequestModalComponent {

  constructor(
    public activeModal: NgbActiveModal,
    public pushService: PushService,
    private storageService: StorageService
  ) {

  }

  request() {
    this.close();
    this.pushService.requester();
  }

  close() {
    this.storageService.setPushAsk();
    this.activeModal.dismiss('Cross click');
  }
}
