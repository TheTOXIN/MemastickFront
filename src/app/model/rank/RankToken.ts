import {TokenType} from '../../consts/TokenType';

export class RankToken {
  constructor(
    public lvl: number,
    public tokens: Map<TokenType, number>
  ) {

  }
}
