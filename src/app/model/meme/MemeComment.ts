import {UUID} from 'angular2-uuid';

export class MemeComment {
  constructor(
    public commentId: UUID,
    public memetickId: UUID,
    public comment: string,
    public point: number,
    public vote: Boolean
  ) {

  }
}
