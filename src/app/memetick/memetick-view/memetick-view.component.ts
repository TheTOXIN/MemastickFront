import {Component, Input, OnInit} from '@angular/core';
import {Memetick} from '../../model/memetick/Memetick';
import {ChangeAvatarModalComponent} from '../../modals/change-avatar-modal/change-avatar-modal.component';
import {ChangeNickModalComponent} from '../../modals/change-nick-modal/change-nick-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ColorUtils} from '../../utils/color-utils';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';

@Component({
  selector: 'app-memetick-view',
  templateUrl: './memetick-view.component.html',
  styleUrls: ['./memetick-view.component.scss']
})
export class MemetickViewComponent implements OnInit {

  @Input()
  public memetick: Memetick;

  @Input()
  public memetickMe: boolean;

  public colorRarity: any;
  public avatarURL: string;

  constructor(
    private modalService: NgbModal,
    public memetickAvatarsApi: MemetickAvatarApiService
  ) {

  }

  ngOnInit() {
    if (this.memetick != null) {
      this.avatarURL = this.memetickAvatarsApi.dowloadAvatar(this.memetick.id);
      this.colorRarity = ColorUtils.getRarityColor(this.memetick.rank.lvl);
    }
  }

  changeAvatar() {
    if (this.memetickMe) {
      this.modalService.open(ChangeAvatarModalComponent, {'centered': true});
    }
  }

  changeNick() {
    if (this.memetickMe) {
      this.modalService.open(ChangeNickModalComponent, {'centered': true});
    }
  }
}
