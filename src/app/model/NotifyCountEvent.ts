import {NotifyCountType} from '../consts/notification/NotifyCountType';
import {NotifyCountAction} from '../consts/notification/NotifyCountAction';

export class NotifyCountEvent {
  constructor(
    public type: NotifyCountType,
    public action: NotifyCountAction
  ) {

  }
}
