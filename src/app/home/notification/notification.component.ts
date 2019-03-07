import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimerObservable} from 'rxjs-compat/observable/TimerObservable';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public isShow = false;
  public isHide = false;

  @Input()
  public img: string;

  @Input()
  public txt: string;

  @Input()
  public int: string;

  @Output()
  public eventer = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    TimerObservable.create(3000, 3000).subscribe(
      () => this.isHide = true
    );
  }

  show(img, txt, int) {
    this.img = img;
    this.txt = txt;
    this.int = int;

    this.isShow = true;
  }

  event() {
    this.eventer.emit();
  }
}
