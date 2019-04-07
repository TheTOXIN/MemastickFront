import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NotificationType} from '../../consts/NotificationType';
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
    this.images[NotificationType.DNK] = 'assets/images/icon/3.png';
  }

  show(notify: Notification) {
    this.init(notify);

    this.isHide = false;
    this.isShow = true;

    this.destroy();
  }

  init(notify: Notification) {
    if (notify.type === NotificationType.DNK) {
      this.img = this.images[notify.type];
      this.txt = '+ ДНК';
      this.int = notify.data;
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
