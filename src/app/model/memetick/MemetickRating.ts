import {MemetickRatingData} from './MemetickRatingData';

export class MemetickRating {
  constructor(
    public top: MemetickRatingData[],
    public me: MemetickRatingData
  ) {

  }
}
