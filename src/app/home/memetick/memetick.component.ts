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

@Component({
  selector: 'app-memetick',
  templateUrl: './memetick.component.html',
  styleUrls: ['./memetick.component.scss']
})
export class MemetickComponent implements OnInit {

  memetickLoad = false;
  memetickMe = false;

  public wallet: any;

  public avatarURL: String = '';
  public memetick: Memetick = new Memetick(
    '',
    '',
    false,
    false,
    0,
    0
  );

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
      this.memetick.id = params['id'];
      this.memetickMe = this.memetick.id === undefined;

      let apiObservable;

      if (this.memetickMe) {
        apiObservable = this.memetickApi.viewMe();
      } else {
        apiObservable = this.memetickApi.view(this.memetick.id);
      }

      apiObservable.subscribe(memetick => {
        this.memetick = memetick;
        this.avatarURL = this.memetickAvatarsApi.dowloadAvatar(this.memetick.id);
        this.tokensApi.memetick(this.memetick.id).subscribe((data) => {
          this.wallet = data.wallet;
          this.memetickLoad = true;
        });
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

  follow() {
    this.memetick.follow = !this.memetick.follow;
    this.settingApi.follow(this.memetick.id);
  }

  memecoinHistory() {
    this.modalService.open(MemeCoinHistoryModalComponent, {'centered': true});
  }

  changeAvatar() {
    this.modalService.open(ChangeAvatarModalComponent, {'centered': true});
  }

  changeNick() {
    this.modalService.open(ChangeNickModalComponent, {'centered': true});
  }

  back() {
    window.history.back();
  }
}
