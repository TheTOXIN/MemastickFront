import {MemeLike} from './MemeLike';
import {MemetickPreview} from './MemetickPreview';
import {UUID} from 'angular2-uuid';

export class MemePage {
  constructor(
    public id: UUID,
    public likes: MemeLike,
    public memetick: MemetickPreview,
    public image: String,
    public avatar: String
  ){

  }
}
