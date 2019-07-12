import {EvolveStep} from '../consts/EvolveStep';
import {UUID} from 'angular2-uuid';
import {EPI} from './EPI';

export class EvolveMeme {
  constructor(
    public memeId: UUID,
    public epi: EPI,
    public step: EvolveStep,
    public immunity: boolean,
    public adaptation: number,
    public nextTimer: string
  ) {

  }
}
