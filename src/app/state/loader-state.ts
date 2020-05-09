import {LoaderStatus} from '../consts/LoaderStatus';

export class LoaderState {

  public status: LoaderStatus;
  public message?: String;
  public event?: any;

  constructor(
    status: LoaderStatus = LoaderStatus.NONE,
    message?: String,
    event?: any,
  ) {
    this.status = status;
    this.message = message;
    this.event = event;
  }
}
