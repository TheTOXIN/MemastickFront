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
    public push: PushService
  ) {

  }

  public memetick: Memetick = new Memetick(
    '',
    ''
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

  logOut() {
    this.modalService.open(LogoutModalComponent, {'centered': true});
  }

  pushNotification() {
    this.setting.pushWork = !this.setting.pushWork;

    if (this.setting.pushWork) {
      this.push.permission();
    } else {
      this.push.remove();
    }
  }

  back() {
    window.history.back();
  }
}
