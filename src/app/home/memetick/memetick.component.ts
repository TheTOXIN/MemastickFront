import {Component, OnInit, ViewChild} from '@angular/core';
import {MemetickApiService} from '../../api/memetick-api-service';
import {Memetick} from '../../model/Memetick';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LogoutModalComponent} from '../../modals/logout-modal/logout-modal.component';
import {ChangeAvatarModalComponent} from '../../modals/change-avatar-modal/change-avatar-modal.component';
import {ChangeNickModalComponent} from '../../modals/change-nick-modal/change-nick-modal.component';
import {MemeViewComponent} from '../../memes/meme-view/meme-view.component';
import {TokenType} from '../../consts/TokenType';
import {TokenApiService} from '../../api/token-api-service';
import {TokenAllowanceModalComponent} from '../../token/token-allowance-modal/token-allowance-modal.component';
import {PwaService} from '../../services/pwa-service';
import {SettingApiService} from '../../api/setting-api-service';
import {MemeFilter} from '../../consts/MemeFilter';
import {MemeCoinHistoryModalComponent} from '../../modals/meme-coin-history-modal/meme-coin-history-modal.component';
import {MemotypeReadModalComponent} from '../../memotype/memotype-read-modal/memotype-read-modal.component';
import {MemetickStatsModalComponent} from '../../modals/memetick-stats-modal/memetick-stats-modal.component';
import {ColorUtils} from '../../utils/color-utils';

@Component({
  selector: 'app-memetick',
  templateUrl: './memetick.component.html',
  styleUrls: ['./memetick.component.scss']
})
export class MemetickComponent implements OnInit {

  memetickLoad = false;
  memetickMe = false;

  public wallet: any;
  public colorRarity: any;
  public avatarURL: string;
  public memetick: Memetick;

  constructor(
    private tokensApi: TokenApiService,
    private memetickApi: MemetickApiService,
    public memetickAvatarsApi: MemetickAvatarApiService,
    public router: Router,
    private route: ActivatedRoute,
    private settingApi: SettingApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const memetickId = params['id'];
      this.memetickMe = memetickId === undefined;

      let apiObservable;

      if (this.memetickMe) {
        apiObservable = this.memetickApi.viewMe();
      } else {
        apiObservable = this.memetickApi.view(memetickId);
      }

      apiObservable.subscribe(memetick => {
        this.memetick = memetick;
        this.avatarURL = this.memetickAvatarsApi.dowloadAvatar(this.memetick.id);

        this.tokensApi.memetick(this.memetick.id).subscribe((data) => {
          this.wallet = data.wallet;
          this.memetickLoad = true;
        });

        this.colorRarity = ColorUtils.getRarityColor(this.memetick.rank.lvl);
      });
    });
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
    const modalRef = this.modalService.open(MemotypeReadModalComponent, {'centered': true});
    modalRef.componentInstance.memetickId = this.memetick.id;
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

  back() {
    window.history.back();
  }
}
