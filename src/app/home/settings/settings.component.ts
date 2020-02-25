import { Component, OnInit } from '@angular/core';
import {ChangeNickModalComponent} from '../../modals/change-nick-modal/change-nick-modal.component';
import {LogoutModalComponent} from '../../modals/logout-modal/logout-modal.component';
import {ChangeAvatarModalComponent} from '../../modals/change-avatar-modal/change-avatar-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MemetickApiService} from '../../api/memetick-api-service';
import {PushService} from '../../services/push-service';
import {SettingApiService} from '../../api/setting-api-service';
import {Setting} from '../../model/Setting';
import {PushRequestModalComponent} from '../../modals/push-request-modal/push-request-modal.component';
import {UserDataModalComponent} from '../../modals/user-data-modal/user-data-modal.component';
import {FollowingModalComponent} from '../../modals/following-modal/following-modal.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private memetickApi: MemetickApiService,
    private settingApi: SettingApiService,
    private pushService: PushService
  ) {

  }

  public setting: Setting = new Setting(
    true
  );

  ngOnInit() {
    this.settingApi.me().subscribe(data => this.setting = data);
  }

  changeAvatar() {
    this.modalService.open(ChangeAvatarModalComponent, {'centered': true});
  }

  changeNick() {
    this.modalService.open(ChangeNickModalComponent, {'centered': true});
  }

  profileData() {
    this.modalService.open(UserDataModalComponent, {'centered': true});
  }

  following() {
    this.modalService.open(FollowingModalComponent, {'centered': true});
  }

  logOut() {
    this.modalService.open(LogoutModalComponent, {'centered': true});
  }

  pushWork() {
    this.setting.pushWork = !this.setting.pushWork;
    this.settingApi.push(this.setting.pushWork);
  }

  requestPush() {
    this.modalService.open(PushRequestModalComponent, {'centered': true});
  }

  pushNotification() {
    if (this.pushService.work()) {
      this.pushService.tokener().then(token => {
        if (token != null) {
          this.pushWork();
        } else {
          this.requestPush();
        }
      }).catch(() => {
        this.requestPush();
      });
    } else {
      this.pushWork();
    }
  }

  back() {
    window.history.back();
  }
}
