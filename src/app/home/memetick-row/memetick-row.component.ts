import {Component, Input, OnInit} from '@angular/core';
import {MemetickPreview} from '../../model/MemetickPreview';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {UUID} from 'angular2-uuid';
import {Router} from '@angular/router';
import {ColorUtils} from '../../utils/color-utils';

@Component({
  selector: 'app-memetick-row',
  templateUrl: './memetick-row.component.html',
  styleUrls: ['./memetick-row.component.scss']
})
export class MemetickRowComponent implements OnInit {

  @Input()
  public memetick: MemetickPreview;

  @Input()
  public count: number;

  @Input()
  public image: string;

  constructor(
    private router: Router,
    private avatrApi: MemetickAvatarApiService
  ) {

  }

  ngOnInit() {
  }

  memetickView() {
    this.router.navigate(['/home/memetick', this.memetick.id]);
  }

  get downloadAvatar() {
    return this.avatrApi.dowloadAvatar(
      this.memetick.id
    );
  }

  get getRarityAvatar() {
    return ColorUtils.getRarityColor(
      this.memetick.lvl
    );
  }
}
