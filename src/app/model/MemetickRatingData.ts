import {MemetickPreview} from './MemetickPreview';

export class MemetickRatingData {
  constructor(
    public preview: MemetickPreview,
    public rate: number,
    public pos: number,
  ) {

  }
}
