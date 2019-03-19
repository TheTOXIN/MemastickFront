import {Component, OnInit, ViewChild} from '@angular/core';
import {MemetickApiService} from '../../services/memetick-api-service';
import {Memetick} from '../../model/Memetick';
import {MemetickAvatarApiService} from '../../services/memetick-avatar-api-service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LogoutModalComponent} from '../../modals/logout-modal/logout-modal.component';
import {ChangeAvatarModalComponent} from '../../modals/change-avatar-modal/change-avatar-modal.component';
import {ChangeNickModalComponent} from '../../modals/change-nick-modal/change-nick-modal.component';
import {MemeViewComponent} from '../../memes/meme-view/meme-view.component';
import {TokenAcceptComponent} from '../token-accept/token-accept.component';
import {TokenType} from '../../consts/TokenType';
import {TokenApiService} from '../../services/token-api-service';
import {TokenAllowanceModalComponent} from '../token-allowance-modal/token-allowance-modal.component';
import {PwaService} from '../../services/pwa-service';

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
    0,
  );

  constructor(
    private tokensApi: TokenApiService,
    private memetickApi: MemetickApiService,
    public memetickAvatarsApi: MemetickAvatarApiService,
    public router: Router,
    private route: ActivatedRoute,
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

  takeAllowance() {
    this.modalService.open(TokenAllowanceModalComponent, {'centered': true});
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
