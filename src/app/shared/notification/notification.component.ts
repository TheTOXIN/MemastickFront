import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NotifyType} from '../../consts/NotifyType';
import {Notify} from '../../model/Notify';
import { timer } from 'rxjs';
import {TokenType} from '../../consts/TokenType';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {Router} from '@angular/router';
import {tokenIcons, tokensData} from '../../model/TokenData';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  public isShow = false;
  public isHide = false;

  public img: string;
  public txt: string;
  public inf: string;

  public url: string;

  private icons = [];

  constructor(
    private avatarApi: MemetickAvatarApiService
  ) {
    this.icons = tokenIcons;
  }

  show(notify: Notify) {
    this.init(notify);

    this.isHide = false;
    this.isShow = true;

    this.sound();
    this.destroy();
  }

  init(notify: Notify) {
    this.txt = notify.title;
    this.url = notify.event;

    if (notify.type === NotifyType.DNA) {
      this.img = 'assets/images/icon/3.png';
      this.inf = notify.data;
    } else if (notify.type === NotifyType.CELL) {
      this.img = 'assets/images/icon/cell.png';
      this.inf = '!';
    } else if (notify.type === NotifyType.TOKEN) {
      this.img = this.icons[notify.data];
      this.inf = '';
    } else if (notify.type === NotifyType.CREATING) {
      this.img = this.avatarApi.dowloadAvatar(notify.data);
      this.inf = 'NEW';
    } else if (notify.type === NotifyType.ALLOWANCE) {
      this.img = 'assets/images/icon/allowance.png';
      this.inf = '+';
    } else if (notify.type === NotifyType.ADMIN) {
      this.img = 'assets/images/tokens/tmp.png';
      this.inf = '!!!';
    } else if (notify.type === NotifyType.MEME_COIN) {
      this.img = 'assets/images/icon/memcoin.png';
      this.inf = notify.data;
    }
  }

  destroy() {
    timer(3000).subscribe(() => {
      this.isHide = true;
    });
  }

  sound() {
    const audio = new Audio();

    audio.src = '../../../assets/audio/nice.wav';
    audio.load();
    audio.play();
  }

  event() {
    if (this.url == null || this.url === '') { return; }
    window.location.href = this.url;
  }
}
