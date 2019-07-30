import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input()
  public time: string;

  @Input()
  public text: string;

  public timer: any;
  public count = 1000;

  constructor(

  ) {
    setInterval(() => {
      this.timer = this.timer - this.count;
    }, this.count);
  }

  ngOnInit() {
    const time: any[] = this.time.split(':');

    const date = new Date();

    date.setHours(time[0]);
    date.setMinutes(time[1]);
    date.setSeconds(time[2]);

    this.timer = date;
  }
}
