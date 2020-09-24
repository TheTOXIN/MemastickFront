import {Component, Input, OnInit} from '@angular/core';
import {MemetickPreview} from '../../model/MemetickPreview';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {ColorUtils} from '../../utils/color-utils';
import {CardService} from '../../services/card-service';
import {MemetickCardComponent} from '../memetick-card/memetick-card.component';

@Component({
  selector: 'app-memetick-row',
  templateUrl: './memetick-row.component.html',
  styleUrls: ['./memetick-row.component.scss']
})
export class MemetickRowComponent implements OnInit {

  @Input()
  public memetick: MemetickPreview;

  @Input()
  public count: number = null;

  @Input()
  public image: string = null;

  constructor(
    private avatrApi: MemetickAvatarApiService,
    private cardService: CardService
  ) {

  }

  ngOnInit() {
  }

  memetickCard() {
    this.cardService.open({
      content: MemetickCardComponent,
      memetickId: this.memetick.id
    });
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
