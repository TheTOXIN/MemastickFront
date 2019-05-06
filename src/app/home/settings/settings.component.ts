import { Component, OnInit } from '@angular/core';
import {ChangeNickModalComponent} from '../../modals/change-nick-modal/change-nick-modal.component';
import {LogoutModalComponent} from '../../modals/logout-modal/logout-modal.component';
import {ChangeAvatarModalComponent} from '../../modals/change-avatar-modal/change-avatar-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {Memetick} from '../../model/Memetick';
import {MemetickApiService} from '../../api/memetick-api-service';

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
  ) {

  }

  public memetick: Memetick = new Memetick(
    '',
    ''
  );

  ngOnInit() {
    this.memetickApi.viewMe().subscribe(data => this.memetick = data);
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

  back() {
    window.history.back();
  }
}
