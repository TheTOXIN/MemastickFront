import {UUID} from 'angular2-uuid';

export class NotifyBell {
  constructor(
    public id: UUID,
    public text: string,
    public link: string,
    public read: boolean
  ) {

  }
}
