import {UUID} from 'angular2-uuid';

export class MemeComment {
  constructor(
    public commentId: UUID,
    public memeId: UUID,
    public memetickId: UUID,
    public nick: string,
    public comment: string,
    public point: number,
    public vote: Boolean
  ) {

  }
}
