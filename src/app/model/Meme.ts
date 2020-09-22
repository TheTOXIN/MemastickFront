import {UUID} from 'angular2-uuid';
import {EPI} from './EPI';
import {MemeType} from '../consts/MemeType';

export class Meme {
  constructor (
    public id: UUID,
    public url: string,
    public text: string,
    public type: MemeType,
    public likes: number,
    public chromosomes: number,
    public creating: Date,
    public epi: EPI
  ) {

  }
}
