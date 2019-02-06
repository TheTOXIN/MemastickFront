import {Meme} from './Meme';
import {MemeStateLike} from './MemeStateLike';
import {MemetickPreview} from './MemetickPreview';

export class MemePage {
  constructor(
    public meme: Meme,
    public likes: MemeStateLike,
    public memetick: MemetickPreview
  ) {

  }
}
