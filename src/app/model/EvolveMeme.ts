import {EvolveStep} from '../consts/EvolveStep';
import {UUID} from 'angular2-uuid';

export class EvolveMeme {
  constructor(
    public step: EvolveStep,
    public population: number,
    public immunity: number,
    public chance: boolean,
    public memeId: UUID
  ) {

  }
}
