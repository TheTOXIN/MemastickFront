import {Component, OnInit} from '@angular/core';
import {NotifyBellApiService} from '../../api/notify-bell-api-service';
import {NotifyBell} from '../../model/NotifyBell';

@Component({
  selector: 'app-control-bells',
  templateUrl: './control-bells.component.html',
  styleUrls: ['./control-bells.component.scss']
})
export class ControlBellsComponent implements OnInit {

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
    this.bellApi.mark(bell.id);
  }

  clearAll() {
    this.bells = [];
    this.bellApi.clearAll();
  }

  clear(bell: NotifyBell, index: number) {
    this.bells.splice(index, 1);
    this.bellApi.clear(bell.id);
  }

  event(bell: NotifyBell, index: number) {
    if (bell.link == null || bell.link === '') { return; }

    this.clear(bell, index);
    this.mark(bell, index);

    window.location.href = bell.link;
  }
}
