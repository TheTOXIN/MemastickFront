import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotifyBellApiService} from '../../api/notify-bell-api-service';
import {NotifyBell} from '../../model/NotifyBell';
import {Router} from '@angular/router';
import {FRONT_URL} from '../../app.constants';

@Component({
  selector: 'app-control-bells',
  templateUrl: './control-bells.component.html',
  styleUrls: ['./control-bells.component.scss']
})
export class ControlBellsComponent implements OnInit {

  @Output()
  public closeEvent = new EventEmitter<any>();

  public bells: NotifyBell[] = [];
  public loader = true;

  constructor(
    private bellApi: NotifyBellApiService,
    private router: Router
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

    const url = bell.link.substring(FRONT_URL.length);
    this.mark(bell, index);

    this.closeEvent.emit(null);
    this.router.navigate([url]);
  }
}
