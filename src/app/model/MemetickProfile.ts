import {MemetickRank} from './MemetickRank';
import {TokenWallet} from './tokens/TokenWallet';

export class MemetickProfile {
  constructor (
    public id: string,
    public nick: string,
    public follow: boolean,
    public online: boolean,
    public memecoins: number,
    public cookies: number,
    public rank: MemetickRank,
    public tokens: TokenWallet
  ) {

  }
}
