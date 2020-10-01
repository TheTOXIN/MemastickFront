import {MemotypeRarity} from '../../consts/MemotypeRarity';
import {MemetickPreview} from '../memetick/MemetickPreview';

export class BattleRating {
  constructor(
    public memetick: MemetickPreview,
    public exist: boolean,
    public position: number,
    public score: number,
    public days: number,
    public present: MemotypeRarity
  ) {

  }
}
