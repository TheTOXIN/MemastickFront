import {Component, Input, OnInit} from '@angular/core';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {LoaderState} from '../../state/loader-state';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input()
  public state: LoaderState = new LoaderState();

  constructor() {
    this.clear();
  }

  ngOnInit() {
  }

  get isLoad() {
    return this.state.status === LoaderStatus.LOAD;
  }

  get isDone() {
    return this.state.status === LoaderStatus.DONE;
  }

  get isError() {
    return this.state.status === LoaderStatus.ERROR;
  }

  get isShow() {
    return this.state.status !== LoaderStatus.NONE;
  }

  get isMessage() {
    return this.state.message !== '' &&
      this.state.message != null;
  }

  action() {
    if (this.state.event == null) {
      this.clear();
    } else {
      this.state.event.apply();
    }
  }

  clear() {
    if (this.state.status === LoaderStatus.DONE || this.state.status === LoaderStatus.ERROR) {
      this.state.message = '';
      this.state.status = LoaderStatus.NONE;
    }
  }
}
