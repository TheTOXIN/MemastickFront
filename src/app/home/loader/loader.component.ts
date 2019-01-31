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
  public message: String;

  @Input()
  public status: LoaderStatus;

  constructor(
    private router: Router
  ) {
    this.message = '';
    this.status = LoaderStatus.NONE;
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
    window.location.reload();
  }

  errorTrigger() {
    this.router.navigateByUrl('/home');
  }

}
