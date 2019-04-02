import {EvolveStep} from '../consts/EvolveStep';
import {UUID} from 'angular2-uuid';

export class EvolveMeme {
  constructor(
    public step: EvolveStep,
    public population: number,
    public chance: number,
    public immunity: boolean,
    public memeId: UUID
  ) {

  }
}
