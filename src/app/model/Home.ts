import {MemetickPreview} from './MemetickPreview';
import {MemetickRank} from './MemetickRank';

export class Home {
  constructor (
    public memetick: MemetickPreview,
    public rank: MemetickRank,
    public message: string,
    public day: number,
    public memes: number,
    public selectTimer: string
  ) {

  }
}
