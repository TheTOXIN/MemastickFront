import {NotifyType} from '../consts/NotifyType';

export class Notification {
  constructor(
    public type: NotifyType,
    public data: string
  ) {

  }
}
