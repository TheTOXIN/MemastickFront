import {UUID} from 'angular2-uuid';
import {EvolveStep} from '../consts/EvolveStep';

export class Meme {
  constructor (
    public id: UUID,
    public url: string,
    public text: string,
    public type: string,
    public chromosomes: number,
    public indexer: number,
    public step: EvolveStep,
  ) {

  }
}
