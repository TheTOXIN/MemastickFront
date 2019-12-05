import {UUID} from 'angular2-uuid';

export class DonaterMessage {

  constructor(
    public id: UUID,
    public name: string,
    public avatar: string,
    public message: string,
    public number: number
  ) {

  }
}
