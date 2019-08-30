import {BattleView} from './BattleView';

export class BattleHome {
  constructor(
    public battles: BattleView[],
    public battlesCount: number,
    public membersCount: number
  ) {

  }
}
