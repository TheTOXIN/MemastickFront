import {Component, Input, OnInit} from '@angular/core';
import {Memetick} from '../../model/Memetick';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingApiService} from '../../api/setting-api-service';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemeFilter} from '../../consts/MemeFilter';
import {MemetickStatsModalComponent} from '../memetick-stats-modal/memetick-stats-modal.component';
import {MemeCoinHistoryModalComponent} from '../../modals/meme-coin-history-modal/meme-coin-history-modal.component';
import {ChangeAvatarModalComponent} from '../../modals/change-avatar-modal/change-avatar-modal.component';
import {ChangeNickModalComponent} from '../../modals/change-nick-modal/change-nick-modal.component';
import {ColorUtils} from '../../utils/color-utils';

@Component({
  selector: 'app-memetick-profile',
  templateUrl: './memetick-profile.component.html',
  styleUrls: ['./memetick-profile.component.scss']
})
export class MemetickProfileComponent implements OnInit {

  @Input()
  public memetick: Memetick;

  @Input()
  public memetickMe: boolean;

  @Input()
  public wallet: any;

  public colorRarity: any;
  public avatarURL: string;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private settingApi: SettingApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    public memetickAvatarsApi: MemetickAvatarApiService,
  ) {

  }

  ngOnInit() {
    this.avatarURL = this.memetickAvatarsApi.dowloadAvatar(this.memetick.id);
    this.colorRarity = ColorUtils.getRarityColor(this.memetick.rank.lvl);
  }

  memes() {
    this.router.navigate(['/memes'], {
      queryParams: {
        memetick: this.memetick.id ,
        filter: MemeFilter.USER
      }
    });
  }

  memotypes() {
    // const modalRef = this.modalService.open(MemotypeReadModalComponent, {'centered': true});
    // modalRef.componentInstance.memetickId = this.memetick.id;
  }

  stats() {
    const modalRef = this.modalService.open(MemetickStatsModalComponent, {'centered': true});
    modalRef.componentInstance.memetickId = this.memetick.id;
  }

  follow() {
    this.memetick.follow = !this.memetick.follow;
    this.settingApi.follow(this.memetick.id);
  }

  memecoinHistory() {
    if (this.memetickMe) {
      this.modalService.open(MemeCoinHistoryModalComponent, {'centered': true});
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
