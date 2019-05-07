import { Component, OnInit } from '@angular/core';
import {NotifyBellApiService} from '../../api/notify-bell-api-service';
import {NotifyBell} from '../../model/NotifyBell';

@Component({
  selector: 'app-control-events',
  templateUrl: './control-events.component.html',
  styleUrls: ['./control-events.component.scss']
})
export class ControlEventsComponent implements OnInit {

  public bells: NotifyBell[] = [];
  public loader = true;

  constructor(
    private bellApi: NotifyBellApiService
  ) {

  }

  ngOnInit() {
    this.readAll();
  }

  readAll() {
    this.bellApi.readAll().subscribe(data => {
      this.bells = data;
      this.loader = false;
    });
  }

  mark(bell: NotifyBell, index: number) {
    this.bells[index].read = true;
    this.bells.push(this.bells.splice(index, 1)[0]);
    this.bellApi.mark(bell.id);
  }

  clearAll() {
    this.bellApi.clearAll();
  }

  clear(bell: NotifyBell, index: number) {
    this.bells.splice(index, 1);
    this.bellApi.clear(bell.id);
  }

  event(bell: NotifyBell) {
    window.location.href = bell.link;
  }
}
