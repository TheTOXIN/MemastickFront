import {UUID} from 'angular2-uuid';
import {Meme} from '../model/Meme';

export interface CardOptions {
  content: any;
  memetickId?: UUID;
  memeId?: UUID;
  meme?: Meme;
}
