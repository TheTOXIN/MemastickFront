import {EvolveStep} from '../consts/EvolveStep';
import {UUID} from 'angular2-uuid';

export class EvolveMeme {
  constructor(
    public memeId: UUID,
    public population: number,
    public step: EvolveStep,
    public immunity: boolean,
    public adaptation: number,
  ) {

  }
}
