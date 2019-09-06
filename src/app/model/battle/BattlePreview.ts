import {UUID} from 'angular2-uuid';

export class BattlePreview {
  constructor(
    public battleId: UUID,
    public forward: BattleMemberPreview,
    public defender: BattleMemberPreview
  ) {

  }
}

class BattleMemberPreview {
  constructor(
    public memberId: UUID,
    public memeUrl: string
  ) {

  }
}
