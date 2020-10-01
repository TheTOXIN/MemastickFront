import {TokenType} from '../../consts/TokenType';

export class TokenWallet {
  constructor(
    public wallet: Map<TokenType, number>
  ) {

  }
}
