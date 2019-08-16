import {UUID} from 'angular2-uuid';

export class Meme {
  constructor (
    public id: UUID,
    public url: string,
    public text: string,
    public type: string,
    public chromosomes: number,
    public indexer: number
  ) {

  }
}
