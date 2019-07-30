import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MemetickPreview} from '../../model/MemetickPreview';
import {MemetickApiService} from '../../api/memetick-api-service';
import {UUID} from 'angular2-uuid';
import {Router} from '@angular/router';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {SettingApiService} from '../../api/setting-api-service';

@Component({
  selector: 'app-following-modal',
  templateUrl: './following-modal.component.html',
  styleUrls: ['./following-modal.component.scss']
})
export class FollowingModalComponent implements OnInit {

  public memeticks: MemetickPreview[];

  constructor(
    public activeModal: NgbActiveModal,
    private settingsApi: SettingApiService,
    private avatrApi: MemetickAvatarApiService,
    private settingApi: SettingApiService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.settingsApi.following().subscribe(data => this.memeticks = data);
  }

  getAvatar(memetick: MemetickPreview) {
    return this.avatrApi.dowloadAvatar(memetick.id);
  }

  memetickFollow(memetick: MemetickPreview, index: number) {
    this.memeticks.splice(index, 1);
    this.settingApi.follow(memetick.id);
  }

  memetickView(memetickId: UUID) {
    this.close();
    this.router.navigate(['/home/memetick', memetickId]);
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }
}
