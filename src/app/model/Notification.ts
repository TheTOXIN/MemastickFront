import {NotificationType} from '../consts/NotificationType';

export class Notification {
  constructor(
    public type: NotificationType,
    public data: string
  ) {

  }
}
