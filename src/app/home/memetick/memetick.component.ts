import { Component, OnInit } from '@angular/core';
import {MemetickApiService} from '../../services/memetick-api-service';
import {Memetick} from '../../model/Memetick';
import {MemetickAvatarApiService} from '../../services/memetick-avatar-api-service';
import {Router} from '@angular/router';
import {OauthApiService} from '../../services/oauth-api-service';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LogoutModalComponent} from '../../shared/logout-modal/logout-modal.component';

@Component({
  selector: 'app-memetick',
  templateUrl: './memetick.component.html',
  styleUrls: ['./memetick.component.scss']
})
export class MemetickComponent implements OnInit {

  memetickLoad = false;

  public avatarURL: String = '';

  public memetick: Memetick = new Memetick(
    '',
    ''
  );

  constructor(
    private memetickApi: MemetickApiService,
    public memetickAvatarsApi: MemetickAvatarApiService,
    public router: Router,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.memetickApi.me().subscribe(data => {
      this.memetick = data;
      this.avatarURL = this.memetickAvatarsApi.dowloadAvatar(this.memetick.id);
      this.memetickLoad = true;
    });
  }

  changeAvatar() {

  }

  changeNick() {

  }

  logOut() {
    this.modalService.open(LogoutModalComponent);
  }

}
