import {NotifyType} from '../consts/NotifyType';

export class Notification {
  constructor(
    public type: NotifyType,
    public title: string,
    public text: string,
    public data: string,
    public event: string
  ) {

  }
}
