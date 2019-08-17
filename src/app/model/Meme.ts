import {UUID} from 'angular2-uuid';
import {EPI} from './EPI';

export class Meme {
  constructor (
    public id: UUID,
    public url: string,
    public text: string,
    public type: string,
    public chromosomes: number,
    public epi: EPI
  ) {

  }
}
