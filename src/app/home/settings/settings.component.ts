import { Component, OnInit } from '@angular/core';
import {ChangeNickModalComponent} from '../../modals/change-nick-modal/change-nick-modal.component';
import {LogoutModalComponent} from '../../modals/logout-modal/logout-modal.component';
import {ChangeAvatarModalComponent} from '../../modals/change-avatar-modal/change-avatar-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {Memetick} from '../../model/Memetick';
import {MemetickApiService} from '../../api/memetick-api-service';
import {PushService} from '../../services/push-service';
import {SettingApiService} from '../../api/setting-api-service';
import {Setting} from '../../model/Setting';
import {FollowingModalComponent} from '../../modals/following-modal/following-modal.component';
import {PushApiService} from '../../api/push-api-service';
import {LocalStorageService} from '../../services/local-storage-service';
import {PushRequestModalComponent} from '../../modals/push-request-modal/push-request-modal.component';

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

  // TODO refactor
  public memetick: Memetick = new Memetick(
    '',
    '',
    false
  );

  public setting: Setting = new Setting(
    true
  );

  ngOnInit() {
    this.memetickApi.viewMe().subscribe(data => this.memetick = data);
    this.settingApi.me().subscribe(data => this.setting = data);
  }

  changeAvatar() {
    this.modalService.open(ChangeAvatarModalComponent, {'centered': true});
  }

  changeNick() {
    const modalRef = this.modalService.open(ChangeNickModalComponent, {'centered': true});
    modalRef.componentInstance.nick = this.memetick.nick;
  }

  pushNotification() {
    this.pushService.tokener().then(token => {
      if (token != null) {
        this.setting.pushWork = !this.setting.pushWork;
        this.settingApi.push(this.setting.pushWork);
      } else {
        this.requestPush();
      }
    }).catch(() => {
      this.requestPush();
    });
  }

  requestPush() {
    this.modalService.open(PushRequestModalComponent, {'centered': true});
  }

  logOut() {
    this.modalService.open(LogoutModalComponent, {'centered': true});
  }

  back() {
    window.history.back();
  }
}
