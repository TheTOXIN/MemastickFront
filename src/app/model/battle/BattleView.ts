import {UUID} from 'angular2-uuid';
import {BattleRole} from '../../consts/BattleRole';
import {BattleStatus} from '../../consts/BattleStatus';

export class BattleView {
  constructor(
    public battleId: UUID,
    public status: BattleStatus,
    public pvp: number,
    public forward: BattleMemberView,
    public defender: BattleMemberView
  ) {

  }
}

class BattleMemberView {
  constructor(
    public memetickId: UUID ,
    public role: BattleRole ,
    public votes: number,
    public memberId: UUID,
    public memeUrl: string
  ) {

  }
}
