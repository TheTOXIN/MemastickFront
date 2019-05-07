import {NotifyType} from '../consts/NotifyType';
import {UUID} from 'angular2-uuid';

export class NotifyBell {
  constructor(
    public id: UUID,
    public type: NotifyType,
    public text: string,
    public link: string,
    public read: boolean
  ) {

  }
}
