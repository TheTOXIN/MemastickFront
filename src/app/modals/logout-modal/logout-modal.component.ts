import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OauthApiService} from '../../services/oauth-api-service';
import {ControlService} from '../../services/control-service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent {

  constructor(
    public controlService: ControlService,
    public activeModal: NgbActiveModal,
    public oauth: OauthApiService,
  ) {
  }

  logout() {
    this.controlService.hide();
    this.oauth.logout();
    this.close();
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }
}
