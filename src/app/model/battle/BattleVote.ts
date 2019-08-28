import {UUID} from 'angular2-uuid';

export class BattleVote {
  constructor(
    public battleId: UUID,
    public memberId: UUID
  ) {

  }
}
