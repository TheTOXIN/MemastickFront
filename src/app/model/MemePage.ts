import {MemeLike} from './MemeLike';
import {MemetickPreview} from './MemetickPreview';
import {UUID} from 'angular2-uuid';

export class MemePage {

  public id: UUID;
  public like: MemeLike;
  public memetick: MemetickPreview;
  public image: String;
  public avatar: String;

  chromosomeState = 'default';
  likeState = 'default';

  constructor(
    id: UUID
  ){
    this.id = id;
  }

}
