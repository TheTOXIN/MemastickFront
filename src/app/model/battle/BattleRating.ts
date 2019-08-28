import {MemetickPreview} from '../MemetickPreview';

export class BattleRating {
  constructor(
    public memetick: MemetickPreview,
    public exist: boolean,
    public position: number,
    public score: number
  ) {

  }
}
