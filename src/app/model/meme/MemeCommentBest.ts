import {UUID} from 'angular2-uuid';

export class MemeCommentBest {
  constructor(
    public memeId: UUID,
    public memetickId: UUID,
    public comment: string,
    public point: number
  ) {

  }
}
