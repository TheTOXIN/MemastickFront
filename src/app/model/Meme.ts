import {UUID} from 'angular2-uuid';

export class Meme {
  constructor (
    public id: UUID,
    public url: string,
    public chromosomes: number,
    public type: string,
    public step: string,
  ) {

  }
}
