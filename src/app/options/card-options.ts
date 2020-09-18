import {UUID} from 'angular2-uuid';
import {Meme} from '../model/Meme';
import {MemotypeOptions} from './MemotypeOptions';

export interface CardOptions {
  content: any;
  memetickId?: UUID;
  memeId?: UUID;
  meme?: Meme;
  memotypes?: MemotypeOptions;
}
