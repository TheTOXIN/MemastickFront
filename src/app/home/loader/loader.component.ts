import {Component, Input, OnInit} from '@angular/core';
import {LoaderStatus} from '../../consts/LoaderStatus';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input()
  public message: String;

  @Input()
  public status: LoaderStatus;

  constructor(

  ) {
    this.message = 'TEST';
    this.status = LoaderStatus.LOAD;
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

  doneTrigger() {
    console.log('DONE');
  }

  errorTrigger() {
    console.log('ERROR');
  }

}
