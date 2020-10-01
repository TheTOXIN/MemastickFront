import {Memetick} from './Memetick';
import {TokenWallet} from '../tokens/TokenWallet';

export class MemetickProfile {
  constructor (
    public memetick: Memetick,
    public follow: boolean,
    public online: boolean,
    public memecoins: number,
    public tokens: TokenWallet
  ) {

  }
}
