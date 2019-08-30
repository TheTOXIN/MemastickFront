import {MemetickPreview} from '../MemetickPreview';
import {MemetickRating} from '../MemetickRating';

export class BattleRating {
  constructor(
    public memetick: MemetickPreview,
    public exist: boolean,
    public position: number,
    public score: number,
    public days: number,
    public present: MemetickRating
  ) {

  }
}
