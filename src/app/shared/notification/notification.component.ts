import {Component, Input, OnInit} from '@angular/core';
import {NotifyType} from '../../consts/NotifyType';
import {Notify} from '../../model/Notify';
import { timer } from 'rxjs';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {tokenIcons} from '../../model/TokenData';
import {FRONT_URL} from '../../app.constants';
import {Router} from '@angular/router';
import {notifyImg, notifyInf} from 'src/app/consts/NotifyData';
import {NotifyCounterService} from '../../services/notify-counter.service';

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

  private notifyImg: any[] = [];
  private notifyInf: any[] = [];

  private tokenIcons = [];

  @Input()
  private sound = new Audio();

  constructor(
    private counterService: NotifyCounterService,
    private avatarApi: MemetickAvatarApiService,
    private router: Router
  ) {

    this.notifyImg = notifyImg;
    this.notifyInf = notifyInf;

    this.tokenIcons = tokenIcons;
  }

  ngOnInit(): void {

  }

  show(notify: Notify) {
    this.check(notify);
    this.init(notify);

    this.isHide = false;
    this.isShow = true;

    this.sound.play();
    this.destroy();
  }

  check(notify: Notify) {
    if (notify.bell) {
      this.counterService.triggerBellCounter(1);
    }
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
    const link = this.url.substring(FRONT_URL.length);
    this.router.navigateByUrl(link);
  }
}
