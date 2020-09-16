import {EvolveStep} from '../consts/EvolveStep';
import {UUID} from 'angular2-uuid';
import {EPI} from './EPI';
import {MemeLoh} from './meme/MemeLoh';
import {MemeComment} from './meme/MemeComment';
import {MemeCommentBest} from './meme/MemeCommentBest';

export class EvolveMeme {
  constructor(
    public memeId: UUID,
    public epi: EPI,
    public step: EvolveStep,
    public myMeme: boolean,
    public canApplyToken: boolean,
    public immunity: boolean,
    public adaptation: number,
    public loh: MemeLoh,
    public comment: MemeCommentBest,
    public nextTimer: string
  ) {

  }
}
