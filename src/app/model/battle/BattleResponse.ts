import {UUID} from 'angular2-uuid';

export class BattleResponse {
  constructor(
    public battleId: UUID,
    public accept: boolean,
    public pvp: number
  ) {
  }
}
