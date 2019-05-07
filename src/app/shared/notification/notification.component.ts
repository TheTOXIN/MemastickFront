import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NotifyType} from '../../consts/NotifyType';
import {Notification} from '../../model/Notification';
import { timer } from 'rxjs';
import {TokenType} from '../../consts/TokenType';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {Router} from '@angular/router';

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
    // TODO tokens
    this.icons[TokenType.TUBE] = 'assets/images/tokens/1.png';
    this.icons[TokenType.SCOPE] = 'assets/images/tokens/2.png';
    this.icons[TokenType.MUTAGEN] = 'assets/images/tokens/3.png';
    this.icons[TokenType.CROSSOVER] = 'assets/images/tokens/4.png';
    this.icons[TokenType.ANTIBIOTIC] = 'assets/images/tokens/5.png';
  }

  show(notify: Notification) {
    this.init(notify);

    this.isHide = false;
    this.isShow = true;

    this.destroy();
  }

  init(notify: Notification) {
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
    }
  }

  destroy() {
    timer(3000).subscribe(() => {
      this.isHide = true;
    });
  }

  event() {
    window.location.href = this.url;
  }
}
