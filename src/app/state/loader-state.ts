import {LoaderStatus} from '../consts/LoaderStatus';

export class LoaderState {

  public message: String;
  public status: LoaderStatus;
  public event?: any;

  constructor(
    message: String = '',
    status: LoaderStatus = LoaderStatus.NONE,
    event?: any,
  ) {
    this.message = message;
    this.status = status;
    this.event = event;
  }
}
