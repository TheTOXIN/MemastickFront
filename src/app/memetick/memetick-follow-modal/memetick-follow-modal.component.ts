import {Component, OnInit} from '@angular/core';
import {MemetickPreview} from '../../model/MemetickPreview';
import {SettingApiService} from '../../api/setting-api-service';

@Component({
  selector: 'app-memetick-follow-modal',
  templateUrl: './memetick-follow-modal.component.html',
  styleUrls: ['./memetick-follow-modal.component.scss']
})
export class MemetickFollowModalComponent implements OnInit {

  public memeticks: MemetickPreview[];

  isLoad = true;

  constructor(
    private settingApi: SettingApiService,
  ) {

  }

  ngOnInit() {
    this.settingApi.following().subscribe(data => {
      this.memeticks = data;
      this.isLoad = false;
    });
  }

  unfollow(memetick: MemetickPreview, index: number) {
    this.memeticks.splice(index, 1);
    this.settingApi.follow(memetick.id);
  }
}
