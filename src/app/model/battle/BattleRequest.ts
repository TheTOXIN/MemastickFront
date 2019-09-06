import {UUID} from 'angular2-uuid';

export class BattleRequest {
  constructor(
    public fromMeme: UUID,
    public toMeme: UUID,
  ) {

  }
}
