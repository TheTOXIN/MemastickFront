import {Component, Input, OnInit} from '@angular/core';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input()
  public event: any;

  @Input()
  public message: String;

  @Input()
  public status: LoaderStatus;

  constructor() {
    this.clear();
  }

  ngOnInit() {
  }

  isLoad() {
    return this.status === LoaderStatus.LOAD;
  }

  isDone() {
    return this.status === LoaderStatus.DONE;
  }

  isError() {
    return this.status === LoaderStatus.ERROR;
  }

  isShow() {
    return this.status !== LoaderStatus.NONE;
  }

  isMessage() {
    return this.message !== '' && this.message != null;
  }

  action() {
    if (this.event == null) {
      this.clear();
    } else  {
      this.event.apply();
    }
  }

  clear() {
    if (this.status === LoaderStatus.DONE || this.status === LoaderStatus.ERROR) {
      this.message = '';
      this.status = LoaderStatus.NONE;
    }
  }
}
