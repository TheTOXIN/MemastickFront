import {UUID} from 'angular2-uuid';
import {BattleRole} from '../../consts/BattleRole';
import {BattleStatus} from '../../consts/BattleStatus';

export class BattleView {
  constructor(
    public battleId: UUID,
    public status: BattleStatus,
    public pvp: number,
    public forward: BattleMemberView,
    public defender: BattleMemberView,
    public my: boolean,
  ) {

  }
}

class BattleMemberView {
  constructor(
    public role: BattleRole,
    public memetickId: UUID,
    public memberId: UUID,
    public memeId: UUID,
    public votes: number,
  ) {

  }
}
