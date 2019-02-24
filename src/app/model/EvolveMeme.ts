import {EvolveStep} from '../consts/EvolveStep';

export class EvolveMeme {
  constructor(
    public step: EvolveStep,
    public population: number,
    public chanceSurvive: number
  ) {

  }
}
