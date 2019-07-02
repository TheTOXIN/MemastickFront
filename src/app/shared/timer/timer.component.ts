import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input()
  public time: String;

  @Input()
  public text: String;

  public timer: Date;
  public count = 1000;

  constructor(

  ) {
    setInterval(() => {
      this.timer = this.timer - this.count;
    }, this.count);
  }

  ngOnInit() {
    const date = new Date(this.time);

    const timeZone = date.getTimezoneOffset() * 60000;
    date.setTime(date.getTime() + timeZone);

    this.timer = date;
  }
}
