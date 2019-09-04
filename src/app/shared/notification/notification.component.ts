import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotifyType} from '../../consts/notification/NotifyType';
import {Notify} from '../../model/Notify';
import { timer } from 'rxjs';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {tokenIcons} from '../../model/TokenData';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public isShow = false;
  public isHide = false;

  public img: string;
  public txt: string;
  public inf: string;
  public url: string;

  private audio = new Audio();

  private notifyImg: any[] = [];
  private notifyInf: any[] = [];

  private tokenIcons = [];

  constructor(
    private avatarApi: MemetickAvatarApiService
  ) {
    this.audio.src = '../../../assets/audio/nice.wav';

    this.notifyInf[NotifyType.DNA] = null;
    this.notifyInf[NotifyType.CELL] = '!';
    this.notifyInf[NotifyType.TOKEN] = 'T';
    this.notifyInf[NotifyType.CREATING] = 'NEW';
    this.notifyInf[NotifyType.ALLOWANCE] = '+';
    this.notifyInf[NotifyType.ADMIN] = '!!!';
    this.notifyInf[NotifyType.MEME_COIN] = null;
    this.notifyInf[NotifyType.BATTLE_REQUEST] = '->';
    this.notifyInf[NotifyType.BATTLE_RESPONSE] = '<-';
    this.notifyInf[NotifyType.BATTLE_COMPLETE] = 'END';

    this.notifyImg[NotifyType.DNA] = 'assets/images/icon/3.png';
    this.notifyImg[NotifyType.CELL] = 'assets/images/icon/cell.png';
    this.notifyImg[NotifyType.TOKEN] = null;
    this.notifyImg[NotifyType.CREATING] = null;
    this.notifyImg[NotifyType.ALLOWANCE] = 'assets/images/icon/allowance.png';
    this.notifyImg[NotifyType.ADMIN] = null;
    this.notifyImg[NotifyType.MEME_COIN] = 'assets/images/icon/memecoin.png';
    this.notifyImg[NotifyType.BATTLE_REQUEST] = 'assets/images/icon/sword.png';
    this.notifyImg[NotifyType.BATTLE_RESPONSE] = 'assets/images/icon/shield.png';
    this.notifyImg[NotifyType.BATTLE_COMPLETE] = 'assets/images/icon/battle.png';

    this.tokenIcons = tokenIcons;
  }

  ngOnInit(): void {
    this.audio.load();
  }

  show(notify: Notify) {
    this.init(notify);

    this.isHide = false;
    this.isShow = true;

    this.audio.play();
    this.destroy();
  }

  init(notify: Notify) {
    this.txt = notify.title;
    this.url = notify.event;

    this.inf = this.notifyInf[notify.type];
    this.img = this.notifyImg[notify.type];

    if (this.inf == null) {
      this.inf = notify.data;
    }

    if (this.img == null) {
      if (notify.type === NotifyType.TOKEN) {
        this.img = this.tokenIcons[notify.data];
      } else if (notify.type === NotifyType.CREATING) {
        this.img = this.avatarApi.dowloadAvatar(notify.data);
      } else {
        this.img = 'assets/images/tokens/tmp.png';
      }
    }
  }

  destroy() {
    timer(3000).subscribe(() => {
      this.isHide = true;
    });
  }

  event() {
    if (this.url == null || this.url === '') { return; }
    window.location.href = this.url;
  }
}
