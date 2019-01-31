import {UUID} from 'angular2-uuid';

export class Meme {
  constructor (
    public id: UUID,
    public fireId: UUID,
    public memetickId: UUID
  ) {

  }
}
