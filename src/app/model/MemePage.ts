import {Meme} from './Meme';
import {MemeStateLike} from './MemeStateLike';
import {EvolveStep} from '../consts/EvolveStep';
import {MemeCommentBest} from './meme/MemeCommentBest';
import {MemetickPreview} from './memetick/MemetickPreview';

export class MemePage {
  constructor(
    public meme: Meme,
    public likes: MemeStateLike,
    public memetick: MemetickPreview,
    public comment: MemeCommentBest,
    public step: EvolveStep
  ) {

  }
}
