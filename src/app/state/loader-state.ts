import {LoaderStatus} from '../consts/LoaderStatus';

export class LoaderState {

  public event?: any;
  public message: String = '';
  public status: LoaderStatus = LoaderStatus.NONE;
}
