import {Meme} from './Meme';
import {MemeStateLike} from './MemeStateLike';
import {MemetickPreview} from './MemetickPreview';
import {EvolveStep} from '../consts/EvolveStep';

export class MemePage {
  constructor(
    public meme: Meme,
    public likes: MemeStateLike,
    public memetick: MemetickPreview,
    public step: EvolveStep
  ) {

  }
}
