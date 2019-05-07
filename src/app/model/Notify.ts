import {NotifyType} from '../consts/NotifyType';

export class Notify {
  constructor(
    public type: NotifyType,
    public title: string,
    public text: string,
    public data: string,
    public event: string
  ) {

  }
}
