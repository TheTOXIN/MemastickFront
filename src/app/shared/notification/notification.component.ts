import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NotifyType} from '../../consts/NotifyType';
import {Notification} from '../../model/Notification';
import { timer } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  public isShow = false;
  public isHide = false;

  public images = [];

  @Input()
  public img: string;

  @Input()
  public txt: string;

  @Input()
  public int: string;

  @Output()
  public eventer = new EventEmitter<void>();

  constructor() {
    this.images[NotifyType.DNA] = 'assets/images/icon/3.png';
    this.images[NotifyType.ALLOWANCE] = 'assets/images/icon/allowance.png';
  }

  show(notify: Notification) {
    this.init(notify);

    this.isHide = false;
    this.isShow = true;

    this.destroy();
  }

  init(notify: Notification) {
    if (notify.type === NotifyType.DNA) {
      this.img = this.images[notify.type];
      this.txt = '+ ДНК';
      this.int = notify.data;
    } else if (notify.type === NotifyType.ALLOWANCE) {
      this.img = this.images[notify.type];
      this.txt = 'Пособие';
      this.int = '+1';
    }
  }

  destroy() {
    timer(3000).subscribe(() => {
      this.isHide = true;
    });
  }

  event() {
    this.eventer.emit();
  }
}
