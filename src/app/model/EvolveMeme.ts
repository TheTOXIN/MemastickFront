import {EvolveStep} from '../consts/EvolveStep';
import {UUID} from 'angular2-uuid';

export class EvolveMeme {
  constructor(
    public step: EvolveStep,
    public population: number,
    public chanceSurvive: number,
    public chanceIncrease: boolean,
    public memeId: UUID
  ) {

  }
}
